import React from 'react';

export default function StrokeGuidanceOverlay({ template, isGhostDemoActive, isGuidedMode, brushSize = 12 }) {
  const strokes = template?.strokes || [];
  const outerCorridorWidth = Math.round(22 + brushSize * 1.2);
  const innerCorridorWidth = Math.round(18 + brushSize * 0.8);

  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    >
      <defs>
        <filter id="tracer-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Primary Handwriting Guidelines (Headline, Midline, Baseline) */}
      <line
        x1="10"
        y1="50"
        x2="290"
        y2="50"
        stroke="#475569"
        strokeWidth="1.5"
        strokeDasharray="4,4"
      />
      <text x="15" y="45" fill="#64748b" fontSize="8" fontFamily="monospace">
        Headline
      </text>

      <line
        x1="10"
        y1="150"
        x2="290"
        y2="150"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="6,6"
        opacity="0.6"
      />
      <text x="15" y="145" fill="#38bdf8" fontSize="8" fontFamily="monospace">
        Midline
      </text>

      <line
        x1="10"
        y1="250"
        x2="290"
        y2="250"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <text x="15" y="245" fill="#94a3b8" fontSize="8" fontFamily="monospace">
        Baseline
      </text>

      {/* Dotted Reference Template Path & Visual Corridor Channel adapting to brush size */}
      {isGuidedMode && strokes.map((stroke, idx) => (
        <g key={`corridor-${idx}`}>
          {/* Allowable Tracing Corridor Channel */}
          <path
            d={stroke.pathD}
            fill="none"
            stroke="#1e293b"
            strokeWidth={outerCorridorWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            d={stroke.pathD}
            fill="none"
            stroke="#334155"
            strokeWidth={innerCorridorWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </g>
      ))}

      {isGuidedMode && strokes.map((stroke, idx) => (
        <path
          key={`core-${idx}`}
          d={stroke.pathD}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeDasharray="6,6"
          strokeLinecap="round"
        />
      ))}

      {/* Numbered Waypoints (Start = Green, End = Red) */}
      {isGuidedMode && strokes.map((stroke, idx) => (
        <g key={`waypoint-${idx}`}>
          {/* Start Waypoint Dot */}
          <circle
            cx={stroke.start.x}
            cy={stroke.start.y}
            r="12"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="2"
            filter="url(#tracer-glow)"
          />
          <text
            x={stroke.start.x}
            y={stroke.start.y + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="black"
            fontFamily="monospace"
          >
            {idx + 1}
          </text>

          {/* End Waypoint Dot */}
          <circle
            cx={stroke.end.x}
            cy={stroke.end.y}
            r="7"
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* Animated Ghost Pencil Demo */}
      {isGhostDemoActive && strokes.map((stroke, idx) => (
        <path
          key={`anim-${idx}`}
          d={stroke.pathD}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#tracer-glow)"
          className="animate-pulse"
        />
      ))}
    </svg>
  );
}
