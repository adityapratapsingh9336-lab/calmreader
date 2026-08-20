import React, { useState, useEffect } from 'react';

export default function SequenceTrainingModal({ passageText, onClose }) {
  const [items, setItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!passageText) return;

    // Extract sentences and store original index
    const sentences = passageText
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0)
      .slice(0, 5); // Take first 5 sentences for training

    const originalList = sentences.map((text, originalIdx) => ({
      id: `seq-${originalIdx}`,
      text: text.trim(),
      originalIdx,
    }));

    // Jumble items for training
    const shuffled = [...originalList].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [passageText]);

  const handleMoveUp = (index) => {
    if (index === 0 || submitted) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const handleMoveDown = (index) => {
    if (index === items.length - 1 || submitted) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
  };

  const handleCheckSequence = () => {
    let correctCount = 0;
    items.forEach((item, currentIdx) => {
      if (item.originalIdx === currentIdx) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎯</span>
            <h3 className="font-bold text-sm text-emerald-400">Interactive Sequence Reorder Training</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Arrange the jumbled steps below into their correct sequential order using the ⬆ UP and ⬇ DOWN buttons.
        </p>

        {submitted && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-center space-y-1">
            <span className="text-2xl">🏆</span>
            <h4 className="font-bold text-base">Sequence Verified!</h4>
            <p className="text-xs text-emerald-200">
              You correctly ordered <span className="font-bold font-mono text-white">{score} / {items.length}</span> steps in sequence!
            </p>
          </div>
        )}

        {/* Jumbled Items Reorder List */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isCorrectPosition = submitted && item.originalIdx === idx;
            const isWrongPosition = submitted && item.originalIdx !== idx;

            let cardStyle = 'bg-slate-800/80 border-slate-700/60 text-slate-200';
            if (isCorrectPosition) {
              cardStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200';
            } else if (isWrongPosition) {
              cardStyle = 'bg-rose-500/15 border-rose-500 text-rose-200';
            }

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition-all ${cardStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs leading-relaxed font-medium">{item.text}</p>
                </div>

                {!submitted && (
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded text-xs text-slate-200"
                      title="Move Step Up"
                    >
                      ⬆
                    </button>
                    <button
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === items.length - 1}
                      className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded text-xs text-slate-200"
                      title="Move Step Down"
                    >
                      ⬇
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={handleCheckSequence}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
          >
            Check Sequence Order →
          </button>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
          >
            Return to Reader View
          </button>
        )}

      </div>
    </div>
  );
}
