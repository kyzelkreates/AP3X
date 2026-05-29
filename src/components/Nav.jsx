import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'dashboard-demo', label: 'Fleet Demo' },
  { id: 'driver-demo', label: 'Driver PWA' },
  { id: 'ai-ops', label: 'AI Systems' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'verticals', label: 'Verticals' },
  { id: 'investor', label: 'Invest' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.3 }
    )
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'apex-glass-heavy border-b border-apex-border/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
              <span className="font-mono font-bold text-sm text-cyan-400">AP</span>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm leading-none">AP3X</div>
            <div className="font-mono text-xs text-cyan-500/70 leading-none mt-0.5">Fleet OS</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('dashboard-demo')}
            className="btn-ghost text-xs py-2 px-4"
          >
            Live Demo
          </button>
          <button
            onClick={() => scrollTo('investor')}
            className="btn-primary text-xs py-2 px-4"
          >
            Investor Deck
          </button>
        </div>

        {/* Mobile menu */}
        <button
          className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-0.5 w-5 bg-slate-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-slate-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden apex-glass-heavy border-b border-apex-border/50 px-4 pb-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-apex-border/40">
            <button onClick={() => scrollTo('dashboard-demo')} className="btn-ghost text-xs py-2 flex-1">Live Demo</button>
            <button onClick={() => scrollTo('investor')} className="btn-primary text-xs py-2 flex-1">Invest</button>
          </div>
        </div>
      )}
    </nav>
  )
}
