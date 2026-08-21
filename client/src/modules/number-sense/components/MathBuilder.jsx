import React from 'react';

export default function MathBuilder({ problem, operator = '+', onSelect }) {
  const { num1, num2, result } = problem;
  const isAddition = operator === '+';

  // Generate 3 plausible answer options
  const options = [
    result,
    Math.max(1, result - 1),
    result + 1,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Concrete Visual Representation */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-inner">
        {/* Group 1 Dots */}
        <div className="flex flex-wrap gap-2 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl max-w-[150px] justify-center">
          {[...Array(num1)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full ${
                !isAddition && i >= num1 - num2
                  ? 'bg-rose-500/30 border border-rose-500 line-through opacity-40'
                  : 'bg-indigo-400 shadow-md shadow-indigo-500/30'
              }`}
            />
          ))}
        </div>

        {/* Operator Symbol */}
        <span className="text-2xl font-black font-mono text-orange-400">
          {operator}
        </span>

        {/* Group 2 Dots (For Addition) */}
        {isAddition && (
          <div className="flex flex-wrap gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl max-w-[150px] justify-center">
            {[...Array(num2)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/30"
              />
            ))}
          </div>
        )}

        <span className="text-2xl font-black font-mono text-slate-400">=</span>

        <span className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-dashed border-orange-400 flex items-center justify-center font-mono font-black text-xl text-orange-300">
          ?
        </span>
      </div>

      {/* Symbolic Equation Strip */}
      <div className="text-center font-mono font-black text-2xl text-white tracking-widest bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        {num1} {operator} {num2} = <span className="text-orange-400">?</span>
      </div>

      {/* Multiple Choice Solution Cards */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block text-center">
          Tap the Result Numeral:
        </span>
        <div className="flex justify-center gap-3">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(opt)}
              className="w-18 h-16 px-6 rounded-2xl bg-slate-800 hover:bg-orange-600 border-2 border-slate-700 hover:border-orange-400 text-white font-mono font-black text-2xl flex items-center justify-center transition-all shadow-lg transform hover:scale-105 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
