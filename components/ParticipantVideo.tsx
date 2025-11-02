"use client";

import { useEffect, useRef } from 'react';
import { User, Monitor } from 'lucide-react';
import { background, text, brand } from '@/lib/colors';

interface ParticipantVideoProps {
  stream: MediaStream | null;
  isMuted?: boolean;
  isLocal?: boolean;
  name?: string;
  showUnknown?: boolean;
  isScreenSharing?: boolean;
}

export default function ParticipantVideo({ 
  stream, 
  isMuted = false, 
  isLocal = false, 
  name = 'Participant',
  showUnknown = false,
  isScreenSharing = false
}: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div 
      className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{ 
        backgroundColor: '#111827',
        aspectRatio: '16/9',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {stream && !showUnknown ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover"
          style={{
            transform: isLocal && !isScreenSharing ? 'scaleX(-1)' : 'none'
          }}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div 
            className="w-28 h-28 rounded-full flex items-center justify-center mb-4 animate-fade-in"
            style={{ 
              backgroundColor: `${brand.navy}25`,
              border: `3px solid ${brand.navy}40`
            }}
          >
            <User size={56} style={{ color: brand.navy }} />
          </div>
          <p className="text-xl font-bold text-white mb-1">
            {showUnknown ? 'Unknown' : name}
          </p>
          {showUnknown && (
            <p className="text-sm text-gray-400 mt-2 px-4 text-center">
              Video hidden for privacy
            </p>
          )}
        </div>
      )}
      
      {/* Screen Sharing Indicator */}
      {isScreenSharing && (
        <div 
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl animate-fade-in"
          style={{ 
            backgroundColor: 'rgba(16, 185, 129, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}
        >
          <Monitor size={18} className="text-white" />
          <span className="text-sm font-bold text-white tracking-wide">
            Sharing Screen
          </span>
        </div>
      )}
      
      {/* Name overlay */}
      <div 
        className="absolute bottom-4 left-4 px-4 py-2 rounded-xl"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <p className="text-sm font-semibold text-white tracking-wide">
          {isLocal ? 'You' : (showUnknown ? 'Unknown' : name)}
        </p>
      </div>
      
      {/* Muted indicator */}
      {isMuted && (
        <div 
          className="absolute top-4 right-4 px-3 py-2 rounded-xl"
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(220, 38, 38, 0.8)'
          }}
        >
          <p className="text-xs text-white font-bold tracking-wide">MUTED</p>
        </div>
      )}
    </div>
  );
}

