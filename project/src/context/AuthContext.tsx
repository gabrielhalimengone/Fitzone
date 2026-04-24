import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface Session {
  id: string;
  courseName: string;
  coachName: string;
  date: string;
  time: string;
  duration: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  plan: 'starter' | 'pro' | 'elite';
  joinDate: string;
  nextBillingDate: string;
  reservedSessions: Session[];
  coach?: {
    name: string;
    specialty: string;
    image: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  reserveSession: (session: Omit<Session, 'id'>) => void;
  cancelSession: (sessionId: string) => void;
  updatePlan: (plan: 'starter' | 'pro' | 'elite') => void;
  updateUserInfo: (data: { fullName: string; email: string; phone?: string }) => void;
  resetDatabase: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const loggedUser = api.login(email, password);
    if (loggedUser) {
      setUser(api.getCurrentUser());
    } else {
      throw new Error('Identifiants invalides');
    }
  };

  const signup = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    api.signup(data);
    setUser(api.getCurrentUser());
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const reserveSession = (sessionData: Omit<Session, 'id'>) => {
    if (!user) return;
    api.reserveSession(user.id, sessionData);
    setUser(api.getCurrentUser());
  };

  const cancelSession = (sessionId: string) => {
    if (!user) return;
    api.cancelSession(sessionId);
    setUser(api.getCurrentUser());
  };

  const updatePlan = (plan: 'starter' | 'pro' | 'elite') => {
    if (!user) return;
    api.updateUser(user.id, { plan });
    setUser(api.getCurrentUser());
  };

  const updateUserInfo = (data: { fullName: string; email: string; phone?: string }) => {
    if (!user) return;
    api.updateUser(user.id, data);
    setUser(api.getCurrentUser());
  };

  const resetDatabase = () => {
    api.resetDB();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      reserveSession, 
      cancelSession, 
      updatePlan, 
      updateUserInfo, 
      resetDatabase,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
