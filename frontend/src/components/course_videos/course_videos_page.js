import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Videos from './videos/videos';
import Menu from './menu/menu';
import Quiz from './quiz/Quiz';
import CourseVideoNavbar from './components/CourseVideoNavbar';
import DocumentsList from './components/DocumentsList';
import { useCourseData } from './hooks/useCourseData';
import { LoadingOutlined } from '@ant-design/icons';
import authService from '../../services/authService';
import './course_videos_page.css';

const CourseVideosPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');

  const {
    chapters,
    videos,
    quizzes,
    documents,
    watchedVideos,
    courseInfo,
    loading,
    error,
    fetchDocuments,
    fetchInitialData
  } = useCourseData(courseId);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const currentUser = authService.getCurrentUser();
  const isOwnerOrAdmin = useMemo(() => {
    return currentUser && (currentUser.role === 'admin' || currentUser.id === courseInfo?.teacher_id);
  }, [currentUser, courseInfo]);

  // Khởi tạo dữ liệu ban đầu
  useEffect(() => {
    const init = async () => {
      const data = await fetchInitialData();
      if (data.videos.length > 0) {
        const targetVideo = videoId
          ? data.videos.find(v => v.id === parseInt(videoId)) || data.videos[0]
          : data.videos[0];

        setSelectedVideo(targetVideo);
        fetchDocuments(targetVideo.id, targetVideo.chapter_id);
        if (!videoId) {
          navigate(`/course/${courseId}?videoId=${targetVideo.id}`, { replace: true });
        }
      }
    };
    init();
  }, [courseId, fetchInitialData]); // eslint-disable-line

  const handleVideoSelect = useCallback((video) => {
    setSelectedVideo(video);
    setSelectedQuiz(null);
    fetchDocuments(video.id, video.chapter_id);
    navigate(`/course/${courseId}?videoId=${video.id}`, { replace: true });
  }, [courseId, fetchDocuments, navigate]);

  const handleQuizSelect = useCallback((quiz) => {
    if (quiz?.id) {
      setSelectedQuiz(quiz);
      setSelectedVideo(null);
    }
  }, []);

  // Memoize danh sách quiz cho video hiện tại để tránh tính toán lại lãng phí
  const filteredQuizzes = useMemo(() => {
    if (!selectedVideo) return [];
    return quizzes
      .filter(q => q.video_id === selectedVideo.id || (q.chapter_id === selectedVideo.chapter_id && q.quiz_type === 'chapter'))
      .map(q => {
        if (isOwnerOrAdmin) return { ...q, locked: false };

        const isChapterQuiz = q.chapter_id === selectedVideo.chapter_id && q.quiz_type === 'chapter';
        if (isChapterQuiz) {
          const chapterVideos = videos.filter(v => v.chapter_id === selectedVideo.chapter_id);
          const isLocked = chapterVideos.length > 0 && !chapterVideos.every(v => watchedVideos.includes(v.id));
          return { ...q, locked: isLocked };
        }
        return { ...q, locked: false };
      });
  }, [selectedVideo, quizzes, videos, watchedVideos, isOwnerOrAdmin]);

  if (loading) return <div className="loading-icon"><LoadingOutlined /></div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-50 overflow-hidden">
      <CourseVideoNavbar courseTitle={courseInfo?.title} />

      <div className="flex flex-1 overflow-hidden lg:flex-row flex-col">
        {/* Main Content (Video/Quiz) - Left side on Desktop */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-950">
          {selectedVideo && (
            <div className="w-full">
              <Videos
                video={selectedVideo}
                chapter={chapters.find(c => c.id === selectedVideo.chapter_id)}
                quizzes={filteredQuizzes}
                onQuizSelect={handleQuizSelect}
              />
              <div className="w-full px-8 pb-10">
                <DocumentsList documents={documents} />
              </div>
            </div>
          )}
          {selectedQuiz && (
            <div className="max-w-4xl mx-auto w-full p-6">
              <Quiz quiz={selectedQuiz} />
            </div>
          )}
        </main>

        {/* Menu Section - Right side on Desktop */}
        <aside className="w-full lg:w-96 lg:min-w-[384px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 overflow-y-auto custom-scrollbar flex-shrink-0">
          <Menu
            videos={videos}
            chapters={chapters}
            quizzes={quizzes}
            watchedVideos={watchedVideos}
            onVideoSelect={handleVideoSelect}
            onQuizSelect={handleQuizSelect}
            isOwnerOrAdmin={isOwnerOrAdmin}
          />
        </aside>
      </div>
    </div>
  );
};

export default CourseVideosPage;
