terraform {
  backend "s3" {
    bucket         = "raghu-terraform-state-apne2"
    key            = "counter-app/terraform.tfstate"
    region         = "ap-northeast-2"
    dynamodb_table = "raghu-terraform-locks"
    encrypt        = true
  }
}
