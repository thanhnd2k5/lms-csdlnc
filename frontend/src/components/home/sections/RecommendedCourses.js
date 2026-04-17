import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../../common/card/CourseCard';
import './RecommendedCourses.css';

const RecommendedCourses = ({ courses, userRole, handleCardClick, handleEnroll }) => {
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
        <h2 className="modern-title">Đề xuất cho bạn</h2>
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
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedCourses;
