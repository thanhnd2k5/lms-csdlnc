import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import heroMain from '../../../assets/images/hero-main.png';
import heroSub from '../../../assets/images/hero-sub.png';
import './HeroSection.css';

const HeroSection = ({ onGetStarted, onLearnMore }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth - 0.5) * 20;
    const yPct = (clientY / innerHeight - 0.5) * 20;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const orbX = useTransform(x, (val) => val * -1.5);
  const orbY = useTransform(y, (val) => val * -1.5);

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
    <section className="ultra-hero-section" onMouseMove={handleMouseMove}>
      <div className="hero-grid-pattern"></div>
      
      <motion.div className="ambient-glow orb-1" style={{ x: orbX, y: orbY }} />
      <motion.div className="ambient-glow orb-2" style={{ x: orbY, y: orbX }} />
      <motion.div className="ambient-glow orb-3" style={{ x: orbX, y: orbX }} />
      
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
          <motion.div 
            className="floating-wrapper w1"
            style={{ x, y }}
          >
            <motion.div 
              className="floating-card c1 premium-border" 
              variants={floatingVariants} 
              animate="animate"
            >
              <div className="card-glass-shine" />
              <img src={heroSub} alt="Education Icons" className="floating-img" />
            </motion.div>
            <motion.div 
              className="card-shadow"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.div 
            className="floating-wrapper w2"
            style={{ x: useTransform(x, (v) => v * 1.2), y: useTransform(y, (v) => v * 1.2) }}
          >
            <motion.div 
              className="floating-card c2 premium-border" 
              variants={floatingVariants} 
              animate="animate" 
              transition={{ delay: 1 }}
            >
              <div className="card-glass-shine" />
              <img src={heroMain} alt="Student Learning" className="floating-img" />
            </motion.div>
            <motion.div 
              className="card-shadow"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
