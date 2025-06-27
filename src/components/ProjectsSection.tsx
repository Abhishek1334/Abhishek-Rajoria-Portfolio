'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState, useCallback, memo } from 'react';
import { ExternalLink, Github, Calendar, Users, Zap, TrendingUp, BarChart3, Target, Ticket, DollarSign, Home, Eye, Star, ArrowUpRight, Play, Image as ImageIcon } from 'lucide-react';
import ProjectModal from './ProjectModal';

// Import all media files
import festifyHomepage from '../Media/Festify/festify-homepage.png';
import festifyLoginpage from '../Media/Festify/festify-loginpage.png';
import festifySignuppage from '../Media/Festify/festify-signuppage.png';
import festifyEventspage from '../Media/Festify/festify-eventspage.png';
import festifyEventsdetailpage from '../Media/Festify/festify-eventsdetailpage.png';
import festifyEventidpage from '../Media/Festify/festify-eventidpage.png';
import festifyCreateeventpage from '../Media/Festify/festify-createeventpage.png';
import festifyCheckinpanelpage from '../Media/Festify/festify-checkinpanelpage.png';
import festifyUserprofile from '../Media/Festify/festify-userprofile.png';
import festifyUserprofile2 from '../Media/Festify/festify-userprofile-2.png';

import marketPulseHomepage from '../Media/MarketPulse/Homepage.png';
import marketPulseLoginPage from '../Media/MarketPulse/loginPage.png';
import marketPulseSignupPage from '../Media/MarketPulse/signupPage.png';
import marketPulseDashboardLight from '../Media/MarketPulse/DashboardLight.png';
import marketPulseDashboardDark from '../Media/MarketPulse/DashboardDark.png';
import marketPulseAnalyticsPageLight from '../Media/MarketPulse/AnalyticsPageLight.png';
import marketPulseAnalyticsPageDark from '../Media/MarketPulse/AnalyticsPageDark.png';
import marketPulseWatchlistPageLight from '../Media/MarketPulse/WatchlistPageLight.png';
import marketPulseWatchlistPageDark from '../Media/MarketPulse/WatchlistPageDark.png';

