import React, { useState } from 'react';
import { Card, Typography, Space, Button, Alert, Divider, message } from 'antd';
import { BulbOutlined, RobotOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './QuizReview.css';

const { Text, Title } = Typography;

const QuizReview = ({ quiz, quizResult }) => {
  const [explanations, setExplanations] = useState({});
  const [loadingAI, setLoadingAI] = useState({});

  if (!quiz || !quiz.questions || !quizResult || !quizResult.answers) {
    return null;
  }

  const handleAskAI = async (question) => {
    try {
      setLoadingAI(prev => ({ ...prev, [question.id]: true }));
      const token = localStorage.getItem('token');
      
      const userAnswerId = quizResult.answers[question.id];
      let userAnswerText = "Chưa chọn đáp án";
      
      if (userAnswerId) {
          const ids = Array.isArray(userAnswerId) ? userAnswerId : [userAnswerId];
          userAnswerText = question.options
            .filter(opt => ids.includes(opt.id))
            .map(opt => opt.option_text)
            .join(", ");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/ai/quiz/explain`,
        {
          question_id: question.id,
          course_id: quiz.course_id || null,
          user_answer_text: userAnswerText
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setExplanations(prev => ({ ...prev, [question.id]: response.data.explanation }));
      }
    } catch (error) {
      console.error('AI Explain Error:', error);
      message.error('Không thể kết nối với AI lúc này.');
    } finally {
      setLoadingAI(prev => ({ ...prev, [question.id]: false }));
    }
  };

  return (
    <div className="quiz-review">
      <Title level={4} style={{ marginBottom: 24 }}>Xem lại bài làm</Title>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {quiz.questions.map((question, qIndex) => {
          const userAnswer = quizResult.answers[question.id];
          return (
            <Card 
                key={question.id} 
                className="quiz-review-card"
                title={<Text strong>{qIndex + 1}. {question.question_text}</Text>}
            >
              <div className="options-list">
                {question.options?.map(option => {
                  const isUserAnswer = Array.isArray(userAnswer) 
                    ? userAnswer.includes(option.id) 
                    : userAnswer === option.id;
                  const isCorrect = option.is_correct;
                  
                  let className = "quiz-review-option";
                  if (isUserAnswer) className += isCorrect ? " correct-user" : " wrong-user";
                  else if (isCorrect) className += " correct-answer";

                  return (
                    <div key={option.id} className={className} style={{ padding: '8px', marginBottom: '8px', borderRadius: '4px' }}>
                      <Space>
                        {isUserAnswer && (
                          <Text type={isCorrect ? 'success' : 'danger'}>
                            {isCorrect ? '✓' : '✗'}
                          </Text>
                        )}
                        <Text>{option.option_text}</Text>
                        {isCorrect && !isUserAnswer && (
                          <Text type="success" italic>(Đáp án đúng)</Text>
                        )}
                      </Space>
                    </div>
                  );
                })}
              </div>

              <Divider dashed style={{ margin: '16px 0' }} />
              
              <div className="ai-explanation-section">
                {!explanations[question.id] ? (
                  <Button 
                    type="dashed" 
                    icon={<BulbOutlined />} 
                    loading={loadingAI[question.id]}
                    onClick={() => handleAskAI(question)}
                    className="ai-explain-btn"
                  >
                    Hỏi AI giải thích câu này
                  </Button>
                ) : (
                  <Alert 
                    message={
                        <Space>
                            <RobotOutlined style={{ color: '#722ed1' }} />
                            <Text strong style={{ color: '#722ed1' }}>AI Gemini Giải thích</Text>
                        </Space>
                    }
                    description={
                        <div className="ai-content">
                            <ReactMarkdown>{explanations[question.id]}</ReactMarkdown>
                        </div>
                    }
                    type="info"
                    showIcon={false}
                    style={{ 
                        borderRadius: 8, 
                        border: '1px solid #d3adf7',
                        background: '#f9f0ff'
                    }}
                  />
                )}
              </div>
            </Card>
          );
        })}
      </Space>
    </div>
  );
};

export default QuizReview;