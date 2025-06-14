
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';

interface ProjectPreviewProps {
  project: {
    id: number;
    title: string;
    liveUrl: string;
    gradient: string;
  };
}

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
      
      {/* Main Container */}
      <div className="relative glass-card rounded-xl overflow-hidden border border-white/10">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3 bg-gray-800/80 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Traffic Lights */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* URL Bar */}
            <div className="bg-gray-700/80 rounded-lg px-3 py-1.5 min-w-0 flex-1 max-w-xs">
              <div className="text-xs text-gray-300 truncate font-mono">
                {project.liveUrl}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 className="w-3 h-3 text-white" />
            </motion.button>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-3 h-3 text-white" />
            </motion.a>
          </div>
        </div>
        
        {/* Iframe Container */}
        <div className="relative bg-gray-900 h-64 overflow-hidden">
          {/* Loading Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading preview...</div>
          </div>
          
          {/* Actual Iframe */}
          <iframe
            src={project.liveUrl}
            className="absolute inset-0 w-full h-full transform scale-75 origin-top-left border-0"
            style={{
              width: '133.33%',
              height: '133.33%',
              background: 'transparent'
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            title={`${project.title} - Live Preview`}
          />
          
          {/* Overlay for Interactions */}
          <div 
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={() => window.open(project.liveUrl, '_blank')}
          />
        </div>
        
        {/* Bottom Bar */}
        <div className="flex items-center justify-between p-2 bg-gray-800/50 backdrop-blur-sm">
          <div className="text-xs text-gray-400">
            Live Demo
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectPreview;
