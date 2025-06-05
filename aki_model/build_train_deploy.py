# build_train_deploy.py
import os
import argparse
import boto3
import sagemaker
from sagemaker.sklearn.estimator import SKLearn
from sagemaker.sklearn.model import SKLearnModel

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--region", type=str, required=True,
        help="AWS region (e.g. ca-central-1)"
    )
    parser.add_argument(
        "--role-arn", type=str, required=True,
        help="IAM role ARN with SageMaker permissions"
    )
    parser.add_argument(
        "--s3-bucket", type=str, required=True,
        help="S3 bucket to use for data & model‐artifacts"
    )
    parser.add_argument(
        "--s3-prefix", type=str, required=True,
        help="S3 prefix (folder) under bucket"
    )
    parser.add_argument(
        "--instance", type=str, default="ml.m5.xlarge",
        help="Instance type for training (default: ml.m5.xlarge)"
    )
    args = parser.parse_args()

    REGION        = args.region
    ROLE_ARN      = args.role_arn
    S3_BUCKET     = args.s3_bucket
    S3_PREFIX     = args.s3_prefix
    INSTANCE_TYPE = args.instance

    # 1) Upload local CSV to S3 under <bucket>/<prefix>/data_clean_name.csv
    local_csv = "data_clean_name.csv"
    s3_data_key = f"{S3_PREFIX}/data_clean_name.csv"
    s3_data_uri = f"s3://{S3_BUCKET}/{s3_data_key}"

    print(f"Uploading {local_csv} → {s3_data_uri}")
    boto3.client("s3", region_name=REGION).upload_file(local_csv, S3_BUCKET, s3_data_key)
    print("✅ Data upload complete.")

    # 2) Create SageMaker SKLearn estimator
    boto_session      = boto3.Session(region_name=REGION)
    sagemaker_session = sagemaker.Session(boto_session=boto_session)

    estimator = SKLearn(
        entry_point       = "train.py",
        source_dir        = ".",
        role              = ROLE_ARN,
        instance_type     = INSTANCE_TYPE,
        framework_version = "0.23-1",
        py_version        = "py3",
        dependencies      = ["requirements.txt"],
        sagemaker_session = sagemaker_session,
        output_path       = f"s3://{S3_BUCKET}/{S3_PREFIX}/model-artifacts/"
    )

    print("▶ Starting SageMaker training job...")
    estimator.fit({"training": s3_data_uri}, wait=True)
    print("✅ Training job complete.")

    # estimator.model_data now points to the trained model.tar.gz in S3
    sklearn_serving_model = SKLearnModel(
        model_data=estimator.model_data,    # "<s3://…/model-artifacts/…/model.tar.gz>"
        role=ROLE_ARN,
        entry_point="inference.py",         # <-- tell SageMaker to use inference.py at serve‐time
        source_dir=".",                     # directory where inference.py lives
        framework_version="0.23-1",
        py_version="py3",
    )

    print("▶ Deploying endpoint (1 ml.m5.large instance)…")
    predictor = sklearn_serving_model.deploy(
        initial_instance_count=1,
        instance_type="ml.m5.large"
    )
    print("✅ Endpoint deployed. Name =", predictor.endpoint_name)