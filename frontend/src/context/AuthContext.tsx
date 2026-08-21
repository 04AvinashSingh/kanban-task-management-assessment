"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/kanban";
import { api } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, name?: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("kanban_token");
    const storedUser = localStorage.getItem("kanban_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore
      }
      setIsLoading(false);
    } else {
      // Auto-trigger guest login for instant smooth onboarding
      handleGuestLogin().finally(() => setIsLoading(false));
    }
  }, []);

  const handleGuestLogin = async () => {
    try {
      const res = await api.guestLogin();
      setUser(res.user);
      setToken(res.accessToken);
      localStorage.setItem("kanban_token", res.accessToken);
      localStorage.setItem("kanban_user", JSON.stringify(res.user));
    } catch (err) {
      console.warn("Guest login failed (offline/demo mode active):", err);
      const fallbackUser: User = {
        id: "guest-fallback-id",
        email: "guest@kanban.dev",
        name: "Guest User",
        isGuest: true,
      };
      setUser(fallbackUser);
      setToken("guest-fallback-token");
      localStorage.setItem("kanban_token", "guest-fallback-token");
      localStorage.setItem("kanban_user", JSON.stringify(fallbackUser));
    }
  };

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password: pass });
      setUser(res.user);
      setToken(res.accessToken);
      localStorage.setItem("kanban_token", res.accessToken);
      localStorage.setItem("kanban_user", JSON.stringify(res.user));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, pass: string, name?: string) => {
    setIsLoading(true);
    try {
      const res = await api.register({ email, password: pass, name });
      setUser(res.user);
      setToken(res.accessToken);
      localStorage.setItem("kanban_token", res.accessToken);
      localStorage.setItem("kanban_user", JSON.stringify(res.user));
    } finally {
      setIsLoading(false);
    }
  };

  const guestLogin = async () => {
    setIsLoading(true);
    try {
      await handleGuestLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("kanban_token");
    localStorage.removeItem("kanban_user");
    // Trigger fresh guest session
    handleGuestLogin();
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
