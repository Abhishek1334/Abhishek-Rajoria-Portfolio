'use client';

import { Dialog } from '@headlessui/react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Star, Tag, Zap, Info, Image as ImageIcon, Play, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useState, useEffect, useCallback, memo } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
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
  } | null;
}

const ProjectModal = memo(({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech'>('overview');
  
  // Zoom functionality state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
      setActiveTab('overview');
      // Reset zoom state
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Back button handling for modal
  useEffect(() => {
    if (!isOpen) return;
    const handlePopState = (e: PopStateEvent) => {
      if (isOpen) {
        e.preventDefault?.();
        onClose();
      }
    };
    window.history.pushState({ modal: true }, '');
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Only go back if modal is still open (prevents double pop)
      if (window.history.state && window.history.state.modal) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev === 0 ? (project?.media?.length || 1) - 1 : prev - 1
    );
    // Reset zoom when changing slides
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [project?.media?.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev === (project?.media?.length || 1) - 1 ? 0 : prev + 1
    );
    // Reset zoom when changing slides
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [project?.media?.length]);

  // Zoom functionality handlers
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) {
      setIsZoomed(true);
      setZoomLevel(2);
    } else {
      // Toggle zoom level between 2x and 4x when already zoomed
      setZoomLevel(prev => prev >= 4 ? 2 : prev + 1);
    }
  }, [isZoomed]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
    setIsZoomed(true);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isZoomed && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  }, [isZoomed, zoomLevel, panPosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, isZoomed, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setZoomLevel(prev => {
      const newZoom = Math.max(1, Math.min(4, prev + delta));
      if (newZoom === 1) {
        setIsZoomed(false);
        setPanPosition({ x: 0, y: 0 });
      } else {
        setIsZoomed(true);
      }
      return newZoom;
    });
  }, []);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Info },
    { id: 'features' as const, label: 'Features', icon: Zap },
    { id: 'tech' as const, label: 'Tech Stack', icon: Tag },
  ];

  if (isMobile) {
    // Minimal mobile modal
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-1 overflow-y-auto">
          <div className="w-full max-w-md my-2">
            <Dialog.Panel className="glass-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-amber-500/10 border-b border-white/10">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-amber-500/20">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <Dialog.Title className="font-bold text-gradient-amber text-lg">{project.title}</Dialog.Title>
                      <p className="text-xs text-foreground-muted">{project.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-3 py-1.5 text-xs">
                        <ExternalLink className="w-4 h-4 mr-1" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost px-3 py-1.5 text-xs">
                        <Github className="w-4 h-4 mr-1" />
                      </a>
                    )}
                    <button onClick={onClose} className="rounded-xl p-2 hover:bg-red-500/20 transition-colors border border-white/10 group">
                      <X className="h-5 w-5 text-foreground-muted group-hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Image carousel */}
              <div className="relative h-56 bg-gradient-to-br from-amber-500/5 to-purple-500/5">
                {project.media && project.media.length > 0 && (
                  <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0">
                      {project.media[currentSlide].type === 'video' ? (
                        <div className="relative h-full flex items-center justify-center bg-black/20">
                          <video src={project.media[currentSlide].url} className="max-h-full max-w-full object-contain" controls preload="metadata" />
                        </div>
                      ) : (
                        <div className="relative h-full w-full overflow-hidden cursor-pointer">
                          <img
                            src={project.media[currentSlide].url}
                            alt={project.media[currentSlide].alt}
                            className="h-full w-full object-contain p-1 transition-transform duration-300"
                            draggable={false}
                          />
                        </div>
                      )}
                    </div>
                    {project.media.length > 1 && (
                      <>
                        <button onClick={handlePrevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 glass-card p-1.5 hover:bg-white/20 transition-colors z-10">
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button onClick={handleNextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 glass-card p-1.5 hover:bg-white/20 transition-colors z-10">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="p-4">
                <p className="text-sm text-foreground-muted mb-2 line-clamp-5">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-xs py-2 flex items-center justify-center gap-2">
                      <Github className="w-4 h-4" />Code
                    </a>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    );
  }

  // Desktop: full modal
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Simple Backdrop */}
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-7xl my-4 sm:my-8">
          <Dialog.Panel className="glass-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-amber-500/10 border-b border-white/10">
              <div className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-amber-500/20">
                    <Star className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl sm:text-2xl font-bold text-gradient-amber">
                      {project.title}
                    </Dialog.Title>
                    <p className="text-sm text-foreground-muted">{project.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Action Buttons */}
                  <div className="hidden sm:flex items-center gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-sm">
                        <ExternalLink className="w-4 h-4 mr-2" />Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2 text-sm">
                        <Github className="w-4 h-4 mr-2" />Code
                      </a>
                    )}
                  </div>
                  <button onClick={onClose} className="rounded-xl p-3 hover:bg-red-500/20 transition-colors border border-white/10 group">
                    <X className="h-5 w-5 text-foreground-muted group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
            {/* Content Layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-3">
              {/* Left Panel - Media Gallery */}
              <div className="lg:col-span-2 relative bg-black/5">
                <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-amber-500/5 to-purple-500/5">
                  {project.media && project.media.length > 0 && (
                    <div className="relative h-full overflow-hidden">
                      {/* Current Media */}
                      <div className="absolute inset-0">
                        {project.media[currentSlide].type === 'video' ? (
                          <div className="relative h-full flex items-center justify-center bg-black/20">
                            <video src={project.media[currentSlide].url} className="max-h-full max-w-full object-contain" controls preload="metadata" />
                          </div>
                        ) : (
                          <div className="relative h-full w-full overflow-hidden cursor-pointer" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel}>
                            <img
                              src={project.media[currentSlide].url}
                              alt={project.media[currentSlide].alt}
                              className={`h-full w-full object-contain p-2 sm:p-4 transition-transform duration-300 ${isZoomed ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? 'cursor-grabbing' : ''}`}
                              style={{ transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`, transformOrigin: 'center center' }}
                              onClick={handleImageClick}
                              draggable={false}
                            />
                          </div>
                        )}
                      </div>
                      {/* Navigation Controls */}
                      {project.media.length > 1 && (
                        <>
                          <button onClick={handlePrevSlide} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 glass-card p-2 sm:p-3 hover:bg-white/20 transition-colors z-10">
                            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </button>
                          <button onClick={handleNextSlide} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 glass-card p-2 sm:p-3 hover:bg-white/20 transition-colors z-10">
                            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </button>
                        </>
                      )}
                      {/* Zoom Controls */}
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2 z-10">
                        <button onClick={handleZoomIn} className="glass-card p-2 sm:p-3 hover:bg-white/20 transition-colors group" title="Zoom In">
                          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-amber-400 transition-colors" />
                        </button>
                        <button onClick={handleZoomOut} className="glass-card p-2 sm:p-3 hover:bg-white/20 transition-colors group" title="Zoom Out">
                          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-amber-400 transition-colors" />
                        </button>
                        {isZoomed && (
                          <button onClick={handleResetZoom} className="glass-card p-2 sm:p-3 hover:bg-white/20 transition-colors group" title="Reset Zoom">
                            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-amber-400 transition-colors" />
                          </button>
                        )}
                      </div>
                      {/* Media Info */}
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="glass-card px-2 sm:px-4 py-1 sm:py-2 bg-black/60">
                              <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                {project.media[currentSlide].type === 'video' ? (
                                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                                ) : (
                                  <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                <span className="hidden sm:inline">{project.media[currentSlide].alt || `Image ${currentSlide + 1}`}</span>
                              </div>
                            </div>
                            {/* Zoom Level Indicator */}
                            {isZoomed && (
                              <div className="glass-card px-2 sm:px-3 py-1 sm:py-2 bg-black/60">
                                <span className="text-amber-400 text-xs sm:text-sm font-medium">{Math.round(zoomLevel * 100)}%</span>
                              </div>
                            )}
                          </div>
                          {project.media.length > 1 && (
                            <div className="glass-card px-2 sm:px-3 py-1 sm:py-2 bg-black/60">
                              <span className="text-white text-xs sm:text-sm font-medium">{currentSlide + 1} / {project.media.length}</span>
                            </div>
                          )}
                        </div>
                        {/* Zoom Instructions - Hidden on mobile */}
                        {!isZoomed && project.media[currentSlide].type === 'image' && (
                          <div className="mt-2 hidden sm:flex justify-center">
                            <div className="glass-card px-3 py-1 bg-black/40">
                              <span className="text-white/70 text-xs">Click image to zoom • Use zoom controls to adjust</span>
                            </div>
                          </div>
                        )}
                        {isZoomed && (
                          <div className="mt-2 hidden sm:flex justify-center">
                            <div className="glass-card px-3 py-1 bg-black/40">
                              <span className="text-white/70 text-xs">Click to zoom more • Drag to pan • Use controls to adjust</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Right Panel - Project Details */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 bg-background-secondary/30">
                <div className="h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Tags */}
                    <div>
                      <h4 className="text-sm font-semibold text-amber-500 mb-3 flex items-center gap-2"><Tag className="w-4 h-4" />Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Tab Navigation */}
                    <div>
                      <div className="flex rounded-lg bg-black/20 p-1">
                        {tabs.map((tab) => (
                          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${activeTab === tab.id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-foreground-muted hover:text-foreground hover:bg-white/5'}`}>
                            <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Tab Content */}
                    <div className="space-y-4">
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gradient-purple mb-2">Project Overview</h4>
                            <p className="text-foreground-muted leading-relaxed text-sm">{project.detailedContent.overview}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-amber-500 mb-3">Key Highlights</h4>
                            <div className="space-y-2">
                              {project.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-foreground-muted">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === 'features' && (
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-gradient-purple mb-4">Features & Functionality</h4>
                          <div className="space-y-3">
                            {project.detailedContent.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-foreground-muted leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {activeTab === 'tech' && (
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-gradient-purple mb-4">Technology Stack</h4>
                          <div className="grid gap-3">
                            {project.detailedContent.techStack.map((tech, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/5 to-purple-500/5 border border-amber-500/20">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-purple-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-foreground">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
