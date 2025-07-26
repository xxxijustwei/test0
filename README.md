# Next.js Application

A modern Next.js application with TypeScript, React 19, Tailwind CSS, and comprehensive monitoring through Datadog RUM and Sentry. The application is containerized and deployed to AWS EKS with automated CI/CD pipelines.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (for containerization)
- AWS CLI (for ECR deployment)
- kubectl (for Kubernetes deployment)

## Local Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/justwei/test0.git
cd test0
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env.local file with required variables
NODE_ENV=development
SENTRY_DSN=your-sentry-dsn
DATADOG_CLIENT_TOKEN=your-datadog-client-token
DATADOG_APPLICATION_ID=your-datadog-app-id
```

### Running Locally

```bash
# Development mode with Turbopack
pnpm dev

# Production build
pnpm build
pnpm start

# Run tests
pnpm test

# Run linting
pnpm lint
```

The application will be available at http://localhost:3000

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The CI workflow is triggered on:
- Push to main branch
- Pull requests to main branch

### CI Workflow Steps

1. **Test and Build Job**:
   - Checkout code
   - Setup Node.js 18 and pnpm 8
   - Cache pnpm dependencies
   - Install dependencies
   - Run linting (`pnpm lint`)
   - Run tests (`pnpm test`)
   - Build application (`pnpm build`)

2. **Build and Push to ECR** (only on main branch):
   - Configure AWS credentials
   - Login to Amazon ECR
   - Build Docker image
   - Tag image with commit SHA and latest
   - Push to ECR repository

### Running CI Locally

You can test the CI steps locally:

```bash
# Install dependencies
pnpm install

# Run all CI checks
pnpm lint && pnpm test && pnpm build
```

### Required GitHub Secrets

For the CI pipeline to work, configure these secrets in your GitHub repository:
- `AWS_ACCOUNT_ID` - AWS account ID
- `AWS_ACCESS_KEY_ID` - AWS access key for ECR access
- `AWS_SECRET_ACCESS_KEY` - AWS secret key for ECR access
- `AWS_REGION` - AWS region for ECR access

## Kubernetes Deployment

The application is deployed to Kubernetes using the manifests in the `k8s/` directory.

### Prerequisites for K8s Deployment

1. Configure kubectl to connect to your cluster:
```bash
aws eks update-kubeconfig --name your-cluster-name --region us-east-1
```

2. Ensure the Docker image is available in ECR (built by CI pipeline)

### Applying K8s Manifests

Deploy the application to Kubernetes:

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or apply individually
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

### Verifying Deployment

```bash
# Check deployment status
kubectl get deployments app-deployment
kubectl get pods -l app=app

# Check service status
kubectl get service app-service

# Get load balancer URL (may take a few minutes)
kubectl describe service app-service | grep "LoadBalancer Ingress"
```

### K8s Configuration Details

**Deployment** (`k8s/deployment.yml`):
- 3 replicas for high availability
- Health checks on `/status` endpoint
- Resource limits: 512Mi memory, 500m CPU
- Resource requests: 256Mi memory, 250m CPU

**Service** (`k8s/service.yml`):
- AWS Application Load Balancer (ALB)
- Internet-facing configuration
- Port 80 → 3000 mapping

### Updating Deployment

To update the deployment with a new image:

```bash
# Update with specific image tag
kubectl set image deployment/app-deployment app=424071944879.dkr.ecr.us-east-1.amazonaws.com/next-app:new-tag

# Or edit the deployment directly
kubectl edit deployment app-deployment
```

### Monitoring

The application includes:
- Datadog RUM for frontend monitoring
- Sentry for error tracking
- Health check endpoint at `/status`

### Troubleshooting

```bash
# View pod logs
kubectl logs -l app=app

# Describe pod for events
kubectl describe pod <pod-name>

# Check deployment rollout status
kubectl rollout status deployment/app-deployment
```

## Project Structure

```
├── .github/workflows/   # CI/CD pipelines
├── k8s/                # Kubernetes manifests
├── public/             # Static assets
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── Dockerfile         # Container configuration
└── package.json      # Dependencies and scripts
```

## License

This project is private and proprietary.
