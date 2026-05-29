import { useState } from 'react'
import SectionWrapper from '../components/SectionWrapper'

const LAYERS = [
  {
    id: 'presentation',
    label: 'Presentation Layer',
    color: 'cyan',
    items: ['Fleet Dashboard (React 18)', 'Driver PWA (React + Workbox)', 'Admin Portal', 'Analytics View'],
    desc: 'Responsive React applications with glassmorphism UI, real-time telemetry feeds, and progressive web app capabilities.'
  },
  {
    id: 'intelligence',
    label: 'AI Intelligence Layer',
    color: 'purple',
    items: ['AI Orchestrator', 'Apex Sentinel', 'Apex RouteMind', 'Apex Predict', 'Apex Compliance', 'Apex Efficiency'],
    desc: 'Multi-module AI coordination with provider routing, fallback chains, decision caching, and graceful degradation to offline models.'
  },
  {
    id: 'services',
    label: 'Service Layer',
    color: 'blue',
    items: ['Fleet Service', 'Driver Service', 'Dispatch Service', 'Safety Service', 'Compliance Engine', 'Job Execution Engine'],
    desc: 'Domain-driven service modules with clean separation of concerns. All services are testable, replaceable, and composable.'
  },
  {
    id: 'sync',
    label: 'Sync & Communication Layer',
    color: 'green',
    items: ['Live Sync (Supabase RT)', 'Driver Sync Service', 'Federation Engine', 'BroadcastChannel API', 'Telemetry Queue'],
    desc: 'Real-time bidirectional sync between dashboard and driver PWA via Supabase Realtime subscriptions and BroadcastChannel for local tab communication.'
  },
  {
    id: 'storage',
    label: 'Storage Layer',
    color: 'amber',
    items: ['LocalDB (IndexedDB)', 'Core Storage (Zustand)', 'Offline Vault', 'Route Cache', 'Supabase PostgreSQL'],
    desc: 'Layered storage strategy: in-memory Zustand state, IndexedDB for offline persistence, encrypted offline vault for safety data, and Supabase for cloud sync.'
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure Layer',
    color: 'red',
    items: ['Vite Build System', 'Workbox PWA', 'Supabase Edge Functions', 'Row-Level Security', 'Vercel Deployment'],
    desc: 'Zero-config deployment pipeline with PWA service workers, Supabase hosted backend, and Vercel CDN for global performance.'
  },
]

const COLOR_MAP = {
  cyan:   { border: 'border-cyan-500/30',   bg: 'bg-cyan-500/5',   text: 'text-cyan-400',   dot: 'bg-cyan-400'   },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400', dot: 'bg-purple-400' },
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-500/5',   text: 'text-blue-400',   dot: 'bg-blue-400'   },
  green:  { border: 'border-green-500/30',  bg: 'bg-green-500/5',  text: 'text-green-400',  dot: 'bg-green-400'  },
  amber:  { border: 'border-amber-500/30',  bg: 'bg-amber-500/5',  text: 'text-amber-400',  dot: 'bg-amber-400'  },
  red:    { border: 'border-red-500/30',    bg: 'bg-red-500/5',    text: 'text-red-400',    dot: 'bg-red-400'    },
}

