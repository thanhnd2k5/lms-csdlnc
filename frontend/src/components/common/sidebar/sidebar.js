import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { sidebarConfig } from './sidebarConfig';
import './sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem('role') || 'student';
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Theo dõi kích thước màn hình để tự động thu gọn
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Chạy ngay lần đầu
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = sidebarConfig[userRole] || sidebarConfig.student;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo-link">
          <div className="logo-wrapper">
            <img src="/logo1.png" alt="LMS Logo" className="main-logo" />
            {!isCollapsed && <span className="logo-text">LMS System</span>}
          </div>
        </Link>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <nav className="sidebar-nav-content">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item-wrapper">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-text">{item.name}</span>}
                {location.pathname === item.path && !isCollapsed && (
                  <div className="active-indicator" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="footer-nav">
          <Link 
            to="/profile" 
            className={`footer-item ${location.pathname === '/profile' ? 'active' : ''}`}
            title={isCollapsed ? 'Hồ sơ cá nhân' : ''}
          >
            <span className="nav-icon"><UserOutlined /></span>
            {!isCollapsed && <span className="nav-text">Hồ sơ cá nhân</span>}
          </Link>
          
          <Link 
            to="/settings" 
            className={`footer-item ${location.pathname === '/settings' ? 'active' : ''}`}
            title={isCollapsed ? 'Cài đặt' : ''}
          >
            <span className="nav-icon"><SettingOutlined /></span>
            {!isCollapsed && <span className="nav-text">Cài đặt</span>}
          </Link>

          <button 
            className="footer-item logout-btn" 
            title={isCollapsed ? 'Đăng xuất' : ''}
          >
            <span className="nav-icon"><LogoutOutlined /></span>
            {!isCollapsed && <span className="nav-text">Đăng xuất</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
 