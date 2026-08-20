import React, { useEffect, useState } from 'react';
import DirectionCard from './DirectionCard';
import { API_BASE_URL } from '../utils/apiConfig';

export default function StepFlow({ text, onClose }) {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  useEffect(() => {
    if (!text) return;

    let isMounted = true;
    setLoading(true);

    fetch(`${API_BASE_URL}/api/simplify-directions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setSteps(data.steps || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          // Fallback mock step generator
          setSteps([
            { stepNumber: 1, action: "Walk forward past the left marker", direction: "LEFT", color: "blue", icon: "←" },
            { stepNumber: 2, action: "Move down to the lower floor entrance", direction: "DOWN", color: "yellow", icon: "↓" },
            { stepNumber: 3, action: "Turn right toward the main lobby door", direction: "RIGHT", color: "red", icon: "→" },
          ]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [text]);

  if (!text) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧠</span>
            <h3 className="font-bold text-sm text-indigo-400">AI Direction & Step Flow Simplifier</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400 font-medium">AI parsing paragraph & mapping directional step flow...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Color Legend Key */}
            <div className="flex items-center justify-between text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <span className="font-semibold text-slate-300">4-Way Visual Map:</span>
              <div className="flex items-center space-x-2 text-[11px] font-bold">
                <span className="text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">🔵 Left ←</span>
                <span className="text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">🔴 Right →</span>
                <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">🟢 Up ↑</span>
                <span className="text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">🟡 Down ↓</span>
              </div>
            </div>

            {/* Steps Container */}
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`cursor-pointer transition-all ${
                    activeStepIdx === idx ? 'ring-2 ring-indigo-500 rounded-xl scale-[1.01]' : 'opacity-85'
                  }`}
                >
                  <DirectionCard
                    stepNumber={step.stepNumber}
                    action={step.action}
                    direction={step.direction}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Return to Reader View
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
