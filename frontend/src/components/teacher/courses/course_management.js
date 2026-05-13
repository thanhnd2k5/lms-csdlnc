import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, message, Modal, Typography, Row, Col, Tag, Select, Tooltip, Space, Input } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  BookOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShareAltOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import axios from 'axios';
import AddCourse from '../../admin/courses/manage_course/add_course';
import EditCourse from '../../admin/courses/manage_course/edit_course';
import CourseStudents from '../../common/course/CourseStudents';
import { getAssetUrl } from '../../../utils/urlUtils';
import { useNavigate } from 'react-router-dom';
import './CourseManagement.css';

const { confirm } = Modal;
const { Title, Text } = Typography;
const { Option } = Select;

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isStudentsModalVisible, setIsStudentsModalVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (courseId) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa khóa học này?',
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          message.success('Xóa khóa học thành công');
          fetchCourses();
        } catch (error) {
          message.error('Có lỗi xảy ra khi xóa khóa học');
        }
      }
    });
  };

  const handleEdit = (record) => {
    setSelectedCourse(record);
    setIsEditModalVisible(true);
  };

  const handleViewStudents = (courseId) => {
    setSelectedCourseId(courseId);
    setIsStudentsModalVisible(true);
  };

  const handleShare = (courseId) => {
    const courseUrl = `${window.location.origin}/course-info/${courseId}`;
    navigator.clipboard.writeText(courseUrl).then(() => {
      message.success('Đã sao chép đường dẫn khóa học vào bộ nhớ tạm!');
    }).catch(err => {
      message.error('Không thể sao chép đường dẫn');
    });
  };

  const handleStudentRemoved = () => {
    fetchCourses();
  };

  const stats = useMemo(() => {
    const total = courses.length;
    const totalStudents = courses.reduce((acc, c) => acc + (c.student_count || 0), 0);
    const publicCourses = courses.filter(c => c.is_public).length;
    // Assume average rating or other stats if available, otherwise use placeholders
    return { total, totalStudents, publicCourses };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'public' && c.is_public) ||
        (statusFilter === 'private' && !c.is_public);
      return matchesSearch && matchesStatus;
    });
  }, [courses, searchText, statusFilter]);

  const columns = [
    {
      title: 'Khóa học',
      key: 'course_info',
      render: (_, record) => (
        <Space size="middle">
          <img
            src={getAssetUrl(record.thumbnail)}
            className="course-thumbnail-mini"
            alt={record.title}
            onError={(e) => e.target.src = 'https://via.placeholder.com/100x60?text=No+Image'}
          />
          <div className="course-title-cell">
            <span className="course-main-title" onClick={() => navigate(`/teacher/courses/${record.id}/videos`)}>
              {record.title}
            </span>
            <span className="course-id-sub">ID: #{record.id}</span>
          </div>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_public',
      key: 'is_public',
      render: (isPublic) => (
        <Tag color={isPublic ? 'green' : 'orange'} style={{ borderRadius: '6px', fontWeight: 600 }}>
          {isPublic ? 'CÔNG KHAI' : 'RIÊNG TƯ'}
        </Tag>
      ),
    },
    {
      title: 'Học viên',
      dataIndex: 'student_count',
      key: 'student_count',
      align: 'center',
      render: (count, record) => (
        <Tooltip title="Xem danh sách học viên">
          <Button
            type="text"
            className="align-center-flex"
            icon={<TeamOutlined style={{ color: '#6366f1' }} />}
            onClick={() => handleViewStudents(record.id)}
            style={{ fontWeight: 600 }}
          >
            {count || 0}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Nội dung',
      key: 'content',
      render: (_, record) => (
        <Space size="middle" style={{ color: '#64748b', fontSize: '0.875rem' }}>
          <Tooltip title="Số bài học">
            <span className="align-center-flex"><PlayCircleOutlined /> {record.video_count || 0}</span>
          </Tooltip>
          <Tooltip title="Số tài liệu">
            <span className="align-center-flex"><FileTextOutlined /> {record.document_count || 0}</span>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <div className="course-action-group">
          <Tooltip title="Chia sẻ khóa học">
            <Button
              shape="circle"
              icon={<ShareAltOutlined />}
              onClick={() => handleShare(record.id)}
              className="btn-action-share"
            />
          </Tooltip>
          <Tooltip title="Xem trước (Giao diện học viên)">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/course-info/${record.id}`)}
              className="btn-action-preview"
            />
          </Tooltip>
          <Tooltip title="Quản lý bài học & nội dung">
            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => navigate(`/teacher/courses/${record.id}/videos`)}
              className="btn-action-primary"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa thông tin">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="btn-action-secondary"
            />
          </Tooltip>
          <Tooltip title="Xóa khóa học">
            <Button
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              className="btn-action-danger"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="course-management-container">
      <div className="course-dashboard-header">
        <Row justify="space-between" align="bottom">
          <Col>
            <h1>Quản lý khóa học</h1>
            <p>Xây dựng và phát triển nội dung giảng dạy của bạn</p>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => setIsModalVisible(true)}
              className="btn-add-course"
              size="large"
            >
              <div className="btn-content-wrapper">
                <PlusOutlined />
                <span>Thêm khóa học mới</span>
              </div>
            </Button>
          </Col>
        </Row>
      </div>

      <div className="course-stats-grid">
        <div className="course-stat-card">
          <div className="stat-icon-wrapper blue">
            <BookOutlined />
          </div>
          <div className="stat-info">
            <h3>Tổng khóa học</h3>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper green">
            <TeamOutlined />
          </div>
          <div className="stat-info">
            <h3>Tổng học viên</h3>
            <div className="stat-value">{stats.totalStudents}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper purple">
            <PlayCircleOutlined />
          </div>
          <div className="stat-info">
            <h3>Đang công khai</h3>
            <div className="stat-value">{stats.publicCourses}</div>
          </div>
        </div>
      </div>

      <div className="course-filter-section">
        <div className="search-wrapper">
          <Input
            placeholder="Tìm kiếm theo tên khóa học..."
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ borderRadius: '10px', height: '42px' }}
          />
        </div>
        <Space size="middle">
          <span style={{ color: '#64748b', fontWeight: 500 }}>Bộ lọc:</span>
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={value => setStatusFilter(value)}
            className="premium-select"
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="public">Công khai</Option>
            <Option value="private">Riêng tư</Option>
          </Select>
        </Space>
      </div>

      <div className="premium-table-container">
        <Table
          columns={columns}
          dataSource={filteredCourses}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số ${total} khóa học`,
            style: { padding: '16px 24px' }
          }}
        />
      </div>

      <AddCourse
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSuccess={() => {
          setIsModalVisible(false);
          fetchCourses();
        }}
      />

      <EditCourse
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setSelectedCourse(null);
        }}
        onSuccess={() => {
          setIsEditModalVisible(false);
          setSelectedCourse(null);
          fetchCourses();
        }}
        courseData={selectedCourse}
      />

      <CourseStudents
        visible={isStudentsModalVisible}
        onCancel={() => {
          setIsStudentsModalVisible(false);
          setSelectedCourseId(null);
        }}
        courseId={selectedCourseId}
        onStudentRemoved={handleStudentRemoved}
      />
    </div>
  );
};

export default CourseManagement; 