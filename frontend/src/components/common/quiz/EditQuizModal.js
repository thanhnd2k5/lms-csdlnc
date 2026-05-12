import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { EditOutlined, ClockCircleOutlined, TrophyOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';


const EditQuizModal = ({ visible, onCancel, onSuccess, quizData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && quizData) {
      form.setFieldsValue({
        title: quizData.title,
        duration_minutes: quizData.duration_minutes || 30,
        passing_score: quizData.passing_score || 50
      });
    }
  }, [visible, quizData, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/quizzes/${quizData.id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      message.success('Cập nhật thông tin Quiz thành công');
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật');
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOutlined style={{ color: '#3b82f6' }} />
          <span>Chỉnh sửa thông tin Quiz</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Lưu thay đổi"
      cancelText="Hủy"
      width={520}
      style={{ top: 60 }}
    >
      <style>{`
        #premium-quiz-form .ant-input-affix-wrapper,
        #premium-quiz-form .ant-input-number-affix-wrapper,
        #premium-quiz-form .ant-input-number,
        #premium-quiz-form .ant-select-selector,
        #premium-quiz-form .ant-input {
          border: 1px solid #e2e8f0 !important;
          border-radius: 10px !important;
          padding: 4px 12px !important;
          background: #ffffff !important;
          box-shadow: none !important;
        }
        
        #premium-quiz-form .ant-input-affix-wrapper .ant-input,
        #premium-quiz-form .ant-input-number-affix-wrapper .ant-input-number,
        #premium-quiz-form .ant-input-number-input {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          height: 34px !important;
        }

        #premium-quiz-form .ant-input-prefix,
        #premium-quiz-form .ant-input-number-prefix {
          margin-right: 12px !important;
          border: none !important;
          background: transparent !important;
          color: #94a3b8 !important;
        }

        #premium-quiz-form .ant-input-prefix::after,
        #premium-quiz-form .ant-input-number-prefix::after {
          display: none !important;
        }

        #premium-quiz-form .ant-input-number-handler-wrap {
          display: none !important;
        }

        #premium-quiz-form .ant-input-affix-wrapper:hover,
        #premium-quiz-form .ant-input-number-affix-wrapper:hover,
        #premium-quiz-form .ant-input-number:hover {
          border-color: #3b82f6 !important;
        }
      `}</style>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="modern-form"
        id="premium-quiz-form"
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề Quiz"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input
            prefix={<FileTextOutlined />}
            placeholder="Ví dụ: Kiểm tra kiến thức chương 1"
          />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="duration_minutes"
            label="Thời gian (Phút)"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
          >
            <InputNumber
              min={1}
              max={300}
              style={{ width: '100%' }}
              prefix={<ClockCircleOutlined />}
              placeholder="Phút"
            />
          </Form.Item>

          <Form.Item
            name="passing_score"
            label="Điểm đạt (%)"
            rules={[{ required: true, message: 'Vui lòng nhập điểm đạt!' }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
              prefix={<TrophyOutlined />}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditQuizModal;
