
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const ContactAvailability = () => (
  <motion.div
    className="glass-card p-6"
    variants={itemVariants}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <span className="text-green-500 font-medium">Ready to code your vision</span>
    </div>
    <p className="text-sm text-foreground-muted">
      Currently accepting exciting projects and full-time opportunities. Let's build something amazing together! 🚀
    </p>
  </motion.div>
);

export default ContactAvailability;
