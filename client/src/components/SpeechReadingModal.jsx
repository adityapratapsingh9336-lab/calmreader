import React, { useState, useEffect, useRef } from 'react';
import { alignReading } from '../utils/readingComparator';
import { ttsService } from '../utils/tts';

const PRESET_PRACTICE_SENTENCES = [
  {
    id: 1,
    category: "Short Vowel Contrast ('a' vs 'e' / 'i')",
    sentence: "The cat sat on the red mat.",
  },
  {
    id: 2,
    category: "Mirror Letters (b, d, p, q)",
    sentence: "The brave boy picked a quiet spot beside the pond.",
  },
  {
    id: 3,
    category: "Sight Words & Spatial Flow",
    sentence: "She walked through the door and looked up at the blue sky.",
  },
  {
    id: 4,
    category: "Consonant Blends & Fluency",
    sentence: "Quick brown foxes jump swiftly over lazy dogs.",
  },
];

export default function SpeechReadingModal({ defaultSentence = '', onClose }) {
  const [selectedSentence, setSelectedSentence] = useState(
    defaultSentence || PRESET_PRACTICE_SENTENCES[0].sentence
  );
  const [customInput, setCustomInput] = useState('');
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // Recording & Transcription state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [liveSpokenText, setLiveSpokenText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [backendEngineUsed, setBackendEngineUsed] = useState(null);

  // Audio recording refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllRecording();
    };
  }, []);

  // Update selected sentence if defaultSentence changes
  useEffect(() => {
    if (defaultSentence) {
      setSelectedSentence(defaultSentence);
      setAnalysisResult(null);
      setLiveSpokenText('');
    }
  }, [defaultSentence]);

  // Speech Recognition (Web Speech API for Real-Time Live Feed)
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      const currentSpeech = (finalTranscript + interimTranscript).trim();
      setLiveSpokenText(currentSpeech);

      // Perform fast real-time interim alignment
      if (currentSpeech) {
        const liveAnalysis = alignReading(selectedSentence, currentSpeech);
        setAnalysisResult(liveAnalysis);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Web Speech API event:', event.error);
    };

    return recognition;
  };

  // Start Real-Time Microphone Capture & Recording
  const startRecording = async () => {
    try {
      setLiveSpokenText('');
      setAnalysisResult(null);
      setRecordingDuration(0);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Audio Visualizer Setup
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioContextRef.current = new AudioContext();
          const source = audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 64;
          source.connect(analyserRef.current);

          const updateVisualizer = () => {
            if (!analyserRef.current) return;
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const avg =
              dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
            setAudioLevel(Math.min(100, Math.round(avg * 1.5)));
            animFrameRef.current = requestAnimationFrame(updateVisualizer);
          };
          updateVisualizer();
        }
      } catch (err) {
        console.warn('AudioContext visualizer unsupported:', err);
      }

      // 2. MediaRecorder for High-Accuracy Groq Whisper backend
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(250);

      // 3. Web Speech Recognition for instant visual feedback
      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        try {
          recognition.start();
        } catch (e) {
          console.warn('Recognition start caught:', e);
        }
      }

      setIsRecording(true);

      // Timer ticker
      timerIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to access microphone:', err);
      alert(
        'Microphone access was denied or is unavailable. Please grant microphone permissions in your browser.'
      );
    }
  };

  // Stop Recording & Send Audio to Backend (Groq Whisper / Analysis API)
  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close().catch(() => {});

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mediaRecorderRef.current.mimeType || 'audio/webm',
        });

        // Send audio to Backend for Groq Whisper transcription & comparison
        await analyzeAudioWithBackend(audioBlob);
      };
      mediaRecorderRef.current.stop();
      // Stop all audio tracks
      mediaRecorderRef.current.stream?.getTracks().forEach((t) => t.stop());
    } else {
      // Fallback: evaluate live spoken text
      evaluateFinalText(liveSpokenText);
      setIsProcessing(false);
    }
  };

  const stopAllRecording = () => {
    setIsRecording(false);
    setIsProcessing(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream?.getTracks().forEach((t) => t.stop());
      } catch (e) {}
    }
  };

  // Call Backend /api/analyze-reading with Audio FormData
  const analyzeAudioWithBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'reading.webm');
      formData.append('originalText', selectedSentence);
      formData.append('spokenText', liveSpokenText);

      const response = await fetch('/api/analyze-reading', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server returned analysis error');
      }

      const data = await response.json();
      setLiveSpokenText(data.spokenText || liveSpokenText);
      setBackendEngineUsed(data.transcriptionSource || 'whisper-v3');
      setAnalysisResult({
        tokens: data.tokens,
        accuracy: data.accuracy,
        stats: data.stats,
        mistakes: data.mistakes,
        phonicsInsights: data.phonicsInsights,
      });
    } catch (err) {
      console.warn('Backend audio analysis error, using client-side fallback:', err);
      evaluateFinalText(liveSpokenText);
    } finally {
      setIsProcessing(false);
    }
  };

  // Client-Side Final Evaluation Fallback
  const evaluateFinalText = (spoken) => {
    const textToCompare = spoken.trim() || selectedSentence;
    const result = alignReading(selectedSentence, textToCompare);
    setAnalysisResult(result);
    setBackendEngineUsed('client-engine');
  };

  // Word Pronunciation Click Handler
  const handleSpeakWord = (word) => {
    const clean = word.replace(/[^\w\s]/g, '');
    if (clean) {
      ttsService.speak(clean);
    }
  };

  // Custom Sentence Submission
  const handleSaveCustom = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      setSelectedSentence(customInput.trim());
      setIsEditingCustom(false);
      setAnalysisResult(null);
      setLiveSpokenText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20">
              🎤
            </div>
            <div>
              <h2 className="font-extrabold text-base md:text-lg text-white flex items-center space-x-2">
                <span>Real-Time Speech Detection & Reading Coach</span>
                <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                  Groq Whisper-v3
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Read aloud into your microphone. AI compares each spoken word and flags phonetic reversals.
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

        {/* Practice Sentence Selector Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Select Practice Target:</span>
            <button
              onClick={() => {
                setIsEditingCustom(!isEditingCustom);
                setCustomInput(selectedSentence);
              }}
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isEditingCustom ? '✕ Cancel Custom' : '✏️ Enter Custom Sentence'}
            </button>
          </div>

          {!isEditingCustom ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_PRACTICE_SENTENCES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    if (isRecording) stopAllRecording();
                    setSelectedSentence(preset.sentence);
                    setAnalysisResult(null);
                    setLiveSpokenText('');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedSentence === preset.sentence
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/40'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {preset.category}
                  </span>
                  <p className="text-xs font-medium line-clamp-2">
                    "{preset.sentence}"
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveCustom} className="flex space-x-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type or paste custom sentence to read aloud..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
              >
                Set Sentence
              </button>
            </form>
          )}
        </div>

        {/* Target Sentence Display Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
              <span>📖</span>
              <span>Target Sentence to Read Aloud:</span>
            </span>
            <button
              onClick={() => ttsService.speak(selectedSentence)}
              className="flex items-center space-x-1 text-slate-400 hover:text-indigo-300 transition-colors bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
              title="Hear Sentence Audio"
            >
              <span>🔊 Listen Model Audio</span>
            </button>
          </div>

          <div className="text-xl md:text-2xl font-semibold text-white leading-relaxed font-sans tracking-wide">
            {selectedSentence}
          </div>
        </div>

        {/* Recording Controls & Visualizer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 gap-4">
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center space-x-2 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <span className="text-base">🎙️</span>
                <span>Start Reading Aloud</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl shadow-xl shadow-rose-500/25 flex items-center space-x-2 transition-all animate-pulse cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping mr-1"></span>
                <span>Stop & Evaluate ({recordingDuration}s)</span>
              </button>
            )}

            {isRecording && (
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">
                  Listening
                </span>
                <div className="flex items-center space-x-0.5 h-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                      style={{
                        height: `${Math.max(4, (audioLevel / 100) * 24 * ((i % 3) + 0.5))}px`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center space-x-2 text-xs text-indigo-300 font-medium">
                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Transcribing via Groq Whisper-v3 & Analyzing...</span>
              </div>
            )}
          </div>

          {/* Quick Stats Pill Header */}
          {analysisResult && (
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <span className="text-slate-400">Accuracy:</span>
                <span
                  className={`font-black font-mono text-sm ${
                    analysisResult.accuracy >= 80
                      ? 'text-emerald-400'
                      : analysisResult.accuracy >= 50
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {analysisResult.accuracy}%
                </span>
              </div>

              <div className="flex items-center space-x-2 font-mono text-[11px]">
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ✓ {analysisResult.stats.correct} Correct
                </span>
                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  ✗ {analysisResult.stats.substituted} Wrong
                </span>
                <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  ⚠ {analysisResult.stats.omitted} Skipped
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Live Speech Feedback & Token Comparison Board */}
        {analysisResult && (
          <div className="space-y-6 animate-in slide-in-from-bottom-3 duration-300">
            
            {/* Visual Token Comparison Area */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🎯</span>
                  <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                    Word-by-Word Cognitive Visual Diff
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold">
                  <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    🟢 Correct
                  </span>
                  <span className="text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
                    🔴 Wrong Word
                  </span>
                  <span className="text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                    🟡 Skipped Word
                  </span>
                </div>
              </div>

              {/* Tokens Ribbon */}
              <div className="flex flex-wrap gap-2.5 items-center pt-2">
                {analysisResult.tokens.map((item, idx) => {
                  if (item.type === 'MATCH') {
                    return (
                      <span
                        key={idx}
                        onClick={() => handleSpeakWord(item.original)}
                        className="group inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold cursor-pointer hover:bg-emerald-500/25 transition-all shadow-sm"
                        title="Click to hear correct pronunciation"
                      >
                        <span>✓</span>
                        <span>{item.original}</span>
                        <span className="opacity-0 group-hover:opacity-100 text-[10px] text-emerald-400 transition-opacity">
                          🔊
                        </span>
                      </span>
                    );
                  }

                  if (item.type === 'SUBSTITUTION') {
                    return (
                      <span
                        key={idx}
                        onClick={() => handleSpeakWord(item.original)}
                        className="group inline-flex flex-col items-center p-1.5 px-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm font-bold cursor-pointer hover:bg-rose-500/25 transition-all shadow-md shadow-rose-500/10"
                        title={`Spoke "${item.spoken}" instead of "${item.original}" (Click to hear model)`}
                      >
                        <span className="text-white line-through opacity-75 text-xs">
                          {item.original}
                        </span>
                        <span className="text-rose-400 text-xs font-mono">
                          ❌ "{item.spoken}"
                        </span>
                      </span>
                    );
                  }

                  if (item.type === 'OMISSION') {
                    return (
                      <span
                        key={idx}
                        onClick={() => handleSpeakWord(item.original)}
                        className="group inline-flex flex-col items-center p-1.5 px-3 rounded-xl bg-amber-500/10 border border-dashed border-amber-500/50 text-amber-300 text-sm font-medium cursor-pointer hover:bg-amber-500/20 transition-all"
                        title={`Skipped word "${item.original}" (Click to hear)`}
                      >
                        <span className="underline decoration-amber-400 decoration-wavy decoration-1">
                          {item.original}
                        </span>
                        <span className="text-[9px] text-amber-400 font-mono">
                          ⚠️ Skipped
                        </span>
                      </span>
                    );
                  }

                  if (item.type === 'INSERTION') {
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono"
                        title={`Added extra word "${item.spoken}"`}
                      >
                        <span>➕</span>
                        <span>"{item.spoken}"</span>
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Raw Speech Transcription Transcript */}
              {liveSpokenText && (
                <div className="pt-3 border-t border-slate-800/80 flex items-baseline space-x-2 text-xs">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Whisper Transcribed:
                  </span>
                  <span className="text-slate-300 italic font-mono">
                    "{liveSpokenText}"
                  </span>
                </div>
              )}
            </div>

            {/* AI Phonics & Cognitive Coaching Insights */}
            {analysisResult.phonicsInsights &&
              analysisResult.phonicsInsights.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🧠</span>
                    <h4 className="font-extrabold text-xs text-indigo-300 uppercase tracking-wider">
                      Cognitive Phonics & Dyslexia Insight
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysisResult.phonicsInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/70 border border-indigo-500/20 p-4 rounded-2xl space-y-2 shadow-sm"
                      >
                        <h5 className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <span className="text-indigo-400 font-mono">#{idx + 1}</span>
                          <span>{insight.title}</span>
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {insight.detail}
                        </p>
                        <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl">
                          💡 <span className="font-semibold">Coach Tip:</span>{' '}
                          {insight.anchorHint}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Mistakes Action List */}
            {analysisResult.mistakes && analysisResult.mistakes.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Specific Reading Corrections:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.mistakes.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            m.type === 'SUBSTITUTION'
                              ? 'bg-rose-400'
                              : m.type === 'OMISSION'
                              ? 'bg-amber-400'
                              : 'bg-purple-400'
                          }`}
                        ></span>
                        <span className="text-slate-200">{m.message}</span>
                      </div>

                      {m.original && (
                        <button
                          onClick={() => handleSpeakWord(m.original)}
                          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 flex items-center space-x-1"
                        >
                          <span>🔊 Hear</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-xs text-slate-500 flex items-center space-x-2">
            <span>Powered by Groq Whisper-large-v3 Speech Engine</span>
          </div>

          <div className="flex items-center space-x-3">
            {analysisResult && (
              <button
                onClick={startRecording}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                🔄 Try Again
              </button>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
            >
              Done & Return
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
