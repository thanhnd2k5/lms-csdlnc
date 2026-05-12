import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import LessonItem from './LessonItem';

const ChapterCard = ({
  chapter,
  videos,
  onAddVideo,
  onEditVideo,
  onDeleteVideo,
  onEditChapter,
  onDeleteChapter,
  onManageDocuments,
  onAssignQuiz,
  index
}) => {
  return (
    <div className="chapter-collapse">
      <div className="ant-collapse-header">
        <div className="chapter-header">
          <div className="chapter-title-group">
            <div className="chapter-index">{index + 1}</div>
            <div>
              <span className="chapter-title">{chapter.title}</span>
              <span className="chapter-lesson-count">({videos.length} bài học)</span>
            </div>
          </div>

          <div className="chapter-actions">
            <Space>
              <Tooltip title="Sửa tên chương">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  size="small"
                  className="btn-action-round"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditChapter(chapter);
                  }}
                />
              </Tooltip>
              <Tooltip title="Xóa chương">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  className="btn-action-round danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChapter(chapter.id);
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        </div>
      </div>

      <div className="lesson-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <LessonItem
              key={video.id}
              video={video}
              onEdit={onEditVideo}
              onDelete={onDeleteVideo}
              onManageDocuments={onManageDocuments}
              onAssignQuiz={onAssignQuiz}
            />
          ))
        ) : (
          <div className="empty-lessons">Chưa có bài học nào trong chương này.</div>
        )}

        <Button
          type="dashed"
          block
          className="btn-add-lesson"
          onClick={() => onAddVideo(chapter)}
        >
          <div className="btn-content-wrapper">
            <PlusOutlined />
            <span>Thêm bài học mới</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ChapterCard;