import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from '../common/navbar/navbar';
import Sidebar from '../common/sidebar/sidebar';
import './DashboardLayout.css';

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout className="dashboard-layout-container">
      <Navbar />
      <Layout className="dashboard-main-area">
        <Sidebar />
        <Content className="dashboard-content-wrapper">
          <div className="dashboard-inner-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
