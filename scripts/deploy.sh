#!/bin/bash

# Deploy script for Customs Calculator
# Usage: ./scripts/deploy.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
APP_NAME="customs-calculator"
DOCKER_IMAGE="$APP_NAME:$ENVIRONMENT"

echo "🚀 Starting deployment for $ENVIRONMENT environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build Docker image
echo "📦 Building Docker image..."
docker build -t $DOCKER_IMAGE .

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Start new containers
echo "▶️ Starting new containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
    exit 1
fi

if curl -f http://localhost:3001/api/categories > /dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📊 API Docs: http://localhost:3001/api/categories"

# Optional: Send notification
if command -v curl > /dev/null 2>&1; then
    echo "📢 Sending deployment notification..."
    # Add your notification webhook here
    # curl -X POST -H "Content-Type: application/json" -d '{"text":"Deployment completed successfully!"}' $WEBHOOK_URL
fi