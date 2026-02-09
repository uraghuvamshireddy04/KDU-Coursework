output "lambda_invoke_arn" {
  value = aws_lambda_function.counter_lambda.invoke_arn
}

output "lambda_function_name" {
  value = aws_lambda_function.counter_lambda.function_name
}
