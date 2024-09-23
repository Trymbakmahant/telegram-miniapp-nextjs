"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
  premium: boolean;
  referral: string;
}

interface AuthContextType {
  loading: boolean;
  token: string | null;
  isNew: boolean;
  login: (userData: User) => Promise<string>;
  logout: () => void;
  setIsNew: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (userData: User) => {
    setLoading(true);
    console.log(userData);
    try {
      const response = await fetch(`api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_date: userData.auth_date,
          first_name: userData.first_name,
          hash: userData.hash,
          id: userData.id,
          last_name: userData.last_name,
          photo_url: userData.photo_url,
          username: userData.username,
          premium: userData.premium,
          referral: userData.referral,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.success && data.token) {
        setToken(data.token);
        setIsNew(data.isNew);
        localStorage.setItem("token", data.token);
        return data.token;
      } else {
        throw new Error("Login response did not contain a token");
      }

      console.log(data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, loading, isNew, setIsNew }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { User };
