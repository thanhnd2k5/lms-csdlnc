import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, BookMarked, Star } from 'lucide-react';

const BrandingPanel = () => {
  return (
    <div className="auth-brand-panel">
      {/* Mesh Background */}
      <div className="auth-mesh-container">
        <div className="auth-blob blob-1"></div>
        <div className="auth-blob blob-2"></div>
        <div className="auth-blob blob-3"></div>
      </div>
      
      <motion.div 
        className="auth-brand-content"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="auth-logo-section">
          <BookOpen size={28} color="#3B82F6" strokeWidth={2.5} />
          <span className="auth-logo-text">MYCLASS</span>
        </div>

        <div className="auth-main-content">
          <h2 className="auth-tagline">
            Nơi tri thức<br />
            gặp gỡ cơ hội.
          </h2>
          <p className="auth-brand-description">
            Học tập không giới hạn với nền tảng LMS hiện đại nhất, kết nối giảng viên và học viên toàn cầu.
          </p>
        </div>

        <div className="auth-stats-bar">
          <div className="auth-stat-item">
            <h4>10K+</h4>
            <p>Học viên</p>
          </div>
          
          <div className="auth-stat-item">
            <h4>500+</h4>
            <p>Khoá học</p>
          </div>

          <div className="auth-stat-item">
            <h4>98%</h4>
            <p>Hài lòng</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandingPanel;
