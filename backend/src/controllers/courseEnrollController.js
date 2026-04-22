const courseEnroll = require("../models/courseEnroll");

// Thêm hàm mới để lấy khóa học đã đăng ký
const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrolledCourses = await courseEnroll.getEnrolledCourses(userId);
    res.json(enrolledCourses);
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const enrollInCourse = (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;

  courseEnroll.checkEnrollment(userId, courseId, (error, isEnrolled) => {
    if (error) {
      console.error("Error checking enrollment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    courseEnroll.enrollUserInCourse(userId, courseId, (error, result) => {
      if (error) {
        console.error("Error enrolling in course:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Enrolled successfully" });
    });
  });
};

const checkEnrollmentStatus = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const courseId = req.params.courseId;

  try {
    // 1. Nếu là admin thì luôn có quyền
    if (userRole === "admin") {
      return res.json({ isEnrolled: true, isOwner: true, isAdmin: true });
    }

    // 2. Kiểm tra xem người dùng có phải là giáo viên của khóa học không
    const courseDetails = await courseEnroll.getCourseDetails(courseId);
    if (courseDetails && courseDetails.teacher_id === userId) {
      return res.json({ isEnrolled: true, isOwner: true, isAdmin: false });
    }

    // 3. Nếu không phải giáo viên, kiểm tra bảng enrollment
    courseEnroll.checkEnrollment(userId, courseId, (error, isEnrolled) => {
      if (error) {
        console.error("Error checking enrollment:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json({ isEnrolled, isOwner: false, isAdmin: false });
    });
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTeacherStats = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const stats = await courseEnroll.getTeacherStats(teacherId);
    res.json(stats);
  } catch (error) {
    console.error("Error getting teacher stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseDetails = await courseEnroll.getCourseDetails(courseId);

    if (!courseDetails) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }

    res.json(courseDetails);
  } catch (error) {
    console.error("Error getting course details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTeacherEnrollmentDetails = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Kiểm tra role là teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({
        message: "Chỉ giáo viên mới có quyền truy cập thông tin này",
      });
    }

    const enrollmentDetails =
      await courseEnroll.getEnrollmentDetailsByTeacher(teacherId);
    res.json(enrollmentDetails);
  } catch (error) {
    console.error("Error getting enrollment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  enrollInCourse,
  checkEnrollmentStatus,
  getTeacherStats,
  getEnrolledCourses,
  getCourseDetails,
  getTeacherEnrollmentDetails,
};
