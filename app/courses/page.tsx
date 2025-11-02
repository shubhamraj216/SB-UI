"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, BookOpen, Clock, Users, Star, Grid3X3, List, SlidersHorizontal, X } from 'lucide-react';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import CourseEnrollModal from '@/components/CourseEnrollModal';
import { courses, Course } from '@/lib/mockData';
import { getCourses, isEnrolledInCourse } from '@/lib/storage';
import { background, text, brand, border, accent } from '@/lib/colors';
import { getPreferences, updatePreferences } from '@/lib/storage';
import Image from 'next/image';

type Level = 'All Levels' | 'Beginner to Advanced' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level | ''>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Load view preference and enrolled courses
  useEffect(() => {
    const prefs = getPreferences();
    setViewMode(prefs.jobsViewMode);
    
    const enrolled = getCourses();
    setEnrolledCourses(new Set(enrolled.map(c => c.courseId)));
  }, []);

  // Update view mode preference
  const handleViewModeChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
    updatePreferences({ jobsViewMode: mode });
  };

  // Get all unique tags
  const allTags = Array.from(new Set(courses.flatMap(c => c.tags)));
  const allLevels: Level[] = ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced', 'All Levels'];

  // Filter courses
  useEffect(() => {
    let filtered = [...courses];

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Level
    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(course =>
        selectedTags.some(tag => course.tags.includes(tag))
      );
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedLevel, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedLevel('');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSuccess = () => {
    const enrolled = getCourses();
    setEnrolledCourses(new Set(enrolled.map(c => c.courseId)));
  };

  const hasActiveFilters = selectedLevel || selectedTags.length > 0 || searchQuery;

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ backgroundColor: background.primary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: text.primary }}>
            Master Your Skills
          </h1>
          <p className="text-xl" style={{ color: text.muted }}>
            Explore <span className="font-semibold" style={{ color: brand.navy }}>{filteredCourses.length}</span> professional courses
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
              placeholder="Search courses by title, instructor, or topic..."
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
                  {[selectedLevel, ...selectedTags].filter(Boolean).length}
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
                {/* Level Filter */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedLevel ? brand.navy : border.light,
                    backgroundColor: selectedLevel ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="flex items-center gap-2 text-base font-bold mb-4" style={{ color: text.primary }}>
                    <BookOpen size={20} style={{ color: brand.navy }} />
                    Level
                  </label>
                  <div className="space-y-3">
                    {allLevels.map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="w-5 h-5 cursor-pointer"
                          style={{ accentColor: brand.navy }}
                        />
                        <span className="text-base group-hover:opacity-70 transition-opacity" style={{ color: text.secondary }}>
                          {level}
                        </span>
                      </label>
                    ))}
                    {selectedLevel && (
                      <button
                        onClick={() => setSelectedLevel('')}
                        className="text-sm font-medium mt-2 hover:opacity-70 transition-opacity"
                        style={{ color: brand.navy }}
                      >
                        Clear selection
                      </button>
                    )}
                  </div>
                </div>

                {/* Topics/Tags */}
                <div 
                  className="p-5 rounded-xl border"
                  style={{ 
                    borderColor: selectedTags.length > 0 ? brand.navy : border.light,
                    backgroundColor: selectedTags.length > 0 ? `${brand.navy}05` : background.white
                  }}
                >
                  <label className="text-base font-bold mb-4 block" style={{ color: text.primary }}>
                    Topics
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all hover:scale-105"
                        style={{
                          borderColor: selectedTags.includes(tag) ? brand.navy : border.default,
                          backgroundColor: selectedTags.includes(tag) ? brand.navy : background.white,
                          color: selectedTags.includes(tag) ? 'white' : text.secondary
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Courses List */}
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
                {selectedLevel && (
                  <Badge variant="info" size="md">
                    📚 {selectedLevel}
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="info" size="md">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Courses Grid/List */}
            {filteredCourses.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredCourses.map((course) => {
                  const isEnrolled = enrolledCourses.has(course.id);
                  
                  return (
                    <Card key={course.id} hover className="h-full">
                      <div className="flex flex-col h-full">
                        {/* Course Image */}
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                          <Image 
                            src={course.image} 
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          {isEnrolled && (
                            <div 
                              className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: accent.emerald }}
                            >
                              Enrolled
                            </div>
                          )}
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 flex flex-col">
                          <Link 
                            href={`/courses/${course.id}`}
                            className="text-xl font-bold mb-2 hover:underline line-clamp-2"
                            style={{ color: text.primary }}
                          >
                            {course.title}
                          </Link>
                          
                          <p className="text-sm mb-4 line-clamp-2" style={{ color: text.muted }}>
                            {course.description}
                          </p>

                          <div className="mb-4 text-sm" style={{ color: text.secondary }}>
                            <p className="font-medium">{course.instructor}</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {course.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-md"
                                style={{ 
                                  backgroundColor: `${brand.navy}10`,
                                  color: brand.navy
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm mb-4" style={{ color: text.muted }}>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{course.enrolled.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                              <span>{course.rating}</span>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-auto pt-4 flex items-center justify-between">
                            <div>
                              <span className="text-xs" style={{ color: text.muted }}>Price</span>
                              <p className="text-xl font-bold" style={{ color: brand.navy }}>
                                ₹{course.price.toLocaleString()}
                              </p>
                            </div>
                            
                            <Button 
                              variant={isEnrolled ? "outline" : "primary"}
                              size="sm"
                              onClick={() => handleEnroll(course)}
                            >
                              {isEnrolled ? 'View Course' : 'Enroll Now'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
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
                  <BookOpen size={40} style={{ color: brand.navy }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: text.primary }}>
                  No courses found
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

      {/* Enroll Modal */}
      {selectedCourse && (
        <CourseEnrollModal
          isOpen={isEnrollModalOpen}
          onClose={() => {
            setIsEnrollModalOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
          onEnrollSuccess={handleEnrollSuccess}
        />
      )}
    </div>
  );
}

