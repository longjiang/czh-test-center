import React from 'react';

function QuestionCard({ question, selectedOption, onSelect, disabled }) {
  return (
    <div className="card space-y-3">
      <div className="flex items-start gap-2">
        <span className="badge">{question.type === 'multiple-choice' ? 'Multiple Choice' : 'Question'}</span>
        <p className="text-slate-900 font-semibold leading-tight">{question.prompt}</p>
      </div>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.key}
            className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${
              selectedOption === option.key
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
            <span className="text-sm text-slate-800">
              <strong className="mr-1">{option.key}.</strong>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
