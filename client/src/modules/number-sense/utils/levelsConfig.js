/**
 * 12-Level Numerosity & Number Sense Progression Curriculum
 * Inspired by Cheng et al. developmental cognitive numerosity model.
 */

export const LEVEL_STAGES = {
  EXPLORER: 'Quantity Explorer',
  INVARIANCE: 'Shape & Size Invariance',
  FOCUS: 'Distractor Focus Challenge',
  MATCHER: 'Number Matcher',
  SPATIAL: 'Spatial Number Line',
  BUILDER: 'Math Builder',
};

export const LEVELS_CONFIG = [
  // 🟢 Stage 1: Quantity Explorer (Perceptual Comparison)
  {
    level: 1,
    stage: LEVEL_STAGES.EXPLORER,
    title: 'Obvious Magnitude Comparison',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    type: 'QUANTITY_COMPARE',
    instruction: 'Tap the side that has MORE dots!',
    hint: 'Look at which group takes up a larger cloud of items.',
    problems: [
      { id: 1, leftCount: 3, rightCount: 8, correctSide: 'right' },
      { id: 2, leftCount: 9, rightCount: 2, correctSide: 'left' },
      { id: 3, leftCount: 4, rightCount: 10, correctSide: 'right' },
      { id: 4, leftCount: 7, rightCount: 1, correctSide: 'left' },
    ],
  },
  {
    level: 2,
    stage: LEVEL_STAGES.EXPLORER,
    title: 'Subtle Ratio Comparison',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    type: 'QUANTITY_COMPARE',
    instruction: 'Which side has MORE dots? Look carefully!',
    hint: 'Try grouping them mentally into pairs or small clusters of 2 or 3.',
    problems: [
      { id: 1, leftCount: 5, rightCount: 7, correctSide: 'right' },
      { id: 2, leftCount: 8, rightCount: 6, correctSide: 'left' },
      { id: 3, leftCount: 6, rightCount: 9, correctSide: 'right' },
      { id: 4, leftCount: 7, rightCount: 5, correctSide: 'left' },
    ],
  },

  // 🟡 Stage 2: Shape & Size Invariance (Spacing != Quantity)
  {
    level: 3,
    stage: LEVEL_STAGES.INVARIANCE,
    title: 'Equal Quantity / Different Sizing',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    type: 'QUANTITY_INVARIANCE',
    instruction: 'Do both sides have the SAME number of items?',
    hint: 'Big spaced-out items do NOT mean more items. Count the actual tokens!',
    problems: [
      {
        id: 1,
        leftCount: 5,
        rightCount: 5,
        leftSpacing: 'wide',
        rightSpacing: 'compact',
        isEqual: true,
      },
      {
        id: 2,
        leftCount: 4,
        rightCount: 6,
        leftSpacing: 'huge',
        rightSpacing: 'compact',
        isEqual: false,
        moreSide: 'right',
      },
      {
        id: 3,
        leftCount: 6,
        rightCount: 6,
        leftSpacing: 'compact',
        rightSpacing: 'wide',
        isEqual: true,
      },
      {
        id: 4,
        leftCount: 7,
        rightCount: 5,
        leftSpacing: 'compact',
        rightSpacing: 'wide',
        isEqual: false,
        moreSide: 'left',
      },
    ],
  },
  {
    level: 4,
    stage: LEVEL_STAGES.INVARIANCE,
    title: 'Deceptive Spacing Challenge',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    type: 'QUANTITY_INVARIANCE',
    instruction: 'Which side has MORE? Do not be tricked by spreading!',
    hint: 'A tight group can still have more items than a spread-out group.',
    problems: [
      { id: 1, leftCount: 3, rightCount: 6, leftSpacing: 'wide', rightSpacing: 'compact', correctSide: 'right' },
      { id: 2, id: 2, leftCount: 7, rightCount: 4, leftSpacing: 'compact', rightSpacing: 'wide', correctSide: 'left' },
      { id: 3, leftCount: 4, rightCount: 8, leftSpacing: 'wide', rightSpacing: 'compact', correctSide: 'right' },
      { id: 4, leftCount: 9, rightCount: 5, leftSpacing: 'compact', rightSpacing: 'wide', correctSide: 'left' },
    ],
  },

  // 🔴 Stage 3: Focus & Distractor Inhibition
  {
    level: 5,
    stage: LEVEL_STAGES.FOCUS,
    title: 'Target Counting with Distractors',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    type: 'DISTRACTOR_CHALLENGE',
    instruction: 'How many ⭐ STARS are there? (Ignore the 🪨 rocks!)',
    targetEmoji: '⭐',
    distractorEmoji: '🪨',
    hint: 'Filter out the gray rocks and focus your gaze solely on the bright stars.',
    problems: [
      { id: 1, targetCount: 4, distractorCount: 3, options: [3, 4, 7] },
      { id: 2, targetCount: 6, distractorCount: 4, options: [5, 6, 10] },
      { id: 3, targetCount: 5, distractorCount: 5, options: [4, 5, 8] },
      { id: 4, targetCount: 7, distractorCount: 3, options: [6, 7, 10] },
    ],
  },
  {
    level: 6,
    stage: LEVEL_STAGES.FOCUS,
    title: 'Apple vs Bomb Filtering',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    type: 'DISTRACTOR_CHALLENGE',
    instruction: 'Count ONLY the 🍎 APPLES! (Do not count the 💣 bombs!)',
    targetEmoji: '🍎',
    distractorEmoji: '💣',
    hint: 'Lock your eyes on the red color and ignore the black bombs completely.',
    problems: [
      { id: 1, targetCount: 5, distractorCount: 4, options: [4, 5, 9] },
      { id: 2, targetCount: 7, distractorCount: 5, options: [6, 7, 12] },
      { id: 3, targetCount: 8, distractorCount: 4, options: [7, 8, 11] },
      { id: 4, targetCount: 6, distractorCount: 6, options: [5, 6, 12] },
    ],
  },
  {
    level: 7,
    stage: LEVEL_STAGES.FOCUS,
    title: 'Multi-Distractor Gem Finder',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    type: 'DISTRACTOR_CHALLENGE',
    instruction: 'Count ONLY the 💎 GEMS! (Ignore 🌲 trees and 🪵 logs!)',
    targetEmoji: '💎',
    distractorEmoji: '🌲',
    hint: 'Focus on the sparkling blue gems.',
    problems: [
      { id: 1, targetCount: 6, distractorCount: 7, options: [5, 6, 13] },
      { id: 2, targetCount: 8, distractorCount: 6, options: [7, 8, 14] },
      { id: 3, targetCount: 9, distractorCount: 5, options: [8, 9, 14] },
      { id: 4, targetCount: 7, distractorCount: 8, options: [6, 7, 15] },
    ],
  },

  // 🔵 Stage 4: Number Matcher (Symbolic Mapping)
  {
    level: 8,
    stage: LEVEL_STAGES.MATCHER,
    title: 'Cluster to Numeral Match',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    type: 'NUMBER_MATCHER',
    instruction: 'Count the dots and choose the matching NUMBER numeral:',
    hint: 'Group the dots into 5 + extra or small pairs of 2.',
    mode: 'DOTS_TO_NUM',
    problems: [
      { id: 1, dotCount: 5, options: [4, 5, 6] },
      { id: 2, dotCount: 7, options: [6, 7, 8] },
      { id: 3, dotCount: 9, options: [8, 9, 10] },
      { id: 4, dotCount: 4, options: [3, 4, 5] },
    ],
  },
  {
    level: 9,
    stage: LEVEL_STAGES.MATCHER,
    title: 'Numeral to Cluster Match',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    type: 'NUMBER_MATCHER',
    instruction: 'Tap the dot card that represents the number shown above:',
    hint: 'Check each card and see which one has the exact count.',
    mode: 'NUM_TO_DOTS',
    problems: [
      { id: 1, targetNum: 6, options: [5, 6, 8] },
      { id: 2, targetNum: 8, options: [7, 8, 9] },
      { id: 3, targetNum: 4, options: [3, 4, 6] },
      { id: 4, targetNum: 7, options: [6, 7, 9] },
    ],
  },

  // 🟣 Stage 5: Spatial Number Line
  {
    level: 10,
    stage: LEVEL_STAGES.SPATIAL,
    title: 'Spatial Number Placement',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    type: 'SPATIAL_NUMBER_LINE',
    instruction: 'Slide the marker to where the TARGET NUMBER belongs on the line:',
    hint: 'Use 0, 5 (middle), and 10 (end) as visual benchmark anchors.',
    maxLine: 10,
    problems: [
      { id: 1, target: 6, min: 0, max: 10 },
      { id: 2, target: 3, min: 0, max: 10 },
      { id: 3, target: 8, min: 0, max: 10 },
      { id: 4, target: 4, min: 0, max: 10 },
    ],
  },

  // 🟠 Stage 6: Math Builder (Concrete to Symbolic Arithmetic)
  {
    level: 11,
    stage: LEVEL_STAGES.BUILDER,
    title: 'Visual Addition Builder',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    type: 'MATH_BUILDER',
    operator: '+',
    instruction: 'Combine the two visual dot groups to solve the equation:',
    hint: 'Start with the first group count, then count on with the second group.',
    problems: [
      { id: 1, num1: 5, num2: 3, result: 8 },
      { id: 2, num1: 4, num2: 4, result: 8 },
      { id: 3, num1: 6, num2: 3, result: 9 },
      { id: 4, num1: 7, num2: 2, result: 9 },
    ],
  },
  {
    level: 12,
    stage: LEVEL_STAGES.BUILDER,
    title: 'Visual Subtraction Builder',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    type: 'MATH_BUILDER',
    operator: '-',
    instruction: 'Take away the crossed-out dots to find the remaining answer:',
    hint: 'Count how many glowing dots are left after crossing out the subtracted ones.',
    problems: [
      { id: 1, num1: 7, num2: 3, result: 4 },
      { id: 2, num1: 9, num2: 4, result: 5 },
      { id: 3, num1: 8, num2: 5, result: 3 },
      { id: 4, num1: 6, num2: 2, result: 4 },
    ],
  },
];
