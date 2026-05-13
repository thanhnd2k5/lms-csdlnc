import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, message, Space, Tag, Modal, Row, Col, Typography, Input, Tooltip, Empty } from 'antd';
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  TeamOutlined,
  BookOutlined,
  CheckCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateClass from './createClass';
import EditClass from './editClass';
import { getAssetUrl } from '../../../utils/urlUtils';
import './ClassManagement.css';

const { confirm } = Modal;
const { Title, Text } = Typography;

const ClassManagement = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/classes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setClasses(response.data.data);
            }
        } catch (error) {
            message.error('Không thể tải danh sách lớp học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const stats = useMemo(() => {
        const total = classes.length;
        const totalStudents = classes.reduce((acc, c) => acc + (c.student_count || 0), 0);
        const activeClasses = classes.filter(c => c.status === 'active').length;
        const totalCourses = classes.reduce((acc, c) => acc + (c.course_count || 0), 0);
        return { total, totalStudents, activeClasses, totalCourses };
    }, [classes]);

    const filteredClasses = useMemo(() => {
        if (!searchText) return classes;
        const lowerSearch = searchText.toLowerCase();
        return classes.filter(c => 
            c.name.toLowerCase().includes(lowerSearch) || 
            c.class_code.toLowerCase().includes(lowerSearch)
        );
    }, [classes, searchText]);

    const handleDelete = async (classId) => {
        confirm({
            title: 'Xác nhận xóa lớp học',
            content: 'Bạn có chắc chắn muốn xóa lớp học này? Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${process.env.REACT_APP_API_URL}/teacher/classes/${classId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    message.success('Xóa lớp học thành công');
                    fetchClasses();
                } catch (error) {
                    message.error('Không thể xóa lớp học');
                }
            }
        });
    };

    const columns = [
        {
            title: 'Lớp học',
            key: 'class_info',
            width: '35%',
            render: (_, record) => (
                <Space size="middle">
                    <img
                        src={getAssetUrl(record.thumbnail)}
                        alt="thumb"
                        className="class-thumbnail-mini"
                        onError={(e) => { e.target.src = 'https://placehold.co/100x60?text=Class' }}
                    />
                    <div className="class-title-cell">
                        <span className="class-main-title">{record.name}</span>
                        <span className="class-code-sub">Mã lớp: {record.class_code}</span>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Học viên',
            dataIndex: 'student_count',
            key: 'student_count',
            align: 'center',
            render: (count) => (
                <div className="align-center-flex" style={{ fontWeight: 600, color: '#6366f1' }}>
                    <TeamOutlined /> {count || 0}
                </div>
            ),
        },
        {
            title: 'Khóa học',
            dataIndex: 'course_count',
            key: 'course_count',
            align: 'center',
            render: (count) => (
                <div className="align-center-flex" style={{ fontWeight: 600, color: '#8b5cf6' }}>
                    <BookOutlined /> {count || 0}
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'} style={{ borderRadius: '6px', fontWeight: 600 }}>
                    {status === 'active' ? 'ĐANG HOẠT ĐỘNG' : 'ĐÃ ĐÓNG'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <div className="course-action-group">
                    <Tooltip title="Quản lý khóa học trong lớp">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
                            onClick={() => navigate(`/teacher/classes/${record.id}/courses`)}
                            className="btn-action-primary"
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setSelectedClass(record);
                                setIsEditModalVisible(true);
                            }}
                            className="btn-action-secondary"
                        />
                    </Tooltip>
                    <Tooltip title="Xóa lớp học">
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
                        <h1>Quản lý lớp học</h1>
                        <p>Tổ chức và điều phối lộ trình học tập cho các nhóm học viên</p>
                    </Col>
                    <Col>
                        <Button 
                            type="primary" 
                            onClick={() => setIsCreateModalVisible(true)}
                            className="btn-add-course"
                            size="large"
                        >
                            <div className="btn-content-wrapper">
                                <PlusOutlined />
                                <span>Tạo lớp học mới</span>
                            </div>
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="course-stats-grid">
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper blue">
                        <TeamOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Tổng lớp học</h3>
                        <div className="stat-value">{stats.total}</div>
                    </div>
                </div>
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper purple">
                        <TeamOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Tổng học viên</h3>
                        <div className="stat-value">{stats.totalStudents}</div>
                    </div>
                </div>
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper green">
                        <CheckCircleOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Đang hoạt động</h3>
                        <div className="stat-value">{stats.activeClasses}</div>
                    </div>
                </div>
                <div className="course-stat-card">
                    <div className="stat-icon-wrapper orange">
                        <BookOutlined />
                    </div>
                    <div className="stat-info">
                        <h3>Tổng khóa học</h3>
                        <div className="stat-value">{stats.totalCourses}</div>
                    </div>
                </div>
            </div>

            <div className="course-filter-section">
                <div className="search-wrapper">
                    <Input
                        placeholder="Tìm kiếm theo tên lớp hoặc mã lớp..."
                        prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ borderRadius: '10px', height: '42px' }}
                        allowClear
                    />
                </div>
                <div className="toolbar-actions">
                    <Text type="secondary">Đang hiển thị <strong>{filteredClasses.length}</strong> lớp học</Text>
                </div>
            </div>

            <div className="premium-table-container">
                <Table 
                    columns={columns} 
                    dataSource={filteredClasses} 
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng số ${total} lớp học`,
                        style: { padding: '16px 24px' }
                    }}
                    locale={{
                        emptyText: <Empty description="Không tìm thấy lớp học nào" />
                    }}
                />
            </div>

            <CreateClass
                visible={isCreateModalVisible}
                onCancel={() => setIsCreateModalVisible(false)}
                onSuccess={() => {
                    setIsCreateModalVisible(false);
                    fetchClasses();
                }}
            />

            <EditClass
                visible={isEditModalVisible}
                onCancel={() => {
                    setIsEditModalVisible(false);
                    setSelectedClass(null);
                }}
                onSuccess={() => {
                    setIsEditModalVisible(false);
                    setSelectedClass(null);
                    fetchClasses();
                }}
                classData={selectedClass}
            />
        </div>
    );
};

export default ClassManagement;