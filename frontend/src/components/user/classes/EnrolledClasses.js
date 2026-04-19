import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../../utils/urlUtils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, MoreVertical, LogOut, ArrowRight,
    BookOpen, Users, Lock, Key, X, GraduationCap,
    Calendar, AlertCircle, Info
} from 'lucide-react';
import './EnrolledClasses.css';

const CLASS_GRADIENTS = [
    'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
];

const EnrolledClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [classCode, setClassCode] = useState('');
    const [password, setPassword] = useState('');
    const [joinLoading, setJoinLoading] = useState(false);
    const [leaveConfirm, setLeaveConfirm] = useState(null); // stores class object to leave
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEnrolledClasses();
    }, []);

    const fetchEnrolledClasses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/student/enrolled-classes`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setClasses(response.data.data);
            }
        } catch (error) {
            setError('Không thể tải danh sách lớp học');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoinClass = async (e) => {
        e.preventDefault();
        try {
            setJoinLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/student/join-class`,
                { classCode, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setIsJoinModalOpen(false);
                setClassCode('');
                setPassword('');
                fetchEnrolledClasses();
                // Simple toast would be better but keeping it simple for now
                alert('Tham gia lớp học thành công!');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Không thể tham gia lớp học');
        } finally {
            setJoinLoading(false);
        }
    };

    const handleLeaveClass = async (classId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/student/classes/${classId}/leave`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLeaveConfirm(null);
            fetchEnrolledClasses();
        } catch (error) {
            alert('Không thể rời khỏi lớp học');
        }
    };

    const filteredClasses = classes.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getGradient = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return CLASS_GRADIENTS[Math.abs(hash) % CLASS_GRADIENTS.length];
    };

    // --- Sub-components ---

    const ClassCard = ({ classData }) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const menuRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setIsMenuOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const initials = classData.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="class-premium-card"
            >
                <div className="card-banner" style={{ background: getGradient(classData.name) }}>
                    <div className="card-menu-container" ref={menuRef}>
                        <button
                            className="card-menu-trigger"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MoreVertical size={18} />
                        </button>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    className="card-dropdown"
                                >
                                    <div className="dropdown-item" onClick={() => setLeaveConfirm(classData)}>
                                        <LogOut size={16} />
                                        <span>Rời khỏi lớp</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="card-avatar-wrapper">
                        <div className="card-avatar" style={{ background: getGradient(classData.name) }}>
                            {classData.thumbnail ? (
                                <img
                                    src={getAssetUrl(classData.thumbnail)}
                                    alt={classData.name}
                                />
                            ) : initials}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <h3 className="class-card-title">{classData.name}</h3>
                    <div className="class-info-list">
                        <div className="info-item">
                            <Users size={14} />
                            <span>Giáo viên: {classData.teacher_name || 'Admin'}</span>
                        </div>
                        <div className="info-item">
                            <Calendar size={14} />
                            <span>Tham gia: {new Date(classData.enrolled_at || Date.now()).toLocaleDateString('vi-VN')}</span>
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <button
                        className="btn-enter"
                        onClick={() => navigate(`/student/classes/${classData.id}/courses`)}
                    >
                        <span>Vào lớp học</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </motion.div>
        );
    };

    const SkeletonCard = () => (
        <div className="skeleton-card">
            <div className="skeleton-banner shimmer"></div>
            <div className="skeleton-title shimmer"></div>
            <div className="skeleton-text shimmer"></div>
            <div className="skeleton-text shimmer" style={{ width: '40%' }}></div>
        </div>
    );

    return (
        <div className="enrolled-classes-page">
            <section className="hero-section">
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hero-title"
                    >
                        Phòng học của tôi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Chào mừng bạn trở lại! Hãy tiếp tục hành trình học tập tại các lớp học mà bạn đã tham gia.
                    </motion.p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <GraduationCap size={18} />
                            <span>{classes.length} Lớp đang học</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="classes-container">
                <div className="toolbar">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Tìm kiếm lớp học..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn-join" onClick={() => setIsJoinModalOpen(true)}>
                        <Plus size={20} />
                        <span>Tham gia lớp mới</span>
                    </button>
                </div>

                <div className="classes-grid">
                    {loading ? (
                        [1, 2, 3].map(i => <SkeletonCard key={i} />)
                    ) : filteredClasses.length === 0 ? (
                        <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                            <div className="empty-illustration">
                                <BookOpen size={64} strokeWidth={1.5} />
                            </div>
                            <h2 className="empty-title">
                                {searchQuery ? 'Không tìm thấy lớp học' : 'Bạn chưa tham gia lớp nào'}
                            </h2>
                            <p className="empty-desc">
                                {searchQuery
                                    ? `Không tìm thấy kết quả nào cho "${searchQuery}". Hãy thử từ khóa khác.`
                                    : 'Hãy bắt đầu bằng cách tham gia một lớp học mới bằng mã code do giáo viên cung cấp.'}
                            </p>
                            {!searchQuery && (
                                <button className="btn-join" onClick={() => setIsJoinModalOpen(true)}>
                                    <Plus size={20} />
                                    <span>Tham gia ngay</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredClasses.map(classItem => (
                                <ClassCard key={classItem.id} classData={classItem} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Join Modal */}
            <AnimatePresence>
                {isJoinModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsJoinModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Tham gia lớp học</h3>
                                <button className="modal-close" onClick={() => setIsJoinModalOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleJoinClass}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Mã lớp học</label>
                                        <div className="input-with-icon">
                                            <Key className="input-icon" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Ví dụ: CLASS123"
                                                required
                                                value={classCode}
                                                onChange={e => setClassCode(e.target.value.toUpperCase())}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mật khẩu lớp (nếu có)</label>
                                        <div className="input-with-icon">
                                            <Lock className="input-icon" size={18} />
                                            <input
                                                type="password"
                                                placeholder="Nhập mật khẩu"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                        <Info size={16} style={{ color: '#3b82f6', marginTop: '2px' }} />
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                                            Yêu cầu giáo viên của bạn cung cấp mã lớp học để có thể tham gia và xem các khóa học bên trong.
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-cancel" onClick={() => setIsJoinModalOpen(false)}>Hủy bỏ</button>
                                    <button type="submit" className="btn-submit" disabled={joinLoading}>
                                        {joinLoading ? 'Đang xử lý...' : 'Tham gia ngay'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Leave Confirm Dialog */}
            <AnimatePresence>
                {leaveConfirm && (
                    <div className="modal-overlay" onClick={() => setLeaveConfirm(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="modal-content"
                            style={{ maxWidth: '400px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                                <div style={{ background: '#fef2f2', color: '#ef4444', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 20px', paddingLeft: '14px' }}>
                                    <AlertCircle size={32} />
                                </div>
                                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', fontWeight: 700 }}>Xác nhận rời lớp?</h3>
                                <p style={{ color: '#64748b', marginBottom: '24px' }}>
                                    Bạn có chắc chắn muốn rời khỏi lớp <strong>"{leaveConfirm.name}"</strong>?
                                    Toàn bộ tiến trình và dữ liệu trong lớp này sẽ không còn hiển thị với bạn.
                                </p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn-cancel" style={{ flex: 1 }} onClick={() => setLeaveConfirm(null)}>Không, ở lại</button>
                                    <button
                                        className="btn-submit"
                                        style={{ flex: 1, background: '#ef4444' }}
                                        onClick={() => handleLeaveClass(leaveConfirm.id)}
                                    >
                                        Rời khỏi lớp
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EnrolledClasses;