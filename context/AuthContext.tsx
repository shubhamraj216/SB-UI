"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ExtendedUserProfile, getUserProfile, updateUserProfile as updateStorageProfile } from '@/lib/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'candidate' | 'recruiter' | 'interviewer';
  profile?: ExtendedUserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: User['type']) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, type: User['type']) => Promise<void>;
  updateProfile: (profile: Partial<ExtendedUserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('sb_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const profile = getUserProfile();
        setUser({ ...parsedUser, profile });
      } catch (e) {
        localStorage.removeItem('sb_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: User['type']) => {
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const profile = getUserProfile();
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: email.split('@')[0],
      email,
      type,
      profile
    };
    
    setUser(mockUser);
    localStorage.setItem('sb_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string, type: User['type']) => {
    // Mock signup - simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      type,
      profile: {}
    };
    
    setUser(mockUser);
    localStorage.setItem('sb_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sb_user');
    // Note: We keep other data like applications, courses, etc.
  };

  const updateProfile = (profileUpdates: Partial<ExtendedUserProfile>) => {
    if (!user) return;
    
    updateStorageProfile(profileUpdates);
    const updatedProfile = getUserProfile();
    const updatedUser = { ...user, profile: updatedProfile };
    setUser(updatedUser);
    localStorage.setItem('sb_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateProfile
      }}
    >
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

