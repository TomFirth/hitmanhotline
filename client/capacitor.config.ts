import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hitmanhotline.app',
  appName: 'Hitman Hotline',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    // Android emulators use 10.0.2.2 to access your computer's localhost
    url: 'http://10.0.2.2:3000',
    cleartext: true
  }
};

export default config;
