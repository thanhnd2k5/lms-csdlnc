import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message, Row, Col, Collapse, Tag, Avatar, Divider, List, Modal, Form, Input, Select, Tooltip } from 'antd';
import {
  PlayCircleOutlined,
  FileOutlined,
  TeamOutlined,
  StarOutlined,
  ClockCircleOutlined,
  FilePdfOutlined,
  FormOutlined,
  RightOutlined,
  CheckCircleFilled,
  GlobalOutlined,
  ThunderboltOutlined,
  UserOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { getAssetUrl } from '../../utils/urlUtils';
import './course_info.css';

const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourseDetails();
    if (token) {
      checkEnrollmentStatus();
      fetchUserProfile();
    }
  }, [courseId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/courseEnroll/check/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEnrolled(response.data.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/courseEnroll/courses/${courseId}/details`);
      setCourseDetails(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      message.error('Không thể tải thông tin khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!token) {
      message.warning('Vui lòng đăng nhập để đăng ký khóa học');
      navigate('/login');
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/courseEnroll/enroll`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Đăng ký khóa học thành công');
      setIsEnrolled(true);
      navigate(`/course/${courseId}`);
    } catch (error) {
      message.error('Lỗi khi đăng ký khóa học');
    }
  };

  const handleStartLearning = () => {
    navigate(`/course/${courseId}`);
  };

  const handleEditSubmit = async (values) => {
    setSubmitting(true);
    try {
      // 1. Update Course Info
      await axios.put(
        `${process.env.REACT_APP_API_URL}/courses/${courseId}`,
        {
          title: values.title,
          description: values.description,
          level: values.level,
          requirements: values.requirements,
          highlights: values.highlights
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success('Cập nhật thông tin khóa học thành công');
      setIsEditModalVisible(false);
      fetchCourseDetails(); // Refresh Page
    } catch (error) {
      console.error('Error updating course:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật');
    } finally {
      setSubmitting(false);
    }
  };

  const isOwner = currentUser?.id === courseDetails?.teacher_id;

  if (loading) return (
    <div className="course-info-loading">
      <ThunderboltOutlined spin />
      <span>Đang tải hành trình của bạn...</span>
    </div>
  );

  if (!courseDetails) return (
    <div className="course-info-error">
      <h2>Không tìm thấy bến đỗ tri thức này</h2>
      <Button onClick={() => navigate('/')}>Quay lại trang chủ</Button>
    </div>
  );

  return (

    <div className="course-info-page">
      {/* Hero Section */}
      <div className="course-hero animate-fade-in">
        <div className="hero-overlay"></div>
        <div className="hero-content-container">
          <Row gutter={40} align="middle">
            <Col xs={24} lg={16}>
              <div className="hero-badge-container">
                <Tag color="blue" className="level-tag">{courseDetails.level || 'All Levels'}</Tag>
                <Tag color="gold" className="new-tag">Mới cập nhật</Tag>

              </div>
              <h1 className="course-title">{courseDetails.title}</h1>
              <p className="course-subtitle">{courseDetails.description}</p>


              <div className="hero-meta">
                <div className="meta-item">
                  <StarOutlined style={{ color: '#fadb14' }} />
                  <span>4.8 (1,240 đánh giá)</span>
                </div>
                <div className="meta-item">
                  <TeamOutlined />
                  <span>{courseDetails.total_students || 0} học viên</span>
                </div>
                <div className="meta-item">
                  <UserOutlined />
                  <span>Giảng viên: <strong>{courseDetails.teacher_name}</strong></span>
                </div>
                <div className="meta-item">
                  <ClockCircleOutlined />
                  <span>Cập nhật 04/2026</span>
                </div>
              </div>

              <div className="hero-language">
                <GlobalOutlined /> <span>Tiếng Việt</span>
              </div>

              {isOwner && (
                <div className="owner-actions">
                  <Button
                    type="primary"
                    className="btn-edit-page"
                    onClick={() => {
                      form.setFieldsValue({
                        title: courseDetails.title,
                        description: courseDetails.description,
                        level: courseDetails.level || 'All Levels',
                        highlights: courseDetails.highlights || [],
                        requirements: courseDetails.requirements || []
                      });
                      setIsEditModalVisible(true);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '100%' }}>
                      <EditOutlined style={{ fontSize: '18px' }} />
                      <span>Chỉnh sửa trang</span>
                    </div>
                  </Button>
                </div>

              )}
            </Col>
          </Row>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-main-layout">
        <Row gutter={48}>
          <Col xs={24} lg={16}>
            <div className="course-left-content animate-slide-up">
              {/* Highlights Section */}
              {courseDetails.highlights?.length > 0 && (
                <div className="info-section highlights-card">
                  <h2>Bạn sẽ học được gì?</h2>
                  <div className="highlights-grid">
                    {courseDetails.highlights.map((item, idx) => (
                      <div key={idx} className="highlight-item">
                        <CheckCircleFilled className="check-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOC Section */}
              <div className="info-section toc-section">
                <h2>Nội dung khóa học</h2>
                <div className="content-overview">
                  <span>{courseDetails.chapters?.length || 0} chương</span>
                  <Divider type="vertical" />
                  <span>{courseDetails.total_videos || 0} bài giảng</span>
                  <Divider type="vertical" />
                  <span>{courseDetails.total_documents || 0} tài liệu</span>
                </div>

                <Collapse
                  ghost
                  expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                  className="toc-collapse-modern"
                  defaultActiveKey={[courseDetails.chapters?.[0]?.id]}
                >
                  {courseDetails.chapters?.map((chapter) => (
                    <Collapse.Panel
                      header={
                        <div className="chapter-header-modern">
                          <span className="chapter-title">{chapter.title}</span>
                          <span className="chapter-count">{chapter.items?.length || 0} bài</span>
                        </div>
                      }
                      key={chapter.id}
                    >
                      <div className="chapter-items-modern">
                        {chapter.items?.length > 0 ? (
                          chapter.items.map((item) => (
                            <div key={`${item.type}-${item.id}`} className="toc-item-modern">
                              <div className="item-info">
                                <span className={`item-icon-modern ${item.type}`}>
                                  {item.type === 'video' && <PlayCircleOutlined />}
                                  {item.type === 'document' && <FilePdfOutlined />}
                                  {item.type === 'quiz' && <FormOutlined />}
                                </span>
                                <span className="item-name">{item.title}</span>
                              </div>
                              <span className="item-duration">
                                {item.type === 'video' ? '12:30' : ''}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="empty-chapter">Chương này đang được soạn thảo</div>
                        )}
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </div>

              {/* Requirements Section */}
              {courseDetails.requirements?.length > 0 && (
                <div className="info-section requirements-section">
                  <h2>Yêu cầu khóa học</h2>
                  <ul className="req-list">
                    {courseDetails.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructor Section */}
              <div className="info-section instructor-section">
                <h2>Giảng viên</h2>
                <div className="instructor-card-modern">
                  <div className="instructor-identity">
                    <Avatar
                      size={120}
                      src={getAssetUrl(courseDetails.teacher_avatar)}
                      icon={<UserOutlined />}
                      className="instructor-avatar"
                    />
                    <div className="instructor-info">
                      <h3>{courseDetails.teacher_name}</h3>
                      <p className="instructor-headline">Giảng viên chuyên nghiệp tại LMS Platform</p>
                      <div className="instructor-stats">
                        <span><StarOutlined /> 4.9 Xếp hạng</span>
                        <span><TeamOutlined /> 12,500 Học viên</span>
                        <span><PlayCircleOutlined /> 15 Khóa học</span>
                      </div>
                    </div>
                  </div>
                  <div className="instructor-bio">
                    <p>{courseDetails.teacher_bio || "Giảng viên tâm huyết với nhiều năm kinh nghiệm trong lĩnh vực này, luôn mong muốn truyền tải những kiến thức thực tế nhất đến học viên."}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Sticky Sidebar */}
          <Col xs={24} lg={8}>
            <div className="sticky-sidebar animate-slide-in-right">
              <Card className="enrollment-card-glass">
                <div className="course-thumbnail-container">
                  <img src={getAssetUrl(courseDetails.thumbnail)} alt="Thumbnail" />
                  <div className="play-overlay">
                    <PlayCircleOutlined />
                    <span>Xem giới thiệu</span>
                  </div>
                </div>

                <div className="card-body">
                  {!isEnrolled && (
                    <div className="course-price">
                      <span className="current-price">Miễn phí</span>
                      <span className="old-price">1.200.000đ</span>
                    </div>
                  )}

                  <div className="action-buttons">
                    {isEnrolled ? (
                      <>
                        <div className="enrolled-status-banner">
                          <CheckCircleFilled />
                          <span>Bạn đã sở hữu khóa học này</span>
                        </div>
                        <Button
                          type="primary"
                          size="large"
                          block
                          className="btn-start"
                          onClick={handleStartLearning}
                        >
                          Vào học ngay
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="primary"
                          size="large"
                          block
                          className="btn-enroll"
                          onClick={handleEnroll}
                        >
                          Đăng ký ngay
                        </Button>
                        <Button block size="large" className="btn-save">Lưu vào yêu thích</Button>
                      </>
                    )}
                  </div>

                  <div className="course-features">
                    <p>Khóa học này bao gồm:</p>
                    <List
                      split={false}
                      dataSource={[
                        { icon: <PlayCircleOutlined />, text: `${courseDetails.total_videos || 0} bài giảng video` },
                        { icon: <FilePdfOutlined />, text: `${courseDetails.total_documents || 0} tài liệu tải xuống` },
                        { icon: <ClockCircleOutlined />, text: 'Truy cập trọn đời' },
                        { icon: <ThunderboltOutlined />, text: 'Học trên mọi thiết bị' },
                        { icon: <StarOutlined />, text: 'Cấp chứng nhận hoàn thành' }
                      ]}
                      renderItem={item => (
                        <List.Item>
                          {item.icon} <span>{item.text}</span>
                        </List.Item>
                      )}
                    />
                  </div>

                  {!isEnrolled && (
                    <div className="coupon-section">
                      <Button type="link">Bạn có mã giảm giá?</Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* Edit Modal */}
      <Modal
        title={<div className="modal-title-modern">Thiết lập khóa học</div>}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
        className="course-edit-modal-dark"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={{
            level: 'All Levels'
          }}
        >
          <div className="form-section-modern">
            <h3>Thông tin cơ bản</h3>
            <Form.Item label="Tiêu đề khóa học" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Mô tả tóm tắt" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Trình độ" name="level">
              <Select size="large">
                <Select.Option value="Beginner">Beginner (Cơ bản)</Select.Option>
                <Select.Option value="Intermediate">Intermediate (Trung cấp)</Select.Option>
                <Select.Option value="Advanced">Advanced (Nâng cao)</Select.Option>
                <Select.Option value="All Levels">All Levels (Mọi trình độ)</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="form-section-modern">
            <h3>Bạn sẽ học được gì? (Highlights)</h3>
            <Form.List name="highlights">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="dynamic-form-item">
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[{ required: true, whitespace: true, message: "Vui lòng nhập nội dung hoặc xóa." }]}
                        style={{ flex: 1, marginBottom: 12 }}
                      >
                        <Input placeholder="Ví dụ: Thành thạo React Hook trong 2 giờ..." />
                      </Form.Item>
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm mục tiêu học tập
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div className="form-section-modern">
            <h3>Yêu cầu khóa học (Requirements)</h3>
            <Form.List name="requirements">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="dynamic-form-item">
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[{ required: true, whitespace: true, message: "Vui lòng nhập nội dung hoặc xóa." }]}
                        style={{ flex: 1, marginBottom: 12 }}
                      >
                        <Input placeholder="Ví dụ: Kiến thức cơ bản về HTML/CSS..." />
                      </Form.Item>
                      <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Thêm yêu cầu đầu vào
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div className="modal-footer-actions">
            <Button onClick={() => setIsEditModalVisible(false)} size="large">Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" size="large" loading={submitting}>
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseInfo; 