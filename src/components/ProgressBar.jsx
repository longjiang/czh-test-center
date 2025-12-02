import React from 'react';
import { formatSeconds } from '../utils/time.js';

function ProgressBar({ remainingSeconds, totalSeconds }) {
  const percent = Math.max(0, Math.min(100, (remainingSeconds / totalSeconds) * 100));

  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-slate-700">Time Remaining</div>
        <div className="text-sm font-mono text-slate-600">{formatSeconds(remainingSeconds)}</div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
