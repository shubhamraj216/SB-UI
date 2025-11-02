"use client";

import { useState } from 'react';
import { CheckCircle2, Users, Sparkles, BarChart3 } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { background, text, brand } from '@/lib/colors';

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    phone: '',
    message: ''
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
      company: '',
      teamSize: '',
      phone: '',
      message: ''
    });
  };

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: 'AI-Powered Screening',
      description: 'Automated resume matching and candidate filtering'
    },
    {
      icon: <Users size={24} />,
      title: 'Expert Interviews',
      description: 'On-demand technical interviewers with detailed reports'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics Dashboard',
      description: 'Track hiring metrics and candidate performance'
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: background.primary }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: text.primary }}>
              Request a Demo
            </h1>
            <p className="text-xl mb-8" style={{ color: text.muted }}>
              See how Scholar Bharat can transform your technical hiring process
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${brand.navy}15`, color: brand.navy }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: text.primary }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: text.muted }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <Card padding="lg">
              <h3 className="font-bold mb-4" style={{ color: text.primary }}>
                Why companies choose us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} style={{ color: brand.navy }} />
                  <span className="text-sm" style={{ color: text.secondary }}>
                    2.5× faster hiring process
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} style={{ color: brand.navy }} />
                  <span className="text-sm" style={{ color: text.secondary }}>
                    83% engineering bandwidth saved
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} style={{ color: brand.navy }} />
                  <span className="text-sm" style={{ color: text.secondary }}>
                    100+ companies trust us
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} style={{ color: brand.navy }} />
                  <span className="text-sm" style={{ color: text.secondary }}>
                    4.3/5 average satisfaction rating
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Form */}
          <div>
            <Card padding="lg">
              <h2 className="text-2xl font-bold mb-6" style={{ color: text.primary }}>
                Schedule Your Demo
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name *"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                  fullWidth
                />

                <Input
                  label="Work Email *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@company.com"
                  required
                  fullWidth
                />

                <Input
                  label="Company Name *"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Acme Corp"
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: text.secondary }}>
                    Team Size *
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all"
                    style={{
                      borderColor: '#CBD5E1',
                      backgroundColor: background.white,
                      color: text.primary
                    }}
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  fullWidth
                />

                <Input
                  label="Tell us about your hiring needs"
                  as="textarea"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="What are your main hiring challenges?"
                  rows={4}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                >
                  Schedule Demo
                </Button>

                <p className="text-xs text-center" style={{ color: text.muted }}>
                  We&apos;ll contact you within 24 hours to schedule a personalized demo
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Demo Request Received!"
      >
        <div className="text-center py-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${brand.navy}15` }}
          >
            <CheckCircle2 size={48} style={{ color: brand.navy }} />
          </div>
          <p className="text-lg mb-4" style={{ color: text.primary }}>
            Thank you for your interest!
          </p>
          <p className="text-sm mb-6" style={{ color: text.muted }}>
            Our team will reach out to you within 24 hours to schedule a personalized demo of Scholar Bharat.
          </p>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}

