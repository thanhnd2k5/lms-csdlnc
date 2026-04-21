import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import heroMain from '../../../assets/images/hero-main.png';
import heroSub from '../../../assets/images/hero-sub.png';
import './HeroSection.css';

const HeroSection = ({ onGetStarted, onLearnMore }) => {
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="ultra-hero-section">
      {/* Premium Background Elements */}
      <div className="hero-grid-pattern"></div>
      <div className="ambient-glow orb-1"></div>
      <div className="ambient-glow orb-2"></div>
      <div className="ambient-glow orb-3"></div>
      
      <div className="hero-split-container">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <TrendingUp size={14} />
            <span>Nền tảng học tập thế hệ mới</span>
          </div>
          <h1 className="hero-title">
            Nâng tầm kĩ năng <br /> 
            <span className="gradient-text">Kiến thức vô tận</span>
          </h1>
          <p className="hero-description">
            Khám phá lộ trình học tập được cá nhân hóa, giúp bạn làm chủ tương lai với sự dẫn dắt từ các chuyên gia hàng đầu.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={onGetStarted}>Bắt đầu ngay</button>
            <button className="secondary-btn" onClick={onLearnMore}>Tìm hiểu thêm</button>
          </div>
        </motion.div>

        <div className="hero-right">
          <motion.div className="floating-card c1" variants={floatingVariants} animate="animate">
            <img src={heroSub} alt="Education Icons" className="floating-img" />
          </motion.div>
          <motion.div className="floating-card c2" variants={floatingVariants} animate="animate" transition={{ delay: 1 }}>
            <img src={heroMain} alt="Student Learning" className="floating-img" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
