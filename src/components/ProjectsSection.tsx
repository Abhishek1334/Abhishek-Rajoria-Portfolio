'use client';

import { motion, Variants } from 'framer-motion';
import { useEffect, useState, useCallback, memo } from 'react';
import { ExternalLink, Github, Calendar, Users, Zap, TrendingUp, BarChart3, Target, Ticket, DollarSign, Home, Eye, Star, ArrowUpRight, Play, Image as ImageIcon } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { useIsMobile } from '../hooks/use-mobile';

// Import all media files
import festifyHomepage from '../Media/Festify/festify-homepage.png';
import festifyLoginpage from '../Media/Festify/festify-loginpage.png';
import festifySignuppage from '../Media/Festify/festify-signuppage.png';
import festifyEventspage from '../Media/Festify/festify-eventspage.png';
import festifyEventidpage from '../Media/Festify/festify-eventidpage.png';
import festifyCreateeventpage from '../Media/Festify/festify-createeventpage.png';
import festifyUserprofile from '../Media/Festify/festify-userprofile.png';

// MarketPulse imports - Only use images that exist in src/Media/MarketPulse
import marketPulseHomepageLight from '../Media/MarketPulse/Homepage_Light.png';
import marketPulseHomepageDark from '../Media/MarketPulse/Homapage_Dark.png';
import marketPulseAssistantLight from '../Media/MarketPulse/Assistant_Light.png';
import marketPulseAssistantDark from '../Media/MarketPulse/Assistant_Dark.png';
import marketPulseLoginLight from '../Media/MarketPulse/Login_Light.png';
import marketPulseLoginDark from '../Media/MarketPulse/Login_Dark.png';
import marketPulseSignupLight from '../Media/MarketPulse/SignUp_Light.png';
import marketPulseSignupDark from '../Media/MarketPulse/SignUp_Dark.png';
import marketPulseDashboardLight from '../Media/MarketPulse/Dashboard_Light.png';
import marketPulseDashboardDark from '../Media/MarketPulse/Dashboard_Dark.png';
import marketPulseAnalytics1Light from '../Media/MarketPulse/Analytics1_Light.png';
import marketPulseAnalytics1Dark from '../Media/MarketPulse/Analytics1_Dark.png';
import marketPulseAnalytics2Light from '../Media/MarketPulse/Analytics2_Light.png';
import marketPulseAnalytics2Dark from '../Media/MarketPulse/Analytics2_Dark.png';
import marketPulseWatchlistLight from '../Media/MarketPulse/Watchlist_Light.png';
import marketPulseWatchlistDark from '../Media/MarketPulse/Watchlist_Dark.png';
import marketPulsePortfolio1Light from '../Media/MarketPulse/Portfolio1_Light.png';
import marketPulsePortfolio1Dark from '../Media/MarketPulse/Portfolio1_Dark.png';
import marketPulsePortfolio2Light from '../Media/MarketPulse/Portfolio2_Light.png';
import marketPulsePortfolio2Dark from '../Media/MarketPulse/Portfolio2_Dark.png';

