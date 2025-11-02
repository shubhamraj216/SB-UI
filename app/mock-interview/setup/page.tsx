"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Camera, Mic, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import Button from '@/components/Button';
import { background, text, brand, border, accent } from '@/lib/colors';
import { getMediaStream, stopMediaStream, captureImageFromVideo, uploadImageToBackend } from '@/lib/mediaRecording';

function CameraSetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || 'demo-room';
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [micPermission, setMicPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [imageCaptured, setImageCaptured] = useState(false);
  const [capturedImageData, setCapturedImageData] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    requestPermissions();
    
    return () => {
      if (stream) {
        stopMediaStream(stream);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream && !imageCaptured) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, imageCaptured]);

  const requestPermissions = async () => {
    try {
      const mediaStream = await getMediaStream({ video: true, audio: true });
      
      if (mediaStream) {
        setStream(mediaStream);
        setCameraPermission('granted');
        setMicPermission('granted');
        setError('');
      } else {
        setCameraPermission('denied');
        setMicPermission('denied');
        setError('Camera and microphone access denied. Please enable permissions in your browser settings.');
      }
    } catch (err) {
      setCameraPermission('denied');
      setMicPermission('denied');
      setError('Failed to access camera and microphone. Please check your browser settings.');
    }
  };

  const handleCaptureImage = async () => {
    if (!videoRef.current || !stream) {
      setError('Video stream not available');
      return;
    }

    try {
      setIsUploading(true);
      const imageData = await captureImageFromVideo(videoRef.current);
      
      // Upload to backend
      const success = await uploadImageToBackend(imageData, roomId);
      
      if (success) {
        setImageCaptured(true);
        setCapturedImageData(imageData);
        setError('');
      } else {
        setError('Failed to upload image. Please try again.');
      }
    } catch (err) {
      setError('Failed to capture image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetakeImage = () => {
    setImageCaptured(false);
    setCapturedImageData('');
  };

  const handleJoinInterview = () => {
    // Keep the stream alive for the interview
    router.push(`/mock-interview/${roomId}`);
  };

  const canProceed = cameraPermission === 'granted' && micPermission === 'granted' && imageCaptured;

  return (
    <div 
      className="min-h-screen pt-24 pb-20" 
      style={{ 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #0f172a, #1e40af, #3b82f6)',
            }}
          >
            Camera & Microphone Setup
          </h1>
          <p className="text-2xl font-medium" style={{ color: text.secondary }}>
            We need to test your camera and microphone before joining the interview
          </p>
        </div>

        {/* Error Message */}
        {error && (
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
                  Error
                </h3>
                <p style={{ color: '#7f1d1d' }}>
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Video Preview */}
        <div 
          className="mb-10 p-8 rounded-3xl animate-slide-up"
          style={{
            background: 'white',
            border: '2px solid rgba(0, 74, 173, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: text.primary }}>
            Video Preview
          </h2>
          
          <div 
            className="relative rounded-2xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl"
            style={{ 
              backgroundColor: '#111827',
              aspectRatio: '16/9',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
              {cameraPermission === 'granted' ? (
                imageCaptured && capturedImageData ? (
                  // Show captured image
                  <div className="relative w-full h-full">
                    <img
                      src={capturedImageData}
                      alt="Captured preview"
                      className="w-full h-full object-cover"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    <div 
                      className="absolute top-4 right-4 px-4 py-2 rounded-xl flex items-center gap-2 animate-fade-in"
                      style={{ 
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                      }}
                    >
                      <CheckCircle size={20} className="text-white" />
                      <span className="text-sm font-bold text-white tracking-wide">Image Captured</span>
                    </div>
                  </div>
                ) : (
                  // Show live video
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <Camera size={48} className="text-gray-400" />
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {cameraPermission === 'pending' ? 'Requesting camera access...' : 'Camera access denied'}
                  </p>
                </div>
              )}
            </div>

            {cameraPermission === 'granted' && (
              <div className="flex gap-4">
                {!imageCaptured ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCaptureImage}
                    disabled={isUploading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw size={20} className="animate-spin" />
                        Capturing...
                      </>
                    ) : (
                      <>
                        <Camera size={20} />
                        Capture Image
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleRetakeImage}
                      className="flex-1"
                    >
                      <RefreshCw size={20} />
                      Retake Photo
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleJoinInterview}
                      className="flex-1"
                    >
                      Continue
                      <ArrowRight size={20} />
                    </Button>
                  </>
                )}
              </div>
            )}

            {cameraPermission === 'denied' && (
              <Button
                variant="outline"
                size="md"
                onClick={requestPermissions}
                className="w-full"
              >
                <RefreshCw size={20} />
                Retry Permissions
              </Button>
            )}
          </div>

        {/* Permission Status */}
        <div 
          className="mb-10 p-8 rounded-3xl"
          style={{
            background: 'white',
            border: '2px solid rgba(0, 74, 173, 0.1)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)'
          }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: text.primary }}>
            Setup Checklist
          </h2>
          
          <div className="space-y-5">
            {/* Camera */}
            <div 
              className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.03), rgba(59, 130, 246, 0.03))',
                border: '1px solid rgba(0, 74, 173, 0.1)'
              }}
            >
              {cameraPermission === 'granted' ? (
                <CheckCircle size={28} style={{ color: accent.emerald }} strokeWidth={2.5} />
              ) : cameraPermission === 'denied' ? (
                <AlertCircle size={28} style={{ color: '#ef4444' }} strokeWidth={2.5} />
              ) : (
                <div 
                  className="w-7 h-7 rounded-full animate-pulse"
                  style={{ borderColor: brand.navy, borderWidth: '3px', borderStyle: 'solid' }}
                />
              )}
              <div className="flex items-center gap-3">
                <Camera size={24} style={{ color: text.secondary }} strokeWidth={2.5} />
                <span className="font-bold text-lg" style={{ color: text.primary }}>
                  Camera Access {cameraPermission === 'granted' ? 'Granted' : cameraPermission === 'denied' ? 'Denied' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Microphone */}
            <div 
              className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.03), rgba(59, 130, 246, 0.03))',
                border: '1px solid rgba(0, 74, 173, 0.1)'
              }}
            >
              {micPermission === 'granted' ? (
                <CheckCircle size={28} style={{ color: accent.emerald }} strokeWidth={2.5} />
              ) : micPermission === 'denied' ? (
                <AlertCircle size={28} style={{ color: '#ef4444' }} strokeWidth={2.5} />
              ) : (
                <div 
                  className="w-7 h-7 rounded-full animate-pulse"
                  style={{ borderColor: brand.navy, borderWidth: '3px', borderStyle: 'solid' }}
                />
              )}
              <div className="flex items-center gap-3">
                <Mic size={24} style={{ color: text.secondary }} strokeWidth={2.5} />
                <span className="font-bold text-lg" style={{ color: text.primary }}>
                  Microphone Access {micPermission === 'granted' ? 'Granted' : micPermission === 'denied' ? 'Denied' : 'Pending'}
                </span>
              </div>
            </div>

            {/* Image Captured */}
            <div 
              className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 74, 173, 0.03), rgba(59, 130, 246, 0.03))',
                border: '1px solid rgba(0, 74, 173, 0.1)'
              }}
            >
              {imageCaptured ? (
                <CheckCircle size={28} style={{ color: accent.emerald }} strokeWidth={2.5} />
              ) : (
                <div 
                  className="w-7 h-7 rounded-full"
                  style={{ borderColor: border.default, borderWidth: '3px', borderStyle: 'solid' }}
                />
              )}
              <div className="flex items-center gap-3">
                <Camera size={24} style={{ color: text.secondary }} strokeWidth={2.5} />
                <span className="font-bold text-lg" style={{ color: text.primary }}>
                  Image {imageCaptured ? 'Captured & Uploaded' : 'Not Captured'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleJoinInterview}
            disabled={!canProceed}
          >
            Join Interview
            <ArrowRight size={20} />
          </Button>
          {!canProceed && (
            <p className="text-base mt-6 font-medium" style={{ color: text.muted }}>
              Complete all setup steps to proceed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CameraSetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: background.primary }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: brand.navy }}></div>
          <p style={{ color: text.secondary }}>Loading...</p>
        </div>
      </div>
    }>
      <CameraSetupContent />
    </Suspense>
  );
}

