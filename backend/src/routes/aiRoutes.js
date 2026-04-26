const express = require('express');
const router = express.Router();
const { aiController, upload } = require('../controllers/aiController');
const { authMiddleware, isTeacher } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/ai/quiz/generate
 * @desc    Giáo viên mô tả hoặc upload tài liệu để AI tạo bộ câu hỏi trắc nghiệm
 * @access  Private (Teacher)
 */
router.post(
    '/quiz/generate', 
    authMiddleware, 
    isTeacher, 
    upload.single('file'), 
    aiController.generateQuiz
);

/**
 * @route   POST /api/ai/quiz/explain
 * @desc    Học viên yêu cầu AI giải thích chi tiết một câu hỏi
 * @access  Private (All Users)
 */
router.post(
    '/quiz/explain', 
    authMiddleware, 
    aiController.explainQuiz
);

module.exports = router;
