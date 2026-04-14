import React from 'react';
import BrandingPanel from '../auth/BrandingPanel';
import './auth-layout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-split">
      <BrandingPanel />
      <div className="auth-form-panel">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;