import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, message, Space, Modal, Typography, Row, Col, Empty, Tooltip, Tag } from 'antd';
import { 
    DeleteOutlined, 
    PlusOutlined, 
    ArrowLeftOutlined,
    BookOutlined,
    PlayCircleOutlined,
    TeamOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/urlUtils';
import './ClassManagement.css';

const { confirm } = Modal;
const { Title, Text } = Typography;

const ClassCourseManagement = () => {
    const { classId } = useParams();
    const [courses, setCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [classInfo, setClassInfo] = useState(null);
    const navigate = useNavigate();

    const fetchClassInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/classes`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                const currentClass = response.data.data.find(c => c.id === parseInt(classId));
                setClassInfo(currentClass);
            }
        } catch (error) {
            console.error('Error fetching class info:', error);
        }
    };

    const fetchClassCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/teacher/classes/${classId}/courses`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setCourses(response.data.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableCourses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/teacher/courses`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data) {
                setAvailableCourses(response.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách khóa học có sẵn');
        }
    };

    useEffect(() => {
        fetchClassCourses();
        fetchClassInfo();
    }, [classId]);

    const handleDelete = (courseId) => {
        confirm({
            title: 'Xóa khóa học khỏi lớp',
            content: 'Bạn có chắc chắn muốn xóa khóa học này? Học viên trong lớp sẽ không còn truy cập được khóa học này nữa.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(
                        `${process.env.REACT_APP_API_URL}/teacher/classes/${classId}/courses/${courseId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    message.success('Đã xóa khóa học khỏi lớp');
                    fetchClassCourses();
                } catch (error) {
                    message.error('Không thể xóa khóa học khỏi lớp');
                }
            }
        });
    };

    const handleAddCourse = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/teacher/classes/${classId}/courses`,
                { courseId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                message.success('Đã thêm khóa học vào lớp');
                setIsModalVisible(false);
                fetchClassCourses();
            }
        } catch (error) {
            message.error('Không thể thêm khóa học vào lớp');
        }
    };

    const columns = [
        {
            title: 'Khóa học',
            key: 'course_info',
            width: '40%',
            render: (_, record) => (
                <div className="align-center-flex" style={{ gap: '16px' }}>
                    <img 
                        src={getAssetUrl(record.thumbnail)} 
                        alt="thumb" 
                        className="class-thumbnail-mini"
                        onError={(e) => e.target.src = 'https://placehold.co/100x60?text=Course'}
                    />
                    <div className="class-title-cell">
                        <div className="class-main-title">{record.title}</div>
                        <div className="class-desc-sub">
                            <Text type="secondary" style={{ fontSize: '12px' }} ellipsis={{ tooltip: record.description }}>
                                {record.description || 'Chưa có mô tả cho khóa học này'}
                            </Text>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Bài giảng',
            dataIndex: 'video_count',
            key: 'video_count',
            align: 'center',
            render: (count) => (
                <div className="align-center-flex" style={{ color: '#64748b' }}>
                    <PlayCircleOutlined /> {count || 0} bài
                </div>
            )
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: () => <Tag color="blue" style={{ borderRadius: '6px' }}>ĐANG GIẢNG DẠY</Tag>
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="course-action-group">
                    <Tooltip title="Xem nội dung bài giảng">
                        <Button
                            type="text"
                            icon={<PlayCircleOutlined />}
                            onClick={() => navigate(`/teacher/courses/${record.id}/videos`)}
                            className="btn-action-secondary"
                        />
                    </Tooltip>
                    <Tooltip title="Gỡ khỏi lớp học">
                        <Button
                            type="text"
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
                        <Button 
                            type="link" 
                            icon={<ArrowLeftOutlined />} 
                            onClick={() => navigate('/teacher/classes')}
                            style={{ padding: 0, marginBottom: '8px', color: '#64748b' }}
                        >
                            Quay lại danh sách lớp
                        </Button>
                        <h1>Quản lý khóa học - {classInfo?.name || 'Đang tải...'}</h1>
                        <p>Điều phối nội dung giảng dạy và tài liệu cho lớp học này</p>
                    </Col>
                    <Col>
                        <Button 
                            type="primary" 
                            onClick={() => {
                                fetchAvailableCourses();
                                setIsModalVisible(true);
                            }}
                            className="btn-add-course"
                            size="large"
                        >
                            <div className="btn-content-wrapper">
                                <PlusOutlined />
                                <span>Thêm khóa học</span>
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
                        <div className="stat-value">{courses.length}</div>
                    </div>
                </div>
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper purple">
                        <TeamOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Sĩ số lớp</h3>
                        <div className="stat-value">{classInfo?.student_count || 0}</div>
                    </div>
                </div>
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper orange">
                        <InfoCircleOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Mã lớp học</h3>
                        <div className="stat-value" style={{ fontSize: '1.2rem' }}>{classInfo?.class_code}</div>
                    </div>
                </div>
            </div>

            <div className="premium-table-container">
                <Table
                    columns={columns}
                    dataSource={courses}
                    loading={loading}
                    rowKey="id"
                    pagination={false}
                    locale={{
                        emptyText: <Empty description="Chưa có khóa học nào trong lớp này" />
                    }}
                />
            </div>

            <Modal
                title="Chọn khóa học để thêm vào lớp"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
                className="premium-modal"
            >
                <div style={{ padding: '8px 0' }}>
                    <Table
                        columns={[
                            {
                                title: 'Khóa học',
                                key: 'course',
                                render: (_, record) => (
                                    <Space>
                                        <img 
                                            src={getAssetUrl(record.thumbnail)} 
                                            alt="thumb" 
                                            style={{ width: 60, height: 36, borderRadius: 6, objectFit: 'cover' }}
                                            onError={(e) => e.target.src = 'https://placehold.co/100x60?text=Course'}
                                        />
                                        <Text strong>{record.title}</Text>
                                    </Space>
                                )
                            },
                            {
                                title: 'Thao tác',
                                key: 'action',
                                align: 'right',
                                render: (_, record) => (
                                    <Button
                                        type="primary"
                                        onClick={() => handleAddCourse(record.id)}
                                        style={{ borderRadius: '8px' }}
                                    >
                                        Thêm ngay
                                    </Button>
                                ),
                            },
                        ]}
                        dataSource={availableCourses.filter(
                            course => !courses.some(c => c.id === course.id)
                        )}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        locale={{
                            emptyText: <Empty description="Không còn khóa học nào khả dụng" />
                        }}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ClassCourseManagement;
