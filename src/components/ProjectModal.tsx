
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    detailedContent: {
      overview: string;
      features: string[];
      techStack: { category: string; technologies: string[] }[];
      screenshots?: string[];
      videoDemo?: string;
      highlights: string[];
    };
  };
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-amber mb-4">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.detailedContent.overview}
              </p>
            </motion.div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.detailedContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Tech Stack</h3>
            <div className="space-y-4">
              {project.detailedContent.techStack.map((stack, index) => (
                <motion.div
                  key={index}
                  className="border border-white/10 rounded-lg p-4 bg-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <h4 className="font-medium text-amber-400 mb-2">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Highlights */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Project Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.detailedContent.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live Site
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4" />
              View Source Code
            </motion.a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
