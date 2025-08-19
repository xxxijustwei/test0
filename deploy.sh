#!/bin/bash

# Deploy script for test0
set -e

echo "Building test0 Docker image..."
sudo docker build -t test0:latest .

echo "Stopping existing test0 container..."
docker stop test0 || true

echo "Removing existing test0 container..."
docker rm test0 || true

echo "Starting new test0 container..."
docker run -d \
  --name test0 \
  -p 3000:3000 \
  --restart unless-stopped \
  test0:latest

echo "Deployment completed successfully!"
echo "Container is running on port 3000"