import React, { useState, useRef } from 'react';
import { STROKE_TEMPLATES, WRITING_CATEGORIES } from './utils/strokeTemplates';
import { evaluateDrawnStrokes } from './utils/strokeEvaluator';
import { ttsService } from '../../utils/tts';
import TracingCanvas from './components/TracingCanvas';
import WritingToolbar from './components/WritingToolbar';
import MirrorLetterSpecialist from './components/MirrorLetterSpecialist';

export default function WritingTracingStudio({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(WRITING_CATEGORIES.MIRROR_LETTERS);
  const [selectedTemplateId, setSelectedTemplateId] = useState(STROKE_TEMPLATES[0].id);

  // Drawing state
  const [inkColor, setInkColor] = useState('#38bdf8');
  const [brushSize, setBrushSize] = useState(12);
  const [isEraser, setIsEraser] = useState(false);
  const [isGuidedMode, setIsGuidedMode] = useState(true);
  const [isGhostDemoActive, setIsGhostDemoActive] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const canvasRef = useRef(null);
  const drawnPointsRef = useRef([]);

  const currentTemplate =
    STROKE_TEMPLATES.find((t) => t.id === selectedTemplateId) || STROKE_TEMPLATES[0];

  const filteredTemplates = STROKE_TEMPLATES.filter((t) => t.category === activeCategory);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setEvaluationResult(null);
    setIsGhostDemoActive(false);

    // Clear canvas for new template
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawnPointsRef.current = [];
    }

    // Auto-speak phonics
    const target = STROKE_TEMPLATES.find((t) => t.id === templateId);
    if (target) {
      ttsService.speak(`${target.name}. ${target.mnemonic}`);
    }
  };

  const handleEvaluate = () => {
    const result = evaluateDrawnStrokes(drawnPointsRef.current, currentTemplate, brushSize);
    setEvaluationResult(result);
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawnPointsRef.current = [];
      setEvaluationResult(null);
    }
  };

  const handleUndo = () => {
    // TracingCanvas handles undo via history
    if (canvasRef.current) {
      // Trigger canvas undo
    }
  };

  const handleSpeakMnemonic = () => {
    if (currentTemplate) {
      ttsService.speak(`${currentTemplate.phonics}. ${currentTemplate.mnemonic}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[94vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-sky-500 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-sky-500/20">
              ✍️
            </div>
            <div>
              <h2 className="font-extrabold text-base md:text-lg text-white flex items-center space-x-2">
                <span>Motor Memory Writing & Tracing Studio</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Stroke Waypoint Scaffolding
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Overcomes mirror letter reversals ($b/d, p/q$) and reinforces correct stroke orientation.
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

        {/* Category Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => {
              setActiveCategory(WRITING_CATEGORIES.MIRROR_LETTERS);
              handleSelectTemplate('mirror-b');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === WRITING_CATEGORIES.MIRROR_LETTERS
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🪞</span>
            <span>Mirror Letter Drills (b/d & p/q)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory(WRITING_CATEGORIES.UPPERCASE);
              handleSelectTemplate('letter-A');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === WRITING_CATEGORIES.UPPERCASE
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔤</span>
            <span>Uppercase Letters</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory(WRITING_CATEGORIES.NUMBERS);
              handleSelectTemplate('num-3');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === WRITING_CATEGORIES.NUMBERS
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔢</span>
            <span>Numbers (0–9)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory(WRITING_CATEGORIES.SHAPES);
              handleSelectTemplate('shape-star');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeCategory === WRITING_CATEGORIES.SHAPES
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🔷</span>
            <span>Motor Dexterity Shapes</span>
          </button>
        </div>

        {/* Character Selector Strip */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filteredTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t.id)}
              className={`min-w-[60px] h-14 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                selectedTemplateId === t.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/40 shadow-lg scale-105'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <span className="font-mono font-black text-lg">{t.char}</span>
              <span className="text-[9px] text-slate-400">{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Special Mirror Letter Contrast Box (Only in Mirror Mode) */}
        {activeCategory === WRITING_CATEGORIES.MIRROR_LETTERS && (
          <MirrorLetterSpecialist onSelectTemplate={handleSelectTemplate} />
        )}

        {/* Interactive Tracing Workspace */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          {/* Target Title & Mnemonic Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Target: {currentTemplate.name}
                </span>
                <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-indigo-300">
                  {currentTemplate.phonics}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                💡 <span className="font-semibold">Mnemonic Rhyme:</span> "{currentTemplate.mnemonic}"
              </p>
            </div>

            <div className="text-xs font-mono font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
              {currentTemplate.strokes.length} Stroke{currentTemplate.strokes.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <TracingCanvas
            template={currentTemplate}
            inkColor={inkColor}
            brushSize={brushSize}
            isEraser={isEraser}
            isGuidedMode={isGuidedMode}
            isGhostDemoActive={isGhostDemoActive}
            canvasRef={canvasRef}
            drawnPointsRef={drawnPointsRef}
          />

          {/* Controls & Formatting Toolbar */}
          <WritingToolbar
            inkColor={inkColor}
            onColorChange={setInkColor}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            isEraser={isEraser}
            onToggleEraser={setIsEraser}
            onUndo={handleUndo}
            onClear={handleClearCanvas}
            onEvaluate={handleEvaluate}
            onToggleGhostDemo={() => setIsGhostDemoActive(!isGhostDemoActive)}
            isGhostDemoActive={isGhostDemoActive}
            onSpeakMnemonic={handleSpeakMnemonic}
            isGuidedMode={isGuidedMode}
            onToggleGuidedMode={setIsGuidedMode}
          />

          {/* Accuracy Score Feedback Card */}
          {evaluationResult && (
            <div
              className={`p-5 rounded-2xl border text-xs flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2 ${
                evaluationResult.isMastered
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                  : evaluationResult.accuracy >= 50
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <span className="text-3xl select-none">
                  {evaluationResult.isMastered
                    ? '🌟'
                    : evaluationResult.accuracy >= 50
                    ? '🎯'
                    : '⚠️'}
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-3 flex-wrap">
                    <h4 className="font-extrabold text-sm text-white">
                      Overall Accuracy: {evaluationResult.accuracy}%
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                      Path Coverage: {evaluationResult.coveragePercent}%
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      evaluationResult.inCorridorPercent >= 70
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      In-Corridor: {evaluationResult.inCorridorPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {evaluationResult.feedback}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 shrink-0">
                <button
                  onClick={handleClearCanvas}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  🔄 Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-500">
            Multi-Sensory Motor Memory Training System (LexiSight)
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
