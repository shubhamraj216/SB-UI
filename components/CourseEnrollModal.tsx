"use client";

import { useState } from 'react';
import { CheckCircle, BookOpen, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { enrollCourse, isEnrolledInCourse } from '@/lib/storage';
import { Course } from '@/lib/mockData';
import { text, brand, background } from '@/lib/colors';

interface CourseEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onEnrollSuccess?: () => void;
}

export default function CourseEnrollModal({ isOpen, onClose, course, onEnrollSuccess }: CourseEnrollModalProps) {
  const { user, isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      return;
    }

    // Check if already enrolled
    if (isEnrolledInCourse(course.id)) {
      setAlreadyEnrolled(true);
      return;
    }

    setIsEnrolling(true);

    // Simulate enrollment delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    enrollCourse(course.id, course.title);
    setIsEnrolling(false);
    setSuccess(true);

    // Close modal after success
    setTimeout(() => {
      onClose();
      setSuccess(false);
      onEnrollSuccess?.();
    }, 2000);
  };

  const handleClose = () => {
    if (!isEnrolling) {
      onClose();
      setSuccess(false);
      setAlreadyEnrolled(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Login Required" size="sm">
        <div className="text-center py-6">
          <AlertCircle size={48} className="mx-auto mb-4" style={{ color: brand.navy }} />
          <p className="mb-6" style={{ color: text.secondary }}>
            Please login to enroll in this course
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
      <Modal isOpen={isOpen} onClose={handleClose} title="Successfully Enrolled!" size="sm">
        <div className="text-center py-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${brand.navy}15` }}
          >
            <CheckCircle size={32} style={{ color: brand.navy }} />
          </div>
          <p className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
            You're all set!
          </p>
          <p style={{ color: text.secondary }}>
            You have been enrolled in {course.title}
          </p>
          <p className="text-sm mt-4" style={{ color: text.muted }}>
            Check your profile to view your courses
          </p>
        </div>
      </Modal>
    );
  }

  if (alreadyEnrolled) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Already Enrolled" size="sm">
        <div className="text-center py-6">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: brand.navy }} />
          <p className="mb-6" style={{ color: text.secondary }}>
            You are already enrolled in this course
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/profile'}>
            Go to My Courses
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Enroll in Course" size="md">
      <div className="space-y-6">
        {/* Course Info */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: background.primary }}>
          <h3 className="font-bold text-lg mb-2" style={{ color: text.primary }}>
            {course.title}
          </h3>
          <p className="text-sm mb-3" style={{ color: text.secondary }}>
            {course.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs mb-1" style={{ color: text.muted }}>Instructor</p>
              <p className="font-semibold" style={{ color: text.primary }}>{course.instructor}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: text.muted }}>Duration</p>
              <p className="font-semibold" style={{ color: text.primary }}>{course.duration}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: text.muted }}>Level</p>
              <p className="font-semibold" style={{ color: text.primary }}>{course.level}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: text.muted }}>Price</p>
              <p className="font-semibold" style={{ color: brand.navy }}>
                ₹{course.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* What you'll get */}
        <div>
          <h4 className="font-semibold mb-3" style={{ color: text.primary }}>
            What's Included:
          </h4>
          <ul className="space-y-2">
            {[
              'Lifetime access to course materials',
              'Interactive coding exercises',
              'Certificate of completion',
              'Direct access to instructor',
              'Community support'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: brand.navy }} />
                <span style={{ color: text.secondary }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Note */}
        <p className="text-xs text-center" style={{ color: text.muted }}>
          This is a free enrollment for demonstration purposes
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isEnrolling}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

