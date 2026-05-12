import React from 'react';
import { Button, Spin, Typography, Row, Col, Statistic, Breadcrumb, Space } from 'antd';
import {
  PlusOutlined,
  VideoCameraOutlined,
  BookOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ChapterCard from './ChapterCard';
import VideoAssignQuizModal from './VideoAssignQuizModal';
import './video_management.css';

const { Title, Text } = Typography;

const VideoManagementBase = ({
  courseInfo,
  chapters,
  videos,
  loading,
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
  onAddVideo,
  onEditVideo,
  onDeleteVideo,
  onManageDocuments,
  onAssignQuiz,
  availableQuizzes,
  selectedVideoForQuiz,
  isAssignQuizVisible,
  onAssignQuizModalClose,
  onQuizAssign,
  onQuizUnassign,
  role,
}) => {
  const navigate = useNavigate();

  const getVideosByChapter = (chapterId) => {
    return videos.filter(video => video.chapter_id === chapterId);
  };

  const totalLessons = videos.length;
  const totalChapters = chapters.length;

  return (
    <div className="video-management">
      <Spin spinning={loading}>
        <div className="breadcrumb-container" style={{ marginBottom: '16px' }}>
          <Breadcrumb items={[
            { title: <a onClick={() => navigate('/teacher/courses')}>Quản lý khóa học</a> },
            { title: courseInfo?.title || 'Chi tiết khóa học' }
          ]} />
        </div>

        <div className="page-header">
          <div className="header-left">
            <Title level={2}>
              <VideoCameraOutlined style={{ marginRight: '12px', color: '#3b82f6' }} />
              Xây dựng nội dung
            </Title>
            <Text type="secondary">{courseInfo?.title}</Text>
          </div>

          <div className="header-right">
            <Space size={16}>
              <div className="header-stats" style={{ display: 'flex', gap: '24px', marginRight: '24px' }}>
                <Statistic title="Chương" value={totalChapters} />
                <Statistic title="Bài học" value={totalLessons} />
              </div>
              <Button
                type="primary"
                onClick={onAddChapter}
                className="btn-add-course"
                size="large"
              >
                <div className="btn-content-wrapper">
                  <PlusOutlined />
                  <span>Thêm chương mới</span>
                </div>
              </Button>
            </Space>
          </div>
        </div>

        <div className="chapters-container">
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.id}
                index={index}
                chapter={chapter}
                videos={getVideosByChapter(chapter.id)}
                onAddVideo={() => onAddVideo(chapter)}
                onEditVideo={onEditVideo}
                onDeleteVideo={onDeleteVideo}
                onEditChapter={() => onEditChapter(chapter)}
                onDeleteChapter={() => onDeleteChapter(chapter.id)}
                onManageDocuments={onManageDocuments}
                onAssignQuiz={onAssignQuiz}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '64px', background: 'white', borderRadius: '16px' }}>
              <BookOutlined style={{ fontSize: '48px', color: '#e2e8f0', marginBottom: '16px' }} />
              <Title level={4}>Chưa có nội dung nào</Title>
              <Text type="secondary">Bắt đầu bằng cách thêm chương mới cho khóa học của bạn.</Text>
              <div style={{ marginTop: '24px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={onAddChapter}>
                  Thêm chương đầu tiên
                </Button>
              </div>
            </div>
          )}
        </div>

        <VideoAssignQuizModal
          visible={isAssignQuizVisible}
          onCancel={onAssignQuizModalClose}
          selectedVideo={selectedVideoForQuiz}
          availableQuizzes={availableQuizzes}
          onQuizAssign={onQuizAssign}
          onQuizUnassign={onQuizUnassign}
          role={role}
        />
      </Spin>
    </div>
  );
};

export default VideoManagementBase;