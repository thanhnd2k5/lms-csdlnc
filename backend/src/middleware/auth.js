const jwt = require('jsonwebtoken');
const lms = require('../models/lms');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        next();
    } else {
        res.status(403).json({ message: 'Không có quyền truy cập' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Không có quyền truy cập' });
    }
};

/**
 * Middleware để kiểm tra xem giáo viên có phải là chủ sở hữu khóa học không
 * Áp dụng cho cả courseId, chapterId, và videoId
 */
const authorizeCourseOwner = async (req, res, next) => {
    try {
        const { courseId, id, chapterId, videoId } = req.params;
        const currentUserId = req.user.id;
        const userRole = req.user.role;

        // Admin có toàn quyền
        if (userRole === 'admin') return next();
        
        // Chỉ giáo viên mới cần kiểm tra quyền sở hữu
        if (userRole !== 'teacher') {
            return res.status(403).json({ message: 'Không có quyền thực hiện hành động này' });
        }

        let targetCourseId = courseId || id; // Một số route dùng :id

        // Nếu là chapterId, tìm course_id
        if (chapterId) {
            const chapter = await lms.getChapterById(chapterId);
            if (!chapter) return res.status(404).json({ message: 'Chương không tồn tại' });
            targetCourseId = chapter.course_id;
        } 
        // Nếu là videoId, tìm course_id
        else if (videoId) {
            const video = await lms.getVideoById(videoId);
            if (!video) return res.status(404).json({ message: 'Video không tồn tại' });
            targetCourseId = video.course_id;
        }

        if (!targetCourseId) {
            return res.status(400).json({ message: 'Thiếu thông tin xác thực khóa học' });
        }

        const course = await lms.getCourseById(targetCourseId);
        if (!course) return res.status(404).json({ message: 'Khóa học không tồn tại' });

        if (course.teacher_id !== currentUserId) {
            return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa tài nguyên này' });
        }

        next();
    } catch (error) {
        console.error('Authorize owner error:', error);
        res.status(500).json({ message: 'Lỗi xác thực quyền sở hữu' });
    }
};

module.exports = {
    authMiddleware,
    authorizeTeacher,
    authorizeAdmin,
    authorizeCourseOwner
};