import SectionWrapper from '../components/SectionWrapper'
import { useAnimatedCounter, useIntersectionObserver } from '../hooks/useAnimatedCounter'

function AnimatedStat({ value, suffix = '', label, sub, color = 'text-cyan-400', delay = 0 }) {
  const [ref, visible] = useIntersectionObserver(0.3)
  const count = visible ? value : 0
  const animated = useAnimatedCounter(count, 1800, delay)

  return (
    <div ref={ref} className="text-center">
      <div className={`font-mono text-4xl sm:text-5xl font-bold ${color}`}>
        {animated}{suffix}
      </div>
      <div className="font-semibold text-white text-sm mt-2">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
  )
}

export default function InvestorSection() {
  return (
    <SectionWrapper id="investor" className="py-24 px-4 sm:px-6 bg-apex-surface/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-3">Enterprise & Investment</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">A Platform Built for Commercial Scale</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            AP3X is not a one-off tool — it's a scalable SaaS platform with a repeatable go-to-market model, strong unit economics, and a deep technical moat across eight transport verticals.
          </p>
        </div>

        {/* Big stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <AnimatedStat value={8} suffix="x" label="Addressable Verticals" sub="Coach, bus, school, airport…" color="text-cyan-400" delay={0} />
          <AnimatedStat value={31} suffix="%" label="Fuel Cost Reduction" sub="Demonstrated average saving" color="text-green-400" delay={150} />
          <AnimatedStat value={4} suffix=".2mo" label="ROI Payback" sub="Average for mid-size fleets" color="text-amber-400" delay={300} />
          <AnimatedStat value={99} suffix=".9%" label="Platform Uptime" sub="Supabase SLA" color="text-purple-400" delay={450} />
        </div>

        {/* Commercial model */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '💰',
              title: 'SaaS Revenue Model',
              color: 'green',
              points: [
                'Per-vehicle monthly subscription (£25–£65/vehicle/mo)',
                'Per-driver seat fee for PWA module',
                'AI credits for advanced prediction modules',
                'Enterprise tier: custom integrations, SLA, white-label',
                'Implementation & onboarding professional services',
              ]
            },
            {
              icon: '🏢',
              title: 'Enterprise Deployment',
              color: 'blue',
              points: [
                'Multi-tenant architecture — one platform, infinite operators',
                '2–4 week deployment cycle from contract to live',
                'White-label options for large operators',
                'API marketplace for third-party integrations',
                'Self-hosted option for data-sensitive clients',
              ]
            },
            {
              icon: '📈',
              title: 'Market Opportunity',
              color: 'purple',
              points: [
                '£4.2B UK coach & bus fleet management market',
                '65,000+ licensed PSV operators in UK alone',
                'EU transport software market: €12B by 2027',
                'AI fleet management CAGR: 18.4% through 2030',
                'Strong regulatory tailwinds (UK DVSA digitisation)',
              ]
            },
          ].map(card => {
            const colorMap = {
              green: { border: 'border-green-500/20', bg: 'bg-green-500/5', text: 'text-green-400', dot: 'bg-green-400' },
              blue:  { border: 'border-blue-500/20',  bg: 'bg-blue-500/5',  text: 'text-blue-400',  dot: 'bg-blue-400'  },
              purple:{ border: 'border-purple-500/20',bg: 'bg-purple-500/5',text: 'text-purple-400',dot: 'bg-purple-400' },
            }
            const c = colorMap[card.color]
            return (
              <div key={card.title} className={`${c.bg} border ${c.border} rounded-2xl p-6`}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className={`font-display font-bold text-lg ${c.text} mb-4`}>{card.title}</h3>
                <div className="space-y-2.5">
                  {card.points.map(p => (
                    <div key={p} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                      <span className="text-xs text-slate-400 leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical moat */}
        <div className="apex-card p-6 sm:p-8 mb-8">
          <div className="section-label mb-4">Technical Moat</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'AI Orchestration Engine', desc: 'Multi-provider routing with automatic fallback — no AI vendor lock-in. 68% decision cache hit rate.', icon: '🧠' },
              { title: 'Offline-First PWA', desc: 'Drivers operate fully offline. IndexedDB sync queue. 0% data loss in connectivity gaps.', icon: '📡' },
              { title: 'Open-Source Routing', desc: 'GraphHopper/OSRM — zero per-query routing costs. Self-hostable. No Google Maps dependency.', icon: '🗺️' },
              { title: 'Driver Intelligence', desc: 'EU 4.5h compliance, DeviceMotion events, fatigue detection — purpose-built for PSV regulations.', icon: '🛡️' },
            ].map(m => (
              <div key={m.title} className="p-4 bg-apex-surface/50 rounded-xl border border-apex-border/60">
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{m.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.06) 50%, rgba(167,139,250,0.08) 100%)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(34,211,238,0.15)' }}>
          {/* BG glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="section-label mb-4">Ready to Deploy</div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              AP3X is production-ready.<br />
              <span className="text-neon-cyan">Your fleet could be live in 2 weeks.</span>
            </h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto mb-8">
              Whether you're an operator looking to modernise, an investor evaluating the platform, or an enterprise exploring procurement — we're ready to demo the full system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary py-3 px-8 text-sm">Request Enterprise Demo</button>
              <button className="btn-ghost py-3 px-8 text-sm">Download Technical Brief</button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
