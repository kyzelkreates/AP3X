import { useState } from 'react'
import { TECH_STACK } from '../data/mockData'
import SectionWrapper from '../components/SectionWrapper'
import { useIntersectionObserver } from '../hooks/useAnimatedCounter'

const STACK_DETAILS = {
  Frontend: {
    why: 'React 18 with concurrent features enables smooth real-time updates without blocking the UI — critical for live telemetry dashboards.',
    perf: 'Vite build delivers <200ms HMR and sub-1s production builds. Code splitting keeps initial bundle under 150KB.',
    icon: '⚛️',
  },
  PWA: {
    why: 'Service workers enable true offline operation for drivers in tunnels, rural areas, or dead zones — a non-negotiable for transport ops.',
    perf: 'Workbox precaches all critical routes. Background sync queues replay up to 200 deferred requests when connectivity returns.',
    icon: '📱',
  },
  'AI Engine': {
    why: 'Multi-provider routing with fallback chains means no single AI vendor dependency. If OpenAI is down, Anthropic/Gemini/local models take over.',
    perf: 'Decision cache hits 68% rate for repeated route queries, reducing API costs and latency by over half.',
    icon: '🧠',
  },
  Backend: {
    why: 'Supabase provides PostgreSQL with Row-Level Security, Realtime subscriptions, and Edge Functions — all managed, zero-ops infrastructure.',
    perf: 'Realtime websocket subscriptions deliver telemetry updates in <50ms. RLS enforces multi-tenancy at the database level, not application code.',
    icon: '🗄️',
  },
  Routing: {
    why: 'GraphHopper and OSRM provide open-source routing with no per-request API costs. Self-hostable for zero route query fees at scale.',
    perf: 'Route cache stores last 50 decisions in session memory. Cache TTL 5 minutes. Fallback to OSRM if GraphHopper is unavailable.',
    icon: '🗺️',
  },
  State: {
    why: 'Zustand is lightweight (1KB), fast, and supports localStorage persistence natively — perfect for fleet state that must survive page reloads.',
    perf: 'Single store with entity subscriptions. Selective re-renders ensure vehicles list updates do not trigger full dashboard re-render.',
    icon: '⚡',
  },
}

function SkillBar({ label, value, color, delay = 0 }) {
  const [ref, visible] = useIntersectionObserver()
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-slate-500">{value}%</span>
      </div>
      <div className="h-1.5 bg-apex-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: visible ? `${value}%` : '0%',
            backgroundColor: color,
            boxShadow: visible ? `0 0 8px ${color}60` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default function TechStackSection() {
  const [activeLayer, setActiveLayer] = useState('Frontend')

  const detail = STACK_DETAILS[activeLayer] || {}
  const stackItem = TECH_STACK.find(s => s.layer === activeLayer)

  return (
    <SectionWrapper id="tech-stack" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">Technology Stack</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">Best-in-Class Technology Choices</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Every technology choice was made deliberately — balancing performance, scalability, cost, and developer experience. Here's why each layer was built the way it was.
          </p>
        </div>

        {/* Stack grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {TECH_STACK.map(stack => (
            <button
              key={stack.layer}
              onClick={() => setActiveLayer(stack.layer)}
              className={`p-3 sm:p-4 rounded-xl border text-center transition-all duration-200 ${
                activeLayer === stack.layer
                  ? 'border-opacity-60 scale-105'
                  : 'bg-apex-card/40 border-apex-border/60 hover:border-slate-600'
              }`}
              style={activeLayer === stack.layer ? {
                backgroundColor: `${stack.color}10`,
                borderColor: `${stack.color}40`,
              } : {}}
            >
              <div className="text-2xl mb-2">{STACK_DETAILS[stack.layer]?.icon || '⚙️'}</div>
              <div className="text-xs font-bold text-white">{stack.layer}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stack.items.length} libs</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {stackItem && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="apex-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{detail.icon}</span>
                <div>
                  <div className="font-display font-bold text-white text-lg">{stackItem.layer}</div>
                  <div className="text-xs font-mono" style={{ color: stackItem.color }}>{stackItem.items.length} components</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-600 mb-2">WHY THIS TECHNOLOGY</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{detail.why}</p>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-600 mb-2">PERFORMANCE CHARACTERISTICS</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{detail.perf}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {stackItem.items.map(item => (
                  <span key={item} className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ backgroundColor: `${stackItem.color}10`, borderColor: `${stackItem.color}30`, color: stackItem.color }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance metrics */}
            <div className="apex-card p-6">
              <div className="text-xs font-mono text-slate-600 mb-4">PERFORMANCE METRICS</div>
              <div className="space-y-4">
                <SkillBar label="Build Performance" value={96} color={stackItem.color} delay={0} />
                <SkillBar label="Runtime Efficiency" value={91} color={stackItem.color} delay={100} />
                <SkillBar label="Developer Experience" value={94} color={stackItem.color} delay={200} />
                <SkillBar label="Scalability" value={97} color={stackItem.color} delay={300} />
                <SkillBar label="Community & Support" value={89} color={stackItem.color} delay={400} />
              </div>
              <div className="mt-6 pt-4 border-t border-apex-border/60">
                <div className="text-xs font-mono text-slate-600 mb-3">STACK ADVANTAGES</div>
                <div className="space-y-2">
                  {['Open-source — zero licensing costs', 'Active community, regular updates', 'Production-proven at enterprise scale', 'Replaceable via clean interfaces'].map(a => (
                    <div key={a} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: stackItem.color }} />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full stack table */}
        <div className="apex-card p-6">
          <div className="text-xs font-mono text-slate-500 mb-4">COMPLETE TECHNOLOGY INVENTORY</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACK.map(stack => (
              <div key={stack.layer} className="space-y-2">
                <div className="text-xs font-bold" style={{ color: stack.color }}>{stack.layer}</div>
                {stack.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: stack.color, opacity: 0.6 }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
