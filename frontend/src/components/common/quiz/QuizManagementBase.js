import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Modal, Tag, Input, Select, Tooltip, Row, Col, Typography, Empty } from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ProjectOutlined,
  FilterOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import './QuizManagement.css';
import AddQuizModal from './AddQuizModal';
import EditQuizModal from './EditQuizModal';

const { confirm } = Modal;
const { Option } = Select;
const { Text } = Typography;

const QuizManagementBase = ({
  quizzes,
  courses,
  loading,
  onDelete,
  onRefresh,
  onQuestionClick,
  role
}) => {
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const stats = useMemo(() => {
    const total = quizzes.length;
    const assigned = quizzes.filter(q => q.video_id || q.chapter_id).length;
    const totalQuestions = quizzes.reduce((acc, q) => acc + (q.question_count || 0), 0);
    const avgDuration = total > 0 ? Math.round(quizzes.reduce((acc, q) => acc + (q.duration_minutes || q.duration || 0), 0) / total) : 0;
    
    return { total, assigned, totalQuestions, avgDuration };
  }, [quizzes]);

  const filteredQuizzes = quizzes.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCourse = courseFilter === 'all' || q.course_id === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleDelete = (quizId) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa quiz này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        onDelete(quizId);
      },
    });
  };

  const columns = [
    {
      title: 'Thông tin Quiz',
      key: 'quiz_info',
      width: '30%',
      render: (_, record) => (
        <div className="quiz-title-cell">
          <span className="quiz-main-title">{record.title}</span>
          <span className="quiz-sub-title">ID: #{record.id}</span>
        </div>
      ),
    },
    {
      title: 'Khóa học liên quan',
      key: 'course',
      render: (_, record) => {
        let courseId = record.course_id;
        if (!courseId) {
          if (record.video) courseId = record.video.course_id;
          else if (record.chapter) courseId = record.chapter.course_id;
        }
        const course = courses.find(c => c.id === courseId);
        return course ? (
          <Tag color="blue" style={{ borderRadius: '6px', fontWeight: 600 }}>{course.title}</Tag>
        ) : (
          <Tag color="default" style={{ borderRadius: '6px' }}>CHƯA GÁN</Tag>
        );
      }
    },
    {
      title: 'Vị trí gán',
      key: 'assigned_to',
      render: (_, record) => {
        if (record.video_id) {
          return (
            <div className="align-center-flex">
              <Tag color="cyan" style={{ borderRadius: '6px' }}>VIDEO</Tag>
              <Text type="secondary" style={{ fontSize: '12px' }} ellipsis>{record.video_title || 'ID: ' + record.video_id}</Text>
            </div>
          );
        } else if (record.chapter_id) {
          return (
            <div className="align-center-flex">
              <Tag color="purple" style={{ borderRadius: '6px' }}>CHƯƠNG</Tag>
              <Text type="secondary" style={{ fontSize: '12px' }} ellipsis>{record.chapter_title || 'ID: ' + record.chapter_id}</Text>
            </div>
          );
        }
        return <Tag style={{ borderRadius: '6px' }}>TỰ DO</Tag>;
      }
    },
    {
      title: 'Cấu trúc',
      key: 'structure',
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Xem chi tiết câu hỏi">
          <Button 
            type="text" 
            className="align-center-flex"
            icon={<FileTextOutlined style={{ color: '#6366f1' }} />} 
            onClick={() => onQuestionClick(record)}
            style={{ fontWeight: 600 }}
          >
            {record.question_count || 0} câu
          </Button>
        </Tooltip>
      )
    },
    {
      title: 'Cài đặt',
      key: 'settings',
      render: (_, record) => (
        <div className="quiz-settings-cell">
          <span className="align-center-flex"><ClockCircleOutlined /> {record.duration_minutes || record.duration || 0} phút</span>
          <span className="align-center-flex"><CheckCircleOutlined /> Đạt: {record.passing_score}%</span>
        </div>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <div className="course-action-group">
          <Tooltip title="Quản lý câu hỏi">
            <Button 
              type="primary" 
              shape="circle"
              icon={<UnorderedListOutlined />}
              onClick={() => onQuestionClick(record)}
              className="btn-action-primary"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedQuiz(record);
                setIsEditModalOpen(true);
              }}
              className="btn-action-secondary"
            />
          </Tooltip>
          <Tooltip title="Xóa Quiz">
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
            <h1>Quản lý Quiz</h1>
            <p>Xây dựng hệ thống câu hỏi đánh giá năng lực học viên</p>
          </Col>
          <Col>
            <Button 
              type="primary" 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-add-course"
              size="large"
            >
              <div className="btn-content-wrapper">
                <PlusOutlined />
                <span>Tạo Quiz mới</span>
              </div>
            </Button>
          </Col>
        </Row>
      </div>

      <div className="course-stats-grid">
        <div className="course-stat-card">
          <div className="stat-icon-wrapper blue">
            <FileTextOutlined />
          </div>
          <div className="stat-info">
            <h3>Tổng số Quiz</h3>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper purple">
            <ProjectOutlined />
          </div>
          <div className="stat-info">
            <h3>Đã gán</h3>
            <div className="stat-value">{stats.assigned}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircleOutlined />
          </div>
          <div className="stat-info">
            <h3>Tổng câu hỏi</h3>
            <div className="stat-value">{stats.totalQuestions}</div>
          </div>
        </div>
        <div className="course-stat-card">
          <div className="stat-icon-wrapper orange">
            <ClockCircleOutlined />
          </div>
          <div className="stat-info">
            <h3>Thời gian TB</h3>
            <div className="stat-value">{stats.avgDuration} phút</div>
          </div>
        </div>
      </div>

      <div className="course-filter-section">
        <div className="search-wrapper">
          <Input
            placeholder="Tìm kiếm theo tên quiz..."
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ borderRadius: '10px', height: '42px' }}
            allowClear
          />
        </div>
        <Space size="middle">
          <span style={{ color: '#64748b', fontWeight: 500 }}>Khóa học:</span>
          <Select 
            defaultValue="all" 
            style={{ width: 220 }} 
            onChange={setCourseFilter}
            className="premium-select"
          >
            <Option value="all">Tất cả khóa học</Option>
            {courses.map(course => (
              <Option key={course.id} value={course.id}>{course.title}</Option>
            ))}
          </Select>
        </Space>
      </div>

      <div className="premium-table-container">
        <Table
          columns={columns}
          dataSource={filteredQuizzes}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số ${total} mục`,
            style: { padding: '16px 24px' }
          }}
          locale={{
            emptyText: <Empty description="Không tìm thấy Quiz nào" />
          }}
        />
      </div>

      <AddQuizModal
        visible={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          onRefresh();
        }}
      />

      <EditQuizModal
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          setIsEditModalOpen(false);
          onRefresh();
        }}
        quizData={selectedQuiz}
      />
    </div>
  );
};

export default QuizManagementBase;