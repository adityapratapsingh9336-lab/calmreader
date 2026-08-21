# ⚡ Visual Tech Stack & System Architecture — Cogni-Read AI

```
====================================================================================================
               COGNITIVE ADAPTATION PLATFORM (DYSLEXIA • DYSCALCULIA • DYSGRAPHIA)
====================================================================================================
```

---

## 🗺️ 1. High-Level Visual Architecture Map

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     CLIENT LAYER (Vercel SPA)                                     │
│  React 18 • Vite • Tailwind CSS • HTML5 Canvas API • Web Speech API • Tesseract.js WASM Worker    │
└────────────┬───────────────────────────────────────┬──────────────────────────────────┬──────────┘
             │                                       │                                  │
             │ [1. Audio/WebM Stream]                │ [2. AI Step Flow / Explain]      │ [3. Client Engines]
             ▼                                       ▼                                  │
┌───────────────────────────────┐       ┌───────────────────────────────┐               │
│      NODE.JS / EXPRESS        │       │      NODE.js / EXPRESS        │               │
│  POST /api/speech/analyze     │       │  POST /api/ai/step-flow       │               │
│  (Multer + Memory Buffer)     │       │  POST /api/ai/explain         │               │
└────────────┬──────────────────┘       └────────────┬──────────────────┘               │
             │                                       │                                  │
             │ [Groq Cloud SDK]                      │ [@google/genai SDK]              │
             ▼                                       ▼                                  │
┌───────────────────────────────┐       ┌───────────────────────────────┐               │
│          GROQ CLOUD           │       │          GOOGLE AI            │               │
│     whisper-large-v3          │       │      Gemini 1.5 Flash         │               │
│   (<300ms Speech-to-Text)     │       │   (Semantic Simplifier)       │               │
└───────────────────────────────┘       └───────────────────────────────┘               │
                                                                                        │
             ┌──────────────────────────────────────────────────────────────────────────┘
             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             ISOLATED CLIENT-SIDE COGNITIVE ENGINES                                │
├───────────────────────────────┬───────────────────────────────┬──────────────────────────────────┤
│ 📖 DYSLEXIA ADAPTATION        │ 🧮 DYSCALCULIA & NUMBER SENSE │ ✍️ MOTOR MEMORY TRACING          │
│ • Optical Line Spotlight      │ • 12-Level Numerosity Engine  │ • SVG Path Coordinate Sampler    │
│ • b/d/p/q Directional Anchors │ • Spatial Bezier Jump Arcs    │ • Dynamic Pen Corridor Evaluator │
│ • Kerning & Spacing Reflow    │ • Base-10 CRA Regrouping      │ • Soft-Distance Error Tolerance  │
│ • Telemetry Velocity Tracker  │ • 2x5 Ten-Frame Subitizing    │ • Mirror Letter Reversal Drills  │
└───────────────────────────────┴───────────────────────────────┴──────────────────────────────────┘
```

---

## 🧱 2. Layer-by-Layer Tech Stack Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 1: FRONTEND FRAMEWORK & USER INTERFACE                                                      │
├───────────────────┬─────────────────────────┬────────────────────────────────────────────────────┤
│ Technology        │ Version / Library       │ Functional Role in System                          │
├───────────────────┼─────────────────────────┼────────────────────────────────────────────────────┤
│ React.js          │ v18.3.1                 │ Component hierarchy, reactive state, UI hydration  │
│ Vite              │ v5.4.21                 │ Ultra-fast HMR dev server & production bundler     │
│ Tailwind CSS      │ v3.4.x                  │ Utility styling, custom dark themes, glassmorphism │
│ HTML5 Canvas API  │ Native Web Canvas       │ High-DPI stylus/pointer drawing & optical spotlight│
│ Web Speech API    │ `window.speechSynthesis`│ Client-side TTS audio narration & word highlight   │
│ Tesseract.js      │ v5.x (WASM Worker)      │ On-device client OCR image extraction (Zero latency│
└───────────────────┴─────────────────────────┴────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 2: BACKEND RUNTIME & SERVER APIS                                                            │
├───────────────────┬─────────────────────────┬────────────────────────────────────────────────────┤
│ Technology        │ Version / Library       │ Functional Role in System                          │
├───────────────────┼─────────────────────────┼────────────────────────────────────────────────────┤
│ Node.js           │ v20.x LTS               │ Backend JavaScript runtime environment             │
│ Express.js        │ v4.19.x                 │ REST API server routing and middleware pipeline    │
│ Multer            │ v1.4.5-lts              │ In-memory multi-part form audio buffer ingestion   │
│ Cors              │ v2.8.5                  │ Cross-Origin Resource Sharing for Vercel/Render    │
│ Dotenv            │ v16.4.x                 │ Secure server environment variable management      │
└───────────────────┴─────────────────────────┴────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TIER 3: EXTERNAL CLOUD APIS & AI INFERENCE MODELS                                                │
├───────────────────┬─────────────────────────┬────────────────────────────────────────────────────┤
│ Service / Provider│ Model / SDK             │ Functional Role in System                          │
├───────────────────┼─────────────────────────┼────────────────────────────────────────────────────┤
│ Groq Cloud API    │ `whisper-large-v3`      │ Real-time voice-to-text transcription (<300ms)     │
│                   │ (`groq-sdk` v0.5.0)     │ High-speed speech reading error analysis           │
├───────────────────┼─────────────────────────┼────────────────────────────────────────────────────┤
│ Google AI Studio  │ `gemini-1.5-flash`      │ Natural language word simplification, single-click │
│                   │ (`@google/genai` v0.1.1)│ visual vocabulary breakdown & step flow generation │
└───────────────────┴─────────────────────────┴────────────────────────────────────────────────────┘
```

