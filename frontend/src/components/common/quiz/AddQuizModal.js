import React from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusCircleOutlined, ClockCircleOutlined, TrophyOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';


const { Option } = Select;

const AddQuizModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/quizzes`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      message.success('Tạo Quiz mới thành công');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo Quiz');
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircleOutlined style={{ color: '#2563eb' }} />
          <span>Tạo Quiz Mới</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Tạo ngay"
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
        initialValues={{ duration_minutes: 30, passing_score: 50 }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề Quiz"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input
            prefix={<FileTextOutlined />}
            placeholder="Ví dụ: Kiểm tra cuối khóa"
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
              placeholder="%"
            />
          </Form.Item>
        </div>

      </Form>
    </Modal>
  );
};

export default AddQuizModal;
