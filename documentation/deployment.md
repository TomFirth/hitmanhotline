# Deployment & Hosting Strategy

## 1. Server & Database (Raspberry Pi)
The "Agency Mainframe" resides on a local Raspberry Pi.

- **Target:** `barber@192.168.1.81`
- **Environment:** Docker & Docker Compose
- **Database:** SQLite (persisted via Docker volume)

### Deployment Script (`deploy-pi.sh` recommended):
```bash
#!/bin/bash
PI_USER="barber"
PI_HOST="192.168.1.81"
DEST_DIR="~/agency-os"

echo "📡 Establishing secure uplink to Agency Mainframe..."
ssh $PI_USER@$PI_HOST "mkdir -p $DEST_DIR"
scp -r ./server ./client docker-compose.yml $PI_USER@$PI_HOST:$DEST_DIR
ssh $PI_USER@$PI_HOST "cd $DEST_DIR && docker compose up -d --build"
echo "✅ Uplink complete. Agency OS is live."
```

## 2. Client (Android & Web)

### Android Build
To turn the React app into a mobile binary, we will use **Capacitor** (by Ionic).
- **Strategy:** Wrap the React build in a Capacitor webview.
- **Benefits:** Instant access to push notifications and local hardware if needed.
- **Build Process:** `npm run build` -> `npx cap sync` -> Open in Android Studio.

### Web Hosting
For external access (outside the local network):
- **Provider:** Vercel or Netlify (Free tiers are perfect for React SPAs).
- **Sync Logic:** The web-hosted client will connect to the Raspberry Pi server via a secure tunnel (e.g., Cloudflare Tunnel or Tailscale) if public access is desired, or operate in "Offline Mode" until it hits the local network.

## 3. Database Persistence
- **Volume Mapping:** Ensure `docker-compose.yml` maps the SQLite file to the Pi's disk so data survives container rebuilds.
```yaml
volumes:
  - ./server/prisma/dev.db:/app/prisma/dev.db
```
