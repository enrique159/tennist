import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'xyz.enriquemarin.tennist',
  appName: 'tennist',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
