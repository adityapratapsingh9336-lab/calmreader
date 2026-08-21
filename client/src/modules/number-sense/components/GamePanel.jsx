import React, { useState } from 'react';
import { ttsService } from '../../../utils/tts';

export default function GamePanel({
  levelConfig,
  currentProblemIdx,
  totalProblems,
  score,
  feedback,
  onShowHint,
  children,
}) {
  const [isHintOpen, setIsHintOpen] = useState(false);

  const handleSpeakInstruction = () => {
    if (levelConfig?.instruction) {
      ttsService.speak(levelConfig.instruction);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
      {/* Top HUD: Level, Stage & Problem Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black font-mono text-sm shadow-md">
            L{levelConfig.level}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${levelConfig.badgeColor}`}>
                {levelConfig.stage}
              </span>
              <span className="text-xs font-bold text-white">
                {levelConfig.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Question {currentProblemIdx + 1} of {totalProblems}
            </p>
          </div>
        </div>

        {/* Action Buttons: Audio & Hint */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSpeakInstruction}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            title="Listen to question instructions"
          >
            <span>🔊</span>
            <span className="hidden sm:inline">Listen Prompt</span>
          </button>

          <button
            onClick={() => setIsHintOpen(!isHintOpen)}
            className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-xl border border-indigo-500/30 transition-colors"
            title="Reveal educational hint"
          >
            <span>💡</span>
            <span>{isHintOpen ? 'Hide Tip' : 'Hint'}</span>
          </button>
        </div>
      </div>

      {/* Main Question Prompt */}
      <div className="text-center py-2 space-y-1">
        <h3 className="text-base md:text-xl font-extrabold text-white leading-snug">
          {levelConfig.instruction}
        </h3>
      </div>

      {/* Dynamic Pedagogical Hint Card */}
      {isHintOpen && levelConfig.hint && (
        <div className="p-3.5 bg-indigo-950/50 border border-indigo-500/30 rounded-2xl text-xs text-indigo-200 flex items-start space-x-2.5 animate-in fade-in">
          <span className="text-base">💡</span>
          <div>
            <span className="font-bold text-indigo-300 block">Cognitive Hint:</span>
            <span>{levelConfig.hint}</span>
          </div>
        </div>
      )}

      {/* Interactive Game Area Injected Here */}
      <div className="min-h-[220px] flex flex-col justify-center items-center">
        {children}
      </div>

      {/* Immediate Educational Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center justify-between animate-in slide-in-from-bottom-2 ${
            feedback.isCorrect
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">{feedback.isCorrect ? '🎉' : '💡'}</span>
            <span>{feedback.message}</span>
          </div>

          <div className="font-mono font-bold text-xs bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
            Score: {score}
          </div>
        </div>
      )}

      {/* Bottom Level Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>Progress</span>
          <span>{Math.round(((currentProblemIdx) / totalProblems) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 transition-all duration-300"
            style={{ width: `${((currentProblemIdx + 1) / totalProblems) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
