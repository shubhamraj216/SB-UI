"use client";

import Link from 'next/link';
import { MapPin, Clock, Briefcase, Users, ExternalLink } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { Job } from '@/lib/mockData';
import { text, brand } from '@/lib/colors';
import { formatDate, formatSalary } from '@/lib/utils';
import Image from 'next/image';

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image 
              src={job.logo} 
              alt={`${job.company} logo`}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <Link 
                href={`/jobs/${job.id}`}
                target="_blank"
                className="font-semibold text-lg hover:underline flex items-center gap-2"
                style={{ color: text.primary }}
              >
                <span>{job.title}</span>
                <ExternalLink size={16} style={{ color: text.muted }} />
              </Link>
              {job.featured && <Badge variant="featured" size="sm" />}
            </div>
            <p className="font-medium" style={{ color: brand.navy }}>
              {job.company}
            </p>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap gap-3 text-sm" style={{ color: text.muted }}>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={16} />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{job.experienceYears}+ years</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        {/* Salary */}
        <div className="text-base font-semibold" style={{ color: brand.navy }}>
          {formatSalary(job.salaryMin, job.salaryMax)}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {job.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md"
              style={{ 
                backgroundColor: `${brand.navyLight}15`,
                color: brand.navy
              }}
            >
              {tech}
            </span>
          ))}
          {job.techStack.length > 4 && (
            <span
              className="px-2 py-1 text-xs rounded-md"
              style={{ 
                backgroundColor: `${brand.navyLight}15`,
                color: brand.navy
              }}
            >
              +{job.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm line-clamp-2" style={{ color: text.muted }}>
          {job.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant={job.status} size="sm" />
            <span className="text-xs" style={{ color: text.light }}>
              Posted {formatDate(job.postedDate)}
            </span>
          </div>
          
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onApply?.(job)}
          >
            Quick Apply
          </Button>
        </div>
      </div>
    </Card>
  );
}

