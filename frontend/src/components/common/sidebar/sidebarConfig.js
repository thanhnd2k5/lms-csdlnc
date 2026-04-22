import React from 'react';
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  BarChartOutlined,
  FormOutlined,
  UserOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

export const sidebarConfig = {
  student: [
    {
      name: 'Trang chủ',
      path: '/',
      exact: true,
      icon: <HomeOutlined />
    },
    {
      name: 'Khóa học của tôi',
      path: '/enrolled-courses',
      icon: <BookOutlined />
    },
    {
      name: 'Lớp học của tôi',
      path: '/enrolled-classes',
      icon: <TeamOutlined />
    }
  ],
  admin: [
    {
      name: 'Trang chủ',
      path: '/',
      exact: true,
      icon: <HomeOutlined />
    },
    {
      name: 'Thống kê',
      path: '/admin',
      exact: true,
      icon: <BarChartOutlined />
    },
    {
      name: 'Quản lý khóa học',
      path: '/admin/courses',
      icon: <BookOutlined />
    },
    {
      name: 'Quản lý bài tập',
      path: '/admin/quiz',
      aliases: ['/admin/quizzes'],
      icon: <FormOutlined />
    }
  ],
  teacher: [
    {
      name: 'Trang chủ',
      path: '/',
      exact: true,
      icon: <HomeOutlined />
    },
    {
      name: 'Thống kê',
      path: '/teacher',
      exact: true,
      icon: <BarChartOutlined />
    },
    {
      name: 'Khóa học của tôi',
      path: '/teacher/my-courses',
      icon: <AppstoreOutlined />
    },
    {
      name: 'Quản lý khóa học',
      path: '/teacher/courses',
      icon: <BookOutlined />
    },
    {
      name: 'Quản lý bài tập',
      path: '/teacher/quiz',
      aliases: ['/teacher/quizzes'],
      icon: <FormOutlined />
    },
    {
      name: 'Quản lý học viên',
      path: '/teacher/enrollments',
      icon: <UserOutlined />
    },
    {
      name: 'Quản lý lớp học',
      path: '/teacher/classes',
      icon: <TeamOutlined />
    }
  ]
};
