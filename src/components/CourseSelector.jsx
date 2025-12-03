import React from 'react';

function CourseSelector({
  courses,
  selectedCourseId,
  onCourseChange,
  selectedQuizId,
  onQuizChange,
}) {
  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  return (
    <div className="card space-y-3 mb-4">
      <p className="text-sm text-slate-600 mt-1 max-w-2xl">
        Select a course and quiz to begin.
      </p>
      <div>
        <div className="text-sm font-semibold text-slate-700">Course</div>
        <select
          value={selectedCourseId}
          onChange={(e) => onCourseChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="text-sm font-semibold text-slate-700">Quiz / Exam</div>
        <select
          value={selectedQuizId}
          onChange={(e) => onQuizChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          disabled={!selectedCourse}
        >
          <option value="">{selectedCourse ? 'Select a quiz' : 'Select a course first'}</option>
          {selectedCourse?.quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CourseSelector;
