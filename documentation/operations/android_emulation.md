# Local Development & Android Emulation

This guide explains how to run the full Agency OS stack locally on your desktop and connect the Android Studio emulator to your local server.

## 🖥️ 1. Running the Server & DB Locally

Since the project is built with SQLite and Docker, you can run it on your desktop exactly like you would on the Pi.

### Prerequisites
- Node.js installed
- Docker Desktop (optional, but recommended)

### Start via Docker (Easiest)
```bash
docker compose up --build
```
The server will be available at `http://localhost:3001` and the web client at `http://localhost:3000`.

## 🤖 2. Building for Android Emulator

To run the client on an Android Emulator, we use **Capacitor** to wrap the React build.

### Setup Capacitor
1. **Initialise Capacitor:**
   ```bash
   cd client
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "Hitman Hotline" "com.hitmanhotline.app" --web-dir build
   npx cap add android
   ```

2. **Configure Local Network Access:**
   Android emulators see your desktop's `localhost` as `10.0.2.2`. 
   Update `client/capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://10.0.2.2:3000', // Points to your local React dev server
     cleartext: true
   }
   ```

3. **Build & Sync:**
   ```bash
   npm run build
   npx cap sync
   npx cap open android # Opens Android Studio
   ```

## 🌐 3. Networking for the Emulator

| Device | Target Address |
| --- | --- |
| **Browser (Desktop)** | `http://localhost:3000` |
| **Android Emulator** | `http://10.0.2.2:3000` |
| **Physical Phone (Wifi)** | `http://[YOUR_IP]:3000` |

### Important Note on API Calls
The client needs to know where the server is. In the `.env` file for the client, set:
`REACT_APP_API_URL=http://10.0.2.2:3001` (for emulator use).
