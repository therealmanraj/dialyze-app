manraj@Manrajs-MacBook-Pro aki_model % python3 build_train_deploy.py \
 --region ca-central-1 \
 --role-arn arn:aws:iam::222634404112:role/SageMakerExecutionRole-ca \
 --s3-bucket my-aki-model-bucket \
 --s3-prefix aki-risk

then
Endpoint deployed. Name = sagemaker-scikit-learn-2025-06-05-16-51-05-911

change the endpoint name in EndpointName="", test_endpoint.ipynb
