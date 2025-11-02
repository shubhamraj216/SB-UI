"use client";

import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { addApplication, getResume, saveResume, ResumeData, getApplicationsByJobId } from '@/lib/storage';
import { Job } from '@/lib/mockData';
import { text, brand, background, border } from '@/lib/colors';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export default function QuickApplyModal({ isOpen, onClose, job }: QuickApplyModalProps) {
  const { user, isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [coverLetter, setCoverLetter] = useState('');
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      // Load existing resume
      const savedResume = getResume();
      setCurrentResume(savedResume);
      
      // Check if already applied
      const existingApplication = getApplicationsByJobId(job.id);
      setAlreadyApplied(!!existingApplication);
    }
  }, [isOpen, isAuthenticated, job.id]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        const resumeData: ResumeData = {
          fileName: file.name,
          fileData: reader.result as string,
          fileType: file.type,
          uploadedAt: new Date().toISOString(),
        };
        
        setCurrentResume(resumeData);
        saveResume(resumeData);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError('Failed to upload file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload file');
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Please login to apply');
      return;
    }

    if (!currentResume) {
      setError('Please upload your resume');
      return;
    }

    if (alreadyApplied) {
      setError('You have already applied to this job');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      addApplication({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        resume: currentResume,
        coverLetter,
        status: 'pending',
      });

      setSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setCoverLetter('');
      }, 2000);

    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSuccess(false);
      setError('');
      setCoverLetter('');
    }
  };

  if (!isAuthenticated) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Login Required" size="sm">
        <div className="text-center py-6">
          <AlertCircle size={48} className="mx-auto mb-4" style={{ color: brand.navy }} />
          <p className="mb-6" style={{ color: text.secondary }}>
            Please login to apply for this position
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </Modal>
    );
  }

  if (success) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Application Submitted!" size="sm">
        <div className="text-center py-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${brand.navy}15` }}
          >
            <Check size={32} style={{ color: brand.navy }} />
          </div>
          <p className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
            Success!
          </p>
          <p style={{ color: text.secondary }}>
            Your application has been submitted to {job.company}
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Apply to ${job.company}`} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Info */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: background.primary }}>
          <h3 className="font-semibold mb-1" style={{ color: text.primary }}>
            {job.title}
          </h3>
          <p className="text-sm" style={{ color: text.muted }}>
            {job.company} • {job.location}
          </p>
        </div>

        {/* Already Applied Warning */}
        {alreadyApplied && (
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
            <p className="text-sm" style={{ color: '#856404' }}>
              You have already submitted an application for this position.
            </p>
          </div>
        )}

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: text.secondary }}>
            Resume *
          </label>
          
          {currentResume ? (
            <div 
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{ borderColor: border.default, backgroundColor: background.white }}
            >
              <div className="flex items-center gap-3">
                <FileText size={24} style={{ color: brand.navy }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: text.primary }}>
                    {currentResume.fileName}
                  </p>
                  <p className="text-xs" style={{ color: text.muted }}>
                    Uploaded {new Date(currentResume.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 rounded-lg border-2 border-dashed transition-all hover:border-solid"
              style={{ 
                borderColor: border.default,
                backgroundColor: background.white
              }}
              disabled={isUploading}
            >
              <Upload size={32} className="mx-auto mb-2" style={{ color: text.muted }} />
              <p className="text-sm font-medium mb-1" style={{ color: text.primary }}>
                {isUploading ? 'Uploading...' : 'Click to upload resume'}
              </p>
              <p className="text-xs" style={{ color: text.muted }}>
                PDF, DOC, or DOCX (Max 5MB)
              </p>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: text.secondary }}>
            Cover Letter (Optional)
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={6}
            placeholder="Tell the employer why you're a great fit for this role..."
            className="w-full px-4 py-3 rounded-lg border resize-none"
            style={{
              borderColor: border.default,
              backgroundColor: background.white,
              color: text.primary
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-3 rounded-lg" style={{ backgroundColor: '#fee', color: '#c00' }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !currentResume || alreadyApplied}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-center" style={{ color: text.muted }}>
          Your resume and cover letter will be sent to {job.company}.
          You can manage your applications from your profile.
        </p>
      </form>
    </Modal>
  );
}

