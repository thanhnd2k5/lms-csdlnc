import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddChapter = ({ visible, onCancel, onSuccess, courseId }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Vui lòng đăng nhập lại');
        navigate('/login');
        return;
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/chapters`, values, { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      message.success('Thêm chương thành công');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm chương');
    }
  };

  return (
    <Modal
      title="Thêm chương mới"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Xác nhận"
      cancelText="Hủy"
      style={{ top: 100 }} // Trả về vị trí cân đối hơn
      width={480}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        id="premium-course-form"
      >
        <Form.Item
          name="title"
          label="Tên chương"
          rules={[{ required: true, message: 'Vui lòng nhập tên chương!' }]}
        >
          <Input 
            prefix={<FolderAddOutlined />} 
            placeholder="Ví dụ: Chương 1: Kiến thức nền tảng" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChapter;