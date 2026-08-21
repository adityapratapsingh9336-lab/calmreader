import React, { useState, useEffect } from 'react';

export default function SpatialNumberLine({ problem, onSelect }) {
  const { target, min = 0, max = 10 } = problem;
  const [placedVal, setPlacedVal] = useState(5);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setPlacedVal(5);
    setHasSubmitted(false);
  }, [problem]);

  const handleConfirm = () => {
    setHasSubmitted(true);
    // Tolerate +- 0.8 error margin on number line estimation
    const isAccurate = Math.abs(placedVal - target) <= 0.8;
    onSelect(placedVal, isAccurate);
  };

  return (
    <div className="w-full max-w-xl space-y-6">
      {/* Target Directive */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Target to Place on Line:
        </span>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/30 border-2 border-purple-500 flex items-center justify-center font-mono font-black text-3xl text-purple-200 shadow-lg shadow-purple-500/20">
          {target}
        </div>
      </div>

      {/* Interactive Spatial Slider Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-inner">
        <div className="relative pt-4">
          <input
            type="range"
            min={min}
            max={max}
            step="0.1"
            value={placedVal}
            onChange={(e) => !hasSubmitted && setPlacedVal(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />

          {/* Benchmark Endpoints (0, 5, 10) */}
          <div className="flex justify-between text-xs font-mono font-bold text-slate-400 mt-3">
            <span>{min}</span>
            <span>{Math.round((min + max) / 2)} (Halfway)</span>
            <span>{max}</span>
          </div>
        </div>

        {/* Current Value Display */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Current Position:</span>
          <span className="text-lg font-black text-purple-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-850">
            {placedVal.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleConfirm}
          className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-purple-600/20 transition-all transform hover:scale-105 cursor-pointer"
        >
          Confirm Spatial Placement ➔
        </button>
      </div>
    </div>
  );
}
