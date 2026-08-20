import React, { useState } from 'react';
import { formatDirectionalText } from '../utils/directional';

export default function StepByStepView({ text, settings, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!text) return null;

  // Split text into individual instruction steps (sentences)
  const steps = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);

  const totalSteps = steps.length;
  const activeText = steps[currentStep] || text;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧩</span>
            <h3 className="font-bold text-sm text-indigo-400">Step-by-Step Instruction Focus Mode</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Progress: Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-indigo-400 font-mono">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Focus Card */}
        <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-2xl space-y-4 shadow-inner min-h-[180px] flex flex-col justify-center">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xs font-extrabold font-mono">
              {currentStep + 1}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Active Action Step
            </span>
          </div>

          <div
            className="text-xl md:text-2xl font-medium text-white leading-relaxed tracking-wide"
            style={{
              letterSpacing: `${settings.letterSpacing}px`,
              lineHeight: settings.lineHeight,
            }}
          >
            {formatDirectionalText(activeText, settings.directionalAnchors)}
          </div>
        </div>

        {/* Direction Indicator Visual Cue Key */}
        <div className="flex items-center justify-between text-xs bg-slate-800/40 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="direction-left px-2 py-0.5 rounded text-[11px] font-bold">⬅ LEFT (Blue)</span>
            <span className="direction-right px-2 py-0.5 rounded text-[11px] font-bold">RIGHT (Red) ➔</span>
          </div>
          <span className="text-slate-400 text-[11px]">Color-Coded Spatial Markers Active</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-2"
          >
            <span>← Previous Step</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {currentStep + 1} / {totalSteps}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === totalSteps - 1}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors flex items-center space-x-2 shadow-lg shadow-indigo-600/20"
          >
            <span>Next Step →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
