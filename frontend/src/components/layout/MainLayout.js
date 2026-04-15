import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/sidebar/sidebar';
import Navbar from '../common/navbar/navbar';
import '../layout/layout.css';

const MainLayout = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = !!(token && role);

  return (
    <div className="layout">
      {isAuthenticated && <Sidebar />}
      <div className="main-content">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
