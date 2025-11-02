"use client";

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { brand, text, border } from '@/lib/colors';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
}

export default function Tabs({ tabs, defaultTab, activeTab: controlledActiveTab, onChange }: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  
  const activeTab = controlledActiveTab || internalActiveTab;
  
  const handleTabChange = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div 
        className="flex border-b overflow-x-auto"
        style={{ borderColor: border.light }}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="relative px-6 py-3 font-medium transition-colors whitespace-nowrap"
              style={{ 
                color: isActive ? brand.navy : text.muted
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: brand.navy }}
                  layoutId="activeTab"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div 
        className="pt-6"
        role="tabpanel"
        id={`panel-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  );
}

