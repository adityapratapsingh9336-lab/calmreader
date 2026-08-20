# Phase 2 — Implementation Guide & Master Codebase Document

---

## 📌 Executive Summary

This document serves as the **complete technical blueprint and master code specification** for **Phase 2: UI + Core Features** of **LexiSight AI (Visual-Spatial Adaptive Reading System)**.

Phase 2 transitions the project from design concepts to a **fully working, high-impact MVP**. It provides the complete codebase architecture for a **React 18 Frontend SPA** and a **Node.js Express Backend API**, along with client-side OCR, speech-synced TTS, directional letter disambiguation ($b/d/p/q$), and AI-powered word explanation and practice quiz generation.

---

## 🎨 1. UI Design & Screen Architecture

The UI is built around a **neuro-accessible design system** prioritizing visual clarity, high contrast, zero cognitive clutter, and instant customization.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             APP HEADER & TOOLBAR                            │
│  [ Logo: LexiSight AI ]               [ Upload New ] [ Settings ] [ Practice ]│
├─────────────────────────────────────────────────────────────────────────────┤
│  CONTROLS BAR                                                               │
│  [ ▶ Play TTS ] [ ⏹ Stop ] | Font Size: [- 20px +] | Spacing: [ ▇▇▇-- ]     │
│  [ ☑ Directional b/d/p/q Anchors ] [ ☑ Line Focus Spotlight ]                │
├─────────────────────────────────────────────────────────────────────────────┤
│  MAIN READER CANVAS (Spotlight Active)                                      │
│                                                                             │
│  The <b><span class="anchor-b">b</span></b>oy walked <b><span class="anchor-d">d</span></b>own the path to <b><span class="anchor-p">p</span></b>ick a <b><span class="anchor-q">q</span></b>uiet spot.   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ ACTIVE FOCUS LINE (100% Opacity Spotlight)                            │  │
│  │ He noticed that the letters stopped flipping when anchors were on.    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  [Dimmed background line...]                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Screen Breakdown

#### Screen 1: Home / Upload Screen (`Upload.jsx`)
- **Layout**: Clean central dropzone card with subtle animated dashed border.
- **Functionality**: Accepts PNG, JPG, WEBP, or PDF files. Features an instant "Load Sample Passages" button for judges to demo without uploading files.
- **Behavior**: Shows a live progress bar during `Tesseract.js` WASM OCR extraction.

#### Screen 2: Main Reader View (`Reader.jsx` + `Controls.jsx`)
- **Layout**: Sticky top controls bar + full-width adaptive text container with adjustable margins and maximum line-length constraints ($55\text{ characters max}$).
- **Behavior**:
  - Hovering over lines activates the **Optical Focus Spotlight**, dimming non-active text by 70%.
  - Clicking any word opens the **AI Explain Modal**.
  - Directional toggle instantly injects micro-anchor cues on $b, d, p, q$.

#### Screen 3: AI Explain Modal (`ExplainModal.jsx`)
- **Layout**: Glassmorphism popover card centered over the screen.
- **Content**: Displays selected word, syllable breakdown (e.g., `con·struc·tion`), simple plain-language definition, visual concept tags, and an example sentence.

#### Screen 4: AI Practice MCQ Generator Modal (`PracticeModal.jsx`)
- **Layout**: Interactive quiz card showing 5 AI-generated multiple-choice questions derived from the reading passage.
- **Behavior**: Instant score feedback, correct option highlight, and visual reinforcement.

#### Screen 5: Visual Profile Settings Panel (`SettingsPanel.jsx`)
- **Layout**: Slide-over drawer on the right edge of the screen.
- **Content**: Color palette selectors (Sepia, Dark Charcoal, Muted Blue), font selector (OpenDyslexic, Lexend, Inter), kerning intensity slider, and $b/d/p/q$ anchor color pickers.

---

## 📁 2. System Directory Structure

```
SIH/
├── client/                     # React Frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Upload.jsx
│       │   ├── Reader.jsx
│       │   ├── Controls.jsx
│       │   ├── SettingsPanel.jsx
│       │   ├── ExplainModal.jsx
│       │   └── PracticeModal.jsx
│       └── utils/
│           ├── ocr.js
│           ├── directional.jsx
│           └── tts.js
│
└── server/                     # Node.js Express Backend
    ├── package.json
    ├── .env.example
    └── src/
        ├── server.js
        ├── routes/
        │   ├── explain.js
        │   └── practice.js
        └── services/
            └── aiService.js
```

---

## ⚡ 3. Core Features Technical Specification

### A. OCR Integration (`ocr.js`)
- Client-side extraction via `tesseract.js` running in a Web Worker.
- Zero server upload needed, preserving user document privacy and eliminating backend latency.

