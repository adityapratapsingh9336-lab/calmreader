/**
 * Real-Time Telemetry Tracking Manager
 */
class TelemetryTracker {
  constructor() {
    this.reset();
  }

  reset() {
    this.startTime = Date.now();
    this.sentenceStartTime = Date.now();
    this.totalWords = 0;
    this.explainClicks = 0;
    this.replaysCount = 0;
    this.sentenceFixationsMs = [];
    this.quizScores = [];
  }

  startPassage(text) {
    this.reset();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    this.totalWords = wordCount;
  }

  logExplainClick() {
    this.explainClicks += 1;
  }

  logReplayClick() {
    this.replaysCount += 1;
  }

  logSentenceFixation(ms) {
    if (ms > 500 && ms < 30000) {
      this.sentenceFixationsMs.push(ms);
    }
  }

  logQuizResult(score, total) {
    if (total > 0) {
      this.quizScores.push((score / total) * 100);
    }
  }

  getMetrics() {
    const elapsedSeconds = Math.max(1, (Date.now() - this.startTime) / 1000);
    const calculatedWPM = Math.round((this.totalWords / elapsedSeconds) * 60);

    const avgSentenceFixationMs =
      this.sentenceFixationsMs.length > 0
        ? Math.round(
            this.sentenceFixationsMs.reduce((a, b) => a + b, 0) /
              this.sentenceFixationsMs.length
          )
        : 3500;

    const quizAccuracyPct =
      this.quizScores.length > 0
        ? Math.round(
            this.quizScores.reduce((a, b) => a + b, 0) / this.quizScores.length
          )
        : 80;

    return {
      elapsedSeconds: Math.round(elapsedSeconds),
      totalWords: this.totalWords,
      wpm: Math.min(250, Math.max(40, calculatedWPM)),
      avgSentenceFixationMs,
      explainClicksCount: this.explainClicks,
      replaysCount: this.replaysCount,
      quizAccuracyPct,
    };
  }
}

export const telemetryTracker = new TelemetryTracker();
