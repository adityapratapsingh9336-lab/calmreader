/**
 * Stroke Templates & Vector Guides for Writing & Tracing
 * Defines SVG paths, stroke order waypoints, and directional instructions for Letters, Numbers & Shapes.
 */

export const WRITING_CATEGORIES = {
  MIRROR_LETTERS: 'MIRROR_LETTERS',
  LOWERCASE: 'LOWERCASE',
  UPPERCASE: 'UPPERCASE',
  NUMBERS: 'NUMBERS',
  SHAPES: 'SHAPES',
};

export const STROKE_TEMPLATES = [
  // 🪞 Mirror Letters (Crucial Dyslexia / Dysgraphia Interventions)
  {
    id: 'mirror-b',
    char: 'b',
    category: WRITING_CATEGORIES.MIRROR_LETTERS,
    name: 'Lowercase b',
    phonics: 'b as in Bat & Ball',
    mnemonic: 'Bat first, then ball! Start at the headline, line straight down, bounce up and curve around to the right.',
    guideHint: 'Bat (line) ➔ Ball (circle on the right ➡️)',
    strokes: [
      { id: 1, label: '1. Line Down', start: { x: 100, y: 50 }, end: { x: 100, y: 250 }, pathD: 'M 100 50 L 100 250', direction: 'down' },
      { id: 2, label: '2. Circle Right', start: { x: 100, y: 150 }, end: { x: 100, y: 250 }, pathD: 'M 100 150 C 160 150, 160 250, 100 250', direction: 'curve-right' },
    ],
  },
  {
    id: 'mirror-d',
    char: 'd',
    category: WRITING_CATEGORIES.MIRROR_LETTERS,
    name: 'Lowercase d',
    phonics: 'd as in Donut & Door',
    mnemonic: 'Donut first, then door! Make a round donut curve to the left, then go up high and pull straight down.',
    guideHint: 'Donut (circle on the left ⬅️) ➔ Door (tall stick)',
    strokes: [
      { id: 1, label: '1. Curve Left', start: { x: 200, y: 150 }, end: { x: 200, y: 250 }, pathD: 'M 200 150 C 140 150, 140 250, 200 250', direction: 'curve-left' },
      { id: 2, label: '2. Tall Line Down', start: { x: 200, y: 50 }, end: { x: 200, y: 250 }, pathD: 'M 200 50 L 200 250', direction: 'down' },
    ],
  },
  {
    id: 'mirror-p',
    char: 'p',
    category: WRITING_CATEGORIES.MIRROR_LETTERS,
    name: 'Lowercase p',
    phonics: 'p as in Pop',
    mnemonic: 'Start at the midline, dive down below the baseline into the water. Bounce up and curve around right.',
    guideHint: 'Tail down ⬇️, bubble right ➡️',
    strokes: [
      { id: 1, label: '1. Drop Down', start: { x: 100, y: 120 }, end: { x: 100, y: 280 }, pathD: 'M 100 120 L 100 280', direction: 'down' },
      { id: 2, label: '2. Loop Right', start: { x: 100, y: 120 }, end: { x: 100, y: 200 }, pathD: 'M 100 120 C 160 120, 160 200, 100 200', direction: 'curve-right' },
    ],
  },
  {
    id: 'mirror-q',
    char: 'q',
    category: WRITING_CATEGORIES.MIRROR_LETTERS,
    name: 'Lowercase q',
    phonics: 'q as in Queen',
    mnemonic: 'Round circle to the left, dive straight down below the line, and add a little hook back up.',
    guideHint: 'Circle left ⬅️, drop down and hook 🪝',
    strokes: [
      { id: 1, label: '1. Circle Left', start: { x: 200, y: 120 }, end: { x: 200, y: 200 }, pathD: 'M 200 120 C 140 120, 140 200, 200 200', direction: 'curve-left' },
      { id: 2, label: '2. Drop & Hook', start: { x: 200, y: 120 }, end: { x: 230, y: 260 }, pathD: 'M 200 120 L 200 280 Q 200 280 230 260', direction: 'down' },
    ],
  },

  // 🔤 Uppercase Letters
  {
    id: 'letter-A',
    char: 'A',
    category: WRITING_CATEGORIES.UPPERCASE,
    name: 'Uppercase A',
    phonics: 'A as in Apple',
    mnemonic: 'Slide down left, slide down right, tie a belt across the middle!',
    strokes: [
      { id: 1, label: '1. Slant Left', start: { x: 150, y: 50 }, end: { x: 80, y: 250 }, pathD: 'M 150 50 L 80 250', direction: 'down-left' },
      { id: 2, label: '2. Slant Right', start: { x: 150, y: 50 }, end: { x: 220, y: 250 }, pathD: 'M 150 50 L 220 250', direction: 'down-right' },
      { id: 3, label: '3. Cross Bar', start: { x: 105, y: 170 }, end: { x: 195, y: 170 }, pathD: 'M 105 170 L 195 170', direction: 'right' },
    ],
  },
  {
    id: 'letter-B',
    char: 'B',
    category: WRITING_CATEGORIES.UPPERCASE,
    name: 'Uppercase B',
    phonics: 'B as in Bear',
    mnemonic: 'Big line down. Go to the top, curve to the middle, curve to the bottom!',
    strokes: [
      { id: 1, label: '1. Line Down', start: { x: 90, y: 50 }, end: { x: 90, y: 250 }, pathD: 'M 90 50 L 90 250', direction: 'down' },
      { id: 2, label: '2. Top Curve', start: { x: 90, y: 50 }, end: { x: 90, y: 150 }, pathD: 'M 90 50 C 180 50, 180 150, 90 150', direction: 'curve-right' },
      { id: 3, label: '3. Bottom Curve', start: { x: 90, y: 150 }, end: { x: 90, y: 250 }, pathD: 'M 90 150 C 190 150, 190 250, 90 250', direction: 'curve-right' },
    ],
  },
  {
    id: 'letter-C',
    char: 'C',
    category: WRITING_CATEGORIES.UPPERCASE,
    name: 'Uppercase C',
    phonics: 'C as in Cat',
    mnemonic: 'Start just below the top line, curve up, left, around, and stop at the bottom!',
    strokes: [
      { id: 1, label: '1. Big Curve', start: { x: 200, y: 90 }, end: { x: 200, y: 210 }, pathD: 'M 200 90 C 80 50, 80 250, 200 210', direction: 'curve-left' },
    ],
  },
  {
    id: 'letter-S',
    char: 'S',
    category: WRITING_CATEGORIES.UPPERCASE,
    name: 'Uppercase S',
    phonics: 'S as in Snake',
    mnemonic: 'Start at the top, curve left, snake down around to the right, then curl back left!',
    strokes: [
      { id: 1, label: '1. S Curve', start: { x: 190, y: 90 }, end: { x: 100, y: 210 }, pathD: 'M 190 90 C 120 40, 100 130, 150 150 C 200 170, 180 260, 100 210', direction: 'snake' },
    ],
  },

  // 🔢 Numbers (0–9)
  {
    id: 'num-3',
    char: '3',
    category: WRITING_CATEGORIES.NUMBERS,
    name: 'Number 3',
    phonics: '3 as in Three',
    mnemonic: 'Around a tree, around a tree, that makes the number 3!',
    strokes: [
      { id: 1, label: '1. Top Loop', start: { x: 100, y: 80 }, end: { x: 150, y: 150 }, pathD: 'M 100 80 C 180 60, 180 140, 150 150', direction: 'curve-right' },
      { id: 2, label: '2. Bottom Loop', start: { x: 150, y: 150 }, end: { x: 90, y: 220 }, pathD: 'M 150 150 C 200 160, 180 240, 90 220', direction: 'curve-right' },
    ],
  },
  {
    id: 'num-5',
    char: '5',
    category: WRITING_CATEGORIES.NUMBERS,
    name: 'Number 5',
    phonics: '5 as in Five',
    mnemonic: 'Line down, big fat tummy, put a hat on top!',
    strokes: [
      { id: 1, label: '1. Stem Down', start: { x: 110, y: 70 }, end: { x: 110, y: 140 }, pathD: 'M 110 70 L 110 140', direction: 'down' },
      { id: 2, label: '2. Fat Belly', start: { x: 110, y: 140 }, end: { x: 100, y: 230 }, pathD: 'M 110 140 C 190 130, 190 230, 100 230', direction: 'curve-right' },
      { id: 3, label: '3. Top Hat', start: { x: 110, y: 70 }, end: { x: 190, y: 70 }, pathD: 'M 110 70 L 190 70', direction: 'right' },
    ],
  },
  {
    id: 'num-8',
    char: '8',
    category: WRITING_CATEGORIES.NUMBERS,
    name: 'Number 8',
    phonics: '8 as in Eight',
    mnemonic: 'Make an S and do not wait, climb back up to make an 8!',
    strokes: [
      { id: 1, label: '1. Figure 8 Loop', start: { x: 150, y: 60 }, end: { x: 150, y: 60 }, pathD: 'M 150 60 C 100 60, 100 140, 150 150 C 200 160, 200 240, 150 240 C 100 240, 100 160, 150 150 C 200 140, 200 60, 150 60', direction: 'figure8' },
    ],
  },

  // 🔷 Spatial Shapes
  {
    id: 'shape-star',
    char: '⭐',
    category: WRITING_CATEGORIES.SHAPES,
    name: 'Star Shape',
    phonics: 'Star',
    mnemonic: 'Up, down, cross over left, straight across right, and back to start!',
    strokes: [
      { id: 1, label: '1. Star Path', start: { x: 150, y: 50 }, end: { x: 150, y: 50 }, pathD: 'M 150 50 L 180 140 L 270 140 L 200 190 L 230 280 L 150 220 L 70 280 L 100 190 L 30 140 L 120 140 Z', direction: 'star' },
    ],
  },
  {
    id: 'shape-spiral',
    char: '🌀',
    category: WRITING_CATEGORIES.SHAPES,
    name: 'Motor Spiral',
    phonics: 'Spiral',
    mnemonic: 'Start in the center, swirl outward smoothly to build finger dexterity!',
    strokes: [
      { id: 1, label: '1. Spiral Swirl', start: { x: 150, y: 150 }, end: { x: 240, y: 150 }, pathD: 'M 150 150 C 160 140, 160 160, 150 170 C 130 180, 120 140, 140 120 C 180 100, 200 180, 160 210 C 100 240, 70 140, 130 80 C 210 40, 250 170, 240 150', direction: 'spiral' },
    ],
  },
];
