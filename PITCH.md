# Pitch Deck & Presentation Guide — LexiSight AI

---

## ⚡ 30-Second Elevator Pitch

> *"Did you know that nearly 30% of dyslexic individuals don't have an auditory sounding-out problem—they have a visual spatial problem? Their eyes flip mirrored letters like 'b' and 'd', lines blur together, and familiar words never register in visual memory. Current assistive tech forces them to listen to audio instead of reading with their own eyes.*
> 
> *We built **LexiSight AI**—a real-time visual cognition adaptation system. Instead of replacing reading, LexiSight dynamically modifies typography, adds directional anchors to $b/d/p/q$, expands spatial geometry, and stabilizes line focus in real time. LexiSight gives Dyseidetic dyslexic readers the ability to see text cleanly, read independently, and build true visual literacy."*

---

## 🛠️ Tech Stack & Implementation Summary

### Overview Architecture Matrix

| Module | Primary Tech Stack | Deployment Target | Key Integration / Endpoints | Required Env Vars |
| :--- | :--- | :--- | :--- | :--- |
| **1. Adaptive Reading & OCR** | React.js, Tailwind CSS, Tesseract.js (WASM), Web Speech API | Vercel (Client SPA) | `Reader.jsx`, `Upload.jsx`, `useAdaptiveEngine.js` | None (Client-side) |
| **2. Real-Time Speech Detection** | React, MediaRecorder, Node.js, Express, Groq SDK (`whisper-large-v3`), Levenshtein Phonics Comparator | Render (Backend) + Vercel (Frontend) | `POST /api/speech/analyze-reading`, `SpeechReadingModal.jsx` | `GROQ_API_KEY`, `VITE_API_BASE_URL` |
| **3. Directional Support** | React, SVG Micro-Anchors, Google Generative AI (Gemini 1.5 Flash), Web Speech API | Vercel + Render | `DirectionTrainer.jsx`, `StepFlow.jsx`, `POST /api/ai/step-flow` | `GEMINI_API_KEY` |
| **4. Number Sense & Dyscalculia** | React, SVG Bezier Jump Arcs, Base-10 CRA Engine, 12-Stage Numerosity Engine | Vercel (Client SPA) | `NumberSenseStudio.jsx`, `MathStudio.jsx`, `mathSolver.js` | None (Client-side) |
| **5. Writing & Tracing Studio** | React, HTML5 Canvas API, SVG Path Coordinate Sampler, Chamfer Corridor Evaluator | Vercel (Client SPA) | `WritingTracingStudio.jsx`, `TracingCanvas.jsx`, `strokeEvaluator.js` | None (Client-side) |

---

### Module-by-Module Technical Breakdown

#### 1. Adaptive Reading Canvas & OCR Document Ingestion
- **Feature Name**: Cognitive Anti-Crowding Reading Canvas & Client-Side OCR Ingestion
- **Tech Stack**: React 18, Tailwind CSS, Tesseract.js (WASM Worker), Web Speech API, Custom DOM Typography Engine
- **Purpose / Role**: Tesseract.js extracts clean text from camera scans and PDF uploads directly inside the browser worker thread with zero cloud latency. The React rendering engine applies dynamic kerning expansion, line-height scaling, syllable masking, and interactive optical focus spotlights to eliminate visual crowding.
- **Integration Points**: Connects `Upload.jsx` $\rightarrow$ `Reader.jsx` $\rightarrow$ `useAdaptiveEngine.js`. Pure client-side execution without external API dependencies.
- **Deployment Notes**: Runs on **Vercel** (`client/dist`). Build command: `cd client && npm install && npm run build`. Output directory: `client/dist`.
- **Quick Commands**:
  ```bash
  cd client && npm install && npm run dev
  ```
- **One-Line Risk / Limit**: OCR accuracy depends on image resolution/lighting; Web Speech API synthesis voices vary by operating system.

---

#### 2. Real-Time Speech Detection & Reading Error Analysis
- **Feature Name**: Groq Whisper-v3 Real-Time Speech Reading Error & Phonics Coach
- **Tech Stack**: React 18, MediaRecorder API (Audio/WebM), Node.js, Express, Groq Cloud SDK (`whisper-large-v3`), Sequence Alignment (Levenshtein Diff Algorithm)
- **Purpose / Role**: Captures live microphone audio in chunks and sends it to an Express backend. Groq's high-speed Whisper-v3 engine transcribes speech with ultra-low latency (<300ms), and the custom Levenshtein comparator performs sequence alignment against the reference text to identify skipped, substituted, or extra words.
- **Integration Points**: Talks to backend route `POST /api/speech/analyze-reading` via `apiConfig.js` (`API_BASE_URL`). Requires `GROQ_API_KEY` stored in backend `.env`.
- **Deployment Notes**: Backend runs on **Render** (`server/`); Frontend runs on **Vercel** (`client/`).
- **Quick Commands**:
  ```bash
  # Backend Server
  cd server && npm install && npm run dev
  # Frontend Client
  cd client && npm install && npm run dev
  ```
