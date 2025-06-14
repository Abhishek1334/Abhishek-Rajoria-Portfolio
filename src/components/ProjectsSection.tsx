'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Zap, TrendingUp } from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const projects = [
    {
      id: 1,
      title: 'Festify',
      subtitle: 'Local Event Aggregator Platform',
      description: 'A revolutionary event discovery platform that transforms how people find and attend local events. Features QR-code ticketing, real-time check-ins, and IoT integration for seamless event management.',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      tags: ['MERN Stack', 'QR Codes', 'IoT Integration', 'Real-time'],
      liveUrl: 'https://festify-tau.vercel.app/',
      githubUrl: 'https://github.com/abhishekrajoria/festify',
      stats: [
        { icon: Users, label: 'Active Users', value: '2.5K+' },
        { icon: Calendar, label: 'Events Created', value: '150+' },
        { icon: Zap, label: 'QR Scans', value: '5K+' }
      ],
      highlights: ['🎟️ Smart QR Ticketing', '📱 IoT Check-in System', '🔍 Advanced Event Search'],
      fullDescription: `# [🎉 Festify - Local Event Aggregator App](https://festify-tau.vercel.app/)

Live Site : [🎉 Festify](https://festify-tau.vercel.app/)

Festify is a **local event aggregator platform** where users can **discover, create, RSVP, and manage events**. It supports **QR code-based ticketing**, a complete **check-in system for organizers**, and a clean, modern user interface.

---

## 📋 Table of Contents

| Section | Description |
|---------|-------------|
| [🚀 Features](#-features) | Core functionality and capabilities |
| [🏗️ Tech Stack](#-tech-stack) | Technologies and frameworks used |
| [📦 Installation & Setup](#-installation--setup) | How to run the project locally |
| [✅ Completed Features](#-completed-features) | Detailed breakdown of implemented features |
| [🌍 Deployment](#-deployment) | Hosting platforms and services |
| [🎬 Video Demos](#-video-demos) | Live demonstrations of the app |
| [🖼️ Screenshots](#-screenshots) | Visual overview of the interface |
| [📡 API Documentation](#-api-documentation) | Complete API reference |
| [📌 Upcoming Features](#-upcoming-features) | Planned enhancements |
| [🤝 Contributing](#-contributing) | How to contribute to the project |
| [📬 Contact](#-contact) | Support and communication |

---

## 🚀 Features

- 🔐 **JWT Authentication** for secure login/signup
- 🗓️ **Event Management**: Create, Edit, Delete Events (Organizers)
- 🎟️ **Ticketing System** with **QR Code Generation**
- 📸 **Image Uploads** via **Multer + Cloudinary**
- 🔍 **Event Search & Filter** by category
- 📊 **Organizer Dashboard** with check-ins details
- ✅ **QR Code Scanner** using \`Html5Qrcode\` for attendee verification
- 🧾 **RSVP Management** in user profile

---

## 🏗️ Tech Stack

| Technology                | Purpose                            |
|---------------------------|-------------------------------------|
| **React.js + Vite + Context API**       | Frontend SPA                        |
| **Tailwind CSS**          | Modern UI Styling                   |
| **Node.js + Express.js**  | REST API Backend                    |
| **MongoDB + Mongoose**    | Cloud-based NoSQL Database          |
| **JWT & Bcrypt.js**       | Authentication & Security           |
| **Multer + Cloudinary**   | Image Upload & Storage              |
| **qrcode.react**          | QR Code Generation for Tickets      |
| **Html5Qrcode Scanner**   | QR Code Scanning for Check-ins      |

---

## 📦 Installation & Setup

\`\`\`bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/festify.git
cd festify

# 2️⃣ Install backend dependencies
cd backend
npm install

# 3️⃣ Install frontend dependencies
cd ../frontend
npm install

# 4️⃣ Configure environment variables
# Create a \`.env\` file in the backend directory and add:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Create a .env file in root directory and add:

VITE_API_URL = http://localhost/XXXX

# 5️⃣ Run the app

# Start the backend
cd backend
npm run dev

# Start the frontend
cd ../frontend
npm run dev
\`\`\`

---

## ✅ Completed Features

### 🔐 Authentication & Authorization
- JWT-based Auth
- Protected Routes

### 🎫 Event & Ticketing
- Event Creation & Editing (Organizers)
- QR Code Ticket Generation on RSVP
- RSVP Tracking in User Profile

### 📊 Organizer Tools
- Dashboard for Event & Attendee Management
- QR Code Scanner for Check-ins (\`Html5Qrcode\`)
- Manual Ticket ID Check-in Support

### 📸 Media Handling
- Event Image Uploads (Multer + Cloudinary)

---

## 🌍 Deployment

| Platform   | Purpose         |
|------------|-----------------|
| **Vercel** | Frontend Hosting |
| **Railway**| Backend Hosting  |
| **MongoDB Atlas** | Cloud Database |
| **Cloudinary** | Image Hosting |`
    },
    {
      id: 2,
      title: 'Market Pulse',
      subtitle: 'Real-time Stock Analytics Dashboard',
      description: 'A cutting-edge financial analytics platform that provides real-time market insights with beautiful visualizations. Features customizable charts, advanced filtering, and comprehensive stock analysis tools.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Chart.js', 'Financial APIs', 'Real-time Data'],
      liveUrl: 'https://market-pulse-two.vercel.app/',
      githubUrl: 'https://github.com/abhishekrajoria/market-pulse',
      stats: [
        { icon: TrendingUp, label: 'Stocks Tracked', value: '500+' },
        { icon: Zap, label: 'Real-time Updates', value: '24/7' },
        { icon: Users, label: 'Daily Users', value: '1.2K+' }
      ],
      highlights: ['📊 Real-time Charts', '🔍 Advanced Analytics', '🌍 Global Markets'],
      fullDescription: `# Market Pulse 📈

LIVE SITE: https://market-pulse-two.vercel.app/

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-007acc?style=for-the-badge&logo=zustand&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

> **Market Pulse** is a cutting-edge stock market analytics dashboard that empowers users with real-time market insights, beautiful data visualizations, and customizable analysis tools — all in a lightning-fast, responsive interface.

>Designed specifically for **traders, investors, and financial enthusiasts**, it provides dynamic, interactive charts with granular timeframe selections (1D, 1W, 1M, 3M, 1Y, ALL), allowing users to dive deep into stock performance over different periods.

>Users can effortlessly toggle between key metrics like **Open, Close, High, Low, Volume**, gaining full control over how they visualize and interpret stock movements. With a focus on speed, simplicity, and clarity, Market Pulse bridges the gap between raw financial data and actionable insights.

>Built with a modern, scalable tech stack **(React, Zustand, Chart.js, Tailwind CSS, Express, NodeJS)**, and powered by real-world stock APIs, it offers an experience that feels as sleek as it is powerful.

>Whether you're a day trader watching intraday trends, a long-term investor tracking performance, or a data nerd who loves beautiful charts — **Market Pulse** is built for you.

---

## 🚀 Features

- 📊 Real-time Stock Charting
- 📅 Customizable Timeframe Filters (1D, 1M, 1Y, ALL)
- 🔄 Toggle Metrics: Open, Close, High, Low, Volume
- 🧩 Modular & Scalable Component Architecture
- 🧠 Global State Management with Zustand
- 🧹 Optimized Data Fetching & Rate-Limiting
- 🗓️ Start/End Date Range Selector
- 🎨 Responsive, Mobile-Friendly Design
- 🌗 Light/Dark Mode

---

## 🛠️ Tech Stack

| Category         | Technologies                                                 |
| ---------------- | ------------------------------------------------------------- |
| **Frontend**     | React.js, Vite, Tailwind CSS                                  |
| **State Mgmt**   | Zustand, React Query                                           |
| **Charting**     | Chart.js                                                       |
| **APIs**         | Yahoo Finance API, Twelve Data   |
| **Backend**      | Node.js, Express.js, JWT (Authentication)                     |
| **Deployment**   | Vercel (Frontend), Railway (Backend)                   |`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
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

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient-purple">Projects</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              A showcase of digital solutions that don't just work—they inspire. 
              Each project represents hours of passion, innovation, and the relentless pursuit 
              of turning complex problems into elegant experiences.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-card-hover group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="p-8">
                  {/* Project Image */}
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient-amber transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-purple-400 font-medium text-sm">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-foreground-muted leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                          <div className="text-white font-bold text-sm">{stat.value}</div>
                          <div className="text-xs text-foreground-muted">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-white/5 text-foreground-muted rounded border border-white/10 hover:border-purple-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <motion.button
                        className="btn-primary flex-1 text-sm"
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Read More
                      </motion.button>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost p-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost p-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <p className="text-foreground-muted mb-6">
              Want to see more? Check out my GitHub for additional projects and experiments.
            </p>
            <motion.a
              href="https://github.com/abhishekrajoria"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 mr-2" />
              Explore All Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
