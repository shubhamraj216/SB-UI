"use client";

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, RotateCcw, User, Home, Video } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { background, text, brand, accent } from '@/lib/colors';

function InterviewCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || '';
  const duration = searchParams.get('duration') || '0:00';

  // Ensure all media devices are stopped when this page loads
  useEffect(() => {
    const cleanup = async () => {
      try {
        // Get all media tracks and stop them
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => null);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        // Silently fail - devices may already be stopped
        console.log('Media cleanup on complete page:', error);
      }
    };
    
    cleanup();
  }, []);

  const formatDuration = (timeStr: string) => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0]);
      const secs = parseInt(parts[1]);
      if (mins > 0) {
        return `${mins} minute${mins > 1 ? 's' : ''} ${secs} second${secs > 1 ? 's' : ''}`;
      }
      return `${secs} second${secs > 1 ? 's' : ''}`;
    }
    return timeStr;
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-20" 
      style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #dbeafe 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl overflow-hidden animate-fade-in"
          style={{
            background: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 74, 173, 0.1)'
          }}
        >
          <div className="text-center py-16 px-8">
            {/* Success Icon with animation */}
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in"
              style={{ 
                background: `linear-gradient(135deg, ${accent.emerald}, #059669)`,
                boxShadow: `0 12px 32px ${accent.emerald}40`
              }}
            >
              <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #0f172a, #1e40af)',
              }}
            >
              Interview Complete!
            </h1>
            
            <p className="text-xl mb-12" style={{ color: text.secondary }}>
              Thank you for completing your video interview
            </p>

            {/* Interview Statistics */}
            <div 
              className="max-w-lg mx-auto p-8 rounded-2xl mb-10"
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.05), rgba(59, 130, 246, 0.05))',
                border: '2px solid rgba(0, 74, 173, 0.1)'
              }}
            >
              <h3 className="font-bold text-lg mb-6" style={{ color: text.primary }}>
                Interview Summary
              </h3>
              
              <div className="space-y-5 text-left">
                <div className="flex items-center justify-between p-4 rounded-xl" 
                  style={{ backgroundColor: 'white' }}
                >
                  <span className="font-medium" style={{ color: text.muted }}>Duration</span>
                  <span className="font-bold text-lg" style={{ color: brand.navy }}>
                    {formatDuration(duration)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl" 
                  style={{ backgroundColor: 'white' }}
                >
                  <span className="font-medium" style={{ color: text.muted }}>Room ID</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: text.secondary }}>
                    {roomId}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-xl" 
                  style={{ backgroundColor: 'white' }}
                >
                  <span className="font-medium" style={{ color: text.muted }}>Recording Status</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: accent.emerald }}
                    />
                    <span className="font-bold" style={{ color: accent.emerald }}>
                      Saved Securely
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Box */}
            <div 
              className="p-8 rounded-2xl text-left mb-10"
              style={{ 
                background: `linear-gradient(135deg, ${brand.navy}08, ${brand.navy}05)`,
                border: `2px solid ${brand.navy}15`
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: brand.navy }}
                >
                  <Video size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: text.primary }}>
                    What Happens Next?
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: text.secondary }}>
                    You have completed your interview. You can check your profile for updates on this interview 
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => router.push('/mock-interview')}
              >
                <RotateCcw size={20} />
                Start New Interview
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/profile')}
              >
                <User size={20} />
                View Profile
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push('/')}
              >
                <Home size={20} />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: background.primary }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: brand.navy }}></div>
          <p style={{ color: text.secondary }}>Loading...</p>
        </div>
      </div>
    }>
      <InterviewCompleteContent />
    </Suspense>
  );
}