### B. Directional Letter Disambiguation (`directional.jsx`)
- Replaces target mirror letters ($b, d, p, q$) with styled React elements wrapping the character with unique SVG micro-anchors and high-contrast color indicators.
- **Anchors**:
  - `b`: Left ascender dot indicator ($\color{#f59e0b}{\bullet\text{b}}$).
  - `d`: Right ascender dot indicator ($\color{#06b6d4}{\text{d}\bullet}$).
  - `p`: Downward left tail accent ($\color{#ec4899}{\bullet\text{p}}$).
  - `q`: Downward right tail accent ($\color{#10b981}{\text{q}\bullet}$).

### C. Synced Text-to-Speech (`tts.js`)
- Leverages native `window.speechSynthesis`.
- Subscribes to `utterance.onboundary` events to emit the currently spoken word index, updating `activeWordIndex` in React state for live visual highlighting.

### D. AI Explain & Practice Endpoints (`server/src/routes/`)
- Integrates Google Gemini API (`@google/genai` or direct REST API) with intelligent fallback JSON mock generators for offline hackathon presentations.

---

## 📋 4. MVP Feature Checklist

| Feature | Category | MVP Status | Priority |
| :--- | :--- | :--- | :--- |
| **Image & PDF OCR Drag/Drop** | Frontend Utilities | ✅ Included | Must-Have |
| **Directional $b/d/p/q$ Micro-Anchors** | Core Visual Engine | ✅ Included | Must-Have |
| **Dynamic Spacing (Kerning/Line-Height)** | Core Visual Engine | ✅ Included | Must-Have |
| **Optical Line Spotlight Guide** | Visual Stabilization | ✅ Included | Must-Have |
| **Speech-Synced Word Highlighting** | TTS Engine | ✅ Included | Must-Have |
| **AI Single-Click Word Breakdown** | AI Integration | ✅ Included | Must-Have |
| **AI 5-Question MCQ Quiz Generator** | AI Integration | ✅ Included | Must-Have |
| **Custom Palette & Font Controls** | User Customization | ✅ Included | Must-Have |
| **Offline Fallback Engine** | Reliability | ✅ Included | Must-Have |

---

## 🗓️ 5. 5-Day Development & Task Timeline

```
Day 1: Project Setup & Baseline Component Structure
├── Initialize React Vite client & Node.js Express server.
├── Build global index.css design system & typography tokens.
└── Task Lead: Frontend Engineer

Day 2: Core Visual Adaptation Engine
├── Implement directional.jsx regex tokenizer & SVG micro-anchor styling.
├── Build Reader.jsx canvas container with line spotlighting.
└── Task Lead: Core UI Engineer

Day 3: OCR & TTS Integration
├── Integrate Tesseract.js WASM worker in Upload.jsx.
├── Implement Web Speech API speech boundary wrapper in tts.js.
└── Task Lead: Frontend Utility Lead

Day 4: Node.js AI Backend & Modals
├── Set up Express server with /api/explain & /api/generate-mcq endpoints.
├── Connect Gemini API service with robust JSON fallback handlers.
└── Build ExplainModal.jsx & PracticeModal.jsx UI components.
└── Task Lead: Backend & AI Engineer

Day 5: Integration, Polishing & Demo Dry-Run
├── Connect full App.jsx state pipeline (Upload -> Reader -> Controls -> AI Modals).
├── Perform latency tuning & test offline demo pass.
└── Task Lead: Full Team Demo Polish
```

---

## 🎬 6. Step-by-Step Judge Demo Flow (3 Minutes)

1. **Introduction (0:00 – 0:30)**:
   - Launch app on clean viewport. Show sample passage with plain dense text.
   - Point out how a Dyseidetic reader sees confusing mirror letters ($b/d/p/q$) and loses line position.

2. **Core Visual Engine Demo (0:30 – 1:30)**:
   - Click **"Activate Directional Anchors"** $\rightarrow$ Show $b, d, p, q$ instant visual markers appearing.
   - Adjust **Kerning** & **Line Spacing** sliders live $\rightarrow$ Text breathes apart.
   - Move cursor down the passage $\rightarrow$ Show **Optical Line Spotlight** smoothly highlighting the active reading line.

3. **OCR & Speech Sync Demo (1:30 – 2:15)**:
   - Click **"Upload Document"** $\rightarrow$ Drag & drop image $\rightarrow$ Tesseract OCR extracts text in $< 1\text{ second}$.
   - Click **"Play Audio Sync"** $\rightarrow$ Text-to-Speech plays while active word highlights in sync.

4. **AI Features & Practice Demo (2:15 – 3:00)**:
   - Click a complex word (e.g., *Equilibrium*) $\rightarrow$ **AI Explain Modal** pops up with syllable breakdown (`e·qui·lib·ri·um`) and visual definition.
   - Click **"Generate Practice Test"** $\rightarrow$ **AI Practice Modal** renders 5 MCQs derived from the passage $\rightarrow$ Answer 1 question to demonstrate score feedback.
