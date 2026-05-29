import { useState, useEffect } from 'react'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

const STATS = [
  { value: 94, suffix: '%', label: 'On-Time Performance' },
  { value: 6, suffix: 'x', label: 'AI Modules Active' },
  { value: 31, suffix: '%', label: 'Fuel Cost Reduction' },
  { value: 99, suffix: '.9%', label: 'Platform Uptime' },
]

function StatCounter({ value, suffix, label, delay }) {
  const count = useAnimatedCounter(value, 2000, delay)
  return (
    <div className="text-center">
      <div className="font-mono text-3xl sm:text-4xl font-bold text-cyan-400">
        {count}{suffix}
      </div>
      <div className="text-xs text-slate-500 mt-1 font-medium">{label}</div>
    </div>
  )
}

// Animated background route lines
function RouteLines() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1400 800">
      <defs>
        <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          <animate attributeName="x1" values="-100%;100%;-100%" dur="6s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;200%;0%" dur="6s" repeatCount="indefinite" />
        </linearGradient>
        <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          <animate attributeName="x1" values="-100%;100%;-100%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="0%;200%;0%" dur="8s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      {/* Horizontal route lines */}
      {[120, 220, 320, 420, 520, 620, 680].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="1400" y2={y} stroke={i % 2 === 0 ? '#22d3ee' : '#3b82f6'} strokeWidth="0.5" strokeDasharray="4,8" />
      ))}
      {/* Diagonal route lines */}
      <line x1="0" y1="0" x2="700" y2="800" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="6,12" />
      <line x1="200" y1="0" x2="900" y2="800" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="6,12" />
      <line x1="700" y1="0" x2="1400" y2="800" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="6,12" />
      {/* Node points */}
      {[[200,200],[500,350],[700,180],[900,420],[1100,280],[300,550],[800,600]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="4" fill="#22d3ee" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r="12" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="6;20;6" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  )
}

// Live telemetry ticker
function TelemetryTicker() {
  const [values, setValues] = useState({ speed: 67, rpm: 1920, fuel: 74, temp: 83, passengers: 34 })
  useEffect(() => {
    const id = setInterval(() => {
      setValues(v => ({
        speed: Math.round(Math.max(40, Math.min(85, v.speed + (Math.random()-0.5)*8))),
        rpm: Math.round(Math.max(1400, Math.min(2400, v.rpm + (Math.random()-0.5)*100))),
        fuel: Math.round(Math.max(60, Math.min(95, v.fuel - 0.05))*10)/10,
        temp: Math.round(Math.max(78, Math.min(92, v.temp + (Math.random()-0.5)*1))),
        passengers: v.passengers,
      }))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const items = [
    { label: 'SPEED', value: `${values.speed} km/h`, color: 'text-cyan-400' },
    { label: 'RPM', value: values.rpm.toLocaleString(), color: 'text-blue-400' },
    { label: 'FUEL', value: `${values.fuel}%`, color: 'text-green-400' },
    { label: 'TEMP', value: `${values.temp}°C`, color: 'text-amber-400' },
    { label: 'PAX', value: `${values.passengers}/52`, color: 'text-purple-400' },
    { label: 'ROUTE', value: 'Route 42', color: 'text-cyan-300' },
    { label: 'AI', value: 'ACTIVE', color: 'text-green-400' },
  ]

  return (
    <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
      <div className="px-3 py-1.5 bg-cyan-500/10 border-r border-cyan-500/20">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-400 font-bold">LIVE</span>
        </div>
      </div>
      <div className="flex items-center gap-4 px-4 py-1.5 overflow-x-auto">
        {items.map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-xs text-slate-600">{label}</span>
            <span className={`font-mono text-xs font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-apex-base">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <RouteLines />
        {/* Radial glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center w-full">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-xs font-mono text-cyan-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Enterprise AI Fleet Technology Showcase
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          <span className="text-white">AI-Powered Operational</span>
          <br />
          <span className="text-neon-cyan">Intelligence</span>
          <span className="text-white"> For</span>
          <br />
          <span className="text-white">Modern Coach & Bus</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Fleets</span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          AP3X Intelligent AI Coach & Bus Fleet OS is a next-generation operational command ecosystem combining AI-assisted fleet management, driver intelligence, live transport analytics, and modular enterprise control infrastructure.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollTo('dashboard-demo')}
            className="btn-primary flex items-center gap-2 text-sm py-3 px-6 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Launch Fleet Dashboard Demo
          </button>
          <button
            onClick={() => scrollTo('driver-demo')}
            className="btn-ghost flex items-center gap-2 text-sm py-3 px-6 w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Open Driver PWA Demo
          </button>
          <button
            onClick={() => scrollTo('ai-ops')}
            className="flex items-center gap-2 text-sm py-3 px-6 text-slate-400 hover:text-white transition-colors w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Explore AI Systems
          </button>
        </div>

        {/* Live telemetry bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <TelemetryTicker />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
          {STATS.map((s, i) => (
            <StatCounter key={s.label} {...s} delay={i * 200} />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button onClick={() => scrollTo('dashboard-demo')} className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors animate-bounce">
            <span className="text-xs font-mono">SCROLL</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
