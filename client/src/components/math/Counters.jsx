import React, { useState } from 'react';
import { ttsService } from '../../utils/tts';

export default function Counters({ problemData }) {
  const { num1, operator, num2, result } = problemData;
  const [viewMode, setViewMode] = useState('TEN_FRAMES'); // TEN_FRAMES, COMBINED, SEPARATE
  const [hoveredCount, setHoveredCount] = useState(null);

  const count1 = Math.min(30, num1);
  const count2 = Math.min(30, num2);
  const totalCount = operator === '+' ? Math.min(60, count1 + count2) : Math.max(0, count1 - count2);

  // Group counters into 10-frames (array of 10 slots each)
  const numFrames = Math.max(1, Math.ceil(totalCount / 10));
  const frames = [];

  let filledSoFar = 0;
  for (let f = 0; f < numFrames; f++) {
    const slots = [];
    for (let s = 0; s < 10; s++) {
      const slotIndex = f * 10 + s;
      if (operator === '+') {
        if (slotIndex < count1) {
          slots.push({ filled: true, group: 1, color: 'bg-indigo-500' });
        } else if (slotIndex < count1 + count2) {
          slots.push({ filled: true, group: 2, color: 'bg-emerald-400' });
        } else {
          slots.push({ filled: false, group: null, color: 'bg-slate-900' });
        }
      } else {
        // Subtraction
        if (slotIndex < totalCount) {
          slots.push({ filled: true, group: 1, color: 'bg-indigo-500' });
        } else if (slotIndex < count1) {
          slots.push({ filled: true, group: 'removed', color: 'bg-rose-500/40 line-through' });
        } else {
          slots.push({ filled: false, group: null, color: 'bg-slate-900' });
        }
      }
    }
    frames.push(slots);
  }

  const handleSpeakCount = (idx) => {
    ttsService.speak(String(idx + 1));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
            🔵
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Visual Counters & Ten-Frames Subitizing</span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                2x5 Standard Grid
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Arranges quantities in structured 10-frames so learners see quantities instantly without counting fingers.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="flex items-center space-x-1.5 text-indigo-300">
            <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
            <span>Group 1 ({num1})</span>
          </span>
          <span className="flex items-center space-x-1.5 text-emerald-300">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span>Group 2 ({num2})</span>
          </span>
        </div>
      </div>

      {/* Ten Frames Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">
            Structured Ten-Frame Modules ({frames.length} Frame{frames.length > 1 ? 's' : ''}):
          </span>
          <span className="font-mono text-emerald-400 font-bold">
            Total Visualized: {totalCount}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {frames.map((slots, frameIdx) => {
            const filledInFrame = slots.filter((s) => s.filled && s.group !== 'removed').length;
            return (
              <div
                key={frameIdx}
                className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-inner"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-1">
                  <span>Ten-Frame #{frameIdx + 1}</span>
                  <span className="text-indigo-300 font-bold">{filledInFrame} / 10 Filled</span>
                </div>

                {/* 2 x 5 Standard Subitizing Grid */}
                <div className="grid grid-cols-5 grid-rows-2 gap-2 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                  {slots.map((slot, slotIdx) => {
                    const globalIdx = frameIdx * 10 + slotIdx;
                    return (
                      <div
                        key={slotIdx}
                        onClick={() => slot.filled && handleSpeakCount(globalIdx)}
                        onMouseEnter={() => setHoveredCount(globalIdx + 1)}
                        onMouseLeave={() => setHoveredCount(null)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                          slot.filled
                            ? `${slot.color} border-white/20 shadow-md transform hover:scale-110`
                            : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                        }`}
                        title={slot.filled ? `Counter #${globalIdx + 1} (Click to speak)` : 'Empty slot'}
                      >
                        {slot.filled && (
                          <span className="text-[10px] font-bold text-white font-mono opacity-80">
                            {globalIdx + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cognitive Subitizing Strategy Banner */}
      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-200 leading-relaxed flex items-center space-x-3">
        <span className="text-lg">💡</span>
        <div>
          <span className="font-bold text-indigo-300 block">Subitizing Benchmark Insight:</span>
          Each frame holds exactly 10 slots (two rows of 5). When a row is full, you instantly know it's 5. When the full frame is complete, you instantly know it's 10 — no finger counting required!
        </div>
      </div>
    </div>
  );
}
