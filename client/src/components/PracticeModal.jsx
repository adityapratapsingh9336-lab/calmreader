import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/apiConfig';

export default function PracticeModal({ passageText, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!passageText) return;

    let isMounted = true;
    setLoading(true);

    fetch(`${API_BASE_URL}/api/generate-mcq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passageText }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setQuestions(json.questions || []);
          setLoading(false);
        }
      })
      .catch(() => {
        // Fallback quiz generator for offline hackathon demos
        if (isMounted) {
          setQuestions([
            {
              id: 1,
              question: "What is the primary visual challenge addressed by directional anchors?",
              options: ["Auditory pitch loss", "Letter reversal flips (b/d/p/q)", "Font download speed", "Color blindness"],
              correctIndex: 1,
              explanation: "Directional anchors attach visual cues to b, d, p, and q to suppress mirror invariance."
            },
            {
              id: 2,
              question: "How does spatial kerning expansion help Dyseidetic dyslexic readers?",
              options: ["Reduces lateral visual crowding noise", "Makes text darker", "Speaks text out loud", "Changes language"],
              correctIndex: 0,
              explanation: "Increasing character pitch separates flanking glyphs, preventing visual crowding."
            },
            {
              id: 3,
              question: "What function does the Focus Spotlight serve during active reading?",
              options: ["Translates text", "Dims non-active lines to prevent saccadic drift", "Generates audio", "Inverts background"],
              correctIndex: 1,
              explanation: "Focus spotlight keeps the eyes landing on the target reading line."
            }
          ]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [passageText]);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎯</span>
            <h3 className="font-bold text-sm text-emerald-400">AI Visual Reading Practice & Quiz</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400 font-medium">Analyzing passage & generating AI comprehension questions...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submitted && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-center space-y-1">
                <span className="text-2xl">🏆</span>
                <h4 className="font-bold text-base">Quiz Completed!</h4>
                <p className="text-xs text-emerald-200">
                  You scored <span className="font-bold font-mono text-white">{score} / {questions.length}</span> correct answers.
                </p>
              </div>
            )}

            {/* Questions List */}
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-semibold text-slate-200 flex items-start space-x-2">
                  <span className="text-indigo-400 font-mono">Q{idx + 1}.</span>
                  <span>{q.question}</span>
                </h4>

                <div className="grid grid-cols-1 gap-2 pl-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    const isCorrect = q.correctIndex === optIdx;

                    let btnStyle = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded border border-slate-800 mt-2">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}

            {!submitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < questions.length}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-colors shadow-lg shadow-emerald-600/20"
              >
                Submit Quiz Answers →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
              >
                Return to Reader
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
