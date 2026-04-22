import React, { useState, useEffect, useRef } from 'react';
import { Badge } from 'antd';
import { BellOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './NotificationDropdown.css';

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Khóa học mới',
      content: 'Khóa học "React Advanced" vừa được cập nhật bài giảng mới.',
      time: '5 phút trước',
      unread: true,
      type: 'course'
    },
    {
      id: 2,
      title: 'Lịch học sắp tới',
      content: 'Bạn có buổi học trực tuyến vào lúc 19:00 tối nay.',
      time: '2 giờ trước',
      unread: true,
      type: 'schedule'
    },
    {
      id: 3,
      title: 'Hoàn thành bài tập',
      content: 'Chúc mừng! Bạn đã hoàn thành bài tập trắc nghiệm chương 1.',
      time: '1 ngày trước',
      unread: false,
      type: 'assignment'
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="notification-wrapper" ref={notificationsRef}>
      <div 
        className={`notification-icon-trigger ${showNotifications ? 'active' : ''}`}
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Badge count={unreadCount} size="small" offset={[2, 0]}>
          <BellOutlined style={{ fontSize: '20px', cursor: 'pointer', color: showNotifications ? '#2563eb' : '#64748b' }} />
        </Badge>
      </div>

      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Thông báo</h3>
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>Đánh dấu đã đọc</button>
            )}
          </div>
          
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`notification-item ${notif.unread ? 'unread' : ''}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notif-icon-circle">
                    {notif.type === 'course' && <BookOutlined />}
                    {notif.type === 'schedule' && <BellOutlined />}
                    {notif.type === 'assignment' && <UserOutlined />}
                  </div>
                  <div className="notif-content">
                    <div className="notif-title">{notif.title}</div>
                    <div className="notif-desc">{notif.content}</div>
                    <div className="notif-time">{notif.time}</div>
                  </div>
                  {notif.unread && <div className="unread-dot"></div>}
                </div>
              ))
            ) : (
              <div className="notifications-empty">
                <BellOutlined className="empty-icon" />
                <p>Không có thông báo nào</p>
              </div>
            )}
          </div>
          
          <div className="notifications-footer">
            <Link to="/notifications" onClick={() => setShowNotifications(false)}>Xem tất cả thông báo</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
