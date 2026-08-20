/**
 * Synced Text-to-Speech Engine utilizing Web Speech API
 */
class TTSEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.utterance = null;
    this.isPlaying = false;
    this.speechRate = 0.9; // Slightly reduced rate for cognitive readability
  }

  speak(text, onBoundary = () => {}, onEnd = () => {}, onError = () => {}) {
    if (!this.synth) {
      onError('Speech Synthesis API is not supported in this browser.');
      return;
    }

    // Stop existing speech
    this.stop();

    if (!text.trim()) return;

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = this.speechRate;
    this.utterance.pitch = 1.0;

    // Track word boundary speaking events
    this.utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        onBoundary(charIndex);
      }
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      onEnd();
    };

    this.utterance.onerror = (err) => {
      this.isPlaying = false;
      onError(err);
    };

    this.isPlaying = true;
    this.synth.speak(this.utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }

  setRate(rate) {
    this.speechRate = rate;
    if (this.utterance) {
      this.utterance.rate = rate;
    }
  }
}

export const ttsService = new TTSEngine();
