"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  BarChart3, 
  CheckCircle2,
  Briefcase,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  ChevronUp
} from 'lucide-react';
import { useDrawer } from '@/context/DrawerContext';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ScrollReveal from '@/components/ScrollReveal';
import { background, text, brand, accent, gradients, border, shadows } from '@/lib/colors';
import { testimonials, caseStudies, jobs, courses } from '@/lib/mockData';

/**
 * CONFIGURATION FLAG
 * 
 * Set SHOW_D2C_ON_HOMEPAGE to control homepage behavior:
 * 
 * true  = Shows tabbed interface with "For Recruiters" and "For Candidates" tabs
 *         - For Recruiters: Shows B2B products, hiring workflow, testimonials
 *         - For Candidates: Shows job listings, courses, mock interviews with previews
 *         - All candidate content has "View All" buttons linking to /candidates page
 * 
 * false = Shows traditional homepage with both B2B and D2C sections visible
 *         - No tabs, all content visible in one scroll
 *         - Candidate cards link to /candidates for full experience
 * 
 * To revert: Simply change true to false below
 */
const SHOW_D2C_ON_HOMEPAGE = true;

export default function HomePage() {
  const { openDrawer } = useDrawer();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'recruiters' | 'candidates'>('recruiters');
  const [showDrawerHint, setShowDrawerHint] = useState(false);

  // Check if user has seen the drawer hint before
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('hasSeenDrawerHint');
    if (!hasSeenHint) {
      // Show hint after a short delay
      const timer = setTimeout(() => {
        setShowDrawerHint(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-dismiss hint after 10 seconds
  useEffect(() => {
    if (showDrawerHint) {
      const timer = setTimeout(() => {
        dismissHint();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showDrawerHint]);

  // Dismiss hint on scroll
  useEffect(() => {
    if (showDrawerHint) {
      const handleScroll = () => {
        dismissHint();
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showDrawerHint]);

  const dismissHint = () => {
    setShowDrawerHint(false);
    localStorage.setItem('hasSeenDrawerHint', 'true');
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ backgroundColor: background.primary }}>
      {/* Drawer Discovery Hint */}
      <AnimatePresence>
        {showDrawerHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-20 right-4 md:right-8 lg:right-32 xl:right-48 z-40 max-w-xs"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  `0 4px 20px ${accent.emerald}30`,
                  `0 4px 30px ${accent.emerald}50`,
                  `0 4px 20px ${accent.emerald}30`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-lg p-4 flex items-start gap-3"
              style={{
                backgroundColor: background.white,
                border: `2px solid ${accent.emerald}`
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase size={18} style={{ color: accent.emerald }} />
                  <span className="font-semibold text-sm" style={{ color: text.primary }}>
                    Explore Opportunities
                  </span>
                </div>
                <p className="text-xs" style={{ color: text.muted }}>
                  Browse Jobs, Courses & Mock Interviews
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ChevronUp size={16} style={{ color: accent.emerald }} />
                  <span className="text-xs font-medium" style={{ color: accent.emerald }}>
                    Click "Browse Jobs" above
                  </span>
                </div>
              </div>
              <button
                onClick={dismissHint}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Dismiss hint"
              >
                <X size={16} style={{ color: text.muted }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Dual Magnetic Layout */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Recruiter-focused */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="info" size="md">
                Top Choice across India
              </Badge>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 mb-6 leading-tight"
                style={{ color: text.primary }}
              >
                Save your engineering bandwidth.
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8 max-w-xl"
                style={{ color: text.muted }}
              >
                We screen, assess and interview technical candidates — so your engineers can focus on shipping.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/request-demo">
                  <Button variant="primary" size="lg">
                    Request Demo
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleScroll('how-it-works')}
                >
                  How it Works
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold" style={{ color: brand.navy }}>
                    2.5×
                  </div>
                  <div className="text-sm" style={{ color: text.muted }}>
                    Faster Hiring
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: brand.navy }}>
                    83%
                  </div>
                  <div className="text-sm" style={{ color: text.muted }}>
                    Time Saved
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold" style={{ color: brand.navy }}>
                    4.3/5
                  </div>
                  <div className="text-sm" style={{ color: text.muted }}>
                    Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Candidate & Interviewer CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card padding="lg" className="relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10">
                  <Badge variant="featured" size="md">
                    For Candidates & Experts
                  </Badge>
                  
                  <h2 
                    className="text-2xl md:text-3xl font-bold mt-4 mb-3"
                    style={{ color: text.primary }}
                  >
                    We don&apos;t just tell you where to apply
                  </h2>
                  
                  <p className="text-base mb-6" style={{ color: text.muted }}>
                    We put our best efforts to get you hired.
                  </p>

                  <div className="space-y-3">
                    <Link href="/candidates" className="block">
                      <Button variant="primary" fullWidth size="lg">
                        <Sparkles size={20} className="mr-2" />
                        Explore Opportunities
                      </Button>
                    </Link>
                    
                    <Link href="/join-interviewer" className="block">
                      <Button 
                        variant="primary" 
                        fullWidth 
                        size="lg"
                        style={{ 
                          background: gradients.navySky,
                          border: 'none'
                        }}
                      >
                        <Users size={20} className="mr-2" />
                        Join as Interviewer
                      </Button>
                    </Link>
                    
                    <Link href="/post-job" className="block">
                      <Button variant="secondary" fullWidth size="lg">
                        <Briefcase size={20} className="mr-2" />
                        Post a Job
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t" style={{ borderColor: border.default }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: text.muted }}>
                      <CheckCircle2 size={16} style={{ color: brand.sky }} />
                      <span>1000+ verified jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2" style={{ color: text.muted }}>
                      <CheckCircle2 size={16} style={{ color: brand.sky }} />
                      <span>AI-powered mock interviews</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2" style={{ color: text.muted }}>
                      <CheckCircle2 size={16} style={{ color: brand.sky }} />
                      <span>Expert-led courses</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-2" style={{ color: text.muted }}>
                      <CheckCircle2 size={16} style={{ color: accent.emerald }} />
                      <span>Earn ₹2K-5K per interview as an expert</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Switcher - Conditional */}
      {SHOW_D2C_ON_HOMEPAGE && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-20 z-20" style={{ backgroundColor: background.white, borderBottom: `1px solid ${border.light}`, boxShadow: `0 2px 4px ${shadows.subtle}` }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setActiveTab('recruiters')}
                className="px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: activeTab === 'recruiters' ? brand.navy : 'transparent',
                  color: activeTab === 'recruiters' ? 'white' : text.secondary,
                  border: `2px solid ${activeTab === 'recruiters' ? brand.navy : border.default}`
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                For Recruiters
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('candidates')}
                className="px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: activeTab === 'candidates' ? accent.emerald : 'transparent',
                  color: activeTab === 'candidates' ? 'white' : text.secondary,
                  border: `2px solid ${activeTab === 'candidates' ? accent.emerald : border.default}`
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                For Candidates
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* Our Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8" style={{ display: SHOW_D2C_ON_HOMEPAGE && activeTab === 'candidates' ? 'none' : 'block' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="info" size="md">
                For Recruiters & Engineering Teams
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-4" style={{ color: text.primary }}>
                Comprehensive support for your entire hiring process
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                From screening to final interviews, we&apos;ve got you covered
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <Card hover padding="lg" className="h-full">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: gradients.navyBlue }}
                >
                  <Sparkles size={28} color="white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                  AI Screen
                </h3>
                
                <p className="mb-6" style={{ color: text.muted }}>
                  Automated screening and resume matching powered by advanced AI. Filter candidates instantly.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Smart resume parsing', 'Auto skill matching', 'Bias-free screening', 'Instant results'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: brand.navy }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" fullWidth>
                  Learn More →
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card hover padding="lg" className="h-full">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: gradients.skyBlue }}
                >
                  <Users size={28} color="white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                  Interview as a Service
                </h3>
                
                <p className="mb-6" style={{ color: text.muted }}>
                  Expert interviewers on demand. Schedule interviews and get detailed reports.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Vetted interviewers', 'Flexible scheduling', 'Detailed feedback', 'Video recordings'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: brand.sky }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" fullWidth>
                  Book Interviews →
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card hover padding="lg" className="h-full">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: gradients.navySky }}
                >
                  <BarChart3 size={28} color="white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                  Insights
                </h3>
                
                <p className="mb-6" style={{ color: text.muted }}>
                  Analytics and candidate performance metrics to make data-driven decisions.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Performance analytics', 'Hiring pipeline metrics', 'Candidate comparisons', 'Custom reports'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: text.secondary }}>
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: brand.navyLight }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" fullWidth>
                  See Report →
                </Button>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How Hiring Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: background.white, display: SHOW_D2C_ON_HOMEPAGE && activeTab === 'candidates' ? 'none' : 'block' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: text.primary }}>
                How Hiring Works
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                Simple, efficient, and effective hiring process
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Visual Connector Arrow - Desktop only */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <ArrowRight size={48} style={{ color: brand.sky, opacity: 0.3 }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
              {/* Recruiter Flow */}
              <ScrollReveal delay={0.1}>
                <Card padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ background: gradients.navyBlue }}
                    >
                      R
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: text.primary }}>
                      Recruiter
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${brand.navy}20`, color: brand.navy }}>
                        1
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: text.primary }}>Post Job</div>
                        <div className="text-sm" style={{ color: text.muted }}>Share requirements and JD</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${brand.navy}20`, color: brand.navy }}>
                        2
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: text.primary }}>Share Candidate Data</div>
                        <div className="text-sm" style={{ color: text.muted }}>Upload resumes or use our job board</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Process Flow */}
              <ScrollReveal delay={0.2}>
                <Card padding="lg" className="h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ background: gradients.skyBlue }}
                    >
                      P
                    </div>
                    <h3 className="text-xl font-bold" style={{ color: text.primary }}>
                      Our Process
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${brand.sky}20`, color: brand.sky }}>
                        3
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: text.primary }}>AI Screening</div>
                        <div className="text-sm" style={{ color: text.muted }}>Automated resume matching & filtering</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${brand.sky}20`, color: brand.sky }}>
                        4
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: text.primary }}>Expert Interviews</div>
                        <div className="text-sm" style={{ color: text.muted }}>Thorough technical assessment</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>

          {/* Outcome */}
          <ScrollReveal delay={0.3}>
            <Card 
              padding="lg" 
              className="text-center"
              style={{ 
                background: gradients.navySky,
                borderColor: 'transparent'
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award size={32} color="white" />
                <h3 className="text-2xl font-bold text-white">
                  Shortlisted Candidates Delivered
                </h3>
              </div>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Get detailed interview reports, performance scores, and hiring recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    style={{ backgroundColor: 'white', color: brand.navy }}
                  >
                    Contact Sales
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  style={{ 
                    borderColor: 'white', 
                    color: 'white',
                    backgroundColor: 'transparent'
                  }}
                >
                  Chat Now
                </Button>
              </div>
            </Card>
          </ScrollReveal>

          {/* Still Confused CTA */}
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-lg mb-4" style={{ color: text.secondary }}>
                Still Confused?
              </p>
              <Link href="/request-demo">
                <Button variant="primary" size="lg">
                  Reach out to Us
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <div className="text-center mt-8">
            <p className="text-sm flex items-center justify-center gap-2" style={{ color: text.muted }}>
              <CheckCircle2 size={16} style={{ color: brand.sky }} />
              All jobs are verified within 24 hours before going live
            </p>
          </div>
        </div>
      </section>

      {/* Candidate Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ display: SHOW_D2C_ON_HOMEPAGE && activeTab === 'candidates' ? 'none' : 'block' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="featured" size="md">
                For Job Seekers & Candidates
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-4" style={{ color: text.primary }}>
                We don&apos;t just tell you where to apply — we help you get hired
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                Everything you need to land your dream job
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <Link href="/candidates" className="block">
                <Card hover padding="lg" className="text-center cursor-pointer h-full">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: `${brand.navy}15` }}
                  >
                    <Briefcase size={32} style={{ color: brand.navy }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                    Browse Jobs
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    1000+ verified job openings from top companies
                  </p>

                  <Button variant="primary" fullWidth>
                    Explore Jobs
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Link href="/candidates" className="block">
                <Card hover padding="lg" className="text-center cursor-pointer h-full">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: `${brand.sky}15` }}
                  >
                    <GraduationCap size={32} style={{ color: brand.sky }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                    Take Courses
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    Expert-led courses to boost your interview skills
                  </p>

                  <Button variant="secondary" fullWidth>
                    View Courses
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Link href="/mock-interview" className="block">
                <Card hover padding="lg" className="text-center cursor-pointer h-full">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ backgroundColor: `${brand.navyLight}15` }}
                  >
                    <MessageSquare size={32} style={{ color: brand.navyLight }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: text.primary }}>
                    Mock Interviews
                  </h3>
                  
                  <p className="mb-6" style={{ color: text.muted }}>
                    Practice with AI and get instant feedback
                  </p>

                  <Button variant="primary" fullWidth>
                    Start Mock
                  </Button>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials & Case Studies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: background.white, display: SHOW_D2C_ON_HOMEPAGE && activeTab === 'candidates' ? 'none' : 'block' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: text.primary }}>
                Trusted by leading companies
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: text.muted }}>
                See how we&apos;re transforming technical hiring
              </p>
            </div>
          </ScrollReveal>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ScrollReveal delay={0.1}>
              <Card padding="lg" className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: brand.navy }}>
                  2.5×
                </div>
                <div className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
                  Faster Hiring
                </div>
                <p className="text-sm" style={{ color: text.muted }}>
                  Average time to hire reduced by 60%
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card padding="lg" className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: brand.sky }}>
                  83%
                </div>
                <div className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
                  Engineering Bandwidth Saved
                </div>
                <p className="text-sm" style={{ color: text.muted }}>
                  Engineers focus on building, not interviewing
                </p>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card padding="lg" className="text-center">
                <div className="text-5xl font-bold mb-2" style={{ color: brand.navyLight }}>
                  4.3/5
                </div>
                <div className="text-lg font-semibold mb-2" style={{ color: text.primary }}>
                  Candidate Experience
                </div>
                <p className="text-sm" style={{ color: text.muted }}>
                  Rated by 2000+ candidates
                </p>
              </Card>
            </ScrollReveal>
          </div>

          {/* Testimonial Carousel */}
          <ScrollReveal>
            <div className="max-w-4xl mx-auto mb-16">
              <Card padding="lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonials[testimonialIndex].avatar}
                      alt={testimonials[testimonialIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: text.primary }}>
                      {testimonials[testimonialIndex].name}
                    </div>
                    <div className="text-sm" style={{ color: text.muted }}>
                      {testimonials[testimonialIndex].role} at {testimonials[testimonialIndex].company}
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                        <span key={i} style={{ color: '#F59E0B' }}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-lg mb-6 italic" style={{ color: text.secondary }}>
                  &quot;{testimonials[testimonialIndex].quote}&quot;
                </p>

                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Previous testimonial"
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ 
                          backgroundColor: i === testimonialIndex ? brand.navy : border.default 
                        }}
                        aria-label={`Go to testimonial ${i + 1}`}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Next testimonial"
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </Card>
            </div>
          </ScrollReveal>

          {/* Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={0.1 * (index + 1)}>
                <Card hover padding="lg" className="h-full">
                  <div className="relative w-12 h-12 mb-4">
                    <Image
                      src={study.logo}
                      alt={study.company}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2" style={{ color: text.primary }}>
                    {study.company}
                  </h3>
                  
                  <Badge variant="info" size="sm">
                    {study.industry}
                  </Badge>

                  <p className="text-sm mt-4 mb-4" style={{ color: text.muted }}>
                    {study.challenge}
                  </p>

                  <div className="space-y-3">
                    {study.results.map((result) => (
                      <div key={result.metric} className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: text.muted }}>{result.metric}</span>
                        <span className="font-bold" style={{ color: brand.navy }}>{result.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* D2C Content Sections - Show when Candidates tab is active */}
      {SHOW_D2C_ON_HOMEPAGE && activeTab === 'candidates' && (
        <>
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
                  <Link href="/candidates">
                    <Button variant="outline" size="lg">
                      View All Jobs
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.filter(job => job.status === 'live').slice(0, 3).map((job, index) => (
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

              <div className="text-center mt-8">
                <Link href="/candidates">
                  <Button variant="primary" size="lg">
                    <Briefcase size={20} className="mr-2" />
                    Explore All Jobs
                  </Button>
                </Link>
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
                    <Button variant="outline" size="lg">
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
                            <Star size={14} fill="#F59E0B" stroke="#F59E0B" />
                            <span className="text-xs" style={{ color: text.muted }}>
                              ({course.enrolled})
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

              <div className="text-center mt-8">
                <Link href="/courses">
                  <Button variant="primary" size="lg">
                    <GraduationCap size={20} className="mr-2" />
                    View All Courses
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Mock Interview Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <Card 
                  padding="lg"
                  style={{
                    background: gradients.navySky,
                    borderColor: 'transparent'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare size={32} />
                        <Badge variant="featured" size="md">
                          AI-Powered
                        </Badge>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Practice with AI Mock Interviews
                      </h2>
                      
                      <p className="text-lg mb-6 text-white/90">
                        Get instant feedback, improve your skills, and build confidence before the real interview.
                      </p>

                      <ul className="space-y-3 mb-6">
                        {['Realistic interview scenarios', 'Instant AI feedback', 'Performance analytics', 'Unlimited practice sessions'].map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href="/mock-interview">
                        <Button 
                          variant="secondary" 
                          size="lg"
                          style={{ backgroundColor: 'white', color: brand.navy }}
                        >
                          Start Mock Interview
                          <ArrowRight size={20} className="ml-2" />
                        </Button>
                      </Link>
                    </div>

                    <div className="relative h-64 md:h-80">
                      <Image
                        src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop"
                        alt="Mock Interview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </Card>
              </ScrollReveal>

              <div className="text-center mt-12">
                <p className="text-lg mb-4" style={{ color: text.secondary }}>
                  Want to explore everything we offer for candidates?
                </p>
                <Link href="/candidates">
                  <Button 
                    variant="primary" 
                    size="lg"
                    style={{ backgroundColor: accent.emerald }}
                  >
                    Visit Candidates Hub
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

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
                Ready to streamline your hiring process?
              </h2>
              
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Join 100+ companies who trust Scholar Bharat for their technical hiring needs
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    style={{ backgroundColor: 'white', color: brand.navy }}
                  >
                    Request Demo
                  </Button>
                </Link>
                <Link href="/post-job">
                  <Button 
                    variant="outline" 
                    size="lg"
                    style={{ 
                      borderColor: 'white', 
                      color: 'white',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Post a Job
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
