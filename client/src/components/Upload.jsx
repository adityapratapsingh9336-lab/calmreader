import React, { useState } from 'react';
import { performOCR } from '../utils/ocr';

const SAMPLE_PASSAGES = [
  {
    title: "The Symmetrical Quest (b/d/p/q Test)",
    text: "The brave boy walked down the path to pick a quiet spot. He noticed that the big dogs began barking at the purple birds resting near the pond. A quick glance showed that letter orientation makes reading effortless."
  },
  {
    title: "Visual Spatial Cognition",
    text: "Dyseidetic dyslexia is primarily characterized by difficulty processing visual word forms. Readers sound out words phonetically but struggle to form sight-word memories. By adjusting spatial kerning and line spacing, reading speed increases significantly."
  }
];

export default function Upload({ onTextLoaded, onOpenMathStudio, onOpenNumberSense, onOpenTracingStudio }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [manualText, setManualText] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const text = await performOCR(file, (pct) => setProgress(pct));
      if (!text.trim()) {
        throw new Error("No readable text found in document.");
      }
      onTextLoaded(text);
    } catch (err) {
      setError(err.message || 'OCR processing failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const textToLoad = manualText.trim() || SAMPLE_PASSAGES[0].text;
    onTextLoaded(textToLoad);
  };

  const handleSelectSample = (sampleText) => {
    onTextLoaded(sampleText);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 my-auto">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
          LexiSight Adaptive Learning System
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Comprehensive multi-modal platform: anti-crowded reading canvas, speech reading coach, numerosity training lab, and motor memory writing studio.
        </p>
      </div>

      {/* Quick Launch Cards for Dyslexia / Dyscalculia / Dysgraphia Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {onOpenTracingStudio && (
          <div
            onClick={onOpenTracingStudio}
            className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-emerald-950/40 border border-teal-500/40 hover:border-teal-400 p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer transition-all shadow-xl hover:shadow-teal-500/10 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-2xl text-teal-300 shadow-md">
                ✍️
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                    Tracing Studio
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                  b/d & p/q Drills
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Motor memory waypoint tracing & mirror reversal drills.
            </p>
            <span className="text-xs font-bold text-teal-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Studio</span>
              <span>➔</span>
            </span>
          </div>
        )}

        {onOpenNumberSense && (
          <div
            onClick={onOpenNumberSense}
            className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/40 hover:border-sky-400 p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer transition-all shadow-xl hover:shadow-sky-500/10 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-2xl text-sky-300 shadow-md">
                🔢
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
                    Number Sense
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">
                  12 Levels
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Perceptual quantity comparison & distractor filtering.
            </p>
            <span className="text-xs font-bold text-sky-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Lab</span>
              <span>➔</span>
            </span>
          </div>
        )}

        {onOpenMathStudio && (
          <div
            onClick={onOpenMathStudio}
            className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/40 hover:border-amber-400 p-5 rounded-2xl flex flex-col justify-between gap-3 cursor-pointer transition-all shadow-xl hover:shadow-amber-500/10 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl text-amber-300 shadow-md">
                🧮
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    Math Studio
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  CRA Blocks
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Number line jumps, Base-10 blocks, and 10-frames.
            </p>
            <span className="text-xs font-bold text-amber-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Studio</span>
              <span>➔</span>
            </span>
          </div>
        )}
      </div>

      {/* Preset Demo Sample Buttons */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Or Open Dyslexia Reading Canvas with Preset Passages:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_PASSAGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample.text)}
              className="text-left bg-slate-900 border border-slate-800 hover:border-indigo-500/70 hover:bg-slate-800/80 p-5 rounded-2xl space-y-3 transition-all shadow-lg hover:shadow-indigo-500/10 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-200 group-hover:text-indigo-400">
                  {sample.title}
                </span>
                <span className="text-xs font-semibold bg-indigo-600/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                  Open Demo {idx + 1} ➔
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                "{sample.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop OCR Upload Card */}
      <div className="bg-slate-900/80 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center transition-colors">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
        <label htmlFor="file-upload" className="cursor-pointer block space-y-3">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-xl">
            📷
          </div>
          <div>
            <span className="text-indigo-400 font-semibold hover:underline">Click to upload document image</span>
            <span className="text-slate-400 text-xs"> or drag and drop</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, WEBP scans</p>
          </div>
        </label>

        {isProcessing && (
          <div className="mt-4 space-y-2">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-500 h-2 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-indigo-300 font-medium">
              Processing OCR with Tesseract WASM Engine... {progress}%
            </p>
          </div>
        )}

        {error && (
          <p className="mt-3 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* Direct Text Input */}
      <form onSubmit={handleManualSubmit} className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Or Paste Custom Text Passage:
        </label>
        <textarea
          rows="3"
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          placeholder="Paste custom text here (or click below to load sample passage)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/25 cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Open in Adaptive Reading Canvas</span>
          <span>➔</span>
        </button>
      </form>
    </div>
  );
}
