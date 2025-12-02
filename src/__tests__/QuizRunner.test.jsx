import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import QuizRunner from '../components/QuizRunner.jsx';

const quiz = {
  id: 'sample-quiz',
  title: 'Sample Quiz',
  timeLimitSeconds: 120,
  questions: [
    {
      id: 'q1',
      prompt: 'First question',
      type: 'multiple-choice',
      options: [
        { key: 'A', label: 'Option A' },
        { key: 'B', label: 'Option B' },
      ],
      answer: 'A',
    },
    {
      id: 'q2',
      prompt: 'Second question',
      type: 'multiple-choice',
      options: [
        { key: 'A', label: 'First choice' },
        { key: 'B', label: 'Second choice' },
      ],
      answer: 'B',
    },
  ],
};

describe('QuizRunner', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('lets a learner start, answer, and submit a quiz', () => {
    render(<QuizRunner quiz={quiz} courseName="Intro" />);

    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    expect(screen.queryByText('First question')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Start Quiz'));
    expect(screen.getByText('First question')).toBeInTheDocument();
    expect(screen.getByText('Second question')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Option A/i));
    fireEvent.click(screen.getByLabelText(/Second choice/i));

    fireEvent.click(screen.getByRole('button', { name: 'Submit Answers' }));

    expect(screen.getByText('Score: 2 / 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submitted' })).toBeDisabled();
  });

  it('auto submits when the timer reaches zero', () => {
    vi.useFakeTimers();
    const shortQuiz = { ...quiz, timeLimitSeconds: 2 };

    render(<QuizRunner quiz={shortQuiz} courseName="Intro" />);
    fireEvent.click(screen.getByText('Start Quiz'));
    expect(screen.getByText('00:02')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2100);
    });

    expect(screen.getByRole('button', { name: 'Submitted' })).toBeDisabled();
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });
});
