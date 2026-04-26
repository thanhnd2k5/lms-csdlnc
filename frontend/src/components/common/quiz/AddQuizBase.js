import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, message, Divider } from 'antd';
import { PlusOutlined, MinusCircleOutlined, RobotOutlined } from '@ant-design/icons';
import axios from 'axios';
import AIGeneratorModal from './AIGeneratorModal';

const { Option } = Select;

const AddQuizBase = ({ 
  visible, 
  onCancel, 
  onSuccess, 
  role, // 'admin' or 'teacher'
  apiEndpoint 
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      
      const formattedValues = {
        ...values,
        questions: values.questions.map(q => ({
          ...q,
          points: q.points || 1,
          options: q.options.map(opt => ({
            ...opt,
            is_correct: opt.is_correct === true
          }))
        }))
      };

      await axios.post(apiEndpoint, formattedValues, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      message.success('Tạo quiz thành công');
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Submit Quiz Error:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo quiz');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Xử lý khi AI trả về danh sách câu hỏi
   */
  const handleAIQuestionsReceived = (aiQuestions) => {
    const currentQuestions = form.getFieldValue('questions') || [];
    
    // Lọc bỏ câu hỏi rỗng đầu tiên nếu chưa nhập gì
    const filteredCurrent = currentQuestions.filter(q => q.question_text || (q.options && q.options.length > 1));
    
    // Ghép câu hỏi cũ và mới
    form.setFieldsValue({
      questions: [...filteredCurrent, ...aiQuestions]
    });
    
    setAiModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Thêm Quiz mới"
        open={visible}
        onCancel={onCancel}
        width={800}
        footer={[
          <Button key="back" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            onClick={() => form.submit()}
          >
            Tạo bài tập
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            duration_minutes: 30,
            passing_score: 60,
            quiz_type: 'video',
            questions: [{ options: [{}] }]
          }}
        >
          <Form.Item
            name="title"
            label="Tên Quiz"
            rules={[{ required: true, message: 'Vui lòng nhập tên quiz' }]}
          >
            <Input />
          </Form.Item>

          <Space size="large">
            <Form.Item
              name="quiz_type"
              label="Loại Quiz"
              rules={[{ required: true, message: 'Vui lòng chọn loại quiz' }]}
            >
              <Select style={{ width: 200 }}>
                <Option value="video">Quiz video</Option>
                <Option value="chapter">Quiz chương</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="duration_minutes"
              label="Thời gian (phút)"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              name="passing_score"
              label="Điểm đạt (%)"
              rules={[{ required: true, message: 'Vui lòng nhập điểm đạt!' }]}
            >
              <InputNumber min={0} max={100} />
            </Form.Item>
          </Space>

          <Divider orientation="left">
            <Space>
              Danh sách câu hỏi
              <Button 
                type="primary" 
                size="small" 
                icon={<RobotOutlined />} 
                onClick={() => setAiModalOpen(true)}
                style={{ 
                  background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                  border: 'none',
                  marginLeft: 16
                }}
              >
                Hỗ trợ bởi AI (Gemini)
              </Button>
            </Space>
          </Divider>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: 24, border: '1px dashed #d9d9d9', padding: 16, borderRadius: 8, position: 'relative' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'question_text']}
                      label={`Câu hỏi ${name + 1}`}
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung câu hỏi!' }]}
                    >
                      <Input.TextArea autoSize />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'points']}
                      label="Điểm"
                    >
                      <InputNumber min={1} />
                    </Form.Item>

                    <Form.List name={[name, 'options']}>
                      {(optionFields, { add: addOption, remove: removeOption }) => (
                        <>
                          <div style={{ marginBottom: 8 }}>Đáp án:</div>
                          {optionFields.map((optionField, index) => (
                            <Space key={optionField.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                              <Form.Item
                                {...restField}
                                name={[optionField.name, 'option_text']}
                                rules={[{ required: true, message: 'Vui lòng nhập đáp án!' }]}
                                style={{ marginBottom: 0, flex: 1 }}
                              >
                                <Input placeholder={`Đáp án ${index + 1}`} style={{ width: 400 }} />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[optionField.name, 'is_correct']}
                                valuePropName="checked"
                                style={{ marginBottom: 0 }}
                              >
                                <Select style={{ width: 100 }}>
                                  <Option value={true}>Đúng</Option>
                                  <Option value={false}>Sai</Option>
                                </Select>
                              </Form.Item>

                              {optionFields.length > 1 && (
                                <MinusCircleOutlined onClick={() => removeOption(optionField.name)} />
                              )}
                            </Space>
                          ))}

                          <Button type="dashed" onClick={() => addOption()} block icon={<PlusOutlined />}>
                            Thêm đáp án
                          </Button>
                        </>
                      )}
                    </Form.List>

                    {fields.length > 1 && (
                      <Button 
                        type="link" 
                        danger 
                        onClick={() => remove(name)} 
                        style={{ position: 'absolute', top: 8, right: 8 }}
                      >
                        Xóa câu hỏi
                      </Button>
                    )}
                  </div>
                ))}

                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} size="large">
                  Thêm câu hỏi thủ công
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <AIGeneratorModal 
        open={aiModalOpen} 
        onCancel={() => setAiModalOpen(false)} 
        onSuccess={handleAIQuestionsReceived}
      />
    </>
  );
};

export default AddQuizBase;