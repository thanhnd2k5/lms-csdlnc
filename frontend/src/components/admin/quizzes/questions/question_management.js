import React, { useState, useEffect } from 'react';
import { Form, Button, Space, message, Typography, Modal, Radio, Divider, Row, Col } from 'antd';
import { 
  PlusOutlined, 
  RobotOutlined, 
  SaveOutlined, 
  ArrowLeftOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionItem from './QuestionItem';
import AIGeneratorModal from '../../../common/quiz/AIGeneratorModal';
import EditQuizModal from '../../../common/quiz/EditQuizModal';
import { SettingOutlined } from '@ant-design/icons';
import '../../admin_page.css';
import '../../../common/quiz/QuizManagement.css'; // Reuse common quiz styles

const { Title, Text } = Typography;

const QuestionManagement = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionType, setQuestionType] = useState('single');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [isEditQuizVisible, setIsEditQuizVisible] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/quizzes/${quizId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      const quizData = response.data;
      setQuiz(quizData);

      // Format questions data
      const formattedQuestions = quizData.questions?.map(q => ({
        id: q.id,
        question_text: q.question_text,
        points: q.points || 1,
        allows_multiple_correct: q.allows_multiple_correct,
        options: q.options?.map(opt => ({
          id: opt.id,
          option_text: opt.option_text,
          is_correct: opt.is_correct === true // Đảm bảo boolean
        })) || []
      })) || [];

      setQuestions(formattedQuestions);
      form.setFieldsValue({
        questions: formattedQuestions
      });

    } catch (error) {
      console.error('Error fetching quiz:', error);
      message.error('Không thể tải thông tin quiz');
      navigate(role === 'admin' ? '/admin/quiz' : '/teacher/quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuestions = async (values) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');

      // Format lại dữ liệu trước khi gửi
      const formattedQuestions = values.questions?.map(q => ({
        id: q.id, // Giữ lại id nếu có
        question_text: q.question_text,
        points: q.points || 1,
        allows_multiple_correct: q.allows_multiple_correct === true,
        options: q.options?.map(opt => ({
          id: opt.id, // Giữ lại id nếu có
          option_text: opt.option_text,
          is_correct: opt.is_correct === true ? 1 : 0 // Chuyển về 1/0 cho database
        }))
      }));
      
      await axios.put(
        `${process.env.REACT_APP_API_URL}/quizzes/${quizId}/questions`,
        { questions: formattedQuestions },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      message.success('Cập nhật câu hỏi thành công');
      fetchQuizData(); // Tải lại dữ liệu sau khi cập nhật
    } catch (error) {
      console.error('Error updating questions:', error);
      message.error('Có lỗi xảy ra khi cập nhật câu hỏi');
    } finally {
      setSubmitting(false);
    }
  };

  const showQuestionTypeModal = () => {
    setIsModalVisible(true);
    setQuestionType('single');
  };

  const handleModalOk = () => {
    const newQuestion = {
      question_text: '',
      allows_multiple_correct: questionType === 'multiple',
      options: []
    };

    form.setFieldsValue({
      questions: [...(form.getFieldValue('questions') || []), newQuestion]
    });

    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAIQuestionsReceived = (aiQuestions) => {
    const currentQuestions = form.getFieldValue('questions') || [];
    
    // Ghép câu hỏi cũ và mới
    form.setFieldsValue({
      questions: [...currentQuestions, ...aiQuestions]
    });
    
    setAiModalOpen(false);
    message.success('Đã thêm các câu hỏi từ AI. Đừng quên nhấn "Lưu thay đổi" nhé!');
  };

  return (
    <div className="quiz-management-container questions-editor-page">
      {/* Sticky Header */}
      <div className="questions-page-header">
        <div className="header-nav">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(role === 'admin' ? '/admin/quiz' : '/teacher/quiz')}
            className="back-btn"
          >
            Quay lại danh sách
          </Button>
        </div>
        <div className="header-main">
          <div className="header-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Title level={2} style={{ margin: 0, color: '#1e293b' }}>
                Thiết lập câu hỏi
              </Title>
              <Button 
                type="text" 
                icon={<SettingOutlined style={{ fontSize: '18px', color: '#64748b' }} />} 
                className="btn-action-round"
                onClick={() => setIsEditQuizVisible(true)}
              />
            </div>
            <Text type="secondary">
              Quiz: <span style={{ color: '#2563eb', fontWeight: 600 }}>{quiz?.title}</span> • {questions.length} câu hỏi hiện có
            </Text>
          </div>
          <div className="header-actions">
            <Button 
              type="primary" 
              onClick={() => form.submit()} 
              loading={submitting}
              className="btn-add-course"
              size="large"
            >
              <div className="btn-content-wrapper">
                <SaveOutlined />
                <span>Lưu toàn bộ thay đổi</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="questions-content-wrapper">
        <Form
          form={form}
          onFinish={handleUpdateQuestions}
          layout="vertical"
          disabled={loading}
          initialValues={{ questions: questions }}
          className="questions-form"
        >
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <div className="questions-list">
                {fields.length > 0 ? (
                  fields.map((field, index) => (
                    <QuestionItem
                      key={field.key}
                      form={form}
                      name={field.name}
                      remove={remove}
                      restField={field}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="empty-questions-state">
                    <BulbOutlined style={{ fontSize: '48px', color: '#cbd5e1', marginBottom: '16px' }} />
                    <h3>Chưa có câu hỏi nào</h3>
                    <p>Hãy bắt đầu bằng cách thêm câu hỏi thủ công hoặc sử dụng AI để tạo tự động.</p>
                  </div>
                )}
                
                <div className="add-questions-controls">
                  <Divider>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>THÊM NỘI DUNG MỚI</span>
                  </Divider>
                  
                  <Row gutter={16} justify="center">
                    <Col>
                      <Button
                        type="dashed"
                        onClick={showQuestionTypeModal}
                        size="large"
                        className="control-btn-manual"
                      >
                        <div className="btn-content-wrapper">
                          <PlusOutlined />
                          <span>Thêm câu hỏi thủ công</span>
                        </div>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => setAiModalOpen(true)}
                        size="large"
                        className="control-btn-ai"
                      >
                        <div className="btn-content-wrapper">
                          <RobotOutlined />
                          <span>Tạo nhanh bằng AI (Gemini)</span>
                        </div>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </Form.List>
        </Form>
      </div>

      <Modal
        title="Chọn loại câu hỏi"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Radio.Group
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <Space direction="vertical">
            <Radio value="single">Chỉ cho phép một đáp án đúng</Radio>
            <Radio value="multiple">Cho phép nhiều đáp án đúng</Radio>
          </Space>
        </Radio.Group>
      </Modal>

      <AIGeneratorModal 
        open={aiModalOpen} 
        onCancel={() => setAiModalOpen(false)} 
        onSuccess={handleAIQuestionsReceived}
      />

      <EditQuizModal
        visible={isEditQuizVisible}
        onCancel={() => setIsEditQuizVisible(false)}
        onSuccess={() => {
          setIsEditQuizVisible(false);
          fetchQuizData();
        }}
        quizData={quiz}
      />
    </div>
  );
};

export default QuestionManagement;