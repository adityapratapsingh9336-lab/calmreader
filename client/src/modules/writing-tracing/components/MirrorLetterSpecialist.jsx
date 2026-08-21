import React from 'react';
import { ttsService } from '../../../utils/tts';

const MIRROR_PAIRS = [
  {
    id: 'bd-pair',
    title: 'Letter Reversal: "b" vs "d"',
    mnemonicA: 'b = Bat (down) ➔ Ball (right ➡️)',
    mnemonicB: 'd = Donut (left ⬅️) ➔ Door (up & down)',
    templateIdA: 'mirror-b',
    templateIdB: 'mirror-d',
    letterA: 'b',
    letterB: 'd',
    tip: 'Make your hands into "bed" shape with your thumbs up to remember: left hand = b, right hand = d!',
  },
  {
    id: 'pq-pair',
    title: 'Letter Reversal: "p" vs "q"',
    mnemonicA: 'p = Tail down into water ➔ Pop right ➡️',
    mnemonicB: 'q = Queen circle left ⬅️ ➔ Dive & Hook 🪝',
    templateIdA: 'mirror-p',
    templateIdB: 'mirror-q',
    letterA: 'p',
    letterB: 'q',
    tip: '"p" faces right like a pointer, while "q" looks back left at the queen!',
  },
];

export default function MirrorLetterSpecialist({ onSelectTemplate }) {
  const handleSpeak = (text) => {
    ttsService.speak(text);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl">
          🪞
        </div>
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <span>Mirror Letter Specialist Drills</span>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
              b/d & p/q Muscle Memory
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Reinforces directional start anchors to permanently overcome letter inversion habits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MIRROR_PAIRS.map((pair) => (
          <div
            key={pair.id}
            className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner"
          >
            <h4 className="text-xs font-extrabold text-white flex items-center justify-between">
              <span>{pair.title}</span>
              <button
                onClick={() => handleSpeak(`${pair.title}. ${pair.tip}`)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                🔊 Listen Tip
              </button>
            </h4>

            {/* Side-by-Side Contrast Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Letter A */}
              <button
                onClick={() => onSelectTemplate(pair.templateIdA)}
                className="p-4 bg-slate-900/90 hover:bg-indigo-600/20 border-2 border-slate-800 hover:border-indigo-500 rounded-2xl flex flex-col items-center space-y-2 transition-all transform hover:scale-105 cursor-pointer shadow-md group"
              >
                <span className="font-mono font-black text-4xl text-indigo-400 group-hover:text-white">
                  {pair.letterA}
                </span>
                <span className="text-[10px] text-slate-300 text-center leading-tight">
                  {pair.mnemonicA}
                </span>
                <span className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full mt-1">
                  Trace "{pair.letterA}" ➔
                </span>
              </button>

              {/* Letter B */}
              <button
                onClick={() => onSelectTemplate(pair.templateIdB)}
                className="p-4 bg-slate-900/90 hover:bg-emerald-600/20 border-2 border-slate-800 hover:border-emerald-500 rounded-2xl flex flex-col items-center space-y-2 transition-all transform hover:scale-105 cursor-pointer shadow-md group"
              >
                <span className="font-mono font-black text-4xl text-emerald-400 group-hover:text-white">
                  {pair.letterB}
                </span>
                <span className="text-[10px] text-slate-300 text-center leading-tight">
                  {pair.mnemonicB}
                </span>
                <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full mt-1">
                  Trace "{pair.letterB}" ➔
                </span>
              </button>
            </div>

            {/* Mnemonic Anchor Tip */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-200 leading-relaxed">
              💡 <strong>Motor Anchor:</strong> {pair.tip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
