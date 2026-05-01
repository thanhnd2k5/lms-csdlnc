const multer = require('multer');
const path = require('path');
const fs = require('fs');
const document = require('../models/document');
const lms = require('../models/lms');
const fileHelper = require('../utils/fileHelper');

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/documents';
        // Tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Tạo tên file unique bằng timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf', 
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, Word documents and images (JPEG, PNG, JPG) are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    }
});

const documentController = {
    uploadDocument: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { courseId, chapterId, videoId, title } = req.body;
            
            if (!courseId) {
                if (req.file && req.file.path) await fileHelper.deleteFile(req.file.path);
                return res.status(400).json({ message: 'Course ID is required' });
            }

            // Kiểm tra quyền sở hữu khóa học
            const courseDataFromDb = await lms.getCourseById(courseId);
            if (!courseDataFromDb) {
                if (req.file && req.file.path) await fileHelper.deleteFile(req.file.path);
                return res.status(404).json({ message: 'Course not found' });
            }

            if (req.user.role !== 'admin' && courseDataFromDb.teacher_id !== req.user.id) {
                if (req.file && req.file.path) await fileHelper.deleteFile(req.file.path);
                return res.status(403).json({ message: 'You do not have permission to upload documents to this course' });
            }

            // Tạo document record trong database
            const documentData = {
                title: title || req.file.originalname,
                file_path: req.file.path,
                file_type: path.extname(req.file.originalname).substring(1),
                course_id: courseId,
                chapter_id: chapterId || null,
                video_id: videoId || null,
                teacher_id: req.user.id // Người thực hiện upload
            };

            const result = await document.createDocument(documentData);

            res.status(201).json({
                message: 'Document uploaded successfully',
                document: result
            });
        } catch (error) {
            console.error('Error uploading document:', error);
            // Xóa file nếu có lỗi xảy ra khi lưu vào database
            if (req.file && req.file.path) {
                await fileHelper.deleteFile(req.file.path);
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getDocuments: async (req, res) => {
        try {
            const { courseId, chapterId, videoId } = req.query;
            const documents = await document.getDocuments(courseId, chapterId, videoId);
            res.json(documents);
        } catch (error) {
            console.error('Error getting documents:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    downloadDocument: async (req, res) => {
        try {
            const documentId = req.params.id;
            const doc = await document.getDocumentById(documentId);

            if (!doc) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const filePath = doc.file_path;
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File not found' });
            }

            res.download(filePath, doc.title + path.extname(filePath));
        } catch (error) {
            console.error('Error downloading document:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteDocument: async (req, res) => {
        try {
            const documentId = req.params.id;
            const doc = await document.getDocumentById(documentId);

            if (!doc) {
                return res.status(404).json({ message: 'Document not found' });
            }

            const filePathToDelete = doc.file_path;

            // Xóa record trong database trước để đảm bảo tính toàn vẹn
            await document.deleteDocument(documentId);

            // Xóa file vật lý sau khi DB đã được cập nhật thành công
            await fileHelper.deleteFile(filePathToDelete);

            res.json({ message: 'Document deleted successfully' });
        } catch (error) {
            console.error('Error deleting document:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = { documentController, upload }; 