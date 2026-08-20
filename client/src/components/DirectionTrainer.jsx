import React, { useState } from 'react';

const DRILLS = [
  { id: 1, prompt: "Tap the correct arrow for: LEFT 🔵", target: "LEFT", options: [{ label: "←", val: "LEFT" }, { label: "→", val: "RIGHT" }, { label: "↑", val: "UP" }, { label: "↓", val: "DOWN" }] },
  { id: 2, prompt: "Tap the correct arrow for: RIGHT 🔴", target: "RIGHT", options: [{ label: "←", val: "LEFT" }, { label: "→", val: "RIGHT" }, { label: "↑", val: "UP" }, { label: "↓", val: "DOWN" }] },
  { id: 3, prompt: "Tap the correct arrow for: UP 🟢", target: "UP", options: [{ label: "←", val: "LEFT" }, { label: "→", val: "RIGHT" }, { label: "↑", val: "UP" }, { label: "↓", val: "DOWN" }] },
  { id: 4, prompt: "Tap the correct arrow for: DOWN 🟡", target: "DOWN", options: [{ label: "←", val: "LEFT" }, { label: "→", val: "RIGHT" }, { label: "↑", val: "UP" }, { label: "↓", val: "DOWN" }] },
];

export default function DirectionTrainer({ onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const activeDrill = DRILLS[currentIdx];

  const handleSelect = (val) => {
    if (completed) return;

    if (val === activeDrill.target) {
      setScore((prev) => prev + 1);
      setFeedback({ type: 'success', text: 'Correct! Perfect spatial orientation!' });
    } else {
      setFeedback({ type: 'error', text: `Incorrect. Expected ${activeDrill.target}` });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx < DRILLS.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-left">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎯</span>
            <h3 className="font-bold text-sm text-emerald-400">Interactive Direction Arrow Trainer</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {!completed ? (
          <div className="space-y-6 py-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-indigo-400">Drill {currentIdx + 1} of {DRILLS.length}</span>
              <h2 className="text-lg font-bold text-white">{activeDrill.prompt}</h2>
            </div>

            {/* 4 Large Tap Arrow Buttons */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {activeDrill.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.val)}
                  className="h-20 bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 rounded-2xl text-3xl font-bold text-white transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs font-bold animate-in fade-in ${
                  feedback.type === 'success'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 space-y-4">
            <span className="text-4xl">🏆</span>
            <h3 className="text-xl font-bold text-white">Direction Trainer Complete!</h3>
            <p className="text-sm text-slate-300">
              You scored <span className="font-bold font-mono text-emerald-400 text-lg">{score} / {DRILLS.length}</span> correct direction taps!
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors mt-4"
            >
              Return to Reader
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
