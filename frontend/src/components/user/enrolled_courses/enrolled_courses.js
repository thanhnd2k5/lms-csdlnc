import React, { useState, useEffect } from 'react';
import { message, Spin, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, GraduationCap, Search, 
    Rocket, Layout, Crown, ArrowRight, Compass
} from 'lucide-react';
import axios from 'axios';
import CourseCard from '../../common/card/CourseCard';
import './EnrolledCourses.css';

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('enrolled');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const headers = { Authorization: `Bearer ${token}` };
            
            const enrolledRes = await axios.get(`${process.env.REACT_APP_API_URL}/courseEnroll/enrolled-courses`, { headers });
            setEnrolledCourses(enrolledRes.data);

            if (userRole === 'teacher') {
                const teacherRes = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/courses`, { headers });
                setTeacherCourses(teacherRes.data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            message.error('Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (courseId) => {
        navigate(`/course-info/${courseId}`);
    };

    const filteredEnrolled = enrolledCourses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTeaching = teacherCourses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SkeletonCard = () => (
        <div className="skeleton-card">
            <div className="skeleton-banner shimmer"></div>
            <div className="skeleton-title shimmer"></div>
            <div className="skeleton-text shimmer"></div>
            <div className="skeleton-text shimmer" style={{ width: '40%' }}></div>
        </div>
    );

    const EmptyState = ({ type }) => {
        const isSearch = !!searchQuery;
        const config = {
            enrolled: {
                title: isSearch ? 'Không tìm thấy kết quả' : 'Bạn chưa đăng ký khóa học nào',
                desc: isSearch ? `Không tìm thấy khóa học phù hợp với "${searchQuery}"` : 'Hãy bắt đầu hành trình học tập bằng cách khám phá các khóa học mới.',
                icon: <BookOpen size={64} strokeWidth={1.5} />,
                btnText: 'Khám phá ngay',
                btnIcon: <Compass size={20} />,
                action: () => navigate('/')
            },
            teaching: {
                title: isSearch ? 'Không tìm thấy kết quả' : 'Bạn chưa tạo khóa học nào',
                desc: isSearch ? `Không tìm thấy khóa học phù hợp với "${searchQuery}"` : 'Bắt đầu chia sẻ kiến thức bằng cách tạo khóa học đầu tiên của bạn.',
                icon: <Rocket size={64} strokeWidth={1.5} />,
                btnText: 'Quản lý khóa học',
                btnIcon: <Layout size={20} />,
                action: () => navigate('/teacher/courses')
            }
        };

        const current = config[type];

        return (
            <div className="empty-state-wrapper">
                <div className="bg-blob blob-purple"></div>
                <div className="bg-blob blob-teal"></div>
                
                <motion.div 
                    className="empty-state"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="empty-illustration-container">
                        <div className="illustration-glow"></div>
                        <motion.div 
                            className="empty-illustration"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {current.icon}
                        </motion.div>
                    </div>

                    <motion.h2 
                        className="empty-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {current.title}
                    </motion.h2>

                    <motion.p 
                        className="empty-desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {current.desc}
                    </motion.p>

                    {!isSearch && (
                        <motion.button 
                            className="btn-join-premium"
                            onClick={current.action}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>{current.btnText}</span>
                            {current.btnIcon}
                        </motion.button>
                    )}
                </motion.div>
            </div>
        );
    };

    const items = [
        {
            key: 'enrolled',
            label: (
                <div className="custom-tab-label">
                    <BookOpen size={18} />
                    <span>Khóa học đang học</span>
                </div>
            ),
            children: (
                <div className="courses-grid">
                    {filteredEnrolled.length === 0 ? (
                        <EmptyState type="enrolled" />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredEnrolled.map(course => (
                                <motion.div
                                    key={course.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <CourseCard
                                        course={course}
                                        isEnrolled={true}
                                        onCardClick={handleCardClick}
                                        showEnrollmentStatus={true}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            )
        },
        ...(userRole === 'teacher' ? [{
            key: 'teaching',
            label: (
                <div className="custom-tab-label">
                    <Crown size={18} />
                    <span>Khóa học đang giảng dạy</span>
                </div>
            ),
            children: (
                <div className="courses-grid">
                    {filteredTeaching.length === 0 ? (
                        <EmptyState type="teaching" />
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredTeaching.map(course => (
                                <motion.div
                                    key={course.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <CourseCard
                                        course={course}
                                        userRole={userRole}
                                        onCardClick={handleCardClick}
                                        showEnrollmentStatus={false}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            )
        }] : []),
    ];

    return (
        <div className="enrolled-classes-page">
            <section className="hero-section">
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hero-title"
                    >
                        Hành trình của tôi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Nơi hội tụ tri thức bạn đang chinh phục và những giá trị bạn đang kiến tạo cho cộng đồng.
                    </motion.p>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <GraduationCap size={18} />
                            <span>{enrolledCourses.length} Khóa học đang học</span>
                        </div>
                        {userRole === 'teacher' && (
                            <div className="stat-item">
                                <Crown size={18} style={{ color: '#f59e0b' }} />
                                <span>{teacherCourses.length} Khóa học đang dạy</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <div className="classes-container">
                <div className="hub-toolbar-premium">
                    <div className="search-wrapper">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Tìm kiếm khóa học..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="hub-tabs-container">
                        <Tabs 
                            activeKey={activeTab} 
                            onChange={setActiveTab} 
                            items={items.map(item => ({...item, children: null}))} 
                            className="hub-tabs-navigation"
                        />
                    </div>
                </div>

                <div className="hub-content-pane">
                    {loading ? (
                        <div className="courses-grid">
                            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        items.find(item => item.key === activeTab)?.children
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourses;