"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, DollarSign, Calendar, Users, TrendingUp } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import { background, text, brand, gradients, accent } from '@/lib/colors';
import { techStacks, availabilitySlots } from '@/lib/mockData';

export default function JoinInterviewerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    techStack: [] as string[],
    linkedin: '',
    availability: [] as string[]
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      experience: '',
      techStack: [],
      linkedin: '',
      availability: []
    });
  };

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const toggleAvailability = (slot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter(s => s !== slot)
        : [...prev.availability, slot]
    }));
  };

  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Competitive Pay',
      description: 'Earn ₹2,000 - ₹5,000 per interview based on your expertise'
    },
    {
      icon: <Calendar size={32} />,
      title: 'Flexible Schedule',
      description: 'Choose your own hours and interview slots that work for you'
    },
    {
      icon: <Award size={32} />,
      title: 'Build Your Brand',
      description: 'Get recognized as an expert in your domain'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: background.primary }}>
      {/* Hero Section with Image */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: background.white }}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&h=1080&fit=crop"
            alt="Expert interviewer"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="featured" size="md">
              For Industry Experts
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-6" style={{ color: text.primary }}>
              Become an Expert Interviewer
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: text.muted }}>
              Share your expertise, shape careers, and earn while doing it
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold" style={{ color: brand.navy }}>
                  ₹2K-5K
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Per Interview
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: brand.sky }}>
                  500+
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Active Interviewers
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: accent.emerald }}>
                  Flexible
                </div>
                <div className="text-sm" style={{ color: text.muted }}>
                  Schedule
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} hover padding="lg" className="text-center">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                style={{ backgroundColor: `${brand.navy}15`, color: brand.navy }}
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: text.primary }}>
                {benefit.title}
              </h3>
              <p className="text-sm" style={{ color: text.muted }}>
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Application Form */}
        <Card padding="lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: text.primary }}>
              Application Form
            </h2>
            <p className="text-sm" style={{ color: text.muted }}>
              Fill out the form below to join our network of expert interviewers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name *"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              required
              fullWidth
            />

            {/* Email */}
            <Input
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
              required
              fullWidth
            />

            {/* Experience */}
            <Input
              label="Years of Experience *"
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="5"
              required
              fullWidth
              helperText="Minimum 5 years of professional experience required"
            />

            {/* LinkedIn */}
            <Input
              label="LinkedIn Profile *"
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/johndoe"
              required
              fullWidth
            />

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: text.secondary }}>
                Tech Stack / Expertise * (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTech(tech)}
                    className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                    style={{
                      borderColor: formData.techStack.includes(tech) ? brand.navy : '#CBD5E1',
                      backgroundColor: formData.techStack.includes(tech) ? `${brand.navy}15` : background.white,
                      color: formData.techStack.includes(tech) ? brand.navy : text.secondary
                    }}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {formData.techStack.length === 0 && (
                <p className="mt-2 text-sm" style={{ color: text.muted }}>
                  Please select at least one technology
                </p>
              )}
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: text.secondary }}>
                Availability * (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availabilitySlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleAvailability(slot)}
                    className="px-4 py-3 rounded-lg text-sm font-medium border transition-all text-left"
                    style={{
                      borderColor: formData.availability.includes(slot) ? brand.navy : '#CBD5E1',
                      backgroundColor: formData.availability.includes(slot) ? `${brand.navy}15` : background.white,
                      color: formData.availability.includes(slot) ? brand.navy : text.secondary
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.experience ||
                  !formData.linkedin ||
                  formData.techStack.length === 0 ||
                  formData.availability.length === 0
                }
              >
                Submit Application
              </Button>
              <p className="text-xs text-center mt-4" style={{ color: text.muted }}>
                We&apos;ll review your application and get back to you within 3-5 business days
              </p>
            </div>
          </form>
        </Card>

        {/* Requirements */}
        <Card padding="lg" className="mt-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
            Requirements
          </h3>
          <ul className="space-y-3">
            {[
              '5+ years of professional experience in your domain',
              'Strong communication and evaluation skills',
              'Ability to provide constructive feedback',
              'Reliable internet connection for video interviews',
              'Commitment to maintaining professional standards'
            ].map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0" style={{ color: brand.navy }} />
                <span style={{ color: text.secondary }}>{req}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Submitted!"
      >
        <div className="text-center py-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${brand.navy}15` }}
          >
            <CheckCircle2 size={48} style={{ color: brand.navy }} />
          </div>
          <p className="text-lg mb-4" style={{ color: text.primary }}>
            Thank you for applying!
          </p>
          <p className="text-sm mb-6" style={{ color: text.muted }}>
            We&apos;ve received your application and will review it shortly. You&apos;ll hear from us within 3-5 business days.
          </p>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Got it!
          </Button>
        </div>
      </Modal>
    </div>
  );
}

