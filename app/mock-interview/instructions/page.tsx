"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Camera, Mic, Wifi, Clock, CheckCircle, ArrowRight, 
  AlertCircle, Video, MessageSquare, Shield 
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { background, text, brand, border, accent } from '@/lib/colors';
import { checkMediaSupport } from '@/lib/mediaRecording';

export default function InterviewInstructionsPage() {
  const router = useRouter();
  const [isMediaSupported, setIsMediaSupported] = useState(true);

  useState(() => {
    setIsMediaSupported(checkMediaSupport());
  });

  const requirements = [
    {
      icon: Camera,
      title: 'Working Camera',
      description: 'Ensure your camera is connected and working properly'
    },
    {
      icon: Mic,
      title: 'Working Microphone',
      description: 'Test your microphone to ensure clear audio'
    },
    {
      icon: Wifi,
      title: 'Stable Internet',
      description: 'A reliable internet connection is required for video calls'
    },
    {
      icon: Clock,
      title: 'Time Commitment',
      description: 'Interviews typically last 45-60 minutes'
    }
  ];

  const guidelines = [
    'Find a quiet, well-lit space for the interview',
    'Dress professionally as you would for an in-person interview',
    'Close other applications to ensure optimal performance',
    'Have a pen and paper ready for notes if needed',
    'Be ready 5 minutes before the scheduled time',
    'Your video will be recorded and stored securely for review'
  ];

  const features = [
    {
      icon: Video,
      title: 'Video Call',
      description: 'You will see your own video. The interviewer appears as "Unknown" for privacy.'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Use the chat feature to send messages during the interview'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your video is stored securely and used only for interview purposes'
    }
  ];

  const handleStartSetup = () => {
    const roomId = sessionStorage.getItem('interview-room-id') || 'demo-room';
    router.push('/mock-interview/setup?roomId=' + roomId);
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-20" 
      style={{ 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #0f172a, #1e40af, #3b82f6)',
            }}
          >
            Interview Instructions
          </h1>
          <p className="text-2xl font-medium" style={{ color: text.secondary }}>
            Please read these instructions carefully before starting your interview
          </p>
        </div>

        {/* Media Support Warning */}
        {!isMediaSupported && (
          <div 
            className="mb-8 p-6 rounded-2xl animate-scale-in"
            style={{
              background: 'white',
              border: '2px solid #fca5a5',
              boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)'
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#fef2f2' }}
              >
                <AlertCircle size={24} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#991b1b' }}>
                  Browser Not Supported
                </h3>
                <p style={{ color: '#7f1d1d' }}>
                  Your browser doesn't support video recording. Please use Chrome, Firefox, Safari, or Edge.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Technical Requirements */}
        <div 
          className="mb-10 p-8 rounded-3xl animate-slide-up"
          style={{
            background: 'white',
            border: '2px solid rgba(0, 74, 173, 0.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: text.primary }}>
            Technical Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.03), rgba(59, 130, 246, 0.03))',
                  border: '1px solid rgba(0, 74, 173, 0.1)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${brand.navy}, #3b82f6)`,
                    boxShadow: `0 4px 12px ${brand.navy}30`
                  }}
                >
                  <req.icon size={24} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: text.primary }}>
                    {req.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: text.muted }}>
                    {req.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div 
          className="mb-10 p-8 rounded-3xl"
          style={{
            background: 'white',
            border: '2px solid rgba(0, 74, 173, 0.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: text.primary }}>
            Interview Features
          </h2>
          <div className="space-y-5">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.03), rgba(59, 130, 246, 0.03))',
                  border: '1px solid rgba(0, 74, 173, 0.1)'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${brand.navy}15, ${brand.navy}08)`,
                    border: `2px solid ${brand.navy}20`
                  }}
                >
                  <feature.icon size={24} style={{ color: brand.navy }} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: text.primary }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: text.secondary }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div 
          className="mb-10 p-8 rounded-3xl"
          style={{
            background: 'white',
            border: '2px solid rgba(0, 74, 173, 0.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: text.primary }}>
            Interview Guidelines
          </h2>
          <ul className="space-y-4">
            {guidelines.map((guideline, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle 
                  size={24} 
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: accent.emerald }}
                  strokeWidth={2.5}
                />
                <p className="text-lg leading-relaxed pt-0.5" style={{ color: text.secondary }}>
                  {guideline}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy Notice */}
        <div 
          className="mb-12 p-8 rounded-3xl"
          style={{ 
            background: `linear-gradient(135deg, ${brand.navy}08, ${brand.navy}05)`,
            border: `2px solid ${brand.navy}15`,
            boxShadow: '0 8px 24px rgba(0, 74, 173, 0.1)'
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: brand.navy }}
            >
              <Shield size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-3" style={{ color: text.primary }}>
                Privacy & Security
              </h3>
              <p className="text-base leading-relaxed" style={{ color: text.secondary }}>
                Your interview will be recorded and stored securely. The recording is used 
                exclusively for evaluation purposes and will be handled in accordance with 
                our privacy policy. The other participant's video is hidden from you for 
                privacy protection.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleStartSetup}
            disabled={!isMediaSupported}
          >
            Start Setup
            <ArrowRight size={20} />
          </Button>
          <p className="text-base mt-6 font-medium" style={{ color: text.muted }}>
            Next: Camera and microphone setup
          </p>
        </div>
      </div>
    </div>
  );
}

