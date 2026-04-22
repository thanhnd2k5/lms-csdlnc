import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Tag, Typography, Space, message } from 'antd';
import { FileTextOutlined, LockOutlined } from '@ant-design/icons';
import './videos.css';

const { Title, Text } = Typography;

const Videos = ({ video, chapter, quizzes, onQuizSelect }) => {
  const [player, setPlayer] = useState(null);
  const [isAPIReady, setIsAPIReady] = useState(false);


  // Hàm lấy videoId từ URL YouTube
  const getVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v');
      } else if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      } else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/embed/')[1];
      }
    } catch (error) {
      console.error('Invalid YouTube URL:', error);
    }
    return null;
  };

  // Tải YouTube API nếu chưa có
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API is ready');
        setIsAPIReady(true);
      };
    } else {
      setIsAPIReady(true);
    }

    return () => {
      if (player) player.destroy();
    };
  }, [player]);

  // Tải video khi API sẵn sàng hoặc URL video thay đổi
  useEffect(() => {
    if (!isAPIReady || !video?.video_url) return;

    const videoId = getVideoId(video.video_url);
    if (!videoId) {
      console.warn('Video ID not found for URL:', video.video_url);
      return;
    }

    if (player) {
      player.destroy();
      setPlayer(null);
    }

    const newPlayer = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onStateChange: async (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            console.log('Video ended');
            try {
              const token = localStorage.getItem('token');
              await axios.post(
                `${process.env.REACT_APP_API_URL}/videos/${video.id}/mark-watched`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              );
              console.log('Video marked as watched');
              window.dispatchEvent(new Event('videoCompleted'));
            } catch (error) {
              console.error('Error marking video as watched:', error);
            }
          }
        },
      },
    });

    setPlayer(newPlayer);
  }, [video.video_url, isAPIReady]);

  return (
    <div className="content-section-inner">
      <div className="video-info-section">
        <div className="breadcrumb-area">
          <Text type="secondary" className="chapter-label">
            {chapter?.title}
          </Text>
        </div>
        <div className="title-wrapper">
          <Tag color="blue" className="lecture-badge">BÀI GIẢNG</Tag>
          <Title level={2} className="main-video-title">{video.title}</Title>
        </div>
      </div>

      <div className="video-section">
        <div className="video-wrapper">
          <div id="youtube-player"></div>
        </div>
      </div>

      {quizzes && quizzes.length > 0 && (
        <div className="video-quizzes-section">
          <Title level={3}>
            <Space>
              <FileTextOutlined />
              Bài kiểm tra liên quan
            </Space>
          </Title>
          <List
            className="quiz-list"
            dataSource={quizzes}
            renderItem={(quiz) => (
              <List.Item
                className={`quiz-item ${quiz.locked ? 'quiz-locked' : ''}`}
                extra={
                  <Button
                    type={quiz.locked ? "default" : "primary"}
                    icon={quiz.locked ? <LockOutlined /> : <FileTextOutlined />}
                    onClick={() => {
                      if (quiz.locked) {
                        message.warning('Bạn cần hoàn thành tất cả bài giảng trong chương để mở khóa bài kiểm tra này');
                      } else {
                        onQuizSelect(quiz);
                      }
                    }}
                  >
                    {quiz.locked ? 'Đang khóa' : 'Làm bài ngay'}
                  </Button>
                }
              >
                <List.Item.Meta
                  title={<Text strong>{quiz.title}</Text>}
                  description={
                    <Space>
                      <Tag color={quiz.quiz_type === 'chapter' ? 'blue' : 'green'}>
                        {quiz.quiz_type === 'chapter' ? 'Quiz Chương' : 'Quiz Bài học'}
                      </Tag>
                      {quiz.locked && <Tag color="error">Cần hoàn thành chương</Tag>}
                      <Text type="secondary">{quiz.duration_minutes} phút</Text>
                      <Text type="secondary">{quiz.passing_score}% điểm đạt</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Videos;
