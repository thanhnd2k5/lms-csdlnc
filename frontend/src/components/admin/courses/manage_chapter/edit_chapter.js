import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditChapter = ({ visible, onCancel, onSuccess, chapterData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (chapterData) {
      form.setFieldsValue({
        title: chapterData.title,
      });
    }
  }, [chapterData, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/chapters/${chapterData.id}`, values, { 
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      message.success('Cập nhật chương thành công');
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật chương');
    }
  };

  return (
    <Modal
      title="Chỉnh sửa chương"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Cập nhật"
      cancelText="Hủy"
      style={{ top: 40 }}
      width={500}
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
            prefix={<EditOutlined />} 
            placeholder="Nhập tên chương" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditChapter;