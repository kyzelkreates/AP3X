import { useState, useEffect } from 'react'
import { AI_PREDICTIONS } from '../data/mockData'
import SectionWrapper from '../components/SectionWrapper'

const AI_MODULES = [
  {
    id: 'sentinel',
    name: 'Apex Sentinel',
    tagline: 'Driver Safety AI',
    icon: '🛡️',
    color: 'red',
    borderColor: 'border-red-500/20',
    bgColor: 'bg-red-500/5',
    textColor: 'text-red-400',
    desc: 'Real-time driver behaviour monitoring. Detects fatigue, harsh events, speeding, and distraction. Generates live safety scores and escalation alerts.',
    metrics: [
      { label: 'Fatigue Detection', value: '99.2%', sub: 'accuracy' },
      { label: 'Events/Hour', value: '847', sub: 'monitored' },
      { label: 'Response Time', value: '<200ms', sub: 'alert latency' },
    ],
    capabilities: ['EU 4.5h compliance tracking', 'DeviceMotion harsh events', 'Behavioural pattern learning', 'Escalation to fleet control', 'Per-driver risk scoring'],
  },
  {
    id: 'routemind',
    name: 'Apex RouteMind',
    tagline: 'Route Intelligence AI',
    icon: '🧭',
    color: 'purple',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
    textColor: 'text-purple-400',
    desc: 'Dynamic route optimisation engine. Analyses traffic, weather, passenger load, and vehicle constraints to select optimal routes in real time.',
    metrics: [
      { label: 'Avg Time Saved', value: '9.4 min', sub: 'per route' },
      { label: 'Fuel Efficiency', value: '+18%', sub: 'improvement' },
      { label: 'Alternatives', value: '3', sub: 'routes scored' },
    ],
    capabilities: ['GraphHopper/OSRM integration', 'Live congestion avoidance', 'Driver preference learning', 'Weather disruption adaptation', 'ETA recalculation'],
  },
  {
    id: 'predict',
    name: 'Apex Predict',
    tagline: 'Predictive Analytics AI',
    icon: '📈',
    color: 'amber',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    textColor: 'text-amber-400',
    desc: 'Forward-looking fleet intelligence. Predicts maintenance needs, delay probabilities, weather disruptions, and operational anomalies before they occur.',
    metrics: [
      { label: 'Prediction Accuracy', value: '91%', sub: 'maintenance' },
      { label: 'Cost Savings', value: '£84K', sub: 'annual avg' },
      { label: 'Lead Time', value: '12 days', sub: 'maintenance' },
    ],
    capabilities: ['Brake/engine wear prediction', 'Delay probability modelling', 'Weather disruption forecasting', 'Fleet anomaly detection', 'Cost optimisation reports'],
  },
  {
    id: 'compliance',
    name: 'Apex Compliance',
    tagline: 'Regulatory Intelligence',
    icon: '📋',
    color: 'green',
    borderColor: 'border-green-500/20',
    bgColor: 'bg-green-500/5',
    textColor: 'text-green-400',
    desc: 'Automated UK/EU fleet regulatory compliance monitoring. Tracks tachograph obligations, licensing, vehicle certification, and driver hours.',
    metrics: [
      { label: 'Regulations Tracked', value: '240+', sub: 'UK/EU rules' },
      { label: 'Auto-Reminders', value: '14', sub: 'active alerts' },
      { label: 'Compliance Rate', value: '98.4%', sub: 'fleet-wide' },
    ],
    capabilities: ['UK DVSA compliance', 'EU Regulation 561/2006', 'Tachograph management', 'MOT/PSV certification', 'Operator licence monitoring'],
  },
  {
    id: 'efficiency',
    name: 'Apex Efficiency',
    tagline: 'Fleet Optimisation AI',
    icon: '⚡',
    color: 'cyan',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    textColor: 'text-cyan-400',
    desc: 'Holistic fleet efficiency engine. Analyses fuel consumption, driver behaviour, route selection, and depot utilisation to maximise operational ROI.',
    metrics: [
      { label: 'Fuel Reduction', value: '31%', sub: 'avg saving' },
      { label: 'Idle Time', value: '-42%', sub: 'reduced' },
      { label: 'ROI Period', value: '4.2 mo', sub: 'payback' },
    ],
    capabilities: ['Real-time fuel monitoring', 'Idle time reduction alerts', 'Driver eco-coaching', 'Depot scheduling optimisation', 'Fleet utilisation analytics'],
  },
  {
    id: 'orchestrator',
    name: 'AI Orchestrator',
    tagline: 'Master Decision Layer',
    icon: '🧠',
    color: 'blue',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    textColor: 'text-blue-400',
    desc: 'Central coordination layer that routes requests across all AI modules, manages fallbacks, caches decisions, and provides unified intelligence output.',
    metrics: [
      { label: 'Decision Latency', value: '340ms', sub: 'avg orchestrated' },
      { label: 'Fallback Rate', value: '0.3%', sub: 'provider switches' },
      { label: 'Cache Hit Rate', value: '68%', sub: 'route decisions' },
    ],
    capabilities: ['Multi-provider AI routing', 'Automatic fallback chains', 'Decision result caching', 'Graceful degradation', 'Offline mode support'],
  },
]

