import React, { useState, useEffect, useCallback } from 'react';
import { Radio, Checkbox, Space, Button, message, Progress, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LoadingOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined, 
  FileTextOutlined, 
  TrophyOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  ReloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import QuizReview from './QuizReview';
import './quiz.css';

const { Title, Text } = Typography;

const Quiz = ({ quiz: initialQuiz }) => {
  const [quiz, setQuiz] = useState(initialQuiz);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const navigate = useNavigate();

  const handleSubmitQuiz = useCallback(async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        message.error('Vui lòng đăng nhập để nộp bài');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quizzes/${quiz.id}/submit`,
        { answers: selectedAnswers },
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setQuizResult({
        ...response.data,
        answers: selectedAnswers
      });
      setShowResult(true);
      setSelectedAnswers({});
    } catch (error) {
      if (error.response?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
        navigate('/login');
      } else {
        message.error(error.response?.data?.message || 'Có lỗi xảy ra khi nộp bài');
      }
    } finally {
      setSubmitting(false);
    }
  }, [quiz?.id, selectedAnswers, navigate]);

  useEffect(() => {
    setSelectedAnswers({});
    setQuizResult(null);
    setShowResult(false);
    setShowAnswers(false);
    setIsStarted(false);
    setTimeRemaining(null);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [initialQuiz?.id]);

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/quizzes/${initialQuiz.id}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        setQuiz(response.data);

        const resultResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/quizzes/${initialQuiz.id}/result`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );

        if (resultResponse.data) {
          setQuizResult(resultResponse.data);
          setShowResult(true);
          setIsStarted(true);
        }
      } catch (error) {
        console.error('Error initializing quiz:', error);
        message.error('Có lỗi xảy ra khi tải thông tin quiz');
      }
    };

    if (initialQuiz?.id) {
      initializeQuiz();
    }
  }, [initialQuiz?.id]);

  useEffect(() => {
    if (!isStarted || showResult || timeRemaining === null) {
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(interval);

    return () => {
      clearInterval(interval);
      setTimer(null);
    };
  }, [isStarted, showResult, timeRemaining, handleSubmitQuiz]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeProgress = () => {
    if (!timeRemaining || !quiz?.duration_minutes) return 100;
    const totalSeconds = quiz.duration_minutes * 60;
    return Math.round((timeRemaining / totalSeconds) * 100);
  };

  const handleAnswerChange = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    } else {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: [value]
      }));
    }
  };

  const handleRetry = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/quizzes/${quiz.id}/reset`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      setShowResult(false);
      setQuizResult(null);
      setSelectedAnswers({});
      setShowAnswers(false);
      setIsStarted(false);
      setTimeRemaining(quiz?.duration_minutes * 60 || 1800);
    } catch (error) {
      message.error('Có lỗi xảy ra khi reset bài làm');
    }
  }, [quiz?.id, quiz?.duration_minutes]);

  const handleStartQuiz = () => {
    setIsStarted(true);
    setTimeRemaining(quiz?.duration_minutes * 60 || 1800);
  };

  if (!quiz) {
    return <div className="loading-icon"><LoadingOutlined /></div>;
  }

  // --- INTRO STATE ---
  if (!isStarted && !showResult) {
    return (
      <div className="quiz-container">
        <div className="quiz-intro-card">
          <div className="quiz-hero">
            <Title level={1} className="quiz-hero-title">{quiz.title || 'Bài kiểm tra'}</Title>
            
            <div className="quiz-stats-grid">
              <div className="quiz-stat-item">
                <span className="icon-align-fix quiz-stat-icon"><ClockCircleOutlined /></span>
                <span className="quiz-stat-value">{quiz.duration_minutes || 30} phút</span>
                <span className="quiz-stat-label">Thời gian</span>
              </div>
              <div className="quiz-stat-item">
                <span className="icon-align-fix quiz-stat-icon"><FileTextOutlined /></span>
                <span className="quiz-stat-value">{quiz.questions?.length || 0} câu</span>
                <span className="quiz-stat-label">Số câu hỏi</span>
              </div>
              <div className="quiz-stat-item">
                <span className="icon-align-fix quiz-stat-icon"><TrophyOutlined /></span>
                <span className="quiz-stat-value">{quiz.passing_score || 60}/100</span>
                <span className="quiz-stat-label">Điểm yêu cầu</span>
              </div>
            </div>
          </div>

          <div className="quiz-rules-container">
            <Title level={4} className="quiz-rules-title flex-center">
              <span className="icon-align-fix"><SafetyCertificateOutlined style={{ color: '#f59e0b' }} /></span> 
              <span>Hướng dẫn & Quy định</span>
            </Title>
            <ul className="quiz-rules-list">
              <li>Thời gian sẽ bắt đầu tính ngay sau khi bạn nhấn nút.</li>
              <li>Hệ thống tự động nộp bài khi hết thời gian quy định.</li>
              <li>Mỗi câu hỏi có thể có một hoặc nhiều đáp án đúng.</li>
              <li>Vui lòng không tải lại trang hoặc thoát trình duyệt.</li>
            </ul>
          </div>

          <div className="quiz-actions" style={{ marginTop: 40, textAlign: 'center' }}>
            <Button 
              type="primary" 
              className="btn-primary-premium"
              onClick={handleStartQuiz}
            >
              <div className="btn-content-wrapper">
                <span className="icon-align-fix"><SendOutlined /></span>
                <span>Bắt đầu làm bài</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // --- RESULT STATE ---
  if (showResult && quizResult) {
    const isPassed = quizResult.passed;
    return (
      <div className="quiz-container">
        <div className="quiz-card quiz-result-container">
          <div className="result-score-circle">
            <Progress 
              type="circle" 
              percent={quizResult.score} 
              strokeColor={isPassed ? '#10b981' : '#ef4444'}
              strokeWidth={8}
              width={200}
              format={() => (
                <div className="score-value-box">
                  <div className="score-value">{quizResult.score}</div>
                  <div className="score-label">Điểm</div>
                </div>
              )}
            />
          </div>

          <div className="result-message">
            <div className={`result-status-badge ${isPassed ? 'status-passed' : 'status-failed'}`}>
              {isPassed ? 'Đã vượt qua' : 'Chưa đạt yêu cầu'}
            </div>
            <Title level={2} style={{ color: '#fff', marginBottom: 8 }}>
              {isPassed ? 'Chúc mừng bạn!' : 'Hãy cố gắng hơn nhé!'}
            </Title>
            <Text style={{ color: '#94a3b8', fontSize: 16 }}>
              Bạn đã hoàn thành bài kiểm tra với kết quả trên.
            </Text>
          </div>

          <div className="flex-center" style={{ justifyContent: 'center', gap: 24 }}>
            <Button 
              className="btn-secondary-premium"
              onClick={handleRetry}
            >
              <div className="btn-content-wrapper">
                <span className="icon-align-fix"><ReloadOutlined /></span>
                <span>Làm lại bài</span>
              </div>
            </Button>
            <Button 
              type="primary" 
              className="btn-primary-premium"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              <div className="btn-content-wrapper">
                <span className="icon-align-fix"><EyeOutlined /></span>
                <span>{showAnswers ? 'Ẩn đáp án' : 'Xem đáp án'}</span>
              </div>
            </Button>
          </div>

          {showAnswers && (
            <div style={{ marginTop: 48, textAlign: 'left' }}>
              <QuizReview quiz={quiz} quizResult={quizResult} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- TAKING STATE ---
  return (
    <div className="quiz-container">
      <div className="quiz-header-sticky">
        <div className="quiz-title-box">
          <Title level={4} style={{ color: '#fff', margin: 0 }}>{quiz.title}</Title>
          <Text style={{ color: '#94a3b8', fontSize: 12 }}>
            Tiến độ: {Object.keys(selectedAnswers).length}/{quiz.questions?.length} câu
          </Text>
        </div>
        
        <div className="quiz-timer-box flex-center">
          <span className="icon-align-fix">
            <ClockCircleOutlined style={{ color: timeRemaining < 60 ? '#ef4444' : '#3b82f6' }} />
          </span>
          <span className={`timer-text ${timeRemaining < 60 ? 'text-red-500' : ''}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="quiz-questions-list">
        {quiz.questions && quiz.questions.map((question, index) => (
          <div key={question.id} className="quiz-question-container">
            <div className="question-header">
              <div className="question-number">{index + 1}</div>
              <div className="question-text">
                {question.question_text}
                {question.allows_multiple_correct && 
                  <span className="multiple-choice-indicator"> (Chọn nhiều đáp án)</span>
                }
              </div>
            </div>

            <div className="quiz-options">
              {question.allows_multiple_correct ? (
                <Checkbox.Group
                  onChange={(values) => handleAnswerChange(question.id, values, true)}
                  value={selectedAnswers[question.id] || []}
                >
                  <div className="flex flex-col gap-3" style={{ width: '100%' }}>
                    {question.options?.map(option => (
                      <Checkbox key={option.id} value={option.id}>
                        {option.option_text}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              ) : (
                <Radio.Group
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  value={selectedAnswers[question.id]?.[0]}
                >
                  <div className="flex flex-col gap-3" style={{ width: '100%' }}>
                    {question.options?.map(option => (
                      <Radio key={option.id} value={option.id}>
                        {option.option_text}
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="quiz-footer" style={{ textAlign: 'right', marginTop: 32 }}>
        <Button 
          type="primary" 
          size="large"
          className="btn-primary-premium"
          onClick={handleSubmitQuiz}
          loading={submitting}
          disabled={Object.keys(selectedAnswers).length === 0 || submitting}
        >
          <div className="btn-content-wrapper">
            <span className="icon-align-fix"><SendOutlined /></span>
            <span>Nộp bài ngay</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Quiz;