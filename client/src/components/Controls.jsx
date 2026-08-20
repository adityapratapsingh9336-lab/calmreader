import React from 'react';

export default function Controls({
  settings,
  onUpdateSettings,
  isPlaying,
  onToggleTTS,
  onResetText,
  onOpenPractice,
  onOpenSettings,
  onOpenAnalytics,
  onOpenStepMode,
  onOpenReorder,
  onOpenStepFlow,
  onOpenDirectionTrainer,
  onOpenSpeechModal,
  isAutoEnabled,
  onToggleAutoAdapt,
  profileType
}) {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Side: Brand & Ingestion Reset */}
        <div className="flex items-center space-x-3">
          <span className="text-xl">👁️</span>
          <span className="font-bold text-sm bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent hidden sm:inline">
            LexiSight AI
          </span>
          <button
            onClick={onResetText}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            ← New Input
          </button>
        </div>

        {/* Center: Core Adaptive Controls */}
        <div className="flex items-center space-x-4 flex-wrap">
          {/* Real-time Speech Detection Read Aloud Coach */}
          <button
            onClick={onOpenSpeechModal}
            className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg shadow-emerald-600/25 transition-all transform hover:scale-[1.02] cursor-pointer"
            title="Open Real-Time Speech Detection & Reading Coach (Groq Whisper-v3)"
          >
            <span className="text-sm">🎤</span>
            <span>Read Aloud AI Coach</span>
          </button>

          {/* TTS Play / Stop */}
          <button
            onClick={onToggleTTS}
            className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
            }`}
          >
            <span>{isPlaying ? '⏹ Stop Speech' : '▶ Model Audio'}</span>
          </button>

          {/* AI Auto Adaptation Toggle */}
          <button
            onClick={onToggleAutoAdapt}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
              isAutoEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Autonomous AI Layout Adaptation"
          >
            <span>🤖 AI Auto: {isAutoEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Directional Anchor Toggle */}
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              checked={settings.directionalAnchors}
              onChange={(e) => onUpdateSettings({ directionalAnchors: e.target.checked })}
              className="accent-indigo-500 rounded"
            />
            <span>b/d/p/q Anchors</span>
          </label>

          {/* Sequence Support Toggle */}
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              checked={settings.sequenceSupport}
              onChange={(e) => onUpdateSettings({ sequenceSupport: e.target.checked })}
              className="accent-emerald-500 rounded"
            />
            <span>Sequence Cues</span>
          </label>

          {/* Optical Line Spotlight Toggle */}
          <label className="flex items-center space-x-2 text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800">
            <input
              type="checkbox"
              checked={settings.lineSpotlight}
              onChange={(e) => onUpdateSettings({ lineSpotlight: e.target.checked })}
              className="accent-indigo-500 rounded"
            />
            <span>Focus Spotlight</span>
          </label>
        </div>

        {/* Right Side: Analytics, AI Flow, Trainer & Settings */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenStepFlow}
            className="flex items-center space-x-1 text-xs font-semibold bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 px-3 py-2 rounded-lg border border-sky-500/40 transition-colors"
            title="Open AI Direction & Step Flow Simplifier"
          >
            <span>🧠 Flow</span>
          </button>

          <button
            onClick={onOpenDirectionTrainer}
            className="flex items-center space-x-1 text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 px-3 py-2 rounded-lg border border-emerald-500/40 transition-colors"
            title="Open Interactive Direction Arrow Trainer Game"
          >
            <span>🎯 Arrows</span>
          </button>

          <button
            onClick={onOpenStepMode}
            className="flex items-center space-x-1 text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 px-3 py-2 rounded-lg border border-indigo-500/40 transition-colors"
            title="Open Step-by-Step Focus Mode"
          >
            <span>🧩 Steps</span>
          </button>

          <button
            onClick={onOpenReorder}
            className="flex items-center space-x-1 text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-3 py-2 rounded-lg border border-purple-500/40 transition-colors"
            title="Open Interactive Sequence Reorder Trainer"
          >
            <span>🎯 Reorder</span>
          </button>

          <button
            onClick={onOpenAnalytics}
            className="flex items-center space-x-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            <span>📊 Stats</span>
          </button>

          <button
            onClick={onOpenPractice}
            className="flex items-center space-x-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg transition-colors shadow-lg shadow-emerald-600/20"
          >
            <span>🎯 Quiz</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg border border-slate-700 transition-colors"
            title="Open Profile Settings"
          >
            ⚙️
          </button>
        </div>

      </div>
    </header>
  );
}

