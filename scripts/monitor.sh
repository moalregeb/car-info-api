#!/bin/bash

# Monitoring script for Customs Calculator
# Usage: ./scripts/monitor.sh

set -e

LOG_FILE="./logs/monitor.log"
ALERT_EMAIL="admin@customs-calculator.jo"

# Create logs directory if it doesn't exist
mkdir -p ./logs

# Function to log messages
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}

# Function to send alert
send_alert() {
    local message="$1"
    log "ALERT: $message"
    # echo "$message" | mail -s "Customs Calculator Alert" $ALERT_EMAIL
    # Or send to Slack/Discord webhook
    # curl -X POST -H "Content-Type: application/json" -d "{\"text\":\"$message\"}" $WEBHOOK_URL
}

# Check if services are running
check_services() {
    log "Checking services..."
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        log "✅ Frontend is running"
    else
        send_alert "Frontend is down!"
        return 1
    fi
    
    # Check backend
    if curl -f http://localhost:3001/api/categories > /dev/null 2>&1; then
        log "✅ Backend is running"
    else
        send_alert "Backend is down!"
        return 1
    fi
    
    return 0
}

# Check system resources
check_resources() {
    log "Checking system resources..."
    
    # Check CPU usage
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
        send_alert "High CPU usage: ${CPU_USAGE}%"
    fi
    
    # Check memory usage
    MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.2f", $3/$2 * 100.0}')
    if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
        send_alert "High memory usage: ${MEMORY_USAGE}%"
    fi
    
    # Check disk usage
    DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
    if [ "$DISK_USAGE" -gt 80 ]; then
        send_alert "High disk usage: ${DISK_USAGE}%"
    fi
    
    log "CPU: ${CPU_USAGE}%, Memory: ${MEMORY_USAGE}%, Disk: ${DISK_USAGE}%"
}

# Check Docker containers
check_containers() {
    log "Checking Docker containers..."
    
    if ! docker info > /dev/null 2>&1; then
        send_alert "Docker is not running!"
        return 1
    fi
    
    # Check if containers are running
    if ! docker-compose ps | grep -q "Up"; then
        send_alert "Docker containers are not running!"
        return 1
    fi
    
    log "✅ Docker containers are running"
}

# Check logs for errors
check_logs() {
    log "Checking application logs..."
    
    # Check for recent errors in logs
    if [ -f "./logs/app.log" ]; then
        ERROR_COUNT=$(tail -n 100 ./logs/app.log | grep -i "error" | wc -l)
        if [ "$ERROR_COUNT" -gt 10 ]; then
            send_alert "High error count in logs: $ERROR_COUNT errors"
        fi
    fi
}

# Main monitoring function
main() {
    log "Starting monitoring check..."
    
    check_services
    check_resources
    check_containers
    check_logs
    
    log "Monitoring check completed"
}

# Run monitoring
main

# Optional: Run continuously
if [ "$1" = "--continuous" ]; then
    log "Starting continuous monitoring..."
    while true; do
        sleep 300  # Check every 5 minutes
        main
    done
fi