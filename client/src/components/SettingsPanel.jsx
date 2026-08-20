import React from 'react';

export default function SettingsPanel({ isOpen, onClose, settings, onUpdateSettings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-8 animate-in slide-in-from-right">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <span>⚙️ Visual Cognition Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl p-1"
          >
            ✕
          </button>
        </div>

        {/* Contrast Theme Palette */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Background Contrast Overlay
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'default', label: 'Dark Navy', bg: 'bg-slate-900 text-white' },
              { id: 'sepia', label: 'Sepia Cream', bg: 'bg-[#fbf0d9] text-amber-950' },
              { id: 'dark', label: 'Pitch Black', bg: 'bg-black text-slate-200' },
              { id: 'blue', label: 'Muted Blue', bg: 'bg-slate-900 text-sky-200' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => onUpdateSettings({ theme: theme.id })}
                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                  theme.bg
                } ${
                  settings.theme === theme.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Family Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Typography Engine
          </label>
          <div className="space-y-2">
            {[
              { id: "'Lexend', sans-serif", label: 'Lexend (Designed for Reading Fluency)' },
              { id: "'Inter', sans-serif", label: 'Inter (Clean High Contrast)' },
              { id: "'Open Sans', sans-serif", label: 'Open Sans (Neutral Balanced)' },
            ].map((font) => (
              <button
                key={font.id}
                onClick={() => onUpdateSettings({ fontFamily: font.id })}
                className={`w-full p-3 rounded-xl border text-xs font-medium text-left transition-all bg-slate-800 ${
                  settings.fontFamily === font.id
                    ? 'border-indigo-500 text-indigo-300'
                    : 'border-slate-700/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height Control */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Line Height Spacing</span>
            <span className="text-indigo-400 font-mono">{settings.lineHeight}x</span>
          </div>
          <input
            type="range"
            min="1.4"
            max="2.8"
            step="0.2"
            value={settings.lineHeight}
            onChange={(e) => onUpdateSettings({ lineHeight: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Letter Spacing Control */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Inter-Character Pitch (Kerning)</span>
            <span className="text-indigo-400 font-mono">{settings.letterSpacing}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={settings.letterSpacing}
            onChange={(e) => onUpdateSettings({ letterSpacing: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Directional b/d/p/q Legend */}
        <div className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl space-y-3">
          <h4 className="text-xs font-semibold text-slate-200">
            b / d / p / q Micro-Anchor Cue Key:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="anchor-container anchor-b">b</span>
              <span className="text-slate-400">Left Ascender Stem</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="anchor-container anchor-d">d</span>
              <span className="text-slate-400">Right Ascender Stem</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="anchor-container anchor-p">p</span>
              <span className="text-slate-400">Left Descender Tail</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="anchor-container anchor-q">q</span>
              <span className="text-slate-400">Right Descender Hook</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-colors"
        >
          Save & Apply Visual Profile
        </button>

      </div>
    </div>
  );
}
