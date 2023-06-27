module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name                 = var.project_name
  cidr                 = "10.0.0.0/16"
  azs                  = data.aws_availability_zones.zones.names
  private_subnets      = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]
  public_subnets       = ["10.0.3.0/24", "10.0.4.0/24", "10.0.5.0/24"]
  enable_dns_hostnames = true
  enable_dns_support   = true
  public_subnet_private_dns_hostname_type_on_launch = "resource-name"
  private_subnet_private_dns_hostname_type_on_launch = "resource-name"
  private_subnet_enable_resource_name_dns_a_record_on_launch = true
  public_subnet_enable_resource_name_dns_a_record_on_launch = true

  enable_nat_gateway = false

  tags = {
    Name = var.project_name
  }
}


resource "aws_security_group" "sg" {
  name   = "${var.project_name}-vpc-sg"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.project_name
  }
}

