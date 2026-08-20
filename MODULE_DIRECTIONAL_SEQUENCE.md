# Directional & Sequence Support Module — LexiSight AI

---

## 📌 Executive Overview

The **Directional & Sequence Support Module** is a core cognitive feature addition designed specifically for readers who experience:
- **Left-Right Orientation Confusion**: Inability to quickly locate the start of a line or maintain horizontal left-to-right eye movement momentum.
- **Sequence & Ordinal Processing Deficits**: Difficulty tracking sentence ordering within paragraphs, leading to skipped lines, backward eye jumps (regressions), and scrambled comprehension.

This module seamlessly overlays onto LexiSight AI's existing **OCR Ingestion, Speech-Synced TTS, AI Explain, Practice MCQ Generator, and Autonomous UI Adaptation Engine**.

---

## 🎯 1. Feature Specifications & Cognitive Rationale

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    DIRECTIONAL & SEQUENCE SUPPORT MODULE                   │
├────────────────────────────────────────────────────────────────────────────┤
│ 1. Left Margin "Go" Anchor (🟢)   --> Visual landing dot at start of line  │
│ 2. Left-to-Right Scan Vectors (➔) --> Inter-word direction cues             │
│ 3. Ordinal Sentence Numbering [1] --> Numbered sentence sequence badges    │
│ 4. Progressive Order Gradient     --> Visual flow color shift across line  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Feature 1: Left Margin "Start/Go" Anchor (`🟢`)
- **Cognitive Purpose**: When a dyslexic reader reaches the end of a line, returning horizontally to locate the start of the *next* line is a major saccadic failure point.
- **Mechanism**: Renders a bright green glowing landing dot (`🟢`) on the far-left margin of the active reading line, providing an instant visual target for the eye.

### Feature 2: Left-to-Right Scanning Vector Arrows (`➔`)
- **Cognitive Purpose**: Prevents right-to-left visual regression (backward eye jumps).
- **Mechanism**: Injects subtle, low-contrast directional micro-arrows (`➔`) between words, reinforcing positive left-to-right visual momentum.

### Feature 3: Ordinal Sentence Sequence Badges (`[1]`, `[2]`, `[3]`)
- **Cognitive Purpose**: Helps readers track structural paragraph flow without losing context.
- **Mechanism**: Prepends high-contrast numerical ordinal badges (`[1]`, `[2]`) to sentence beginnings, anchoring narrative order.

### Feature 4: Progressive Sequence Color Gradient
- **Cognitive Purpose**: Uses color hue progression to indicate text reading direction.
- **Mechanism**: Shifts text color subtly from **Emerald Green** (Start of line) $\rightarrow$ **Sky Blue** (Middle) $\rightarrow$ **Soft Indigo** (End of line).

---

## 🔄 2. Connection with Existing Reader System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LEXISIGHT INTEGRATED ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Input: OCR Scan / PDF / Web DOM / Manual Text ]                          │
│                           │                                                 │
│                           ▼                                                 │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                ADAPTIVE VISUAL COGNITION RENDERER                     │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ • b/d/p/q Directional Anchors (Pillar 1)                              │  │
│  │ • Dynamic Kerning & Line Spacing (Pillar 2)                           │  │
│  │ • NEW: Left-Margin "Go" Anchors + Ordinal Badges (Pillar 3)           │  │
│  │ • Optical Focus Spotlight (Pillar 4)                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                           │                                                 │
│        ┌──────────────────┼──────────────────┐                              │
│        ▼                  ▼                  ▼                              │
│  [ Speech Synced TTS ]  [ AI Word Explain ]  [ AI Practice MCQ Quiz ]       │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Integration with OCR**: Text extracted by Tesseract.js WASM is tokenized into sentence arrays and instantly annotated with ordinal sequence markers.
- **Integration with TTS Sync**: As audio plays via Web Speech API, the left-margin green "Go" dot shifts down line-by-line automatically in sync with the spoken utterance.
- **Integration with AI Explain**: Clicking any word within a numbered sequence line preserves sentence index metadata when requesting AI word explanations.
- **Integration with Practice Generator**: The AI MCQ generator uses sentence sequence numbers to generate targeted ordering questions (e.g., *"What happens in Sentence [2]?"*).

---

## 🤖 3. Autonomous AI Trigger Logic

The **AI Adaptation Engine** (`adaptationEngine.js`) monitors telemetry and automatically activates Directional & Sequence Support based on the following rule criteria:

```javascript
// Telemetry Trigger Rule for Sequence Support
if (
  metrics.avgSentenceFixationMs > 4500 || // Reader stuck on sentence for > 4.5s
  metrics.replaysCount >= 2             || // User re-playing audio due to lost position
  metrics.explainClicksCount >= 3          // High hesitation frequency
) {
  // Trigger Autonomous Adaptation
  return {
    shouldAdapt: true,
    profileType: 'SEQUENCE_CONFUSION',
    newSettings: {
      ...currentSettings,
      sequenceSupport: true,        // Enable Sequence Badges & Margin Anchors
      directionalAnchors: true,     // Enable b/d/p/q micro-anchors
      lineSpotlight: true,          // Lock Focus Spotlight
      letterSpacing: Math.max(3, currentSettings.letterSpacing)
    },
    reason: "🤖 AI Auto-Adapted: Sequence & Directional hesitation detected! Enabled Left-Margin Anchors & Sequence Badges."
  };
}
```

---

## 🎬 4. Hackathon Demo Story Addition (For SIH Judges)

```
[ DEMO HIGHLIGHT: DIRECTIONAL & SEQUENCE MODULE ]

1. "Judges, watch what happens when a reader loses left-to-right orientation."
2. Toggle ON "Direction & Sequence Cues" in top toolbar.
3. Show:
   - Green glowing landing dot (🟢) appears on left margin.
   - Sentence badges [1], [2], [3] anchor paragraph order.
   - Micro-arrows (➔) guide eyes left-to-right between words.
4. Point out: "Now, the reader's eye never skips lines or drifts backward. 
   Sequence support gives total visual control!"
```