- **One-Line Risk / Limit**: Requires explicit browser microphone permissions and active Internet connectivity for Groq Cloud API inference.

---

#### 3. Directional Support & Left-Right Confusion Engine
- **Feature Name**: Directional Micro-Anchors & Step Sequence Intelligence
- **Tech Stack**: React 18, Tailwind CSS, Google Generative AI (`@google/genai` Gemini 1.5 Flash), Web Speech API
- **Purpose / Role**: Dynamically attaches visual cue indicators to $b/d/p/q$ stems to suppress cortical mirror inversion. Google Gemini 1.5 Flash parses complex multi-sentence instructional texts into sequential, numbered micro-steps with directional indicators.
- **Integration Points**: Connects `DirectionTrainer.jsx`, `StepFlow.jsx`, `useAdaptiveEngine.js`, and backend route `POST /api/ai/step-flow`. Requires `GEMINI_API_KEY` in `server/.env`.
- **Deployment Notes**: UI deployed on **Vercel**; AI step simplification endpoint hosted on **Render**.
- **Quick Commands**:
  ```bash
  cd client && npm run dev
  ```
- **One-Line Risk / Limit**: Designed as an assistive visual cognitive overlay; does not replace formal clinical diagnostic therapy.

---

#### 4. Number Sense & Dyscalculia Math Engine
- **Feature Name**: 12-Level Numerosity Progression Lab & Spatial CRA Math Studio
- **Tech Stack**: React 18, SVG Bezier Arc Geometry, HTML5 Canvas, Concrete-Representational-Abstract (CRA) Base-10 Engine, Web Speech API
- **Purpose / Role**: Implements Cheng et al. developmental progression across 12 levels (Magnitude Comparison $\rightarrow$ Spacing Invariance $\rightarrow$ Distractor Filtering $\rightarrow$ Number Matcher $\rightarrow$ Spatial Number Line $\rightarrow$ Math Builder). Solves arithmetic using Base-10 blocks (Flats, Rods, Units) and animated spatial number line jump arcs.
- **Integration Points**: Fully modular client-side engine in `client/src/modules/number-sense/` and `client/src/components/math/`. Accessible via `NumberSenseStudio.jsx` and `MathStudio.jsx`.
- **Deployment Notes**: Static client-side bundle deployed on **Vercel**. Zero backend overhead.
- **Quick Commands**:
  ```bash
  cd client && npm run build
  ```
- **One-Line Risk / Limit**: Computational decomposition optimized for elementary-to-middle school arithmetic and number line scales up to $100$.

---

#### 5. Writing & Tracing Motor Memory Studio
- **Feature Name**: Dynamic Geometric Path Corridor & Stroke Formation Tracing Studio
- **Tech Stack**: React 18, High-DPI HTML5 Canvas API, SVG Path Coordinate Sampler, Bidirectional Chamfer Corridor Evaluator, Web Speech API
- **Purpose / Role**: Guides letter ($A–Z, a–z$), number ($0–9$), and shape motor formation with start/end waypoints ($① \rightarrow ②$) and animated ghost pencil demonstrations. Evaluates drawn strokes against exact SVG curves, scaling corridor tolerance with pen width (`Fine`, `Medium`, `Broad`) to enforce directional memory and eliminate $b/d$ reversals.
- **Integration Points**: Fully isolated client-side engine in `client/src/modules/writing-tracing/`. Uses `strokeTemplates.js`, `strokeEvaluator.js`, and `TracingCanvas.jsx`.
- **Deployment Notes**: Static client-side bundle deployed on **Vercel**.
- **Quick Commands**:
  ```bash
  cd client && npm run dev
  ```
- **One-Line Risk / Limit**: Stylus and touch tracking resolution is subject to user hardware digitizer sampling rates and pointer precision.

---

## 🎯 Pitch Structure & Presentation Slides

### Slide 1: Title & Hook
- **Title**: LexiSight AI — Visual Cognition Adaptation System
- **Subtitle**: Re-engineering visual text perception for Visual-Spatial Dyslexia (Dyseidetic Subtype)
- **Tagline**: *"Don't bypass visual reading. Adapt it."*

---

