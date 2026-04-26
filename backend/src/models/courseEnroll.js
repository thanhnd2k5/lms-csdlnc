const db = require('../config/database');

const checkEnrollment = (userId, courseId, callback) => {
  db.query(
    'SELECT * FROM course_enrollments WHERE user_id = ? AND course_id = ?',
    [userId, courseId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results.length > 0);
    }
  );
};

const enrollUserInCourse = (userId, courseId, callback) => {
  db.query(
    'INSERT INTO course_enrollments (user_id, course_id) VALUES (?, ?)',
    [userId, courseId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    }
  );
};

const getTeacherStats = (teacherId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                c.id as course_id,
                c.title as course_title,
                COUNT(DISTINCT ce.user_id) as student_count
            FROM courses c
            LEFT JOIN course_enrollments ce ON c.id = ce.course_id
            WHERE c.teacher_id = ?
            GROUP BY c.id, c.title
        `;

        db.query(query, [teacherId], (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

const getEnrolledCourses = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        c.*,
        u.full_name as teacher_name,
        ce.enrolled_at as enrollment_date
      FROM courses c
      JOIN course_enrollments ce ON c.id = ce.course_id
      LEFT JOIN users u ON c.teacher_id = u.id
      WHERE ce.user_id = ?
      ORDER BY ce.enrolled_at DESC
    `;
    
    db.query(query, [userId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

const getCourseDetails = (courseId) => {
  return new Promise((resolve, reject) => {
    // 1. Fetch base course info
    const courseQuery = `
      SELECT 
        c.*,
        u.full_name as teacher_name,
        u.bio as teacher_bio,
        u.avatar as teacher_avatar,
        COUNT(DISTINCT ce.user_id) as total_students,
        (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews WHERE course_id = c.id) as avg_rating,
        (SELECT COUNT(*) FROM course_reviews WHERE course_id = c.id) as total_reviews,
        (SELECT COUNT(*) FROM courses WHERE teacher_id = c.teacher_id) as teacher_total_courses,
        (SELECT COUNT(DISTINCT user_id) FROM course_enrollments ce_inner JOIN courses c_inner ON ce_inner.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_total_students,
        (SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM course_reviews cr JOIN courses c_inner ON cr.course_id = c_inner.id WHERE c_inner.teacher_id = c.teacher_id) as teacher_avg_rating
      FROM courses c
      LEFT JOIN users u ON c.teacher_id = u.id
      LEFT JOIN course_enrollments ce ON c.id = ce.course_id
      WHERE c.id = ?
      GROUP BY c.id, u.full_name, u.bio, u.avatar
    `;

    db.query(courseQuery, [courseId], (error, courseResults) => {
      if (error) return reject(error);
      if (courseResults.length === 0) return resolve(null);

      const course = courseResults[0];

      // Helper to safely parse JSON strings from DB
      const safeParse = (str) => {
        try {
          return str ? JSON.parse(str) : [];
        } catch (e) {
          console.error('Error parsing JSON from DB:', e);
          return [];
        }
      };

      course.requirements = safeParse(course.requirements);
      course.highlights = safeParse(course.highlights);

      // 2. Fetch chapters, videos, documents, and quizzes in parallel
      const chaptersQuery = 'SELECT * FROM chapters WHERE course_id = ? ORDER BY order_index ASC';
      const videosQuery = 'SELECT * FROM videos WHERE course_id = ?';
      const documentsQuery = 'SELECT * FROM documents WHERE course_id = ?';
      const quizzesQuery = 'SELECT * FROM quizzes WHERE course_id = ?';

      const fetchChapters = new Promise((res, rej) => db.query(chaptersQuery, [courseId], (e, r) => e ? rej(e) : res(r)));
      const fetchVideos = new Promise((res, rej) => db.query(videosQuery, [courseId], (e, r) => e ? rej(e) : res(r)));
      const fetchDocuments = new Promise((res, rej) => db.query(documentsQuery, [courseId], (e, r) => e ? rej(e) : res(r)));
      const fetchQuizzes = new Promise((res, rej) => db.query(quizzesQuery, [courseId], (e, r) => e ? rej(e) : res(r)));

      Promise.all([fetchChapters, fetchVideos, fetchDocuments, fetchQuizzes])
        .then(([chapters, videos, documents, quizzes]) => {
          // 3. Assemble hierarchy
          const structuredChapters = chapters.map(chapter => {
            const chapterItems = [
              ...videos.filter(v => v.chapter_id === chapter.id).map(v => ({ ...v, type: 'video' })),
              ...documents.filter(d => d.chapter_id === chapter.id).map(d => ({ ...d, type: 'document' })),
              ...quizzes.filter(q => q.chapter_id === chapter.id).map(q => ({ ...q, type: 'quiz' }))
            ];
            
            return {
              ...chapter,
              items: chapterItems
            };
          });

          // Handle orphan items (items not assigned to any chapter)
          const orphanItems = [
            ...videos.filter(v => !v.chapter_id).map(v => ({ ...v, type: 'video' })),
            ...documents.filter(d => !d.chapter_id).map(d => ({ ...d, type: 'document' })),
            ...quizzes.filter(q => !q.chapter_id).map(q => ({ ...q, type: 'quiz' }))
          ];

          course.chapters = structuredChapters;
          course.orphanItems = orphanItems;
          course.total_videos = videos.length;
          course.total_documents = documents.length;
          course.total_quizzes = quizzes.length;

          resolve(course);
        })
        .catch(reject);
    });
  });
};

const getEnrollmentDetailsByTeacher = (teacherId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        c.id as course_id,
        c.title as course_title,
        c.thumbnail,
        u.id as student_id,
        u.full_name as student_name,
        u.email as student_email,
        ce.enrolled_at,
        COUNT(DISTINCT v.id) as total_videos,
        COUNT(DISTINCT CASE WHEN vc.is_completed = 1 THEN v.id END) as completed_videos,
        COUNT(DISTINCT d.id) as total_documents
      FROM courses c
      JOIN course_enrollments ce ON c.id = ce.course_id
      JOIN users u ON ce.user_id = u.id
      LEFT JOIN videos v ON c.id = v.course_id
      LEFT JOIN video_completion vc ON v.id = vc.video_id AND vc.user_id = u.id
      LEFT JOIN documents d ON c.id = d.course_id
      WHERE c.teacher_id = ?
      GROUP BY c.id, u.id, c.title, c.thumbnail, u.full_name, u.email, ce.enrolled_at
      ORDER BY ce.enrolled_at DESC
    `;

    db.query(query, [teacherId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const coursesMap = new Map();
      
      results.forEach(row => {
        if (!coursesMap.has(row.course_id)) {
          coursesMap.set(row.course_id, {
            id: row.course_id,
            title: row.course_title,
            thumbnail: row.thumbnail,
            total_videos: row.total_videos,
            total_documents: row.total_documents,
            students: []
          });
        }

        const progress = row.total_videos > 0 
          ? Math.round((row.completed_videos / row.total_videos) * 100) 
          : 0;

        coursesMap.get(row.course_id).students.push({
          id: row.student_id,
          name: row.student_name,
          email: row.student_email,
          enrolled_at: row.enrolled_at,
          completed_videos: row.completed_videos,
          total_videos: row.total_videos,
          progress: progress
        });
      });

      resolve(Array.from(coursesMap.values()));
    });
  });
};

module.exports = {
  checkEnrollment,
  enrollUserInCourse,
  getTeacherStats,
  getEnrolledCourses,
  getCourseDetails,
  getEnrollmentDetailsByTeacher
}; 