# train.py
import os
import pandas as pd
import numpy as np
import joblib
import warnings

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report
from xgboost import XGBClassifier

warnings.filterwarnings("ignore")
np.random.seed(42)


def scale_and_transform(df: pd.DataFrame) -> pd.DataFrame:
    """
    1) Divide certain lab features by scaling factors
    2) Impute missing values (group‐median by Gender, Hypertension, Outcome of AKI),
       done per‐column so that the length never changes
    3) Apply log1p or sqrt transforms to specified columns
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
            df[col] = df[col] / factor

    # 1b) per‐column median‐impute
    desired_impute_cols = ["Respiratory Rate", "Albumin", "Bilirubin", "Procalcitonin", "HCO3"]
    impute_cols = [c for c in desired_impute_cols if c in df.columns]

    # grouping keys exist?
    if "Outcome of acute kidney injury" in df.columns:
        group_cols = ["Gender", "Hypertension", "Outcome of acute kidney injury"]
    else:
        group_cols = ["Gender", "Hypertension"]

    # Only attempt per‐column transform if group keys exist
    if impute_cols and all(g in df.columns for g in group_cols):
        for col in impute_cols:
            medians = df.groupby(group_cols)[col].transform("median")
            df[col]  = df[col].fillna(medians)

    # 1c) log1p and sqrt transforms
    log_transform_cols  = ["Procalcitonin", "Creatinine", "Urea", "Lactate", "HCO3", "Mean Arterial Pressure"]
    sqrt_transform_cols = ["White Blood Cell Count", "APACHEII", "SOFA"]

    for col in log_transform_cols:
        if col in df.columns:
            df[col] = np.log1p(df[col].clip(lower=0))

    for col in sqrt_transform_cols:
        if col in df.columns:
            df[col] = np.sqrt(df[col].clip(lower=0))

    return df


def remove_outliers(df: pd.DataFrame) -> pd.DataFrame:
    """
    Remove extreme outliers in a small set of columns:
    - Mechanical Ventilation
    - Procalcitonin
    - Creatinine
    - Bilirubin
    - White Blood Cell Count
    We use 2.5 * IQR as the cutoff.
    """
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
        q1 = df_clean[col].quantile(0.25)
        q3 = df_clean[col].quantile(0.75)
        iqr = q3 - q1
        lower = q1 - 2.5 * iqr
        upper = q3 + 2.5 * iqr
        df_clean = df_clean[(df_clean[col] >= lower) & (df_clean[col] <= upper)]
    return df_clean


def main():
    # SageMaker training container will put our “training” data in:
    input_path = "/opt/ml/input/data/training/data_clean_name.csv"
    print(f"[train.py] Loading raw CSV from: {input_path}")
    df = pd.read_csv(input_path)

    # 1) scale & transforms (scaling, impute, log/sqrt)
    df = scale_and_transform(df)

    # 2) remove outliers
    df = remove_outliers(df)

    # 3) pick out feature matrix X and target y
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
    available_features = [c for c in feature_cols if c in df.columns]
    X = df[available_features].copy()
    y = df["Outcome of acute kidney injury"].copy()

    print(f"[train.py] After transforms → X shape: {X.shape}, y shape: {y.shape}")

    # 4) train/test split (80/20 stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # 5) define and fit XGBClassifier
    params = {
        "random_state": 42,
        "learning_rate": 0.2,
        "max_depth": 3,
        "n_estimators": 200,
        "colsample_bytree": 0.7,
        "subsample": 0.7,
        "min_child_weight": 1,
        "gamma": 0.0
    }
    model = XGBClassifier(**params)

    print("[train.py] Fitting XGBClassifier on training data...")
    model.fit(X_train, y_train, verbose=True)

    # 6) evaluate on hold‐out
    y_pred   = model.predict(X_test)
    y_proba  = model.predict_proba(X_test)[:, 1]
    acc      = accuracy_score(y_test, y_pred)
    roc_auc  = roc_auc_score(y_test, y_proba)
    print(f"[train.py] Hold‐out Accuracy: {acc:.4f}, ROC AUC: {roc_auc:.4f}")
    print("[train.py] Classification Report:")
    print(classification_report(y_test, y_pred))

    # 7) save the trained model under /opt/ml/model for SageMaker
    model_dir = os.environ.get("SM_MODEL_DIR", "/opt/ml/model")
    os.makedirs(model_dir, exist_ok=True)
    output_path = os.path.join(model_dir, "model.joblib")
    joblib.dump(model, output_path)
    print(f"[train.py] Model saved to: {output_path}")


if __name__ == "__main__":
    main()
