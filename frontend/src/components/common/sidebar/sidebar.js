import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { sidebarConfig } from './sidebarConfig';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(['/']);
  const role = localStorage.getItem('role') || 'student';

  // Only Admin and Teacher see this sidebar in DashboardLayout
  const menuItems = sidebarConfig[role] || [];

  useEffect(() => {
    // Determine the selected key based on current location
    const path = location.pathname;
    
    // Exact match first
    const exactMatch = menuItems.find(item => item.path === path);
    if (exactMatch) {
      setSelectedKeys([exactMatch.path]);
    } else {
      // Find the item that is a prefix match (longest prefix)
      const matches = menuItems
        .filter(item => path.startsWith(item.path) && item.path !== '/')
        .sort((a, b) => b.path.length - a.path.length);
        
      if (matches.length > 0) {
        setSelectedKeys([matches[0].path]);
      } else if (path === '/') {
        setSelectedKeys(['/']);
      }
    }
  }, [location.pathname, menuItems]);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  if (menuItems.length === 0) return null;

  return (
    <Sider
      width={260}
      theme="light"
      className="modern-sidebar"
      breakpoint="lg"
      collapsedWidth="80"
    >
      <div className="sidebar-menu-wrapper">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          className="dashboard-menu"
          items={menuItems.map(item => ({
            key: item.path,
            icon: React.cloneElement(item.icon, { className: 'menu-icon' }),
            label: item.name,
            className: 'menu-item-premium'
          }))}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
