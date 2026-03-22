import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '@/constants/api';

const STORAGE_KEY = 'skillmatch_admin_jwt';

interface AuthContextValue {
  adminToken: string | null;
  authReady: boolean;
  loginAdmin: (username: string, password: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  clearAdminSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && stored) {
          setAdminToken(stored);
        }
      } finally {
        if (!cancelled) {
          setAuthReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistToken = useCallback(async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem(STORAGE_KEY, token);
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
    setAdminToken(token);
  }, []);

  const loginAdmin = useCallback(async (username: string, password: string) => {
    const base = getApiBaseUrl();
    const res = await fetch(`${base}/api/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      accessToken?: string;
      error?: string;
    };
    if (!res.ok) {
      throw new Error(data.error || res.statusText || 'Login failed');
    }
    if (!data.accessToken) {
      throw new Error('Invalid server response');
    }
    await persistToken(data.accessToken);
  }, [persistToken]);

  const logoutAdmin = useCallback(async () => {
    await persistToken(null);
  }, [persistToken]);

  const clearAdminSession = useCallback(async () => {
    await persistToken(null);
  }, [persistToken]);

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        authReady,
        loginAdmin,
        logoutAdmin,
        clearAdminSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