---

## ⚙️ 3. Feature to Technology & Function Mapping

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE 1: 👁️ DYSLEXIA ADAPTIVE READING & OCR                                                    │
├────────────────────┬─────────────────────────────────────────────────────────────────────────────┤
│ Primary Files      │ • client/src/components/Reader.jsx                                          │
│                    │ • client/src/components/Upload.jsx                                          │
│                    │ • client/src/hooks/useAdaptiveEngine.js                                     │
│                    │ • client/src/utils/ocr.js                                                   │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Core Functions     │ • performOCR(file, progressCallback)                                        │
│                    │ • calculateReadingVelocity(charCount, timeElapsed)                          │
│                    │ • evaluateOcularStrain(wpm, fixationTime, replayCount)                      │
│                    │ • applyDynamicKerningReflow(spacingLevel, lineHeight)                       │
│                    │ • renderDirectionalAnchors(b, d, p, q)                                      │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Tech Stack Used    │ React 18, Tailwind CSS, Tesseract.js (WASM Worker), Web Speech API          │
│ Cloud APIs Used    │ None (100% Client-Side Engine for Privacy & Instant Execution)              │
└────────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE 2: 🎤 REAL-TIME SPEECH READING DETECTION & PHONICS COACH                                 │
├────────────────────┬─────────────────────────────────────────────────────────────────────────────┤
│ Primary Files      │ • client/src/components/SpeechReadingModal.jsx                              │
│                    │ • client/src/utils/readingComparator.js                                     │
│                    │ • server/src/routes/speechReading.js                                        │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Core Functions     │ • startRecordingAudio() / stopRecordingAudio() (MediaRecorder WebM)         │
│                    │ • groq.audio.transcriptions.create({ model: 'whisper-large-v3' })           │
│                    │ • computeLevenshteinAlignment(spokenTokens, referenceTokens)                │
│                    │ • detectPhonicErrors(substitutions, omissions, insertions)                  │
│                    │ • generateSpeechPhonicsFeedback(accuracyPercent, errorList)                 │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Tech Stack Used    │ React 18, MediaRecorder API, Node.js Express, Multer, Groq Cloud SDK        │
│ Cloud APIs Used    │ Groq Cloud API (Whisper-Large-v3 Speech-to-Text Model)                      │
│ Env Variables Req  │ `GROQ_API_KEY`, `VITE_API_BASE_URL`                                         │
└────────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE 3: 🧠 DIRECTIONAL INTELLIGENCE & STEP FLOW SIMPLIFIER                                    │
├────────────────────┬─────────────────────────────────────────────────────────────────────────────┤
│ Primary Files      │ • client/src/components/DirectionTrainer.jsx                                │
│                    │ • client/src/components/StepFlow.jsx                                        │
│                    │ • client/src/components/ExplainModal.jsx                                    │
│                    │ • server/src/routes/ai.js                                                   │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Core Functions     │ • ai.models.generateContent({ model: 'gemini-1.5-flash' })                  │
│                    │ • parseProceduralTextIntoNumberedSteps(rawText)                             │
│                    │ • generateSyllableBreakdownAndSynonyms(targetWord)                          │
│                    │ • evaluateDirectionArrowReactionTime(userChoice, correctDirection)         │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Tech Stack Used    │ React 18, Tailwind CSS, Google Generative AI SDK (@google/genai)            │
│ Cloud APIs Used    │ Google Gemini 1.5 Flash                                                     │
│ Env Variables Req  │ `GEMINI_API_KEY`                                                            │
└────────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE 4: 🧮 DYSCALCULIA MATH STUDIO & 12-LEVEL NUMBER SENSE LAB                                │
├────────────────────┬─────────────────────────────────────────────────────────────────────────────┤
│ Primary Files      │ • client/src/modules/number-sense/NumberSenseStudio.jsx                     │
│                    │ • client/src/modules/number-sense/utils/levelsConfig.js                     │
│                    │ • client/src/modules/number-sense/utils/adaptiveEngine.js                   │
│                    │ • client/src/components/math/MathStudio.jsx                                 │
│                    │ • client/src/components/math/NumberLine.jsx                                 │
│                    │ • client/src/components/math/PlaceValue.jsx                                 │
│                    │ • client/src/components/math/Counters.jsx                                   │
│                    │ • client/src/utils/mathSolver.js & mathTelemetry.js                         │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Core Functions     │ • decomposeArithmeticOperation(num1, op, num2)                              │
│                    │ • calculateBezierJumpArcCoordinates(startVal, jumpSize, lineBounds)         │
│                    │ • computeBase10Blocks(hundredsFlats, tensRods, onesUnits)                    │
│                    │ • detectRegroupingCarryAndBorrow(ones1, ones2, operator)                    │
│                    │ • evaluateNumerosityStage(level, correctAnswers, totalQuestions)            │
│                    │ • update5DimensionSkillRadar(comparison, invariance, distractor, symbol)    │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Tech Stack Used    │ React 18, SVG Vector Geometry, HTML5 Canvas, Web Speech API                 │
│ Cloud APIs Used    │ None (100% Client-Side Engine for Instant Computational Feedback)           │
└────────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ FEATURE 5: ✍️ WRITING & TRACING MOTOR MEMORY STUDIO                                              │
├────────────────────┬─────────────────────────────────────────────────────────────────────────────┤
│ Primary Files      │ • client/src/modules/writing-tracing/WritingTracingStudio.jsx               │
│                    │ • client/src/modules/writing-tracing/components/TracingCanvas.jsx           │
│                    │ • client/src/modules/writing-tracing/components/StrokeGuidanceOverlay.jsx   │
│                    │ • client/src/modules/writing-tracing/components/MirrorLetterSpecialist.jsx  │
│                    │ • client/src/modules/writing-tracing/utils/strokeTemplates.js               │
│                    │ • client/src/modules/writing-tracing/utils/strokeEvaluator.js               │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Core Functions     │ • sampleTemplatePathPoints(template, numSamplesPerStroke)                   │
│                    │ • evaluateDrawnStrokes(drawnPoints, template, brushSize)                    │
│                    │ • computeBidirectionalChamferDistance(userPoints, refPoints)                │
│                    │ • calculatePenProportionalCorridor(brushSize)                               │
│                    │ • evaluateSoftContinuousTolerance(distance, corridorRadius)                │
│                    │ • executeGhostPencilAnimation(svgPathD, isPlaying)                          │
├────────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Tech Stack Used    │ React 18, HTML5 Canvas API, SVG Path Sampler, Web Speech API                │
│ Cloud APIs Used    │ None (100% Client-Side Engine)                                              │
└────────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 4. Deployment & Infrastructure Topography

