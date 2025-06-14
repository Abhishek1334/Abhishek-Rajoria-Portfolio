
import { motion } from 'framer-motion';

interface ContactHeaderProps {
  containerVariants: any;
  itemVariants: any;
  isVisible: boolean;
}

const ContactHeader = ({ containerVariants, itemVariants, isVisible }: ContactHeaderProps) => (
  <motion.div
    className="text-center mb-16"
    variants={itemVariants}
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Let's Create <span className="text-gradient-purple">Digital Magic</span>
    </h2>
    <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
      Got a wild idea? A challenging problem? Or just want to chat about the latest tech trends? 
      I'm always excited to collaborate on projects that push boundaries and create meaningful impact.
    </p>
  </motion.div>
);

export default ContactHeader;
