import React, { useState } from 'react';
import Upload from './components/Upload';
import Reader from './components/Reader';
import Controls from './components/Controls';
import SettingsPanel from './components/SettingsPanel';
import ExplainModal from './components/ExplainModal';
import PracticeModal from './components/PracticeModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdaptationToast from './components/AdaptationToast';
import StepByStepView from './components/StepByStepView';
import SequenceTrainingModal from './components/SequenceTrainingModal';
import StepFlow from './components/StepFlow';
import DirectionTrainer from './components/DirectionTrainer';
import { useAdaptiveEngine } from './hooks/useAdaptiveEngine';
import { ttsService } from './utils/tts';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Reader ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center space-y-4 max-w-lg mx-auto my-auto bg-slate-900 border border-slate-800 rounded-2xl text-slate-200">
          <span className="text-3xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-400">Adaptive Reader Encountered an Error</h3>
          <p className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg"
          >
            Return to Ingestion View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(null);

  // Modals & Panels State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isStepModeOpen, setIsStepModeOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [isStepFlowOpen, setIsStepFlowOpen] = useState(false);
  const [isDirectionTrainerOpen, setIsDirectionTrainerOpen] = useState(false);
  const [selectedWordData, setSelectedWordData] = useState(null);

  // Default Baseline Settings
  const initialSettings = {
    theme: 'default',
    fontFamily: "'Lexend', sans-serif",
    fontSize: 20,
    lineHeight: 2.2,
    letterSpacing: 2,
    directionalAnchors: false, // Baseline starts off to allow AI adaptation demo
    sequenceSupport: false,    // Directional & sequence support module state
    lineSpotlight: true,
  };

  // Autonomous AI Adaptation Engine Hook
  const {
    settings,
    updateSettings,
    profileType,
    toastMessage,
    dismissToast,
    isAutoEnabled,
    toggleAutoAdapt,
    telemetryMetrics,
  } = useAdaptiveEngine(text, initialSettings);

  const handleToggleTTS = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
      setActiveCharIndex(null);
    } else {
      ttsService.speak(
        text,
        (charIndex) => setActiveCharIndex(charIndex),
        () => {
          setIsPlaying(false);
          setActiveCharIndex(null);
        },
        (err) => {
          console.error('TTS error:', err);
          setIsPlaying(false);
        }
      );
      setIsPlaying(true);
    }
  };

  const handleResetText = () => {
    ttsService.stop();
    setIsPlaying(false);
    setActiveCharIndex(null);
    setText('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950">
      <ErrorBoundary onReset={handleResetText}>
        {!text ? (
          <div className="flex-1 flex items-center justify-center">
            <Upload onTextLoaded={(loadedText) => setText(loadedText)} />
          </div>
        ) : (
          <>
            <Controls
              settings={settings}
              onUpdateSettings={updateSettings}
              isPlaying={isPlaying}
              onToggleTTS={handleToggleTTS}
              onResetText={handleResetText}
              onOpenPractice={() => setIsPracticeOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenAnalytics={() => setIsAnalyticsOpen(true)}
              onOpenStepMode={() => setIsStepModeOpen(true)}
              onOpenReorder={() => setIsReorderOpen(true)}
              onOpenStepFlow={() => setIsStepFlowOpen(true)}
              onOpenDirectionTrainer={() => setIsDirectionTrainerOpen(true)}
              isAutoEnabled={isAutoEnabled}
              onToggleAutoAdapt={toggleAutoAdapt}
              profileType={profileType}
            />

            <Reader
              text={text}
              settings={settings}
              activeCharIndex={activeCharIndex}
              onSelectWord={(word, sentence) => setSelectedWordData({ word, sentence })}
            />

            <SettingsPanel
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              settings={settings}
              onUpdateSettings={updateSettings}
            />

            {selectedWordData && (
              <ExplainModal
                word={selectedWordData.word}
                contextSentence={selectedWordData.sentence}
                onClose={() => setSelectedWordData(null)}
              />
            )}

            {isPracticeOpen && (
              <PracticeModal
                passageText={text}
                onClose={() => setIsPracticeOpen(false)}
              />
            )}

            {isAnalyticsOpen && (
              <AnalyticsDashboard
                isOpen={isAnalyticsOpen}
                onClose={() => setIsAnalyticsOpen(false)}
                metrics={telemetryMetrics}
                profileType={profileType}
              />
            )}

            {isStepModeOpen && (
              <StepByStepView
                text={text}
                settings={settings}
                onClose={() => setIsStepModeOpen(false)}
              />
            )}

            {isReorderOpen && (
              <SequenceTrainingModal
                passageText={text}
                onClose={() => setIsReorderOpen(false)}
              />
            )}

            {isStepFlowOpen && (
              <StepFlow
                text={text}
                onClose={() => setIsStepFlowOpen(false)}
              />
            )}

            {isDirectionTrainerOpen && (
              <DirectionTrainer
                onClose={() => setIsDirectionTrainerOpen(false)}
              />
            )}

            <AdaptationToast message={toastMessage} onDismiss={dismissToast} />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
}
