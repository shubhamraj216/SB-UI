"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Video, Clock, Users, Shield, MessageSquare, Monitor, Camera, Play
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import { background, text, brand, border, accent } from '@/lib/colors';

const generateRoomId = () => {
  return 'room-' + Math.random().toString(36).substring(2, 9);
};

export default function MockInterviewPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [roomIdInput, setRoomIdInput] = useState('');

  const handleCreateRoom = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const roomId = generateRoomId();
    sessionStorage.setItem('interview-room-id', roomId);
    router.push('/mock-interview/instructions');
  };

  const handleJoinRoom = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!roomIdInput.trim()) {
      alert('Please enter a room ID');
      return;
    }

    sessionStorage.setItem('interview-room-id', roomIdInput.trim());
    router.push('/mock-interview/instructions');
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-20" 
      style={{ 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #0f172a, #1e40af, #3b82f6)',
            }}
          >
            Live Video Interview
          </h1>
          <p className="text-2xl max-w-3xl mx-auto font-medium" style={{ color: text.secondary }}>
            Connect with interviewers in real-time with professional video calling
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
          {[
            { icon: Video, title: 'HD Video Call', desc: 'Crystal clear video interviews' },
            { icon: Users, title: '1-on-1 Interview', desc: 'Personal interview experience' },
            { icon: MessageSquare, title: 'Live Chat', desc: 'Text chat during interview' },
            { icon: Shield, title: 'Privacy First', desc: 'Secure and private' }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: 'white',
                border: '2px solid rgba(0, 74, 173, 0.1)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${brand.navy}, #3b82f6)`,
                    boxShadow: `0 8px 20px ${brand.navy}30`
                  }}
                >
                  <feature.icon size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: text.primary }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: text.muted }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mode Selection */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setMode('create')}
              className="flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: mode === 'create' 
                  ? `linear-gradient(135deg, ${brand.navy}, #3b82f6)`
                  : 'white',
                color: mode === 'create' ? 'white' : text.primary,
                border: `3px solid ${mode === 'create' ? brand.navy : 'rgba(0, 74, 173, 0.2)'}`,
                boxShadow: mode === 'create' 
                  ? `0 8px 24px ${brand.navy}40`
                  : '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              Create Interview Room
            </button>
            <button
              onClick={() => setMode('join')}
              className="flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: mode === 'join' 
                  ? `linear-gradient(135deg, ${brand.navy}, #3b82f6)`
                  : 'white',
                color: mode === 'join' ? 'white' : text.primary,
                border: `3px solid ${mode === 'join' ? brand.navy : 'rgba(0, 74, 173, 0.2)'}`,
                boxShadow: mode === 'join' 
                  ? `0 8px 24px ${brand.navy}40`
                  : '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              Join Existing Room
            </button>
          </div>

          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'white',
              border: '2px solid rgba(0, 74, 173, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="p-10">
              {mode === 'create' ? (
                <div>
                  <div className="text-center mb-8">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ 
                        background: `linear-gradient(135deg, ${brand.navy}, #3b82f6)`,
                        boxShadow: `0 12px 32px ${brand.navy}40`
                      }}
                    >
                      <Camera size={36} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-bold mb-3" style={{ color: text.primary }}>
                      Create New Interview Room
                    </h2>
                    <p className="text-lg" style={{ color: text.secondary }}>
                      Start a new video interview session. A unique room ID will be generated for you.
                    </p>
                  </div>

                  <div 
                    className="p-6 rounded-2xl mb-8"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.05), rgba(59, 130, 246, 0.05))',
                      border: '2px solid rgba(0, 74, 173, 0.1)'
                    }}
                  >
                    <h3 className="font-bold text-lg mb-4" style={{ color: text.primary }}>
                      What happens next:
                    </h3>
                    <ul className="space-y-3" style={{ color: text.secondary }}>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-lg" style={{ color: brand.navy }}>1.</span>
                        <span className="pt-0.5">Read interview instructions and guidelines</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-lg" style={{ color: brand.navy }}>2.</span>
                        <span className="pt-0.5">Set up and test your camera and microphone</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-lg" style={{ color: brand.navy }}>3.</span>
                        <span className="pt-0.5">Join the video call and start your interview</span>
                      </li>
                    </ul>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCreateRoom}
                    className="w-full"
                  >
                    <Play size={20} />
                    Create Room & Start
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ 
                        background: `linear-gradient(135deg, ${brand.navy}, #3b82f6)`,
                        boxShadow: `0 12px 32px ${brand.navy}40`
                      }}
                    >
                      <Monitor size={36} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-bold mb-3" style={{ color: text.primary }}>
                      Join Interview Room
                    </h2>
                    <p className="text-lg" style={{ color: text.secondary }}>
                      Enter the room ID provided by your interviewer to join the session.
                    </p>
                  </div>

                  <div className="mb-8">
                    <label className="block text-base font-bold mb-3" style={{ color: text.secondary }}>
                      Room ID
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter room ID (e.g., room-abc123)"
                      value={roomIdInput}
                      onChange={(e) => setRoomIdInput(e.target.value)}
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleJoinRoom}
                    disabled={!roomIdInput.trim()}
                    className="w-full"
                  >
                    <Play size={20} />
                    Join Room
                  </Button>
                </div>
              )}

              {!isAuthenticated && (
                <p className="text-sm text-center mt-6 font-medium" style={{ color: text.muted }}>
                  Please login to join an interview
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: text.primary }}>
            Interview Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'Video Recording',
                desc: 'Your interview is recorded and stored securely for review and evaluation purposes.'
              },
              {
                icon: Shield,
                title: 'Privacy Protected',
                desc: 'The other participant appears as "Unknown" to protect their privacy during the interview.'
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                desc: 'Use the built-in chat to send messages and share information during the interview.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'white',
                  border: '2px solid rgba(0, 74, 173, 0.1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ 
                    background: `linear-gradient(135deg, ${brand.navy}15, ${brand.navy}08)`,
                    border: `2px solid ${brand.navy}20`
                  }}
                >
                  <feature.icon size={32} style={{ color: brand.navy }} strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: text.primary }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: text.secondary }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

