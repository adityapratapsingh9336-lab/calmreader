import React from 'react';

export default function NumberMatcher({ problem, mode, onSelect }) {
  const isDotsToNum = mode === 'DOTS_TO_NUM';

  const renderDotCluster = (count) => (
    <div className="w-full h-32 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-wrap items-center justify-center gap-2.5 shadow-inner">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-md shadow-sky-500/25"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Target Stimulus Card */}
      {isDotsToNum ? (
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Target Dot Collection:
          </span>
          {renderDotCluster(problem.dotCount)}
        </div>
      ) : (
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Target Numeral:
          </span>
          <div className="w-28 h-28 mx-auto rounded-3xl bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center font-black font-mono text-5xl text-white shadow-xl shadow-indigo-500/20">
            {problem.targetNum}
          </div>
        </div>
      )}

      {/* Answer Options */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
          Tap the Matching Card:
        </span>
        <div className="grid grid-cols-3 gap-3">
          {problem.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(opt)}
              className="p-4 bg-slate-800/80 hover:bg-indigo-600/20 border-2 border-slate-700 hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center transition-all transform hover:scale-105 shadow-md cursor-pointer"
            >
              {isDotsToNum ? (
                <span className="font-mono font-black text-2xl text-white">
                  {opt}
                </span>
              ) : (
                <div className="w-full">
                  {renderDotCluster(opt)}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
