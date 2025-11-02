/**
 * LocalStorage Management System
 * Centralized utilities for managing application data in localStorage
 */

// Types
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  resume: ResumeData | null;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'accepted' | 'rejected';
}

export interface ResumeData {
  fileName: string;
  fileData: string; // Base64 encoded file data
  fileType: string;
  uploadedAt: string;
}

export interface CourseEnrollment {
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  progress: number; // 0-100
  completedAt?: string;
}

export interface CodingSubmission {
  id: string;
  problemId: string;
  problemTitle: string;
  code: string;
  language: string;
  timestamp: string;
  passed: boolean;
  testsPassed: number;
  totalTests: number;
  runtime?: number;
}

export interface Interview {
  id: string;
  type: 'upcoming' | 'past';
  role: string;
  company: string;
  date: string;
  time: string;
  duration: number; // in minutes
  interviewer?: string;
  notes?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface UserPreferences {
  jobsViewMode: 'list' | 'grid';
  theme: 'light' | 'dark';
}

// Storage Keys
const STORAGE_KEYS = {
  APPLICATIONS: 'sb_applications',
  RESUME: 'sb_resume',
  COURSES: 'sb_courses',
  SUBMISSIONS: 'sb_coding_submissions',
  INTERVIEWS: 'sb_interviews',
  PREFERENCES: 'sb_preferences',
  USER_PROFILE: 'sb_user_profile',
} as const;

// Helper to safely parse JSON
function safeParseJSON<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

// Applications
export function getApplications(): Application[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return safeParseJSON(data, []);
}

export function addApplication(application: Omit<Application, 'id' | 'appliedAt'>): Application {
  const applications = getApplications();
  const newApplication: Application = {
    ...application,
    id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    appliedAt: new Date().toISOString(),
  };
  applications.push(newApplication);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  return newApplication;
}

export function getApplicationsByJobId(jobId: string): Application | undefined {
  const applications = getApplications();
  return applications.find(app => app.jobId === jobId);
}

export function updateApplicationStatus(applicationId: string, status: Application['status']): void {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === applicationId);
  if (index !== -1) {
    applications[index].status = status;
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }
}

// Resume
export function getResume(): ResumeData | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.RESUME);
  return safeParseJSON(data, null);
}

export function saveResume(resume: ResumeData): void {
  localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resume));
}

export function deleteResume(): void {
  localStorage.removeItem(STORAGE_KEYS.RESUME);
}

// Courses
export function getCourses(): CourseEnrollment[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.COURSES);
  return safeParseJSON(data, []);
}

export function enrollCourse(courseId: string, courseTitle: string): CourseEnrollment {
  const courses = getCourses();
  
  // Check if already enrolled
  const existing = courses.find(c => c.courseId === courseId);
  if (existing) return existing;
  
  const enrollment: CourseEnrollment = {
    courseId,
    courseTitle,
    enrolledAt: new Date().toISOString(),
    progress: 0,
  };
  
  courses.push(enrollment);
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  return enrollment;
}

export function updateCourseProgress(courseId: string, progress: number): void {
  const courses = getCourses();
  const index = courses.findIndex(c => c.courseId === courseId);
  if (index !== -1) {
    courses[index].progress = Math.min(100, Math.max(0, progress));
    if (courses[index].progress === 100 && !courses[index].completedAt) {
      courses[index].completedAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }
}

export function isEnrolledInCourse(courseId: string): boolean {
  const courses = getCourses();
  return courses.some(c => c.courseId === courseId);
}

// Coding Submissions
export function getSubmissions(): CodingSubmission[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  return safeParseJSON(data, []);
}

export function addSubmission(submission: Omit<CodingSubmission, 'id' | 'timestamp'>): CodingSubmission {
  const submissions = getSubmissions();
  const newSubmission: CodingSubmission = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  return newSubmission;
}

export function getSubmissionsByProblem(problemId: string): CodingSubmission[] {
  const submissions = getSubmissions();
  return submissions.filter(sub => sub.problemId === problemId).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getBestSubmission(problemId: string): CodingSubmission | null {
  const submissions = getSubmissionsByProblem(problemId);
  const passed = submissions.filter(s => s.passed);
  if (passed.length === 0) return null;
  
  // Return best by runtime
  return passed.sort((a, b) => (a.runtime || Infinity) - (b.runtime || Infinity))[0];
}

// Interviews
export function getInterviews(): Interview[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
  return safeParseJSON(data, []);
}

export function addInterview(interview: Omit<Interview, 'id'>): Interview {
  const interviews = getInterviews();
  const newInterview: Interview = {
    ...interview,
    id: `int_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
  interviews.push(newInterview);
  localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
  return newInterview;
}

export function updateInterview(interviewId: string, updates: Partial<Interview>): void {
  const interviews = getInterviews();
  const index = interviews.findIndex(i => i.id === interviewId);
  if (index !== -1) {
    interviews[index] = { ...interviews[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
  }
}

export function deleteInterview(interviewId: string): void {
  const interviews = getInterviews();
  const filtered = interviews.filter(i => i.id !== interviewId);
  localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(filtered));
}

export function getUpcomingInterviews(): Interview[] {
  const interviews = getInterviews();
  const now = new Date();
  return interviews
    .filter(i => i.type === 'upcoming' && new Date(i.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastInterviews(): Interview[] {
  const interviews = getInterviews();
  return interviews
    .filter(i => i.type === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// User Preferences
export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return { jobsViewMode: 'list', theme: 'light' };
  const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return safeParseJSON(data, { jobsViewMode: 'list', theme: 'light' });
}

export function updatePreferences(preferences: Partial<UserPreferences>): void {
  const current = getPreferences();
  const updated = { ...current, ...preferences };
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
}

// User Profile Extensions
export interface ExtendedUserProfile {
  bio?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export function getUserProfile(): ExtendedUserProfile {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return safeParseJSON(data, {});
}

export function updateUserProfile(profile: Partial<ExtendedUserProfile>): void {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
}

// Clear all data (for logout/reset)
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  // Note: User auth data (sb_user) is not in STORAGE_KEYS, so it's preserved
}

