import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import '../layout/layout.css';

const MainLayout = () => {
  return (
    <div className="layout-top-nav">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
