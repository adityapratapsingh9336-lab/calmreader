import React, { useState, useRef } from 'react';
import { formatDirectionalText, renderSequencePrefix, renderScanArrow } from '../utils/directional';
import { telemetryTracker } from '../utils/telemetryTracker';

export default function Reader({ text, settings, activeCharIndex, onSelectWord }) {
  const [activeLineIdx, setActiveLineIdx] = useState('0-0');
  const lineEnterTimeRef = useRef(Date.now());

  if (!text) return null;

  const handleMouseEnterLine = (lineId) => {
    const elapsedMs = Date.now() - lineEnterTimeRef.current;
    telemetryTracker.logSentenceFixation(elapsedMs);
    lineEnterTimeRef.current = Date.now();
    setActiveLineIdx(lineId);
  };

  const handleWordClick = (word, sentence) => {
    telemetryTracker.logExplainClick();
    onSelectWord(word, sentence);
  };

  const paragraphs = text.split(/\r?\n+/).filter(Boolean);
  const totalWords = text.split(/\s+/).filter(Boolean).length;
  let cumulativeCharCount = 0;

  return (
    <main className="flex-1 p-4 md:p-8 flex justify-center items-start">
      <div
        className={`w-full max-w-4xl rounded-3xl p-8 md:p-14 shadow-2xl border transition-all duration-300 theme-${settings.theme} ${
          settings.theme === 'sepia'
            ? 'bg-[#fbf0d9] text-[#2c221e] border-[#e2cfa7]'
            : settings.theme === 'dark'
            ? 'bg-[#121212] text-[#e2e8f0] border-[#27272a]'
            : settings.theme === 'blue'
            ? 'bg-[#1e293b] text-[#e0f2fe] border-[#38bdf8]/40'
            : 'bg-slate-900 text-slate-100 border-slate-800'
        }`}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          letterSpacing: `${settings.letterSpacing}px`,
          fontFamily: settings.fontFamily,
        }}
      >
        {/* Active Reading Canvas Metadata Header */}
        <div className="flex items-center justify-between border-b border-current/10 pb-4 mb-8 select-none">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📖</span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              Adaptive Visual Reading Canvas
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs opacity-70 font-mono">
            <span>{totalWords} Words</span>
            <span>•</span>
            <span>{paragraphs.length} Paragraphs</span>
          </div>
        </div>

        {/* Text Viewport */}
        <div className="space-y-8 select-text">
          {paragraphs.map((paragraph, pIdx) => {
            const lines = paragraph.split(/(?<=[.!?])\s+/);

            return (
              <p key={pIdx} className="space-y-4">
                {lines.map((line, lIdx) => {
                  const lineId = `${pIdx}-${lIdx}`;
                  const isFocused = activeLineIdx === lineId;

                  const lineStartCharIdx = cumulativeCharCount;
                  const words = line.split(/(\s+)/);
                  cumulativeCharCount += line.length + 1;

                  return (
                    <span
                      key={lineId}
                      onMouseEnter={() => handleMouseEnterLine(lineId)}
                      className={`block transition-all duration-200 ${
                        settings.lineSpotlight
                          ? isFocused
                            ? 'focus-line-active'
                            : 'focus-line-dimmed'
                          : ''
                      }`}
                    >
                      {renderSequencePrefix(lIdx, settings.sequenceSupport)}
                      {words.map((wordToken, tokenIdx) => {
                        if (/^\s+$/.test(wordToken)) {
                          return wordToken;
                        }

                        const tokenGlobalCharStart = lineStartCharIdx + line.indexOf(wordToken);
                        const isSpeakingWord =
                          activeCharIndex !== null &&
                          activeCharIndex >= tokenGlobalCharStart &&
                          activeCharIndex <= tokenGlobalCharStart + wordToken.length + 3;

                        const cleanWord = wordToken.replace(/[^\w\s-]/g, '');

                        return (
                          <span
                            key={tokenIdx}
                            onClick={() => cleanWord && handleWordClick(cleanWord, line)}
                            className={`reader-word inline-block px-0.5 rounded ${
                              isSpeakingWord ? 'word-speaking' : ''
                            }`}
                            title="Click to get AI Word Explanation"
                          >
                            {formatDirectionalText(wordToken, settings.directionalAnchors)}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </main>
  );
}
