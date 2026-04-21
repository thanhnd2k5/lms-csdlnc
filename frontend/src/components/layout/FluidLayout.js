import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/navbar/navbar';
import './layout.css';

const FluidLayout = () => {
  return (
    <div className="layout-fluid">
      <Navbar />
      <main className="content-fluid">
        <Outlet />
      </main>
    </div>
  );
};

export default FluidLayout;
