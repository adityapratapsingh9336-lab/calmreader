import React, { useState } from 'react';
import { ttsService } from '../../utils/tts';

export default function StepSolver({ problemData, currentStepIdx, onStepChange }) {
  const { steps, num1, operator, num2, result } = problemData;
  const [showHint, setShowHint] = useState(false);

  const activeIdx = Math.max(0, Math.min(steps.length - 1, currentStepIdx || 0));
  const activeStep = steps[activeIdx];

  const handleNext = () => {
    if (activeIdx < steps.length - 1) {
      const next = activeIdx + 1;
      setShowHint(false);
      if (onStepChange) onStepChange(next);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      const prev = activeIdx - 1;
      setShowHint(false);
      if (onStepChange) onStepChange(prev);
    }
  };

  const handleSpeakStep = () => {
    if (activeStep) {
      const speechText = `${activeStep.title}. ${activeStep.explanation}`;
      ttsService.speak(speechText);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-lg">
            🔁
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Step-by-Step Scaffolding Engine</span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                Step {activeIdx + 1} of {steps.length}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Isolates micro-operations into focused steps to prevent cognitive working memory overload.
            </p>
          </div>
        </div>

        <button
          onClick={handleSpeakStep}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          title="Listen to this step spoken aloud"
        >
          <span>🔊</span>
          <span>Listen Step Audio</span>
        </button>
      </div>

      {/* Primary Active Step Focus Card */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-inner relative overflow-hidden">
        {/* Step Badge & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
              {activeStep.stepNumber}
            </span>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {activeStep.title}
            </span>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
            {activeStep.actionLabel}
          </span>
        </div>

        {/* Big Calculation Display */}
        <div className="text-center py-4 space-y-2">
          <div className="text-3xl md:text-5xl font-black text-white font-sans tracking-wide">
            {activeStep.currentValue}
          </div>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {activeStep.explanation}
          </p>
        </div>

        {/* Cognitive Hint Disclosure */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
            >
              <span>{showHint ? '🙈 Hide Cognitive Tip' : '💡 Show Cognitive Hint'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs rounded-xl animate-in fade-in leading-relaxed">
              💡 <span className="font-semibold">Dyscalculia Strategy:</span> When doing{' '}
              <span className="font-mono font-bold">{num1} {operator} {num2}</span>, always group the tens first to create friendly benchmark numbers (like 10, 20, 30), then handle the single units.
            </div>
          )}
        </div>
      </div>

      {/* Stepper Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={activeIdx === 0}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
        >
          ← Previous Step
        </button>

        <div className="flex space-x-1.5">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setShowHint(false);
                if (onStepChange) onStepChange(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === activeIdx
                  ? 'bg-indigo-500 ring-2 ring-indigo-500/40 scale-125'
                  : idx < activeIdx
                  ? 'bg-emerald-500'
                  : 'bg-slate-700'
              }`}
              title={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={activeIdx === steps.length - 1}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
        >
          Next Step →
        </button>
      </div>

      {/* Full Process Overview Checklist */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Complete Calculation Steps:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => {
                setShowHint(false);
                if (onStepChange) onStepChange(idx);
              }}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                idx === activeIdx
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/40'
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                <span className="font-bold">Step {step.stepNumber}</span>
                <span className="text-emerald-400">{step.actionLabel}</span>
              </div>
              <p className="text-[11px] line-clamp-1 text-slate-300">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
