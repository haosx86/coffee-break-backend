output "private_subnet_ids" {
  value = module.vpc.private_subnets
}

output "security_group_id" {
  value = aws_security_group.sg.id
}

