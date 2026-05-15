import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, ChevronRight, GraduationCap, Layout, Search } from 'lucide-react';
import CourseCard from '../../common/card/CourseCard';
import { getMeshGradient } from '../../../utils/classUtils';
import './EnrolledClasses.css'; // Reuse glassmorphism and layout styles

const ClassCourse = () => {
    const [courses, setCourses] = useState([]);
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { classId } = useParams();

    useEffect(() => {
        fetchClassData();
    }, [classId]);

    const fetchClassData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            // Parallel fetch for class info (if exists) and courses
            const [coursesRes] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_URL}/student/classes/${classId}/courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            if (coursesRes.data.success) {
                setCourses(coursesRes.data.data);
                // Simple hack: if courses returned, we might get class name from first course or have a student-classes list in state
                // Ideally we'd have an endpoint for single class info, but for now we'll deduce or use a generic title
                if (coursesRes.data.data.length > 0) {
                    setClassInfo({ name: coursesRes.data.data[0].class_name || 'Lớp học' });
                }
            }
        } catch (error) {
            console.error('Error fetching class data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (courseId) => {
        navigate(`/course-info/${courseId}`);
    };

    const filteredCourses = courses.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="enrolled-classes-page">
            <section className="hero-section">
                <div className="hero-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.9rem', opacity: 0.8 }}>
                        <Link to="/enrolled-classes" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Phòng học
                        </Link>
                        <ChevronRight size={14} />
                        <span style={{ fontWeight: 600 }}>Chi tiết lớp học</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 2 }}>
                        <div>
                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="hero-title"
                                style={{ fontSize: '3rem', marginBottom: '8px', WebkitTextFillColor: 'white' }}
                            >
                                {classInfo?.name || 'Danh sách khóa học'}
                            </motion.h1>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <BookOpen size={16} />
                                    <span>{courses.length} Khóa học trong lớp</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            className="btn-join" 
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.2)', 
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                backdropFilter: 'blur(10px)'
                            }}
                            onClick={() => navigate('/enrolled-classes')}
                        >
                            <ArrowLeft size={18} />
                            <span>Quay lại phòng học</span>
                        </button>
                    </div>
                </div>
                {/* Dynamic Background Overlay */}
                <div 
                    className="hero-dynamic-bg" 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: getMeshGradient(classInfo?.name || 'default'),
                        opacity: 0.8,
                        zIndex: 0
                    }}
                ></div>
                <div 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.5), #0f172a)',
                        zIndex: 1
                    }}
                ></div>
            </section>

            <div className="classes-container">
                <div className="toolbar" style={{ marginTop: '0' }}>
                    <div className="search-wrapper">
                        <Search className="search-icon" size={18} />
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Tìm khóa học trong lớp..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-2)', fontSize: '0.9rem' }}>
                        <Layout size={18} />
                        <span>Chế độ lưới</span>
                    </div>
                </div>

                <div className="classes-grid">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="skeleton-card shimmer" style={{ height: '320px' }}></div>)
                    ) : filteredCourses.length === 0 ? (
                        <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                            <div className="empty-illustration">
                                <GraduationCap size={64} strokeWidth={1.5} />
                            </div>
                            <h2 className="empty-title">
                                {searchQuery ? 'Không tìm thấy khóa học' : 'Chưa có khóa học nào'}
                            </h2>
                            <p className="empty-desc">
                                {searchQuery 
                                    ? `Không có khóa học nào khớp với "${searchQuery}".` 
                                    : 'Giáo viên chưa thêm khóa học nào vào lớp học này. Vui lòng quay lại sau.'}
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={{
                                        ...course,
                                        thumbnail: course.thumbnail
                                    }}
                                    onCardClick={handleCardClick}
                                    showEnrollmentStatus={false}
                                />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassCourse;
