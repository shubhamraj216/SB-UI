"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Briefcase,
  GraduationCap,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  Award,
  Clock,
  Users,
  BookOpen,
  Target
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ScrollReveal from '@/components/ScrollReveal';
import { background, text, brand, accent, gradients, border, shadows } from '@/lib/colors';
import { jobs, courses, testimonials } from '@/lib/mockData';

export default function CandidatesPage() {
  
  // Filter for candidate testimonials
  const candidateTestimonials = testimonials.filter(t => 
    ['Senior Developer', 'Full Stack Developer', 'Software Engineer'].includes(t.role)
  );

  // Get featured/live jobs
  const featuredJobs = jobs.filter(job => job.status === 'live').slice(0, 6);

  return (
    <div style={{ backgroundColor: background.primary }}>
      {/* Hero Section with Image */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
            alt="Candidates success"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="featured" size="md">
              For Job Seekers
            </Badge>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 mb-6 leading-tight"
              style={{ color: text.primary }}
            >
              We don&apos;t just tell you where to apply,
              <br />
              <span style={{ 
                background: gradients.navySky,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                we put our best efforts to get you hired
              </span>
            </h1>
            
            <p 
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
              style={{ color: text.muted }}
            >
              Your complete career companion — verified jobs, expert-led courses, and AI-powered mock interviews, all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button 
                  variant="primary" 
                  size="lg"
                >
                  <Briefcase size={20} className="mr-2" />
                  Browse Jobs
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/mock-interview">
                <Button 
                  variant="secondary" 
                  size="lg"
                >
                  <MessageSquare size={20} className="mr-2" />
                  Try Mock Interview
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold" style={{ color: brand.navy }}>
                  1000+
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Verified Jobs
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: brand.sky }}>
                  500+
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Candidates Placed
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: accent.emerald }}>
                  4.8/5
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Satisfaction
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* D2C Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: background.white }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: text.primary }}>
                Everything You Need to Succeed
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                Complete suite of tools to accelerate your job search and career growth
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Job Postings */}
            <ScrollReveal delay={0.1}>
              <Link href="/jobs">
                <Card 
                  hover 
                  padding="lg" 
                  className="h-full cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${brand.navy}15` }}
                  >
                    <Briefcase size={32} style={{ color: brand.navy }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3" style={{ color: text.primary }}>
                    Verified Job Postings
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    Browse 1000+ verified job openings from top companies. All jobs are verified within 24 hours.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {['Pre-screened companies', 'Direct applications', 'Real-time updates', 'Salary transparency'].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: brand.navy }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="primary" fullWidth>
                    Browse Jobs →
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>

            {/* Courses */}
            <ScrollReveal delay={0.2}>
              <Link href="/courses">
                <Card 
                  hover 
                  padding="lg" 
                  className="h-full cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${brand.sky}15` }}
                  >
                    <GraduationCap size={32} style={{ color: brand.sky }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3" style={{ color: text.primary }}>
                    Expert-Led Courses
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    Upskill with courses designed by industry experts. Learn at your own pace.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {['System Design mastery', 'DSA deep dives', 'Behavioral prep', 'Industry best practices'].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: brand.sky }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="secondary" fullWidth>
                    View Courses →
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>

            {/* Mock Interviews */}
            <ScrollReveal delay={0.3}>
              <Link href="/mock-interview">
                <Card 
                  hover 
                  padding="lg" 
                  className="h-full cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${accent.emerald}15` }}
                  >
                    <MessageSquare size={32} style={{ color: accent.emerald }} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3" style={{ color: text.primary }}>
                    AI Mock Interviews
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    Practice with AI and get instant feedback. Build confidence before the real thing.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {['Realistic interview scenarios', 'Instant AI feedback', 'Performance analytics', 'Unlimited practice'].map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                        <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: accent.emerald }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="primary" 
                    fullWidth
                    style={{ backgroundColor: accent.emerald }}
                  >
                    Start Mock Interview →
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: text.primary }}>
                  Latest Job Openings
                </h2>
                <p className="text-lg" style={{ color: text.muted }}>
                  Fresh opportunities from top companies
                </p>
              </div>
              <Link href="/jobs">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  View All Jobs
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <ScrollReveal key={job.id} delay={0.1 * (index + 1)}>
                <Link href={`/jobs/${job.id}`} target="_blank">
                  <Card hover padding="lg" className="h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1" style={{ color: text.primary }}>
                          {job.title}
                        </h3>
                        <p className="text-sm" style={{ color: text.muted }}>
                          {job.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm mb-3" style={{ color: text.muted }}>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="capitalize">{job.type.replace('-', ' ')}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="info" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="ghost" fullWidth size="sm">
                      View Details →
                    </Button>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: background.white }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: text.primary }}>
                  Popular Courses
                </h2>
                <p className="text-lg" style={{ color: text.muted }}>
                  Level up your skills with expert instruction
                </p>
              </div>
              <Link href="/courses">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  View All Courses
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course, index) => (
              <ScrollReveal key={course.id} delay={0.1 * (index + 1)}>
                <Link href={`/courses/${course.id}`}>
                  <Card hover padding="lg" className="h-full">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="info" size="sm">{course.level}</Badge>
                      <span className="text-xs" style={{ color: text.muted }}>
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2" style={{ color: text.primary }}>
                      {course.title}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: text.muted }}>
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold" style={{ color: brand.navy }}>
                          {course.rating}
                        </span>
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-xs" style={{ color: text.muted }}>
                          ({course.enrolled} enrolled)
                        </span>
                      </div>
                      <div className="text-lg font-bold" style={{ color: text.primary }}>
                        ₹{course.price.toLocaleString()}
                      </div>
                    </div>

                    <Button variant="secondary" fullWidth>
                      View Course
                    </Button>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Candidates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: text.primary }}>
                Your Path to Success
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                Simple steps to land your dream job
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen size={32} />, title: 'Learn', desc: 'Take courses to build skills', color: brand.navy },
              { icon: <Target size={32} />, title: 'Practice', desc: 'Mock interviews with AI', color: brand.sky },
              { icon: <Briefcase size={32} />, title: 'Apply', desc: 'Browse verified jobs', color: accent.emerald },
              { icon: <Award size={32} />, title: 'Get Hired', desc: 'Land your dream role', color: accent.orange }
            ].map((step, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${step.color}15`, color: step.color }}
                  >
                    {step.icon}
                  </div>
                  <div 
                    className="text-sm font-bold mb-2"
                    style={{ color: step.color }}
                  >
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: text.primary }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: text.muted }}>
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: background.white }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: text.primary }}>
                Success Stories
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                Hear from candidates who landed their dream jobs
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {candidateTestimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={0.1 * (index + 1)}>
                <Card padding="lg" className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: text.primary }}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm" style={{ color: text.muted }}>
                        {testimonial.role}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-sm">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm italic" style={{ color: text.secondary }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <Card 
              padding="lg"
              className="text-center"
              style={{
                background: gradients.navySky,
                borderColor: 'transparent'
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to accelerate your career?
              </h2>
              
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of candidates who found their dream jobs with Scholar Bharat
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/jobs">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    style={{ backgroundColor: 'white', color: brand.navy }}
                  >
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/mock-interview">
                  <Button 
                    variant="outline" 
                    size="lg"
                    style={{ 
                      borderColor: 'white', 
                      color: 'white',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Try Mock Interview
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

