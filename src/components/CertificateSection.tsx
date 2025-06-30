import { motion } from 'framer-motion';
import { ExternalLink, Download, Eye, X } from 'lucide-react';
import { useState } from 'react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  filePath: string;
  imagePath: string;
  category: string;
}

const certificates: Certificate[] = [
  {
    id: 'sql',
    title: 'SQL Database Management',
    issuer: 'Coursera',
    date: '2023',
    description: 'Comprehensive SQL database management and optimization techniques',
    filePath: '/certificates/SQL-Certificate.pdf',
    imagePath: '/certificates/SQL-Certificate.png',
    category: 'Database'
  },
  {
    id: 'python-ml',
    title: 'Python Machine Learning',
    issuer: 'IBM',
    date: '2023',
    description: 'Advanced machine learning algorithms and data science with Python',
    filePath: '/certificates/Python ML.pdf',
    imagePath: '/certificates/Python ML.png',
    category: 'Machine Learning'
  },
  {
    id: 'frontend',
    title: 'Frontend Web Development',
    issuer: 'IBM SkillsBuild',
    date: '2023',
    description: 'Summer internship certificate for frontend web development',
    filePath: '/certificates/IBM-Frontend-Certificate.pdf',
    imagePath: '/certificates/IBM-Frontend-Certificate.png',
    category: 'Web Development'
  }
];

const CertificateSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const categories = ['all', ...Array.from(new Set(certificates.map(cert => cert.category)))];
  
  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    const link = document.createElement('a');
    link.href = certificate.filePath;
    link.download = `${certificate.title}-${certificate.issuer}.pdf`;
    link.click();
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Certificates</span> & Achievements
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise in various technologies and methodologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background-secondary/50 text-foreground-muted hover:text-foreground hover:bg-background-secondary/80 border border-border/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              className="glass-card-hover p-0 overflow-hidden cursor-pointer flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onClick={() => handleViewCertificate(certificate)}
            >
              <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={certificate.imagePath}
                  alt={certificate.title}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {certificate.category}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {certificate.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">
                    {certificate.title}
                  </h3>
                  <p className="text-xs text-accent font-medium mb-2">
                    {certificate.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="bg-background-secondary rounded-xl p-3 sm:p-6 lg:p-8 max-w-sm sm:max-w-2xl w-full max-h-[95vh] overflow-y-auto flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between w-full mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground pr-2 leading-tight">
                  {selectedCertificate.title}
                </h3>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-foreground-muted hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted/50 flex-shrink-0"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>
              
              {/* Certificate Image */}
              <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center overflow-hidden rounded-lg mb-3 sm:mb-4">
                <img
                  src={selectedCertificate.imagePath}
                  alt={selectedCertificate.title}
                  className="object-contain w-full h-full"
                />
              </div>
              
              {/* Certificate Details */}
              <div className="w-full space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-foreground-muted">Issuer</p>
                  <p className="text-sm sm:text-base text-foreground font-medium">{selectedCertificate.issuer}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-foreground-muted">Date</p>
                  <p className="text-sm sm:text-base text-foreground font-medium">{selectedCertificate.date}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-foreground-muted">Description</p>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">{selectedCertificate.description}</p>
                </div>
              </div>
              
              {/* Action Buttons - Responsive Layout */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <motion.button
                  onClick={() => handleDownloadCertificate(selectedCertificate)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} className="sm:w-5 sm:h-5" />
                  <span className="font-medium">Download PDF</span>
                </motion.button>
                <motion.button
                  onClick={() => window.open(selectedCertificate.filePath, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                  <span className="font-medium">Open PDF</span>
                </motion.button>
                <motion.button
                  onClick={() => window.open(selectedCertificate.imagePath, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye size={16} className="sm:w-5 sm:h-5" />
                  <span className="font-medium">Open Image</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificateSection; 