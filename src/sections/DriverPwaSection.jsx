import { useState, useEffect } from 'react'
import { ROUTE_STOPS, DRIVER_INSPECTION } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import SectionWrapper from '../components/SectionWrapper'

const SCREENS = ['route', 'inspection', 'navigation', 'ai-coach', 'messages']

// Phone frame wrapper
function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 320 }}>
      {/* Phone shell */}
      <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-slate-700 bg-apex-base shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-700 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="bg-apex-base overflow-hidden" style={{ height: 620 }}>
          {children}
        </div>
        {/* Home bar */}
        <div className="h-8 bg-apex-base flex items-center justify-center">
          <div className="w-20 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
      {/* Reflection */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
    </div>
  )
}

// Route sheet screen
function RouteScreen() {
  const [activeStop, setActiveStop] = useState(3)
  const now = new Date()

  return (
    <div className="h-full overflow-y-auto pt-6 pb-4">
      {/* Header */}
      <div className="px-4 py-3 border-b border-apex-border/60">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="font-display font-bold text-white text-sm">Route 42</div>
            <div className="text-xs text-slate-500">London Victoria → Oxford</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-bold text-cyan-400">{now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-xs text-slate-500">14:22 ETA</div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-apex-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '72%' }} />
          </div>
          <span className="text-xs font-mono text-cyan-400">72%</span>
        </div>
      </div>
      {/* Stops */}
      <div className="px-3 py-2 space-y-1">
        {ROUTE_STOPS.map((stop, i) => (
          <div
            key={stop.id}
            onClick={() => setActiveStop(i)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${activeStop === i ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/3'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                stop.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                stop.status === 'active' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {stop.status === 'completed' ? '✓' : stop.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium truncate ${stop.status === 'completed' ? 'text-slate-500 line-through' : stop.status === 'active' ? 'text-white' : 'text-slate-400'}`}>
                  {stop.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-600 font-mono">{stop.time}</span>
                  {stop.delay > 0 && <span className="text-xs text-amber-400">+{stop.delay}m</span>}
                  {stop.passengers && <span className="text-xs text-slate-600">{stop.passengers} pax</span>}
                </div>
              </div>
              <StatusBadge status={stop.status} size="xs" />
            </div>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="px-3 mt-3 grid grid-cols-3 gap-2">
        {['Report Issue', 'Request Break', 'AI Assist'].map((a, i) => (
          <button key={a} className={`py-2 px-1 rounded-lg text-xs font-medium border transition-all ${
            i === 2 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-apex-surface/60 border-apex-border/60 text-slate-400 hover:border-slate-500'
          }`}>{a}</button>
        ))}
      </div>
    </div>
  )
}

// Pre-trip inspection screen
function InspectionScreen() {
  const [checked, setChecked] = useState({})
  const totalItems = DRIVER_INSPECTION.reduce((acc, cat) => acc + cat.items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <div className="h-full overflow-y-auto pt-6 pb-4">
      <div className="px-4 py-3 border-b border-apex-border/60">
        <div className="font-display font-bold text-white text-sm">Pre-Trip Inspection</div>
        <div className="text-xs text-slate-500 mt-0.5">Vehicle AP3X-001 — {checkedCount}/{totalItems} items</div>
        <div className="mt-2 h-1.5 bg-apex-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${(checkedCount/totalItems)*100}%` }} />
        </div>
      </div>
      <div className="px-3 py-2 space-y-3">
        {DRIVER_INSPECTION.map(cat => (
          <div key={cat.category}>
            <div className="text-xs font-mono text-slate-600 px-1 mb-2">{cat.category.toUpperCase()}</div>
            <div className="space-y-1">
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`
                const isChecked = checked[key] !== undefined ? checked[key] : cat.completed[i]
                return (
                  <button key={key} onClick={() => setChecked(p => ({ ...p, [key]: !isChecked }))}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${isChecked ? 'bg-green-500/5 border border-green-500/15' : 'bg-apex-surface/40 border border-apex-border/40 hover:border-slate-600'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-green-500/20 border-green-500/50' : 'border-slate-600'}`}>
                      {isChecked && <span className="text-green-400 text-xs">✓</span>}
                    </div>
                    <span className={`text-xs ${isChecked ? 'text-green-300' : 'text-slate-300'}`}>{item}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {checkedCount === totalItems && (
        <div className="mx-3 mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
          <div className="text-green-400 text-sm font-bold">✓ Inspection Complete</div>
          <div className="text-xs text-green-300/70 mt-0.5">Safe to depart</div>
        </div>
      )}
    </div>
  )
}

// Navigation screen
function NavigationScreen() {
  const [step, setStep] = useState(0)
  const steps = [
    { icon: '↑', instruction: 'Continue straight on M40', distance: '4.2 km', time: '3 min' },
    { icon: '↗', instruction: 'Take exit 8A — Headington', distance: '1.1 km', time: '1 min' },
    { icon: '→', instruction: 'Turn right onto London Road', distance: '0.8 km', time: '2 min' },
    { icon: '↑', instruction: 'Arrive at Oxford City Centre', distance: '200 m', time: '1 min' },
  ]

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % steps.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-full flex flex-col pt-6">
      {/* Next turn */}
      <div className="px-4 py-3 bg-cyan-500/10 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold text-cyan-400">
            {steps[step].icon}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{steps[step].instruction}</div>
            <div className="text-xs text-cyan-300/70">{steps[step].distance} · {steps[step].time}</div>
          </div>
        </div>
      </div>
      {/* Map sim */}
      <div className="flex-1 relative bg-apex-surface/50 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <polyline points="40,280 80,260 120,240 160,200 200,180 240,160 270,80" fill="none" stroke="url(#routeLine)" strokeWidth="3" strokeLinecap="round" strokeDasharray="8,4" />
          {/* Vehicle position */}
          <circle cx="160" cy="200" r="8" fill="#22d3ee" />
          <circle cx="160" cy="200" r="16" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3">
            <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Destination */}
          <circle cx="270" cy="80" r="6" fill="#34d399" />
          <line x1="270" y1="74" x2="270" y2="60" stroke="#34d399" strokeWidth="2" />
        </svg>
        {/* Speed & heading */}
        <div className="absolute bottom-3 left-3 apex-glass rounded-lg px-3 py-2">
          <div className="font-mono text-xl font-bold text-white">62</div>
          <div className="text-xs text-slate-500">km/h</div>
        </div>
        <div className="absolute bottom-3 right-3 apex-glass rounded-lg px-3 py-2 text-right">
          <div className="font-mono text-xs font-bold text-green-400">ON TIME</div>
          <div className="text-xs text-slate-500">ETA 14:22</div>
        </div>
      </div>
      {/* Step list */}
      <div className="px-3 py-2 space-y-1 border-t border-apex-border/60">
        {steps.map((s, i) => (
          <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${i === step ? 'text-cyan-400' : i < step ? 'text-slate-600 line-through' : 'text-slate-400'}`}>
            <span className="font-mono w-4 text-center">{s.icon}</span>
            <span className="flex-1 truncate">{s.instruction}</span>
            <span className="font-mono text-xs opacity-70">{s.distance}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// AI Coach screen
function AICoachScreen() {
  const [messages] = useState([
    { role: 'ai', module: 'Apex Sentinel', text: 'You have been driving for 4h 12m. EU regulations require a 45-minute break within 18 minutes.', severity: 'warning' },
    { role: 'driver', text: 'Understood. Will take break at Oxford Thornhill P&R.' },
    { role: 'ai', module: 'Apex RouteMind', text: 'Good choice. Thornhill has facilities. Confirmed break location sent to fleet control.', severity: 'info' },
    { role: 'ai', module: 'Apex Predict', text: 'Weather advisory: Heavy rain forecast at 16:00. Return journey ETAs adjusted by +12 minutes.', severity: 'info' },
    { role: 'driver', text: 'Any congestion on the A34?' },
    { role: 'ai', module: 'Apex RouteMind', text: 'A34 is clear. Current M40 J8 has minor delays — recommending A34 exit 9 adds 2.1 miles but saves 9 minutes.', severity: 'success' },
  ])
  const [input, setInput] = useState('')

  return (
    <div className="h-full flex flex-col pt-6">
      <div className="px-4 py-2.5 border-b border-apex-border/60 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono font-bold text-cyan-400">AP3X AI COACH</span>
        <span className="text-xs text-slate-600 ml-auto">6 modules active</span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'driver' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'ai' ? (
              <div className={`max-w-[85%] rounded-2xl rounded-tl-sm px-3 py-2 text-xs ${
                m.severity === 'warning' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-100' :
                m.severity === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-100' :
                'bg-apex-card border border-apex-border text-slate-200'
              }`}>
                <div className="font-mono text-xs mb-1 opacity-60">{m.module}</div>
                {m.text}
              </div>
            ) : (
              <div className="max-w-[80%] bg-cyan-500/10 border border-cyan-500/20 rounded-2xl rounded-tr-sm px-3 py-2 text-xs text-cyan-100">
                {m.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-3 pb-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask AP3X AI..."
            className="flex-1 bg-apex-surface/60 border border-apex-border/60 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40"
          />
          <button className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-colors">
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}

// Messages screen
function MessagesScreen() {
  const msgs = [
    { from: 'Fleet Control', time: '13:48', text: 'Route 42 — passenger count confirmation required at Oxford Thornhill.', unread: true },
    { from: 'Depot Manager', time: '12:30', text: 'End of shift debrief at 17:30. Please confirm attendance.', unread: false },
    { from: 'AP3X System', time: '11:15', text: 'Pre-trip inspection submitted. All items cleared. Have a safe journey.', unread: false },
  ]
  return (
    <div className="h-full overflow-y-auto pt-6 pb-4">
      <div className="px-4 py-2.5 border-b border-apex-border/60">
        <div className="font-display font-bold text-white text-sm">Fleet Messages</div>
        <div className="text-xs text-slate-500">1 unread</div>
      </div>
      <div className="px-3 py-2 space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`p-3 rounded-lg border ${m.unread ? 'bg-cyan-500/5 border-cyan-500/15' : 'bg-apex-surface/40 border-apex-border/40'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold ${m.unread ? 'text-cyan-400' : 'text-slate-300'}`}>{m.from}</span>
              <span className="text-xs text-slate-600 font-mono">{m.time}</span>
            </div>
            <p className="text-xs text-slate-400">{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const SCREEN_COMPONENTS = {
  route: RouteScreen,
  inspection: InspectionScreen,
  navigation: NavigationScreen,
  'ai-coach': AICoachScreen,
  messages: MessagesScreen,
}

const SCREEN_LABELS = {
  route: 'Route Sheet',
  inspection: 'Pre-Trip',
  navigation: 'Navigation',
  'ai-coach': 'AI Coach',
  messages: 'Messages',
}

export default function DriverPwaSection() {
  const [activeScreen, setActiveScreen] = useState('route')
  const ScreenComponent = SCREEN_COMPONENTS[activeScreen]

  return (
    <SectionWrapper id="driver-demo" className="py-24 px-4 sm:px-6 bg-apex-surface/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">Driver PWA Demo</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">AP3X Driver Companion</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            A production-grade mobile PWA that equips drivers with digital route sheets, AI coaching, navigation, pre-trip inspections, and two-way fleet communication — all offline-capable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 justify-center">
          {/* Phone demo */}
          <div className="flex-shrink-0">
            <PhoneFrame>
              <ScreenComponent />
            </PhoneFrame>
            {/* Screen nav */}
            <div className="mt-6 flex gap-2 justify-center flex-wrap">
              {SCREENS.map(s => (
                <button key={s} onClick={() => setActiveScreen(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    activeScreen === s
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-apex-card/60 border-apex-border/60 text-slate-500 hover:text-slate-300'
                  }`}>
                  {SCREEN_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Feature list */}
          <div className="max-w-md w-full">
            <h3 className="font-display font-bold text-xl text-white mb-6">Driver Intelligence Features</h3>
            <div className="space-y-4">
              {[
                { title: 'Digital Route Sheets', desc: 'Stop-by-stop schedule with passenger counts, delay tracking, and accessibility info.', icon: '🗺️', active: activeScreen === 'route' },
                { title: 'Pre-Trip Inspection', desc: 'Checklist-driven vehicle inspection with photo capture and digital sign-off.', icon: '🔍', active: activeScreen === 'inspection' },
                { title: 'OSM/OSRM Navigation', desc: 'Live GPS navigation with turn-by-turn instructions, hazard alerts, and offline maps.', icon: '🧭', active: activeScreen === 'navigation' },
                { title: 'Apex AI Coach', desc: 'Real-time safety coaching, fatigue monitoring, route optimisation tips, and fleet chat.', icon: '🤖', active: activeScreen === 'ai-coach' },
                { title: 'EU Compliance Tracking', desc: '4.5h driving limit monitoring, automated break reminders, tachograph support.', icon: '⏱️', active: false },
                { title: 'Harsh Event Detection', desc: 'DeviceMotion-based braking, acceleration, and cornering event detection.', icon: '⚡', active: false },
                { title: 'Offline-First Architecture', desc: 'Fully functional without internet. IndexedDB sync queue replays when reconnected.', icon: '📡', active: false },
                { title: 'Fleet Messaging', desc: 'Two-way encrypted messaging with fleet control via BroadcastChannel + Supabase.', icon: '💬', active: activeScreen === 'messages' },
              ].map(f => (
                <div key={f.title} onClick={() => {
                  if (f.title === 'Digital Route Sheets') setActiveScreen('route')
                  else if (f.title === 'Pre-Trip Inspection') setActiveScreen('inspection')
                  else if (f.title === 'OSM/OSRM Navigation') setActiveScreen('navigation')
                  else if (f.title === 'Apex AI Coach') setActiveScreen('ai-coach')
                  else if (f.title === 'Fleet Messaging') setActiveScreen('messages')
                }}
                  className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    f.active ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-apex-card/40 border-apex-border/40 hover:border-slate-600'
                  }`}
                >
                  <div className="text-xl flex-shrink-0">{f.icon}</div>
                  <div>
                    <div className={`font-semibold text-sm ${f.active ? 'text-cyan-400' : 'text-white'}`}>{f.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
