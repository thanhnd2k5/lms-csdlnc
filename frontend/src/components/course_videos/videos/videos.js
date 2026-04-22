import React, { useEffect } from 'react';
import { Typography, Tag, Space, Button, message } from 'antd';
import { 
  FileTextOutlined, 
  LockOutlined
} from '@ant-design/icons';
import './videos.css';

const { Title, Text } = Typography;

const Videos = ({ video, chapter, quizzes, onQuizSelect }) => {
  const isAPIReady = window.YT && window.YT.Player;

  useEffect(() => {
    let player;
    const loadVideo = () => {
      if (window.YT && window.YT.Player) {
        const videoId = video.video_url.split('v=')[1]?.split('&')[0] || video.video_url.split('/').pop();
        player = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
          },
        });
      }
    };

    if (isAPIReady) {
      loadVideo();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = loadVideo;
    }

    return () => {
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [video.video_url, isAPIReady]);

  return (
    <div className="video-component-layout">
      {/* 1. Content above video - Full Width and Beautiful */}
      <div className="w-full bg-slate-900/40 border-b border-slate-800/50">
        <div className="video-info-section">
          <div className="breadcrumb-area">
            <Text className="chapter-label">
              {chapter?.title}
            </Text>
          </div>
          <div className="title-wrapper">
            <Tag color="blue" className="lecture-badge">BÀI GIẢNG</Tag>
            <Title level={2} className="main-video-title">{video.title}</Title>
          </div>
        </div>
      </div>

      {/* 2. Video Player - Edge-to-Edge */}
      <div className="video-section">
        <div className="video-wrapper">
          <div id="youtube-player"></div>
        </div>
      </div>

      {/* 3. Content below video - Full Width and Aligned with Title */}
      <div className="w-full pb-20">
        {quizzes && quizzes.length > 0 && (
          <div className="video-quizzes-section">
            <div className="section-header-aurora">
              <span className="checkpoint-badge">LEARNING CHECKPOINT</span>
              <Title level={3} className="section-title-premium">
                <FileTextOutlined className="title-icon" />
                Bài kiểm tra liên quan
              </Title>
              <div className="header-line-gradient"></div>
            </div>

            <div className="quiz-grid-premium">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  className={`quiz-card-premium ${quiz.locked ? 'quiz-locked-premium' : ''}`}
                  onClick={() => {
                    if (!quiz.locked) onQuizSelect(quiz);
                  }}
                >
                  <div className="quiz-card-content">
                    <div className="quiz-card-header">
                      <div className={`quiz-icon-wrapper ${quiz.quiz_type === 'chapter' ? 'type-chapter' : 'type-lesson'}`}>
                        {quiz.locked ? <LockOutlined /> : <FileTextOutlined />}
                      </div>
                      <div className="quiz-main-info">
                        <Title level={4} className="quiz-title-text">{quiz.title}</Title>
                        <div className="quiz-pills-container">
                          <Tag className={`quiz-type-pill ${quiz.quiz_type === 'chapter' ? 'pill-purple' : 'pill-green'}`}>
                            {quiz.quiz_type === 'chapter' ? 'Chương' : 'Bài học'}
                          </Tag>
                          <span className="quiz-info-pill">
                            <span className="pill-dot"></span>
                            {quiz.duration_minutes} phút
                          </span>
                          <span className="quiz-info-pill">
                            <span className="pill-dot"></span>
                            {quiz.passing_score}% đạt
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="quiz-card-footer">
                      <Button
                        type={quiz.locked ? "default" : "primary"}
                        className={`quiz-action-btn-premium ${quiz.locked ? 'btn-locked' : 'btn-active'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (quiz.locked) {
                            message.warning('Bạn cần hoàn thành tất cả bài giảng trong chương để mở khóa bài kiểm tra này');
                          } else {
                            onQuizSelect(quiz);
                          }
                        }}
                      >
                        <span className="btn-content-wrapper">
                          {quiz.locked && <LockOutlined />}
                          <span>{quiz.locked ? 'Đang khóa' : 'Làm bài ngay'}</span>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="card-glow-effect"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
