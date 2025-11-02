"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { background, text } from '@/lib/colors';
import { getMediaStream, getDisplayMediaStream, stopMediaStream, toggleAudioTrack, toggleVideoTrack, VideoRecorder, uploadVideoChunk } from '@/lib/mediaRecording';
import ParticipantVideo from '@/components/ParticipantVideo';
import VideoControls from '@/components/VideoControls';
import ChatWindow from '@/components/ChatWindow';
import { useAuth } from '@/context/AuthContext';

export default function InterviewRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const { isAuthenticated, user } = useAuth();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recorderRef = useRef<VideoRecorder | null>(null);
  const chunkIndexRef = useRef<number>(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    initializeMediaStream();
    startTimer();

    return () => {
      cleanup();
    };
  }, []);

  const initializeMediaStream = async () => {
    const stream = await getMediaStream({ video: true, audio: true });
    if (stream) {
      setCameraStream(stream);
      setLocalStream(stream);
      startRecording(stream);
    }
  };

  const startRecording = (stream: MediaStream) => {
    try {
      const recorder = new VideoRecorder(stream);
      
      // Handle video chunks as they're created
      recorder.onChunk(async (chunk) => {
        const success = await uploadVideoChunk(
          chunk, 
          roomId, 
          chunkIndexRef.current,
          user?.email
        );
        
        if (success) {
          console.log(`Chunk ${chunkIndexRef.current} uploaded successfully`);
          chunkIndexRef.current++;
        } else {
          console.error(`Failed to upload chunk ${chunkIndexRef.current}`);
        }
      });

      // Start recording with 10-second chunks
      recorder.start(10000);
      recorderRef.current = recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
  };

  const cleanup = async () => {
    // Stop recording and get final blob
    if (recorderRef.current) {
      const finalBlob = await recorderRef.current.stop();
      
      // Upload final chunk
      if (finalBlob.size > 0) {
        await uploadVideoChunk(
          finalBlob, 
          roomId, 
          chunkIndexRef.current,
          user?.email
        );
      }
      
      setIsRecording(false);
    }

    // Stop all media streams
    if (localStream) {
      stopMediaStream(localStream);
      setLocalStream(null);
    }
    
    if (cameraStream) {
      stopMediaStream(cameraStream);
      setCameraStream(null);
    }
    
    if (screenStream) {
      stopMediaStream(screenStream);
      setScreenStream(null);
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleMic = () => {
    const newState = !isMicOn;
    setIsMicOn(newState);
    toggleAudioTrack(localStream, newState);
  };

  const handleToggleCamera = () => {
    const newState = !isCameraOn;
    setIsCameraOn(newState);
    if (!isScreenSharing) {
      toggleVideoTrack(localStream, newState);
    }
  };

  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing, switch back to camera
      if (screenStream) {
        stopMediaStream(screenStream);
        setScreenStream(null);
      }
      
      // Switch back to camera stream
      if (cameraStream) {
        setLocalStream(cameraStream);
        
        // Restart recording with camera stream
        if (recorderRef.current) {
          await recorderRef.current.stop();
        }
        startRecording(cameraStream);
      }
      
      setIsScreenSharing(false);
    } else {
      // Start screen sharing
      const displayStream = await getDisplayMediaStream();
      
      if (displayStream) {
        setScreenStream(displayStream);
        
        // Combine screen video with microphone audio from camera stream
        const tracks: MediaStreamTrack[] = [];
        
        // Add video track from screen
        const videoTrack = displayStream.getVideoTracks()[0];
        if (videoTrack) {
          tracks.push(videoTrack);
          
          // Handle when user stops sharing via browser UI
          videoTrack.onended = () => {
            handleToggleScreenShare();
          };
        }
        
        // Add audio track from camera stream (microphone)
        if (cameraStream) {
          const audioTrack = cameraStream.getAudioTracks()[0];
          if (audioTrack) {
            tracks.push(audioTrack);
          }
        }
        
        const combinedStream = new MediaStream(tracks);
        setLocalStream(combinedStream);
        
        // Restart recording with screen share stream
        if (recorderRef.current) {
          await recorderRef.current.stop();
        }
        startRecording(combinedStream);
        
        setIsScreenSharing(true);
      }
    }
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleEndCall = async () => {
    await cleanup();
    // Redirect to completion page with interview details
    router.push(`/mock-interview/complete?roomId=${roomId}&duration=${formatDuration(duration)}`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      {/* Main content area */}
      <div className="flex-1 pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Local Video (You) */}
            <div className="flex flex-col animate-fade-in">
              <ParticipantVideo
                stream={isScreenSharing ? localStream : (isCameraOn ? localStream : null)}
                isMuted={!isMicOn}
                isLocal={true}
                name="You"
                showUnknown={false}
                isScreenSharing={isScreenSharing}
              />
            </div>

            {/* Remote Video (Unknown) */}
            <div className="flex flex-col animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ParticipantVideo
                stream={null}
                isMuted={false}
                isLocal={false}
                name="Interviewer"
                showUnknown={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <VideoControls
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
        isChatOpen={isChatOpen}
        onToggleMic={handleToggleMic}
        onToggleCamera={handleToggleCamera}
        onToggleScreenShare={handleToggleScreenShare}
        onToggleChat={handleToggleChat}
        onEndCall={handleEndCall}
        duration={formatDuration(duration)}
      />

      {/* Chat Window */}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

