import React from 'react';

export default function QuantityCompare({ problem, onSelect }) {
  const { leftCount, rightCount, leftSpacing, rightSpacing, isEqual, moreSide } = problem;

  const renderDots = (count, spacing) => {
    const isWide = spacing === 'wide' || spacing === 'huge';
    const isCompact = spacing === 'compact';

    return (
      <div
        className={`w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-wrap items-center justify-center transition-all ${
          isWide ? 'gap-4 md:gap-5' : isCompact ? 'gap-1.5 max-w-[140px] mx-auto' : 'gap-3'
        }`}
      >
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 shadow-md shadow-indigo-500/25 transition-transform ${
              isWide ? 'w-6 h-6 md:w-7 md:h-7' : isCompact ? 'w-4 h-4 md:w-5 md:h-5' : 'w-5 h-5 md:w-6 md:h-6'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Option Card */}
        <button
          onClick={() => onSelect('left')}
          className="group p-4 bg-slate-900/80 hover:bg-indigo-600/10 border-2 border-slate-800 hover:border-indigo-500/70 rounded-3xl flex flex-col items-center space-y-3 transition-all transform hover:scale-[1.02] cursor-pointer shadow-lg"
        >
          <div className="flex items-center justify-between w-full px-2 text-xs font-bold text-slate-400 group-hover:text-indigo-300">
            <span>Group A</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full">Tap to Pick</span>
          </div>
          {renderDots(leftCount, leftSpacing)}
        </button>

        {/* Right Option Card */}
        <button
          onClick={() => onSelect('right')}
          className="group p-4 bg-slate-900/80 hover:bg-indigo-600/10 border-2 border-slate-800 hover:border-indigo-500/70 rounded-3xl flex flex-col items-center space-y-3 transition-all transform hover:scale-[1.02] cursor-pointer shadow-lg"
        >
          <div className="flex items-center justify-between w-full px-2 text-xs font-bold text-slate-400 group-hover:text-indigo-300">
            <span>Group B</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full">Tap to Pick</span>
          </div>
          {renderDots(rightCount, rightSpacing)}
        </button>
      </div>

      {/* For Levels that support Equal Comparison */}
      {isEqual !== undefined && (
        <div className="flex justify-center">
          <button
            onClick={() => onSelect('equal')}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700 hover:border-indigo-400 transition-all shadow-md cursor-pointer flex items-center space-x-2"
          >
            <span>⚖️</span>
            <span>They Have the Exact SAME Count</span>
          </button>
        </div>
      )}
    </div>
  );
}
