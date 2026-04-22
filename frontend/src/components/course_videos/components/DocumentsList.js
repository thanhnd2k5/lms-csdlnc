import React from 'react';
import { List, message } from 'antd';

const DocumentsList = ({ documents }) => {
  const handleDownload = async (document) => {
    try {
      window.open(`${process.env.REACT_APP_API_URL}/documents/${document.id}/download`, '_blank');
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải tài liệu');
    }
  };

  if (!documents || documents.length === 0) return null;

  return (
    <div className="documents-section">
      <h3>Tài liệu</h3>
      <List
        size="small"
        dataSource={documents}
        renderItem={doc => (
          <List.Item
            className="document-item"
            onClick={() => handleDownload(doc)}
          >
            <List.Item.Meta
              title={
                <span className="document-title">
                  {doc.title}
                  <span className="document-type">
                    ({doc.file_type.toUpperCase()})
                  </span>
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default React.memo(DocumentsList);
