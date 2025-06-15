'use client';

import { Dialog } from '@headlessui/react';
import { X, Globe, Github, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useEffect, useCallback, memo, useMemo, useRef } from 'react';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import type { Slide } from 'yet-another-react-lightbox';

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

const MediaItem = memo(({ slide, onClick }: { slide: { type: 'image' | 'video'; url: string; alt?: string }; onClick: () => void }) => (
  <div
    className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer group"
    onClick={onClick}
  >
    {slide.type === 'video' ? (
      <video
        src={slide.url}
        className="h-full w-full object-cover"
        preload="none"
      />
    ) : (
      <img
        src={slide.url}
        alt={slide.alt}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    )}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
  </div>
));

MediaItem.displayName = 'MediaItem';

const ProjectModal = memo(({ isOpen, onClose, project }: ProjectModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setScale(prevScale => {
      const newScale = Math.max(1, Math.min(5, prevScale + delta));
      return newScale;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta);
    }
  }, [handleZoom]);

  const handleClick = useCallback(() => {
    setScale(prevScale => prevScale === 1 ? 2.5 : 1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      if (imageRef.current && containerRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const maxX = (imageRect.width * scale - containerRect.width) / 2;
        const maxY = project?.title === 'Festify' 
          ? imageRect.height * scale - containerRect.height
          : (imageRect.height * scale - containerRect.height) / 2;
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        });
      }
    }
  }, [isDragging, scale, dragStart, project?.title]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((currentSlide - 1 + project?.media?.length || 0) % (project?.media?.length || 1));
    handleReset();
  }, [currentSlide, project, handleReset]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((currentSlide + 1) % (project?.media?.length || 1));
    handleReset();
  }, [currentSlide, project, handleReset]);

  const slides = useMemo(() => {
    if (!project?.media) return [];
    return project.media.map(item => ({
      type: item.type === 'video' ? 'video' : 'image',
      src: item.url,
      alt: item.alt || project.title,
      sources: item.type === 'video' ? [{ src: item.url, type: 'video/mp4' }] : undefined
    })) as Slide[];
  }, [project]);

  if (!isOpen || !project || !isMounted) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <Dialog.Panel className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg bg-background shadow-xl">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex items-center justify-between p-4 sm:p-6">
              <Dialog.Title className="text-xl sm:text-2xl font-bold">
                {project.title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Media Preview Section */}
            <div className="relative w-full h-[50vh] overflow-hidden bg-black/5">
              <div className="absolute inset-0 flex items-start justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-start justify-center overflow-auto">
                    {project.media.map((item, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.type === 'image' ? (
                          <div 
                            ref={containerRef}
                            className="w-full h-full flex items-start justify-center"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                          >
                            <div className="relative w-full h-full flex items-start justify-center">
                              <div className={`relative ${
                                project?.title === 'Festify' 
                                  ? 'w-[800px] min-h-[1000px]' 
                                  : 'w-full h-full'
                              }`}>
                                <img
                                  ref={imageRef}
                                  src={item.url}
                                  alt={`${project?.title || 'Project'} preview ${index + 1}`}
                                  className="w-full h-auto transition-transform duration-200 cursor-zoom-in"
                                  style={{
                                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                    cursor: scale > 1 ? 'grab' : 'zoom-in',
                                    transformOrigin: 'top center',
                                    objectFit: project?.title === 'Festify' ? 'cover' : 'contain',
                                    objectPosition: 'top',
                                  }}
                                  onClick={handleClick}
                                  loading="lazy"
                                  decoding="async"
                                />
                                {scale > 1 && (
                                  <div className="fixed bottom-4 right-4 flex gap-2 bg-black/50 p-2 rounded-lg z-50">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoom(-0.1);
                                      }}
                                      className="p-1 text-white hover:bg-white/20 rounded"
                                      aria-label="Zoom out"
                                    >
                                      <ZoomOut className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoom(0.1);
                                      }}
                                      className="p-1 text-white hover:bg-white/20 rounded"
                                      aria-label="Zoom in"
                                    >
                                      <ZoomIn className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReset();
                                      }}
                                      className="p-1 text-white hover:bg-white/20 rounded"
                                      aria-label="Reset zoom"
                                    >
                                      <Minimize2 className="w-5 h-5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full">
                            <video
                              src={item.url}
                              className="w-full h-full object-contain"
                              preload="none"
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {project.media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      handleReset();
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Overview</h3>
                  <p className="text-muted-foreground">{project.detailedContent.overview}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Features</h3>
                  <ul className="list-disc pl-4 text-muted-foreground">
                    {project.detailedContent.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.detailedContent.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Highlights</h3>
                  <ul className="list-disc pl-4 text-muted-foreground">
                    {project.detailedContent.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Globe className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
