#!/bin/bash

# Deploy to Kubernetes cluster
set -e

echo "========================================="
echo "Deploying to Kubernetes"
echo "========================================="

# AWS ECR configuration
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="<YOUR_AWS_ACCOUNT_ID>"  # Replace with your AWS account ID
ECR_REPOSITORY="next-app"
ECR_URL="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# Login to AWS ECR
echo "Logging in to AWS ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URL}

# Pull the latest image from ECR
echo "Pulling latest image from ECR..."
docker pull ${ECR_URL}/${ECR_REPOSITORY}:latest

# Check current context
echo "Current Kubernetes context:"
kubectl config current-context || echo "No context set. Please ensure Kubernetes is configured."

# Create namespace if it doesn't exist
echo "Creating namespace if needed..."
kubectl create namespace default --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes configurations
echo "Applying Kubernetes configurations..."
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml

# Wait for deployment to be ready
echo "Waiting for deployment to be ready..."
kubectl rollout status deployment/app-deployment --timeout=300s

# Get service information
echo ""
echo "========================================="
echo "Deployment completed successfully!"
echo "========================================="
echo ""
echo "Service Information:"
kubectl get service app-service

echo ""
echo "Pods Status:"
kubectl get pods -l app=app

echo ""
echo "To access the application:"
echo "  - LoadBalancer: Wait for external IP to be assigned"
echo "  - Port Forward: kubectl port-forward service/app-service 3000:80"
echo ""
echo "To check logs: kubectl logs -f deployment/app-deployment"