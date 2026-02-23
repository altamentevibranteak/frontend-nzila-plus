import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import storage from '../services/storage';
import * as UserService from '../api/userService';
import client, { setAuthToken, setSignOutHandler } from '../api/client';
import { User } from '../types';

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

type SignInCredentials = { username: string; password: string };

type AuthContextType = AuthState & {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  restoreToken: () => Promise<void>;
};

const STORAGE_TOKEN_KEY = 'nzila_token';
const STORAGE_USER_KEY = 'nzila_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = useCallback(async ({ username, password }: SignInCredentials) => {
    setLoading(true);
    try {
      const { token: t, user: u } = await UserService.login(username, password);
      setToken(t);
      setUser(u);
      await storage.setToken(t);
      await storage.setUser(u);
      setAuthToken(t);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      setToken(null);
      setUser(null);
      await storage.removeToken();
      await storage.removeUser();
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const restoreToken = useCallback(async () => {
    setLoading(true);
    try {
      const t = await storage.getToken();
      const u = await storage.getUser();
      if (t) {
        setToken(t);
        setUser(u);
        setAuthToken(t);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreToken();
    // wire sign out handler for axios
    setSignOutHandler(() => signOut as () => void);
  }, [restoreToken, signOut]);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, restoreToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
