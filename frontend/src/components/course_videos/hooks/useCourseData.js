import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { message } from 'antd';

export const useCourseData = (courseId, initialVideoId) => {
  const [chapters, setChapters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchedVideos = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/videos/completed`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWatchedVideos(response.data.map(v => v.video_id));
    } catch (error) {
      console.error('Error fetching watched videos:', error);
    }
  }, []);

  const fetchDocuments = useCallback(async (videoId, chapterId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/documents`, {
        params: { courseId, chapterId, videoId }
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      message.error('Có lỗi xảy ra khi tải danh sách tài liệu');
    }
  }, [courseId]);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [chaptersRes, videosRes, quizzesRes, courseInfoRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}/chapters`),
        axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}/videos`),
        axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}/quizzes`),
        axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
      ]);

      setChapters(chaptersRes.data);
      setVideos(videosRes.data);
      setQuizzes(quizzesRes.data);
      setCourseInfo(courseInfoRes.data);

      await fetchWatchedVideos();
      setError(null);
      return { videos: videosRes.data };
    } catch (err) {
      console.error('Error fetching course data:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu khóa học');
      return { videos: [] };
    } finally {
      setLoading(false);
    }
  }, [courseId, fetchWatchedVideos]);

  useEffect(() => {
    window.addEventListener('videoCompleted', fetchWatchedVideos);
    return () => window.removeEventListener('videoCompleted', fetchWatchedVideos);
  }, [fetchWatchedVideos]);

  return {
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
  };
};
