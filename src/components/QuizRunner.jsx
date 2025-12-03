import React, { useEffect, useMemo, useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatSeconds } from '../utils/time.js';

function QuizRunner({ quiz, courseName }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(quiz?.timeLimitSeconds ?? 0);
  const [submitted, setSubmitted] = useState(false);
  const questionCount =
    quiz?.questions?.filter((item) => item.type !== 'heading' && item.type !== 'image-set').length ?? 0;
  const fullScore = quiz?.fullScore ?? questionCount;
  const resetIndexAt = quiz?.resetOrdinalAt ?? null;

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
      if (question.type === 'heading' || question.type === 'image-set') return count;
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
        </div>
        {!hasStarted ? (
          <div className="flex items-center justify-between flex-wrap gap-3">
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
        <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur">
          <ProgressBar remainingSeconds={remainingSeconds} totalSeconds={quiz.timeLimitSeconds} />
        </div>
      )}

      {hasStarted && (
        <div className="space-y-4">
          {(() => {
            let ordinal = 0;
            return quiz.questions.map((item) => {
              if (item.type === 'heading') {
                const level = Math.min(Math.max(item.level ?? 2, 2), 4);
                const Tag = `h${level}`;
                const sizing = {
                  2: 'text-lg',
                  3: 'text-base',
                  4: 'text-sm',
                }[level];
                return (
                  <div key={item.id} className="px-1 py-2">
                    <Tag className={`${sizing} font-semibold text-slate-800`}>{item.label}</Tag>
                  </div>
                );
              }
              if (item.type === 'image-set') {
                return (
                  <div key={item.id} className="card space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                      <span className="badge">Reference</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
                      {item.options.map((option) => (
                        <div
                          key={option.key}
                          className="flex flex-col items-center gap-1 p-1"
                        >
                          <div className="flex items-center justify-center w-full bg-white rounded aspect-square overflow-hidden">
                            <img
                              src={option.image}
                              alt={option.alt ?? option.label ?? `Image ${option.key}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            {option.key}. {option.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (resetIndexAt && item.id === resetIndexAt) {
                ordinal = 0;
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
                Score: {Math.min(correctCount, fullScore)} / {fullScore}
              </span>
              {correctCount > fullScore && (
                <span className="text-xs text-slate-600">Bonus: +{correctCount - fullScore} above full score</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizRunner;
