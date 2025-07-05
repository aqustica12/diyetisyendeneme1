
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'admin' | 'client' | null;

interface AuthContextType {
  isAuthenticated: boolean | undefined;
  userRole: UserRole;
  userEmail: string | null;
  userPhone: string | null;
  login: (email: string, phone: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@fitopya.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    try {
      const authItem = window.sessionStorage.getItem('isAuthenticated');
      const authStatus = authItem ? JSON.parse(authItem) : false;
      setIsAuthenticated(authStatus);

      if (authStatus) {
        const roleItem = window.sessionStorage.getItem('userRole');
        const emailItem = window.sessionStorage.getItem('userEmail');
        const phoneItem = window.sessionStorage.getItem('userPhone');
        if (roleItem) setUserRole(JSON.parse(roleItem));
        if (emailItem) setUserEmail(JSON.parse(emailItem));
        if (phoneItem) setUserPhone(JSON.parse(phoneItem));
      } else {
        setUserRole(null);
        setUserEmail(null);
        setUserPhone(null);
      }
    } catch (error) {
      console.error("Failed to load auth state from sessionStorage", error);
      setIsAuthenticated(false);
      setUserRole(null);
      setUserEmail(null);
      setUserPhone(null);
    }
  }, []);

  const login = (email: string, phone: string | null) => {
    const role = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'client';
    try {
      window.sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      window.sessionStorage.setItem('userRole', JSON.stringify(role));
      window.sessionStorage.setItem('userEmail', JSON.stringify(email));
      if (phone) {
        window.sessionStorage.setItem('userPhone', JSON.stringify(phone));
      } else {
        window.sessionStorage.removeItem('userPhone');
      }
      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(email);
      setUserPhone(phone);
    } catch (error) {
      console.error("Failed to save auth state to sessionStorage", error);
    }
  };

  const logout = () => {
    try {
      window.sessionStorage.removeItem('isAuthenticated');
      window.sessionStorage.removeItem('userRole');
      window.sessionStorage.removeItem('userEmail');
      window.sessionStorage.removeItem('userPhone');
      setIsAuthenticated(false);
      setUserRole(null);
      setUserEmail(null);
      setUserPhone(null);
    } catch (error) {
      console.error("Failed to clear auth state from sessionStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userEmail, userPhone, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
