import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import axios from 'axios';
import AuthLayout from '../layout/AuthLayout';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [status, setStatus] = useState(null); // success, error, already-verified
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/verify-email/${token}`);
                setStatus(response.data.status);
                setMessage(response.data.message);
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Có lỗi xảy ra khi xác thực email');
            } finally {
                setVerifying(false);
            }
        };

        verifyEmail();
    }, [token]);

    useEffect(() => {
        let timer;
        if (!verifying && (status === 'success' || status === 'already-verified')) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate('/login');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [verifying, status, navigate]);

    const renderContent = () => {
        if (verifying) {
            return (
                <motion.div 
                    key="verifying"
                    className="auth-email-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="auth-email-icon-box" style={{ background: 'transparent' }}>
                        <Loader2 className="auth-spinner auth-spinner-blue" size={48} />
                    </div>
                    <div className="auth-header">
                        <h1>Đang xác thực...</h1>
                        <p>Vui lòng đợi trong giây lát khi chúng tôi xác nhận tài khoản của bạn.</p>
                    </div>
                </motion.div>
            );
        }

        if (status === 'success' || status === 'already-verified') {
            return (
                <motion.div 
                    key="success"
                    className="auth-email-screen"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="auth-email-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="auth-header">
                        <h1>{status === 'success' ? 'Xác thực thành công!' : 'Đã xác thực'}</h1>
                        <p>{message || 'Tài khoản của bạn đã sẵn sàng.'}</p>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/login" className="auth-btn-primary" style={{ textDecoration: 'none' }}>
                            Đăng nhập ngay ({countdown}s) <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div 
                key="error"
                className="auth-email-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="auth-email-icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                    <XCircle size={48} />
                </div>
                <div className="auth-header">
                    <h1>Xác thực thất bại</h1>
                    <p>{message}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <Link to="/register" className="auth-btn-primary" style={{ textDecoration: 'none' }}>
                        Đăng ký lại
                    </Link>
                    <button onClick={() => window.location.reload()} className="auth-btn-primary auth-btn-ghost" style={{ background: '#f1f5f9', color: 'var(--auth-text)' }}>
                        <RefreshCw size={20} /> Thử lại
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <AuthLayout>
            <div className="auth-glass-card">
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </AuthLayout>
    );
};

export default EmailVerification;