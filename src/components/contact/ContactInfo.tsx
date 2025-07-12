import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'AbhishekRajoria24@gmail.com',
    link: 'mailto:AbhishekRajoria24@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9319054781',
    link: 'tel:+919319054781'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New Delhi, India',
    link: '#'
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

const ContactInfo = () => (
  <div className="glass-card p-4 sm:p-6 md:p-8 bg-background-secondary/5">
    <h3 className="text-2xl font-bold mb-6 text-gradient-purple">Connect & Collaborate</h3>
    <div className="space-y-6">
      {contactInfo.map((info) => (
        <motion.a
          key={info.label}
          href={info.link}
          className="flex items-center gap-4 text-foreground-muted hover:text-primary transition-colors group"
          variants={itemVariants}
          whileHover={{ x: 5 }}
        >
          <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
            <info.icon className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <div className="text-sm text-foreground-muted">{info.label}</div>
            <div className="text-foreground font-medium">{info.value}</div>
          </div>
        </motion.a>
      ))}
    </div>
  </div>
);
export default ContactInfo;
