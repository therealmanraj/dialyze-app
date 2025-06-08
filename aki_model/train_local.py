# train_local.py
import argparse
import os

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import shap
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score, confusion_matrix, classification_report,
    roc_curve, auc
)

pd.set_option("display.max_columns", None)
sns.set()  # just for nicer default styling

def scale_and_transform(df: pd.DataFrame) -> pd.DataFrame:
    # 1) scaling
    scaling_factors = {
        "Procalcitonin": 1000.0,
        "White Blood Cell Count": 10.0,
        "Creatinine": 88.4,
        "Urea": 2.14,
        "Bilirubin": 17.1,
        "Albumin": 10.0
    }
    for col, f in scaling_factors.items():
        if col in df.columns:
            df[col] = df[col] / f

    # 2) median-impute
    impute_cols = ["Respiratory Rate", "Albumin", "Bilirubin", "Procalcitonin", "HCO3"]
    df[impute_cols] = df.groupby(
        ["Gender", "Hypertension", "Outcome of acute kidney injury"]
    )[impute_cols].transform(lambda x: x.fillna(x.median()))

    # 3) log1p & sqrt
    log_cols  = ["Procalcitonin", "Creatinine", "Urea", "Lactate", "HCO3", "Mean Arterial Pressure"]
    sqrt_cols = ["White Blood Cell Count", "APACHEII", "SOFA"]
    for col in log_cols:
        if col in df.columns:
            df[col] = np.log1p(df[col].clip(lower=0))
    for col in sqrt_cols:
        if col in df.columns:
            df[col] = np.sqrt(df[col].clip(lower=0))

    return df

def remove_outliers(df: pd.DataFrame) -> pd.DataFrame:
    cols = ['Mechanical Ventilation', 'Procalcitonin', 'Creatinine',
            'Bilirubin', 'White Blood Cell Count']
    df_clean = df.copy()
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

def main(input_csv: str, output_dir: str):
    # load
    df = pd.read_csv(input_csv)

    # preprocess
    df = scale_and_transform(df)

    # four manual slices & outlier removal
    df1 = df.iloc[:98, :].copy()
    df2 = df.iloc[99:210, :].copy()
    df3 = df.iloc[211:411, :].copy()
    df4 = df.iloc[412:531, :].copy()

    df1 = remove_outliers(df1)
    df2 = remove_outliers(df2)
    df3 = remove_outliers(df3)
    df4 = remove_outliers(df4)

    df = pd.concat([df1, df2, df3, df4], ignore_index=True)

    # features & target
    feature_cols = [
        'HCO3','Creatinine','Procalcitonin','Mean Arterial Pressure',
        'Bilirubin','pH','Albumin','Urea','White Blood Cell Count',
        'SOFA','APACHEII','Glasgow'
    ]
    X = df[feature_cols].copy()
    y = df['Outcome of acute kidney injury']

    # categorical dtypes if any
    for c in X.select_dtypes(include=['object']).columns:
        X[c] = X[c].astype('category')

    # train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # train
    param_grid = {
        'colsample_bytree': 0.7,
        'gamma': 0,
        'learning_rate': 0.2,
        'max_depth': 3,
        'min_child_weight': 1,
        'n_estimators': 200,
        'subsample': 0.7
    }
    model = XGBClassifier(enable_categorical=True, random_state=42)
    model.set_params(**param_grid)
    model.fit(X_train, y_train)

    # predict with threshold
    y_scores = model.predict_proba(X_test)[:, 1]
    thresh = 0.33
    y_pred = (y_scores >= thresh).astype(int)

    # metrics
    print("Classification Report (Recall Priority):")
    print(classification_report(y_test, y_pred))

    # confusion matrix plot
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=[0,1], yticklabels=[0,1])
    plt.title("Confusion Matrix - Recall Priority")
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.show()

    # ROC curve
    fpr, tpr, _ = roc_curve(y_test, y_scores)
    roc_auc = auc(fpr, tpr)
    plt.figure(figsize=(6,5))
    plt.plot(fpr, tpr, lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
    plt.plot([0,1], [0,1], linestyle='--', color='grey')
    plt.title("Receiver Operating Characteristic (ROC) Curve")
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.legend(loc="lower right")
    plt.show()

    # SHAP summary
    explainer = shap.Explainer(model)
    shap_values = explainer(X_test)
    shap.summary_plot(shap_values, X_test, plot_type="bar")

    # save model
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, "model.xgb")
    model.get_booster().save_model(model_path)
    print(f"Saved XGBoost model to {model_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-csv",  default="data_clean_name.csv",
                        help="Path to data_clean_name.csv")
    parser.add_argument("--output-dir", default="model_artifact",
                        help="Directory to save the trained model")
    args = parser.parse_args()
    main(args.input_csv, args.output_dir)
