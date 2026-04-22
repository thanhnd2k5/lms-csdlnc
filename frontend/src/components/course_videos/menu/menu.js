import React, { useMemo } from 'react';
import { Menu as AntMenu, message } from 'antd';
import { PlayCircleOutlined, CheckCircleOutlined, ReadOutlined, FileTextOutlined, LockOutlined } from '@ant-design/icons';
import './menu.css';

const Menu = ({ videos, chapters, quizzes, watchedVideos, onVideoSelect, onQuizSelect, isOwnerOrAdmin }) => {
  const menuItems = useMemo(() => {
    return chapters.map(chapter => {
      const chapterVideos = videos.filter(video => video.chapter_id === chapter.id);
      const children = [];

      chapterVideos.forEach(video => {
        const isWatched = watchedVideos.includes(video.id);

        children.push({
          key: `video-${video.id}`,
          icon: isWatched ? <CheckCircleOutlined className="watched-icon" /> : <PlayCircleOutlined />,
          label: video.title,
          onClick: () => onVideoSelect(video),
          className: isWatched ? 'video-watched' : ''
        });

        // Tìm tất cả các quiz gán cho video này
        const videoQuizzes = quizzes.filter(quiz => quiz.video_id === video.id);
        videoQuizzes.forEach(quiz => {
          children.push({
            key: `quiz-${quiz.id}`,
            icon: <FileTextOutlined style={{ color: '#52c41a' }} />,
            label: `Quiz: ${quiz.title || 'Bài kiểm tra'}`,
            className: 'quiz-menu-item',
            onClick: () => onQuizSelect(quiz)
          });
        });
      });

      // Kiểm tra xem tất cả video trong chương đã xem hết chưa, hoặc là owner/admin
      const isChapterCompleted = isOwnerOrAdmin || chapterVideos.length === 0 || 
        chapterVideos.every(video => watchedVideos.includes(video.id));

      // Thêm các quiz của chương (không gán cho video cụ thể)
      const chapterQuizzes = quizzes.filter(quiz =>
        quiz.chapter_id === chapter.id &&
        (!quiz.video_id || quiz.quiz_type === 'chapter')
      );

      chapterQuizzes.forEach(quiz => {
        children.push({
          key: `quiz-chapter-${quiz.id}`,
          icon: isChapterCompleted ? 
            <FileTextOutlined style={{ color: '#1890ff' }} /> : 
            <LockOutlined style={{ color: '#bfbfbf' }} />,
          label: `Quiz Tổng Kết: ${quiz.title || 'Bài kiểm tra'}`,
          className: `quiz-menu-item chapter-quiz ${!isChapterCompleted ? 'quiz-locked' : ''}`,
          onClick: () => {
            if (isChapterCompleted) {
              onQuizSelect(quiz);
            } else {
              message.warning('Bạn cần hoàn thành tất cả bài giảng trong chương để mở khóa bài kiểm tra này');
            }
          }
        });
      });

      return {
        key: `chapter-${chapter.id}`,
        icon: <ReadOutlined />,
        label: chapter.title,
        children: children
      };
    });
  }, [chapters, videos, quizzes, watchedVideos, onVideoSelect, onQuizSelect, isOwnerOrAdmin]);

  return (
    <div className="menu-container">
      <h2 className="menu-title">Danh sách bài học</h2>
      <AntMenu
        mode="inline"
        className="video-menu"
        defaultOpenKeys={[`chapter-1`]}
        items={menuItems}
      />
    </div>
  );
};

export default Menu;