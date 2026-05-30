/**
 * Auth context:
 * - Task 1 implementation uses /users?username={email}.
 * - Verifies password client-side against fetched user entry.
 * - Persists and restores session using AsyncStorage.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginWithUsername } from "../services/authService";

const AuthContext = createContext(null);
const AUTH_KEY = "pft_auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const saved = await AsyncStorage.getItem(AUTH_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } finally {
        setIsBootstrapping(false);
      }
    };
    hydrate();
  }, []);

  const login = async (username, password) => {
    const users = await loginWithUsername(username);
    if (!users?.length) {
      throw new Error("No account found with this email.");
    }
    const account = users[0];
    if (account.password !== password) {
      throw new Error("Incorrect password.");
    }
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(account));
    setUser(account);
    return account;
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isBootstrapping,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
