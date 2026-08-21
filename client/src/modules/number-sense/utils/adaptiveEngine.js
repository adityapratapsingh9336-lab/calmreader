/**
 * Adaptive Numerosity Progress & 5-Dimension Skill Engine
 */

export class NumberSenseAdaptiveEngine {
  constructor() {
    this.state = {
      currentLevel: 1,
      unlockedLevels: [1],
      levelStats: {},
      skills: {
        quantityComparison: 70,    // Levels 1–2
        shapeInvariance: 65,       // Levels 3–4
        distractorResistance: 60,   // Levels 5–7
        symbolMapping: 75,         // Levels 8–9
        spatialNumberLine: 60,     // Level 10
        arithmetic: 65,            // Levels 11–12
      },
    };
  }

  evaluateLevelAttempt(level, correctCount, totalCount) {
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const isMastered = accuracy >= 80;
    const needsHints = accuracy >= 50 && accuracy < 80;

    // Record stats
    this.state.levelStats[level] = {
      accuracy,
      correctCount,
      totalCount,
      isMastered,
      timestamp: new Date().toISOString(),
    };

    // Unlock next level if mastered
    if (isMastered && level < 12) {
      const nextLevel = level + 1;
      if (!this.state.unlockedLevels.includes(nextLevel)) {
        this.state.unlockedLevels.push(nextLevel);
      }
    }

    // Update 5-Dimension Skill Profile
    if (level === 1 || level === 2) {
      this.state.skills.quantityComparison = Math.min(100, Math.round((this.state.skills.quantityComparison + accuracy) / 2));
    } else if (level === 3 || level === 4) {
      this.state.skills.shapeInvariance = Math.min(100, Math.round((this.state.skills.shapeInvariance + accuracy) / 2));
    } else if (level >= 5 && level <= 7) {
      this.state.skills.distractorResistance = Math.min(100, Math.round((this.state.skills.distractorResistance + accuracy) / 2));
    } else if (level === 8 || level === 9) {
      this.state.skills.symbolMapping = Math.min(100, Math.round((this.state.skills.symbolMapping + accuracy) / 2));
    } else if (level === 10) {
      this.state.skills.spatialNumberLine = Math.min(100, Math.round((this.state.skills.spatialNumberLine + accuracy) / 2));
    } else if (level >= 11) {
      this.state.skills.arithmetic = Math.min(100, Math.round((this.state.skills.arithmetic + accuracy) / 2));
    }

    let recommendation = '';
    if (isMastered) {
      recommendation = `🌟 Level ${level} Mastered (${accuracy}%)! You are ready to advance to the next challenge!`;
    } else if (needsHints) {
      recommendation = `👍 Great effort (${accuracy}%)! Try replaying with the visual grouping hints to reach 80% mastery.`;
    } else {
      recommendation = `💪 Keep going! We will slow down and add visual aids to strengthen this skill.`;
    }

    return {
      accuracy,
      isMastered,
      needsHints,
      recommendation,
      unlockedLevels: [...this.state.unlockedLevels],
      skills: { ...this.state.skills },
    };
  }
}

export const numberSenseEngine = new NumberSenseAdaptiveEngine();
