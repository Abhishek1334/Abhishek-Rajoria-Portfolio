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
      Let's Build <span className="text-gradient-purple">Something Great</span>
    </h2>
    <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
      I'm always excited to discuss new opportunities, collaborate on innovative projects, 
      or connect with fellow developers. Whether you have a challenging problem to solve 
      or want to explore the latest in web technology, I'd love to hear from you.
    </p>
  </motion.div>
);

export default ContactHeader;
