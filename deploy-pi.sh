#!/bin/bash
PI_USER="barber"
PI_HOST="192.168.1.81"
DEST_DIR="~/agency-os"

echo "📡 Establishing secure uplink to Agency Mainframe ($PI_HOST)..."

# Ensure target directory exists
ssh $PI_USER@$PI_HOST "mkdir -p $DEST_DIR"

# Rsync is better for deployment as it only sends changes
echo "📦 Uploading assets..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.artifacts' ./server ./client docker-compose.yml $PI_USER@$PI_HOST:$DEST_DIR

# Restart containers
echo "🚀 Rebooting Agency OS..."
ssh $PI_USER@$PI_HOST "cd $DEST_DIR && docker compose up -d --build"

echo "✅ Uplink complete. Agency OS is live at http://$PI_HOST:3000"
