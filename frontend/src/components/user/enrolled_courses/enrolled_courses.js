import React, { useState, useEffect } from 'react';
import { message, Spin, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import CourseCard from '../../common/card/CourseCard';
import '../../../styles/CourseLayout.css';
import illustration from '../../../assets/images/learning_journey.png';

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
    navigate(`/course/${courseId}`);
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
        <div className="empty-state-card">
          <div className="empty-illustration-container">
            <img src={illustration} alt="Hành trình học tập" className="empty-illustration" />
          </div>
          <h1 className="premium-title">Hành trình học tập bắt đầu từ đây</h1>
          <p className="premium-desc">
            Không gian này sẽ lưu giữ những kiến thức quý báu của bạn. Hãy khởi hành ngay hôm nay bằng cách đăng ký khóa học đầu tiên!
          </p>
          <Button 
            type="primary" 
            size="large"
            className="premium-explore-btn"
            onClick={handleExplore}
          >
            Khám phá ngay <ArrowRightOutlined />
          </Button>
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