"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type DrawerTab = 'jobs' | 'courses' | 'mock-interview';

interface DrawerContextType {
  isOpen: boolean;
  activeTab: DrawerTab;
  openDrawer: (tab?: DrawerTab) => void;
  closeDrawer: () => void;
  setActiveTab: (tab: DrawerTab) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DrawerTab>('jobs');

  // Check URL params on mount for deep linking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('drawer') === 'open') {
        const tab = params.get('tab') as DrawerTab;
        setIsOpen(true);
        if (tab && ['jobs', 'courses', 'mock-interview'].includes(tab)) {
          setActiveTab(tab);
        }
      }
    }
  }, []);

  const openDrawer = (tab: DrawerTab = 'jobs') => {
    setActiveTab(tab);
    setIsOpen(true);
    
    // Update URL without page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('drawer', 'open');
      url.searchParams.set('tab', tab);
      window.history.pushState({}, '', url.toString());
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    
    // Remove drawer params from URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('drawer');
      url.searchParams.delete('tab');
      window.history.pushState({}, '', url.toString());
    }
  };

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        activeTab,
        openDrawer,
        closeDrawer,
        setActiveTab
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}

