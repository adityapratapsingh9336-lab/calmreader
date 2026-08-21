import React, { useState } from 'react';
import { LEVELS_CONFIG } from './utils/levelsConfig';
import { numberSenseEngine } from './utils/adaptiveEngine';
import GamePanel from './components/GamePanel';
import QuantityCompare from './components/QuantityCompare';
import DistractorChallenge from './components/DistractorChallenge';
import NumberMatcher from './components/NumberMatcher';
import SpatialNumberLine from './components/SpatialNumberLine';
import MathBuilder from './components/MathBuilder';
import NumerosityProfileCard from './components/NumerosityProfileCard';

export default function NumberSenseStudio({ onClose }) {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [levelResult, setLevelResult] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  const levelConfig = LEVELS_CONFIG.find((l) => l.level === selectedLevel) || LEVELS_CONFIG[0];
  const currentProblem = levelConfig.problems[currentProblemIdx] || levelConfig.problems[0];

  const handleStartLevel = (lvl) => {
    setSelectedLevel(lvl);
    setCurrentProblemIdx(0);
    setCorrectCount(0);
    setFeedback(null);
    setIsLevelFinished(false);
    setLevelResult(null);
    setShowProfile(false);
  };

  // Answer handler for all level mechanics
  const handleAnswer = (choice, customIsCorrect) => {
    if (feedback) return; // Prevent double taps during feedback animation

    let isCorrect = false;
    let message = '';

    // Level-specific answer validation
    if (levelConfig.type === 'QUANTITY_COMPARE') {
      isCorrect = choice === currentProblem.correctSide;
      message = isCorrect
        ? `Spot on! The ${choice} side has ${choice === 'left' ? currentProblem.leftCount : currentProblem.rightCount} dots.`
        : `Take another look! ${currentProblem.leftCount} vs ${currentProblem.rightCount}.`;
    } else if (levelConfig.type === 'QUANTITY_INVARIANCE') {
      if (currentProblem.isEqual) {
        isCorrect = choice === 'equal';
        message = isCorrect
          ? `Correct! Both sides have exactly ${currentProblem.leftCount} items, despite different sizes!`
          : `Trick alert! Sizing was different, but both sides had ${currentProblem.leftCount} items.`;
      } else {
        isCorrect = choice === (currentProblem.moreSide || currentProblem.correctSide);
        message = isCorrect
          ? `Great job! Group with ${currentProblem.leftCount > currentProblem.rightCount ? currentProblem.leftCount : currentProblem.rightCount} has more.`
          : `Spacing was wider, but the other group actually had more items.`;
      }
    } else if (levelConfig.type === 'DISTRACTOR_CHALLENGE') {
      isCorrect = choice === currentProblem.targetCount;
      message = isCorrect
        ? `Excellent focus! Exactly ${currentProblem.targetCount} targets found.`
        : `Close! There were ${currentProblem.targetCount} targets.`;
    } else if (levelConfig.type === 'NUMBER_MATCHER') {
      const targetVal = levelConfig.mode === 'DOTS_TO_NUM' ? currentProblem.dotCount : currentProblem.targetNum;
      isCorrect = choice === targetVal;
      message = isCorrect
        ? `Matched! ${choice} is the correct quantity.`
        : `That was ${choice}, but the target was ${targetVal}.`;
    } else if (levelConfig.type === 'SPATIAL_NUMBER_LINE') {
      isCorrect = customIsCorrect;
      message = isCorrect
        ? `Accurate placement! Target was ${currentProblem.target}.`
        : `Your placement was at ${choice.toFixed(1)}, target is ${currentProblem.target}.`;
    } else if (levelConfig.type === 'MATH_BUILDER') {
      isCorrect = choice === currentProblem.result;
      message = isCorrect
        ? `Awesome! ${currentProblem.num1} ${levelConfig.operator} ${currentProblem.num2} = ${currentProblem.result}!`
        : `Almost! ${currentProblem.num1} ${levelConfig.operator} ${currentProblem.num2} equals ${currentProblem.result}.`;
    }

    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    if (isCorrect) setCorrectCount(newCorrect);

    setFeedback({ isCorrect, message });

    // Advance after brief feedback delay
    setTimeout(() => {
      setFeedback(null);
      if (currentProblemIdx < levelConfig.problems.length - 1) {
        setCurrentProblemIdx(currentProblemIdx + 1);
      } else {
        // Level Finished -> evaluate with adaptive engine
        const result = numberSenseEngine.evaluateLevelAttempt(
          selectedLevel,
          newCorrect,
          levelConfig.problems.length
        );
        setLevelResult(result);
        setUnlockedLevels(result.unlockedLevels);
        setIsLevelFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/20">
              🔢
            </div>
            <div>
              <h2 className="font-extrabold text-base md:text-lg text-white flex items-center space-x-2">
                <span>Number Sense & Numerosity Lab</span>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  12-Stage Cognitive Progression
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Child-friendly perceptual training based on Cheng et al. numerosity development research.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center space-x-1.5 ${
                showProfile
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>📊</span>
              <span>Learner Skill Profile</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xl p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 12-Level Map Selector */}
        {!showProfile && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Curriculum Level Map:</span>
              <span className="text-indigo-400 font-mono text-[11px]">
                {unlockedLevels.length} / 12 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {LEVELS_CONFIG.map((lvl) => {
                const isUnlocked = unlockedLevels.includes(lvl.level);
                const isCurrent = lvl.level === selectedLevel;

                return (
                  <button
                    key={lvl.level}
                    onClick={() => isUnlocked && handleStartLevel(lvl.level)}
                    disabled={!isUnlocked}
                    className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isCurrent
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-400/40'
                        : isUnlocked
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-400 hover:bg-slate-800 cursor-pointer'
                        : 'bg-slate-950 border-slate-900 text-slate-600 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span className="font-mono font-black text-xs">
                      {isUnlocked ? `L${lvl.level}` : '🔒'}
                    </span>
                    <span className="text-[9px] truncate max-w-[50px] text-slate-400 mt-0.5">
                      {lvl.stage.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Display Area */}
        {showProfile ? (
          <NumerosityProfileCard
            skills={numberSenseEngine.state.skills}
            unlockedLevels={unlockedLevels}
            onClose={() => setShowProfile(false)}
          />
        ) : !isLevelFinished ? (
          <GamePanel
            levelConfig={levelConfig}
            currentProblemIdx={currentProblemIdx}
            totalProblems={levelConfig.problems.length}
            score={correctCount}
            feedback={feedback}
          >
            {levelConfig.type === 'QUANTITY_COMPARE' && (
              <QuantityCompare
                problem={currentProblem}
                onSelect={(side) => handleAnswer(side)}
              />
            )}

            {levelConfig.type === 'QUANTITY_INVARIANCE' && (
              <QuantityCompare
                problem={currentProblem}
                onSelect={(choice) => handleAnswer(choice)}
              />
            )}

            {levelConfig.type === 'DISTRACTOR_CHALLENGE' && (
              <DistractorChallenge
                problem={currentProblem}
                targetEmoji={levelConfig.targetEmoji}
                distractorEmoji={levelConfig.distractorEmoji}
                onSelect={(count) => handleAnswer(count)}
              />
            )}

            {levelConfig.type === 'NUMBER_MATCHER' && (
              <NumberMatcher
                problem={currentProblem}
                mode={levelConfig.mode}
                onSelect={(choice) => handleAnswer(choice)}
              />
            )}

            {levelConfig.type === 'SPATIAL_NUMBER_LINE' && (
              <SpatialNumberLine
                problem={currentProblem}
                onSelect={(val, isAccurate) => handleAnswer(val, isAccurate)}
              />
            )}

            {levelConfig.type === 'MATH_BUILDER' && (
              <MathBuilder
                problem={currentProblem}
                operator={levelConfig.operator}
                onSelect={(ans) => handleAnswer(ans)}
              />
            )}
          </GamePanel>
        ) : (
          /* Level Complete Assessment Screen */
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-8 text-center space-y-6 animate-in zoom-in-95 shadow-inner">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
              {levelResult?.isMastered ? '🏆' : '🎯'}
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">
                Level {selectedLevel}: {levelConfig.title} Complete!
              </h3>
              <p className="text-sm text-slate-400">
                You solved {correctCount} out of {levelConfig.problems.length} questions correctly.
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 font-mono">
                <span className="text-xs text-slate-400 block">Accuracy:</span>
                <span
                  className={`text-2xl font-black ${
                    levelResult?.isMastered ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {levelResult?.accuracy}%
                </span>
              </div>
            </div>

            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl max-w-lg mx-auto text-xs text-indigo-200 leading-relaxed">
              {levelResult?.recommendation}
            </div>

            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => handleStartLevel(selectedLevel)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700 transition-colors"
              >
                🔄 Replay Level
              </button>

              {selectedLevel < 12 && (
                <button
                  onClick={() => handleStartLevel(selectedLevel + 1)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Next Level ({selectedLevel + 1}) ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-500">
            Cheng et al. Developmental Dyscalculia Progression Framework
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md cursor-pointer"
          >
            Return to Learning Hub
          </button>
        </div>

      </div>
    </div>
  );
}
