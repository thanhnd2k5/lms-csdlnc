import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  Presentation, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirm_password: '',
    role: 'student'
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.full_name) newErrors.full_name = 'Vui lòng nhập họ và tên!';
      if (!formData.username) newErrors.username = 'Vui lòng nhập tên đăng nhập!';
      if (!formData.email) {
        newErrors.email = 'Vui lòng nhập email!';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ!';
      }
    } else if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu!';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Phải có 1 chữ hoa, 1 chữ thường và 1 số!';
      }

      if (!formData.confirm_password) {
        newErrors.confirm_password = 'Vui lòng xác nhận mật khẩu!';
      } else if (formData.confirm_password !== formData.password) {
        newErrors.confirm_password = 'Mật khẩu xác nhận không khớp!';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onFinish = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
      navigate('/check-email', { 
        state: { email: formData.email } 
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ global: error.response?.data?.message || 'Đăng ký thất bại' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const pass = formData.password;
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/\d/.test(pass)) strength += 1;
    return strength;
  };

  const strengthLabels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  const strengthColors = ['#E2E8F0', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
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
      >
        <div className="auth-header">
          <h1>Đăng ký tài khoản</h1>
          <p>Bắt đầu hành trình chinh phục kiến thức ngay hôm nay</p>
        </div>

        <div className="auth-steps-container">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`auth-step-dot ${step === i ? 'active' : ''} ${step > i ? 'done' : ''}`}
            />
          ))}
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="auth-form-group">
                  <div className={inputContainerClass('full_name')}>
                    <div className="auth-field-icon"><User size={20} /></div>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('full_name')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label>Họ và tên</label>
                  </div>
                  {errors.full_name && <div className="auth-error-msg">{errors.full_name}</div>}
                </div>

                <div className="auth-form-group">
                  <div className={inputContainerClass('username')}>
                    <div className="auth-field-icon"><User size={20} /></div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label>Tên đăng nhập</label>
                  </div>
                  {errors.username && <div className="auth-error-msg">{errors.username}</div>}
                </div>

                <div className="auth-form-group">
                  <div className={inputContainerClass('email')}>
                    <div className="auth-field-icon"><Mail size={20} /></div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label>Email</label>
                  </div>
                  {errors.email && <div className="auth-error-msg">{errors.email}</div>}
                </div>

                <button type="button" className="auth-btn-primary" onClick={nextStep}>
                  Tiếp theo <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="auth-form-group">
                  <div className={inputContainerClass('password')}>
                    <div className="auth-field-icon"><Lock size={20} /></div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label>Mật khẩu</label>
                    <div className="auth-toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                  <div className="auth-strength-container">
                    <div className="auth-strength-bars">
                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i} 
                          className="auth-strength-bar"
                          style={{ backgroundColor: getPasswordStrength() >= i ? strengthColors[getPasswordStrength()] : '#f1f5f9' }}
                        />
                      ))}
                    </div>
                    <span className="auth-strength-label-text" style={{ color: strengthColors[getPasswordStrength()] }}>
                      {strengthLabels[getPasswordStrength()]}
                    </span>
                  </div>
                  {errors.password && <div className="auth-error-msg">{errors.password}</div>}
                </div>

                <div className="auth-form-group">
                  <div className={inputContainerClass('confirm_password')}>
                    <div className="auth-field-icon"><Lock size={20} /></div>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirm_password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label>Xác nhận mật khẩu</label>
                  </div>
                  {errors.confirm_password && <div className="auth-error-msg">{errors.confirm_password}</div>}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" className="auth-btn-primary auth-btn-ghost" onClick={prevStep} style={{ background: '#f1f5f9', color: 'var(--auth-text)' }}>
                    <ChevronLeft size={20} /> Quay lại
                  </button>
                  <button type="button" className="auth-btn-primary" onClick={nextStep}>
                    Tiếp theo <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="auth-role-grid">
                  <div 
                    className={`auth-role-card ${formData.role === 'student' ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  >
                    <div className="auth-role-icon"><GraduationCap size={24} /></div>
                    <h4>Học viên</h4>
                    {formData.role === 'student' && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--auth-primary)' }}>
                        <CheckCircle2 size={16} fill="currentColor" color="white" />
                      </div>
                    )}
                  </div>
                  <div 
                    className={`auth-role-card ${formData.role === 'teacher' ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, role: 'teacher' }))}
                  >
                    <div className="auth-role-icon"><Presentation size={24} /></div>
                    <h4>Giảng viên</h4>
                    {formData.role === 'teacher' && (
                      <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--auth-primary)' }}>
                        <CheckCircle2 size={16} fill="currentColor" color="white" />
                      </div>
                    )}
                  </div>
                </div>

                {errors.global && <div className="auth-error-msg" style={{ marginBottom: '16px', textAlign: 'center' }}>{errors.global}</div>}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" className="auth-btn-primary auth-btn-ghost" onClick={prevStep} style={{ background: '#f1f5f9', color: 'var(--auth-text)' }}>
                    <ChevronLeft size={20} /> Quay lại
                  </button>
                  <button type="button" className="auth-btn-primary" onClick={onFinish} disabled={loading}>
                    {loading ? <Loader2 className="auth-spinner" /> : 'Đăng ký ngay'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="auth-footer-links">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default Register;