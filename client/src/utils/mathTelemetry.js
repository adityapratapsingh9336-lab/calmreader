/**
 * Math Telemetry & Adaptive Cognitive Modality Recommender
 * Diagnoses dyscalculia cognitive patterns and suggests the optimal visual learning representation.
 */

export const MATH_MODES = {
  NUMBER_LINE: 'NUMBER_LINE',
  STEP_SOLVER: 'STEP_SOLVER',
  PLACE_VALUE: 'PLACE_VALUE',
  COUNTERS: 'COUNTERS',
};

class MathTelemetryEngine {
  constructor() {
    this.history = [];
    this.modeUsage = {
      [MATH_MODES.NUMBER_LINE]: 0,
      [MATH_MODES.STEP_SOLVER]: 0,
      [MATH_MODES.PLACE_VALUE]: 0,
      [MATH_MODES.COUNTERS]: 0,
    };
  }

  logModeInteraction(mode) {
    if (this.modeUsage[mode] !== undefined) {
      this.modeUsage[mode] += 1;
    }
  }

  getAdaptiveRecommendation(problemData) {
    const { num1, num2, operator, placeValue } = problemData;

    // Rule 1: Small numbers (<= 15) -> Visual Counters & Ten-Frames for subitizing
    if (num1 <= 15 && num2 <= 15 && operator === '+') {
      return {
        recommendedMode: MATH_MODES.COUNTERS,
        badge: '🔵 Recommended: Visual Counters',
        reason: 'For small quantities, Ten-Frame visual counters build instantaneous number sense (subitizing) without counting fingers.',
        tip: 'Look at the 10-frame slots to see how close the number is to a full set of 10.',
      };
    }

    // Rule 2: Regrouping Carry or Borrow -> Place Value CRA Blocks
    if (placeValue?.isAdditionCarry || placeValue?.isSubtractionBorrow) {
      return {
        recommendedMode: MATH_MODES.PLACE_VALUE,
        badge: '🧱 Recommended: Place Value Blocks',
        reason: 'This problem involves carrying or borrowing (regrouping). Concrete Base-10 blocks make 10-to-1 exchanges visible.',
        tip: 'Watch how 10 unit cubes fuse together to form 1 Ten Rod (or vice versa).',
      };
    }

    // Rule 3: 2-Digit Jump & Subtraction Operations -> Number Line
    if (operator === '-' || (num1 >= 20 && num2 >= 10)) {
      return {
        recommendedMode: MATH_MODES.NUMBER_LINE,
        badge: '🧭 Recommended: Number Line',
        reason: 'Spatial jump arcs help prevent digit reversal and make forward/backward direction explicit.',
        tip: 'Leap in big steps of +10 first, then hop the remaining single units.',
      };
    }

    // Default: Step Solver Scaffolding
    return {
      recommendedMode: MATH_MODES.STEP_SOLVER,
      badge: '🔁 Recommended: Step Scaffolding',
      reason: 'Breaking multi-digit arithmetic into isolated micro-steps reduces working memory overload.',
      tip: 'Focus on one calculation at a time before moving forward.',
    };
  }
}

export const mathTelemetry = new MathTelemetryEngine();
