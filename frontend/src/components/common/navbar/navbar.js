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
import { getAssetUrl } from '../../../utils/urlUtils';

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
              <div className={`user-info-trigger ${showMenu ? 'active' : ''}`} onClick={() => setShowMenu(!showMenu)}>
                <div className="avatar-ring-wrapper">
                  <div className="avatar-ring" />
                  <div className="user-avatar-wrapper">
                    {userData?.avatar ? (
                      <img 
                        src={getAssetUrl(userData.avatar)} 
                        alt="Avatar" 
                        className="avatar-image-modern"
                      />
                    ) : (
                      <div className="avatar-placeholder-gradient">
                        {userData?.full_name?.[0]?.toUpperCase() || userData?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="user-details-hidden-mobile">
                  <span className="user-name-text">{userData?.full_name || userData?.username}</span>
                  <span className="user-role-text">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </div>
                <CaretDownOutlined className={`dropdown-arrow-icon ${showMenu ? 'rotated' : ''}`} />
              </div>
              
              {showMenu && (
                <div className="dropdown-menu-modern">
                  <div className="dropdown-profile-header">
                    <div className="header-avatar">
                      {userData?.avatar ? (
                        <img src={getAssetUrl(userData.avatar)} alt="Avatar" />
                      ) : (
                        <div className="avatar-placeholder-gradient small">
                          {userData?.full_name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="header-info">
                      <div className="header-name">{userData?.full_name || userData?.username}</div>
                      <div className="header-email">{userData?.email || userData?.username}</div>
                    </div>
                  </div>

                  <div className="menu-items-group">
                    {role !== 'student' && (
                      <Link to={role === 'admin' ? '/admin' : '/teacher'} className="dropdown-item-modern" onClick={() => setShowMenu(false)}>
                        <DashboardOutlined className="item-icon" /> 
                        <span>Trang quản trị</span>
                      </Link>
                    )}
                    <Link to="/profile" className="dropdown-item-modern" onClick={() => setShowMenu(false)}>
                      <UserOutlined className="item-icon" />
                      <span>Hồ sơ cá nhân</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item-modern" onClick={() => setShowMenu(false)}>
                      <SettingOutlined className="item-icon" />
                      <span>Cài đặt hệ thống</span>
                    </Link>
                  </div>

                  <div className="menu-divider-modern"></div>
                  
                  <div className="menu-items-group">
                    <button className="dropdown-item-modern logout-item" onClick={handleLogout}>
                      <LogoutOutlined className="item-icon" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
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