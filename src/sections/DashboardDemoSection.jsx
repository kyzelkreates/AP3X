import { useState, useEffect } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FLEET_VEHICLES, DRIVERS, AI_ALERTS, FLEET_METRICS, TELEMETRY_STREAM } from '../data/mockData'
import { useLiveTelemetry } from '../hooks/useLiveTelemetry'
import StatusBadge from '../components/StatusBadge'
import SectionWrapper from '../components/SectionWrapper'

// Live clock
function LiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id) }, [])
  return (
    <div className="text-right">
      <div className="font-mono text-xl font-bold text-white tabular-nums">{time.toLocaleTimeString('en-GB', { hour12: false })}</div>
      <div className="text-xs text-slate-500">{time.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
    </div>
  )
}

// KPI card
function KpiCard({ label, value, sub, color, pulse }) {
  return (
    <div className={`apex-card p-4 border-l-2 ${color} relative overflow-hidden`}>
      {pulse && <div className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-current animate-pulse ${color.replace('border-l-', 'text-').split(' ')[0]}`} />}
      <div className="text-xs text-slate-500 font-medium mb-1">{label}</div>
      <div className="font-mono text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
  )
}

// Fleet map (SVG-based simulation)
function FleetMap({ vehicles }) {
  const UK_BOUNDS = { minLat: 50.5, maxLat: 56, minLng: -4.5, maxLng: 2 }
  const project = (lat, lng) => {
    const x = ((lng - UK_BOUNDS.minLng) / (UK_BOUNDS.maxLng - UK_BOUNDS.minLng)) * 100
    const y = ((UK_BOUNDS.maxLat - lat) / (UK_BOUNDS.maxLat - UK_BOUNDS.minLat)) * 100
    return { x, y }
  }

  const statusColors = { active: '#22d3ee', idle: '#475569', maintenance: '#fbbf24' }

  return (
    <div className="relative w-full h-64 bg-apex-base rounded-lg overflow-hidden border border-apex-border/60">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" style={{ animation: 'scanLine 5s linear infinite' }} />
      </div>
      {/* UK outline (simplified) */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points="35,80 30,70 25,50 28,30 35,15 45,8 48,12 50,8 52,10 55,5 58,10 60,15 62,12 65,18 62,25 60,30 55,35 58,40 55,50 50,55 48,60 45,65 42,70 40,80" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
      </svg>
      {/* Vehicle nodes */}
      {vehicles.map(v => {
        const { x, y } = project(v.lat, v.lng)
        const color = statusColors[v.status] || '#475569'
        return (
          <div key={v.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={{ left: `${x}%`, top: `${y}%` }}>
            <div className="relative">
              {v.status === 'active' && (
                <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping opacity-30" style={{ backgroundColor: color }} />
              )}
              <div className="w-3 h-3 rounded-full border-2 border-apex-base" style={{ backgroundColor: color }} />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 apex-glass rounded-lg p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <div className="font-mono font-bold text-white">{v.reg}</div>
              <div className="text-slate-400 truncate">{v.route.split('—')[0]}</div>
              <div className="text-cyan-400">{v.speed > 0 ? `${v.speed} km/h` : 'Stationary'}</div>
            </div>
          </div>
        )
      })}
      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1">
        {Object.entries(statusColors).map(([s, c]) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
            <span className="text-xs text-slate-500 capitalize">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Vehicle row
function VehicleRow({ v }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/3 transition-colors border border-transparent hover:border-apex-border/40">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${v.status === 'active' ? 'bg-green-400 animate-pulse' : v.status === 'maintenance' ? 'bg-amber-400' : 'bg-slate-500'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-cyan-400">{v.reg}</span>
          <span className="text-xs text-slate-500 truncate hidden sm:block">{v.driver}</span>
        </div>
        <div className="text-xs text-slate-600 truncate">{v.route.split('—')[1] || v.route}</div>
      </div>
      <div className="text-right flex-shrink-0">
        {v.speed > 0 ? (
          <div className="font-mono text-xs text-white">{v.speed} <span className="text-slate-500">km/h</span></div>
        ) : (
          <div className="font-mono text-xs text-slate-500">Stopped</div>
        )}
        <div className="text-xs text-slate-600">{v.fuel}% fuel</div>
      </div>
    </div>
  )
}

// AI Alert card
function AlertCard({ alert }) {
  const colors = {
    warning: { border: 'border-l-amber-400', icon: 'text-amber-400', bg: 'bg-amber-500/5' },
    alert:   { border: 'border-l-red-400',   icon: 'text-red-400',   bg: 'bg-red-500/5' },
    info:    { border: 'border-l-cyan-400',  icon: 'text-cyan-400',  bg: 'bg-cyan-500/5' },
  }
  const c = colors[alert.severity] || colors.info
  const mins = Math.round((Date.now() - alert.timestamp) / 60000)

  return (
    <div className={`${c.bg} border-l-2 ${c.border} rounded-r-lg px-3 py-2.5`}>
      <div className="flex items-start gap-2">
        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.icon.replace('text-', 'bg-')} ${alert.severity === 'alert' ? 'animate-pulse' : ''}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs font-mono font-bold ${c.icon}`}>{alert.module}</span>
            <span className="text-xs text-slate-600">{mins}m ago</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
        </div>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="apex-glass rounded-lg p-3 text-xs">
      <div className="font-mono text-slate-400 mb-1">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="font-mono" style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

export default function DashboardDemoSection() {
  const { vehicles, metrics } = useLiveTelemetry()
  const [activeTab, setActiveTab] = useState('fleet')

  return (
    <SectionWrapper id="dashboard-demo" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="section-label mb-3">Live Demo</div>
            <h2 className="section-title text-3xl sm:text-4xl mb-2">Fleet Control Dashboard</h2>
            <p className="text-slate-500 text-sm max-w-xl">Real-time operational command center with live vehicle telemetry, AI alerts, and fleet analytics. All data streams are live-simulated.</p>
          </div>
          <LiveClock />
        </div>

        {/* Demo frame */}
        <div className="apex-glass rounded-2xl overflow-hidden border border-cyan-500/10">
          {/* Top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-apex-border/60 bg-apex-surface/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-apex-base/80 rounded-md px-4 py-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-500">ap3x.fleet/command — AP3X Intelligent Fleet OS</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-mono text-xs text-green-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 sm:p-6 bg-apex-base/60 grid grid-cols-1 xl:grid-cols-3 gap-4">

            {/* Left col: KPIs + map */}
            <div className="xl:col-span-2 space-y-4">
              {/* KPI row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <KpiCard label="Active Vehicles" value={`${vehicles.filter(v=>v.status==='active').length}/6`} sub="on route now" color="border-l-cyan-400" pulse />
                <KpiCard label="On-Time Rate" value={`${Math.round(metrics.onTime)}%`} sub="last 7 days" color="border-l-green-400" />
                <KpiCard label="AI Alerts" value={AI_ALERTS.length} sub="2 require action" color="border-l-amber-400" pulse />
                <KpiCard label="Fleet Efficiency" value={`${Math.round(metrics.efficiency)}%`} sub="vs. baseline" color="border-l-purple-400" />
              </div>

              {/* Map */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-500">LIVE FLEET MAP — UK OPERATIONS</span>
                  <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    GPS ACTIVE
                  </div>
                </div>
                <FleetMap vehicles={vehicles} />
              </div>

              {/* Chart */}
              <div>
                <div className="text-xs font-mono text-slate-500 mb-3">WEEKLY PERFORMANCE — EFFICIENCY vs ON-TIME RATE</div>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={FLEET_METRICS}>
                      <defs>
                        <linearGradient id="effGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="otGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#1a2035" strokeDasharray="4,4" />
                      <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[75, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="efficiency" name="Efficiency" stroke="#22d3ee" fill="url(#effGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="onTime" name="On-Time" stroke="#34d399" fill="url(#otGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right col: vehicle list + alerts */}
            <div className="space-y-4">
              {/* Tabs */}
              <div className="flex rounded-lg bg-apex-surface/50 p-1 gap-1">
                {['fleet', 'alerts', 'drivers'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-all capitalize ${activeTab === tab ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                  >{tab}</button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'fleet' && (
                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-600 px-3 mb-2">VEHICLE TELEMETRY</div>
                  {vehicles.map(v => <VehicleRow key={v.id} v={v} />)}
                </div>
              )}

              {activeTab === 'alerts' && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-600 px-1 mb-2">AI INTELLIGENCE ALERTS</div>
                  {AI_ALERTS.map(a => <AlertCard key={a.id} alert={a} />)}
                </div>
              )}

              {activeTab === 'drivers' && (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-600 px-1 mb-2">DRIVER STATUS</div>
                  {DRIVERS.map(d => (
                    <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/3 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-apex-border flex items-center justify-center">
                        <span className="text-xs font-bold text-cyan-400">{d.name.split(' ').map(n=>n[0]).join('')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate">{d.name}</div>
                        <div className="text-xs text-slate-500">{d.hours}h driving · Score {d.score}</div>
                      </div>
                      <StatusBadge status={d.status} size="xs" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
