provider "aws" {
  region = "ap-northeast-2"
}

module "s3" {
  source = "./modules/s3"
}

module "dynamodb" {
  source = "./modules/dynamodb"
}

module "iam" {
  source = "./modules/iam"
}

module "lambda" {
  source = "./modules/lambda"

  lambda_role_arn = module.iam.lambda_role_arn
}

module "apigateway" {
  source = "./modules/apigateway"

  lambda_invoke_arn     = module.lambda.lambda_invoke_arn
  lambda_function_name  = module.lambda.lambda_function_name
}

