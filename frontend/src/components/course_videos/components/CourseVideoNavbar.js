import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './CourseVideoNavbar.css';

const CourseVideoNavbar = ({ courseTitle }) => {
  const navigate = useNavigate();

  return (
    <div className="cv-navbar">
      <div className="cv-navbar-left">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="cv-back-button"
        >
          Trang chủ
        </Button>
      </div>

      <div className="cv-navbar-title">
        <h2>{courseTitle || 'Khóa học'}</h2>
      </div>

      <div className="cv-navbar-right-placeholder"></div>
    </div>
  );
};

export default CourseVideoNavbar; 