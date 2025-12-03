import React, { useEffect, useMemo, useState } from 'react';
import CourseSelector from './components/CourseSelector.jsx';
import QuizRunner from './components/QuizRunner.jsx';
import { courses, getQuiz } from './utils/quizData.js';

function App() {
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id ?? '');
  const [selectedQuizId, setSelectedQuizId] = useState(courses[0]?.quizzes[0]?.id ?? '');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    const quizParam = params.get('quiz');

    const courseFromUrl = courses.find((course) => course.id === courseParam);
    if (courseFromUrl) {
      setSelectedCourseId(courseFromUrl.id);
      const quizFromUrl = courseFromUrl.quizzes.find((quiz) => quiz.id === quizParam);
      setSelectedQuizId(quizFromUrl?.id ?? courseFromUrl.quizzes[0]?.id ?? '');
    }
  }, []);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId),
    [selectedCourseId],
  );

  useEffect(() => {
    if (selectedCourse && !selectedCourse.quizzes.find((quiz) => quiz.id === selectedQuizId)) {
      setSelectedQuizId(selectedCourse.quizzes[0]?.id ?? '');
    }
  }, [selectedCourse, selectedQuizId]);

  useEffect(() => {
    if (!selectedCourseId || !selectedQuizId) return;
    const url = new URL(window.location.href);
    url.searchParams.set('course', selectedCourseId);
    url.searchParams.set('quiz', selectedQuizId);
    window.history.replaceState({}, '', url);
  }, [selectedCourseId, selectedQuizId]);

  const currentQuiz = getQuiz(selectedCourseId, selectedQuizId);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <header className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">Chinese Zero to Hero</p>
            <h1 className="text-3xl font-bold text-slate-900">Quiz & Exam Center</h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Select a course and quiz to begin. Content is loaded from JSON files per lesson; questions stay hidden until you start to keep the experience exam-like.
            </p>
          </div>
          <div className="text-xs text-slate-600 bg-white border border-slate-200 shadow-sm rounded-lg px-3 py-2">
            <div className="font-semibold text-slate-800">Specs</div>
            <div>React + Tailwind</div>
            <div>JSON-backed quizzes</div>
            <div>Timer & progress bar</div>
          </div>
        </header>

        <CourseSelector
          courses={courses}
          selectedCourseId={selectedCourseId}
          onCourseChange={setSelectedCourseId}
          selectedQuizId={selectedQuizId}
          onQuizChange={setSelectedQuizId}
        />

        <QuizRunner quiz={currentQuiz} courseName={selectedCourse?.name ?? ''} />
      </div>
    </div>
  );
}

export default App;
