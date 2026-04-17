import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { message, Badge } from 'antd';
import axios from 'axios';
import './navbar.css';
import { 
  SearchOutlined, 
  UserOutlined, 
  BookOutlined, 
  LogoutOutlined, 
  CaretDownOutlined,
  BellOutlined,
  SettingOutlined,
  MenuOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { sidebarConfig } from '../sidebar/sidebarConfig';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || 'student';
  const [userData, setUserData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  
  // Always use student navigation for global top header
  // Admin/Teacher features will be inside their specific dashboards using Sidebar
  const menuItems = sidebarConfig.student;

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo & Branding */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/logo1.png" alt="LMS Logo" className="logo-img" />
            <span className="logo-text">LMS System</span>
          </Link>
        </div>

        {/* Center: Navigation Menu */}
        <div className={`navbar-center ${showMobileMenu ? 'mobile-active' : ''}`}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-link-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setShowMobileMenu(false)}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span className="nav-link-text">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right: Search, Notifications & User */}
        <div className="navbar-right">
          <div className="search-box">
            <SearchOutlined className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>

          {token && (
            <div className="notification-icon">
              <Badge count={3} size="small" offset={[2, 0]}>
                <BellOutlined style={{ fontSize: '20px', cursor: 'pointer', color: '#64748b' }} />
              </Badge>
            </div>
          )}

          {token ? (
            <div className="user-menu" ref={menuRef}>
              <div className="user-info" onClick={() => setShowMenu(!showMenu)}>
                <div className="user-avatar">
                  {userData?.avatar ? (
                    <img 
                      src={`${process.env.REACT_APP_API_URL}${userData.avatar}`} 
                      alt="Avatar" 
                      className="avatar-image"
                    />
                  ) : (
                    userData?.role?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <span className="user-name">{userData?.full_name || userData?.username}</span>
                <CaretDownOutlined className="dropdown-icon" />
              </div>
              
              {showMenu && (
                <div className="dropdown-menu">
                  {role !== 'student' && (
                    <Link to={role === 'admin' ? '/admin' : '/teacher'} className="menu-item" onClick={() => setShowMenu(false)}>
                      <DashboardOutlined /> Trang quản trị
                    </Link>
                  )}
                  <Link to="/profile" className="menu-item" onClick={() => setShowMenu(false)}>
                    <UserOutlined /> Hồ sơ
                  </Link>
                  <Link to="/settings" className="menu-item" onClick={() => setShowMenu(false)}>
                    <SettingOutlined /> Cài đặt
                  </Link>
                  <div className="menu-divider"></div>
                  <button className="menu-item logout" onClick={handleLogout}>
                    <LogoutOutlined /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Đăng nhập
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <MenuOutlined />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;