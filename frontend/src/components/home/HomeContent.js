import React, { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LayoutGrid, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
import CourseCard from '../common/card/CourseCard';
import './HomeContent.css';
import '../../styles/CourseLayout.css';

const HomeContent = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  
  const carouselRef = useRef(null);
  const [carouselConstraints, setCarouselConstraints] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [userRole, token]);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselConstraints(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [myCourses, allCourses]);

  const fetchCourses = async () => {
    try {
      if (userRole === 'teacher' && token) {
        const myCoursesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyCourses(myCoursesResponse.data);
      } else {
        const allCoursesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/courses`);
        const publicCourses = allCoursesResponse.data.filter(course => course.is_public);
        setAllCourses(publicCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCardClick = (courseId) => {
    const isAuthenticated = !!token;
    if (!isAuthenticated) {
      message.warning('Vui lòng đăng nhập để xem khóa học');
      navigate('/login');
      return;
    }
    if (userRole === 'teacher' && myCourses.some(course => course.id === courseId)) {
      navigate(`/course/${courseId}`);
      return;
    }
    navigate(`/course-info/${courseId}`);
  };

  const handleEnroll = async (courseId) => {
    try {
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

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

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
    <div className="home-content-wrapper">
      {/* Ultra-Premium Hero Section */}
      <section className="ultra-hero-section">
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
            <h1>Nâng tầm kĩ năng <br/> <span className="gradient-text">Kiến thức vô tận</span></h1>
            <p>Khám phá lộ trình học tập được cá nhân hóa, giúp bạn làm chủ tương lai với sự dẫn dắt từ các chuyên gia hàng đầu.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => navigate('/courses')}>
                Bắt đầu ngay <ChevronRight size={18} />
              </button>
              <div className="students-preview">
                <div className="avatars">
                  {[1,2,3,4].map(i => <div key={i} className="avatar-circle"></div>)}
                </div>
                <span>+10k học viên đã tham gia</span>
              </div>
            </div>
          </motion.div>

          <div className="hero-right">
            <motion.div className="floating-card c1" variants={floatingVariants} animate="animate">
              <div className="card-mock"></div>
            </motion.div>
            <motion.div className="floating-card c2" variants={floatingVariants} animate="animate" transition={{ delay: 1 }}>
              <div className="card-mock"></div>
            </motion.div>
            <div className="hero-glow"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stat-item">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info"><h3>50k+</h3><p>Học viên</p></div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><LayoutGrid size={24} /></div>
          <div className="stat-info"><h3>200+</h3><p>Khóa học</p></div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Award size={24} /></div>
          <div className="stat-info"><h3>100%</h3><p>Hài lòng</p></div>
        </div>
      </section>

      {/* Featured Carousel Section */}
      <section className="carousel-section">
        <div className="section-header">
          <h2 className="modern-title">
            {userRole === 'teacher' ? 'Khóa học của bạn' : 'Khóa học nổi bật'}
          </h2>
          <button className="view-all-btn">Xem tất cả</button>
        </div>

        <div className="carousel-viewport" ref={carouselRef}>
          <motion.div 
            className="carousel-inner"
            drag="x"
            dragConstraints={{ right: 0, left: -carouselConstraints }}
            whileTap={{ cursor: "grabbing" }}
          >
            {(userRole === 'teacher' ? myCourses : allCourses).map((course) => (
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
      </section>

      {/* Recommended Grid */}
      <section className="courses-grid-section">
        <h2 className="modern-title">Đề xuất cho bạn</h2>
        <motion.div 
          className="courses-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allCourses.slice(0, 8).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              userRole={userRole}
              onCardClick={handleCardClick}
              onEnroll={handleEnroll}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomeContent;

