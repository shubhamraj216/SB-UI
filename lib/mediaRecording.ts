// Media Recording utilities for video interview
// Simple local recording and backend upload (no WebRTC peer connections)

export interface MediaStreamConstraints {
  video: boolean;
  audio: boolean;
}

export async function getMediaStream(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error accessing media devices:', error);
    return null;
  }
}

export async function getDisplayMediaStream(): Promise<MediaStream | null> {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ 
      video: {
        displaySurface: 'monitor',
      } as MediaTrackConstraints,
      audio: false 
    });
    return stream;
  } catch (error) {
    console.error('Error accessing display media:', error);
    return null;
  }
}

export function stopMediaStream(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

export function toggleAudioTrack(stream: MediaStream | null, enabled: boolean): void {
  if (stream) {
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = enabled;
    }
  }
}

export function toggleVideoTrack(stream: MediaStream | null, enabled: boolean): void {
  if (stream) {
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = enabled;
    }
  }
}

export async function captureImageFromVideo(videoElement: HTMLVideoElement): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(videoElement, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  }
  
  return '';
}

export async function uploadImageToBackend(imageData: string, roomId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/interview/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData, roomId }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error uploading image:', error);
    return false;
  }
}

export function checkMediaSupport(): boolean {
  return !!(
    typeof navigator !== 'undefined' &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}

// MediaRecorder functionality for recording video
export interface RecordingOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
}

export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private onChunkReady?: (chunk: Blob) => void;
  private chunkInterval: number = 10000; // 10 seconds

  constructor(stream: MediaStream, options?: RecordingOptions) {
    this.stream = stream;
    
    // Determine best supported mime type
    const mimeType = this.getSupportedMimeType();
    
    const recorderOptions: MediaRecorderOptions = {
      mimeType,
      videoBitsPerSecond: options?.videoBitsPerSecond || 2500000, // 2.5 Mbps
      audioBitsPerSecond: options?.audioBitsPerSecond || 128000,  // 128 kbps
    };

    try {
      this.mediaRecorder = new MediaRecorder(stream, recorderOptions);
      this.setupEventHandlers();
    } catch (error) {
      console.error('Error creating MediaRecorder:', error);
    }
  }

  private getSupportedMimeType(): string {
    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
    ];

    for (const mimeType of mimeTypes) {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        return mimeType;
      }
    }

    return ''; // Browser will use default
  }

  private setupEventHandlers(): void {
    if (!this.mediaRecorder) return;

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedChunks.push(event.data);
        
        // Call chunk callback if provided
        if (this.onChunkReady) {
          this.onChunkReady(event.data);
        }
      }
    };

    this.mediaRecorder.onerror = (event: Event) => {
      console.error('MediaRecorder error:', event);
    };
  }

  start(timeslice?: number): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.recordedChunks = [];
      // Start recording with time slice (creates chunks at intervals)
      this.mediaRecorder.start(timeslice || this.chunkInterval);
    }
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(new Blob());
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder?.mimeType || 'video/webm'
        });
        resolve(blob);
      };

      if (this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      } else {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder.mimeType || 'video/webm'
        });
        resolve(blob);
      }
    });
  }

  pause(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  resume(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  onChunk(callback: (chunk: Blob) => void): void {
    this.onChunkReady = callback;
  }

  getRecordedBlob(): Blob {
    return new Blob(this.recordedChunks, {
      type: this.mediaRecorder?.mimeType || 'video/webm'
    });
  }
}

export async function uploadVideoChunk(
  chunk: Blob, 
  roomId: string, 
  chunkIndex: number,
  userId?: string
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('video', chunk, `chunk-${chunkIndex}.webm`);
    formData.append('roomId', roomId);
    formData.append('chunkIndex', chunkIndex.toString());
    if (userId) {
      formData.append('userId', userId);
    }

    const response = await fetch('/api/interview/store-video', {
      method: 'POST',
      body: formData,
    });

    return response.ok;
  } catch (error) {
    console.error('Error uploading video chunk:', error);
    return false;
  }
}

