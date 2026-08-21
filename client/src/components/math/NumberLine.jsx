import React, { useState, useEffect } from 'react';

export default function NumberLine({ problemData, currentStepIdx, onStepChange }) {
  const { numberLine, num1, operator, num2, result } = problemData;
  const { minVal, maxVal, jumps, startVal } = numberLine;

  const [activeJumpIdx, setActiveJumpIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync with parent step change
  useEffect(() => {
    if (currentStepIdx !== undefined) {
      // Step 0 is start, Step 1+ maps to jumps
      setActiveJumpIdx(Math.max(0, Math.min(jumps.length, currentStepIdx - 1)));
    }
  }, [currentStepIdx, jumps.length]);

  // Auto-play animation timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveJumpIdx((prev) => {
          if (prev >= jumps.length) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          if (onStepChange) onStepChange(next);
          return next;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, jumps.length, onStepChange]);

  const range = Math.max(10, maxVal - minVal);
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 60;
  const lineY = 190;
  const usableWidth = svgWidth - paddingX * 2;

  const getX = (val) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return paddingX + ((clamped - minVal) / range) * usableWidth;
  };

  // Generate tick marks (every 5 or 10 depending on range)
  const tickStep = range > 60 ? 10 : range > 20 ? 5 : 2;
  const ticks = [];
  for (let t = Math.ceil(minVal / tickStep) * tickStep; t <= maxVal; t += tickStep) {
    ticks.push(t);
  }

  // Calculate current value at active jump state
  let currentPos = startVal;
  for (let i = 0; i < activeJumpIdx && i < jumps.length; i++) {
    currentPos = jumps[i].to;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      {/* Header & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
            🧭
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Spatial Number Line Jump Model</span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                {num1} {operator} {num2} = {result}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Visualizes operations as continuous directional leaps across space.
            </p>
          </div>
        </div>

        {/* Current Position Badge */}
        <div className="flex items-center space-x-2 text-xs bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 font-mono">
          <span className="text-slate-400">Landing Position:</span>
          <span className="text-base font-black text-emerald-400">{currentPos}</span>
        </div>
      </div>

      {/* Interactive SVG Number Line Canvas */}
      <div className="w-full overflow-x-auto bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex justify-center items-center shadow-inner">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-3xl select-none"
        >
          <defs>
            {/* Arrowhead marker for jumps */}
            <marker
              id="jump-arrow-forward"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker
              id="jump-arrow-backward"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            {/* Glowing line filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Main Horizontal Axis Line */}
          <line
            x1={paddingX - 20}
            y1={lineY}
            x2={svgWidth - paddingX + 20}
            y2={lineY}
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Line End Arrows */}
          <polygon
            points={`${paddingX - 25},${lineY} ${paddingX - 15},${lineY - 4} ${paddingX - 15},${lineY + 4}`}
            fill="#64748b"
          />
          <polygon
            points={`${svgWidth - paddingX + 25},${lineY} ${svgWidth - paddingX + 15},${lineY - 4} ${svgWidth - paddingX + 15},${lineY + 4}`}
            fill="#64748b"
          />

          {/* Minor & Major Ticks */}
          {ticks.map((t) => {
            const tx = getX(t);
            const isMilestone = t === startVal || t === result || t % 10 === 0;
            return (
              <g key={t}>
                <line
                  x1={tx}
                  y1={lineY - (isMilestone ? 10 : 5)}
                  x2={tx}
                  y2={lineY + (isMilestone ? 10 : 5)}
                  stroke={isMilestone ? '#94a3b8' : '#475569'}
                  strokeWidth={isMilestone ? 2 : 1}
                />
                <text
                  x={tx}
                  y={lineY + 28}
                  textAnchor="middle"
                  fill={isMilestone ? '#cbd5e1' : '#64748b'}
                  fontSize={isMilestone ? '12' : '10'}
                  fontFamily="monospace"
                  fontWeight={isMilestone ? 'bold' : 'normal'}
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* Starting Position Circle & Dot */}
          <circle
            cx={getX(startVal)}
            y={lineY}
            r="8"
            fill="#6366f1"
            stroke="#ffffff"
            strokeWidth="2.5"
            filter="url(#glow)"
          />
          <text
            x={getX(startVal)}
            y={lineY + 45}
            textAnchor="middle"
            fill="#818cf8"
            fontSize="11"
            fontWeight="bold"
          >
            Start ({startVal})
          </text>

          {/* Jump Arcs Rendered Up to Active Jump */}
          {jumps.map((jump, idx) => {
            if (idx >= activeJumpIdx) return null;

            const fromX = getX(jump.from);
            const toX = getX(jump.to);
            const isForward = jump.direction === 'forward';
            const midX = (fromX + toX) / 2;
            const distance = Math.abs(toX - fromX);
            const arcHeight = Math.min(110, Math.max(45, distance * 0.45));
            const arcY = lineY - arcHeight;

            const pathD = `M ${fromX} ${lineY} Q ${midX} ${arcY} ${toX} ${lineY}`;
            const strokeColor = isForward ? '#10b981' : '#f43f5e';
            const markerUrl = isForward
              ? 'url(#jump-arrow-forward)'
              : 'url(#jump-arrow-backward)';

            return (
              <g key={idx} className="animate-in fade-in duration-300">
                {/* Curved Jump Path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="3.5"
                  strokeDasharray={idx === activeJumpIdx - 1 ? 'none' : 'none'}
                  markerEnd={markerUrl}
                  filter="url(#glow)"
                />

                {/* Jump Amount Label Bubble */}
                <rect
                  x={midX - 24}
                  y={arcY - 18}
                  width="48"
                  height="22"
                  rx="11"
                  fill="#0f172a"
                  stroke={strokeColor}
                  strokeWidth="1.5"
                />
                <text
                  x={midX}
                  y={arcY - 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {jump.label}
                </text>

                {/* Destination Point Dot */}
                <circle
                  cx={toX}
                  cy={lineY}
                  r="6"
                  fill={strokeColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            );
          })}

          {/* Active Target Indicator Pulse */}
          <circle
            cx={getX(currentPos)}
            cy={lineY}
            r="12"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="animate-ping opacity-75"
          />
        </svg>
      </div>

      {/* Animation & Scrubber Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const prev = Math.max(0, activeJumpIdx - 1);
              setActiveJumpIdx(prev);
              if (onStepChange) onStepChange(prev);
            }}
            disabled={activeJumpIdx === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
          >
            ← Previous Jump
          </button>

          <button
            onClick={() => {
              const next = Math.min(jumps.length, activeJumpIdx + 1);
              setActiveJumpIdx(next);
              if (onStepChange) onStepChange(next);
            }}
            disabled={activeJumpIdx >= jumps.length}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
          >
            Next Jump →
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? '⏸ Pause' : '▶ Auto Play Jumps'}
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span>Jump {activeJumpIdx} of {jumps.length}</span>
          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-2 transition-all duration-300"
              style={{
                width: `${(activeJumpIdx / (jumps.length || 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
