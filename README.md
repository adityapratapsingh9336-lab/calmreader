# LexiSight AI — Visual Cognition Adaptation System

> **Transforming visual text perception for Visual-Spatial & Directional Dyslexia (Dyseidetic Subtype).**

---

## 👁️ Vision

Standard reading technology relies heavily on phonological (auditory) conversion—converting text into speech. However, individuals with **Dyseidetic (Visual-Spatial) Dyslexia** possess intact auditory processing but severe deficits in **visual word form memory, spatial tracking, directional letter disambiguation, 4-way spatial orientation, and sequence order tracking**. 

**LexiSight AI** is not a reading-aloud tool. It is an **autonomous visual cognition adaptation system** that dynamically alters typography, spatial geometry, left-right orientation cues (Left=Blue, Right=Red, Up=Green, Down=Yellow), AI-powered step-by-step instruction flow, and sentence sequence ordering to allow users to **perceive printed and digital text accurately with their own eyes**.

---

## 💡 Core Idea

Rather than bypassing visual reading, LexiSight AI adapts the visual environment to match the user's cognitive visual processing parameters.

- **Dynamic Directional Anchors**: Structural visual cues applied to visually confusing letters ($b$, $d$, $p$, $q$, $m$, $w$).
- **4-Way Color & Arrow Mapping**: Left = Cool Blue (🔵 `←`), Right = Warm Red (🔴 `→`), Up = Emerald Green (🟢 `↑`), Down = Amber Yellow (🟡 `↓`).
- **AI Direction Simplifier (`/api/simplify-directions`)**: LLM transforms complex instructional text into visual directional step objects.
- **StepFlow Instruction View (`StepFlow.jsx`)**: Displays single-step instruction cards with progress indicators.
- **Interactive Direction Trainer Game (`DirectionTrainer.jsx`)**: 4-arrow tap game for spatial direction practice.
- **Interactive Sequence Reorder Trainer (`SequenceTrainingModal.jsx`)**: Drag-and-drop sentence ordering practice.
- **Autonomous AI Telemetry Auto-Scaling**: Learns reading velocity (WPM) and fixation pauses to auto-adapt visual settings.

---

## 📁 Complete SIH Hackathon Documentation Suite

| Phase / File | Link | Description |
| :--- | :--- | :--- |
| **DIRECTIONAL INTELLIGENCE** | 🧭 [MODULE_DIRECTIONAL_INTELLIGENCE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/MODULE_DIRECTIONAL_INTELLIGENCE.md) | **Master Specification & Architecture for Directional & Sequence Intelligence System** |
| **SEQUENCE MODULE** | 🧩 [MODULE_DIRECTIONAL_SEQUENCE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/MODULE_DIRECTIONAL_SEQUENCE.md) | Directional & Sequence Support Module Integration Plan & Features |
| **PITCH MASTER** | 🏆 [PITCH_MASTER.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/PITCH_MASTER.md) | **12-Slide Deck, 90s Pitch Script, Demo Click Script, Human Story, Judge Q&A Playbook** |
| **PHASE 3 GUIDE** | 🤖 [PHASE3_GUIDE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/PHASE3_GUIDE.md) | AI Adaptation Engine Architecture, Telemetry Model, Custom React Hooks, Analytics |
| **PHASE 2 GUIDE** | 🛠️ [PHASE2_GUIDE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/PHASE2_GUIDE.md) | React + Node MVP Architecture, OCR, TTS Sync, b/d/p/q Engine, AI Explain, Practice Quiz |
| **PROBLEM** | 📄 [PROBLEM.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/PROBLEM.md) | In-depth analysis of Dyseidetic Dyslexia & visual perception bottlenecks |
| **SOLUTION** | 📄 [SOLUTION.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/SOLUTION.md) | High-level adaptation approach & 4-Pillar framework |
| **ARCHITECTURE** | 📄 [ARCHITECTURE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/ARCHITECTURE.md) | Input layer, layout parser, adaptation engine, and canvas renderer |
| **FEATURES** | 📄 [FEATURES.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/FEATURES.md) | Complete feature list: stabilization, directional cues, spatial reflow, AI assistant |
| **USER FLOW** | 📄 [USER_FLOW.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/USER_FLOW.md) | Step-by-step user journey & calibration flow |
| **TECH STACK** | 📄 [TECH_STACK.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/TECH_STACK.md) | Technologies used across Frontend, Backend, OCR, and AI |
| **MVP SCOPE** | 📄 [MVP.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/MVP.md) | Hackathon demo scope, must-have features, and evaluation checklist |
| **FUTURE SCOPE** | 📄 [FUTURE_SCOPE.md](file:///c:/Users/adity/OneDrive/Desktop/SIH/FUTURE_SCOPE.md) | Hardware eye-tracking, AR overlays, and adaptive AI roadmap |

---

## ⚡ Quick Start (Run Locally)

```bash
# 1. Start Node.js Express Backend
cd server
npm install
npm run dev

# 2. Start React Frontend SPA (in another terminal)
cd client
npm install
npm run dev
```

Open browser at `http://localhost:3000` to run the application!
