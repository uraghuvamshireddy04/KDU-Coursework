resource "aws_dynamodb_table" "counter_table" {
  name         = "raghu-counter-table"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    creator = "raghu"
    purpose = "terraform"
  }
}