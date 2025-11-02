/**
 * Mock data for Scholar Bharat
 */

export type JobStatus = 'under_review' | 'verified' | 'live';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type ExperienceLevel = 'entry' | 'junior' | 'mid' | 'senior' | 'lead';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  experienceYears: number;
  salaryMin: number;
  salaryMax: number;
  techStack: string[];
  description: string;
  requirements: string[];
  status: JobStatus;
  featured: boolean;
  postedDate: string;
  applicants: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  enrolled: number;
  rating: number;
  price: number;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  logo: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
}

// Tech stacks
export const techStacks = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 
  'Django', 'FastAPI', 'Java', 'Spring Boot', 'Go', 'Rust',
  'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'Microservices'
];

// Locations
export const locations = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai',
  'Kolkata', 'Noida', 'Gurgaon', 'Remote', 'Hybrid'
];

// Jobs data
export const jobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    company: 'TechCorp India',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    location: 'Bangalore',
    type: 'full-time',
    experience: 'senior',
    experienceYears: 5,
    salaryMin: 2500000,
    salaryMax: 4000000,
    techStack: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    description: 'Looking for an experienced full stack developer to lead our product team.',
    requirements: [
      '5+ years of experience in full stack development',
      'Strong expertise in React and Node.js',
      'Experience with cloud platforms (AWS/Azure)',
      'Excellent problem-solving skills'
    ],
    status: 'live',
    featured: true,
    postedDate: '2025-10-28',
    applicants: 45
  },
  {
    id: 'job-2',
    title: 'Frontend Developer',
    company: 'StartupHub',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Mumbai',
    type: 'full-time',
    experience: 'mid',
    experienceYears: 3,
    salaryMin: 1200000,
    salaryMax: 1800000,
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'Join our fast-growing startup as a frontend developer.',
    requirements: [
      '3+ years of React experience',
      'Strong CSS and design skills',
      'Experience with Next.js',
      'Passion for user experience'
    ],
    status: 'live',
    featured: true,
    postedDate: '2025-10-26',
    applicants: 32
  },
  {
    id: 'job-3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    location: 'Hyderabad',
    type: 'full-time',
    experience: 'mid',
    experienceYears: 4,
    salaryMin: 1800000,
    salaryMax: 2500000,
    techStack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    description: 'Build scalable backend systems for our data platform.',
    requirements: [
      '4+ years of backend development',
      'Expert in Python and Django',
      'Experience with distributed systems',
      'Strong database design skills'
    ],
    status: 'verified',
    featured: false,
    postedDate: '2025-10-25',
    applicants: 28
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: 'CloudNative Tech',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    location: 'Pune',
    type: 'full-time',
    experience: 'senior',
    experienceYears: 6,
    salaryMin: 2200000,
    salaryMax: 3500000,
    techStack: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    description: 'Lead our DevOps transformation and cloud migration.',
    requirements: [
      '6+ years in DevOps',
      'Expert in Kubernetes and AWS',
      'Infrastructure as Code experience',
      'Strong automation skills'
    ],
    status: 'live',
    featured: true,
    postedDate: '2025-10-29',
    applicants: 18
  },
  {
    id: 'job-5',
    title: 'React Native Developer',
    company: 'MobileFirst',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop',
    location: 'Remote',
    type: 'full-time',
    experience: 'mid',
    experienceYears: 3,
    salaryMin: 1500000,
    salaryMax: 2200000,
    techStack: ['React Native', 'TypeScript', 'Redux', 'REST API'],
    description: 'Build amazing mobile experiences for millions of users.',
    requirements: [
      '3+ years of React Native',
      'Published apps on App Store/Play Store',
      'Strong understanding of mobile UX',
      'Experience with native modules'
    ],
    status: 'live',
    featured: false,
    postedDate: '2025-10-27',
    applicants: 41
  },
  {
    id: 'job-6',
    title: 'Data Scientist',
    company: 'AI Innovations',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    location: 'Bangalore',
    type: 'full-time',
    experience: 'senior',
    experienceYears: 5,
    salaryMin: 2800000,
    salaryMax: 4500000,
    techStack: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'AWS'],
    description: 'Drive ML/AI initiatives and build predictive models.',
    requirements: [
      '5+ years in data science',
      'Strong ML/DL background',
      'Experience with large datasets',
      'PhD or Masters preferred'
    ],
    status: 'verified',
    featured: true,
    postedDate: '2025-10-24',
    applicants: 22
  },
  {
    id: 'job-7',
    title: 'Junior Software Engineer',
    company: 'CodeCraft',
    logo: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=100&h=100&fit=crop',
    location: 'Chennai',
    type: 'full-time',
    experience: 'junior',
    experienceYears: 1,
    salaryMin: 600000,
    salaryMax: 900000,
    techStack: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    description: 'Start your career with a supportive team and mentorship.',
    requirements: [
      '0-2 years of experience',
      'Strong fundamentals in JavaScript',
      'Eagerness to learn',
      'Good communication skills'
    ],
    status: 'live',
    featured: false,
    postedDate: '2025-10-30',
    applicants: 67
  },
  {
    id: 'job-8',
    title: 'Lead Architect',
    company: 'Enterprise Solutions',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop',
    location: 'Gurgaon',
    type: 'full-time',
    experience: 'lead',
    experienceYears: 10,
    salaryMin: 5000000,
    salaryMax: 8000000,
    techStack: ['Microservices', 'Java', 'Spring Boot', 'AWS', 'Kubernetes'],
    description: 'Define technical strategy and lead architecture decisions.',
    requirements: [
      '10+ years of experience',
      'Proven track record in architecture',
      'Strong leadership skills',
      'Experience with enterprise systems'
    ],
    status: 'under_review',
    featured: false,
    postedDate: '2025-10-31',
    applicants: 12
  },
  {
    id: 'job-9',
    title: 'QA Automation Engineer',
    company: 'Quality First',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    location: 'Noida',
    type: 'full-time',
    experience: 'mid',
    experienceYears: 4,
    salaryMin: 1400000,
    salaryMax: 2000000,
    techStack: ['Selenium', 'Cypress', 'JavaScript', 'CI/CD', 'API Testing'],
    description: 'Build comprehensive test automation frameworks.',
    requirements: [
      '4+ years in QA automation',
      'Expert in Selenium/Cypress',
      'Strong scripting skills',
      'CI/CD pipeline experience'
    ],
    status: 'live',
    featured: false,
    postedDate: '2025-10-23',
    applicants: 19
  },
  {
    id: 'job-10',
    title: 'Product Manager - Tech',
    company: 'ProductCo',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
    location: 'Bangalore',
    type: 'full-time',
    experience: 'senior',
    experienceYears: 6,
    salaryMin: 3000000,
    salaryMax: 5000000,
    techStack: ['Product Management', 'Analytics', 'Agile', 'User Research'],
    description: 'Drive product strategy and roadmap for our flagship platform.',
    requirements: [
      '6+ years in product management',
      'Technical background preferred',
      'Strong analytical skills',
      'Experience with B2B SaaS'
    ],
    status: 'verified',
    featured: true,
    postedDate: '2025-10-22',
    applicants: 34
  }
];

