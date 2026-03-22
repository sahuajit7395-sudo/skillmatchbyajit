import { Platform } from 'react-native';

/**
 * Expo dev: iOS simulator and web can use localhost.
 * Android emulator maps host machine to 10.0.2.2.
 * Physical device: set EXPO_PUBLIC_API_URL to http://YOUR_LAN_IP:3001
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
  if (fromEnv) {
    return fromEnv;
  }
  const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  return `http://${host}:3001`;
}
