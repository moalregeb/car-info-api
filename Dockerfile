# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY react-frontend/package*.json ./react-frontend/

# Install dependencies
RUN npm ci --only=production
RUN cd react-frontend && npm ci --only=production

# Copy source code
COPY . .

# Build React app
RUN cd react-frontend && npm run build

# Expose ports
EXPOSE 3001 3000

# Start the application
CMD ["npm", "run", "dev"]