import stayFinderHomeHero from '../Media/StayFinder/01-home-hero.png';
import stayFinderHomeFull from '../Media/StayFinder/02-home-full.png';
import stayFinderListings from '../Media/StayFinder/03-listings.png';
import stayFinderListingDetail from '../Media/StayFinder/04-listing-detail.png';
import stayFinderLogin from '../Media/StayFinder/05-login.png';
import stayFinderRegister from '../Media/StayFinder/06-register.png';
import stayFinderBookings from '../Media/StayFinder/07-bookings.png';
import stayFinderDashboard from '../Media/StayFinder/08-dashboard.png';
import stayFinderCreateListing from '../Media/StayFinder/09-create-listing.png';

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
            <h3 className="text-xl font-heading font-bold text-gradient-amber">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-amber-500 transition-colors" />
          </div>
          <p className="text-foreground-muted text-sm font-body font-medium">{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2 font-body">
          {project.description}
        </p>

        {/* Simple Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 6).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-body font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 6 && (
            <span className="px-3 py-1 text-xs font-body font-medium rounded-full bg-white/5 text-foreground-muted border border-white/10">
              +{project.tags.length - 6}
            </span>
          )}
        </div>

        {/* Simple Highlights */}
        <div className="space-y-2">
          {project.highlights.slice(0, 3).map((highlight, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-sm text-foreground-muted font-body"
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
              className="flex-1 btn-primary text-sm py-2 text-center font-body"
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
              className="btn-ghost text-sm py-2 px-4 font-body"
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
  const isMobile = useIsMobile();

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
      id: 'festify',
      title: 'Festify',
      subtitle: 'IoT-Enabled Event Ticketing Platform',
      description: 'Full-stack event platform with dual-mode check-in — ESP8266 + RC522 RFID hardware and an html5-qrcode browser scanner feeding the same Express controller. Solo build, deployed end-to-end.',
      image: festifyEventspage,
      tags: ['React 19', 'Vite', 'Tailwind CSS', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary', 'TanStack Query', 'ESP8266/RC522', 'html5-qrcode'],
      liveUrl: 'https://festify-tau.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/festify',
      highlights: [
        'Dual-mode QR + RFID check-in',
        'httpOnly cookie + Bearer auth',
        'Single Vercel SPA + Express',
        'Serverless Mongoose connection reuse',
        'TanStack Query across 11 pages'
      ],
      detailedContent: {
        overview: 'Full-stack event platform with dual-mode check-in — ESP8266 + RC522 RFID hardware and an html5-qrcode browser scanner feeding the same Express controller. Solo build, deployed end-to-end on Vercel.',
        features: [
          'Dual-mode check-in: same /api/tickets/verify handles QR browser scans and ESP8266 RFID UID taps; binding established at ticket-issue time.',
          'Migrated auth from localStorage JWT to httpOnly cookie + Bearer fallback; same-origin Vercel deploy eliminates CORS preflight; middleware reads cookie first then header.',
          'Vite SPA + Express as single Vercel project; Mongoose connection cached on global._mongoose for serverless warm-reuse; standardized 11 pages on TanStack Query (~200 LOC removed).'
        ],
        techStack: [
          'React 19',
          'Vite',
          'Tailwind CSS',
          'Express',
          'MongoDB',
          'Mongoose',
          'JWT (cookie + Bearer)',
          'Cloudinary',
          'TanStack Query',
          'ESP8266 / RC522',
          'html5-qrcode'
        ],
        highlights: [
          'Dual-mode check-in: same /api/tickets/verify handles QR browser scans and ESP8266 RFID UID taps; binding established at ticket-issue time.',
          'Migrated auth from localStorage JWT to httpOnly cookie + Bearer fallback; same-origin Vercel deploy eliminates CORS preflight; middleware reads cookie first then header.',
          'Vite SPA + Express as single Vercel project; Mongoose connection cached on global._mongoose for serverless warm-reuse; standardized 11 pages on TanStack Query (~200 LOC removed).'
        ]
      },
      media: [
        { type: 'image', url: festifyHomepage, alt: 'Homepage' },
        { type: 'image', url: festifyLoginpage, alt: 'Login Page' },
        { type: 'image', url: festifySignuppage, alt: 'Signup Page' },
        { type: 'image', url: festifyEventspage, alt: 'Events Page' },
        { type: 'image', url: festifyEventidpage, alt: 'Single Event (Event ID)' },
        { type: 'image', url: festifyCreateeventpage, alt: 'Create Event' },
        { type: 'image', url: festifyUserprofile, alt: 'User Profile' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/85308566-21fa-486d-8124-13ad2575e04b', alt: 'Festify Walkthrough' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/c9fe9f42-945a-41ee-9662-485db62ea4b1', alt: 'QR Code Ticket Verification DEMO' },
        { type: 'video', url: 'https://github.com/user-attachments/assets/f9a34c16-8557-4085-854f-82331d2da0bb', alt: 'RFID-Based Ticket Verification using ESP8266 and RFID READER 522 (IoT)' }
      ]
    },
    {
      id: 'marketpulse',
      title: 'MarketPulse',
      subtitle: 'Stock Analytics SPA with AI Assistant',
      description: 'Real-time stock-tracking SPA with watchlists, live-price portfolio, technical-indicator charts, and a Gemini-powered AI assistant grounded in the user\'s actual portfolio data via tool-calling.',
      image: marketPulseHomepageLight,
      tags: ['React 19', 'Zustand', 'TanStack Query', 'Vite', 'Tailwind CSS', 'Express 5', 'MongoDB', 'Vercel AI SDK', 'Google Gemini 2.5 Flash', 'Chart.js', 'Twelve Data API'],
      liveUrl: 'https://market-pulse-two.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/MarketPulse',
      highlights: [
        'Gemini AI assistant with 3 tools',
        'Streaming inline tool-call chips',
        'Single Vercel Function deploy',
        'LRU cache extends quota ~10×',
        'OKLCH light/dark theming'
      ],
      detailedContent: {
        overview: 'Real-time stock-tracking SPA with watchlists, live-price portfolio, technical-indicator charts, and a Gemini-powered AI assistant grounded in the user\'s actual portfolio data via tool-calling.',
        features: [
          'AI assistant on Vercel AI SDK + Gemini 2.5 Flash with 3 tools (getPortfolioSummary, getStockQuote, searchSymbol); streaming responses with tool-call chips surfaced inline so agent actions are inspectable.',
          'React 19 SPA + Express 5 deployed as a single Vercel Function via custom path rewrite; server-side LRU cache with namespace TTLs (60s quotes / 5min charts / 1h search) extended free Twelve Data quota ~10×.',
          'OKLCH-based amber accent unified across light/dark modes; cache hit-rate exposed at /api/stock/_cache-stats; sub-second cold start on Vercel Fluid Compute.'
        ],
        techStack: [
          'React 19',
          'Zustand',
          'TanStack Query',
          'Vite',
          'Tailwind CSS',
          'Express 5',
          'MongoDB',
          'Vercel AI SDK',
          'Google Gemini 2.5 Flash',
          'Chart.js',
          'Twelve Data API'
        ],
        highlights: [
          'AI assistant on Vercel AI SDK + Gemini 2.5 Flash with 3 tools (getPortfolioSummary, getStockQuote, searchSymbol); streaming responses with tool-call chips surfaced inline so agent actions are inspectable.',
          'React 19 SPA + Express 5 deployed as a single Vercel Function via custom path rewrite; server-side LRU cache with namespace TTLs (60s quotes / 5min charts / 1h search) extended free Twelve Data quota ~10×.',
          'OKLCH-based amber accent unified across light/dark modes; cache hit-rate exposed at /api/stock/_cache-stats; sub-second cold start on Vercel Fluid Compute.'
        ]
      },
      media: [
        { type: 'image', url: marketPulseHomepageLight, alt: 'Homepage (Light Mode)' },
        { type: 'image', url: marketPulseHomepageDark, alt: 'Homepage (Dark Mode)' },
        { type: 'image', url: marketPulseAssistantLight, alt: 'AI Assistant (Light Mode)' },
        { type: 'image', url: marketPulseAssistantDark, alt: 'AI Assistant (Dark Mode)' },
        { type: 'image', url: marketPulseLoginLight, alt: 'Login Page (Light Mode)' },
        { type: 'image', url: marketPulseLoginDark, alt: 'Login Page (Dark Mode)' },
        { type: 'image', url: marketPulseSignupLight, alt: 'Signup Page (Light Mode)' },
        { type: 'image', url: marketPulseSignupDark, alt: 'Signup Page (Dark Mode)' },
        { type: 'image', url: marketPulseDashboardLight, alt: 'Dashboard (Light Mode)' },
        { type: 'image', url: marketPulseDashboardDark, alt: 'Dashboard (Dark Mode)' },
        { type: 'image', url: marketPulseAnalytics1Light, alt: 'Analytics 1 (Light)' },
        { type: 'image', url: marketPulseAnalytics1Dark, alt: 'Analytics 1 (Dark)' },
        { type: 'image', url: marketPulseAnalytics2Light, alt: 'Analytics 2 (Light)' },
        { type: 'image', url: marketPulseAnalytics2Dark, alt: 'Analytics 2 (Dark)' },
        { type: 'image', url: marketPulseWatchlistLight, alt: 'Watchlist (Light)' },
        { type: 'image', url: marketPulseWatchlistDark, alt: 'Watchlist (Dark)' },
        { type: 'image', url: marketPulsePortfolio1Light, alt: 'Portfolio 1 (Light)' },
        { type: 'image', url: marketPulsePortfolio1Dark, alt: 'Portfolio 1 (Dark)' },
        { type: 'image', url: marketPulsePortfolio2Light, alt: 'Portfolio 2 (Light)' },
        { type: 'image', url: marketPulsePortfolio2Dark, alt: 'Portfolio 2 (Dark)' }
      ]
    },
    {
      id: 'stayfinder',
      title: 'StayFinder',
      subtitle: 'Editorial Property Booking Marketplace',
      description: 'Full-stack property booking platform — listings, search/filter, calendar-aware bookings, Stripe Checkout with signed webhooks. Functionally Airbnb-shaped; visually a magazine.',
      image: stayFinderHomeHero,
      tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Express', 'MongoDB', 'Stripe', 'Cloudinary', 'Framer Motion'],
      liveUrl: 'https://stayfinder-eta.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/stayfinder',
      highlights: [
        'End-to-end Stripe Checkout',
        'Signed, idempotent webhooks',
        'Race-safe Mongoose bookings',
        'Role-based guest/host/admin dashboards',
        'Editorial shadcn/ui design system'
      ],
      detailedContent: {
        overview: 'Full-stack property booking platform — listings, search/filter, calendar-aware bookings, Stripe Checkout with signed webhooks. Functionally Airbnb-shaped; visually a magazine.',
        features: [
          'End-to-end Stripe Checkout: webhook route registered with express.raw() before body parsers so signed payloads verify; idempotent on session.id to survive Stripe retries; race-safe booking via Mongoose transactions with date-overlap detection.',
          'Role-based dashboards (guest/host/admin); auto-promotes guest to host on first listing; API hardened with Helmet, compression, per-route rate limiting, httpOnly cookie JWT, TypeScript throughout.',
          '10-component editorial design system on shadcn/ui primitives — Fraunces serif headings, OKLCH color tokens, prefers-reduced-motion-aware animations.'
        ],
        techStack: [
          'React 18 + TypeScript',
          'Vite',
          'Tailwind CSS',
          'shadcn/ui',
          'TanStack Query',
          'Express + TypeScript',
          'MongoDB',
          'Stripe',
          'Cloudinary',
          'Framer Motion'
        ],
        highlights: [
          'End-to-end Stripe Checkout: webhook route registered with express.raw() before body parsers so signed payloads verify; idempotent on session.id to survive Stripe retries; race-safe booking via Mongoose transactions with date-overlap detection.',
          'Role-based dashboards (guest/host/admin); auto-promotes guest to host on first listing; API hardened with Helmet, compression, per-route rate limiting, httpOnly cookie JWT, TypeScript throughout.',
          '10-component editorial design system on shadcn/ui primitives — Fraunces serif headings, OKLCH color tokens, prefers-reduced-motion-aware animations.'
        ]
      },
      media: [
        { type: 'image', url: stayFinderHomeHero, alt: 'Home — Hero' },
        { type: 'image', url: stayFinderHomeFull, alt: 'Homepage' },
        { type: 'image', url: stayFinderListings, alt: 'Listings' },
        { type: 'image', url: stayFinderListingDetail, alt: 'Listing Detail' },
        { type: 'image', url: stayFinderLogin, alt: 'Login' },
        { type: 'image', url: stayFinderRegister, alt: 'Register' },
        { type: 'image', url: stayFinderBookings, alt: 'My Bookings' },
        { type: 'image', url: stayFinderDashboard, alt: 'Host Dashboard' },
        { type: 'image', url: stayFinderCreateListing, alt: 'Create Listing' }
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
    <section id="projects" className="py-8 sm:py-12 relative overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-6 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-base">
              Explore some of my recent work, showcasing my expertise in full-stack development, UI/UX design, and innovative problem-solving.
            </p>
          </motion.div>

          {/* Minimal Mobile List */}
          {isMobile ? (
            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-white/5 border border-white/10 shadow-sm flex items-center gap-3 p-2"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate text-gradient-amber">{project.title}</h3>
                    <p className="text-xs text-foreground-muted truncate">{project.subtitle}</p>
                  </div>
                  <button className="btn-primary px-3 py-1 text-xs rounded-lg">View</button>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </motion.div>
      </div>
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleModalClose}
        project={selectedProject}
      />
    </section>
  );
};

export default memo(ProjectsSection);
