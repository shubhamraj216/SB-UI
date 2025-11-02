"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, Briefcase, Calendar, Settings, ChevronDown, GraduationCap, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useDrawer } from '@/context/DrawerContext';
import { useAuth } from '@/context/AuthContext';
import { background, text, brand, accent, border, shadows } from '@/lib/colors';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false);
  const { openDrawer } = useDrawer();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial state
    setIsScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { label: 'Why Us', href: '/#why-us' },
    { 
      label: 'Solutions', 
      href: '/#products',
      dropdown: [
        { label: 'AI Screen', href: '/#ai-screen' },
        { label: 'Interview as a Service', href: '/#interview-service' },
        { label: 'Insights', href: '/#insights' }
      ]
    },
    { label: 'Resources', href: '/#resources' },
    { label: 'For Recruiters', href: '/request-demo' }
  ];

  const handleJobsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openDrawer('jobs');
    setIsMobileMenuOpen(false);
  };

  const handleDrawerOpen = (tab: 'jobs' | 'courses' | 'mock-interview') => {
    openDrawer(tab);
    setIsMobileMenuOpen(false);
    setIsOpportunitiesOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: isScrolled ? background.white : 'rgba(255, 255, 255, 0.8)',
        borderBottom: isScrolled ? `1px solid ${border.light}` : 'none',
        boxShadow: isScrolled ? `0 2px 8px ${shadows.subtle}` : 'none'
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold" style={{ color: brand.navy }}>
              Scholar Bharat
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
              <motion.div 
                key={link.label} 
                whileHover={{ y: -1 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: text.secondary }}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Jobs Tab + Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              onClick={handleJobsClick}
              className="px-5 py-2.5 text-sm font-bold rounded-lg transition-all hover:shadow-md"
              style={{
                backgroundColor: accent.emerald,
                color: 'white',
                boxShadow: `0 2px 8px ${accent.emerald}30`
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: `0 4px 16px ${accent.emerald}50` }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Browse Opportunities
            </motion.button>
            
            <Link href="/coding-interview">
              <motion.button
                className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all"
                style={{
                  color: brand.navy,
                  border: `1px solid ${border.default}`
                }}
                whileHover={{ scale: 1.05, y: -2, borderColor: brand.navy }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                Practice Coding
              </motion.button>
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-gray-50"
                  style={{ border: `1px solid ${border.default}` }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: brand.navy }}
                  >
                    {getUserInitials()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: text.primary }}>
                    {user?.name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50"
                      style={{ 
                        backgroundColor: background.white,
                        border: `1px solid ${border.default}`
                      }}
                    >
                      <div className="px-4 py-3 border-b" style={{ borderColor: border.light }}>
                        <p className="text-sm font-semibold" style={{ color: text.primary }}>{user?.name}</p>
                        <p className="text-xs" style={{ color: text.muted }}>{user?.email}</p>
                        <p className="text-xs mt-1 capitalize" style={{ color: brand.navy }}>
                          {user?.type}
                        </p>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User size={16} style={{ color: text.muted }} />
                          <span className="text-sm" style={{ color: text.secondary }}>Profile</span>
                        </Link>
                        
                        {user?.type === 'candidate' && (
                          <Link
                            href="/profile#applications"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all hover:translate-x-1"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Briefcase size={16} style={{ color: text.muted }} />
                            <span className="text-sm" style={{ color: text.secondary }}>My Applications</span>
                          </Link>
                        )}
                        
                        {user?.type === 'recruiter' && (
                          <Link
                            href="/profile#jobs"
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all hover:translate-x-1"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Briefcase size={16} style={{ color: text.muted }} />
                            <span className="text-sm" style={{ color: text.secondary }}>My Jobs</span>
                          </Link>
                        )}
                        
                        <Link
                          href="/profile#interviews"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-all hover:translate-x-1"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Calendar size={16} style={{ color: text.muted }} />
                          <span className="text-sm" style={{ color: text.secondary }}>Interviews</span>
                        </Link>
                      </div>
                      
                      <div className="py-1 border-t" style={{ borderColor: border.light }}>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-all hover:translate-x-1 w-full text-left"
                        >
                          <LogOut size={16} style={{ color: text.muted }} />
                          <span className="text-sm" style={{ color: text.secondary }}>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login / Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Jobs + Auth buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              onClick={handleJobsClick}
              className="px-3 py-2 text-xs font-bold rounded-lg"
              style={{
                backgroundColor: accent.emerald,
                color: 'white'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Opportunities
            </motion.button>
            
            {isAuthenticated ? (
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: brand.navy }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {getUserInitials()}
              </motion.button>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} style={{ color: text.primary }} />
              ) : (
                <Menu size={24} style={{ color: text.primary }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: background.white }}
          >
            <div className="px-4 py-6 space-y-4 border-t" style={{ borderColor: border.light }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-base font-medium transition-all hover:translate-x-2"
                  style={{ color: text.secondary }}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Browse Opportunities - Nested Menu */}
              <div className="border-t pt-4 mt-4" style={{ borderColor: border.light }}>
                <button
                  onClick={() => setIsOpportunitiesOpen(!isOpportunitiesOpen)}
                  className="flex items-center justify-between w-full py-2 text-base font-medium transition-all"
                  style={{ color: text.secondary }}
                >
                  <span>Browse Opportunities</span>
                  <motion.div
                    animate={{ rotate: isOpportunitiesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpportunitiesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-2 space-y-2">
                        <button
                          onClick={() => handleDrawerOpen('jobs')}
                          className="flex items-center gap-3 py-2 w-full text-left transition-all hover:translate-x-2"
                          style={{ color: text.muted }}
                        >
                          <Briefcase size={18} style={{ color: accent.emerald }} />
                          <span className="text-sm">Jobs</span>
                        </button>
                        <button
                          onClick={() => handleDrawerOpen('courses')}
                          className="flex items-center gap-3 py-2 w-full text-left transition-all hover:translate-x-2"
                          style={{ color: text.muted }}
                        >
                          <GraduationCap size={18} style={{ color: brand.navy }} />
                          <span className="text-sm">Courses</span>
                        </button>
                        <button
                          onClick={() => handleDrawerOpen('mock-interview')}
                          className="flex items-center gap-3 py-2 w-full text-left transition-all hover:translate-x-2"
                          style={{ color: text.muted }}
                        >
                          <MessageSquare size={18} style={{ color: brand.sky }} />
                          <span className="text-sm">Mock Interview</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {isAuthenticated && (
                <>
                  <div className="border-t pt-4 mt-4" style={{ borderColor: border.light }}>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 py-2 transition-all hover:translate-x-2"
                      style={{ color: text.secondary }}
                      onClick={handleLinkClick}
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/profile#interviews"
                      className="flex items-center gap-3 py-2 transition-all hover:translate-x-2"
                      style={{ color: text.secondary }}
                      onClick={handleLinkClick}
                    >
                      <Calendar size={18} />
                      <span>Interviews</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-2 w-full text-left transition-all hover:translate-x-2"
                      style={{ color: text.secondary }}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

