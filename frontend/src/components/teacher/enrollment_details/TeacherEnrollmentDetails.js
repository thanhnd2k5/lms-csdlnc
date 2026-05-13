import React, { useState, useEffect, useMemo } from 'react';
import { Table, Progress, Input, Avatar, Typography, Row, Col, Tag, Space, Empty, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  BookOutlined, 
  CheckCircleOutlined, 
  TeamOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { getAssetUrl } from '../../../utils/urlUtils';
import './TeacherEnrollmentDetails.css';

const { Title, Text } = Typography;

const TeacherEnrollmentDetails = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEnrollmentDetails();
  }, []);

  const fetchEnrollmentDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/courseEnroll/teacher/student-enrollment-details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRawData(response.data);
    } catch (error) {
      console.error('Error fetching enrollment details:', error);
    } finally {
      setLoading(false);
    }
  };

  const tableData = useMemo(() => {
    const flattened = rawData.flatMap(course => 
      course.students.map(student => ({
        key: `${course.id}-${student.id}`,
        course_id: course.id,
        course_title: course.title,
        course_thumb: course.thumbnail,
        student_id: student.id,
        student_name: student.name,
        student_email: student.email,
        student_avatar: student.avatar,
        enrolled_at: student.enrolled_at,
        progress: student.progress || 0,
        completed_videos: student.completed_videos,
        total_videos: student.total_videos
      }))
    );

    if (!searchText) return flattened;
    const lowerSearch = searchText.toLowerCase();
    return flattened.filter(item => 
      item.student_name?.toLowerCase().includes(lowerSearch) ||
      item.student_email?.toLowerCase().includes(lowerSearch) ||
      item.course_title?.toLowerCase().includes(lowerSearch)
    );
  }, [rawData, searchText]);

  const stats = useMemo(() => {
    const totalStudents = tableData.length;
    const totalCourses = rawData.length;
    const avgProgress = totalStudents > 0 
      ? tableData.reduce((acc, curr) => acc + curr.progress, 0) / totalStudents 
      : 0;
    const completedStudents = tableData.filter(item => item.progress === 100).length;

    return { totalStudents, totalCourses, avgProgress, completedStudents };
  }, [tableData, rawData]);

  const columns = [
    {
      title: 'Học viên',
      key: 'student',
      width: '25%',
      render: (_, record) => (
        <div className="student-cell">
          <Avatar 
            src={getAssetUrl(record.student_avatar)} 
            icon={<UserOutlined />} 
            size={40}
            style={{ border: '1px solid #f1f5f9' }}
          />
          <div className="student-info">
            <span className="student-name">{record.student_name}</span>
            <span className="student-email">{record.student_email}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Khóa học',
      key: 'course',
      width: '30%',
      render: (_, record) => (
        <Space size="middle">
          <img 
            src={getAssetUrl(record.course_thumb)} 
            className="course-thumbnail-mini" 
            alt={record.course_title}
            onError={(e) => e.target.src = 'https://via.placeholder.com/100x60?text=No+Image'}
          />
          <div className="course-title-cell">
            <span className="course-main-title">{record.course_title}</span>
            <span className="course-id-sub">ID: #{record.course_id}</span>
          </div>
        </Space>
      )
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'enrolled_at',
      key: 'enrolled_at',
      render: (date) => (
        <Text type="secondary" style={{ fontSize: '13px' }}>
          {new Date(date).toLocaleDateString('vi-VN')}
        </Text>
      )
    },
    {
      title: 'Tiến độ học tập',
      key: 'progress',
      width: '20%',
      sorter: (a, b) => a.progress - b.progress,
      render: (_, record) => (
        <div className="progress-container-premium">
          <Progress 
            percent={Math.round(record.progress)} 
            size="small" 
            strokeColor={record.progress === 100 ? '#10b981' : '#2563eb'}
          />
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>
            Đã xem {record.completed_videos}/{record.total_videos} bài giảng
          </span>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      align: 'right',
      render: (_, record) => (
        record.progress === 100 ? (
          <Tag color="green" style={{ borderRadius: '6px', fontWeight: 600 }}>HOÀN THÀNH</Tag>
        ) : (
          <Tag color="blue" style={{ borderRadius: '6px', fontWeight: 600 }}>ĐANG HỌC</Tag>
        )
      )
    }
  ];

  return (
    <div className="course-management-container">
      <div className="course-dashboard-header">
        <Row justify="space-between" align="bottom">
          <Col>
            <h1>Quản lý học viên</h1>
            <p>Theo dõi tiến độ và hỗ trợ học viên trong hành trình chinh phục tri thức</p>
          </Col>
        </Row>
      </div>

      <div className="course-stats-grid">
        <div className="course-stat-card">
          <div className="stat-icon-wrapper blue">
            <TeamOutlined />
          </div>
          <div className="stat-info">
            <h3>Tổng học viên</h3>
            <div className="stat-value">{stats.totalStudents}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper purple">
            <BookOutlined />
          </div>
          <div className="stat-info">
            <h3>Khóa học</h3>
            <div className="stat-value">{stats.totalCourses}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper orange">
            <LineChartOutlined />
          </div>
          <div className="stat-info">
            <h3>Tiến độ TB</h3>
            <div className="stat-value">{Math.round(stats.avgProgress)}%</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircleOutlined />
          </div>
          <div className="stat-info">
            <h3>Đã hoàn thành</h3>
            <div className="stat-value">{stats.completedStudents}</div>
          </div>
        </div>
      </div>

      <div className="course-filter-section">
        <div className="search-wrapper">
          <Input
            placeholder="Tìm kiếm học viên, khóa học hoặc email..."
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ borderRadius: '10px', height: '42px' }}
            allowClear
          />
        </div>
        <div className="toolbar-actions">
          <Text type="secondary">Đang hiển thị <strong>{tableData.length}</strong> học viên</Text>
        </div>
      </div>

      <div className="premium-table-container">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          rowKey="key"
          className="enrollment-table"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số ${total} học viên`,
            style: { padding: '16px 24px' }
          }}
          locale={{
            emptyText: <Empty description="Không tìm thấy dữ liệu học viên" />
          }}
        />
      </div>
    </div>
  );
};

export default TeacherEnrollmentDetails;