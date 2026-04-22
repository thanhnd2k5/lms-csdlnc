import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomeLayout from "./components/layout/HomeLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import FluidLayout from "./components/layout/FluidLayout";
import CourseVideosPage from "./components/course_videos/course_videos_page";
import Home from "./components/home/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/auth/PrivateRoute";
import PrivateRouteTeacher from "./components/auth/PrivateRouteTeacher";
import AdminPage from "./components/admin/admin_page";
import AdminRoute from "./components/auth/AdminRoute";
import VideoManagement from "./components/admin/courses/manage_video/video_management";
import CreateQuiz from "./components/admin/quizzes/create_quiz";
import QuestionManagement from "./components/admin/quizzes/questions/question_management";
import TeacherPage from "./components/teacher/teacher_page";
import TeacherVideoManagement from "./components/teacher/courses/video_management";
import TeacherDocumentManagement from "./components/teacher/courses/manage_document/document_management";
import CreateQuizTeacher from "./components/teacher/quizzes/create_quiz";
import { useEffect } from "react";
import CheckEmail from "./components/auth/CheckEmail";
import EmailVerification from "./components/auth/EmailVerification";
import EnrolledCourses from "./components/user/enrolled_courses/enrolled_courses";
import CourseInfo from "./components/course_info/course_info";
import TeacherEnrollmentDetails from "./components/teacher/enrollment_details/TeacherEnrollmentDetails";
import SearchResults from "./components/common/search/SearchResults";
import Profile from "./components/profile/profile";
import ClassManagement from "./components/teacher/classes/ClassManagement";
import ClassCourseManagement from "./components/teacher/classes/classCourseManagement";
import EnrolledClasses from "./components/user/classes/EnrolledClasses";
import ClassCourse from "./components/user/classes/classCourse";
import TeacherCreatedCourses from "./components/teacher/courses/TeacherCreatedCourses";
import AllCoursesPage from "./components/home/AllCoursesPage";

function App() {
  useEffect(() => {
    const handleLoginSuccess = () => {
      const role = localStorage.getItem("role");
      console.log("Login success event, role:", role);
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);
    return () => window.removeEventListener("loginSuccess", handleLoginSuccess);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />

        {/* Home Route - With HomeLayout */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<AllCoursesPage />} />
        </Route>

        {/* General Routes - With MainLayout */}
        <Route element={<MainLayout />}>
          
          <Route
            path="/course/:courseId"
            element={
              <PrivateRoute>
                <CourseVideosPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/enrolled-courses"
            element={
              <PrivateRoute>
                <EnrolledCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/course-info/:courseId"
            element={
              <PrivateRoute>
                <CourseInfo />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/enrolled-classes"
            element={
              <PrivateRoute>
                <EnrolledClasses />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/classes/:classId/courses"
            element={
              <PrivateRoute>
                <ClassCourse />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fluid Routes - With FluidLayout */}
        <Route element={<FluidLayout />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Dashboard Routes (Admin & Teacher) - With DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/courses/:courseId/videos"
            element={
              <AdminRoute>
                <VideoManagement />
              </AdminRoute>
            }
          />
          <Route 
            path="/admin/quizzes/create" 
            element={
              <AdminRoute>
                <CreateQuiz />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/quizzes/edit/:id" 
            element={
              <AdminRoute>
                <CreateQuiz />
              </AdminRoute>
            } 
          />
          <Route
            path="/admin/quizzes/:quizId/questions"
            element={
              <AdminRoute>
                <QuestionManagement />
              </AdminRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/teacher/*"
            element={
              <PrivateRouteTeacher>
                <TeacherPage />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/courses/:courseId/videos"
            element={
              <PrivateRouteTeacher>
                <TeacherVideoManagement />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/my-courses"
            element={
              <PrivateRouteTeacher>
                <TeacherCreatedCourses />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/courses/:courseId/documents"
            element={
              <PrivateRouteTeacher>
                <TeacherDocumentManagement />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/quizzes/create"
            element={
              <PrivateRouteTeacher>
                <CreateQuizTeacher />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/quizzes/edit/:id"
            element={
              <PrivateRouteTeacher>
                <CreateQuizTeacher />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/quizzes/:quizId/questions"
            element={
              <PrivateRouteTeacher>
                <QuestionManagement />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/enrollments"
            element={
              <PrivateRouteTeacher>
                <TeacherEnrollmentDetails />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/classes"
            element={
              <PrivateRouteTeacher>
                <ClassManagement />
              </PrivateRouteTeacher>
            }
          />
          <Route
            path="/teacher/classes/:classId/courses"
            element={
              <PrivateRouteTeacher>
                <ClassCourseManagement />
              </PrivateRouteTeacher>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
