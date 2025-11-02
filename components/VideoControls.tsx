"use client";

import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Circle, Monitor, MonitorOff } from 'lucide-react';
import { background, text, brand } from '@/lib/colors';

interface VideoControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
  isChatOpen: boolean;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onToggleChat: () => void;
  onEndCall: () => void;
  duration: string;
}

export default function VideoControls({
  isMicOn,
  isCameraOn,
  isScreenSharing,
  isRecording,
  isChatOpen,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onToggleChat,
  onEndCall,
  duration
}: VideoControlsProps) {
  const ControlButton = ({ 
    onClick, 
    isActive, 
    icon: Icon, 
    label,
    isEndCall = false 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    icon: any; 
    label: string;
    isEndCall?: boolean;
  }) => (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: isEndCall 
          ? '#ef4444' 
          : isActive 
            ? brand.navy 
            : 'rgba(255, 255, 255, 0.95)',
        border: `2px solid ${isEndCall ? '#dc2626' : isActive ? brand.navy : 'rgba(229, 231, 235, 0.8)'}`,
        backdropFilter: 'blur(10px)',
        boxShadow: isActive ? '0 4px 12px rgba(0, 74, 173, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
      title={label}
    >
      <Icon 
        size={22} 
        className="transition-transform duration-300 group-hover:scale-110"
        style={{ 
          color: isEndCall || isActive ? 'white' : text.secondary,
          strokeWidth: 2.5
        }} 
      />
      <span 
        className="text-xs font-semibold tracking-wide"
        style={{ 
          color: isEndCall || isActive ? 'white' : text.muted 
        }}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 py-6 px-4 animate-fade-in"
      style={{ 
        background: 'linear-gradient(to top, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(229, 231, 235, 0.5)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Timer and Recording Indicator */}
        <div className="flex-1 flex items-center gap-4">
          {isRecording && (
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full animate-pulse-subtle" 
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <Circle size={10} className="fill-current animate-pulse" style={{ color: '#ef4444' }} />
              <span className="text-sm font-semibold tracking-wide" style={{ color: '#dc2626' }}>REC</span>
            </div>
          )}
          <div 
            className="px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: 'rgba(0, 74, 173, 0.08)',
              border: '1px solid rgba(0, 74, 173, 0.15)'
            }}
          >
            <p className="text-base font-bold tracking-wide" style={{ color: brand.navy }}>
              {duration}
            </p>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="flex gap-3">
          <ControlButton
            onClick={onToggleMic}
            isActive={isMicOn}
            icon={isMicOn ? Mic : MicOff}
            label={isMicOn ? 'Mute' : 'Unmute'}
          />
          
          <ControlButton
            onClick={onToggleCamera}
            isActive={isCameraOn}
            icon={isCameraOn ? Video : VideoOff}
            label="Camera"
          />
          
          <ControlButton
            onClick={onToggleScreenShare}
            isActive={isScreenSharing}
            icon={isScreenSharing ? MonitorOff : Monitor}
            label={isScreenSharing ? 'Stop Share' : 'Share Screen'}
          />
          
          <ControlButton
            onClick={onToggleChat}
            isActive={isChatOpen}
            icon={MessageSquare}
            label="Chat"
          />
          
          <ControlButton
            onClick={onEndCall}
            icon={Phone}
            label="End Call"
            isEndCall
          />
        </div>
        
        {/* Spacer for balance */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

