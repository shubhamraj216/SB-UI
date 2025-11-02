"use client";

import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { background, text, brand, border } from '@/lib/colors';

export default function Footer() {
  const productLinks = [
    { label: 'AI Screen', href: '/#ai-screen' },
    { label: 'Interview as a Service', href: '/#interview-service' },
    { label: 'Insights & Analytics', href: '/#insights' },
    { label: 'Request Demo', href: '/request-demo' }
  ];

  const candidateLinks = [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Courses', href: '/?drawer=open&tab=courses' },
    { label: 'AI Mock Interviews', href: '/?drawer=open&tab=mock-interview' },
    { label: 'Join as Interviewer', href: '/join-interviewer' }
  ];

  const companyLinks = [
    { label: 'About Us', href: '/#about' },
    { label: 'Why Scholar Bharat', href: '/#why-us' },
    { label: 'Case Studies', href: '/#case-studies' },
    { label: 'Contact Us', href: '/#contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer 
      className="border-t mt-20"
      style={{ 
        backgroundColor: background.secondary,
        borderColor: border.light 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4" style={{ color: brand.navy }}>
              Scholar Bharat
            </div>
            <p className="text-sm mb-4 max-w-sm" style={{ color: text.muted }}>
              We don&apos;t just tell you where to apply — we help you get hired. 
              Streamlining technical hiring with AI-powered screening and expert interviews.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-colors hover:bg-white"
                  style={{ color: brand.navy }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: text.primary }}>
              Products
            </h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: text.muted }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: text.primary }}>
              For Candidates
            </h3>
            <ul className="space-y-2">
              {candidateLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: text.muted }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: text.primary }}>
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: text.muted }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: border.default }}
        >
          <p className="text-sm" style={{ color: text.muted }}>
            © 2025 Scholar Bharat. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: text.muted }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Verification Note */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: text.light }}>
            ✓ All jobs are verified within 24 hours before going live
          </p>
        </div>
      </div>
    </footer>
  );
}

