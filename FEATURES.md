# Feature Specifications — LexiSight AI

---

## 🌟 Feature Overview

LexiSight AI delivers 5 flagship feature modules engineered specifically to target the visual cognition deficits of Dyseidetic Dyslexia.

---

## 🎯 1. Directional Glyph Correction Engine

### Goal
Eliminate mental letter reversals and mirror confusion between visually symmetrical letters ($b$, $d$, $p$, $q$, $m$, $w$, $n$, $u$).

### Functionality
- **Micro-Anchor Cues**: Applies distinct visual indicators to mirrored letter pairs.
  - **`b` Anchoring**: Left-side ascender stem highlight with a subtle directional arrow cue pointing right.
  - **`d` Anchoring**: Right-side ascender stem highlight with a distinct cool-blue accent color.
  - **`p` Anchoring**: Lower-left descent tail highlight.
  - **`q` Anchoring**: Lower-right descent tail hook glow.
- **Customizable Color Schemes**: High-contrast, neuro-accessible palette selection (e.g., Warm Amber for `b`, Deep Teal for `d`).
- **Dynamic Anchor Intensity**: Adjustable visual cue visibility from 100% (strong visual anchors for early learners) to 20% (subtle micro-cues for advanced readers).

---

## 👁️ 2. Visual Stabilization & Optical Tracking Guide

### Goal
Prevent line jumping, horizontal eye regression, and saccadic instability.

### Functionality
- **Optical Focus Spotlight**: Highlights the current line being read while dimming upper and lower adjacent text lines by 60–80%.
- **Active Guide Ruler**: Floating customizable reading line with zero-friction mouse tracking or automatic smooth scrolling.
- **Anti-Saccadic Margin Anchors**: Vertical visual boundary markers on the left and right margins that give the eye a clear visual landing zone when transitioning to a new line.

---

## 🧩 3. Pattern Recognition & Gestalt Chunking Mode

### Goal
Accelerate visual word form memory formation by presenting words as structured visual gestalts rather than isolated letter strings.

### Functionality
- **Syllabic Color Masking**: Automatically breaks words into natural visual syllables using alternating subtle background highlights or font weight shifts (e.g., **con**-*struc*-**tion**).
- **Morphological Root Highlighting**: Visual color accents on prefixes, root words, and suffixes to aid instant visual pattern recognition.
- **Sight Word Memory Anchoring**: Highlights high-frequency visual sight words with subtle background padding, training the brain to recognize the word as a unified shape.

---

## 📐 4. Spatial Reading Mode & Layout Reflow

### Goal
Eliminate visual overcrowding noise and reduce visual fatigue caused by dense text walls.

### Functionality
- **Dynamic Kerning & Letter Pitch**: Expands inter-character spacing up to 1.5x standard width without distorting font proportions.
- **Expanded Line Density Shift**: Adjustable line-height slider ($1.8\times$ to $2.6\times$), allowing visual breathing room between text lines.
- **Constrained Column Geometry**: Restricts text block width to an optimal 55-character visual column, preventing excessive horizontal eye travel.
- **Anti-Crowding Contrast Control**: Customized background tinting (e.g., Cream/Sepia, Dark Charcoal, Muted Blue) to mitigate visual stress and Irlen syndrome light sensitivity.

---

## 🤖 5. AI Cognition Assistant & Visual Explainer

### Goal
Provide cognitive fallback support when visual word recognition fails or semantic complexity overwhelms the reader.

### Functionality
- **Instant Visual Word Breakdown**: Clicking any difficult word generates a visual decomposition card showing root structure, syllable breakdown, and an inline visual icon/pictogram.
- **Simplified Semantic Rewriter**: Rewrites complex, multi-clause sentences into simple visual structure sentences without loss of meaning.
- **Contextual Visual Dictionary**: Generates real-time AI visual diagrams and concept cards for abstract vocabulary.

---

## 📋 Feature Summary & Matrix

| Feature | Primary Deficit Addressed | Core Technology |
| :--- | :--- | :--- |
| **Directional Glyph Correction** | Letter reversal ($b/d/p/q$) | CSS Micro-Anchors & Regex DOM Tokenizer |
| **Visual Stabilization Guide** | Line jumping & saccadic drift | HTML5 Canvas Overlay & Pointer Lock API |
| **Gestalt Pattern Recognition** | Poor visual word form memory | Morphological Syllable Parser & SVG Gradient Masking |
| **Spatial Reading Mode** | Visual crowding & overcrowding noise | CSS Variable Geometry Reflow Engine |
| **AI Cognition Assistant** | Semantic overload & vocabulary blocks | Quantized LLM API & Image Concept Generator |
