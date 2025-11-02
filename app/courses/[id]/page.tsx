"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Clock, Users, Star, Award, CheckCircle, Play, 
  BookOpen, Target, TrendingUp, Share2
} from 'lucide-react';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import CourseEnrollModal from '@/components/CourseEnrollModal';
import { courses, Course } from '@/lib/mockData';
import { isEnrolledInCourse, getCourses } from '@/lib/storage';
import { background, text, brand, border, accent } from '@/lib/colors';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Check enrollment
      setIsEnrolled(isEnrolledInCourse(courseId));
      
      // Find similar courses (same tags)
      const similar = courses
        .filter(c => 
          c.id !== courseId && 
          c.tags.some(tag => foundCourse.tags.includes(tag))
        )
        .slice(0, 3);
      setSimilarCourses(similar);
    }
  }, [courseId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course?.title,
          text: `Check out this course: ${course?.title}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleEnrollSuccess = () => {
    setIsEnrolled(true);
    setIsEnrollModalOpen(false);
  };

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ backgroundColor: background.primary }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>
            Course not found
          </h1>
          <Button variant="primary" onClick={() => router.push('/courses')}>
            Browse All Courses
          </Button>
        </div>
      </div>
    );
  }

  const curriculum = [
    { title: 'Introduction & Setup', lessons: 5, duration: '45 min' },
    { title: 'Core Concepts', lessons: 8, duration: '2 hrs' },
    { title: 'Advanced Techniques', lessons: 12, duration: '3 hrs' },
    { title: 'Real-world Projects', lessons: 6, duration: '4 hrs' },
    { title: 'Best Practices', lessons: 4, duration: '1 hr' },
  ];

  const learningOutcomes = [
    'Master the fundamentals and advanced concepts',
    'Build real-world projects from scratch',
    'Understand industry best practices',
    'Prepare for technical interviews',
    'Get hands-on experience with practical exercises'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: background.primary }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: brand.navy }}
        >
          <ArrowLeft size={16} />
          Back to Courses
        </button>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left - Course Info */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-xl p-8"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="info" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-4" style={{ color: text.primary }}>
                {course.title}
              </h1>

              <p className="text-lg mb-6" style={{ color: text.secondary }}>
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star size={20} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  <span className="font-semibold" style={{ color: text.primary }}>
                    {course.rating}
                  </span>
                  <span className="text-sm" style={{ color: text.muted }}>
                    (1,234 ratings)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} style={{ color: text.muted }} />
                  <span style={{ color: text.secondary }}>
                    {course.enrolled.toLocaleString()} students
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm pb-6 border-b" style={{ borderColor: border.light }}>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} style={{ color: text.muted }} />
                  <span style={{ color: text.secondary }}>Created by <strong>{course.instructor}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: text.muted }} />
                  <span style={{ color: text.secondary }}>{course.duration}</span>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="flex-shrink-0 mt-0.5" style={{ color: accent.emerald }} />
                      <span style={{ color: text.secondary }}>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div 
              className="rounded-xl p-8 mt-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: text.primary }}>
                Course Curriculum
              </h2>
              <div className="space-y-4">
                {curriculum.map((section, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: border.default }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold" style={{ color: text.primary }}>
                        {idx + 1}. {section.title}
                      </h3>
                      <Play size={16} style={{ color: brand.navy }} />
                    </div>
                    <div className="flex items-center gap-4 text-sm" style={{ color: text.muted }}>
                      <span>{section.lessons} lessons</span>
                      <span>•</span>
                      <span>{section.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div 
              className="rounded-xl p-8 mt-6"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: text.primary }}>
                Requirements
              </h2>
              <ul className="space-y-2">
                {[
                  'Basic understanding of programming concepts',
                  'A computer with internet connection',
                  'Willingness to learn and practice',
                  'No prior experience required'
                ].map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span style={{ color: brand.navy }}>•</span>
                    <span style={{ color: text.secondary }}>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Enrollment Card */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-xl p-6 sticky top-24"
              style={{ 
                backgroundColor: background.white,
                border: `1px solid ${border.light}`
              }}
            >
              {/* Course Image */}
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                <Image 
                  src={course.image} 
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {isEnrolled && (
                  <div 
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: accent.emerald }}
                  >
                    Enrolled
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2" style={{ color: brand.navy }}>
                  ₹{course.price.toLocaleString()}
                </div>
                <p className="text-sm" style={{ color: text.muted }}>
                  One-time payment • Full lifetime access
                </p>
              </div>

              {/* Enroll Button */}
              <Button 
                variant="primary" 
                size="lg"
                fullWidth
                onClick={() => setIsEnrollModalOpen(true)}
                className="mb-4"
              >
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </Button>

              <Button 
                variant="outline" 
                size="md"
                fullWidth
                onClick={handleShare}
                className="mb-6"
              >
                <Share2 size={18} />
                Share Course
              </Button>

              {/* Course includes */}
              <div className="space-y-3 text-sm">
                <p className="font-semibold mb-3" style={{ color: text.primary }}>
                  This course includes:
                </p>
                {[
                  { icon: Clock, text: `${course.duration} of video content` },
                  { icon: BookOpen, text: 'Downloadable resources' },
                  { icon: Award, text: 'Certificate of completion' },
                  { icon: Target, text: 'Hands-on projects' },
                  { icon: TrendingUp, text: 'Lifetime access' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <item.icon size={16} style={{ color: text.muted }} />
                    <span style={{ color: text.secondary }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Courses */}
        {similarCourses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: text.primary }}>
              Similar Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCourses.map((similarCourse) => (
                <Card key={similarCourse.id} hover>
                  <Link href={`/courses/${similarCourse.id}`}>
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                      <Image 
                        src={similarCourse.image} 
                        alt={similarCourse.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold mb-2 line-clamp-2" style={{ color: text.primary }}>
                      {similarCourse.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: text.muted }}>
                      {similarCourse.instructor}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                        <span className="text-sm font-semibold">{similarCourse.rating}</span>
                      </div>
                      <span className="font-bold" style={{ color: brand.navy }}>
                        ₹{similarCourse.price.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enroll Modal */}
      <CourseEnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        course={course}
        onEnrollSuccess={handleEnrollSuccess}
      />
    </div>
  );
}

