import React, { useState } from 'react';
import { Card, Typography, Space, Button, Alert, Divider, message } from 'antd';
import { BulbOutlined, RobotOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
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
      <Title level={3} style={{ color: '#fff', marginBottom: 32, textAlign: 'center' }}>Chi tiết bài làm</Title>
      
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {quiz.questions.map((question, qIndex) => {
          const userAnswer = quizResult.answers[question.id];
          return (
            <Card 
                key={question.id} 
                className="quiz-review-card"
                title={
                  <div className="flex-center" style={{ alignItems: 'flex-start' }}>
                    <div className="question-number" style={{ flexShrink: 0 }}>{qIndex + 1}</div>
                    <Text strong style={{ color: '#fff', fontSize: 16, lineHeight: '1.5' }}>{question.question_text}</Text>
                  </div>
                }
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
                    <div key={option.id} className={className}>
                      <div className="flex-center" style={{ justifyContent: 'space-between', width: '100%' }}>
                        <div className="flex-center">
                          {isUserAnswer && (
                            <span className="icon-align-fix">
                              {isCorrect ? 
                                <CheckOutlined style={{ color: '#10b981' }} /> : 
                                <CloseOutlined style={{ color: '#ef4444' }} />
                              }
                            </span>
                          )}
                          <Text style={{ color: 'inherit' }}>{option.option_text}</Text>
                        </div>
                        
                        {isCorrect && !isUserAnswer && (
                          <Text style={{ color: '#10b981', fontSize: 12, fontStyle: 'italic' }}>(Đáp án đúng)</Text>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ai-explanation-section">
                {!explanations[question.id] ? (
                  <Button 
                    onClick={() => handleAskAI(question)}
                    loading={loadingAI[question.id]}
                    className="ai-explain-btn"
                  >
                    <div className="btn-content-wrapper">
                      <span className="icon-align-fix"><BulbOutlined /></span>
                      <span>Hỏi AI Gemini giải thích</span>
                    </div>
                  </Button>
                ) : (
                  <Alert 
                    className="ai-alert-premium"
                    message={
                        <div className="flex-center" style={{ marginBottom: 12 }}>
                            <span className="icon-align-fix">
                              <RobotOutlined style={{ color: '#b37feb', fontSize: 20 }} />
                            </span>
                            <Text strong style={{ color: '#b37feb', fontSize: 16 }}>Giải thích từ AI Gemini</Text>
                        </div>
                    }
                    description={
                        <div className="ai-content">
                            <ReactMarkdown>{explanations[question.id]}</ReactMarkdown>
                        </div>
                    }
                    type="info"
                    showIcon={false}
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