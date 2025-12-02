import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CourseSelector from '../components/CourseSelector.jsx';

const courses = [
  {
    id: 'intro',
    name: 'Intro Chinese',
    quizzes: [
      { id: 'intro-q1', title: 'Lesson 1' },
      { id: 'intro-q2', title: 'Lesson 2' },
    ],
  },
  {
    id: 'characters',
    name: 'Chinese Characters',
    quizzes: [{ id: 'chars-q1', title: 'Stroke Order' }],
  },
];

describe('CourseSelector', () => {
  it('renders course and quiz options and triggers change callbacks', () => {
    const onCourseChange = vi.fn();
    const onQuizChange = vi.fn();

    render(
      <CourseSelector
        courses={courses}
        selectedCourseId="intro"
        onCourseChange={onCourseChange}
        selectedQuizId="intro-q1"
        onQuizChange={onQuizChange}
      />,
    );

    const [courseSelect, quizSelect] = screen.getAllByRole('combobox');

    expect(courseSelect.value).toBe('intro');
    expect(quizSelect.value).toBe('intro-q1');
    expect(screen.getByRole('option', { name: 'Lesson 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Lesson 2' })).toBeInTheDocument();

    fireEvent.change(courseSelect, { target: { value: 'characters' } });
    expect(onCourseChange).toHaveBeenCalledWith('characters');

    fireEvent.change(quizSelect, { target: { value: 'intro-q2' } });
    expect(onQuizChange).toHaveBeenCalledWith('intro-q2');
  });
});
