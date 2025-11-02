"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Briefcase, Users, DollarSign, Calendar, Share2, ArrowLeft, Building } from 'lucide-react';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import JobCard from '@/components/JobCard';
import QuickApplyModal from '@/components/QuickApplyModal';
import { jobs, Job } from '@/lib/mockData';
import { background, text, brand, border, shadows } from '@/lib/colors';
import { formatDate, formatSalary } from '@/lib/utils';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    // Find the job
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      
      // Find similar jobs (same tech stack or location)
      const similar = jobs
        .filter(j => 
          j.id !== jobId && 
          j.status !== 'under_review' &&
          (j.techStack.some(tech => foundJob.techStack.includes(tech)) || 
           j.location === foundJob.location)
        )
        .slice(0, 3);
      setSimilarJobs(similar);
    }
  }, [jobId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job: ${job?.title} at ${job?.company}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleApply = (jobToApply: Job) => {
    setSelectedJob(jobToApply);
    setIsApplyModalOpen(true);
  };

  if (!job) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: background.primary }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>
            Job not found
          </h1>
          <Button variant="primary" onClick={() => router.push('/jobs')}>
            Browse All Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: background.primary }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: brand.navy }}
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>

        {/* Main Job Card */}
        <div 
          className="rounded-xl p-8 mb-6 shadow-sm"
          style={{ 
            backgroundColor: background.white,
            border: `1px solid ${border.light}`
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
              <Image 
                src={job.logo} 
                alt={`${job.company} logo`}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ color: text.primary }}>
                    {job.title}
                  </h1>
                  <p className="text-xl font-semibold" style={{ color: brand.navy }}>
                    {job.company}
                  </p>
                </div>
                {job.featured && <Badge variant="featured" size="md" />}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: text.muted }}>
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{job.experienceYears}+ years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{job.applicants} applicants</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <DollarSign size={20} style={{ color: brand.navy }} />
                <span className="text-lg font-semibold" style={{ color: brand.navy }}>
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-full font-medium"
                    style={{ 
                      backgroundColor: `${brand.navyLight}15`,
                      color: brand.navy
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="primary" 
                  size="md"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={handleShare}
                >
                  <Share2 size={18} />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: text.muted }}>
            <Calendar size={16} />
            <span>Posted {formatDate(job.postedDate)}</span>
            <span>•</span>
            <Badge variant={job.status} size="sm" />
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
                Job Description
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: text.secondary }}>
                {job.description}
              </p>
              <p className="text-base leading-relaxed" style={{ color: text.secondary }}>
                We are looking for a talented {job.title} to join our growing team at {job.company}. 
                This role offers an exciting opportunity to work on cutting-edge projects and collaborate 
                with a passionate team of professionals.
              </p>
            </div>

            {/* Requirements */}
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                      style={{ 
                        backgroundColor: `${brand.navy}15`,
                        color: brand.navy
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ color: text.secondary }}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {[
                  `Design and develop high-quality ${job.techStack.slice(0, 2).join(' and ')} applications`,
                  'Collaborate with cross-functional teams to define and implement new features',
                  'Write clean, maintainable, and well-documented code',
                  'Participate in code reviews and contribute to team knowledge sharing',
                  'Stay up-to-date with emerging technologies and industry trends'
                ].map((resp, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ 
                        backgroundColor: `${brand.sky}15`,
                        color: brand.sky
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ color: text.secondary }}>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: text.primary }}>
                About {job.company}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Building size={18} className="flex-shrink-0" style={{ color: text.muted }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: text.secondary }}>Industry</p>
                    <p style={{ color: text.muted }}>Technology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users size={18} className="flex-shrink-0" style={{ color: text.muted }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: text.secondary }}>Company Size</p>
                    <p style={{ color: text.muted }}>100-500 employees</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="flex-shrink-0" style={{ color: text.muted }} />
                  <div>
                    <p className="font-medium mb-1" style={{ color: text.secondary }}>Location</p>
                    <p style={{ color: text.muted }}>{job.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div 
              className="rounded-xl p-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: text.primary }}>
                Job Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium mb-1" style={{ color: text.secondary }}>Experience Level</p>
                  <Badge variant="info" size="sm">{job.experience}</Badge>
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: text.secondary }}>Employment Type</p>
                  <Badge variant="info" size="sm">{job.type}</Badge>
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: text.secondary }}>Salary Range</p>
                  <p className="font-semibold" style={{ color: brand.navy }}>
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: text.primary }}>
              Similar Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <JobCard 
                  key={similarJob.id} 
                  job={similarJob}
                  onApply={handleApply}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
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
    </div>
  );
}

