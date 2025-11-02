"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, FileText, Upload, 
  Download, Trash2, Edit2, Save, X, Book, Code, Clock, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { 
  getApplications, 
  getCourses, 
  getInterviews, 
  getResume, 
  saveResume, 
  deleteResume,
  ResumeData,
  Application,
  CourseEnrollment,
  Interview
} from '@/lib/storage';
import { jobs, courses } from '@/lib/mockData';
import { background, text, brand, border, accent } from '@/lib/colors';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    bio: '',
    phone: '',
    location: '',
    skills: [] as string[],
    linkedIn: '',
    github: '',
    portfolio: ''
  });
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<CourseEnrollment[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('basic');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Load data
    setApplications(getApplications());
    setEnrolledCourses(getCourses());
    setInterviews(getInterviews());
    setResume(getResume());

    // Load profile data
    if (user?.profile) {
      setEditedProfile({
        bio: user.profile.bio || '',
        phone: user.profile.phone || '',
        location: user.profile.location || '',
        skills: user.profile.skills || [],
        linkedIn: user.profile.linkedIn || '',
        github: user.profile.github || '',
        portfolio: user.profile.portfolio || ''
      });
    }
  }, [isAuthenticated, router, user]);

  const handleSaveProfile = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploadingResume(true);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const resumeData: ResumeData = {
          fileName: file.name,
          fileData: reader.result as string,
          fileType: file.type,
          uploadedAt: new Date().toISOString(),
        };
        
        saveResume(resumeData);
        setResume(resumeData);
        setIsUploadingResume(false);
      };
      reader.onerror = () => {
        alert('Failed to upload file');
        setIsUploadingResume(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert('Failed to upload file');
      setIsUploadingResume(false);
    }
  };

  const handleResumeDownload = () => {
    if (!resume) return;
    
    const link = document.createElement('a');
    link.href = resume.fileData;
    link.download = resume.fileName;
    link.click();
  };

  const handleResumeDelete = () => {
    if (confirm('Are you sure you want to delete your resume?')) {
      deleteResume();
      setResume(null);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const getJobById = (jobId: string) => jobs.find(j => j.id === jobId);
  const getCourseById = (courseId: string) => courses.find(c => c.id === courseId);
  const upcomingInterviews = interviews.filter(i => i.type === 'upcoming');
  const pastInterviews = interviews.filter(i => i.type === 'past');

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: background.primary }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: text.primary }}>
            My Profile
          </h1>
          <p className="text-lg capitalize" style={{ color: text.muted }}>
            {user.type} Dashboard
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {['basic', 'resume', 
            ...(user.type === 'candidate' || user.type === 'interviewer' ? ['applications'] : []),
            ...(user.type === 'candidate' || user.type === 'interviewer' ? ['courses'] : []),
            'interviews'
          ].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className="px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeSection === section ? brand.navy : background.white,
                color: activeSection === section ? 'white' : text.secondary,
                border: `1px solid ${activeSection === section ? brand.navy : border.default}`
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <Card>
              <div className="text-center">
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: brand.navy }}
                >
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: text.primary }}>
                  {user.name}
                </h2>
                <p className="mb-2" style={{ color: text.muted }}>
                  {user.email}
                </p>
                <Badge variant="info" size="md">
                  {user.type}
                </Badge>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="font-bold mb-4" style={{ color: text.primary }}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                {user.type === 'candidate' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: text.muted }}>Applications</span>
                      <span className="font-bold" style={{ color: brand.navy }}>{applications.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: text.muted }}>Courses Enrolled</span>
                      <span className="font-bold" style={{ color: brand.navy }}>{enrolledCourses.length}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: text.muted }}>Upcoming Interviews</span>
                  <span className="font-bold" style={{ color: brand.navy }}>{upcomingInterviews.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: text.muted }}>Past Interviews</span>
                  <span className="font-bold" style={{ color: brand.navy }}>{pastInterviews.length}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            {activeSection === 'basic' && (
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold" style={{ color: text.primary }}>
                    Basic Information
                  </h3>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 size={16} />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        <X size={16} />
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSaveProfile}>
                        <Save size={16} />
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: text.secondary }}>
                        <User size={16} />
                        Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: background.primary,
                          color: text.muted
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: text.secondary }}>
                        <Mail size={16} />
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: background.primary,
                          color: text.muted
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: text.secondary }}>
                        <Phone size={16} />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: isEditing ? background.white : background.primary,
                          color: text.primary
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: text.secondary }}>
                        <MapPin size={16} />
                        Location
                      </label>
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        disabled={!isEditing}
                        placeholder="City, Country"
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: isEditing ? background.white : background.primary,
                          color: text.primary
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: text.secondary }}>
                      Bio
                    </label>
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-2 rounded-lg border resize-none"
                      style={{ 
                        borderColor: border.default,
                        backgroundColor: isEditing ? background.white : background.primary,
                        color: text.primary
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block" style={{ color: text.secondary }}>
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={editedProfile.linkedIn}
                        onChange={(e) => setEditedProfile({ ...editedProfile, linkedIn: e.target.value })}
                        disabled={!isEditing}
                        placeholder="LinkedIn URL"
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: isEditing ? background.white : background.primary,
                          color: text.primary
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block" style={{ color: text.secondary }}>
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={editedProfile.github}
                        onChange={(e) => setEditedProfile({ ...editedProfile, github: e.target.value })}
                        disabled={!isEditing}
                        placeholder="GitHub URL"
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: isEditing ? background.white : background.primary,
                          color: text.primary
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold mb-2 block" style={{ color: text.secondary }}>
                        Portfolio
                      </label>
                      <input
                        type="url"
                        value={editedProfile.portfolio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, portfolio: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Portfolio URL"
                        className="w-full px-4 py-2 rounded-lg border"
                        style={{ 
                          borderColor: border.default,
                          backgroundColor: isEditing ? background.white : background.primary,
                          color: text.primary
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Resume Section */}
            {activeSection === 'resume' && (
              <Card>
                <h3 className="text-xl font-bold mb-6" style={{ color: text.primary }}>
                  Resume Management
                </h3>

                {resume ? (
                  <div 
                    className="p-6 rounded-lg border mb-4"
                    style={{ borderColor: border.default, backgroundColor: background.primary }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${brand.navy}15` }}
                        >
                          <FileText size={24} style={{ color: brand.navy }} />
                        </div>
                        <div>
                          <p className="font-semibold mb-1" style={{ color: text.primary }}>
                            {resume.fileName}
                          </p>
                          <p className="text-sm" style={{ color: text.muted }}>
                            Uploaded {formatDate(resume.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleResumeDownload}>
                          <Download size={16} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleResumeDelete}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingResume}
                  className="w-full p-8 rounded-lg border-2 border-dashed transition-all hover:border-solid"
                  style={{ 
                    borderColor: border.default,
                    backgroundColor: background.white
                  }}
                >
                  <Upload size={40} className="mx-auto mb-3" style={{ color: text.muted }} />
                  <p className="font-semibold mb-1" style={{ color: text.primary }}>
                    {isUploadingResume ? 'Uploading...' : resume ? 'Upload New Resume' : 'Upload Resume'}
                  </p>
                  <p className="text-sm" style={{ color: text.muted }}>
                    PDF, DOC, or DOCX (Max 5MB)
                  </p>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </Card>
            )}

            {/* Applications Section (Candidate) */}
            {(user.type === 'candidate' || user.type === 'interviewer') && activeSection === 'applications' && (
              <Card>
                <h3 className="text-xl font-bold mb-6" style={{ color: text.primary }}>
                  Job Applications
                </h3>

                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const job = getJobById(app.jobId);
                      return (
                        <Link 
                          key={app.id}
                          href={`/jobs/${app.jobId}`}
                          target="_blank"
                        >
                          <div 
                            className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{ borderColor: border.default }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold hover:underline" style={{ color: text.primary }}>
                                  {app.jobTitle}
                                </h4>
                                <p className="text-sm" style={{ color: text.muted }}>
                                  {app.company}
                                </p>
                              </div>
                              <Badge variant={app.status === 'pending' ? 'info' : app.status === 'accepted' ? 'verified' : 'live'} size="sm">
                                {app.status}
                              </Badge>
                            </div>
                            <p className="text-xs" style={{ color: text.light }}>
                              Applied {formatDate(app.appliedAt)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                    <p style={{ color: text.muted }}>No applications yet</p>
                    <Button variant="primary" size="sm" onClick={() => router.push('/jobs')} className="mt-4">
                      Browse Jobs
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Courses Section */}
            {(user.type === 'candidate' || user.type === 'interviewer') && activeSection === 'courses' && (
              <Card>
                <h3 className="text-xl font-bold mb-6" style={{ color: text.primary }}>
                  My Courses
                </h3>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((enrollment) => {
                      const course = getCourseById(enrollment.courseId);
                      return (
                        <Link 
                          key={enrollment.courseId}
                          href={`/courses/${enrollment.courseId}`}
                        >
                          <div 
                            className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{ borderColor: border.default }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 hover:underline" style={{ color: text.primary }}>
                                  {enrollment.courseTitle}
                                </h4>
                                <p className="text-xs" style={{ color: text.muted }}>
                                  Enrolled {formatDate(enrollment.enrolledAt)}
                                </p>
                              </div>
                              {enrollment.progress === 100 && (
                                <CheckCircle size={20} style={{ color: accent.emerald }} />
                              )}
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1" style={{ color: text.muted }}>
                                <span>Progress</span>
                                <span>{enrollment.progress}%</span>
                              </div>
                              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: background.primary }}>
                                <div 
                                  className="h-full transition-all"
                                  style={{ 
                                    width: `${enrollment.progress}%`,
                                    backgroundColor: enrollment.progress === 100 ? accent.emerald : brand.navy
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                    <p style={{ color: text.muted }}>No courses enrolled yet</p>
                  </div>
                )}
              </Card>
            )}

            {/* Interviews Section */}
            {activeSection === 'interviews' && (
              <div className="space-y-6">
                {/* Upcoming Interviews */}
                <Card>
                  <h3 className="text-xl font-bold mb-6" style={{ color: text.primary }}>
                    Upcoming Interviews
                  </h3>

                  {upcomingInterviews.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingInterviews.map((interview) => (
                        <div 
                          key={interview.id}
                          className="p-4 rounded-lg border"
                          style={{ borderColor: border.default, backgroundColor: `${brand.navy}05` }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold" style={{ color: text.primary }}>
                                {interview.role}
                              </h4>
                              <p className="text-sm" style={{ color: text.muted }}>
                                {interview.company}
                              </p>
                            </div>
                            <Badge variant="info" size="sm">{interview.status}</Badge>
                          </div>
                          <div className="flex gap-4 text-sm mt-3" style={{ color: text.secondary }}>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(interview.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {interview.time} ({interview.duration} min)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                      <p style={{ color: text.muted }}>No upcoming interviews</p>
                    </div>
                  )}
                </Card>

                {/* Past Interviews */}
                <Card>
                  <h3 className="text-xl font-bold mb-6" style={{ color: text.primary }}>
                    Past Interviews
                  </h3>

                  {pastInterviews.length > 0 ? (
                    <div className="space-y-4">
                      {pastInterviews.map((interview) => (
                        <div 
                          key={interview.id}
                          className="p-4 rounded-lg border"
                          style={{ borderColor: border.default }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold" style={{ color: text.primary }}>
                                {interview.role}
                              </h4>
                              <p className="text-sm" style={{ color: text.muted }}>
                                {interview.company}
                              </p>
                            </div>
                            <Badge variant="live" size="sm">Completed</Badge>
                          </div>
                          <div className="text-sm mt-2" style={{ color: text.secondary }}>
                            {formatDate(interview.date)} at {interview.time}
                          </div>
                          {interview.notes && (
                            <div className="mt-3 p-3 rounded text-sm" style={{ backgroundColor: background.primary, color: text.secondary }}>
                              {interview.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock size={48} className="mx-auto mb-4" style={{ color: text.muted }} />
                      <p style={{ color: text.muted }}>No past interviews</p>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

