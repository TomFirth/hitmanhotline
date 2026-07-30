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

## 3. Local Development & Deployment
For testing the full Agency OS ecosystem on a local machine.

### Prerequisites
- Node.js (v18+)
- Android Studio (for mobile testing)
- Docker (optional, for containerised local server)

### 1. Initialise the Server
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
```
The server will be live at `http://localhost:3001`.

### 2. Initialise the Client (Web)
```bash
cd client
npm install
npm start
```
The web dashboard will be live at `http://localhost:3000`.

### 3. Mobile Deployment (Android)
To run the app on an Android Emulator or physical device:

1. **Build the web project:**
   ```bash
   cd client
   npm run build
   ```

2. **Sync with Capacitor:**
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

4. **Emulator Networking:**
   The `capacitor.config.ts` is configured to use `10.0.2.2`, which is the alias for your computer's `localhost` from within the Android Emulator. Ensure the server is running on port `3001` before launching.

## 4. Database Persistence
- **Volume Mapping:** Ensure `docker-compose.yml` maps the SQLite file to the Pi's disk so data survives container rebuilds.
```yaml
volumes:
  - ./server/prisma/dev.db:/app/prisma/dev.db
```

## 5. Inspecting the Database
The project uses **Prisma** to manage the SQLite database. You can use **Prisma Studio**, a web-based GUI, to view and edit your data (Users, Staff, Missions, etc.).

### Local Inspection
1. Open a terminal and navigate to the server directory:
   ```bash
   cd server
   ```
2. Run Prisma Studio:
   ```bash
   npx prisma studio
   ```
3. A browser window will automatically open at `http://localhost:5555`.

### Remote Inspection (via SSH Tunnel)
To inspect the database running on the Raspberry Pi:
1. Establish an SSH tunnel from your local machine:
   ```bash
   ssh -L 5555:localhost:5555 barber@192.168.1.81
   ```
2. On the Raspberry Pi (inside the project directory):
   ```bash
   cd server
   npx prisma studio
   ```
3. Access the GUI on your local browser at `http://localhost:5555`.

## 6. Content Generation Commands
You can manually trigger the generation of new content (Missions, Recruits, Sponsors, News) using the following commands inside the `server/` directory.

| Content Type | Command | Description |
| :--- | :--- | :--- |
| **Market Assets** | `npm run spawn:market [count]` | Clear and respawn recruits in the recruitment market. |
| **Missions** | `npm run spawn:missions [count]` | Clear and respawn available contracts in the COO Hub. |
| **Sponsorships** | `npm run spawn:sponsors [count]` | Clear and respawn sponsorship deals in the CFO Office. |
| **Global News** | `npm run spawn:news [count]` | Clear and respawn the news headlines on the CEO Dashboard. |

*Note: If no count is provided, the scripts default to a healthy amount (10 items or 5 for news).*
