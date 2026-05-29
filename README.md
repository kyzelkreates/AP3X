# AP3X — Intelligent AI Coach & Bus Fleet OS

> Enterprise AI-Powered Operational Intelligence Platform for Modern Coach & Bus Fleets

**Live Demo:** [Deploy on Vercel ↗](#deploy)

---

## What This Is

AP3X is a next-generation operational command ecosystem combining:

- 🧠 **AI-Assisted Fleet Management** — 6-module AI orchestration engine
- 📱 **Driver PWA** — Offline-first mobile companion with navigation, AI coaching & compliance
- 📊 **Live Fleet Dashboard** — Real-time telemetry, predictive analytics, dispatch control
- 🛡️ **Safety & Compliance** — EU/UK PSV regulatory monitoring, fatigue detection, incident management
- ⚡ **Operational Intelligence** — Route optimisation, predictive maintenance, efficiency analytics

---

## This Repository

This repo contains the **AP3X Interactive Technology Showcase** — a production-grade interactive demo platform built in React, showcasing all AP3X systems for:

- 📂 Portfolio presentation
- 💼 Investor demonstrations
- 🏢 Enterprise sales demos
- 🎓 Grant & funding applications
- 🚀 SaaS proof-of-concept

---

## Sections

| Section | Description |
|---|---|
| Hero | Animated command center with live telemetry |
| Fleet Dashboard Demo | Live-updating fleet map, vehicle telemetry, AI alerts |
| Driver PWA Demo | Interactive mobile phone demo with 5 real screens |
| AI Operations Center | 6-module AI showcase with live predictions |
| System Architecture | 6-layer architecture explorer |
| Technology Stack | Interactive tech stack with rationale |
| Platform Verticals | 8 deployment verticals |
| Roadmap | Q1 2025–Q2 2026 milestone timeline |
| Investor Section | Commercial model, market data, technical moat |

---

## Tech Stack

- **React 18** + Vite 5
- **Tailwind CSS** with custom AP3X design system
- **Recharts** for analytics visualizations
- **Lucide React** icons
- No external API dependencies — fully self-contained

---

## Deploy

### Vercel (Recommended — one click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kyzelkreates/AP3X)

### Manual

```bash
git clone https://github.com/kyzelkreates/AP3X.git
cd AP3X
npm install
npm run dev       # development
npm run build     # production build → /dist
npm run preview   # preview production build
```

### Deploy to Netlify / S3 / Cloudflare Pages

Build the `/dist` folder and point your host to it. The `vercel.json` includes SPA rewrites. For Netlify, add a `_redirects` file or configure rewrites in the UI.

---

## Project Structure

```
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/      # Nav, SectionWrapper, StatusBadge
│   ├── sections/        # All 9 showcase sections
│   ├── hooks/           # useAnimatedCounter, useLiveTelemetry
│   └── data/            # mockData.js — realistic transport simulation data
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

---

## The Full AP3X Ecosystem

| Product | Description |
|---|---|
| AP3X Fleet Control OS | Fleet command dashboard with real-time telemetry |
| AP3X Driver Companion | Mobile PWA for drivers — navigation, compliance, AI |
| AP3X Intelligence Engine | 6-module AI orchestration for transport operations |
| AP3X Compliance Engine | UK/EU PSV regulatory monitoring automation |

---

*Built with ❤️ by Kyzel Kreates · AP3X Enterprise Technology Platform*
