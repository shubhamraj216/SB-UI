"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useDrawer } from '@/context/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import Tabs from './Tabs';
import Button from './Button';
import JobCard from './JobCard';
import Card from './Card';
import Badge from './Badge';
import QuickApplyModal from './QuickApplyModal';
import { background, dark, text, brand, border } from '@/lib/colors';
import { jobs, courses, mockInterviewRoles, Job } from '@/lib/mockData';
import { prefersReducedMotion } from '@/lib/utils';

export default function CandidateDrawer() {
  const { isOpen, closeDrawer, activeTab, setActiveTab } = useDrawer();
  const { isAuthenticated } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const reducedMotion = typeof window !== 'undefined' && prefersReducedMotion();

  const featuredJobs = jobs.filter(job => job.featured && job.status === 'live').slice(0, 6);
  const featuredCourses = courses.slice(0, 3);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const tabs = [
    {
      id: 'jobs' as const,
      label: 'Jobs',
      icon: <Briefcase size={18} />,
      content: (
        <div className="space-y-6">
          {/* Featured Jobs */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: text.primary }}>
              Featured Jobs
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApply} />
              ))}
            </div>
          </div>

          {/* CTA to Jobs Page */}
          <div className="pt-6 border-t" style={{ borderColor: border.light }}>
            <Link href="/jobs" onClick={closeDrawer}>
              <Button variant="primary" fullWidth size="lg">
                View All Jobs ({jobs.length}+)
              </Button>
            </Link>
            <Link href="/join-interviewer" onClick={closeDrawer}>
              <Button variant="ghost" fullWidth size="md" className="mt-3">
                Want to become an interviewer?
              </Button>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 'courses' as const,
      label: 'Courses',
      icon: <GraduationCap size={18} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
              Boost Your Skills
            </h3>
            <p className="text-sm mb-6" style={{ color: text.muted }}>
              Interview-focused courses designed to get you hired
            </p>
          </div>

          {/* Course Cards */}
          <div className="space-y-4">
            {featuredCourses.map((course) => (
              <Card key={course.id} hover>
                <Link href={`/courses/${course.id}`} onClick={closeDrawer}>
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1" style={{ color: text.primary }}>
                        {course.title}
                      </h4>
                      <p className="text-sm mb-2 line-clamp-2" style={{ color: text.muted }}>
                        {course.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs mb-2" style={{ color: text.light }}>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                        <span>•</span>
                        <span>⭐ {course.rating}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold" style={{ color: brand.navy }}>
                          ₹{course.price.toLocaleString()}
                        </span>
                        <Button variant="primary" size="sm">
                          View Course
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* View All */}
          <div className="pt-4">
            <Link href="/courses" onClick={closeDrawer}>
              <Button variant="outline" fullWidth>
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 'mock-interview' as const,
      label: 'AI Mock Interview',
      icon: <MessageSquare size={18} />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
              Practice with AI
            </h3>
            <p className="text-sm mb-6" style={{ color: text.muted }}>
              Get instant feedback and improve your interview skills
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: text.secondary }}>
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {mockInterviewRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className="p-3 rounded-lg border-2 text-sm font-medium transition-all"
                  style={{
                    borderColor: selectedRole === role ? brand.navy : border.default,
                    backgroundColor: selectedRole === role ? `${brand.navy}10` : background.white,
                    color: selectedRole === role ? brand.navy : text.secondary
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Process Preview */}
          <Card>
            <h4 className="font-semibold mb-3" style={{ color: text.primary }}>
              How it works
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: text.muted }}>
              <li className="flex items-start gap-2">
                <span className="font-semibold" style={{ color: brand.navy }}>1.</span>
                <span>Select your role and experience level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold" style={{ color: brand.navy }}>2.</span>
                <span>AI asks relevant technical questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold" style={{ color: brand.navy }}>3.</span>
                <span>Get instant feedback and improvement tips</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold" style={{ color: brand.navy }}>4.</span>
                <span>Track your progress over time</span>
              </li>
            </ul>
          </Card>

          {/* Start Button */}
          <div>
            {isAuthenticated ? (
              <Link href="/mock-interview" onClick={closeDrawer}>
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={!selectedRole}
                >
                  Start Mock Interview
                </Button>
              </Link>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-center" style={{ color: text.muted }}>
                  Sign in to start your mock interview
                </p>
                <Link href="/login" onClick={closeDrawer}>
                  <Button variant="primary" fullWidth size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: dark[60] }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[80%] lg:w-[70%] xl:w-[60%] overflow-y-auto"
            style={{ backgroundColor: background.primary }}
            initial={reducedMotion ? undefined : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: '100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Candidate options"
          >
            {/* Header */}
            <div 
              className="sticky top-0 z-10 px-6 py-4 border-b"
              style={{ 
                backgroundColor: background.white,
                borderColor: border.light 
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: text.primary }}>
                  Explore Opportunities
                </h2>
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close drawer"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-sm mt-1" style={{ color: text.muted }}>
                We don&apos;t just tell you where to apply — we help you get hired.
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs 
                tabs={tabs} 
                activeTab={activeTab}
                onChange={(tabId) => setActiveTab(tabId as any)}
              />
            </div>
          </motion.div>
        </>
      )}
      
      {/* Quick Apply Modal */}
      {selectedJob && (
        <QuickApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
        />
      )}
    </AnimatePresence>
  );
}

