# Minimum Viable Product (MVP) & Hackathon Scope — LexiSight AI

---

## 🎯 MVP Goal & Philosophy

The objective for the **36-Hour Smart India Hackathon (SIH) prototype** is to deliver a functional, zero-latency visual adaptation web reader that convincingly demonstrates **real-time visual perception modification for Dyseidetic Dyslexia**.

The MVP strictly prioritizes high-impact **visual transformation features** over non-essential administrative features.

---

## ✅ Must-Have MVP Features

```
┌─────────────────────────────────────────────────────────────────┐
│                      CORE MVP FEATURE SCOPE                     │
├─────────────────────────────────────────────────────────────────┤
│ 1. Dynamic b/d/p/q Directional Glyph Disambiguation Engine      │
│ 2. Real-Time Spatial Reflow (Kerning, Line Height, Column Constraint)│
│ 3. Optical Reading Spotlight & Focus Guide                       │
│ 4. PDF & Plain Text Ingestion Engine                            │
│ 5. Quick 30-Second Visual Profile Calibration Modal              │
│ 6. Single-Click AI Visual Word Breakdown                        │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Directional Glyph Correction Engine ($b/d/p/q$)
- **Scope**: Real-time regex-based parsing of input text with SVG/CSS micro-anchor injection on mirrored letters ($b, d, p, q$).
- **Controls**: On/Off toggle + high-contrast color scheme picker (Amber/Teal).

### 2. Spatial Reflow & De-crowding Control
- **Scope**: Live sliders for:
  - Inter-character spacing ($0px$ to $8px$).
  - Line height ($1.2\times$ to $2.5\times$).
  - Background contrast mode (Default White, Sepia Cream, Dark Charcoal, Muted Blue).

### 3. Visual Line Spotlight & Guide Ruler
- **Scope**: Interactive mouse spotlight that dims surrounding non-active lines by 70%.

### 4. Document Ingestion
- **Scope**: Support for raw text paste and PDF document file upload via PDF.js.

### 5. Onboarding Calibration
- **Scope**: 3-step interactive modal to establish initial kerning, anchor preference, and line spotlight thickness.

### 6. Basic AI Visual Word Breakdown
- **Scope**: Clicking any complex word displays a popover card with syllable segmentation and a simplified definition (powered by Gemini API).

---

## ❌ Explicit Non-Goals (Out of Scope for MVP)

To maintain execution speed during the hackathon, the following are intentionally deferred:
- ❌ Full native mobile app build (iOS/Android).
- ❌ Hardware eye-tracking integration (WebGazer camera tracker).
- ❌ Full user authentication system / Database backend (Profiles stored in `localStorage`).
- ❌ Audio synthesis / Text-to-Speech (focus remains exclusively on visual cognition).
- ❌ Multi-language translation support (MVP focuses on English text adaptation).

---

## 🎬 3-Minute Hackathon Demo Blueprint

```
[ 0:00 - 0:30 ]  THE PROBLEM DEMO
                 Show raw, dense wall of text. Highlight how b/d/p/q letters create
                 visual ambiguity and line skipping for Dyseidetic readers.

[ 0:30 - 1:15 ]  THE TRANSFORMATION (CORE SOLUTION)
                 Click "Activate LexiSight Adaptation Mode". Show instant visual reflow:
                 - Micro-anchors appear on b/d/p/q letters.
                 - Lines expand and background shifts to Sepia Cream.
                 - Line spotlight activates under mouse cursor.

[ 1:15 - 2:15 ]  INTERACTIVE FEATURES
                 - Drag PDF into system -> Instant layout vectorization.
                 - Adjust kerning & line spacing live on screen.
                 - Click complex word "Unquestionable" -> AI popover displays syllable
                   breakdown (Un-ques-tion-able) & visual concept card.

[ 2:15 - 3:00 ]  IMPACT & CONCLUSION
                 Show side-by-side Before/After visual comparison. Reiterate 
                 shift from listening (TTS) to true visual reading independence.
```

---

## 📊 MVP Evaluation & Success Criteria

| Metric | Target Goal | Verification Method |
| :--- | :--- | :--- |
| **Adaptation Speed** | $< 100\text{ ms}$ for 10,000 words | Measured in Chrome DevTools Performance tab. |
| **Letter Disambiguation** | 100% accuracy on $b/d/p/q$ detection | Verified across sample benchmark text blocks. |
| **Line Focus Smoothness** | 60 fps spotlight movement | Measured via browser frame rendering counter. |
| **Demo Setup Time** | $< 10\text{ seconds}$ zero-friction launch | Tested on clean browser session without setup delays. |
