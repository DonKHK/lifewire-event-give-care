"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { AuthUser, UserRole } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts for testing
const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  "admin@lifewire.org": {
    password: "admin123",
    user: {
      id: "admin-1",
      email: "admin@lifewire.org",
      name: "Lifewire Admin",
      avatar: "",
      role: "admin" as UserRole,
    },
  },
  "user@test.com": {
    password: "user123",
    user: {
      id: "user-1",
      email: "user@test.com",
      name: "測試用戶",
      avatar: "",
      role: "user" as UserRole,
    },
  },
};

let nextUserId = 3;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem("lifewire-auth-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("lifewire-auth-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (account && account.password === password) {
      setUser(account.user);
      localStorage.setItem("lifewire-auth-user", JSON.stringify(account.user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    // Check if email already exists
    if (DEMO_ACCOUNTS[email.toLowerCase()]) {
      setIsLoading(false);
      return false;
    }

    const newUser: AuthUser = {
      id: `user-${nextUserId++}`,
      email: email.toLowerCase(),
      name,
      avatar: "",
      role: "user" as UserRole,
    };

    // In a real app, save to database. For demo, just set state.
    setUser(newUser);
    localStorage.setItem("lifewire-auth-user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("lifewire-auth-user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}