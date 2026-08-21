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
import SpeechReadingModal from './components/SpeechReadingModal';
import MathStudio from './components/math/MathStudio';
import NumberSenseStudio from './modules/number-sense/NumberSenseStudio';
import WritingTracingStudio from './modules/writing-tracing/WritingTracingStudio';
import AppSidebar from './components/layout/AppSidebar';
import AcademicDashboard from './components/dashboard/AcademicDashboard';
import InteractiveHero from './components/layout/InteractiveHero';
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
        <div className="p-8 text-center space-y-4 max-w-lg mx-auto my-auto bg-white border border-slate-200 rounded-3xl text-slate-800 shadow-xl">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-lg font-bold text-rose-600">Adaptive Reader Encountered an Error</h3>
          <p className="text-xs text-slate-500 font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 overflow-x-auto">
            {this.state.error?.toString()}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              this.props.onReset();
            }}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState('hero'); // 'hero', 'app'
  const [currentSection, setCurrentSection] = useState('dashboard'); // 'dashboard', 'reader', etc.
  const [isDarkMode, setIsDarkMode] = useState(false);
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
  const [isSpeechModalOpen, setIsSpeechModalOpen] = useState(false);
  const [isMathStudioOpen, setIsMathStudioOpen] = useState(false);
  const [isNumberSenseOpen, setIsNumberSenseOpen] = useState(false);
  const [isTracingStudioOpen, setIsTracingStudioOpen] = useState(false);
  const [selectedWordData, setSelectedWordData] = useState(null);

  // Default Baseline Settings
  const initialSettings = {
    theme: 'default',
    fontFamily: "'Lexend', sans-serif",
    fontSize: 20,
    lineHeight: 2.2,
    letterSpacing: 2,
    directionalAnchors: false,
    sequenceSupport: false,
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

  const handleNavigate = (section) => {
    if (section === 'hero') {
      setCurrentView('hero');
      return;
    }
    if (section === 'settings') {
      setIsSettingsOpen(true);
      return;
    }
    if (section === 'tutorials') {
      setIsSpeechModalOpen(true);
      return;
    }
    if (section === 'practices') {
      setIsDirectionTrainerOpen(true);
      return;
    }
    if (section === 'certifications') {
      setIsNumberSenseOpen(true);
      return;
    }
    if (section === 'help') {
      setIsPracticeOpen(true);
      return;
    }
    setCurrentSection(section);
  };

  const handleOpenReaderWithText = (newText) => {
    setText(newText);
    setCurrentView('app');
    setCurrentSection('reader');
  };

  const handleEnterDashboard = () => {
    setCurrentView('app');
    setCurrentSection('dashboard');
  };

  return (
    <div className="font-sans antialiased">
      {/* =========================================================================
          HERO LANDING STAGE (Interactive Showcase & Gateway)
         ========================================================================= */}
      {currentView === 'hero' ? (
        <InteractiveHero
          onEnterDashboard={handleEnterDashboard}
          onOpenReader={() => {
            setCurrentView('app');
            setCurrentSection('reader');
          }}
          onOpenTracingStudio={() => setIsTracingStudioOpen(true)}
          onOpenNumberSense={() => setIsNumberSenseOpen(true)}
          onOpenMathStudio={() => setIsMathStudioOpen(true)}
          onOpenSpeechModal={() => setIsSpeechModalOpen(true)}
          onOpenDirectionTrainer={() => setIsDirectionTrainerOpen(true)}
        />
      ) : (
        /* =========================================================================
            ACADEMIC WHITE APPLICATION STAGE (Floating 3-Column Dashboard & Reader)
           ========================================================================= */
        <div className="min-h-screen bg-[#0d4745] lg:bg-gradient-to-br lg:from-[#0a3a38] lg:via-[#0d4745] lg:to-[#082928] p-0 lg:p-6 xl:p-8 flex items-center justify-center selection:bg-teal-500 selection:text-white">
          <div className="w-full max-w-[1520px] h-screen lg:h-[92vh] max-h-[1020px] bg-white rounded-none lg:rounded-[36px] shadow-2xl border border-teal-900/20 flex overflow-hidden text-slate-800 relative">
            <ErrorBoundary onReset={handleResetText}>
              {/* Left Navigation Sidebar */}
              <AppSidebar
                currentSection={currentSection}
                onNavigate={handleNavigate}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              />

              {/* Right Main Content Stage */}
              <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
                {currentSection === 'dashboard' ? (
                  <AcademicDashboard
                    onOpenTracingStudio={() => setIsTracingStudioOpen(true)}
                    onOpenNumberSense={() => setIsNumberSenseOpen(true)}
                    onOpenMathStudio={() => setIsMathStudioOpen(true)}
                    onOpenSpeechModal={() => setIsSpeechModalOpen(true)}
                    onOpenReader={() => setCurrentSection('reader')}
                    onOpenPractice={() => setIsPracticeOpen(true)}
                    onOpenAnalytics={() => setIsAnalyticsOpen(true)}
                    onOpenDirectionTrainer={() => setIsDirectionTrainerOpen(true)}
                  />
                ) : (
                  /* Reader / Ingestion Stage */
                  <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 text-slate-100 relative">
                    {/* Back to Dashboard Navigation Ribbon */}
                    <div className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setCurrentSection('dashboard')}
                          className="text-xs font-bold text-teal-400 hover:text-teal-300 bg-teal-950/60 border border-teal-500/30 hover:border-teal-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <span>←</span>
                          <span>Return to Dashboard</span>
                        </button>
                        <span className="text-xs text-slate-500 hidden sm:inline">•</span>
                        <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                          {text ? 'Active Reading Mode' : 'Document Ingestion Studio'}
                        </span>
                      </div>

                      {text && (
                        <button
                          onClick={handleResetText}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 transition-colors"
                        >
                          Load New Document
                        </button>
                      )}
                    </div>

                    {/* Content View */}
                    {!text ? (
                      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
                        <Upload
                          onTextLoaded={(loadedText) => handleOpenReaderWithText(loadedText)}
                          onOpenMathStudio={() => setIsMathStudioOpen(true)}
                          onOpenNumberSense={() => setIsNumberSenseOpen(true)}
                          onOpenTracingStudio={() => setIsTracingStudioOpen(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col h-full overflow-hidden">
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
                          onOpenSpeechModal={() => setIsSpeechModalOpen(true)}
                          onOpenMathStudio={() => setIsMathStudioOpen(true)}
                          onOpenNumberSense={() => setIsNumberSenseOpen(true)}
                          onOpenTracingStudio={() => setIsTracingStudioOpen(true)}
                          isAutoEnabled={isAutoEnabled}
                          onToggleAutoAdapt={toggleAutoAdapt}
                          profileType={profileType}
                        />

                        <div className="flex-1 overflow-y-auto">
                          <Reader
                            text={text}
                            settings={settings}
                            activeCharIndex={activeCharIndex}
                            onSelectWord={(word, sentence) => setSelectedWordData({ word, sentence })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </main>
            </ErrorBoundary>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL MODALS & LEARNING STUDIOS (Accessible across all views)
         ========================================================================= */}
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
          passageText={text || "Reading is a multi-sensory process combining visual word decoding, syllable recognition, and comprehension."}
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

      {/* Independent Learning Studios */}
      {isMathStudioOpen && (
        <MathStudio onClose={() => setIsMathStudioOpen(false)} />
      )}

      {isNumberSenseOpen && (
        <NumberSenseStudio onClose={() => setIsNumberSenseOpen(false)} />
      )}

      {isTracingStudioOpen && (
        <WritingTracingStudio onClose={() => setIsTracingStudioOpen(false)} />
      )}

      {isDirectionTrainerOpen && (
        <DirectionTrainer
          onClose={() => setIsDirectionTrainerOpen(false)}
        />
      )}

      {isSpeechModalOpen && (
        <SpeechReadingModal
          defaultSentence={
            text
              ? text.split(/(?<=[.!?])\s+/).filter(Boolean)[0]
              : 'The brave boy noticed that letter orientation makes reading effortless.'
          }
          onClose={() => setIsSpeechModalOpen(false)}
        />
      )}

      <AdaptationToast message={toastMessage} onDismiss={dismissToast} />
    </div>
  );
}
