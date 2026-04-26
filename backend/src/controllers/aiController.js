const multer = require('multer');
const geminiService = require('../services/geminiService');
const db = require('../config/database');

// Cấu hình multer để xử lý file AI (Dùng Memory Storage vì không cần lưu trữ lâu dài)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // Giới hạn 10MB cho tài liệu AI
    }
});

const aiController = {
    /**
     * Tạo danh sách câu hỏi Quiz từ mô tả và/hoặc tài liệu
     */
    generateQuiz: async (req, res) => {
        try {
            const { description } = req.body;
            const fileData = req.file; // Buffer từ multer memoryStorage

            if (!description && !fileData) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng cung cấp mô tả hoặc tài liệu đính kèm để AI tạo câu hỏi."
                });
            }

            const result = await geminiService.generateQuizJSON(
                description || "Hãy tạo bộ câu hỏi trắc nghiệm dựa trên tài liệu đính kèm.",
                fileData
            );

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error("AI Generate Quiz Error:", error);
            res.status(500).json({
                success: false,
                message: "Có lỗi xảy ra khi yêu cầu AI tạo câu hỏi. Vui lòng thử lại sau."
            });
        }
    },

    /**
     * Giải thích một câu hỏi cụ thể dựa trên ngữ cảnh khóa học
     */
    explainQuiz: async (req, res) => {
        try {
            const { question_id, user_answer_text } = req.body;
            const userId = req.user.id; // Lấy từ token middleware

            if (!question_id) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu question_id để thực hiện giải thích."
                });
            }

            // 1. Lấy thông tin câu hỏi, đáp án và course_id tự động
            const questionData = await new Promise((resolve, reject) => {
                const query = `
                    SELECT qq.question_text, qo.option_text, qo.is_correct, q.course_id
                    FROM quiz_questions qq
                    JOIN quiz_options qo ON qq.id = qo.question_id
                    JOIN quizzes q ON qq.quiz_id = q.id
                    WHERE qq.id = ?
                `;
                db.query(query, [question_id], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            if (!questionData || questionData.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy dữ liệu cho câu hỏi này."
                });
            }

            const { question_text, course_id } = questionData[0];
            const options = questionData.map(r => ({
                option_text: r.option_text,
                is_correct: r.is_correct === 1
            }));

            // 2. Tự động lấy câu trả lời của người dùng từ DB (ưu tiên hơn payload)
            let finalUserAnswer = user_answer_text;
            const dbAnswer = await new Promise((resolve) => {
                const query = `
                    SELECT qo.option_text
                    FROM quiz_answers qans
                    JOIN quiz_attempts qa ON qans.attempt_id = qa.id
                    JOIN quiz_options qo ON qans.selected_option_id = qo.id
                    WHERE qa.user_id = ? AND qans.question_id = ?
                    ORDER BY qa.end_time DESC
                    LIMIT 1
                `;
                db.query(query, [userId, question_id], (err, results) => {
                    if (err || results.length === 0) return resolve(null);
                    resolve(results[0].option_text);
                });
            });

            if (dbAnswer) {
                finalUserAnswer = dbAnswer;
            }

            // 3. Lấy tiêu đề khóa học làm ngữ cảnh
            const courseTitle = await new Promise((resolve) => {
                if (!course_id) return resolve("Khóa học trực tuyến");
                db.query("SELECT title FROM courses WHERE id = ?", [course_id], (err, results) => {
                    if (err || results.length === 0) return resolve("Khóa học trực tuyến");
                    resolve(results[0].title);
                });
            });

            // 4. Gọi service AI để lấy lời giải thích
            const explanation = await geminiService.explainQuestion(
                courseTitle,
                question_text,
                options,
                finalUserAnswer
            );

            res.json({
                success: true,
                explanation
            });
        } catch (error) {
            console.error("AI Explain Quiz Error:", error);
            res.status(500).json({
                success: false,
                message: "Không thể kết nối với AI để lấy lời giải thích. Vui lòng thử lại sau."
            });
        }
    }
};

module.exports = { aiController, upload };