// Animated AI processing visualization
function AIProcessViz({ module, active }) {
  const [pulseIndex, setPulseIndex] = useState(0)
  const nodes = ['INPUT', 'PROCESS', 'ANALYSE', 'DECIDE', 'OUTPUT']

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setPulseIndex(i => (i + 1) % nodes.length), 600)
    return () => clearInterval(id)
  }, [active])

  const colorMap = { red: '#f87171', purple: '#a78bfa', amber: '#fbbf24', green: '#34d399', cyan: '#22d3ee', blue: '#3b82f6' }
  const color = colorMap[module.color]

  return (
    <div className="flex items-center gap-1 my-3">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-1 flex-1">
          <div
            className={`flex-1 h-1.5 rounded-full transition-all duration-300`}
            style={{
              backgroundColor: i <= pulseIndex ? color : '#1a2035',
              opacity: i <= pulseIndex ? (i === pulseIndex ? 1 : 0.4) : 0.2,
              boxShadow: i === pulseIndex ? `0 0 8px ${color}80` : 'none',
            }}
          />
          {i < nodes.length - 1 && (
            <div className={`w-1 h-1 rounded-full transition-all duration-300`} style={{ backgroundColor: i < pulseIndex ? color : '#1a2035', opacity: i < pulseIndex ? 0.6 : 0.2 }} />
          )}
        </div>
      ))}
    </div>
  )
}

// Live prediction card
function PredictionCard({ pred }) {
  const colors = {
    critical: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    high:     { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    medium:   { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    low:      { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  }
  const c = colors[pred.impact] || colors.medium

  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-slate-500">{pred.module}</span>
            <span className={`text-xs font-bold ${c.text}`}>{pred.type}</span>
          </div>
          <div className="text-sm font-medium text-white">{pred.prediction}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`font-mono text-lg font-bold ${c.text}`}>{pred.confidence}%</div>
          <div className="text-xs text-slate-600">confidence</div>
        </div>
      </div>
      <div className="h-1 bg-apex-border rounded-full overflow-hidden mb-3">
        <div className={`h-full rounded-full transition-all duration-1000`} style={{ width: `${pred.confidence}%`, backgroundColor: c.text.replace('text-', '') === 'red-400' ? '#f87171' : c.text.includes('amber') ? '#fbbf24' : c.text.includes('green') ? '#34d399' : '#fbbf24' }} />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          {pred.daysOut === 0 ? 'Now' : `In ${pred.daysOut} days`} · {pred.vehicle || pred.driver || pred.route || 'Fleet-wide'}
        </div>
        <div className="text-xs font-mono text-cyan-400 cursor-pointer hover:text-cyan-300">→ {pred.action}</div>
      </div>
    </div>
  )
}

export default function AiOpsSection() {
  const [activeModule, setActiveModule] = useState('sentinel')
  const active = AI_MODULES.find(m => m.id === activeModule)

  return (
    <SectionWrapper id="ai-ops" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">AI Operations Center</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">Six-Module AI Ecosystem</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            AP3X deploys six specialized AI modules coordinated by a master orchestrator. Each module handles a specific intelligence domain — together they form a complete operational brain for your fleet.
          </p>
        </div>

        {/* Module selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {AI_MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                activeModule === m.id
                  ? `${m.bgColor} ${m.borderColor} ${m.textColor}`
                  : 'bg-apex-card/40 border-apex-border/60 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              <div className="text-xl mb-1">{m.icon}</div>
              <div className="text-xs font-bold leading-tight">{m.name.replace('Apex ', '')}</div>
            </button>
          ))}
        </div>

        {/* Module detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className={`${active.bgColor} border ${active.borderColor} rounded-2xl p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl ${active.bgColor} border ${active.borderColor} flex items-center justify-center text-2xl`}>{active.icon}</div>
              <div>
                <div className={`font-display font-bold text-lg ${active.textColor}`}>{active.name}</div>
                <div className="text-xs text-slate-500 font-mono">{active.tagline}</div>
              </div>
              <div className={`ml-auto flex items-center gap-1.5 text-xs font-mono ${active.textColor}`}>
                <div className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
                ACTIVE
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{active.desc}</p>
            <AIProcessViz module={active} active={true} />
            <div className="grid grid-cols-3 gap-3">
              {active.metrics.map(m => (
                <div key={m.label} className="apex-card p-3 text-center">
                  <div className={`font-mono text-lg font-bold ${active.textColor}`}>{m.value}</div>
                  <div className="text-xs text-slate-500">{m.label}</div>
                  <div className="text-xs text-slate-600">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-600 mb-3">MODULE CAPABILITIES</div>
            {active.capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-3 p-3 apex-card/60 rounded-lg hover:bg-apex-card transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 ${active.textColor}`} />
                <span className="text-sm text-slate-300">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live predictions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-label mb-1">Live Intelligence Feed</div>
              <div className="text-xl font-display font-bold text-white">AI Prediction Stream</div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_PREDICTIONS.map(p => <PredictionCard key={p.id} pred={p} />)}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
