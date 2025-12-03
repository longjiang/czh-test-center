import React from 'react';

function QuestionCard({
  question,
  selectedOption,
  correctOption,
  isCorrect,
  submitted,
  onSelect,
  disabled,
  ordinal,
}) {
  const userOption = question.options.find((option) => option.key === selectedOption);
  const cardTone = submitted
    ? isCorrect
      ? 'border-green-200 bg-green-50'
      : 'border-rose-200 bg-rose-50'
    : '';

  return (
    <div className={`card space-y-3 ${cardTone}`}>
      <div className="flex items-start gap-2">
        <div className="flex items-center gap-2">
          <span className="badge">{ordinal ? `#${ordinal}` : 'Question'}</span>
          <span className="badge">{question.type === 'multiple-choice' ? 'Multiple Choice' : 'Question'}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-slate-900 text-sm leading-tight font-normal">{question.prompt}</p>
          {question.audioSrc && (
            <audio className="mt-1" controls preload="none" src={question.audioSrc}>
              Your browser does not support the audio element.
            </audio>
          )}
          {submitted && (
            <span className={`text-xs font-semibold uppercase ${isCorrect ? 'text-green-700' : 'text-rose-700'}`}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.key}
            className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${
              submitted
                ? option.key === question.answer
                  ? 'border-green-400 bg-green-50'
                  : selectedOption === option.key
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-slate-200'
                : selectedOption === option.key
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-200'
            } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <input
              type="radio"
              className="h-4 w-4 text-blue-600"
              name={question.id}
              value={option.key}
              checked={selectedOption === option.key}
              onChange={() => onSelect(option.key)}
              disabled={disabled}
            />
            <span className="text-sm text-slate-800 flex items-center gap-3">
              <strong className="mr-1">{option.key}.</strong>
              {option.image && (
                <img
                  src={option.image}
                  alt={option.alt ?? option.label ?? `Option ${option.key}`}
                  className="h-16 w-16 rounded border border-slate-200 object-cover bg-white"
                />
              )}
              <span>{option.label}</span>
            </span>
          </label>
        ))}
      </div>
      {submitted && (
        <div
          className={`rounded-lg border p-3 text-sm ${
            isCorrect ? 'border-green-200 bg-green-50 text-green-800' : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
        >
          {isCorrect ? (
            <p className="font-semibold">You got it right.</p>
          ) : (
            <p className="font-semibold">Your answer was incorrect.</p>
          )}
          <p className="mt-1 text-slate-800">
            <span className="font-semibold text-slate-900">Correct answer:</span>{' '}
            <strong className="mr-1">{correctOption?.key}.</strong>
            {correctOption?.label}
          </p>
          {userOption && !isCorrect && (
            <p className="mt-1 text-slate-700">
              <span className="font-semibold">You chose:</span> <strong className="mr-1">{userOption.key}.</strong>
              {userOption.label}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
