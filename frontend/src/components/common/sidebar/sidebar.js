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
    // Normalize path by removing trailing slashes for consistent matching
    const currentPath = location.pathname.replace(/\/+$/, '') || '/';
    
    let bestMatch = null;
    let maxScore = -1;

    menuItems.forEach(item => {
      const itemPath = item.path.replace(/\/+$/, '') || '/';
      const allPaths = [itemPath, ...(item.aliases || [])].map(p => p.replace(/\/+$/, '') || '/');
      
      allPaths.forEach(p => {
        let score = -1;
        
        if (item.exact) {
          // Score 100 for exact match
          if (currentPath === p) score = 100;
        } else {
          // Score based on path length if it's a valid prefix match
          // A valid prefix match must either be an exact match or followed by a slash
          if (currentPath === p) {
            score = p.length;
          } else if (currentPath.startsWith(p + '/')) {
            score = p.length;
          }
        }

        if (score > maxScore) {
          maxScore = score;
          bestMatch = item.path;
        }
      });
    });

    if (bestMatch) {
      setSelectedKeys([bestMatch]);
    } else {
      // Intelligent fallback for dashboard areas
      if (currentPath.startsWith('/teacher')) {
        setSelectedKeys(['/teacher']);
      } else if (currentPath.startsWith('/admin')) {
        setSelectedKeys(['/admin']);
      } else {
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
