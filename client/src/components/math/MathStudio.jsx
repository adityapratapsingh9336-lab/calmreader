import React, { useState, useEffect } from 'react';
import { solveMathProblem } from '../../utils/mathSolver';
import { mathTelemetry, MATH_MODES } from '../../utils/mathTelemetry';
import NumberLine from './NumberLine';
import StepSolver from './StepSolver';
import PlaceValue from './PlaceValue';
import Counters from './Counters';

const PRESET_MATH_PROBLEMS = [
  {
    id: 1,
    category: 'Spatial Chunking (2-Digit)',
    equation: '24 + 18',
    description: 'Jump +10 then +8 on the spatial number line.',
  },
  {
    id: 2,
    category: 'Borrowing Subtraction',
    equation: '52 - 27',
    description: 'Unbundle 1 Ten Rod into 10 Units to subtract 7.',
  },
  {
    id: 3,
    category: 'Bridging Through 10 (Subitizing)',
    equation: '8 + 5',
    description: 'Fill the first 10-frame with 2, then place remaining 3.',
  },
  {
    id: 4,
    category: '3-Digit Place Value',
    equation: '145 + 78',
    description: 'Hundreds, Tens, and Ones multi-tier regrouping.',
  },
];

export default function MathStudio({ onClose }) {
  const [equationInput, setEquationInput] = useState('24 + 18');
  const [customInput, setCustomInput] = useState('');
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [activeMode, setActiveMode] = useState(MATH_MODES.NUMBER_LINE);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Compute rich decomposition data
  const problemData = solveMathProblem(equationInput);
  const recommendation = mathTelemetry.getAdaptiveRecommendation(problemData);

  // Auto-suggest optimal mode when equation changes if user hasn't explicitly locked
  useEffect(() => {
    setCurrentStepIdx(0);
  }, [equationInput]);

  const handleSelectPreset = (eq) => {
    setEquationInput(eq);
    setIsEditingCustom(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      setEquationInput(customInput.trim());
      setIsEditingCustom(false);
    }
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    mathTelemetry.logModeInteraction(mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-emerald-400 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/20">
              🧮
            </div>
            <div>
              <h2 className="font-extrabold text-base md:text-lg text-white flex items-center space-x-2">
                <span>Dyscalculia Adaptive Math Learning Studio</span>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Spatial & CRA Scaffolding
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Visualizes numbers as spatial journeys, concrete blocks, and structured ten-frames.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Problem Selector & Custom Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Select Learning Target Problem:</span>
            <button
              onClick={() => {
                setIsEditingCustom(!isEditingCustom);
                setCustomInput(equationInput);
              }}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isEditingCustom ? '✕ Cancel Custom' : '✏️ Enter Custom Equation (e.g. 37 + 25)'}
            </button>
          </div>

          {!isEditingCustom ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {PRESET_MATH_PROBLEMS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.equation)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    equationInput === preset.equation
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/40 shadow-md'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    {preset.category}
                  </span>
                  <div className="text-sm font-mono font-black text-white">
                    {preset.equation}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {preset.description}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="flex space-x-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter math problem (e.g. 24 + 18, 52 - 27, 8 * 4)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
              >
                Model Equation
              </button>
            </form>
          )}
        </div>

        {/* Adaptive Recommendation Intelligence Card */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-amber-950/20 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🤖</span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-300">
                  {recommendation.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {recommendation.reason}
              </p>
            </div>
          </div>

          {activeMode !== recommendation.recommendedMode && (
            <button
              onClick={() => handleModeChange(recommendation.recommendedMode)}
              className="px-3.5 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer"
            >
              Switch to Suggested Mode ➔
            </button>
          )}
        </div>

        {/* Visual Learning Modality Switcher Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => handleModeChange(MATH_MODES.NUMBER_LINE)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeMode === MATH_MODES.NUMBER_LINE
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🧭</span>
            <span>Spatial Number Line</span>
          </button>

          <button
            onClick={() => handleModeChange(MATH_MODES.STEP_SOLVER)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeMode === MATH_MODES.STEP_SOLVER
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔁</span>
            <span>Step-by-Step Solver</span>
          </button>

          <button
            onClick={() => handleModeChange(MATH_MODES.PLACE_VALUE)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeMode === MATH_MODES.PLACE_VALUE
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🧱</span>
            <span>Place Value (CRA Blocks)</span>
          </button>

          <button
            onClick={() => handleModeChange(MATH_MODES.COUNTERS)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeMode === MATH_MODES.COUNTERS
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔵</span>
            <span>Visual Counters & 10-Frames</span>
          </button>
        </div>

        {/* Active Modality Visualization Component */}
        <div className="animate-in fade-in duration-300">
          {activeMode === MATH_MODES.NUMBER_LINE && (
            <NumberLine
              problemData={problemData}
              currentStepIdx={currentStepIdx}
              onStepChange={(idx) => setCurrentStepIdx(idx)}
            />
          )}

          {activeMode === MATH_MODES.STEP_SOLVER && (
            <StepSolver
              problemData={problemData}
              currentStepIdx={currentStepIdx}
              onStepChange={(idx) => setCurrentStepIdx(idx)}
            />
          )}

          {activeMode === MATH_MODES.PLACE_VALUE && (
            <PlaceValue problemData={problemData} />
          )}

          {activeMode === MATH_MODES.COUNTERS && (
            <Counters problemData={problemData} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-500 font-mono">
            Target Equation: <span className="text-slate-300 font-bold">{problemData.equation} = {problemData.result}</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20 cursor-pointer"
          >
            Return to Learning Hub
          </button>
        </div>

      </div>
    </div>
  );
}
