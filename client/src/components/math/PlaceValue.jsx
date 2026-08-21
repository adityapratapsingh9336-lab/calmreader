import React, { useState } from 'react';

export default function PlaceValue({ problemData }) {
  const { num1, operator, num2, result, placeValue } = problemData;
  const { pv1, pv2, pvResult, isAdditionCarry, isSubtractionBorrow } = placeValue;

  const [activeTab, setActiveTab] = useState('ALL'); // ALL, NUM1, NUM2, RESULT

  // Render visual representations of base-10 blocks
  const renderBlocks = (pv, label, colorTheme = 'indigo') => {
    return (
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {label}
            </span>
            <span className="text-xs font-mono font-bold bg-slate-900 px-2 py-0.5 rounded text-indigo-400">
              {pv.hundreds * 100 + pv.tens * 10 + pv.ones}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {pv.expandedString}
          </span>
        </div>

        {/* 3 Columns: Hundreds, Tens, Ones */}
        <div className="grid grid-cols-3 gap-3 min-h-[140px]">
          {/* Hundreds Column */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-indigo-300 uppercase">
              Hundreds ({pv.hundreds})
            </span>
            <div className="flex flex-wrap gap-1.5 justify-center items-center flex-1">
              {pv.hundreds === 0 ? (
                <span className="text-xs text-slate-600 self-center">0</span>
              ) : (
                [...Array(Math.min(9, pv.hundreds))].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded bg-indigo-600/30 border border-indigo-400/60 flex items-center justify-center text-[9px] font-mono text-indigo-200 font-bold shadow-sm"
                    title="100 Flat Grid (10x10)"
                  >
                    100
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tens Column */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-emerald-300 uppercase">
              Tens ({pv.tens})
            </span>
            <div className="flex flex-wrap gap-1 justify-center items-center flex-1">
              {pv.tens === 0 ? (
                <span className="text-xs text-slate-600 self-center">0</span>
              ) : (
                [...Array(Math.min(9, pv.tens))].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-12 rounded-sm bg-emerald-500/40 border border-emerald-400/70 shadow-sm"
                    title="10 Rod Bar (1x10)"
                  />
                ))
              )}
            </div>
          </div>

          {/* Ones Column */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-amber-300 uppercase">
              Ones ({pv.ones})
            </span>
            <div className="flex flex-wrap gap-1 justify-center items-center flex-1 max-w-[90px]">
              {pv.ones === 0 ? (
                <span className="text-xs text-slate-600 self-center">0</span>
              ) : (
                [...Array(Math.min(19, pv.ones))].map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-sm bg-amber-400/50 border border-amber-300 shadow-sm"
                    title="1 Unit Cube"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
            🧱
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Place Value & CRA Blocks Model</span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                Concrete ➔ Representational ➔ Abstract
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Manipulates Base-10 blocks (Flats, Rods, Units) to build grounded place-value intuition.
            </p>
          </div>
        </div>

        {/* Legend Key */}
        <div className="flex items-center space-x-2 text-[11px] font-mono">
          <span className="flex items-center space-x-1 text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
            <span>🟩</span>
            <span>Hundreds (100)</span>
          </span>
          <span className="flex items-center space-x-1 text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
            <span>🟦</span>
            <span>Tens (10)</span>
          </span>
          <span className="flex items-center space-x-1 text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
            <span>🟨</span>
            <span>Ones (1)</span>
          </span>
        </div>
      </div>

      {/* Regrouping Visual Banner (Carry / Borrow Alerts) */}
      {isAdditionCarry && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center space-x-3 animate-in fade-in">
          <span className="text-xl">⚡</span>
          <div>
            <span className="font-bold uppercase tracking-wider block text-amber-300">
              Regrouping (Carry) Triggered:
            </span>
            <span>
              The ones column has {pv1.ones} + {pv2.ones} = {pv1.ones + pv2.ones} units (10 or more). 10 single units bundle together to form <strong>1 new Ten Rod (+10)</strong>!
            </span>
          </div>
        </div>
      )}

      {isSubtractionBorrow && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-center space-x-3 animate-in fade-in">
          <span className="text-xl">⚡</span>
          <div>
            <span className="font-bold uppercase tracking-wider block text-rose-300">
              Regrouping (Borrow) Triggered:
            </span>
            <span>
              Cannot subtract {pv2.ones} ones from {pv1.ones} ones. We unbundle <strong>1 Ten Rod</strong> from {num1} into <strong>10 Unit Cubes</strong> to complete the subtraction!
            </span>
          </div>
        </div>
      )}

      {/* Block Stacking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderBlocks(pv1, `First Number (${num1})`, 'indigo')}
        {renderBlocks(pv2, `Second Number (${num2})`, 'emerald')}
        {renderBlocks(pvResult, `Final Result (${result})`, 'amber')}
      </div>

      {/* Place Value Formula Strip */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center font-mono text-sm space-y-1">
        <div className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider">
          Expanded Algebraic Representation:
        </div>
        <div className="text-white font-bold tracking-wide">
          ({pv1.expandedString}) {operator} ({pv2.expandedString}) = <span className="text-emerald-400">{pvResult.expandedString} ({result})</span>
        </div>
      </div>
    </div>
  );
}
