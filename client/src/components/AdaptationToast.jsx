import React from 'react';

export default function AdaptationToast({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 border border-indigo-500/50 text-slate-100 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 animate-in slide-in-from-bottom-5 duration-300">
      <div className="text-2xl p-1 bg-indigo-500/10 rounded-lg">✨</div>
      <div className="flex-1 space-y-1">
        <h4 className="text-xs font-bold text-indigo-400">Autonomous AI Visual Adaptation</h4>
        <p className="text-xs text-slate-200 leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-white text-sm p-1"
      >
        ✕
      </button>
    </div>
  );
}
