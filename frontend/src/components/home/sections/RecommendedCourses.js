import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from '../../common/card/CourseCard';
import './RecommendedCourses.css';

const RecommendedCourses = ({ courses, userRole, handleCardClick, handleEnroll, handleEditClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="recommended-section" id="recommended-courses">
      <div className="section-container">
        <div className="section-header">
          <h2 className="modern-title">Đề xuất cho bạn</h2>
          <Link to="/courses" className="view-all-btn">
            Xem tất cả <ArrowRight size={18} />
          </Link>
        </div>
        <motion.div
          className="courses-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Array.isArray(courses) && courses.slice(0, 8).map((course) => (
            <div key={course.id} className="grid-item">
              <CourseCard
                course={course}
                userRole={userRole}
                onCardClick={handleCardClick}
                onEnroll={handleEnroll}
                onEditClick={handleEditClick}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedCourses;
