import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    link: 'https://github.com/Abhishek1334',
    color: 'hover:text-white'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    link: 'https://linkedin.com/in/AbhishekRajoria',
    color: 'hover:text-blue-500'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    link: 'https://x.com/ARajoria1334',
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
    className="glass-card p-4 sm:p-6 md:p-8 bg-background-secondary/5"
    variants={itemVariants}
  >
    <h4 className="text-lg font-semibold mb-6 text-foreground">Follow My Journey</h4>
    <div className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 bg-muted rounded-lg text-foreground-muted ${social.color} transition-colors`}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="w-5 h-5 text-foreground" />
        </motion.a>
      ))}
    </div>
  </motion.div>
);

export default ContactSocials;
