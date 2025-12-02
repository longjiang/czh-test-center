import React, { useEffect, useMemo, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatSeconds } from '../utils/time.js';

function QuizRunner({ quiz, courseName }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(quiz?.timeLimitSeconds ?? 0);
  const [submitted, setSubmitted] = useState(false);
  const questionCount = quiz?.questions?.filter((item) => item.type !== 'heading').length ?? 0;

  useEffect(() => {
    setHasStarted(false);
    setSubmitted(false);
    setAnswers({});
    setRemainingSeconds(quiz?.timeLimitSeconds ?? 0);
  }, [quiz]);

  useEffect(() => {
    if (!hasStarted || submitted) {
      return undefined;
    }
    if (remainingSeconds <= 0) {
      setSubmitted(true);
      return undefined;
    }

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [hasStarted, submitted, remainingSeconds]);

  const correctCount = useMemo(() => {
    if (!submitted || !quiz) return 0;
    return quiz.questions.reduce((count, question) => {
      if (question.type === 'heading') return count;
      return answers[question.id] === question.answer ? count + 1 : count;
    }, 0);
  }, [answers, quiz, submitted]);

  const handleSelect = (questionId, optionKey) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!quiz) {
    return <div className="text-sm text-slate-600">Select a quiz to begin.</div>;
  }

  return (
    <div className="space-y-4">
      <header className="card flex flex-col gap-2">
        <div className="text-xs uppercase font-semibold text-blue-700 tracking-wide">{courseName}</div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{quiz.title}</h1>
            <p className="text-sm text-slate-600">
              {questionCount} questions · Time limit {formatSeconds(quiz.timeLimitSeconds)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="badge">JSON-backed</span>
            <span className="badge">Multiple Choice</span>
          </div>
        </div>
        {!hasStarted ? (
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-slate-700">
              Questions stay hidden until you click start. Your timer begins immediately after starting.
            </p>
            <button className="button-primary" onClick={() => setHasStarted(true)}>
              Start Quiz
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-700 flex items-center gap-3">
            <span className="badge">In progress</span>
            <span>Timer running — auto-submits at 00:00.</span>
          </div>
        )}
      </header>

      {hasStarted && (
        <ProgressBar remainingSeconds={remainingSeconds} totalSeconds={quiz.timeLimitSeconds} />
      )}

      {hasStarted && (
        <div className="space-y-4">
          {(() => {
            let ordinal = 0;
            return quiz.questions.map((item) => {
              if (item.type === 'heading') {
                return (
                  <div key={item.id} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded">
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  </div>
                );
              }
              ordinal += 1;
              const correctOption = item.options.find((option) => option.key === item.answer);
              const selectedOption = answers[item.id];
              const isCorrect = submitted ? selectedOption === item.answer : null;
              return (
                <QuestionCard
                  key={item.id}
                  question={item}
                  selectedOption={selectedOption}
                  correctOption={correctOption}
                  isCorrect={isCorrect}
                  submitted={submitted}
                  onSelect={(optionKey) => handleSelect(item.id, optionKey)}
                  disabled={submitted}
                  ordinal={ordinal}
                />
              );
            });
          })()}
        </div>
      )}

      {hasStarted && (
        <div className="flex items-center gap-3">
          <button className="button-primary" onClick={handleSubmit} disabled={submitted}>
            {submitted ? 'Submitted' : 'Submit Answers'}
          </button>
          {submitted && (
            <div className="text-sm text-slate-700 flex flex-col gap-1">
              <span>
                Score: {correctCount} / {quiz.questions.length}
              </span>
              <span className="text-slate-600">
                Review answers below — correct options are highlighted in green, and any mistakes in red.
              </span>
            </div>
          )}
        </div>
      )}

      {!hasStarted && (
        <div className="card text-sm text-slate-700 bg-slate-50 border-dashed">
          Questions and submit controls appear after you click Start Quiz.
        </div>
      )}
    </div>
  );
}

export default QuizRunner;
