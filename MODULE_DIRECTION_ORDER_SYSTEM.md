# Direction & Order Support System — Master Specification & Guide

---

## 📌 Executive Summary

The **Direction & Order Support System** is an advanced cognitive assistance module for **LexiSight AI**. It directly addresses three primary challenges in visual-spatial dyslexia:
1. **Left-Right Orientation Confusion**: Spatial ambiguity when interpreting directional words (`left`, `right`, `east`, `west`) and scanning lines.
2. **Instructional Sequence Disruption**: Struggle with multi-step procedural texts (recipes, lab steps, operating manuals).
3. **Order & Saccadic Memory Deficit**: Inability to retain correct sequence order when reading paragraphs.

---

## 🎨 1. Core Module Design & Solution Approach

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIRECTION & ORDER SUPPORT MODULE DESIGN                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. Color-Coded Directions    --> Left = Cool Blue (🔵) | Right = Warm Red (🔴)│
│ 2. Step-by-Step Focus View   --> Single-card procedural step wizard        │
│ 3. Arrow Flow Guidance       --> Visual vector arrows (⬅ ➔ ⬆ ⬇)           │
│ 4. Sequence Training Exercises--> Interactive drag & reorder practice modal │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Problem vs. Solution Matrix

| User Challenge | Conventional Reading Display | LexiSight Direction & Order Module |
| :--- | :--- | :--- |
| **Left-Right Word Confusion** | Plain unhighlighted text (`turn left`, `move right`). | **Color-Coded Badges**: `LEFT` highlighted in **Cool Blue** (`#3b82f6` 🔵), `RIGHT` highlighted in **Warm Red** (`#ef4444` 🔴). |
| **Instruction Overload** | Dense block of 10 numbered text steps. | **Step-by-Step Wizard View**: Displays 1 step at a time in large visual focus cards with Next/Prev arrow navigation. |
| **Lost Reading Direction** | Eye strays across the page without spatial guidance. | **Arrow Flow Guidance**: Visual vector arrows (`➔`, `⬅`) indicating scan momentum. |
| **Sequence Order Loss** | No method to practice narrative ordering. | **Sequence Training Modal**: Interactive reorder game where users arrange jumbled sentences into correct order. |

---

## 🚀 2. Feature Specifications

### Feature A: Color-Coded Directional Disambiguation
- **Left Direction Indicator**: Color-coded in **Cool Blue** (`#3b82f6`) with a left arrow icon (`🔵 ⬅`). Applied to words like `left`, `west`, `counter-clockwise`.
- **Right Direction Indicator**: Color-coded in **Warm Red** (`#ef4444`) with a right arrow icon (`🔴 ➔`). Applied to words like `right`, `east`, `clockwise`.

### Feature B: Step-by-Step Instruction View (`StepByStepView.jsx`)
- Transforms dense multi-sentence instructions into an interactive single-card wizard.
- Large step counter (`Step 1 of 5`), progress bar, big font size, and Left/Right directional accents.

### Feature C: Interactive Sequence Reorder Training (`SequenceTrainingModal.jsx`)
- Extracts sentences from the text passage and jumbles them.
- Users click **"Move Up" / "Move Down"** or drag items into correct numerical sequence.
- Provides immediate visual feedback (Green = Correct position, Red = Incorrect) and score calculation.

---

## 🔄 3. Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LEXISIGHT INTEGRATED ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ Input: OCR Scan / PDF / Manual Text ]                                   │
│                           │                                                 │
│                           ▼                                                 │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                ADAPTIVE VISUAL COGNITION ENGINE                       │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ • b/d/p/q Directional Anchors                                         │  │
│  │ • Color-Coded Left (Blue) / Right (Red) Badges                       │  │
│  │ • Step-by-Step Instruction Wizard                                     │  │
│  │ • Optical Focus Spotlight & Line Guides                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                           │                                                 │
│        ┌──────────────────┼──────────────────┐                              │
│        ▼                  ▼                  ▼                              │
│  [ Speech Synced TTS ]  [ AI Word Explain ]  [ Sequence Reorder Trainer ]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Connection with Reader System**: Words containing `left` or `right` are automatically parsed and wrapped in colored directional badge containers.
- **Connection with Practice Module**: The Sequence Training Modal acts as a specialized visual ordering quiz alongside the standard AI MCQ generator.
- **Connection with AI Adaptation Engine**: If telemetry detects sequence hesitation ($T_{sentence} > 4.5\text{s}$ or repeated replays), the AI auto-suggests switching to **Step-by-Step Mode**.

---

## 🤖 4. Autonomous Adaptation Logic

```javascript
// Adaptation Rule Trigger for Direction & Order Module
if (
  metrics.avgSentenceFixationMs > 4500 || 
  metrics.replaysCount >= 2 || 
  textIsInstructional(text)
) {
  return {
    shouldAdapt: true,
    profileType: 'SEQUENCE_CONFUSION',
    newSettings: {
      ...currentSettings,
      directionColorCoding: true, // Enable Blue/Red Left/Right badges
      sequenceSupport: true,      // Enable left margin anchors
      lineSpotlight: true,
    },
    reason: "🤖 AI Auto-Adapted: Directional & Sequence strain detected! Enabled Left (Blue) / Right (Red) indicators & Step Mode option."
  };
}
```

---

## 📋 5. Hackathon MVP Scope & 1-2 Day Build Plan

| Component / Feature | Scope | Status |
| :--- | :--- | :--- |
| **Color-Coded Left (Blue) / Right (Red) Badges** | Parses text for `left` / `right` keywords and wraps in CSS badge spans | ✅ Complete |
| **Step-by-Step Instruction View** | Modal wizard breaking text into single step cards with progress bar | ✅ Complete |
| **Interactive Sequence Training Modal** | Reorder jumbled sentences with score validation | ✅ Complete |
| **Toolbar Integration** | `[ 🧩 Step Mode ]` and `[ 🎯 Reorder ]` triggers in `Controls.jsx` | ✅ Complete |
| **AI Auto-Trigger Rule** | Evaluates telemetry to suggest Step Mode | ✅ Complete |

---

## 🎬 6. 3-Minute Hackathon Presentation Script (Direction & Order Feature)

```
[ STEP 1: SHOW DIRECTIONAL CONFUSION ]
"Judges, when a dyslexic child reads instructions like 'Turn left at the red door, 
then move right', left-right confusion causes visual hesitation."

[ STEP 2: SHOW COLOR-CODED DIRECTION BADGES ]
"Clicking 'Direction Cues' instantly highlights 'LEFT' in Cool Blue (🔵) 
and 'RIGHT' in Warm Red (🔴). The brain instantly recognizes direction 
without mental decoding!"

[ STEP 3: DEMO STEP-BY-STEP MODE ]
"Click '🧩 Step Mode'. Dense text transforms into a clean, single-card 
instruction wizard! The student focuses on 1 step at a time."

[ STEP 4: DEMO SEQUENCE REORDER TRAINER ]
"Click '🎯 Reorder Practice'. Students practice arranging jumbled steps into 
correct numerical sequence, building visual spatial memory!"
```
