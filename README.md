# Scholar Bharat - Technical Hiring Platform

A modern, dual-audience (B2B recruiters + D2C candidates) website built with Next.js, featuring AI-powered screening, expert interviews, and comprehensive job search capabilities.

## 🎯 Features

### For Recruiters (B2B)
- **AI-Powered Screening**: Automated resume matching and candidate filtering
- **Interview as a Service**: On-demand expert interviewers with detailed reports
- **Analytics Dashboard**: Track hiring metrics and candidate performance
- **Job Posting**: Post jobs with automated verification (within 24 hours)

### For Candidates (D2C)
- **Job Search**: Browse 1000+ verified job openings with advanced filters
- **AI Mock Interviews**: Practice with AI and get instant feedback
- **Courses**: Interview-focused courses to boost skills
- **Persistent Drawer UI**: Quick access to jobs, courses, and mock interviews

### For Interviewers
- **Join as Expert**: Application portal for experienced professionals
- **Flexible Schedule**: Choose your own interview slots
- **Competitive Pay**: ₹2,000 - ₹5,000 per interview

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
/Users/mmt9153/PycharmProjects/NewUI/
├── app/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   ├── jobs/
│   │   └── page.tsx            # Jobs listing page
│   ├── join-interviewer/
│   │   └── page.tsx            # Interviewer signup
│   ├── request-demo/
│   │   └── page.tsx            # Demo request form
│   └── post-job/
│       └── page.tsx            # Job posting form
├── components/
│   ├── Header.tsx              # Sticky navigation
│   ├── Footer.tsx              # Footer with links
│   ├── CandidateDrawer.tsx     # Slide-in drawer with tabs
│   ├── Button.tsx              # Reusable button component
│   ├── Input.tsx               # Form input component
│   ├── Card.tsx                # Card component
│   ├── Badge.tsx               # Status badges
│   ├── Modal.tsx               # Modal dialog
│   ├── Tabs.tsx                # Tab navigation
│   ├── JobCard.tsx             # Job listing card
│   └── ScrollReveal.tsx        # Scroll animation wrapper
├── context/
│   ├── AuthContext.tsx         # Mock authentication
│   └── DrawerContext.tsx       # Drawer state management
├── lib/
│   ├── colors.ts               # Color scheme & design tokens
│   ├── utils.ts                # Utility functions
│   └── mockData.ts             # Mock data (jobs, courses, etc.)
└── package.json
```

## 🎨 Design System

### Colors
- **Navy**: Primary brand color (`#1E40AF`, `#1E3A8A`)
- **Sky**: Accent color (`#0EA5E9`, `#38BDF8`)
- **Off-white**: Background (`#F8FAFC`, `#F1F5F9`)

### Components
All components support:
- Responsive design (mobile-first)
- Dark mode ready
- Accessibility (ARIA labels, keyboard navigation)
- Reduced motion support

## 🔑 Key Pages

### Homepage (`/`)
- Dual magnetic hero (recruiters + candidates)
- Products section (AI Screen, Interview Service, Insights)
- How it works workflow
- Testimonials & case studies
- Final CTA

### Jobs Page (`/jobs`)
- Advanced filtering (location, tech stack, experience, type)
- Search functionality
- Job status badges (verified, live, under review)
- Featured jobs
- Deep link support: `/jobs?drawer=open`

### Join Interviewer (`/join-interviewer`)
- Application form with tech stack selection
- Availability preferences
- Requirements and benefits

### Request Demo (`/request-demo`)
- Demo scheduling form
- Feature highlights
- Company statistics

### Post Job (`/post-job`)
- Comprehensive job posting form
- Tech stack multi-select
- 24-hour verification notice
- Success modal with status

## 🎯 Candidate Drawer

The persistent drawer is accessible from:
- Header "Jobs" button
- Homepage hero CTA
- Footer links
- Deep links: `?drawer=open&tab=jobs|courses|mock-interview`

### Tabs:
1. **Jobs**: Search, filters, featured jobs, quick apply
2. **Courses**: Highlighted courses with enrollment
3. **AI Mock Interview**: Role selection, process preview

## ♿ Accessibility

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation (Tab, Esc, Enter)
- Focus management in modals/drawers
- `prefers-reduced-motion` support
- Alt text on all images

## 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Features:
- Mobile hamburger menu
- Full-screen drawer on mobile
- Stacked layouts on smaller screens
- Touch-friendly tap targets

## 🔄 Mock Data

The application uses comprehensive mock data including:
- 10+ sample jobs with various states
- 6 courses
- 6 testimonials
- 3 case studies
- Tech stacks, locations, and role types

## 🚧 Development

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 Notes

- All jobs are verified within 24 hours before going live
- Mock authentication stored in localStorage
- Images from Unsplash (placeholder)
- Deep linking supported for drawer state
- Smooth scroll for anchor links

## 🎉 Features Implemented

✅ Dual-audience homepage (B2B + D2C)  
✅ Sticky header with navigation  
✅ Persistent candidate drawer with 3 tabs  
✅ Jobs page with advanced filtering  
✅ Join interviewer application  
✅ Request demo form  
✅ Post job form with verification  
✅ Testimonials carousel  
✅ Case studies  
✅ Scroll reveal animations  
✅ Mobile responsive  
✅ Accessibility support  
✅ Mock authentication  
✅ Form validation  
✅ Success modals  
✅ Loading states  

## 📄 License

ISC

## 👥 Author

Scholar Bharat Team
