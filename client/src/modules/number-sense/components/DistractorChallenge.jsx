import React, { useState, useEffect } from 'react';

export default function DistractorChallenge({ problem, targetEmoji, distractorEmoji, onSelect }) {
  const { targetCount, distractorCount, options } = problem;

  // Interleave and randomize position array once per problem
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = [
      ...Array(targetCount).fill({ type: 'target', emoji: targetEmoji || '⭐' }),
      ...Array(distractorCount).fill({ type: 'distractor', emoji: distractorEmoji || '🪨' }),
    ];
    // Fisher-Yates shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setItems(list);
  }, [problem, targetEmoji, distractorEmoji, targetCount, distractorCount]);

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Mixed Visual Field */}
      <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-inner flex flex-wrap justify-center items-center gap-3 md:gap-4 min-h-[160px]">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`text-2xl md:text-3xl select-none transition-transform transform hover:scale-125 ${
              item.type === 'distractor' ? 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0' : 'drop-shadow-md'
            }`}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Target Focus Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs font-mono">
        <span className="flex items-center space-x-1.5 text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
          <span>Target:</span>
          <span className="text-base">{targetEmoji || '⭐'}</span>
          <span>(Count this)</span>
        </span>
        <span className="flex items-center space-x-1.5 text-slate-400 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
          <span>Distractor:</span>
          <span className="text-base">{distractorEmoji || '🪨'}</span>
          <span>(Ignore)</span>
        </span>
      </div>

      {/* Multiple Choice Answer Options */}
      <div className="flex justify-center items-center gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="w-16 h-16 rounded-2xl bg-slate-800 hover:bg-indigo-600 border-2 border-slate-700 hover:border-indigo-400 text-white font-mono font-black text-xl flex items-center justify-center transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
