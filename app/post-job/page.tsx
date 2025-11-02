"use client";

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Badge from '@/components/Badge';
import { background, text, brand } from '@/lib/colors';
import { techStacks, locations } from '@/lib/mockData';

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    experienceYears: '',
    salaryMin: '',
    salaryMax: '',
    techStack: [] as string[],
    description: '',
    requirements: '',
    companyEmail: '',
    companyWebsite: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      type: '',
      experienceYears: '',
      salaryMin: '',
      salaryMax: '',
      techStack: [],
      description: '',
      requirements: '',
      companyEmail: '',
      companyWebsite: ''
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

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: background.primary }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text.primary }}>
            Post a Job
          </h1>
          <p className="text-lg" style={{ color: text.muted }}>
            Reach thousands of qualified candidates on Scholar Bharat
          </p>
        </div>

        {/* Verification Notice */}
        <Card padding="md" className="mb-8" style={{ backgroundColor: `${brand.sky}10` }}>
          <div className="flex gap-3">
            <AlertCircle size={24} style={{ color: brand.sky }} className="flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1" style={{ color: text.primary }}>
                Job Verification Process
              </h3>
              <p className="text-sm" style={{ color: text.secondary }}>
                All jobs go through a verification process within 24 hours before going live. 
                This ensures quality and trust for our candidate community.
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Details Section */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
                Job Details
              </h2>
              
              <div className="space-y-5">
                <Input
                  label="Job Title *"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Senior Full Stack Engineer"
                  required
                  fullWidth
                />

                <Input
                  label="Company Name *"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Your Company Name"
                  required
                  fullWidth
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: text.secondary }}>
                      Location *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all"
                      style={{
                        borderColor: '#CBD5E1',
                        backgroundColor: background.white,
                        color: text.primary
                      }}
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: text.secondary }}>
                      Job Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all"
                      style={{
                        borderColor: '#CBD5E1',
                        backgroundColor: background.white,
                        color: text.primary
                      }}
                    >
                      <option value="">Select type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Minimum Experience (years) *"
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                  placeholder="3"
                  required
                  fullWidth
                  helperText="Minimum years of experience required"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Minimum Salary (INR) *"
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                    placeholder="1200000"
                    required
                    fullWidth
                  />

                  <Input
                    label="Maximum Salary (INR) *"
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                    placeholder="1800000"
                    required
                    fullWidth
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: text.secondary }}>
                    Required Tech Stack * (Select all that apply)
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

                <Input
                  label="Job Description *"
                  as="textarea"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, responsibilities, and what makes it exciting..."
                  rows={6}
                  required
                  fullWidth
                  helperText="Provide a detailed description of the role"
                />

                <Input
                  label="Requirements *"
                  as="textarea"
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="List key requirements and qualifications (one per line)..."
                  rows={6}
                  required
                  fullWidth
                  helperText="List specific skills and qualifications needed"
                />
              </div>
            </div>

            {/* Company Details Section */}
            <div className="pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: text.primary }}>
                Company Details
              </h2>
              
              <div className="space-y-5">
                <Input
                  label="Company Email *"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
                  placeholder="hr@company.com"
                  required
                  fullWidth
                  helperText="Applications will be sent to this email"
                />

                <Input
                  label="Company Website"
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
                  placeholder="https://company.com"
                  fullWidth
                />
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
                disabled={formData.techStack.length === 0}
              >
                Post Job
              </Button>
              <p className="text-xs text-center mt-4" style={{ color: text.muted }}>
                By posting, you agree to our terms of service. Your job will be reviewed within 24 hours.
              </p>
            </div>
          </form>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { title: 'Verified Candidates', desc: 'Access pre-screened technical talent' },
            { title: 'Quick Hiring', desc: 'Fill positions 2.5× faster' },
            { title: 'Quality Matches', desc: 'AI-powered candidate matching' }
          ].map((benefit, index) => (
            <Card key={index} padding="md" className="text-center">
              <h3 className="font-semibold mb-2" style={{ color: text.primary }}>
                {benefit.title}
              </h3>
              <p className="text-sm" style={{ color: text.muted }}>
                {benefit.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Job Submitted Successfully!"
      >
        <div className="text-center py-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${brand.navy}15` }}
          >
            <CheckCircle2 size={48} style={{ color: brand.navy }} />
          </div>
          
          <Badge variant="under_review" size="md" />
          
          <p className="text-lg mt-4 mb-4" style={{ color: text.primary }}>
            Your job posting is under review
          </p>
          <p className="text-sm mb-6" style={{ color: text.muted }}>
            Our team will verify the job details and publish it within 24 hours. 
            You&apos;ll receive a confirmation email once it goes live.
          </p>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}

