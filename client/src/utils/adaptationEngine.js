/**
 * Cognitive Classification & Rule Adaptation Engine
 */

export const PROFILE_TYPES = {
  NORMAL: 'NORMAL',
  VISUAL_DIFFICULTY: 'VISUAL_DIFFICULTY',
  SPEED_DIFFICULTY: 'SPEED_DIFFICULTY',
  SEQUENCE_CONFUSION: 'SEQUENCE_CONFUSION',
  MIXED_DIFFICULTY: 'MIXED_DIFFICULTY',
};

/**
 * Classify user cognitive profile based on telemetry metrics
 */
export function classifyCognitiveProfile(metrics) {
  const { wpm, avgSentenceFixationMs, explainClicksCount, replaysCount, quizAccuracyPct } = metrics;

  const quizErrorPct = 100 - quizAccuracyPct;
  const visualStrainScore = (explainClicksCount * 2.5) + (quizErrorPct * 0.4) + (replaysCount * 1.0);
  const speedStrainScore = ((160 - wpm) / 10) + (avgSentenceFixationMs / 1000);
  const sequenceStrainScore = (avgSentenceFixationMs / 800) + (replaysCount * 2.0);

  if (sequenceStrainScore > 6.0) {
    return PROFILE_TYPES.SEQUENCE_CONFUSION;
  }
  if (visualStrainScore > 4.5 && speedStrainScore > 5.5) {
    return PROFILE_TYPES.MIXED_DIFFICULTY;
  }
  if (visualStrainScore > 3.5) {
    return PROFILE_TYPES.VISUAL_DIFFICULTY;
  }
  if (speedStrainScore > 4.5 || wpm < 110) {
    return PROFILE_TYPES.SPEED_DIFFICULTY;
  }

  return PROFILE_TYPES.NORMAL;
}

/**
 * Evaluate rule-based UI adaptation suggestions
 */
export function evaluateAdaptation(metrics, currentSettings) {
  const profileType = classifyCognitiveProfile(metrics);

  let shouldAdapt = false;
  let newSettings = { ...currentSettings };
  let reason = '';

  if (profileType === PROFILE_TYPES.SEQUENCE_CONFUSION && !currentSettings.sequenceSupport) {
    shouldAdapt = true;
    newSettings.sequenceSupport = true;
    newSettings.directionalAnchors = true;
    newSettings.lineSpotlight = true;
    reason = '🤖 AI Auto-Adapted: Sequence & line-tracking hesitation detected! Enabled Left-Margin Anchors & Ordinal Badges.';
  } else if (profileType === PROFILE_TYPES.VISUAL_DIFFICULTY && !currentSettings.directionalAnchors) {
    shouldAdapt = true;
    newSettings.directionalAnchors = true;
    newSettings.theme = 'sepia';
    newSettings.fontSize = Math.min(26, currentSettings.fontSize + 2);
    reason = '🤖 AI Auto-Adapted: Visual strain detected! Enabled b/d/p/q anchors & Sepia Theme.';
  } else if (profileType === PROFILE_TYPES.SPEED_DIFFICULTY && currentSettings.letterSpacing < 3) {
    shouldAdapt = true;
    newSettings.letterSpacing = Math.min(6, currentSettings.letterSpacing + 2);
    newSettings.lineHeight = 2.4;
    newSettings.lineSpotlight = true;
    reason = '🤖 AI Auto-Adapted: Slow reading velocity detected! Expanded kerning & Focus Spotlight.';
  } else if (profileType === PROFILE_TYPES.MIXED_DIFFICULTY) {
    if (!currentSettings.directionalAnchors || !currentSettings.sequenceSupport || currentSettings.letterSpacing < 3) {
      shouldAdapt = true;
      newSettings.directionalAnchors = true;
      newSettings.sequenceSupport = true;
      newSettings.letterSpacing = 4;
      newSettings.lineHeight = 2.4;
      newSettings.lineSpotlight = true;
      newSettings.theme = 'sepia';
      reason = '🤖 AI Auto-Adapted: Mixed cognitive difficulty detected! Maximum visual spacing & sequence support applied.';
    }
  }

  return {
    shouldAdapt,
    profileType,
    newSettings,
    reason,
  };
}