import stayFinderHomepage from '../Media/StayFinder/stayfinder-homepage.png';
import stayFinderDashboard from '../Media/StayFinder/stayfinder-dashboard.png';
import stayFinderMyListings from '../Media/StayFinder/stayfinder-mylistings.png';
import stayFinderExplore from '../Media/StayFinder/stayfinder-explore.png';
import stayFinderCreateListings from '../Media/StayFinder/stayfinder-createListings.png';
import stayFinderMyBookings from '../Media/StayFinder/stayfinder-mybookings.png';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  detailedContent: {
    overview: string;
    features: string[];
    techStack: string[];
    highlights: string[];
  };
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }[];
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const ProjectCard = memo(({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) => {
  const handleClick = useCallback(() => {
    onSelect(project);
  }, [project, onSelect]);

  return (
    <div
      className="group relative overflow-hidden glass-card-hover cursor-pointer transform transition-transform duration-200 hover:-translate-y-2"
      onClick={handleClick}
    >
      {/* Simple Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
          <Star className="w-3 h-3 text-amber-500" />
        </div>
      </div>

      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        
        {/* Simple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Media Counter */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
            <ImageIcon className="w-3 h-3" />
            <span>{project.media?.length || 1}</span>
          </div>
        </div>

        {/* Simple View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="btn-primary px-4 py-2 text-sm">
            <Eye className="w-4 h-4 mr-2" />
            View Project
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4 p-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gradient-amber">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-amber-500 transition-colors" />
          </div>
          <p className="text-foreground-muted text-sm font-medium">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Simple Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 6 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-foreground-muted border border-white/10">
              +{project.tags.length - 6}
            </span>
          )}
        </div>

        {/* Simple Highlights */}
        <div className="space-y-2">
          {project.highlights.slice(0, 3).map((highlight, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-sm text-foreground-muted"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-medium">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-sm py-2 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="inline w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm py-2 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="inline w-4 h-4 mr-2" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const projects: Project[] = [
    {
      id: 'stayfinder',
      title: 'StayFinder',
      subtitle: 'Airbnb-Inspired Property Booking Platform',
      description: 'StayFinder is a full-stack web application inspired by Airbnb, built as an internship assignment. It allows users to list, search, and book properties for short-term or long-term stays, demonstrating end-to-end development skills.',
      image: stayFinderHomepage,
      tags: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe', 'Vite'],
      liveUrl: 'https://stayfinder-eta.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/StayFinder',
      highlights: [
        'Property Search & Filters',
        'Booking System',
        'Host Dashboard',
        'Payment Integration',
        'Authentication System',
        'Responsive Design',
        'Property Management',
        'Modern UI/UX'
      ],
      detailedContent: {
        overview: 'StayFinder is a full-stack web application inspired by Airbnb, built as an internship assignment. It allows users to list, search, and book properties for short-term or long-term stays, demonstrating end-to-end development skills across frontend, backend, and database layers.',
        features: [
          'Property browsing with image galleries, location, and pricing',
          'Detailed property pages with descriptions, amenities, and availability calendar',
          'Advanced search and filtering by location, price range, and dates',
          'User authentication with registration and login validation',
          'Complete booking flow with date selection and confirmation',
          'User profile for managing bookings and reservations',
          'Host dashboard for property management',
          'CRUD operations for property listings',
          'Mock payment integration with Stripe',
          'Responsive design optimized for all devices',
          'RESTful API endpoints for all major operations',
          'Secure JWT-based authentication',
          'Modern UI inspired by Airbnb and contemporary design trends'
        ],
        techStack: [
          'React + TypeScript',
          'Redux Toolkit for state management',
          'Vite for fast development',
          'Tailwind CSS for styling',
          'Node.js + Express backend',
          'MongoDB with Mongoose ODM',
          'JWT authentication',
          'bcrypt for password security',
          'Stripe for payment processing',
          'Vercel for frontend deployment',
          'Render for backend hosting'
        ],
        highlights: [
          'Full-stack development with modern React and Node.js',
          'Type-safe development with TypeScript',
          'Scalable state management with Redux Toolkit',
          'Secure authentication with JWT and bcrypt',
          'Payment processing integration with Stripe',
          'Responsive, mobile-first design approach',
          'RESTful API design and implementation',
          'Database modeling and optimization',
          'Cloud deployment and hosting',
          'Modern UI/UX inspired by industry leaders'
        ]
      },
      media: [
        { type: 'image', url: stayFinderHomepage, alt: 'StayFinder Homepage' },
        { type: 'image', url: stayFinderDashboard, alt: 'Dashboard' },
        { type: 'image', url: stayFinderMyListings, alt: 'My Listings' },
        { type: 'image', url: stayFinderExplore, alt: 'Explore Properties' },
        { type: 'image', url: stayFinderCreateListings, alt: 'Create Listings' },
        { type: 'image', url: stayFinderMyBookings, alt: 'My Bookings' }
      ]
    },
    {
      id: 'festify',
      title: 'Festify',
      subtitle: 'Local Event Aggregator App',
      description: 'Festify is a local event aggregator platform where users can discover, create, RSVP, and manage events. It supports QR code-based ticketing, a complete check-in system for organizers, and a clean, modern user interface.',
      image: festifyHomepage,
      tags: ['React.js', 'Vite', 'Context API', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt.js', 'Multer', 'Cloudinary', 'qrcode.react', 'Html5Qrcode'],
      liveUrl: 'https://festify-tau.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/Festify',
      highlights: [
        'JWT Authentication',
        'Event Management',
        'QR Code Ticketing',
        'Organizer Dashboard',
        'RSVP Management',
        'Image Uploads',
        'Event Search & Filter',
        'QR Code Scanner',
        'Cloud-based NoSQL Database',
        'Modern UI/UX'
      ],
      detailedContent: {
        overview: 'Festify is a local event aggregator platform where users can discover, create, RSVP, and manage events. It supports QR code-based ticketing, a complete check-in system for organizers, and a clean, modern user interface.',
        features: [
          'JWT Authentication for secure login/signup',
          'Event Management: Create, Edit, Delete Events (Organizers)',
          'Ticketing System with QR Code Generation',
          'Image Uploads via Multer + Cloudinary',
          'Event Search & Filter by category',
          'Organizer Dashboard with check-ins details',
          'QR Code Scanner using Html5Qrcode for attendee verification',
          'RSVP Management in user profile',
          'Protected Routes',
          'Manual Ticket ID Check-in Support',
          'Event Image Uploads',
          'Cloud-based NoSQL Database',
          'Modern UI Styling with Tailwind CSS',
          'REST API Backend',
          'Frontend SPA',
          'Deployment on Vercel (Frontend), Railway (Backend), MongoDB Atlas (DB), Cloudinary (Images)'
        ],
        techStack: [
          'React.js + Vite + Context API',
          'Tailwind CSS',
          'Node.js + Express.js',
          'MongoDB + Mongoose',
          'JWT & Bcrypt.js',
          'Multer + Cloudinary',
          'qrcode.react',
          'Html5Qrcode Scanner'
        ],
        highlights: [
          'JWT-based Auth',
          'Protected Routes',
          'Event Creation & Editing (Organizers)',
          'QR Code Ticket Generation on RSVP',
          'RSVP Tracking in User Profile',
          'Dashboard for Event & Attendee Management',
          'QR Code Scanner for Check-ins (Html5Qrcode)',
          'Manual Ticket ID Check-in Support',
          'Event Image Uploads (Multer + Cloudinary)'
        ]
      },
      media: [
        { type: 'image', url: festifyHomepage, alt: 'Homepage' },
        { type: 'image', url: festifyLoginpage, alt: 'Login Page' },
        { type: 'image', url: festifySignuppage, alt: 'Signup Page' },
        { type: 'image', url: festifyEventspage, alt: 'Events Page' },
        { type: 'image', url: festifyEventsdetailpage, alt: 'Event Details' },
        { type: 'image', url: festifyEventidpage, alt: 'Single Event (Event ID)' },
        { type: 'image', url: festifyCreateeventpage, alt: 'Create Event' },
        { type: 'image', url: festifyCheckinpanelpage, alt: 'Check-in Panel' },
        { type: 'image', url: festifyUserprofile, alt: 'User Profile 1' },
        { type: 'image', url: festifyUserprofile2, alt: 'User Profile 2' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/85308566-21fa-486d-8124-13ad2575e04b', alt: 'Festify Walkthrough' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/c9fe9f42-945a-41ee-9662-485db62ea4b1', alt: 'QR Code Ticket Verification DEMO' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/f9a34c16-8557-4085-854f-82331d2da0bb', alt: 'RFID-Based Ticket Verification using ESP8266 and RFID READER 522 (IoT)' }
      ]
    },
    {
      id: 'marketpulse',
      title: 'Market Pulse',
      subtitle: 'Stock Market Analytics Dashboard',
      description: 'Market Pulse is a cutting-edge stock market analytics dashboard that empowers users with real-time market insights, beautiful data visualizations, and customizable analysis tools — all in a lightning-fast, responsive interface.',
      image: marketPulseHomepage,
      tags: ['React.js', 'Vite', 'Tailwind CSS', 'Zustand', 'Chart.js', 'React Query', 'Express', 'Node.js'],
      liveUrl: 'https://market-pulse-two.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/MarketPulse',
      highlights: [
        'Real-time Stock Charting',
        'Customizable Timeframe Filters',
        'Toggle Metrics: Open, Close, High, Low, Volume',
        'Modular & Scalable Component Architecture',
        'Global State Management with Zustand',
        'Optimized Data Fetching & Rate-Limiting',
        'Responsive, Mobile-Friendly Design',
        'Light/Dark Mode'
      ],
      detailedContent: {
        overview: 'Market Pulse is a cutting-edge stock market analytics dashboard that empowers users with real-time market insights, beautiful data visualizations, and customizable analysis tools — all in a lightning-fast, responsive interface.',
        features: [
          'Real-time Stock Charting',
          'Customizable Timeframe Filters (1D, 1M, 1Y, ALL)',
          'Toggle Metrics: Open, Close, High, Low, Volume',
          'Modular & Scalable Component Architecture',
          'Global State Management with Zustand',
          'Optimized Data Fetching & Rate-Limiting',
          'Start/End Date Range Selector',
          'Responsive, Mobile-Friendly Design',
          'Light/Dark Mode',
          'Yahoo Finance API, Twelve Data',
          'Express, Node.js, JWT (Authentication)',
          'Deployed on Vercel (Frontend), Railway (Backend)'
        ],
        techStack: [
          'React.js',
          'Vite',
          'Tailwind CSS',
          'Zustand',
          'Chart.js',
          'React Query',
          'Express',
          'Node.js',
          'Yahoo Finance API',
          'Twelve Data'
        ],
        highlights: [
          'Real-time Stock Charting',
          'Customizable Timeframe Filters',
          'Toggle Metrics: Open, Close, High, Low, Volume',
          'Global State Management with Zustand',
          'Optimized Data Fetching & Rate-Limiting',
          'Responsive, Mobile-Friendly Design',
          'Light/Dark Mode'
        ]
      },
      media: [
        { type: 'image', url: marketPulseHomepage, alt: 'Homepage' },
        { type: 'image', url: marketPulseLoginPage, alt: 'Login Page' },
        { type: 'image', url: marketPulseSignupPage, alt: 'Signup Page' },
        { type: 'image', url: marketPulseDashboardLight, alt: 'Dashboard (Light Mode)' },
        { type: 'image', url: marketPulseDashboardDark, alt: 'Dashboard (Dark Mode)' },
        { type: 'image', url: marketPulseAnalyticsPageLight, alt: 'Analytics Page (Light Mode)' },
        { type: 'image', url: marketPulseAnalyticsPageDark, alt: 'Analytics Page (Dark Mode)' },
        { type: 'image', url: marketPulseWatchlistPageLight, alt: 'Watchlist Page (Light Mode)' },
        { type: 'image', url: marketPulseWatchlistPageDark, alt: 'Watchlist Page (Dark Mode)' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="projects" className="py-12 sm:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore some of my recent work, showcasing my expertise in full-stack development,
              UI/UX design, and innovative problem-solving.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleProjectSelect}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleModalClose}
        project={selectedProject}
      />
    </section>
  );
};

export default memo(ProjectsSection);
