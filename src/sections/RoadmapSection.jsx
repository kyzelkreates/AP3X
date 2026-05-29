import { ROADMAP } from '../data/mockData'
import SectionWrapper from '../components/SectionWrapper'

export default function RoadmapSection() {
  return (
    <SectionWrapper id="roadmap" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label mb-3">Future Roadmap</div>
          <h2 className="section-title text-3xl sm:text-4xl mb-4">The Road Ahead</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            AP3X is a living platform with a clear technical vision. From autonomous vehicle integration to smart city APIs and global EV fleet management — here's what's coming.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {ROADMAP.map((item, i) => (
              <div key={item.phase} className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Content */}
                <div className="flex-1">
                  <div className={`apex-card p-5 border transition-all hover:border-slate-600 ${item.status === 'in_progress' ? 'border-cyan-500/20 bg-cyan-500/3' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-slate-500">{item.phase}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            item.status === 'in_progress'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'bg-slate-800/60 text-slate-500 border border-slate-700/50'
                          }`}>
                            {item.status === 'in_progress' ? '● In Progress' : 'Planned'}
                          </span>
                        </div>
                        <div className="font-display font-bold text-white text-base mb-1">{item.title}</div>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center node (desktop) */}
                <div className="hidden sm:flex flex-shrink-0 w-0 items-center justify-center relative">
                  <div className={`w-3 h-3 rounded-full absolute ${item.status === 'in_progress' ? 'bg-cyan-400 shadow-glow-cyan animate-pulse' : 'bg-slate-600'}`} />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
