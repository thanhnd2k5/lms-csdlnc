import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Switch, message, Select, Upload, Divider, Row, Col } from 'antd';
import axios from 'axios';
import { 
    LoadingOutlined, 
    PlusOutlined, 
    BookOutlined, 
    TeamOutlined, 
    LockOutlined,
    FileTextOutlined,
    SettingOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { getAssetUrl } from '../../../utils/urlUtils';

const { Option } = Select;

const CreateClass = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [requiresPassword, setRequiresPassword] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);

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
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/teacher/classes`,
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
                message.success('Tạo lớp học thành công');
                form.resetFields();
                setImageUrl('');
                onSuccess();
                onCancel();
            }
        } catch (error) {
            console.error('Error creating class:', error);
            message.error('Không thể tạo lớp học');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Tạo lớp học mới"
            open={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okText="Tạo lớp"
            cancelText="Hủy"
            className="premium-modal"
            width={600}
            style={{ top: 40 }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                id="premium-course-form"
                initialValues={{
                    max_students: 100,
                    status: 'active'
                }}
            >
                <Form.Item
                    name="name"
                    label="Tên lớp học"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên lớp học' },
                        { max: 255, message: 'Tên lớp học không được quá 255 ký tự' }
                    ]}
                >
                    <Input prefix={<BookOutlined />} placeholder="Ví dụ: Lớp ReactJS nâng cao K20" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả lớp học"
                >
                    <Input.TextArea 
                        prefix={<FileTextOutlined />}
                        placeholder="Nhập mô tả về mục tiêu hoặc yêu cầu của lớp học" 
                        rows={3}
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
                                prefix={<TeamOutlined />}
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
                            <Select prefix={<SettingOutlined />}>
                                <Option value="active">Đang hoạt động</Option>
                                <Option value="inactive">Tạm khóa</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Divider style={{ margin: '12px 0 20px 0' }} />

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: requiresPassword ? '16px' : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LockOutlined style={{ color: '#64748b' }} />
                            <span style={{ fontWeight: 600, color: '#475569' }}>Yêu cầu mật khẩu để tham gia</span>
                        </div>
                        <Switch
                            checked={requiresPassword}
                            onChange={(checked) => setRequiresPassword(checked)}
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
                            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu tham gia lớp" />
                        </Form.Item>
                    )}
                </div>

                <Form.Item label="Ảnh đại diện lớp học">
                    <Upload
                        name="thumbnail"
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={handleUpload}
                        beforeUpload={beforeUpload}
                        className="premium-upload-area"
                    >
                        {imageUrl ? (
                            <img 
                                src={getAssetUrl(imageUrl)}
                                alt="thumbnail" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
                            />
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                {uploadLoading ? <LoadingOutlined style={{ fontSize: '24px', color: '#3b82f6' }} /> : <PictureOutlined style={{ fontSize: '24px', color: '#94a3b8' }} />}
                                <div style={{ marginTop: 8, fontWeight: 500, color: '#64748b' }}>Tải ảnh lên</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateClass;
