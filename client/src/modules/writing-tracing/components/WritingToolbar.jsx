import React from 'react';

const INK_COLORS = [
  { name: 'Neon Cyan', color: '#38bdf8' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Electric Amber', color: '#f59e0b' },
  { name: 'Purple Sparkle', color: '#a855f7' },
  { name: 'White Chalk', color: '#ffffff' },
];

const BRUSH_SIZES = [
  { label: 'Fine', size: 6 },
  { label: 'Medium', size: 12 },
  { label: 'Broad', size: 20 },
];

export default function WritingToolbar({
  inkColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  isEraser,
  onToggleEraser,
  onUndo,
  onClear,
  onEvaluate,
  onToggleGhostDemo,
  isGhostDemoActive,
  onSpeakMnemonic,
  isGuidedMode,
  onToggleGuidedMode,
}) {
  return (
    <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-inner">
      {/* Left: Colors & Tools */}
      <div className="flex items-center space-x-3 flex-wrap gap-y-2">
        {/* Color Palette */}
        <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          {INK_COLORS.map((item) => (
            <button
              key={item.color}
              onClick={() => {
                if (isEraser) onToggleEraser(false);
                onColorChange(item.color);
              }}
              className={`w-6 h-6 rounded-full transition-transform ${
                !isEraser && inkColor === item.color
                  ? 'scale-125 ring-2 ring-white shadow-md'
                  : 'hover:scale-110 opacity-75 hover:opacity-100'
              }`}
              style={{ backgroundColor: item.color }}
              title={item.name}
            />
          ))}
        </div>

        {/* Brush Size Selector */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {BRUSH_SIZES.map((b) => (
            <button
              key={b.size}
              onClick={() => onBrushSizeChange(b.size)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                brushSize === b.size
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Eraser Button */}
        <button
          onClick={() => onToggleEraser(!isEraser)}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors flex items-center space-x-1 ${
            isEraser
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🧹</span>
          <span>Eraser</span>
        </button>

        {/* Undo Button */}
        <button
          onClick={onUndo}
          className="p-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-colors"
          title="Undo last stroke"
        >
          ↩ Undo
        </button>

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="p-1.5 px-3 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-bold rounded-xl border border-slate-800 hover:border-rose-500/40 transition-colors"
          title="Clear canvas"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Right: Assistive Demonstrations & Evaluation */}
      <div className="flex items-center space-x-2 flex-wrap gap-y-2">
        {/* Guided vs Independent Mode Toggle */}
        <button
          onClick={() => onToggleGuidedMode(!isGuidedMode)}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors flex items-center space-x-1 ${
            isGuidedMode
              ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
          title="Toggle Dotted Handwriting Guidelines"
        >
          <span>{isGuidedMode ? '👁️ Guided Lines ON' : '📝 Freehand Mode'}</span>
        </button>

        {/* Ghost Pencil Animation */}
        <button
          onClick={onToggleGhostDemo}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors flex items-center space-x-1 ${
            isGhostDemoActive
              ? 'bg-sky-500/20 border-sky-500 text-sky-300 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
          }`}
          title="Watch stroke direction demo"
        >
          <span>✨</span>
          <span>{isGhostDemoActive ? 'Demo Playing...' : 'Stroke Demo'}</span>
        </button>

        {/* Speech Mnemonic Audio */}
        <button
          onClick={onSpeakMnemonic}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition-colors flex items-center space-x-1"
          title="Listen to phonetic mnemonic"
        >
          <span>🔊</span>
          <span>Hear Rhyme</span>
        </button>

        {/* Check & Evaluate Button */}
        <button
          onClick={onEvaluate}
          className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 cursor-pointer"
        >
          ✓ Check Accuracy
        </button>
      </div>
    </div>
  );
}
