import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import authService from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      if (name === 'username') error = 'Vui lòng nhập email hoặc username!';
      if (name === 'password') error = 'Vui lòng nhập mật khẩu!';
    }
    return error;
  };

  const handleBlur = (name) => {
    setFocusedField(null);
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await authService.login(formData);
      
      window.dispatchEvent(new Event('loginSuccess'));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      let errorMsg = error.response?.data?.message || 'Đăng nhập thất bại';
      if (error.response?.data?.needsVerification) {
        errorMsg = 'Vui lòng xác thực email trước khi đăng nhập';
      }
      setErrors({ global: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const inputContainerClass = (name) => {
    let classes = 'auth-field ';
    if (focusedField === name || formData[name]) classes += 'filled ';
    return classes;
  };

  return (
    <AuthLayout>
      <motion.div 
        className="auth-glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Chào mừng trở lại 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Đăng nhập để tiếp tục hành trình học tập
          </motion.p>
        </div>

        <form onSubmit={onFinish}>
          <AnimatePresence>
            {errors.global && (
              <motion.div 
                className="auth-error-msg" 
                style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', textAlign: 'center' }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.global}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="auth-form-group">
            <div className={inputContainerClass('username')}>
              <div className="auth-field-icon">
                <Mail size={20} />
              </div>
              <input
                type="text"
                name="username"
                autoComplete="email"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => handleBlur('username')}
              />
              <label>Email hoặc username</label>
            </div>
            {errors.username && <motion.div className="auth-error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.username}</motion.div>}
          </div>

          <div className="auth-form-group">
            <div className={inputContainerClass('password')}>
              <div className="auth-field-icon">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => handleBlur('password')}
              />
              <label>Mật khẩu</label>
              <div className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && <motion.div className="auth-error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.password}</motion.div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--auth-text-muted)' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px' }} />
              Ghi nhớ đăng nhập
            </label>
            {/* Optional: <Link to="/forgot-password" style={{ fontSize: '14px', color: 'var(--auth-primary)', fontWeight: '600', textDecoration: 'none' }}>Quên mật khẩu?</Link> */}
          </div>

          <motion.button 
            type="submit" 
            className="auth-btn-primary"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <Loader2 className="auth-spinner" />
            ) : (
              <>
                Đăng nhập
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className="auth-footer-links">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;