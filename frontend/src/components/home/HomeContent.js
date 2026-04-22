import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import FeaturedCourses from './sections/FeaturedCourses';
import RecommendedCourses from './sections/RecommendedCourses';
import './HomeContent.css';
import './HomeContent.css';

const HomeContent = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourses();
  }, [userRole, token]);

  const fetchCourses = async () => {
    try {
      // Always fetch all courses for the recommended grid
      const allCoursesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/courses`);
      setAllCourses(allCoursesResponse.data);

      // If teacher, fetch their specific courses for the featured carousel
      if (userRole === 'teacher' && token) {
        const myCoursesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyCourses(myCoursesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCardClick = (courseId) => {
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

  const handleViewAll = () => {
    if (userRole === 'teacher') {
      navigate('/teacher/my-courses');
    } else {
      navigate('/search');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-content-wrapper">
      <HeroSection 
        onGetStarted={() => scrollToSection('featured-courses')} 
        onLearnMore={() => scrollToSection('recommended-courses')} 
      />
      
      <StatsSection />

      {/* Show FeaturedCourses only if there is data */}
      {(userRole === 'teacher' ? myCourses : allCourses).length > 0 && (
        <FeaturedCourses 
          title={userRole === 'teacher' ? 'Khóa học của tôi' : 'Khóa học nổi bật'}
          courses={userRole === 'teacher' ? myCourses : allCourses}
          userRole={userRole}
          handleCardClick={handleCardClick}
          handleEnroll={handleEnroll}
          handleEditClick={handleEditClick}
          onViewAll={handleViewAll}
        />
      )}

      {/* Show RecommendedCourses only if there is data */}
      {allCourses.length > 0 && (
        <RecommendedCourses 
          courses={allCourses}
          userRole={userRole}
          handleCardClick={handleCardClick}
          handleEnroll={handleEnroll}
          handleEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default HomeContent;

