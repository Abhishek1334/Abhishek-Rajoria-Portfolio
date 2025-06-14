
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    link: 'https://github.com/abhishekrajoria',
    color: 'hover:text-white'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/abhishek-rajoria',
    color: 'hover:text-blue-500'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    link: 'https://twitter.com/abhishekrajoria',
    color: 'hover:text-cyan-500'
  }
];
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

const ContactSocials = () => (
  <motion.div
    className="glass-card p-8"
    variants={itemVariants}
  >
    <h4 className="text-lg font-semibold mb-6 text-white">Follow My Journey</h4>
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 bg-white/5 rounded-lg text-foreground-muted ${social.color} transition-colors`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  </motion.div>
);

export default ContactSocials;
