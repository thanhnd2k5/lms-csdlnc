import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import '../layout/layout.css';

const HomeLayout = () => {
  return (
    <div className="layout-top-nav">
      <Navbar />
      <main className="home-layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