```
                       ┌──────────────────────────────────────────────┐
                       │             CLIENT DEPLOYMENT (Vercel)       │
                       │ • URL: https://cogniread.vercel.app          │
                       │ • Build Command: cd client && npm run build  │
                       │ • Output Directory: client/dist              │
                       │ • Environment Variables:                     │
                       │   - VITE_API_BASE_URL (Render Backend URL)   │
                       └──────────────────────┬───────────────────────┘
                                              │
                                   [REST API / HTTPS Fetch]
                                              │
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │            BACKEND HOSTING (Render.com)      │
                       │ • Runtime: Node.js 20 Web Service            │
                       │ • Build Command: npm install                 │
                       │ • Start Command: node server/src/index.js    │
                       │ • Environment Variables:                     │
                       │   - GROQ_API_KEY                             │
                       │   - GEMINI_API_KEY                           │
                       │   - PORT (5000)                              │
                       └──────────────────────┬───────────────────────┘
                                              │
                         ┌────────────────────┴────────────────────┐
                         │                                         │
                         ▼                                         ▼
            ┌─────────────────────────┐               ┌─────────────────────────┐
            │   GROQ CLOUD INFERENCE  │               │   GOOGLE GEMINI ENGINE  │
            │ • Model: whisper-v3     │               │ • Model: gemini-1.5     │
            │ • Audio Transcription   │               │ • Syllable Breakdown    │
            │ • Latency: < 300ms      │               │ • Step-Flow Simplifier  │
            └─────────────────────────┘               └─────────────────────────┘
```

---

## 💻 5. Quick Development & Build Commands

```bash
# 1. Clone repository
git clone https://github.com/adityapratapsingh9336-lab/calmreader.git
cd calmreader

# 2. Run Backend Server (Express + Groq + Gemini)
cd server
npm install
npm run dev          # Starts server on http://localhost:5000

# 3. Run Frontend Client (React + Vite + Tailwind)
cd ../client
npm install
npm run dev          # Starts client on http://localhost:5173

# 4. Production Build Test
npm run build        # Compiles client bundle into client/dist/
```
