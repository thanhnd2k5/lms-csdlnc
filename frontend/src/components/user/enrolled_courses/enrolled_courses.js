import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BookOpen, Compass } from 'lucide-react';
import CourseCard from '../../common/card/CourseCard';
import '../../../styles/CourseLayout.css';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courseEnroll/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      message.error('Không thể tải danh sách khóa học đã đăng ký');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/course-info/${courseId}`);
  };

  const handleStartLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleExplore = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
          tip="Đang chuẩn bị hành trình học tập của bạn..." 
        />
      </div>
    );
  }

  return (
    <div className="enrolled-courses-container">
      {enrolledCourses.length > 0 && <h2 className="section-title">Khóa học đã đăng ký</h2>}
      
      {enrolledCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
             <BookOpen size={64} strokeWidth={1.5} />
          </div>
          <h2 className="empty-title">Bạn chưa đăng ký khóa học nào</h2>
          <p className="empty-desc">
            Hãy bắt đầu hành trình học tập bằng cách khám phá và đăng ký các khóa học mới.
          </p>
          <button className="btn-explore" onClick={handleExplore}>
            <Compass size={20} />
            <span>Khám phá ngay</span>
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {enrolledCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={true}
              onCardClick={handleCardClick}
              onStartLearning={handleStartLearning}
              showEnrollmentStatus={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;