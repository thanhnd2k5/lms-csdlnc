import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../../common/card/CourseCard';
import './FeaturedCourses.css';

const FeaturedCourses = ({ title, courses, userRole, handleCardClick, handleEnroll, handleEditClick, onViewAll }) => {
  const carouselRef = useRef(null);
  const [carouselConstraints, setCarouselConstraints] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselConstraints(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [courses]);

  return (
    <section className="featured-section" id="featured-courses">
      <div className="section-container">
        <div className="section-header">
          <h2 className="modern-title">{title}</h2>
          <button className="view-all-btn" onClick={onViewAll}>Xem tất cả</button>
        </div>

        <div className="carousel-viewport" ref={carouselRef}>
          <motion.div
            className="carousel-inner"
            drag="x"
            dragConstraints={{ right: 0, left: -carouselConstraints }}
            whileTap={{ cursor: "grabbing" }}
          >
            {Array.isArray(courses) && courses.map((course) => (
              <div key={course.id} className="carousel-item">
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
      </div>
    </section>
  );
};

export default FeaturedCourses;
