import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Videos from './videos/videos';
import Menu from './menu/menu';
import Quiz from './quiz/Quiz';
import CourseVideoNavbar from './components/CourseVideoNavbar';
import DocumentsList from './components/DocumentsList';
import { useCourseData } from './hooks/useCourseData';
import { LoadingOutlined } from '@ant-design/icons';
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
        const isChapterQuiz = q.chapter_id === selectedVideo.chapter_id && q.quiz_type === 'chapter';
        if (isChapterQuiz) {
          const chapterVideos = videos.filter(v => v.chapter_id === selectedVideo.chapter_id);
          const isLocked = chapterVideos.length > 0 && !chapterVideos.every(v => watchedVideos.includes(v.id));
          return { ...q, locked: isLocked };
        }
        return { ...q, locked: false };
      });
  }, [selectedVideo, quizzes, videos, watchedVideos]);

  if (loading) return <div className="loading-icon"><LoadingOutlined /></div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="course-page-layout">
      <CourseVideoNavbar courseTitle={courseInfo?.title} />
      <div className="course-videos-container">
        <aside className="menu-section">
          <Menu
            videos={videos}
            chapters={chapters}
            quizzes={quizzes}
            watchedVideos={watchedVideos}
            onVideoSelect={handleVideoSelect}
            onQuizSelect={handleQuizSelect}
          />
        </aside>
        <main className="content-section">
          {selectedVideo && (
            <>
              <Videos 
                video={selectedVideo} 
                chapter={chapters.find(c => c.id === selectedVideo.chapter_id)}
                quizzes={filteredQuizzes} 
                onQuizSelect={handleQuizSelect}
              />
              <DocumentsList documents={documents} />
            </>
          )}
          {selectedQuiz && <Quiz quiz={selectedQuiz} />}
        </main>
      </div>
    </div>
  );
};

export default CourseVideosPage;