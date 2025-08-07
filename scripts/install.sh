#!/bin/bash

# Installation script for Customs Calculator
# Usage: ./scripts/install.sh

set -e

echo "🚀 Installing Customs Calculator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or later."
    echo "📥 Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or later is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "⚠️ Git is not installed. Some features may not work properly."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install React dependencies
echo "📦 Installing React dependencies..."
cd react-frontend
npm install
cd ..

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p backups
mkdir -p react-frontend/build

# Set up environment variables
echo "⚙️ Setting up environment variables..."
if [ ! -f ".env" ]; then
    cat > .env << EOF
NODE_ENV=development
PORT=3001
REACT_APP_API_URL=http://localhost:3001
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Set up React environment variables
if [ ! -f "react-frontend/.env" ]; then
    cat > react-frontend/.env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=حاسبة الرسوم الجمركية
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
EOF
    echo "✅ Created React .env file"
else
    echo "✅ React .env file already exists"
fi

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh

# Build React app
echo "🔨 Building React app..."
cd react-frontend
npm run build
cd ..

# Test the installation
echo "🧪 Testing installation..."
if npm run server &> /dev/null & then
    SERVER_PID=$!
    sleep 5
    
    if curl -f http://localhost:3001/api/categories > /dev/null 2>&1; then
        echo "✅ Backend test passed"
    else
        echo "❌ Backend test failed"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
    
    kill $SERVER_PID 2>/dev/null || true
else
    echo "❌ Backend test failed"
    exit 1
fi

echo "🎉 Installation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Check the API at http://localhost:3001/api/categories"
echo ""
echo "📚 Documentation: README.md"
echo "🐛 Issues: Check the logs directory for error logs"
echo ""
echo "🚀 Happy coding!"