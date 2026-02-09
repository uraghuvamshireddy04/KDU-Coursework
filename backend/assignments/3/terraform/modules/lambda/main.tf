data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/../../lambda/index.js"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "counter_lambda" {
  function_name = "raghu-counter-lambda"
  role = var.lambda_role_arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = "raghu-counter-table"
    }
  }
}
