
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';

interface ProjectPreviewProps {
  project: {
    id: number;
    title: string;
    liveUrl: string;
    gradient: string;
    previewImage: string;
  };
  onReadMore: () => void;
}

const ProjectPreview = ({ project, onReadMore }: ProjectPreviewProps) => {
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
              onClick={onReadMore}
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
        
        {/* Preview Image Container */}
        <div className="relative bg-gray-900 h-64 overflow-hidden">
          {/* Project Screenshot */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer"
            style={{
              backgroundImage: `url(${project.previewImage})`,
            }}
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            {/* Overlay for Better Text Readability */}
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
          </div>
          
          {/* Read More Button Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <motion.button
              onClick={onReadMore}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </motion.button>
          </div>
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