// System diagram
function SystemDiagram() {
  return (
    <div className="relative apex-card p-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative">
        <div className="text-xs font-mono text-slate-500 mb-6 text-center">AP3X SYSTEM ARCHITECTURE — DATA FLOW</div>

        {/* Diagram grid */}
        <div className="flex flex-col gap-3">
          {/* Fleet Dashboard <-> Driver PWA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="apex-glass rounded-xl p-3 text-center border-cyan-500/20 border">
              <div className="text-cyan-400 text-xs font-bold mb-1">🖥️ Fleet Dashboard</div>
              <div className="text-xs text-slate-500">Command Center</div>
            </div>
            <div className="apex-glass rounded-xl p-3 text-center border-purple-500/20 border">
              <div className="text-purple-400 text-xs font-bold mb-1">📱 Driver PWA</div>
              <div className="text-xs text-slate-500">Mobile Companion</div>
            </div>
          </div>

          {/* Arrows down */}
          <div className="flex justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-cyan-500/40" />
              <div className="text-cyan-400 text-xs">↕</div>
              <div className="w-px h-6 bg-cyan-500/40" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-xs font-mono text-slate-600 text-center">Supabase Realtime<br/>BroadcastChannel</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-purple-500/40" />
              <div className="text-purple-400 text-xs">↕</div>
              <div className="w-px h-6 bg-purple-500/40" />
            </div>
          </div>

          {/* AI Orchestrator */}
          <div className="apex-glass rounded-xl p-3 text-center border border-blue-500/20">
            <div className="text-blue-400 text-xs font-bold mb-1">🧠 AI Orchestrator</div>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {['Sentinel', 'RouteMind', 'Predict', 'Compliance', 'Efficiency'].map(m => (
                <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">{m}</span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-green-500/40" />
              <div className="text-green-400 text-xs">↕</div>
              <div className="w-px h-4 bg-green-500/40" />
            </div>
          </div>

          {/* Storage + Backend */}
          <div className="grid grid-cols-3 gap-3">
            <div className="apex-glass rounded-xl p-2 text-center border border-amber-500/20">
              <div className="text-amber-400 text-xs font-bold">IndexedDB</div>
              <div className="text-xs text-slate-600">Offline</div>
            </div>
            <div className="apex-glass rounded-xl p-2 text-center border border-green-500/20">
              <div className="text-green-400 text-xs font-bold">Supabase</div>
              <div className="text-xs text-slate-600">PostgreSQL</div>
            </div>
            <div className="apex-glass rounded-xl p-2 text-center border border-red-500/20">
              <div className="text-red-400 text-xs font-bold">Safety Vault</div>
              <div className="text-xs text-slate-600">Encrypted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState('intelligence')

  return (
    <SectionWrapper id="architecture" className="py-24 px-4 sm:px-6 bg-apex-surface/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">System Architecture</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">Built for Scale. Built to Last.</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            AP3X is designed as a six-layer modular architecture. Every layer is independently deployable, testable, and replaceable — enabling continuous evolution without system-wide risk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Layer stack */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-600 mb-4">ARCHITECTURE LAYERS — CLICK TO EXPLORE</div>
            {LAYERS.map((layer, i) => {
              const c = COLOR_MAP[layer.color]
              const isActive = activeLayer === layer.id
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${isActive ? `${c.bg} ${c.border}` : 'bg-apex-card/40 border-apex-border/40 hover:border-slate-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-slate-600">L{i+1}</span>
                      <div className={`w-2 h-2 rounded-full ${c.dot} ${isActive ? 'animate-pulse' : 'opacity-40'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${isActive ? c.text : 'text-slate-300'}`}>{layer.label}</div>
                      {isActive && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{layer.desc}</p>}
                    </div>
                    <div className={`font-mono text-xs ${c.text} flex-shrink-0`}>{layer.items.length} modules</div>
                  </div>
                  {isActive && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {layer.items.map(item => (
                        <span key={item} className={`text-xs px-2 py-0.5 rounded-full ${c.bg} border ${c.border} ${c.text}`}>{item}</span>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Diagram + scalability */}
          <div className="space-y-6">
            <SystemDiagram />

            <div className="apex-card p-6">
              <div className="text-xs font-mono text-slate-500 mb-4">SCALABILITY DESIGN PRINCIPLES</div>
              <div className="space-y-3">
                {[
                  { title: 'Modular by Design', desc: 'Every module has a clean interface. Swap providers, databases, or AI models without touching other layers.' },
                  { title: 'Offline-First Architecture', desc: 'IndexedDB + service workers ensure full functionality with no internet. Sync queues replay when reconnected.' },
                  { title: 'Multi-Tenant Ready', desc: 'Supabase Row-Level Security isolates tenant data at the database level. One deployment, infinite operators.' },
                  { title: 'Edge-Deployable', desc: 'PWA runs at the edge on driver devices. Supabase Edge Functions handle server logic globally.' },
                ].map(p => (
                  <div key={p.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
