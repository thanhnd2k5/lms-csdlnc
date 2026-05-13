import React, { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Table, Typography, Avatar, Empty, Progress, Space, Tag } from 'antd';
import { 
  ReadOutlined, 
  VideoCameraOutlined, 
  UserOutlined, 
  TeamOutlined,
  DashboardOutlined,
  RiseOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { getAssetUrl } from '../../../utils/urlUtils';

const { Title, Text } = Typography;

const TeacherDashboard = ({ courses = [] }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courseEnroll/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStats = useMemo(() => {
    const totalCourses = courses.length;
    const totalVideos = courses.reduce((acc, course) => acc + (course.video_count || 0), 0);
    const totalStudents = stats.reduce((acc, course) => acc + (course.student_count || 0), 0);
    const avgProgress = stats.length > 0 
      ? Math.round(stats.reduce((acc, curr) => acc + (parseFloat(curr.avg_progress) || 0), 0) / stats.length)
      : 0;

    return [
      { 
        title: 'Khóa học của tôi', 
        value: totalCourses, 
        icon: <ReadOutlined />, 
        color: 'blue',
        subtitle: 'Khóa học đang giảng dạy'
      },
      { 
        title: 'Tổng số video', 
        value: totalVideos, 
        icon: <VideoCameraOutlined />, 
        color: 'purple',
        subtitle: 'Bài giảng đã xuất bản'
      },
      { 
        title: 'Tổng số học viên', 
        value: totalStudents, 
        icon: <UserOutlined />, 
        color: 'green',
        subtitle: 'Học viên đang theo học'
      },
      { 
        title: 'Tiến độ trung bình', 
        value: `${avgProgress}%`, 
        icon: <RiseOutlined />, 
        color: 'orange',
        subtitle: 'Hiệu suất học tập chung'
      }
    ];
  }, [courses, stats]);

  const columns = [
    {
      title: 'Khóa học',
      key: 'course',
      width: '40%',
      render: (_, record) => {
        const courseInfo = courses.find(c => c.id === record.course_id);
        return (
          <Space size="middle">
            <img 
              src={getAssetUrl(courseInfo?.thumbnail)} 
              alt="thumb" 
              style={{ width: 60, height: 36, borderRadius: 6, objectFit: 'cover' }}
              onError={(e) => e.target.src = 'https://placehold.co/100x60?text=Course'}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text strong>{record.course_title}</Text>
              <Text type="secondary" style={{ fontSize: '11px' }}>ID: #{record.course_id}</Text>
            </div>
          </Space>
        );
      }
    },
    {
      title: 'Số học viên',
      dataIndex: 'student_count',
      key: 'student_count',
      width: '15%',
      align: 'center',
      render: (count) => (
        <div className="align-center-flex" style={{ fontWeight: 600, color: '#475569', justifyContent: 'center' }}>
          <TeamOutlined style={{ color: '#6366f1' }} /> {count || 0}
        </div>
      ),
    },
    {
      title: 'Tiến độ học tập',
      key: 'progress',
      width: '30%',
      render: (_, record) => (
        <div style={{ width: '100%', paddingRight: '20px' }}>
          <Progress 
            percent={Math.round(record.avg_progress || 0)} 
            size="small" 
            status={record.student_count > 0 ? "active" : "normal"}
            strokeColor={{
              '0%': '#3b82f6',
              '100%': '#10b981',
            }}
          />
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: '15%',
      align: 'right',
      render: (_, record) => (
        <Tag 
          color={record.student_count > 0 ? 'success' : 'orange'} 
          style={{ borderRadius: '6px', fontWeight: 600, border: 'none' }}
        >
          {record.student_count > 0 ? 'ĐANG HOẠT ĐỘNG' : 'ĐỢI HỌC VIÊN'}
        </Tag>
      )
    }
  ];

  return (
    <div className="course-management-container">
      <div className="course-dashboard-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Space align="center" size="middle" style={{ marginBottom: '8px' }}>
              <Avatar 
                size={54} 
                src={user.avatar ? getAssetUrl(user.avatar) : null} 
                icon={<UserOutlined />}
                style={{ 
                  border: '2px solid #3b82f6', 
                  background: user.avatar ? 'white' : '#eff6ff',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
              <div>
                <Title level={2} style={{ margin: 0, fontSize: '1.5rem' }}>Chào mừng, {user.full_name || 'Giảng viên'}! 👋</Title>
                <Text type="secondary">Hôm nay là một ngày tuyệt vời để chia sẻ kiến thức mới.</Text>
              </div>
            </Space>
          </Col>
        </Row>
      </div>

      <div className="course-stats-grid">
        {dashboardStats.map((item, index) => (
          <div className="course-stat-card" key={index}>
            <div className={`stat-icon-wrapper ${item.color}`}>
              {item.icon}
            </div>
            <div className="stat-info">
              <h3>{item.title}</h3>
              <div className="stat-value">{item.value}</div>
              <Text type="secondary" style={{ fontSize: '11px' }}>{item.subtitle}</Text>
            </div>
          </div>
        ))}
      </div>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <div className="premium-table-container">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <DashboardOutlined style={{ fontSize: '20px', color: '#3b82f6' }} />
              <Title level={4} style={{ margin: 0 }}>Phân tích hiệu suất theo khóa học</Title>
            </div>
            <Table
              columns={columns}
              dataSource={stats}
              loading={loading}
              rowKey="course_id"
              pagination={false}
              locale={{
                emptyText: <Empty description="Bạn chưa có dữ liệu thống kê khóa học nào" />
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;