// Courses data
export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Master System Design Interviews',
    description: 'Learn to design scalable systems and ace your technical interviews.',
    instructor: 'Rajesh Kumar',
    duration: '8 weeks',
    level: 'Advanced',
    enrolled: 1247,
    rating: 4.8,
    price: 4999,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    tags: ['System Design', 'Architecture', 'Interviews']
  },
  {
    id: 'course-2',
    title: 'React & Next.js Complete Guide',
    description: 'Build modern web applications with React and Next.js from scratch.',
    instructor: 'Priya Sharma',
    duration: '10 weeks',
    level: 'Intermediate',
    enrolled: 2134,
    rating: 4.9,
    price: 3999,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    tags: ['React', 'Next.js', 'Frontend']
  },
  {
    id: 'course-3',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA concepts and solve coding problems like a pro.',
    instructor: 'Amit Verma',
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    enrolled: 3421,
    rating: 4.7,
    price: 5999,
    image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=600&h=400&fit=crop',
    tags: ['DSA', 'Coding', 'Algorithms']
  },
  {
    id: 'course-4',
    title: 'DevOps Mastery',
    description: 'Learn CI/CD, Docker, Kubernetes, and cloud infrastructure.',
    instructor: 'Suresh Reddy',
    duration: '6 weeks',
    level: 'Intermediate',
    enrolled: 892,
    rating: 4.6,
    price: 4499,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    tags: ['DevOps', 'Cloud', 'Kubernetes']
  },
  {
    id: 'course-5',
    title: 'Behavioral Interview Prep',
    description: 'Perfect your soft skills and ace behavioral interviews.',
    instructor: 'Neha Gupta',
    duration: '4 weeks',
    level: 'All Levels',
    enrolled: 1567,
    rating: 4.9,
    price: 2999,
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop',
    tags: ['Interviews', 'Soft Skills', 'Career']
  },
  {
    id: 'course-6',
    title: 'Backend Development with Node.js',
    description: 'Build scalable backend systems with Node.js and Express.',
    instructor: 'Karan Singh',
    duration: '8 weeks',
    level: 'Intermediate',
    enrolled: 1789,
    rating: 4.7,
    price: 3499,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    tags: ['Backend', 'Node.js', 'APIs']
  }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikram Patel',
    role: 'Engineering Manager',
    company: 'TechGiant Inc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quote: 'Scholar Bharat saved us countless engineering hours. Their interview service is top-notch and candidates are pre-screened perfectly.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Ananya Krishnan',
    role: 'Senior Developer',
    company: 'StartupXYZ',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    quote: 'The AI mock interviews helped me identify my weak areas. I got placed at my dream company within 2 months!',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Rahul Mehta',
    role: 'CTO',
    company: 'InnovateLabs',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    quote: 'Finally, a hiring platform that understands technical recruitment. Our time-to-hire reduced by 60%.',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Sneha Iyer',
    role: 'Full Stack Developer',
    company: 'CloudTech',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    quote: 'The courses are practical and interview-focused. Got interview calls from 5 top companies after completing the system design course.',
    rating: 5
  },
  {
    id: 'test-5',
    name: 'Arjun Nair',
    role: 'VP Engineering',
    company: 'FinTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: 'Scholar Bharat is a game-changer. We can now focus on building products while they handle the screening.',
    rating: 5
  },
  {
    id: 'test-6',
    name: 'Divya Pillai',
    role: 'Software Engineer',
    company: 'DataCorp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    quote: 'Best platform for job seekers. Verified jobs, mock interviews, and courses - everything in one place!',
    rating: 5
  }
];

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    company: 'FinanceFlow',
    industry: 'FinTech',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop',
    challenge: 'Needed to hire 15 senior engineers in 3 months while maintaining quality.',
    solution: 'Used Scholar Bharat\'s AI screening and expert interview service.',
    results: [
      { metric: 'Time to Hire', value: '65% faster' },
      { metric: 'Engineering Time Saved', value: '200+ hours' },
      { metric: 'Quality Hires', value: '100% retention' }
    ]
  },
  {
    id: 'case-2',
    company: 'HealthTech Pro',
    industry: 'Healthcare',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
    challenge: 'Small team struggling with technical interviews and screening.',
    solution: 'Outsourced entire interview process to Scholar Bharat.',
    results: [
      { metric: 'Cost Reduction', value: '40% lower' },
      { metric: 'Candidate Quality', value: '90% match rate' },
      { metric: 'Team Bandwidth', value: '100% freed up' }
    ]
  },
  {
    id: 'case-3',
    company: 'EdTech Innovators',
    industry: 'Education',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop',
    challenge: 'High volume of applications with limited technical bandwidth.',
    solution: 'Implemented AI screening + on-demand expert interviews.',
    results: [
      { metric: 'Applications Processed', value: '500+ per month' },
      { metric: 'False Positives', value: '85% reduction' },
      { metric: 'Hiring Speed', value: '3x faster' }
    ]
  }
];

// Mock interview roles
export const mockInterviewRoles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Mobile Developer',
  'System Design',
  'Product Manager'
];

// Availability slots for interviewer signup
export const availabilitySlots = [
  'Weekday Mornings',
  'Weekday Evenings',
  'Weekend Mornings',
  'Weekend Evenings',
  'Flexible'
];

