import Nav from './components/Nav'
import HeroSection from './sections/HeroSection'
import DashboardDemoSection from './sections/DashboardDemoSection'
import DriverPwaSection from './sections/DriverPwaSection'
import AiOpsSection from './sections/AiOpsSection'
import ArchitectureSection from './sections/ArchitectureSection'
import TechStackSection from './sections/TechStackSection'
import VerticalsSection from './sections/VerticalsSection'
import RoadmapSection from './sections/RoadmapSection'
import InvestorSection from './sections/InvestorSection'

export default function App() {
  return (
    <div className="min-h-screen bg-apex-base text-apex-text-primary">
      <Nav />
      <main>
        <HeroSection />
        <DashboardDemoSection />
        <DriverPwaSection />
        <AiOpsSection />
        <ArchitectureSection />
        <TechStackSection />
        <VerticalsSection />
        <RoadmapSection />
        <InvestorSection />
      </main>
      <footer className="border-t border-apex-border/40 py-8 text-center">
        <div className="font-mono text-xs text-slate-600">
          AP3X Intelligent AI Coach & Bus Fleet OS — Enterprise Technology Platform
          <br />
          <span className="text-slate-700 mt-1 block">© 2025 AP3X · Built with React · Powered by AI</span>
        </div>
      </footer>
    </div>
  )
}
