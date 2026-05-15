import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, message, Select, Upload, Divider, Row, Col, Typography, ConfigProvider, Button } from 'antd';
import axios from 'axios';
import { LoadingOutlined, BookOutlined, TeamOutlined, LockOutlined, SettingOutlined, PictureOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getAssetUrl } from '../../../utils/urlUtils';
import { THUMBNAIL_TEMPLATES } from '../../../utils/classUtils';

const { Option } = Select;
const { Text } = Typography;

// --- PREMIUM SELECT WITH REF FORWARDING (FIXES DEFAULT VALUE) ---
const PremiumSelect = React.forwardRef(({ icon, children, ...props }, ref) => (
    <div className="select-with-icon-wrapper">
        <span className="field-icon">{icon}</span>
        <Select {...props} ref={ref} style={{ width: '100%', ...props.style }}>
            {children}
        </Select>
    </div>
));

const EditClass = ({ visible, onCancel, onSuccess, classData }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [requiresPassword, setRequiresPassword] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);

    useEffect(() => {
        if (classData) {
            const hasValidPassword = classData.password && classData.password !== '0' && classData.password !== 0;

            form.setFieldsValue({
                name: classData.name,
                description: classData.description,
                max_students: classData.max_students,
                status: classData.status,
                password: hasValidPassword ? classData.password : undefined
            });

            setRequiresPassword(hasValidPassword);
            setImageUrl(classData.thumbnail || '');
        }
    }, [classData, form]);

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên file ảnh!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Ảnh phải nhỏ hơn 5MB!');
        }
        return isImage && isLt5M;
    };

    const handleUpload = async (options) => {
        const { onSuccess: uploadSuccess, onError, file } = options;
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('thumbnail', file);

        try {
            setUploadLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/teacher/classes/upload-thumbnail`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setImageUrl(response.data.url);
            uploadSuccess('Ok');
            message.success('Tải ảnh lên thành công!');
        } catch (err) {
            onError({ err });
            message.error('Tải ảnh lên thất bại.');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/teacher/classes/${classData.id}`,
                {
                    ...values,
                    requires_password: requiresPassword,
                    password: requiresPassword ? values.password : null,
                    thumbnail: imageUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                message.success('Cập nhật lớp học thành công');
                onSuccess();
                onCancel();
            }
        } catch (error) {
            console.error('Error updating class:', error);
            message.error('Không thể cập nhật lớp học');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6366f1',
                    borderRadius: 12,
                    controlHeight: 48,
                    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                },
                components: {
                    Input: { paddingInline: 16 },
                    Select: { paddingInline: 16 },
                    InputNumber: { paddingInline: 16 },
                    Button: {
                        paddingInline: 24,
                        fontWeight: 600,
                    }
                }
            }}
        >
            <Modal
                title="Chỉnh sửa lớp học"
                open={visible}
                onCancel={onCancel}
                onOk={() => form.submit()}
                confirmLoading={loading}
                okText={
                    <div className="btn-content-wrapper">
                        <EditOutlined />
                        <span>Cập nhật lớp học</span>
                    </div>
                }
                cancelText="Hủy"
                className="premium-modal"
                width={850}
                style={{ top: 40 }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    id="premium-course-form"
                >
                    <Row gutter={32}>
                        <Col span={14}>
                            <Form.Item
                                name="name"
                                label="Tên lớp học"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên lớp học' },
                                    { max: 255, message: 'Tên lớp học không được quá 255 ký tự' }
                                ]}
                            >
                                <Input prefix={<BookOutlined className="field-icon-blue" />} placeholder="Nhập tên lớp học" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả lớp học"
                            >
                                <Input.TextArea
                                    placeholder="Nhập mô tả về lớp học"
                                    rows={4}
                                    style={{ borderRadius: '12px' }}
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="max_students"
                                        label="Học viên tối đa"
                                        rules={[{ required: true, message: 'Vui lòng nhập số học viên' }]}
                                    >
                                        <InputNumber
                                            prefix={<TeamOutlined className="field-icon-blue" />}
                                            min={1}
                                            max={1000}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="status"
                                        label="Trạng thái"
                                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                                    >
                                        <PremiumSelect icon={<SettingOutlined />}>
                                            <Option value="active">Đang hoạt động</Option>
                                            <Option value="inactive">Tạm khóa</Option>
                                        </PremiumSelect>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider style={{ margin: '12px 0 20px 0' }} />

                            <div style={{ background: '#f8fafc', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: requiresPassword ? '16px' : 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <LockOutlined style={{ color: '#6366f1' }} />
                                        <span style={{ fontWeight: 600, color: '#475569' }}>Bảo mật lớp học</span>
                                    </div>
                                    <Switch
                                        checked={requiresPassword}
                                        onChange={(checked) => {
                                            setRequiresPassword(checked);
                                            if (!checked) {
                                                form.setFieldValue('password', undefined);
                                            }
                                        }}
                                    />
                                </div>

                                {requiresPassword && (
                                    <Form.Item
                                        name="password"
                                        style={{ marginBottom: 0 }}
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mật khẩu' },
                                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu cho lớp học" />
                                    </Form.Item>
                                )}
                            </div>
                        </Col>

                        <Col span={10}>
                            <Form.Item label="Ảnh đại diện lớp học (16:9)" style={{ marginBottom: 0 }}>
                                <Upload
                                    name="thumbnail"
                                    listType="picture"
                                    showUploadList={false}
                                    customRequest={handleUpload}
                                    beforeUpload={beforeUpload}
                                    className="premium-thumbnail-upload"
                                >
                                    <div className="premium-upload-container">
                                        {imageUrl ? (
                                            <img
                                                src={getAssetUrl(imageUrl)}
                                                alt="thumbnail"
                                            />
                                        ) : (
                                            <div className="premium-upload-placeholder">
                                                {uploadLoading ? (
                                                    <LoadingOutlined style={{ fontSize: '32px', color: '#3b82f6' }} />
                                                ) : (
                                                    <>
                                                        <PictureOutlined />
                                                        <span className="upload-text">Tải ảnh lên</span>
                                                        <span className="upload-hint">PNG, JPG, WebP tối đa 5MB</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Upload>

                                <div className="premium-tip-box">
                                    <InfoCircleOutlined />
                                    <div>
                                        <Text strong style={{ color: '#1e40af', display: 'block', marginBottom: '4px', fontSize: '15px' }}>Lưu ý</Text>
                                        <Text style={{ color: '#1e40af', fontSize: '13px', lineHeight: '1.5' }}>
                                            Khi thay đổi ảnh đại diện, ảnh cũ sẽ tự động được gỡ bỏ khỏi hệ thống. Hãy chọn ảnh có tỷ lệ 16:9.
                                        </Text>
                                    </div>
                                </div>

                                <Divider style={{ margin: '20px 0' }}>Hoặc chọn từ thư viện mẫu</Divider>
                                
                                <div className="thumbnail-templates-grid">
                                    {THUMBNAIL_TEMPLATES.map(template => (
                                        <div 
                                            key={template.id} 
                                            className={`template-item ${imageUrl === template.url ? 'active' : ''}`}
                                            onClick={() => setImageUrl(template.url)}
                                        >
                                            <img src={template.url} alt={template.title} />
                                            <div className="template-name">{template.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default EditClass;
