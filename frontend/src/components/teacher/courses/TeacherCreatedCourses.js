import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BookOpen, Plus } from 'lucide-react';
import CourseCard from '../../common/card/CourseCard';
import '../../../styles/CourseLayout.css';

const TeacherCreatedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    fetchTeacherCourses();
  }, []);

  const fetchTeacherCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
      message.error('Không thể tải danh sách khóa học của bạn');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/course-info/${courseId}`);
  };

  const handleCreateNew = () => {
    navigate('/teacher/courses'); // Redirect to management page where 'Add' is available
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
          tip="Đang chuẩn bị danh sách khóa học của bạn..." 
        />
      </div>
    );
  }

  return (
    <div className="enrolled-courses-container">
      <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>Khóa học của tôi</h2>
        <button className="btn-explore" onClick={handleCreateNew} style={{ padding: '10px 20px' }}>
          <Plus size={20} />
          <span>Tạo khóa học mới</span>
        </button>
      </div>
      
      {courses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
             <BookOpen size={64} strokeWidth={1.5} />
          </div>
          <h2 className="empty-title">Bạn chưa tạo khóa học nào</h2>
          <p className="empty-desc">
            Hãy bắt đầu chia sẻ kiến thức của bạn bằng cách tạo khóa học đầu tiên.
          </p>
          <button className="btn-explore" onClick={handleCreateNew}>
            <Plus size={20} />
            <span>Tạo ngay</span>
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              userRole={userRole}
              onCardClick={handleCardClick}
              showEnrollmentStatus={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCreatedCourses;
