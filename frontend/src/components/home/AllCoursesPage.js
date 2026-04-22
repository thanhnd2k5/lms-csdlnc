import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin, message } from 'antd';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import CourseCard from '../common/card/CourseCard';
import './AllCoursesPage.css';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const navigate = useNavigate();
  const observer = useRef();
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const lastCourseElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchCourses(nextCursor);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, nextCursor]);

  const fetchCourses = async (cursor = null) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`, {
        params: {
          paginated: 'true',
          limit: 12,
          cursor: cursor
        }
      });

      const newCourses = response.data.courses;
      const newNextCursor = response.data.nextCursor;

      setCourses(prev => cursor ? [...prev, ...newCourses] : newCourses);
      setNextCursor(newNextCursor);
      setHasMore(!!newNextCursor);
      setInitialLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      message.error('Không thể tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCardClick = (courseId) => {
    navigate(`/course-info/${courseId}`);
  };

  const handleEnroll = async (courseId) => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/courseEnroll/enroll`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Đăng ký khóa học thành công');
      navigate(`/course/${courseId}`);
    } catch (error) {
      message.error('Lỗi khi đăng ký khóa học');
    }
  };

  const handleEditClick = (courseId) => {
    navigate(`/teacher/courses/${courseId}/videos`);
  };

  return (
    <div className="all-courses-page-premium">
      {/* Premium Hero Section */}
      <section className="courses-hero">
        <div className="hero-ambient-glow orb-1"></div>
        <div className="hero-ambient-glow orb-2"></div>
        <div className="hero-grid-pattern"></div>
        
        <div className="hero-content-container">
          <motion.div 
            className="hero-nav"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button className="glass-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              <span>Trang chủ</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="premium-badge">
              <BookOpen size={14} />
              <span>Khám phá {courses.length} khóa học</span>
            </div>
            <h1 className="hero-title-main">
              Tất cả <span className="gradient-text-accent">Khóa học</span>
            </h1>
            <p className="hero-description-main">
              Làm chủ tương lai với lộ trình học tập được thiết kế bởi các chuyên gia. 
              Mỗi bước đi là một sự bứt phá mới.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="courses-main-wrapper">
        <div className="all-courses-container">

        {initialLoading ? (
          <div className="initial-loading">
            <Spin size="large" tip="Đang tải danh sách khóa học..." />
          </div>
        ) : (
          <>
            <div className="courses-grid">
              {courses.map((course, index) => {
                if (courses.length === index + 1) {
                  return (
                    <div ref={lastCourseElementRef} key={course.id} className="grid-item">
                      <CourseCard
                        course={course}
                        userRole={userRole}
                        onCardClick={handleCardClick}
                        onEnroll={handleEnroll}
                        onEditClick={handleEditClick}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={course.id} className="grid-item">
                      <CourseCard
                        course={course}
                        userRole={userRole}
                        onCardClick={handleCardClick}
                        onEnroll={handleEnroll}
                        onEditClick={handleEditClick}
                      />
                    </div>
                  );
                }
              })}
            </div>

            {loading && (
              <div className="loading-more">
                <Spin tip="Đang tải thêm..." />
              </div>
            )}

            {!hasMore && courses.length > 0 && (
              <div className="no-more-data">
                <p>Bạn đã xem hết danh sách khóa học</p>
              </div>
            )}

            {!initialLoading && courses.length === 0 && (
              <div className="empty-state">
                <p>Hiện chưa có khóa học nào được xuất bản</p>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;
