import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';

const CheckEmail = () => {
    const location = useLocation();
    const email = location.state?.email || 'email của bạn';

    const envelopeVariants = {
        initial: { y: 0 },
        animate: { 
            y: [0, -10, 0],
            transition: { 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AuthLayout>
            <motion.div 
                className="auth-glass-card auth-email-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="auth-email-icon-box"
                    variants={envelopeVariants}
                    initial="initial"
                    animate="animate"
                >
                    <Mail size={40} strokeWidth={1.5} />
                </motion.div>

                <div className="auth-header">
                    <h1>Kiểm tra hộp thư!</h1>
                    <p>Chúng tôi đã gửi một liên kết xác thực đến địa chỉ:</p>
                </div>

                <div className="auth-email-pill">
                    {email}
                </div>

                <div style={{ color: 'var(--auth-text-muted)', fontSize: '14px', marginBottom: '32px' }}>
                    Nếu không tìm thấy, vui lòng kiểm tra hộp thư <b>Spam</b> hoặc quảng cáo.
                </div>

                <Link to="/login" className="auth-btn-primary auth-btn-ghost" style={{ background: '#f1f5f9', color: 'var(--auth-text)', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Quay lại đăng nhập
                </Link>
            </motion.div>
        </AuthLayout>
    );
};

export default CheckEmail;