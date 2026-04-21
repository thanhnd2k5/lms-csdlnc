import React from 'react';
import { Users, LayoutGrid, Award } from 'lucide-react';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stat-glass-bar">
          <div className="home-stat-item">
            <div className="stat-icon"><Users size={24} /></div>
            <div className="stat-info">
              <h3 className="stat-value">50k+</h3>
              <p className="stat-label">Học viên</p>
            </div>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="home-stat-item">
            <div className="stat-icon"><LayoutGrid size={24} /></div>
            <div className="stat-info">
              <h3 className="stat-value">200+</h3>
              <p className="stat-label">Khóa học</p>
            </div>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="home-stat-item">
            <div className="stat-icon"><Award size={24} /></div>
            <div className="stat-info">
              <h3 className="stat-value">100%</h3>
              <p className="stat-label">Hài lòng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
