"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, Clock, X, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import JobCard from '@/components/JobCard';
import QuickApplyModal from '@/components/QuickApplyModal';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { jobs, techStacks, locations, Job, JobType, ExperienceLevel } from '@/lib/mockData';
import { background, text, brand, border, accent } from '@/lib/colors';
import { getPreferences, updatePreferences } from '@/lib/storage';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<JobType | ''>('');
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Load view preference
  useEffect(() => {
    const prefs = getPreferences();
    setViewMode(prefs.jobsViewMode);
  }, []);

  // Update view mode preference
  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
    updatePreferences({ jobsViewMode: mode });
  };

  // Filter jobs
  useEffect(() => {
    let filtered = jobs.filter(job => job.status !== 'under_review');

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Location
    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Tech stack
    if (selectedTech.length > 0) {
      filtered = filtered.filter(job =>
        selectedTech.some(tech => job.techStack.includes(tech))
      );
    }

    // Job type
    if (selectedType) {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // Experience
    if (selectedExperience) {
      filtered = filtered.filter(job => job.experience === selectedExperience);
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedLocation, selectedTech, selectedType, selectedExperience]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedTech([]);
    setSelectedType('');
    setSelectedExperience('');
    setSearchQuery('');
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const hasActiveFilters = selectedLocation || selectedTech.length > 0 || selectedType || selectedExperience || searchQuery;

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: background.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text.primary }}>
            Find Your Dream Job
          </h1>
          <p className="text-xl" style={{ color: text.muted }}>
            Explore <span className="font-semibold" style={{ color: brand.navy }}>{filteredJobs.length}</span> verified opportunities
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" 
              size={20} 
              style={{ color: text.muted }} 
            />
            <input
              type="text"
              placeholder="Search by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none focus:border-opacity-100"
              style={{
                borderColor: searchQuery ? brand.navy : border.default,
                backgroundColor: background.white,
                color: text.primary,
                fontSize: '16px'
              }}
            />
          </div>
          
          <div className="flex gap-2">
            {/* View Mode Toggle */}
            <div className="flex rounded-xl border overflow-hidden" style={{ borderColor: border.default }}>
              <button
                onClick={() => handleViewModeChange('list')}
                className="px-4 py-3 transition-all"
                style={{
                  backgroundColor: viewMode === 'list' ? brand.navy : background.white,
                  color: viewMode === 'list' ? 'white' : text.secondary
                }}
                aria-label="List view"
              >
                <List size={20} />
              </button>
              <button
                onClick={() => handleViewModeChange('grid')}
                className="px-4 py-3 transition-all border-l"
                style={{
                  backgroundColor: viewMode === 'grid' ? brand.navy : background.white,
                  color: viewMode === 'grid' ? 'white' : text.secondary,
                  borderColor: border.default
                }}
                aria-label="Grid view"
              >
                <Grid3X3 size={20} />
              </button>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-2"
              style={{
                borderColor: showFilters ? brand.navy : border.default,
                backgroundColor: background.white,
                color: showFilters ? brand.navy : text.secondary
              }}
            >
              <SlidersHorizontal size={20} />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: accent.emerald }}
                >
                  {[selectedLocation, selectedType, selectedExperience, ...selectedTech].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside 
            className={`
              ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto' : 'hidden'}
              lg:block lg:w-80 flex-shrink-0
            `}
            style={{ backgroundColor: background.white }}
          >
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={24} style={{ color: brand.navy }} />
                  <h2 className="text-2xl font-bold" style={{ color: text.primary }}>
                    Filters
                  </h2>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full mb-6 px-4 py-3 rounded-xl font-semibold transition-all hover:opacity-80"
                  style={{
                    backgroundColor: `${brand.navy}10`,
                    color: brand.navy
                  }}
                >
                  Clear All Filters
                </button>
              )}

              <div className="space-y-6">
                {/* Location */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedLocation ? brand.navy : border.light,
                    backgroundColor: selectedLocation ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="flex items-center gap-2 text-base font-bold mb-4" style={{ color: text.primary }}>
                    <MapPin size={20} style={{ color: brand.navy }} />
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                    style={{
                      borderColor: border.default,
                      backgroundColor: background.white,
                      color: text.primary,
                      fontSize: '15px'
                    }}
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Job Type */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedType ? brand.navy : border.light,
                    backgroundColor: selectedType ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="flex items-center gap-2 text-base font-bold mb-4" style={{ color: text.primary }}>
                    <Briefcase size={20} style={{ color: brand.navy }} />
                    Job Type
                  </label>
                  <div className="space-y-3">
                    {(['full-time', 'part-time', 'contract', 'internship'] as JobType[]).map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="jobType"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(type)}
                          className="w-5 h-5 cursor-pointer"
                          style={{ accentColor: brand.navy }}
                        />
                        <span className="text-base capitalize group-hover:opacity-70 transition-opacity" style={{ color: text.secondary }}>
                          {type.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                    {selectedType && (
                      <button
                        onClick={() => setSelectedType('')}
                        className="text-sm font-medium mt-2 hover:opacity-70 transition-opacity"
                        style={{ color: brand.navy }}
                      >
                        Clear selection
                      </button>
                    )}
                  </div>
                </div>

                {/* Experience Level */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedExperience ? brand.navy : border.light,
                    backgroundColor: selectedExperience ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="flex items-center gap-2 text-base font-bold mb-4" style={{ color: text.primary }}>
                    <Clock size={20} style={{ color: brand.navy }} />
                    Experience Level
                  </label>
                  <div className="space-y-3">
                    {(['entry', 'junior', 'mid', 'senior', 'lead'] as ExperienceLevel[]).map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="experience"
                          checked={selectedExperience === level}
                          onChange={() => setSelectedExperience(level)}
                          className="w-5 h-5 cursor-pointer"
                          style={{ accentColor: brand.navy }}
                        />
                        <span className="text-base capitalize group-hover:opacity-70 transition-opacity" style={{ color: text.secondary }}>
                          {level}
                        </span>
                      </label>
                    ))}
                    {selectedExperience && (
                      <button
                        onClick={() => setSelectedExperience('')}
                        className="text-sm font-medium mt-2 hover:opacity-70 transition-opacity"
                        style={{ color: brand.navy }}
                      >
                        Clear selection
                      </button>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedTech.length > 0 ? brand.navy : border.light,
                    backgroundColor: selectedTech.length > 0 ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="text-base font-bold mb-4 block" style={{ color: text.primary }}>
                    Tech Stack
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {techStacks.slice(0, 15).map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all hover:scale-105"
                        style={{
                          borderColor: selectedTech.includes(tech) ? brand.navy : border.default,
                          backgroundColor: selectedTech.includes(tech) ? brand.navy : background.white,
                          color: selectedTech.includes(tech) ? 'white' : text.secondary
                        }}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6 p-4 rounded-xl" style={{ backgroundColor: background.white }}>
                <span className="text-sm font-semibold" style={{ color: text.muted }}>
                  Active filters:
                </span>
                {searchQuery && (
                  <Badge variant="info" size="md">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedLocation && (
                  <Badge variant="info" size="md">
                    📍 {selectedLocation}
                  </Badge>
                )}
                {selectedType && (
                  <Badge variant="info" size="md">
                    💼 {selectedType}
                  </Badge>
                )}
                {selectedExperience && (
                  <Badge variant="info" size="md">
                    ⏱️ {selectedExperience}
                  </Badge>
                )}
                {selectedTech.map(tech => (
                  <Badge key={tech} variant="info" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {/* Jobs Grid/List */}
            {filteredJobs.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            ) : (
              <div 
                className="text-center py-20 rounded-xl"
                style={{ backgroundColor: background.white }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${brand.navy}10` }}
                >
                  <Search size={40} style={{ color: brand.navy }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: text.primary }}>
                  No jobs found
                </h3>
                <p className="text-lg mb-6" style={{ color: text.muted }}>
                  Try adjusting your filters or search query
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
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
