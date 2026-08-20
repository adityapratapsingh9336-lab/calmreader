# Technology Stack Specifications — LexiSight AI

---

## 🛠️ Technology Stack Architecture

LexiSight AI utilizes a high-performance, low-latency technology stack designed for **real-time DOM manipulation, spatial document rendering, and on-device visual cognition algorithms**.

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
│    Next.js 14 (React) | TypeScript | Tailwind CSS       │
│    HTML5 Canvas API   | Web API Speech Synth Overlay    │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                    ADAPTATION ENGINE                    │
│    Client DOM AST Parser | Custom SVG Micro-Anchors     │
│    RegEx Tokenizer       | Web Workers                  │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                  BACKEND & OCR PIPELINE                 │
│    Node.js / Python FastAPI | PDF.js | Tesseract.js     │
│    OpenCV (Spatial Layout)  | PaddleOCR                 │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                  AI & COGNITION SERVICES                │
│    Google Gemini API / Ollama Local LLM (Quantized)     │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Comprehensive Tech Stack Matrix

### 1. Frontend & User Interface
| Component | Technology Selected | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) + React 18 | High performance, server-side rendering for document preview, fast client-side state hydration. |
| **Language** | TypeScript 5.0 | Strong typing for complex spatial geometry vectors, DOM node manipulation, and profile state. |
| **Styling** | Vanilla CSS + Tailwind CSS | Ultra-lightweight styling framework allowing custom dynamic CSS variables for font kerning, line-height, and color masks. |
| **Canvas Engine** | HTML5 Canvas API | Low-overhead rendering of optical focus rulers, line spotlight dimming, and anti-saccadic boundary guides. |

### 2. Adaptation Engine & Client Storage
| Component | Technology Selected | Rationale |
| :--- | :--- | :--- |
| **AST Parser** | Custom JS DOM Tokenizer | Parses paragraphs into word/glyph tokens without mutating underlying web page DOM event handlers. |
| **Concurrency** | Web Workers API | Offloads heavy morphological text chunking and OCR spatial processing off the main UI thread (maintains 60fps). |
| **State Storage** | IndexedDB / LocalStorage | Stores user visual profile calibration locally for zero-latency instant app startup. |

### 3. OCR & Spatial Document Ingestion
| Component | Technology Selected | Rationale |
| :--- | :--- | :--- |
| **PDF Processing** | PDF.js | Vectorizes PDF pages in-browser, extracting raw text along with exact bounding box coordinates $(X, Y, W, H)$. |
| **In-Browser OCR** | Tesseract.js (WASM) | Zero-backend OCR processing for client privacy and instant offline text extraction from image snippets. |
| **Server OCR (Heavy)** | Python PaddleOCR + OpenCV | High-accuracy layout analysis for complex multi-column documents, tables, and scanned book pages. |

### 4. Backend & AI Layer
| Component | Technology Selected | Rationale |
| :--- | :--- | :--- |
| **API Server** | Node.js (Express) / Python FastAPI | Lightweight microservices handling heavy PDF parsing, OCR image processing, and AI endpoint proxies. |
| **AI LLM API** | Google Gemini API / Local Quantized Model | Generates contextual visual breakdowns, simple sentence rewrites, and visual dictionary concepts. |
| **Browser Extension** | Chrome Extension Manifest V3 | Standard framework for injecting the adaptation engine across any live web page seamlessly. |

---

## ⚡ Performance Optimization & Technical Rationale

1. **Zero-Latency Client Adaptation**: Core visual transformations (glyph anchors, line spacing, line spotlight) run entirely client-side using CSS variable overrides and SVG masks, achieving **$< 16\text{ ms}$ rendering turnaround**.
2. **Offline-First Capabilities**: By leveraging Tesseract.js (WASM) and local DOM AST processing, core reading features function without an active internet connection.
3. **Cross-Platform Compatibility**: Clean decoupling of the adaptation engine allows deployment across Web SPA, Chromium Extension, and Electron desktop wrappers.
