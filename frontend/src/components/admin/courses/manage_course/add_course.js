import React, { useState } from 'react';
import { Modal, Form, Input, Upload, message, Switch, Select, Button, Space, Divider, Row, Col } from 'antd';
import { LoadingOutlined, PlusOutlined, MinusCircleOutlined, InfoCircleOutlined, RocketOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getAssetUrl } from '../../../../utils/urlUtils';

const AddCourse = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/courses`, {
        ...values,
        thumbnail: imageUrl,
        is_public: values.is_public,
        level: values.level || 'All Levels',
        requirements: values.requirements || [],
        highlights: values.highlights || []
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(values);
      message.success('Thêm khóa học thành công');
      form.resetFields();
      setImageUrl('');
      onSuccess();
    } catch (error) {
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm khóa học');
    }
  };

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
    const { onSuccess, onError, file } = options;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('thumbnail', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/courses/upload-thumbnail`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setImageUrl(response.data.url);
      onSuccess('Ok');
      message.success('Tải ảnh lên thành công!');
    } catch (err) {
      onError({ err });
      message.error('Tải ảnh lên thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div className="upload-placeholder">
      {loading ? <LoadingOutlined className="upload-icon" /> : <PlusOutlined className="upload-icon" />}
      <span>Nhấp để tải ảnh lên</span>
      <p style={{ fontSize: '12px', marginTop: '4px', color: '#94a3b8' }}>Kích thước gợi ý: 1280x720</p>
    </div>
  );

  return (
    <Modal
      title="Thêm khóa học mới"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
      style={{ top: 40 }}
      className="premium-modal"
      okText="Tạo khóa học"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="modern-form"
      >
        <Row gutter={32}>
          <Col span={15}>
            <Form.Item
              name="title"
              label="Tên khóa học"
              rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
            >
              <Input placeholder="Ví dụ: Lập trình ReactJS chuyên sâu" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả ngắn"
              rules={[
                { required: true, message: 'Vui lòng nhập mô tả khóa học!' },
                { max: 100, message: 'Mô tả không được vượt quá 100 ký tự!' }
              ]}
            >
              <Input.TextArea
                maxLength={100}
                showCount
                rows={4}
                placeholder="Nhập mô tả ngắn gọn về khóa học để hiển thị trên thẻ..."
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={14}>
                <Form.Item
                  name="level"
                  label="Trình độ"
                  initialValue="All Levels"
                >
                  <Select placeholder="Chọn trình độ">
                    <Select.Option value="Beginner">Cơ bản (Beginner)</Select.Option>
                    <Select.Option value="Intermediate">Trung cấp (Intermediate)</Select.Option>
                    <Select.Option value="Advanced">Nâng cao (Advanced)</Select.Option>
                    <Select.Option value="All Levels">Mọi trình độ (All Levels)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="is_public"
                  label="Trạng thái"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch
                    checkedChildren="Công khai"
                    unCheckedChildren="Riêng tư"
                    style={{ marginTop: '4px' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={9}>
            <Form.Item
              label="Ảnh đại diện"
              required
              extra={<div style={{ fontSize: '11px', marginTop: '4px' }}>Hỗ trợ JPG, PNG (Tỷ lệ 16:9, dưới 5MB)</div>}
            >
              <Upload
                name="thumbnail"
                showUploadList={false}
                customRequest={handleUpload}
                beforeUpload={beforeUpload}
              >
                <div className="premium-upload-container">
                  {imageUrl ? (
                    <img
                      src={getAssetUrl(imageUrl)}
                      alt="thumbnail"
                      className="thumbnail-preview"
                    />
                  ) : uploadButton}
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" className="form-section-divider">
          <Space><RocketOutlined /> Thông tin chi tiết</Space>
        </Divider>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Điểm nổi bật (Highlights)">
              <Form.List name="highlights">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div key={field.key} className="dynamic-form-item">
                        <Space style={{ display: 'flex' }} align="baseline">
                          <Form.Item
                            {...field}
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                            noStyle
                          >
                            <Input placeholder="Bạn sẽ học được gì?" style={{ width: 280 }} />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: '#ef4444' }} />
                        </Space>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                      Thêm điểm nổi bật
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Yêu cầu (Requirements)">
              <Form.List name="requirements">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div key={field.key} className="dynamic-form-item">
                        <Space style={{ display: 'flex' }} align="baseline">
                          <Form.Item
                            {...field}
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                            noStyle
                          >
                            <Input placeholder="Yêu cầu cần có?" style={{ width: 280 }} />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: '#ef4444' }} />
                        </Space>
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                      Thêm yêu cầu
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCourse;
