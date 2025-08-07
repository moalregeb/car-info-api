#!/bin/bash

# Backup script for Customs Calculator
# Usage: ./scripts/backup.sh

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="customs-calculator-backup-$TIMESTAMP"

echo "💾 Starting backup process..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup archive
echo "📦 Creating backup archive..."
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=backups \
    --exclude=logs \
    --exclude=*.log \
    .

# Create database backup (if applicable)
# echo "🗄️ Creating database backup..."
# docker exec customs-calculator-db-1 pg_dump -U postgres customs_calculator > "$BACKUP_DIR/db-backup-$TIMESTAMP.sql"

# Create configuration backup
echo "⚙️ Creating configuration backup..."
cp .env "$BACKUP_DIR/env-backup-$TIMESTAMP" 2>/dev/null || echo "No .env file found"

# List backup files
echo "📋 Backup files created:"
ls -la "$BACKUP_DIR/$BACKUP_NAME.tar.gz"
# ls -la "$BACKUP_DIR/db-backup-$TIMESTAMP.sql" 2>/dev/null || echo "No database backup created"
ls -la "$BACKUP_DIR/env-backup-$TIMESTAMP" 2>/dev/null || echo "No env backup created"

# Clean old backups (keep last 10)
echo "🧹 Cleaning old backups..."
cd $BACKUP_DIR
ls -t *.tar.gz | tail -n +11 | xargs -r rm
ls -t env-backup-* | tail -n +11 | xargs -r rm 2>/dev/null || true
# ls -t db-backup-* | tail -n +11 | xargs -r rm 2>/dev/null || true

echo "✅ Backup completed successfully!"
echo "📁 Backup location: $BACKUP_DIR/$BACKUP_NAME.tar.gz"

# Optional: Upload to cloud storage
# echo "☁️ Uploading to cloud storage..."
# aws s3 cp "$BACKUP_DIR/$BACKUP_NAME.tar.gz" s3://your-bucket/backups/ || echo "Cloud upload failed"