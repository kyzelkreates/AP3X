import { useState } from 'react'
import { VERTICALS } from '../data/mockData'
import SectionWrapper from '../components/SectionWrapper'

const VERTICAL_DETAILS = {
  coach: {
    features: ['Long-distance route planning', 'Motorway driving compliance', 'Passenger manifest management', 'Rest stop scheduling', 'Cross-border EU compliance'],
    metrics: { vehicles: '12–250', drivers: '20–400', routes: 'National' },
    example: 'National Express, FlixBus, Megabus-scale operators',
  },
  bus: {
    features: ['Real-time schedule adherence', 'Passenger count tracking', 'Depot-to-depot control', 'Driver duty management', 'Live disruption management'],
    metrics: { vehicles: '50–2000', drivers: '100–3000', routes: 'Urban/Suburban' },
    example: 'Local authority, private bus companies',
  },
  school: {
    features: ['Safeguarding compliance', 'Student check-in/out', 'Parent notifications', 'Route risk assessments', 'SEND accessibility tracking'],
    metrics: { vehicles: '5–100', drivers: '10–150', routes: 'Local' },
    example: 'LA school transport, SEND specialists',
  },
  airport: {
    features: ['Airside operational permits', 'Flight-linked schedule updates', 'Security compliance checks', 'Baggage capacity management', 'Terminal routing'],
    metrics: { vehicles: '10–80', drivers: '20–120', routes: 'Airport' },
    example: 'Airport authority ground transport, hotel shuttles',
  },
  emergency: {
    features: ['Patient transport workflows', 'Hospital appointment syncing', 'Accessibility equipment tracking', 'NHS compliance reporting', 'Priority routing'],
    metrics: { vehicles: '5–200', drivers: '10–300', routes: 'Regional' },
    example: 'NHS patient transport, private medical services',
  },
  logistics: {
    features: ['Delivery run management', 'Proof of delivery capture', 'Route density optimisation', 'Return load scheduling', 'Customer ETA notifications'],
    metrics: { vehicles: '10–500', drivers: '15–600', routes: 'Regional/National' },
    example: 'Last-mile delivery, field service fleets',
  },
  utility: {
    features: ['Engineer dispatch', 'Equipment load tracking', 'Job completion workflows', 'Site access management', 'Workforce time compliance'],
    metrics: { vehicles: '20–400', drivers: '30–500', routes: 'National' },
    example: 'Energy, telecoms, water utility fleets',
  },
  events: {
    features: ['Event timetable integration', 'Surge capacity management', 'Crowd dispersal routing', 'Contactless ticketing sync', 'Multi-venue coordination'],
    metrics: { vehicles: '5–150', drivers: '10–200', routes: 'Event-specific' },
    example: 'Stadium, festival, racecourse operators',
  },
}

const COLOR_CLASSES = {
  cyan:   { border: 'border-cyan-500/30',   bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   glow: 'shadow-glow-cyan'   },
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-500/10',   text: 'text-blue-400',   glow: 'shadow-glow-cyan'   },
  amber:  { border: 'border-amber-500/30',  bg: 'bg-amber-500/10',  text: 'text-amber-400',  glow: 'shadow-glow-amber'  },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'shadow-glow-purple' },
  red:    { border: 'border-red-500/30',    bg: 'bg-red-500/10',    text: 'text-red-400',    glow: 'shadow-glow-red'    },
  green:  { border: 'border-green-500/30',  bg: 'bg-green-500/10',  text: 'text-green-400',  glow: 'shadow-glow-green'  },
}

export default function VerticalsSection() {
  const [activeVertical, setActiveVertical] = useState('coach')
  const active = VERTICALS.find(v => v.id === activeVertical)
  const detail = VERTICAL_DETAILS[activeVertical]
  const c = COLOR_CLASSES[active?.color] || COLOR_CLASSES.cyan

  return (
    <SectionWrapper id="verticals" className="py-24 px-4 sm:px-6 bg-apex-surface/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">Platform Modularity</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">One Core. Eight Verticals.</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            The AP3X core engine is transport-agnostic. The same AI intelligence, compliance engine, and fleet control platform can be deployed across radically different transport verticals — each with specialised feature sets.
          </p>
        </div>

        {/* Vertical cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {VERTICALS.map(v => {
            const vc = COLOR_CLASSES[v.color] || COLOR_CLASSES.cyan
            const isActive = activeVertical === v.id
            return (
              <button
                key={v.id}
                onClick={() => setActiveVertical(v.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isActive ? `${vc.bg} ${vc.border} ${vc.glow}` : 'bg-apex-card/40 border-apex-border/60 hover:border-slate-600'
                }`}
              >
                <div className="text-2xl mb-2">{v.icon}</div>
                <div className={`text-sm font-bold ${isActive ? vc.text : 'text-slate-300'}`}>{v.label}</div>
                <div className="text-xs text-slate-600 mt-0.5 leading-snug">{v.desc}</div>
              </button>
            )
          })}
        </div>

        {/* Detail panel */}
        {active && detail && (
          <div className={`${c.bg} border ${c.border} rounded-2xl p-6 sm:p-8 transition-all duration-300`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{active.icon}</span>
                  <div>
                    <h3 className={`font-display font-bold text-xl ${c.text}`}>{active.label}</h3>
                    <p className="text-sm text-slate-500">{detail.example}</p>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-600 mb-3">SPECIALISED FEATURES</div>
                <div className="space-y-2">
                  {detail.features.map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.text.replace('text-','bg-')}`} />
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-600 mb-3">TYPICAL DEPLOYMENT SCALE</div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Vehicles', value: detail.metrics.vehicles },
                    { label: 'Drivers', value: detail.metrics.drivers },
                    { label: 'Network', value: detail.metrics.routes },
                  ].map(m => (
                    <div key={m.label} className="apex-card p-3 text-center">
                      <div className={`font-mono text-sm font-bold ${c.text}`}>{m.value}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="apex-card p-4">
                  <div className="text-xs font-mono text-slate-600 mb-3">CORE MODULES ACTIVE</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Fleet Control', 'Driver PWA', 'AI Orchestrator', 'Compliance', 'Analytics', 'Real-time Sync'].map(mod => (
                      <span key={mod} className={`text-xs px-2 py-0.5 rounded-full border ${c.bg} ${c.border} ${c.text}`}>{mod}</span>
                    ))}
                  </div>
                </div>
                <div className="apex-card p-4">
                  <div className="text-xs font-mono text-slate-600 mb-2">DEPLOYMENT TIME</div>
                  <div className={`font-mono text-2xl font-bold ${c.text}`}>2–4 weeks</div>
                  <div className="text-xs text-slate-500">from contract to live operations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core platform pitch */}
        <div className="mt-10 apex-card p-6 text-center">
          <div className="text-xs font-mono text-slate-600 mb-3">THE AP3X MODULARITY ADVANTAGE</div>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Unlike vertical-specific software, AP3X is built as a horizontal platform. Core intelligence modules are shared across all verticals. Vertical-specific workflows are additive modules — not forks. This means one codebase, one support overhead, and continuous improvements that benefit every deployment.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
