import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Modal, Tag, Input, Select, Badge, Tooltip, Dropdown, Menu } from 'antd';
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
  MoreOutlined
} from '@ant-design/icons';
import './QuizManagement.css';
import AddQuizModal from './AddQuizModal';
import EditQuizModal from './EditQuizModal';

const { confirm } = Modal;
const { Option } = Select;

const QuizManagementBase = ({
  quizzes,
  courses,
  loading,
  onDelete,
  onRefresh, // Thay đổi prop để làm mới dữ liệu
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
      render: (_, record) => (
        <div className="quiz-title-cell">
          <span className="quiz-main-title">{record.title}</span>
          <span className="quiz-sub-title">ID: #{record.id}</span>
        </div>
      ),
    },
    {
      title: 'Khóa học',
      key: 'course',
      render: (_, record) => {
        let courseId = record.course_id;
        if (!courseId) {
          if (record.video) courseId = record.video.course_id;
          else if (record.chapter) courseId = record.chapter.course_id;
        }
        const course = courses.find(c => c.id === courseId);
        return course ? (
          <Tag color="blue" className="assigned-tag">{course.title}</Tag>
        ) : (
          <Tag color="default" className="assigned-tag">Chưa gán</Tag>
        );
      }
    },
    {
      title: 'Vị trí gán',
      key: 'assigned_to',
      render: (_, record) => {
        if (record.video_id) {
          return (
            <Space direction="vertical" size={0}>
              <Tag color="cyan" className="assigned-tag">Video</Tag>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{record.video_title || 'ID: ' + record.video_id}</span>
            </Space>
          );
        } else if (record.chapter_id) {
          return (
            <Space direction="vertical" size={0}>
              <Tag color="purple" className="assigned-tag">Chương</Tag>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{record.chapter_title || 'ID: ' + record.chapter_id}</span>
            </Space>
          );
        }
        return <Tag className="assigned-tag">Tự do</Tag>;
      }
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question_count',
      key: 'question_count',
      align: 'center',
      render: (count, record) => (
        <div className="question-count-badge" onClick={() => onQuestionClick(record)}>
          <FileTextOutlined />
          <span>{count || 0}</span>
        </div>
      )
    },
    {
      title: 'Cài đặt',
      key: 'settings',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
            <ClockCircleOutlined style={{ fontSize: '12px' }} />
            <span>{record.duration_minutes || record.duration || 0} phút</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}>
            <CheckCircleOutlined style={{ fontSize: '12px' }} />
            <span>Đạt: {record.passing_score}%</span>
          </div>
        </div>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      width: 200,
      render: (_, record) => {
        const menuItems = [
          {
            key: 'edit',
            label: 'Chỉnh sửa thông tin',
            icon: <EditOutlined />,
            onClick: () => {
              setSelectedQuiz(record);
              setIsEditModalOpen(true);
            },
          },
          {
            key: 'delete',
            label: 'Xóa Quiz',
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => handleDelete(record.id),
          },
        ];

        return (
          <div className="modern-action-group">
            <Tooltip title="Cấu trúc câu hỏi">
              <Button 
                type="primary" 
                shape="circle"
                icon={<FileTextOutlined />}
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
        );
      },
    },
  ];

  return (
    <div className="quiz-management-container">
      {/* Dashboard Header */}
      <div className="quiz-dashboard-header">
        <div className="quiz-header-top">
          <div className="quiz-header-title">
            <h2>Quản lý Quiz</h2>
            <p>Tạo và quản lý các bài kiểm tra đánh giá năng lực học viên</p>
          </div>
          <div className="quiz-header-actions">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
              style={{ borderRadius: '10px', height: '44px', fontWeight: 600 }}
            >
              Tạo Quiz Mới
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="quiz-stats-grid">
          <div className="quiz-stat-card">
            <div className="stat-icon-wrapper blue">
              <FileTextOutlined />
            </div>
            <div className="stat-info">
              <h3>Tổng số Quiz</h3>
              <div className="stat-value">{stats.total}</div>
            </div>
          </div>
          <div className="quiz-stat-card">
            <div className="stat-icon-wrapper purple">
              <ProjectOutlined />
            </div>
            <div className="stat-info">
              <h3>Đã gán</h3>
              <div className="stat-value">{stats.assigned}</div>
            </div>
          </div>
          <div className="quiz-stat-card">
            <div className="stat-icon-wrapper green">
              <CheckCircleOutlined />
            </div>
            <div className="stat-info">
              <h3>Tổng câu hỏi</h3>
              <div className="stat-value">{stats.totalQuestions}</div>
            </div>
          </div>
          <div className="quiz-stat-card">
            <div className="stat-icon-wrapper orange">
              <ClockCircleOutlined />
            </div>
            <div className="stat-info">
              <h3>Thời gian TB</h3>
              <div className="stat-value">{stats.avgDuration} phút</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="quiz-filter-bar">
          <div className="filter-left">
            <Input
              placeholder="Tìm kiếm theo tiêu đề..."
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300, borderRadius: '10px' }}
            />
            <Select
              defaultValue="all"
              style={{ width: 220 }}
              onChange={setCourseFilter}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Tất cả khóa học</Option>
              {courses.map(course => (
                <Option key={course.id} value={course.id}>{course.title}</Option>
              ))}
            </Select>
          </div>
          <div className="filter-right">
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Hiển thị <b>{filteredQuizzes.length}</b> kết quả
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="premium-table-container">
        <Table
          columns={columns}
          dataSource={filteredQuizzes}
          loading={loading}
          rowKey="id"
          className="premium-table"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Tổng số ${total} mục`,
            position: ['bottomRight']
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