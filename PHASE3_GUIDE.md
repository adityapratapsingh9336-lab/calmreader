# Phase 3 — AI Adaptation Engine & Intelligence Layer Guide

---

## 📌 Executive Summary

Phase 3 introduces the **Cognitive Intelligence & Adaptation Layer** for **LexiSight AI**.

While Phase 2 provided manual customization tools (sliders, toggles, themes), Phase 3 transforms the application into an **autonomous visual cognition system**. It measures real-time reader behavior (reading velocity, sentence fixation pauses, audio replays, explain popover triggers, quiz error rates), classifies cognitive bottlenecks, and **automatically optimizes the visual layout without manual intervention**.

---

## 🧠 1. User Profiling & Scoring System

The user profiling engine classifies readers into three distinct cognitive difficulty categories based on a multi-metric scoring matrix.

### Telemetry Inputs
- $WPM$: Reading velocity (words per minute).
- $T_{sentence}$: Mean time spent per sentence in milliseconds.
- $N_{replay}$: Frequency of TTS audio replay triggers per session.
- $N_{explain}$: Frequency of AI word breakdown popover clicks.
- $E_{quiz}$: Error rate percentage from practice quizzes ($1 - \text{Accuracy}$).

### Cognitive Classification Logic & Formula

$$\text{Visual Strain Score (VSS)} = (N_{explain} \times 2.5) + (E_{quiz} \times 1.5) + (N_{replay} \times 1.0)$$

$$\text{Speed Strain Score (SSS)} = \left(\frac{200 - WPM}{10}\right) + \left(\frac{T_{sentence}}{1500}\right)$$

```
                               ┌─────────────────────────┐
                               │  TELEMETRY METRICS FLOW │
                               └────────────┬────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
     ┌─────────────────────────────┐                 ┌─────────────────────────────┐
     │ Visual Strain Score (VSS)   │                 │ Speed Strain Score (SSS)    │
     │ (Explain clicks, Quiz error)│                 │ (Low WPM, Long sentence time)│
     └──────────────┬──────────────┘                 └──────────────┬──────────────┘
                    │                                               │
                    └───────────────────────┬───────────────────────┘
                                            │
                                            ▼
                        ┌───────────────────────────────────────┐
                        │   COGNITIVE PROFILE CLASSIFICATION    │
                        ├───────────────────────────────────────┤
                        │ 1. VISUAL_DIFFICULTY (VSS > SSS)       │
                        │ 2. SPEED_DIFFICULTY  (SSS > VSS)       │
                        │ 3. MIXED_DIFFICULTY  (Both High)      │
                        └───────────────────────────────────────┘
```

---

## ⚙️ 2. Adaptation Engine Rule Set

The adaptation engine applies rule-based logic to dynamically scale UI properties in real time:

| Cognitive Profile | Trigger Threshold | Automated UI Adaptations Applied |
| :--- | :--- | :--- |
| **VISUAL_DIFFICULTY** | $N_{explain} \ge 2$ OR $E_{quiz} > 40\%$ | • Force-enable $b/d/p/q$ Directional Anchors.<br>• Shift Theme to **Sepia Cream** ($#fbf0d9$).<br>• Increase font size by $+2\text{px}$. |
| **SPEED_DIFFICULTY** | $WPM < 110$ OR $T_{sentence} > 4000\text{ ms}$ | • Expand kerning letter-spacing by $+2\text{px}$.<br>• Expand line height spacing to $2.4\times$.<br>• Force-enable **Optical Focus Spotlight**. |
| **MIXED_DIFFICULTY** | High VSS & High SSS | • Apply all visual anchors + maximum line spacing ($2.6\times$) + Focus Spotlight. |

---

## 📊 3. Telemetry Tracking Data Model

```json
{
  "sessionId": "sess_892374981",
  "timestamp": 1724177589000,
  "metrics": {
    "totalWords": 142,
    "readingTimeSeconds": 85,
    "wpm": 100.2,
    "avgSentenceFixationMs": 4200,
    "explainClicksCount": 3,
    "replaysCount": 2,
    "quizAccuracyPct": 66.6
  },
  "classification": "SPEED_DIFFICULTY",
  "adaptedSettings": {
    "fontSize": 22,
    "letterSpacing": 4,
    "lineHeight": 2.4,
    "directionalAnchors": true,
    "lineSpotlight": true,
    "theme": "sepia"
  }
}
```

---

## ⚛️ 4. Adaptive UI React Hook Architecture

The custom React hook `useAdaptiveEngine.js` acts as an autonomous feedback loop:

```jsx
// Simplified Architecture
export function useAdaptiveEngine(text, initialSettings) {
  const [settings, setSettings] = useState(initialSettings);
  const [telemetry, setTelemetry] = useState(initialTelemetry);
  const [toastMessage, setToastMessage] = useState(null);

  // Evaluate metrics on telemetry change
  useEffect(() => {
    const adaptationResult = evaluateAdaptationRules(telemetry, settings);
    if (adaptationResult.shouldAdapt) {
      setSettings(adaptationResult.newSettings);
      setToastMessage(adaptationResult.reason);
    }
  }, [telemetry]);

  return { settings, telemetry, toastMessage };
}
```

---

## 📈 5. Educator & Admin Analytics Dashboard

The **Analytics Dashboard** (`AnalyticsDashboard.jsx`) provides teachers, parents, and occupational therapists with empirical visual literacy insights:

- **Reading Velocity Trend**: Live WPM trajectory over past 7 reading sessions.
- **Diagnostic Badge**: Shows current classification (*Visual*, *Speed*, or *Mixed*).
- **Adaptation Efficiency Score**: Displays percentage improvement in WPM after AI auto-adaptation ($+34\text{ WPM average boost}$).

---

## 🎬 6. 3-Minute Hackathon Demo Story

```
[ 0:00 - 0:45 ]  THE UNADAPTED BASELINE
                 - Load sample passage with standard dense font.
                 - Read text slowly. Pause on a line for > 4 seconds.
                 - Click 2 difficult words ("Equilibrium", "Disambiguation").

[ 0:45 - 1:45 ]  THE AUTONOMOUS AI ADAPTATION
                 - An AI notification toast pops up:
                   "🤖 AI Auto-Adapted: Visual & Speed Difficulty Detected!"
                 - On-screen magic happens live:
                   * b/d/p/q Directional Anchors turn ON automatically.
                   * Kerning expands by +2px.
                   * Background smoothly transitions to Sepia Cream.
                   * Optical Line Spotlight activates under cursor.

[ 1:45 - 2:30 ]  IMPROVED FLUENCY & QUIZ
                 - Read passage with adapted visual layout (2x faster flow).
                 - Click "Practice Quiz" -> Answer MCQs -> Score 100%.

[ 2:30 - 3:00 ]  TEACHER ANALYTICS DASHBOARD
                 - Click "Analytics Dashboard" -> Show WPM trajectory chart, 
                   diagnostic badge, and visual adaptation efficacy metric.
                 - Reiterate: "LexiSight AI doesn't just display text; it learns 
                   how your brain sees and adapts in real time."
```
