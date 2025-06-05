# inference.py  (only showing the edited functions)

import os
import io
import json
import boto3
import joblib
import pandas as pd
import numpy as np
import logging

logger = logging.getLogger("inference_logger")
logger.setLevel(logging.INFO)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

file_handler = logging.FileHandler("inference_log.txt")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

LOG_S3_BUCKET = os.environ.get("LOG_S3_BUCKET", None)
LOG_S3_PREFIX = os.environ.get("LOG_S3_PREFIX", "logs/inference_logs/")


def upload_log_to_s3():
    if not LOG_S3_BUCKET:
        return
    try:
        s3_client = boto3.client("s3")
        with open("inference_log.txt", "r") as f:
            log_contents = f.read()
        import time
        log_key = LOG_S3_PREFIX + "inference_log_" + time.strftime("%Y%m%d-%H%M%S") + ".txt"
        s3_client.put_object(Bucket=LOG_S3_BUCKET, Key=log_key, Body=log_contents)
        logger.info("Uploaded log file to s3://%s/%s", LOG_S3_BUCKET, log_key)
    except Exception as e:
        logger.error("Failed to upload log file to S3: %s", e)


def scale_and_transform(df: pd.DataFrame) -> pd.DataFrame:
    """
    1) Divide certain lab features by scaling factors
    2) (Optional) Impute missing values, but only if grouping keys are there
    3) Apply log1p or sqrt transforms to numeric columns
    """
    df = df.copy()

    # 1a) scaling factors
    scaling_factors = {
        "Procalcitonin": 1000.0,
        "White Blood Cell Count": 10.0,
        "Creatinine": 88.4,
        "Urea": 2.14,
        "Bilirubin": 17.1,
        "Albumin": 10.0
    }
    for col, factor in scaling_factors.items():
        if col in df.columns:
            # coerce to numeric just in case someone passed strings
            df[col] = pd.to_numeric(df[col], errors="coerce") / factor

    # 1b) per‐column median‐impute only if the grouping keys exist
    desired_impute_cols = ["Respiratory Rate", "Albumin", "Bilirubin", "Procalcitonin", "HCO3"]
    impute_cols = [c for c in desired_impute_cols if c in df.columns]

    # decide group keys
    if "Outcome of acute kidney injury" in df.columns:
        group_cols = ["Gender", "Hypertension", "Outcome of acute kidney injury"]
    else:
        group_cols = ["Gender", "Hypertension"]

    # only do median‐impute if all grouping columns are present
    if impute_cols and all((g in df.columns) for g in group_cols):
        for col in impute_cols:
            # coerce to numeric before taking medians
            df[col] = pd.to_numeric(df[col], errors="coerce")
            medians = df.groupby(group_cols)[col].transform("median")
            df[col] = df[col].fillna(medians)

    # 1c) log1p and sqrt transforms—only on numeric columns
    log_transform_cols  = ["Procalcitonin", "Creatinine", "Urea", "Lactate", "HCO3", "Mean Arterial Pressure"]
    sqrt_transform_cols = ["White Blood Cell Count", "APACHEII", "SOFA"]

    # For any column in log_transform_cols that actually exists, coerce to numeric first:
    for col in log_transform_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            df[col] = np.log1p(df[col].clip(lower=0))

    for col in sqrt_transform_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            df[col] = np.sqrt(df[col].clip(lower=0))

    return df


def remove_outliers(df: pd.DataFrame) -> pd.DataFrame:
    df_clean = df.copy()
    cols = [
        "Mechanical Ventilation",
        "Procalcitonin",
        "Creatinine",
        "Bilirubin",
        "White Blood Cell Count"
    ]
    for col in cols:
        if col not in df_clean.columns:
            continue
        # coerce to numeric just in case
        df_clean[col] = pd.to_numeric(df_clean[col], errors="coerce")
        q1 = df_clean[col].quantile(0.25)
        q3 = df_clean[col].quantile(0.75)
        iqr = q3 - q1
        lower = q1 - 2.5 * iqr
        upper = q3 + 2.5 * iqr
        df_clean = df_clean[(df_clean[col] >= lower) & (df_clean[col] <= upper)]
    return df_clean


# ----------------------------
# Required SageMaker entry‐point functions
# ----------------------------
def model_fn(model_dir):
    """
    Load the XGBClassifier that was saved in train.py (model.joblib).
    """
    model_path = os.path.join(model_dir, "model.joblib")
    try:
        model = joblib.load(model_path)
        logger.info("Loaded model from %s", model_path)
    except Exception as e:
        logger.error("Failed to load model: %s", e)
        raise
    return model


def input_fn(request_body, request_content_type):
    """
    Deserialize incoming CSV, coerce numeric, apply preprocessing, and return a DataFrame.
    """
    if request_content_type == "text/csv":
        s = request_body.decode("utf-8") if isinstance(request_body, (bytes, bytearray)) else request_body
        df = pd.read_csv(io.StringIO(s))
        logger.info("Read input CSV; applying scale/impute/transform")
        df = scale_and_transform(df)
        df = remove_outliers(df)
        return df
    else:
        raise ValueError(f"Unsupported content type: {request_content_type}")


def predict_fn(input_df, model):
    """
    Select the 12 feature columns, run model.predict / model.predict_proba, return a DataFrame.
    """
    feature_cols = [
        "HCO3",
        "Creatinine",
        "Procalcitonin",
        "Mean Arterial Pressure",
        "Bilirubin",
        "pH",
        "Albumin",
        "Urea",
        "White Blood Cell Count",
        "SOFA",
        "APACHEII",
        "Glasgow"
    ]
    available = [c for c in feature_cols if c in input_df.columns]
    X = input_df[available].copy()
    preds_class = model.predict(X)
    preds_proba = model.predict_proba(X)[:, 1]

    out = pd.DataFrame({
        "PredictedClass": preds_class,
        "PredictedProba": preds_proba
    }, index=X.index)

    return out


def output_fn(prediction_df, accept):
    """
    Serialize predictions.  Support both CSV and JSON.
    """
    if accept == "text/csv":
        buffer = io.StringIO()
        prediction_df.to_csv(buffer, index=False)
        return buffer.getvalue()
    elif accept in ("application/json", "json"):
        # return JSON array of { PredictedClass, PredictedProba } objects
        return prediction_df.to_json(orient="records")
    else:
        raise ValueError(f"Unsupported accept type: {accept}")


# When running locally, you can test:
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: inference.py <input_csv_path> <output_csv_path>")
        sys.exit(1)

    model_dir = os.environ.get("SM_MODEL_DIR", "/opt/ml/model")
    model = model_fn(model_dir)

    with open(sys.argv[1], "r") as f:
        body = f.read()
    df_in = input_fn(body, "text/csv")

    preds_df = predict_fn(df_in, model)
    # default to CSV if you’re writing to a file:
    csv_out = output_fn(preds_df, "text/csv")
    with open(sys.argv[2], "w") as f:
        f.write(csv_out)

    upload_log_to_s3()
    print("Wrote predictions to", sys.argv[2])
