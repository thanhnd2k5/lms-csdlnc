import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Users, BookOpen, Check } from 'lucide-react';
import { getAssetUrl } from '../../../utils/urlUtils';
import './CourseCard.css';

const CourseCard = ({
  course,
  onEnroll,
  onCardClick,
  onEditClick,
  userRole,
  isEnrolled: propIsEnrolled,
  className = '',
  showEnrollmentStatus = true
}) => {
  const [isEnrolled, setIsEnrolled] = useState(propIsEnrolled);
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Kiểm tra quyền chỉnh sửa
  const isOwner = course.teacher_id === currentUser.id;
  const isAdmin = userRole === 'admin';
  const canEdit = isAdmin || (userRole === 'teacher' && isOwner);

  useEffect(() => {
    if (token && showEnrollmentStatus && !propIsEnrolled && userRole !== 'teacher') {
      checkEnrollmentStatus();
    }
  }, [course?.id, token, showEnrollmentStatus, userRole, propIsEnrolled]);

  const checkEnrollmentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/courseEnroll/check/${course.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEnrolled(response.data.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    onEnroll?.(course.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEditClick?.(course.id);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`course-card-wrapper ${className}`}
      onClick={() => onCardClick?.(course.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail Section */}
      <div className="course-image-wrapper">
        <img
          alt={course.title}
          src={getAssetUrl(course.thumbnail)}
          className="course-image-custom"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/f1f5f9/475569?text=LMS+Course';
          }}
        />
        
        {isEnrolled && (
          <div className="enrolled-badge is-enrolled">
            <Check size={14} />
            <span>Đã đăng ký</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        
        <div className="course-card-meta">
          <div className="meta-item">
            <User size={16} />
            <span className="teacher-name">{course.teacher_name || 'Giảng viên ẩn danh'}</span>
          </div>
          
          <div className="meta-item">
            <Users size={16} />
            <span className="students-count">{course.total_students || 0} học viên</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;