import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { RobotOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Dragger } = Upload;

/**
 * Modal hỗ trợ giáo viên tạo bộ câu hỏi trắc nghiệm bằng AI Gemini
 */
const AIGeneratorModal = ({ open, onCancel, onSuccess }) => {
    const [form] = Form.useForm();
    const [isGenerating, setIsGenerating] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleGenerate = async (values) => {
        try {
            setIsGenerating(true);
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            formData.append('description', values.description);
            if (fileList.length > 0) {
                // Sử dụng originFileObj để lấy file thực tế từ antd upload
                formData.append('file', fileList[0]);
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/ai/quiz/generate`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success && response.data.data.questions) {
                message.success('AI đã tạo câu hỏi thành công!');
                // Trả kết quả về cho component cha
                onSuccess(response.data.data.questions);
                form.resetFields();
                setFileList([]);
            } else {
                message.error('AI không trả về đúng định dạng câu hỏi.');
            }
        } catch (error) {
            console.error('AI Generator Error:', error);
            message.error(error.response?.data?.message || 'Có lỗi xảy ra khi gọi AI.');
        } finally {
            setIsGenerating(false);
        }
    };

    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            setFileList([file]);
            return false; // Chặn upload tự động để ta handle bằng axios
        },
        fileList,
    };

    return (
        <Modal
            title={
                <span>
                    <RobotOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    Tạo câu hỏi tự động bằng AI (Gemini)
                </span>
            }
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            className="ai-generator-modal"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleGenerate}
            >
                <Form.Item
                    name="description"
                    label="Mô tả nội dung quiz hoặc yêu cầu cho AI"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả yêu cầu cho AI!' }]}
                >
                    <Input.TextArea 
                        rows={4} 
                        placeholder="Ví dụ: Tạo 5 câu hỏi về chủ đề lập trình React, tập trung vào kiến thức về Hooks và Props. Độ khó trung bình." 
                    />
                </Form.Item>

                <Form.Item label="Tài liệu đính kèm (AI sẽ phân tích nội dung file này)">
                    <Dragger {...uploadProps} maxCount={1} accept=".pdf,.txt,.doc,.docx,image/*">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Nhấn hoặc kéo thả file vào đây</p>
                        <p className="ant-upload-hint">AI hỗ trợ đọc PDF, văn bản và hình ảnh để ra đề chính xác hơn.</p>
                    </Dragger>
                </Form.Item>

                <div style={{ textAlign: 'right', marginTop: 24 }}>
                    <Button onClick={onCancel} style={{ marginRight: 8 }}>Hủy</Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={isGenerating}
                        icon={<RobotOutlined />}
                        style={{
                            background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                            border: 'none'
                        }}
                    >
                        Bắt đầu tạo bằng AI
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AIGeneratorModal;
