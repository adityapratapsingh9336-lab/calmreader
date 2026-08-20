# Directional & Sequence Intelligence System — Master Specification

---

## 📌 Executive Summary

The **Directional & Sequence Intelligence System** is an advanced cognitive assistance engine built for **LexiSight AI**.

It eliminates spatial orientation confusion (Left vs Right, Up vs Down) and procedural sequence breakdown by combining **4-Way Visual Direction Mapping**, **AI-Powered Instruction Simplification**, **Step-by-Step Visual Chunking**, and **Interactive Directional Training**.

---

## 🧭 1. Module Design & Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 DIRECTIONAL & SEQUENCE INTELLIGENCE MODULE                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. 4-Way Direction Translation  --> Left(Blue ←), Right(Red →), Up(Green ↑), Down(Yellow ↓)│
│ 2. AI Direction Simplifier API  --> Parses complex text into step objects   │
│ 3. StepFlow Focus View          --> Single-step instruction card wizard      │
│ 4. DirectionTrainer Game        --> Interactive arrow tap practice modal    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Problem vs. Solution Matrix

| Dyslexic Visual Deficit | Traditional Display | LexiSight Directional Intelligence System |
| :--- | :--- | :--- |
| **Left-Right Orientation** | Unstyled text (`turn left then move right`). | **Color & Arrow Mapping**: `LEFT` = **Cool Blue** (`#3b82f6` 🔵 `←`), `RIGHT` = **Warm Red** (`#ef4444` 🔴 `→`). |
| **Up-Down Spatial Ambiguity** | Unstyled text (`shift upwards then drop down`). | **Color & Arrow Mapping**: `UP` = **Emerald Green** (`#10b981` 🟢 `↑`), `DOWN` = **Amber Yellow** (`#f59e0b` 🟡 `↓`). |
| **Complex Procedural Text** | Dense wall of instructions. | **AI Direction Simplifier**: LLM parses text into clean visual step cards (`Step 1: 🔵 LEFT ←`). |
| **Sequence Memory Failure** | No active training mode. | **Interactive Direction Trainer**: Arrow tap & step reordering quiz game with score tracking. |

---

## 🟢 2. Mandatory Core Features

### 1. 4-Way Direction Translation System
- **LEFT**: Highlighted in **Cool Blue** (`#3b82f6` 🔵) with left arrow (`←`) and subtle pulse animation.
- **RIGHT**: Highlighted in **Warm Red** (`#ef4444` 🔴) with right arrow (`→`) and subtle pulse animation.
- **UP**: Highlighted in **Emerald Green** (`#10b981` 🟢) with up arrow (`↑`).
- **DOWN**: Highlighted in **Amber Yellow** (`#f59e0b` 🟡) with down arrow (`↓`).

### 2. Step-by-Step Sequencing Engine (`StepFlow.jsx`)
- Extracts procedural steps, highlights the current active step, and displays a visual progress bar.

### 3. AI Direction Simplifier Endpoint (`/api/simplify-directions`)
- Transforms complex text:
  - *Raw Input*: "First walk left past the table, then move down towards the lower door."
  - *AI Output JSON*:
    ```json
    {
      "steps": [
        { "stepNumber": 1, "action": "Walk past the table", "direction": "LEFT", "color": "blue", "icon": "←" },
        { "stepNumber": 2, "action": "Move towards the lower door", "direction": "DOWN", "color": "yellow", "icon": "↓" }
      ]
    }
    ```

### 4. Interactive Direction Trainer (`DirectionTrainer.jsx`)
- Gamified modal where users tap the matching directional arrow (← → ↑ ↓) or arrange jumbled steps in sequence, receiving instant visual score feedback.

---

## 🛠️ 3. Node.js Backend API Specification

### Endpoint: `POST /api/simplify-directions`

#### Request Body
```json
{
  "text": "Move left towards the counter, then go down to the lower floor, and finally turn right."
}
```

#### Prompt sent to Gemini 1.5 Flash
```
You are an expert assistive AI for dyslexic students.
Parse the following instructional text into step-by-step directional actions:
"${text}"

Return ONLY a valid JSON object matching this exact schema:
{
  "steps": [
    {
      "stepNumber": 1,
      "action": "Short step action text",
      "direction": "LEFT" | "RIGHT" | "UP" | "DOWN" | "NONE",
      "color": "blue" | "red" | "green" | "yellow" | "slate",
      "icon": "←" | "→" | "↑" | "↓" | "•"
    }
  ]
}
```

---

## 🤖 4. Autonomous AI Trigger Logic

The AI Adaptation Engine (`adaptationEngine.js`) monitors reading behavior and auto-triggers Directional Intelligence features:

```javascript
// Auto-Trigger Logic for Directional Intelligence
if (
  metrics.avgSentenceFixationMs > 4500 || 
  metrics.explainClicksCount >= 3 || 
  textContainsDirections(text)
) {
  return {
    shouldAdapt: true,
    profileType: 'DIRECTIONAL_STRAIN',
    newSettings: {
      ...currentSettings,
      directionColorCoding: true, // Enable Blue/Red/Green/Yellow direction badges
      sequenceSupport: true,      // Enable left margin landing dots
      lineSpotlight: true
    },
    reason: "🤖 AI Auto-Adapted: Directional & Spatial strain detected! Enabled 4-Way Color Badges & AI Step Flow option."
  };
}
```

---

## 🎬 5. Before vs. After Demo Flow (For SIH Judges)

```
[ BEFORE: RAW CONFUSING TEXT ]
"First move left past the blue table, then go down toward the main entrance, 
and finally make a sharp right turn."
--> Reader hesitates on direction words and loses step position.

[ AFTER: LEXISIGHT AI DIRECTIONAL INTELLIGENCE ]
Click "🧠 AI Simplify Directions":
- Step 1: [ 🔵 LEFT ← ] Walk past the blue table
- Step 2: [ 🟡 DOWN ↓ ] Move toward the main entrance
- Step 3: [ 🔴 RIGHT → ] Make a sharp turn

--> Result: Zero cognitive hesitation, instant visual spatial clarity!
```
