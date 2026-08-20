import React from 'react';

export default function AnalyticsDashboard({ isOpen, onClose, metrics, profileType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-bold text-base text-white">Educator & Cognition Analytics Dashboard</h3>
              <p className="text-xs text-slate-400">Real-Time Visual Reading Telemetry & AI Diagnostic Profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl p-1"
          >
            ✕
          </button>
        </div>

        {/* Profile Classification Banner */}
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current AI Classification</span>
            <h4 className="text-lg font-extrabold text-indigo-300 mt-0.5">
              {profileType === 'VISUAL_DIFFICULTY' && '👁️ Visual Disambiguation Deficit'}
              {profileType === 'SPEED_DIFFICULTY' && '⚡ Saccadic Speed Processing Deficit'}
              {profileType === 'MIXED_DIFFICULTY' && '🧩 Mixed Cognitive Reading Deficit'}
              {profileType === 'NORMAL' && '✅ Balanced Visual Reading Baseline'}
            </h4>
          </div>
          <span className="text-xs font-mono bg-indigo-500/20 text-indigo-200 px-3 py-1.5 rounded-lg border border-indigo-500/30">
            Active Profile
          </span>
        </div>

        {/* Telemetry Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Reading Velocity</span>
            <div className="text-2xl font-extrabold text-white font-mono">{metrics.wpm} <span className="text-xs font-normal text-slate-400">WPM</span></div>
            <p className="text-[10px] text-emerald-400">↑ +18% from baseline</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Fixation Pause</span>
            <div className="text-2xl font-extrabold text-white font-mono">{(metrics.avgSentenceFixationMs / 1000).toFixed(1)}s</div>
            <p className="text-[10px] text-slate-400">Per sentence avg</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">AI Word Explain</span>
            <div className="text-2xl font-extrabold text-indigo-400 font-mono">{metrics.explainClicksCount}</div>
            <p className="text-[10px] text-slate-400">Triggers this session</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/50 p-4 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Quiz Accuracy</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{metrics.quizAccuracyPct}%</div>
            <p className="text-[10px] text-emerald-400">Comprehension score</p>
          </div>
        </div>

        {/* Diagnostic Breakdown */}
        <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-xl space-y-3">
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Visual Cognition Recommendations & Progress:
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center space-x-2">
              <span className="text-emerald-400">✔</span>
              <span><strong>Directional Anchors ($b/d/p/q$)</strong> reduced letter hesitation by 42%.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-400">✔</span>
              <span><strong>Expanded Kerning (+2px)</strong> eliminated line-skipping regressions.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-sky-400">ℹ</span>
              <span>Recommended reading session length: <strong>15 minutes max</strong> to prevent visual fatigue.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
        >
          Return to Reader View
        </button>

      </div>
    </div>
  );
}
