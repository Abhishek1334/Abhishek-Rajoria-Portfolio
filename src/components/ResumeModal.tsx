'use client';

import { Dialog } from '@headlessui/react';
import { X, Download, ExternalLink, FileText, Maximize2, Minimize2 } from 'lucide-react';
import { useState, memo } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = memo(({ isOpen, onClose }: ResumeModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Google Drive view link to embed link
  const resumeEmbedUrl = 'https://drive.google.com/file/d/1UchzGFtq72KDwOsg8af5W2NKQDvoRi-J/preview';
  const resumeDownloadUrl = 'https://drive.google.com/uc?export=download&id=1UchzGFtq72KDwOsg8af5W2NKQDvoRi-J';
  const resumeViewUrl = 'https://drive.google.com/file/d/1UchzGFtq72KDwOsg8af5W2NKQDvoRi-J/view?usp=drive_link';

  const handleLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
        <div className={`w-full overflow-hidden transform transition-all duration-200 ${
          isFullscreen ? 'max-w-none max-h-none h-screen' : 'max-w-6xl max-h-[95vh]'
        }`}>
          <Dialog.Panel className="glass-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-amber-500/10 border-b border-white/10">
              <div className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-amber-500/20">
                    <FileText className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl sm:text-2xl font-bold text-gradient-amber">
                      Resume Preview
                    </Dialog.Title>
                    <p className="text-sm text-foreground-muted">Abhishek Rajoria - Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Action Buttons */}
                  <div className="hidden sm:flex items-center gap-2">
                    <a
                      href={resumeDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-4 py-2 text-sm"
                      title="Download Resume"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                    
                    <a
                      href={resumeViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost px-4 py-2 text-sm"
                      title="Open in Google Drive"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Drive
                    </a>
                    
                    <button
                      onClick={toggleFullscreen}
                      className="rounded-xl p-3 hover:bg-amber-500/20 transition-colors border border-white/10 group"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-5 w-5 text-foreground-muted group-hover:text-amber-400 transition-colors" />
                      ) : (
                        <Maximize2 className="h-5 w-5 text-foreground-muted group-hover:text-amber-400 transition-colors" />
                      )}
                    </button>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="rounded-xl p-3 hover:bg-red-500/20 transition-colors border border-white/10 group"
                  >
                    <X className="h-5 w-5 text-foreground-muted group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* Resume Content */}
            <div className="relative bg-white/5" style={{ height: isFullscreen ? 'calc(100vh - 100px)' : '80vh' }}>
              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
                    <p className="text-foreground-muted text-sm">Loading resume preview...</p>
                  </div>
                </div>
              )}

              {/* Resume Iframe */}
              <iframe
                src={resumeEmbedUrl}
                className="w-full h-full border-0"
                title="Resume Preview"
                onLoad={handleLoad}
                style={{ backgroundColor: 'transparent' }}
              />

              {/* Mobile Action Buttons */}
              <div className="sm:hidden absolute bottom-4 left-4 right-4">
                <div className="flex flex-col gap-3 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <a
                    href={resumeDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center py-3"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                  
                  <a
                    href={resumeViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full text-center py-3"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Drive
                  </a>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-background-secondary/30 border-t border-white/10">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4 text-xs text-foreground-muted">
                  <span>💡 Tip: Use fullscreen for better viewing</span>
                  <span>•</span>
                  <span>📱 Scroll within the preview on mobile</span>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
});

ResumeModal.displayName = 'ResumeModal';

export default ResumeModal; 