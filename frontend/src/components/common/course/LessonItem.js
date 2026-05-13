import React from 'react';
import { Button, Tooltip, Space, Tag } from 'antd';
import {
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';

const LessonItem = ({
  video,
  onEdit,
  onDelete,
  onManageDocuments,
  onAssignQuiz
}) => {
  return (
    <div className="lesson-item">
      <div className="lesson-icon">
        <PlayCircleOutlined />
      </div>

      <div className="lesson-info">
        <div className="lesson-name">{video.title}</div>
        <div className="lesson-meta">
          <span><ClockCircleOutlined /> {video.duration || '00:00'}</span>
          <span><FileTextOutlined /> {video.document_count || 0} tài liệu</span>
          {video.quiz_count > 0 && (
            <Tag color="blue" icon={<CheckCircleOutlined />} style={{ borderRadius: '4px', border: 'none' }}>
              Có Quiz
            </Tag>
          )}
        </div>
      </div>

      <div className="lesson-actions">
        <Space size={8}>
          <Tooltip title="Chỉnh sửa nội dung">
            <Button
              className="btn-action-round primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(video)}
            />
          </Tooltip>

          <Tooltip title="Quản lý tài liệu">
            <Button
              className="btn-action-round"
              icon={<FileTextOutlined />}
              onClick={() => onManageDocuments(video)}
            />
          </Tooltip>

          <Tooltip title="Giao bài tập (Quiz)">
            <Button
              className="btn-action-round"
              icon={<QuestionCircleOutlined />}
              onClick={() => onAssignQuiz(video)}
            />
          </Tooltip>

          <Tooltip title="Xóa bài học">
            <Button
              className="btn-action-round danger"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(video.id)}
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default LessonItem;