### Slide 2: The Overlooked Problem
- **The Gap**: Most reading tools treat dyslexia purely as an auditory sounding-out issue (phonological dyslexia).
- **The Unseen Reality**: ~30% of dyslexic readers suffer from **Dyseidetic (Visual-Spatial) Dyslexia**.
- **Symptoms**:
  - Letter reversal confusion ($b$ vs $d$, $p$ vs $q$).
  - Spatial line jumping & visual crowding noise.
  - Inability to form whole-word visual memory snapshots ("sight words").
- **Current Failure**: Text-to-Speech audio tools substitute reading with listening, creating long-term visual literacy regression.

---

### Slide 3: The LexiSight Solution
- **Core Innovation**: A client-side visual transformation engine that dynamically adapts raw text to match the user's cognitive visual processing parameters.
- **The 4 Pillars**:
  1. **Directional Micro-Anchors**: Distinct visual cues attached to $b/d/p/q$ stems to eliminate mirror letter confusion.
  2. **Spatial De-crowding**: Dynamic kerning expansion, line-height scaling, and column bounding.
  3. **Gestalt Visual Chunking**: Syllable color-masking that builds whole-word visual memory.
  4. **Optical Line Stabilization**: Interactive spotlight that dims non-focused lines, eliminating line jumping.

---

### Slide 4: Innovation & Differentiator Matrix

| Aspect | Conventional Tools (Audio TTS / Static Fonts) | LexiSight AI Adaptation System |
| :--- | :--- | :--- |
| **Primary Medium** | Audio output (Listening) | Adapted visual text (Reading) |
| **Letter Confusion ($b/d/p/q$)** | Unaddressed | **Directional Micro-Anchors** |
| **Visual Crowding** | Static line spacing | **Dynamic Spatial Reflow Engine** |
| **Line Drift & Skipping** | High visual drift | **Optical Focus Spotlight Guide** |
| **Word Memory Building** | Zero visual memory stimulation | **Gestalt Syllable Masking** |

---

### Slide 5: Architecture & Technology Highlight
- **High-Performance Pipeline**: Client-side DOM parsing and Canvas rendering achieving $< 16\text{ ms}$ layout turnaround ($60\text{ fps}$).
- **Ingestion**: Handles Web DOM, PDF documents, and camera scans via Tesseract.js WASM and PDF.js.
- **Cognitive AI**: Powered by Gemini API for inline single-click visual word breakdowns and semantic simplification.

---

### Slide 6: Live Demo Blueprint (For SIH Judges)

```
STEP 1: Show standard dense text block on screen. Point out mirror letter confusion (b vs d).
STEP 2: Click "Activate LexiSight Adaptation Mode".
        - Point out instant color micro-anchors on b/d/p/q letters.
        - Demonstrate line spacing expanding live without breaking layout.
        - Move mouse cursor: highlight line spotlight following mouse seamlessly.
STEP 3: Upload sample textbook PDF -> Show instant vectorization & visual adaptation.
STEP 4: Click complex word -> Show AI visual breakdown popover.
```

---

### Slide 7: Real-World Impact & Alignment with SIH Vision

- **Educational Equity**: Allows Dyseidetic dyslexic students to read standard textbooks and take silent written exams independently.
- **Scalability**: Zero-friction deployment as a Web Reader, Chrome Extension, and LMS plugin.
- **National Impact**: Aligns with India's **NEP 2020 (National Education Policy)** guidelines for inclusive digital education and accessible learning resources for neurodivergent individuals.

---

## 💬 Q&A Anticipated Questions & Winning Answers

### Q1: "How is this different from OpenDyslexic or existing dyslexia fonts?"
> **Answer**: Static dyslexia fonts only alter bottom-heavy letter weighting universally. They do **not** fix spatial kerning, cannot distinguish between a $b$ and a $d$ in context, do not prevent line jumping, and cannot adapt to individual visual crowding thresholds. LexiSight is a **dynamic adaptation engine** that modifies letter orientation cues, line spotlighting, and spatial geometry in real time based on user-calibrated profile parameters.

### Q2: "Why focus on visual adaptation instead of Text-to-Speech?"
> **Answer**: Text-to-Speech is valuable for auditory learners, but relying solely on audio leads to visual literacy regression. Reading with one's eyes is essential for silent reading environments (exams, workplaces, code, diagrams). LexiSight gives Dyseidetic readers the tools to train and use their visual reading pipeline effectively.

### Q3: "Does this require expensive hardware?"
> **Answer**: No. LexiSight runs 100% in standard web browsers on any basic laptop, tablet, or smartphone without requiring high-end GPUs or specialized hardware.
