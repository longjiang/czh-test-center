import React, { useEffect, useMemo, useState } from 'react';
import CourseSelector from './components/CourseSelector.jsx';
import QuizRunner from './components/QuizRunner.jsx';
import { courses, getQuiz } from './utils/quizData.js';

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    const quizParam = params.get('quiz');

    const courseFromUrl = courses.find((course) => course.id === courseParam);
    if (courseFromUrl) {
      setSelectedCourseId(courseFromUrl.id);
      const quizFromUrl = courseFromUrl.quizzes.find((quiz) => quiz.id === quizParam);
      setSelectedQuizId(quizFromUrl?.id ?? '');
    }
  }, []);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId),
    [selectedCourseId],
  );

  useEffect(() => {
    if (!selectedCourse) {
      if (selectedQuizId !== '') {
        setSelectedQuizId('');
      }
      return;
    }

    if (selectedQuizId && !selectedCourse.quizzes.find((quiz) => quiz.id === selectedQuizId)) {
      setSelectedQuizId('');
    }
  }, [selectedCourse, selectedQuizId]);

  useEffect(() => {
    if (!selectedCourseId || !selectedQuizId) return;
    const url = new URL(window.location.href);
    url.searchParams.set('course', selectedCourseId);
    url.searchParams.set('quiz', selectedQuizId);
    window.history.replaceState({}, '', url);
  }, [selectedCourseId, selectedQuizId]);

  const currentQuiz = selectedCourseId && selectedQuizId ? getQuiz(selectedCourseId, selectedQuizId) : null;

  const handleCourseChange = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedQuizId('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <header className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">Chinese Zero to Hero</p>
            <h1 className="text-3xl font-bold text-slate-900">Test Center</h1>
          </div>
        </header>

        <CourseSelector
          courses={courses}
          selectedCourseId={selectedCourseId}
          onCourseChange={handleCourseChange}
          selectedQuizId={selectedQuizId}
          onQuizChange={setSelectedQuizId}
        />

        <QuizRunner quiz={currentQuiz} courseName={selectedCourse?.name ?? ''} />
      </div>
    </div>
  );
}

export default App;
