import React from 'react';

const DIRECTION_COLORS = {
  LEFT: { bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40', badge: 'bg-blue-500 text-white', icon: '←' },
  RIGHT: { bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', badge: 'bg-rose-500 text-white', icon: '→' },
  UP: { bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', badge: 'bg-emerald-500 text-white', icon: '↑' },
  DOWN: { bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', badge: 'bg-amber-500 text-white', icon: '↓' },
  NONE: { bg: 'bg-slate-800/80 text-slate-200 border-slate-700', badge: 'bg-slate-700 text-slate-300', icon: '•' },
};

export default function DirectionCard({ stepNumber, action, direction = 'NONE' }) {
  const config = DIRECTION_COLORS[direction.toUpperCase()] || DIRECTION_COLORS.NONE;

  return (
    <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${config.bg}`}>
      <div className="flex items-center space-x-3">
        <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
          {stepNumber}
        </span>
        <p className="text-sm font-medium leading-relaxed">{action}</p>
      </div>

      {direction !== 'NONE' && (
        <span className={`px-3 py-1 rounded-lg text-xs font-bold font-mono flex items-center space-x-1 shrink-0 ${config.badge}`}>
          <span>{direction}</span>
          <span className="text-sm animate-pulse">{config.icon}</span>
        </span>
      )}
    </div>
  );
}
