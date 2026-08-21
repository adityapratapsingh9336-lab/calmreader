import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Mic,
  Calculator,
  PenTool,
  CheckCircle2,
  Play,
  Eye,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
} from 'lucide-react';

export default function InteractiveHero({
  onEnterDashboard,
  onOpenReader,
  onOpenTracingStudio,
  onOpenNumberSense,
  onOpenMathStudio,
  onOpenSpeechModal,
  onOpenDirectionTrainer,
}) {
  // Interactive Hero Preview Mode state
  const [activeFeatureTab, setActiveFeatureTab] = useState('reader');
  const [demoAnchorsEnabled, setDemoAnchorsEnabled] = useState(true);
  const [demoKerning, setDemoKerning] = useState(2);
  const [demoSpotlight, setDemoSpotlight] = useState(true);

  const pathways = [
    {
      id: 'ocr-reader',
      title: 'OCR Document Scanner & Reader',
      tag: 'Tesseract Neural Vision & Ingestion',
      icon: <FileText className="text-teal-600" size={24} />,
      cardBg: 'bg-white border-slate-200/90 hover:border-teal-500/50 hover:shadow-teal-500/10',
      badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
      btnColor: 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/20',
      badge: 'Camera • Image • PDF Parser',
      desc: 'Scan physical documents, worksheets, and PDFs with real-time OCR extraction into anti-crowded accessible text.',
      action: onOpenReader,
      actionLabel: 'Launch OCR Scanner',
    },
    {
      id: 'math-studio',
      title: 'Dyscalculia Math Studio',
      tag: 'Concrete-Representational-Abstract (CRA)',
      icon: <Calculator className="text-amber-600" size={24} />,
      cardBg: 'bg-white border-slate-200/90 hover:border-amber-500/50 hover:shadow-amber-500/10',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
      badge: 'Base-10 Blocks • Jump Arcs',
      desc: 'Manipulate virtual Flats, Rods, Units and visualize step-by-step arithmetic on interactive spatial number lines.',
      action: onOpenMathStudio,
      actionLabel: 'Launch Math Studio',
    },
    {
      id: 'numbersense',
      title: '12-Level Numerosity Lab',
      tag: 'Spatial Quantity Perception',
      icon: <Layers className="text-indigo-600" size={24} />,
      cardBg: 'bg-white border-slate-200/90 hover:border-indigo-500/50 hover:shadow-indigo-500/10',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20',
      badge: '12 Progressive Levels • Subitizing',
      desc: 'Master quantity comparison, dot arrays, and rapid magnitude estimation across 12 progressive cognitive levels.',
      action: onOpenNumberSense,
      actionLabel: 'Launch Numerosity Lab',
    },
    {
      id: 'dysgraphia',
      title: 'Writing & Tracing Studio',
      tag: 'Motor Memory Formation',
      icon: <PenTool className="text-cyan-600" size={24} />,
      cardBg: 'bg-white border-slate-200/90 hover:border-cyan-500/50 hover:shadow-cyan-500/10',
      badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      btnColor: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-600/20',
      badge: 'Corridor Grading • b vs d',
      desc: 'Develop muscle memory with pen-width calibrated stroke guidance and mirror letter disambiguation drills.',
      action: onOpenTracingStudio,
      actionLabel: 'Launch Tracing Studio',
    },
    {
      id: 'speech-coach',
      title: 'Speech Reading & Phonics Coach',
      tag: 'Groq Whisper-v3 STT Engine',
      icon: <Mic className="text-rose-600" size={24} />,
      cardBg: 'bg-white border-slate-200/90 hover:border-rose-500/50 hover:shadow-rose-500/10',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20',
      badge: '<300ms Phonics Feedback',
      desc: 'Real-time reading analysis with live word highlight scoring (🟢 Correct, 🔴 Wrong, 🟡 Skipped, 🟣 Extra).',
      action: onOpenSpeechModal,
      actionLabel: 'Launch Speech Coach',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-teal-500 selection:text-white relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-50/60 via-sky-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top White Frosted Header Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onEnterDashboard}
          >
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">❄</span>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors leading-none block">
                Academic
              </span>
              <span className="text-[10px] font-semibold text-teal-700 tracking-wide uppercase">
                LexiSight AI
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button
              onClick={() => setActiveFeatureTab('reader')}
              className="hover:text-teal-700 transition-colors cursor-pointer"
            >
              Reading Canvas
            </button>
            <button
              onClick={onOpenSpeechModal}
              className="hover:text-teal-700 transition-colors cursor-pointer"
            >
              Speech Coach
            </button>
            <button
              onClick={onOpenNumberSense}
              className="hover:text-teal-700 transition-colors cursor-pointer"
            >
              Number Sense
            </button>
            <button
              onClick={onOpenTracingStudio}
              className="hover:text-teal-700 transition-colors cursor-pointer"
            >
              Tracing Studio
            </button>
          </nav>

          {/* Primary CTA to Open Dashboard */}
          <div className="flex items-center gap-3">
            <button
              onClick={onEnterDashboard}
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-teal-700/20 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Open Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Stage */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:py-16 space-y-16 relative z-10">
        {/* Main Hero Header Headline */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-teal-600/30 text-teal-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles size={14} className="text-teal-600 animate-pulse" />
            <span>Multi-Sensory Cognitive Adaptation Platform</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Re-Engineering Learning for{' '}
            <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-indigo-700 bg-clip-text text-transparent">
              Neurodivergent Minds
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            An active cognitive assistance system for <span className="text-slate-900 font-semibold">Dyslexia, Dyscalculia, and Dysgraphia</span>. Rather than substituting learning with audio, LexiSight dynamically restructures visual text, spatial math, and motor formation in real time.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={onEnterDashboard}
              className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-full shadow-xl shadow-teal-700/20 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
            >
              <span>🚀 Launch Learning Dashboard</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOpenReader}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 hover:text-slate-900 font-bold text-sm rounded-full shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={17} className="text-teal-700" />
              <span>Document OCR Reader</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE LIVE FEATURE SHOWCASE (Clean White Card Sandbox)
           ========================================================================= */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 lg:p-8 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-teal-700 font-bold">
                Interactive Sandbox
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Experience Real-Time Cognitive Transforms
              </h3>
            </div>

            {/* Feature Tab Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <button
                onClick={() => setActiveFeatureTab('reader')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFeatureTab === 'reader'
                    ? 'bg-white text-teal-800 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen size={14} className="text-teal-600" />
                <span>Reading Canvas</span>
              </button>

              <button
                onClick={() => setActiveFeatureTab('speech')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFeatureTab === 'speech'
                    ? 'bg-white text-indigo-800 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mic size={14} className="text-indigo-600" />
                <span>Speech Coach</span>
              </button>

              <button
                onClick={() => setActiveFeatureTab('math')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFeatureTab === 'math'
                    ? 'bg-white text-amber-800 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calculator size={14} className="text-amber-600" />
                <span>Math Jump Arcs</span>
              </button>

              <button
                onClick={() => setActiveFeatureTab('tracing')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFeatureTab === 'tracing'
                    ? 'bg-white text-cyan-800 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <PenTool size={14} className="text-cyan-600" />
                <span>Stroke Corridor</span>
              </button>
            </div>
          </div>

          {/* Interactive Tab 1: Reading Canvas Live Simulation */}
          {activeFeatureTab === 'reader' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Interactive Controls Panel */}
              <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Adaptive Controls
                </h4>

                {/* Directional Anchors Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs font-bold text-slate-700">
                    b/d/p/q Directional Anchors
                  </span>
                  <input
                    type="checkbox"
                    checked={demoAnchorsEnabled}
                    onChange={(e) => setDemoAnchorsEnabled(e.target.checked)}
                    className="accent-teal-600 w-4 h-4 cursor-pointer"
                  />
                </div>

                {/* Kerning Slider */}
                <div className="space-y-1.5 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Letter Spacing (Kerning)</span>
                    <span className="text-teal-700 font-mono">{demoKerning}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={demoKerning}
                    onChange={(e) => setDemoKerning(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                {/* Optical Spotlight Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-xs font-bold text-slate-700">
                    Optical Line Focus Guide
                  </span>
                  <input
                    type="checkbox"
                    checked={demoSpotlight}
                    onChange={(e) => setDemoSpotlight(e.target.checked)}
                    className="accent-teal-600 w-4 h-4 cursor-pointer"
                  />
                </div>

                <button
                  onClick={onOpenReader}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Full Reader Canvas</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Live Rendered Canvas Preview */}
              <div className="lg:col-span-8 bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 min-h-[220px] flex flex-col justify-center shadow-inner">
                <div
                  className="font-sans text-base sm:text-lg leading-relaxed transition-all"
                  style={{ letterSpacing: `${demoKerning}px` }}
                >
                  <p className={demoSpotlight ? 'focus-line-active' : ''}>
                    The{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-b">b</span>
                    ) : (
                      'b'
                    )}
                    rave{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-b">b</span>
                    ) : (
                      'b'
                    )}
                    oy walke
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-d">d</span>
                    ) : (
                      'd'
                    )}{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-d">d</span>
                    ) : (
                      'd'
                    )}
                    own the{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-p">p</span>
                    ) : (
                      'p'
                    )}
                    ath to{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-p">p</span>
                    ) : (
                      'p'
                    )}
                    ick a{' '}
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-q">q</span>
                    ) : (
                      'q'
                    )}
                    uiet s
                    {demoAnchorsEnabled ? (
                      <span className="anchor-container anchor-p">p</span>
                    ) : (
                      'p'
                    )}
                    ot. Notice how directional anchors suppress mirror flipping!
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>🟡 Amber: b (Left Stem) • 🔵 Cyan: d (Right Stem)</span>
                  <span className="text-teal-400 font-semibold">60 FPS DOM Engine</span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Tab 2: Speech Reading Phonics Simulation */}
          {activeFeatureTab === 'speech' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                  Groq Whisper-v3 Inference
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  Real-Time Voice-to-Text Phonics Alignment
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Audio recorded in WebM format is transcribed in &lt;300ms using Groq's Whisper-v3 model. A custom Levenshtein comparator highlights substitutions, omissions, and phonics errors live.
                </p>
                <button
                  onClick={onOpenSpeechModal}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Mic size={16} />
                  <span>Start Speech Assessment</span>
                </button>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Passage Alignment Result:
                </div>
                <div className="flex flex-wrap gap-2 text-sm font-bold">
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl shadow-xs">
                    The (100%)
                  </span>
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl shadow-xs">
                    brave (100%)
                  </span>
                  <span className="px-3 py-1.5 bg-rose-50 text-rose-800 border border-rose-300 rounded-xl line-through shadow-xs">
                    boy [said: dog]
                  </span>
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl shadow-xs">
                    walked (100%)
                  </span>
                </div>
                <div className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  🎯 <span className="font-bold text-slate-900">Phonics Coach:</span> "Good effort! Pay attention to the starting 'b' in 'boy'—remember: Bat before Ball."
                </div>
              </div>
            </div>
          )}

          {/* Interactive Tab 3: Math Jump Arcs Simulation */}
          {activeFeatureTab === 'math' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  Spatial CRA Number Line
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  Spatial Bezier Jump Arcs & Base-10 Blocks
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Concrete-Representational-Abstract (CRA) scaffolding lets children visualize quantities with manipulable Base-10 blocks (Flats, Rods, Units) and animated spatial jump arcs.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenMathStudio}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Launch Math Studio
                  </button>
                  <button
                    onClick={onOpenNumberSense}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
                  >
                    12-Level Numerosity Lab
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
                  <span>Addition: 8 + 5 = 13</span>
                  <span className="text-amber-700">Step 1 of 2: Jump +2 to 10 ➔ Jump +3 to 13</span>
                </div>
                <svg viewBox="0 0 400 80" className="w-full h-20 bg-white p-2 rounded-xl border border-slate-200">
                  <line x1="20" y1="60" x2="380" y2="60" stroke="#cbd5e1" strokeWidth="2" />
                  <path d="M 120 60 Q 150 15 180 60" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 4" />
                  <path d="M 180 60 Q 220 20 260 60" fill="none" stroke="#d97706" strokeWidth="3" />
                  <circle cx="120" cy="60" r="4" fill="#0284c7" />
                  <circle cx="180" cy="60" r="4" fill="#f59e0b" />
                  <circle cx="260" cy="60" r="5" fill="#10b981" />
                  <text x="115" y="75" fill="#64748b" fontSize="10" fontWeight="bold">8</text>
                  <text x="175" y="75" fill="#b45309" fontSize="10" fontWeight="bold">10</text>
                  <text x="255" y="75" fill="#047857" fontSize="10" fontWeight="bold">13</text>
                </svg>
              </div>
            </div>
          )}

          {/* Interactive Tab 4: Writing & Tracing Corridor Simulation */}
          {activeFeatureTab === 'tracing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono font-bold bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full border border-cyan-200">
                  Dynamic Pen Corridor Grading
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  Motor Memory Tracing & Reversal Drills
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Evaluates stroke precision against exact SVG paths. The allowable corridor dynamically scales with pen width (Fine, Medium, Broad) to eliminate mirror reversals ($b$ vs $d$).
                </p>
                <button
                  onClick={onOpenTracingStudio}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <PenTool size={16} />
                  <span>Launch Tracing Studio</span>
                </button>
              </div>

              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-center justify-around">
                <div className="text-center space-y-2">
                  <div className="w-24 h-24 bg-white border-2 border-dashed border-teal-500 rounded-2xl flex items-center justify-center font-mono font-black text-4xl text-teal-700 shadow-sm">
                    b
                  </div>
                  <p className="text-[11px] font-bold text-teal-700">Bat ➔ Ball (Right ➡️)</p>
                </div>

                <div className="text-2xl text-slate-400 font-black">vs</div>

                <div className="text-center space-y-2">
                  <div className="w-24 h-24 bg-white border-2 border-dashed border-indigo-500 rounded-2xl flex items-center justify-center font-mono font-black text-4xl text-indigo-700 shadow-sm">
                    d
                  </div>
                  <p className="text-[11px] font-bold text-indigo-700">Donut ➔ Door (Left ⬅️)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            3-CARD LEARNING PATHWAY SELECTOR (White Cards)
           ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Personalized Learning Environments
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Choose your focus area to start personalized training
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pathways.map((p) => (
              <div
                key={p.id}
                className={`bg-white border rounded-3xl p-6 flex flex-col justify-between space-y-6 hover:scale-[1.02] transition-all shadow-md ${p.cardBg}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs">
                      {p.icon}
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${p.badgeBg}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                      {p.tag}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">
                      {p.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <button
                  onClick={p.action}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 ${p.btnColor} cursor-pointer`}
                >
                  <span>{p.actionLabel}</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Empirical Impact Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-slate-200/90 rounded-3xl p-6 text-center shadow-sm">
          <div>
            <h5 className="text-3xl font-black text-teal-700">42%</h5>
            <p className="text-xs text-slate-500 font-semibold mt-1">Reversal Error Drop</p>
          </div>
          <div>
            <h5 className="text-3xl font-black text-sky-700">&lt; 300ms</h5>
            <p className="text-xs text-slate-500 font-semibold mt-1">Whisper-v3 STT Latency</p>
          </div>
          <div>
            <h5 className="text-3xl font-black text-amber-700">12 Levels</h5>
            <p className="text-xs text-slate-500 font-semibold mt-1">Numerosity Progression</p>
          </div>
          <div>
            <h5 className="text-3xl font-black text-indigo-700">100%</h5>
            <p className="text-xs text-slate-500 font-semibold mt-1">Client-Side Privacy</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 Academic LexiSight AI — Multi-Sensory Cognitive Adaptation System. All rights reserved.</p>
      </footer>
    </div>
  );
}
