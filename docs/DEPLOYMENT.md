# Deployment Guide

This guide covers deploying the Customs Calculator application to various environments.

## Prerequisites

- Node.js 16 or later
- npm or yarn
- Git
- Docker (optional)
- PM2 (for production)

## Local Development

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/customs-calculator.git
cd customs-calculator
```

2. **Install dependencies:**
```bash
npm install
cd react-frontend && npm install && cd ..
```

3. **Start development servers:**
```bash
npm run dev
```

4. **Access the application:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3001

### Environment Variables

Create `.env` files for configuration:

**Root `.env`:**
```env
NODE_ENV=development
PORT=3001
REACT_APP_API_URL=http://localhost:3001
```

**React `.env`:**
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=حاسبة الرسوم الجمركية
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

## Docker Deployment

### Using Docker Compose

1. **Build and start containers:**
```bash
docker-compose up -d
```

2. **Check container status:**
```bash
docker-compose ps
```

3. **View logs:**
```bash
docker-compose logs -f
```

4. **Stop containers:**
```bash
docker-compose down
```

### Manual Docker Build

1. **Build the image:**
```bash
docker build -t customs-calculator .
```

2. **Run the container:**
```bash
docker run -p 3001:3001 customs-calculator
```

## Production Deployment

### Using PM2

1. **Install PM2 globally:**
```bash
npm install -g pm2
```

2. **Create ecosystem file:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'customs-calculator-api',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
```

3. **Start the application:**
```bash
pm2 start ecosystem.config.js
```

4. **Monitor the application:**
```bash
pm2 monit
```

### Using Nginx as Reverse Proxy

1. **Install Nginx:**
```bash
sudo apt update
sudo apt install nginx
```

2. **Configure Nginx:**
```nginx
# /etc/nginx/sites-available/customs-calculator
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable the site:**
```bash
sudo ln -s /etc/nginx/sites-available/customs-calculator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Using Docker in Production

1. **Create production Dockerfile:**
```dockerfile
# Dockerfile.prod
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY react-frontend/package*.json ./react-frontend/
RUN cd react-frontend && npm ci --only=production

COPY . .
RUN cd react-frontend && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/react-frontend/build ./react-frontend/build
COPY server.js ./
COPY package*.json ./

EXPOSE 3001
CMD ["node", "server.js"]
```

2. **Build and run:**
```bash
docker build -f Dockerfile.prod -t customs-calculator:prod .
docker run -p 3001:3001 customs-calculator:prod
```

## Cloud Deployment

### Heroku

1. **Create Heroku app:**
```bash
heroku create your-app-name
```

2. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set REACT_APP_API_URL=https://your-app-name.herokuapp.com
```

3. **Deploy:**
```bash
git push heroku main
```

### DigitalOcean App Platform

1. **Connect your repository**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. **Set environment variables**
4. **Deploy**

### AWS EC2

1. **Launch EC2 instance**
2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone and deploy:**
```bash
git clone https://github.com/your-username/customs-calculator.git
cd customs-calculator
npm install
npm run build
pm2 start ecosystem.config.js
```

## SSL/HTTPS Setup

### Using Let's Encrypt

1. **Install Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx
```

2. **Obtain certificate:**
```bash
sudo certbot --nginx -d your-domain.com
```

3. **Auto-renewal:**
```bash
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logging

### Application Monitoring

1. **Set up PM2 monitoring:**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

2. **Monitor application:**
```bash
pm2 monit
pm2 logs
```

### Error Tracking

1. **Set up error tracking (e.g., Sentry):**
```javascript
// server.js
const Sentry = require('@sentry/node');
Sentry.init({
  dsn: 'your-sentry-dsn'
});
```

## Backup Strategy

### Database Backup

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  .

# Backup logs
tar -czf $BACKUP_DIR/logs_backup_$DATE.tar.gz logs/
```

### Automated Backups

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## Security Considerations

### Environment Variables

- Never commit `.env` files
- Use strong, unique passwords
- Rotate secrets regularly

### Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### SSL/TLS

- Always use HTTPS in production
- Configure secure headers
- Enable HSTS

## Troubleshooting

### Common Issues

1. **Port already in use:**
```bash
lsof -i :3000
kill -9 <PID>
```

2. **Memory issues:**
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 server.js
```

3. **Permission issues:**
```bash
sudo chown -R $USER:$USER /path/to/app
```

### Log Analysis

```bash
# View application logs
pm2 logs

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View system logs
journalctl -u nginx -f
```

## Performance Optimization

### Application Level

- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries

### Server Level

- Use load balancers
- Implement horizontal scaling
- Monitor resource usage
- Optimize server configuration

## Support

For deployment issues:

- Check logs: `pm2 logs` or `docker-compose logs`
- Monitor resources: `htop` or `docker stats`
- Review configuration files
- Contact support: support@customs-calculator.jo