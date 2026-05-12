import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios';

const EditVideoModal = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  videoData,
  role = 'teacher'
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (videoData) {
      form.setFieldsValue({
        title: videoData.title,
        video_url: videoData.video_url
      });
    }
  }, [videoData, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/videos/${videoData.id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      message.success('Cập nhật bài học thành công');
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật bài học');
    }
  };

  return (
    <Modal
      title="Chỉnh sửa bài học"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Cập nhật"
      cancelText="Hủy"
      style={{ top: 40 }}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        id="premium-course-form"
      >
        <Form.Item
          name="title"
          label="Tên bài học"
          rules={[{ required: true, message: 'Vui lòng nhập tên bài học!' }]}
        >
          <Input 
            prefix={<EditOutlined />} 
            placeholder="Nhập tên bài học" 
          />
        </Form.Item>

        <Form.Item
          name="video_url"
          label="URL Video"
          rules={[
            { required: true, message: 'Vui lòng nhập URL video!' },
            { type: 'url', message: 'Vui lòng nhập URL hợp lệ!' }
          ]}
        >
          <Input 
            prefix={<LinkOutlined />} 
            placeholder="https://..." 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVideoModal;