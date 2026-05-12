import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { VideoCameraAddOutlined, LinkOutlined } from '@ant-design/icons';
import axios from 'axios';

const AddVideoModal = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  courseId, 
  chapterId,
  role = 'teacher'
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const videoData = {
        title: values.title,
        video_url: values.video_url,
        chapter_id: chapterId,
        course_id: courseId
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/chapters/${chapterId}/videos`, videoData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      message.success('Thêm video thành công');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm video');
    }
  };

  return (
    <Modal
      title="Thêm bài học mới"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      className="premium-modal"
      okText="Thêm bài học"
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
            prefix={<VideoCameraAddOutlined />} 
            placeholder="Ví dụ: Giới thiệu về React Hook" 
          />
        </Form.Item>

        <Form.Item
          name="video_url"
          label="URL Video (Youtube/Vimeo...)"
          rules={[
            { required: true, message: 'Vui lòng nhập URL video!' },
            { type: 'url', message: 'Vui lòng nhập URL hợp lệ!' }
          ]}
        >
          <Input 
            prefix={<LinkOutlined />} 
            placeholder="https://www.youtube.com/watch?v=..." 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVideoModal;