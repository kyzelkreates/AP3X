// ============================================================
// AP3X Showcase — Realistic Mock Operational Data
// ============================================================

export const FLEET_VEHICLES = [
  { id: 'V001', reg: 'AP3X-001', type: 'Volvo B11R', route: 'Route 42 — London Victoria → Oxford', driver: 'James Morrison', status: 'active', speed: 62, lat: 51.5074, lng: -0.1278, fuel: 78, passengers: 34, eta: '14:22', alerts: 0, mileage: 124500, lastService: '2024-11-15' },
  { id: 'V002', reg: 'AP3X-002', type: 'Scania K410', route: 'Route 7 — Birmingham → Manchester', driver: 'Sarah Chen', status: 'active', speed: 71, lat: 52.4862, lng: -1.8904, fuel: 45, passengers: 48, eta: '15:10', alerts: 1, mileage: 98300, lastService: '2024-10-22' },
  { id: 'V003', reg: 'AP3X-003', type: 'Mercedes Tourismo', route: 'Route 15 — Bristol → Cardiff', driver: 'Marcus Williams', status: 'maintenance', speed: 0, lat: 51.4545, lng: -2.5879, fuel: 92, passengers: 0, eta: null, alerts: 2, mileage: 201100, lastService: '2024-12-01' },
  { id: 'V004', reg: 'AP3X-004', type: 'Volvo B8R', route: 'Route 88 — Edinburgh → Glasgow', driver: 'Priya Nair', status: 'active', speed: 58, lat: 55.9533, lng: -3.1883, fuel: 63, passengers: 22, eta: '16:45', alerts: 0, mileage: 67400, lastService: '2024-09-18' },
  { id: 'V005', reg: 'AP3X-005', type: 'Scania Touring', route: 'Depot — Standby', driver: 'Tom Bradley', status: 'idle', speed: 0, lat: 51.5155, lng: -0.0922, fuel: 100, passengers: 0, eta: null, alerts: 0, mileage: 43200, lastService: '2024-12-10' },
  { id: 'V006', reg: 'AP3X-006', type: 'Neoplan Tourliner', route: 'Route 3 — Leeds → Newcastle', driver: 'Emma Davies', status: 'active', speed: 79, lat: 53.8008, lng: -1.5491, fuel: 55, passengers: 51, eta: '13:55', alerts: 0, mileage: 155600, lastService: '2024-11-08' },
]

export const DRIVERS = [
  { id: 'D001', name: 'James Morrison', badge: 'DRV-0041', license: 'Cat D', hours: 4.2, score: 94, fatigue: 'low', status: 'on_route', phone: '+44 7700 900001', vehicle: 'AP3X-001' },
  { id: 'D002', name: 'Sarah Chen', badge: 'DRV-0052', license: 'Cat D+E', hours: 6.1, score: 88, fatigue: 'medium', status: 'on_route', phone: '+44 7700 900002', vehicle: 'AP3X-002' },
  { id: 'D003', name: 'Marcus Williams', badge: 'DRV-0033', license: 'Cat D', hours: 0.0, score: 91, fatigue: 'low', status: 'break', phone: '+44 7700 900003', vehicle: 'AP3X-003' },
  { id: 'D004', name: 'Priya Nair', badge: 'DRV-0064', license: 'Cat D+E', hours: 3.8, score: 97, fatigue: 'low', status: 'on_route', phone: '+44 7700 900004', vehicle: 'AP3X-004' },
  { id: 'D005', name: 'Tom Bradley', badge: 'DRV-0015', license: 'Cat D', hours: 0.0, score: 82, fatigue: 'low', status: 'standby', phone: '+44 7700 900005', vehicle: null },
  { id: 'D006', name: 'Emma Davies', badge: 'DRV-0076', license: 'Cat D+E', hours: 5.5, score: 96, fatigue: 'medium', status: 'on_route', phone: '+44 7700 900006', vehicle: 'AP3X-006' },
]

export const AI_ALERTS = [
  { id: 'A001', type: 'predictive_maintenance', severity: 'warning', vehicle: 'AP3X-002', message: 'Brake pad wear predicted in ~1,200 miles. Schedule service within 72 hours.', timestamp: new Date(Date.now() - 1200000), module: 'Apex Predict' },
  { id: 'A002', type: 'fatigue', severity: 'alert', driver: 'Sarah Chen', message: 'Driver approaching 4.5h EU continuous driving limit. Break required within 18 minutes.', timestamp: new Date(Date.now() - 480000), module: 'Apex Sentinel' },
  { id: 'A003', type: 'route', severity: 'info', vehicle: 'AP3X-001', message: 'Congestion detected on M40 J8-J9. AI rerouting via A34 saves 14 minutes.', timestamp: new Date(Date.now() - 180000), module: 'Apex RouteMind' },
  { id: 'A004', type: 'compliance', severity: 'warning', vehicle: 'AP3X-003', message: 'Vehicle inspection overdue by 3 days. Compliance risk flag raised.', timestamp: new Date(Date.now() - 3600000), module: 'Apex Compliance' },
  { id: 'A005', type: 'weather', severity: 'info', message: 'Heavy rain forecast for Northern routes after 16:00. Adjusting ETAs.', timestamp: new Date(Date.now() - 900000), module: 'Apex Predict' },
]

export const TELEMETRY_STREAM = [
  { t: '14:00', speed: 65, rpm: 1800, fuel: 78, temp: 82 },
  { t: '14:05', speed: 72, rpm: 2100, fuel: 77, temp: 83 },
  { t: '14:10', speed: 68, rpm: 1950, fuel: 76, temp: 82 },
  { t: '14:15', speed: 74, rpm: 2200, fuel: 75, temp: 84 },
  { t: '14:20', speed: 62, rpm: 1750, fuel: 74, temp: 82 },
  { t: '14:25', speed: 58, rpm: 1600, fuel: 73, temp: 81 },
  { t: '14:30', speed: 67, rpm: 1900, fuel: 72, temp: 83 },
  { t: '14:35', speed: 71, rpm: 2050, fuel: 71, temp: 83 },
  { t: '14:40', speed: 69, rpm: 1980, fuel: 70, temp: 82 },
  { t: '14:45', speed: 63, rpm: 1820, fuel: 69, temp: 81 },
  { t: '14:50', speed: 76, rpm: 2300, fuel: 68, temp: 85 },
  { t: '14:55', speed: 71, rpm: 2060, fuel: 67, temp: 84 },
]

export const FLEET_METRICS = [
  { day: 'Mon', efficiency: 87, onTime: 92, incidents: 1, fuel: 4820 },
  { day: 'Tue', efficiency: 91, onTime: 88, incidents: 0, fuel: 4650 },
  { day: 'Wed', efficiency: 89, onTime: 95, incidents: 2, fuel: 4910 },
  { day: 'Thu', efficiency: 93, onTime: 91, incidents: 0, fuel: 4700 },
  { day: 'Fri', efficiency: 88, onTime: 87, incidents: 1, fuel: 4840 },
  { day: 'Sat', efficiency: 84, onTime: 83, incidents: 0, fuel: 4200 },
  { day: 'Sun', efficiency: 82, onTime: 90, incidents: 0, fuel: 3900 },
]

export const ROUTE_STOPS = [
  { id: 1, name: 'London Victoria Coach Station', status: 'completed', time: '10:00', passengers: 34, delay: 0 },
  { id: 2, name: 'Chiswick Services', status: 'completed', time: '10:28', passengers: 34, delay: 2 },
  { id: 3, name: 'Beaconsfield Services', status: 'completed', time: '11:05', passengers: 32, delay: 0 },
  { id: 4, name: 'Oxford Thornhill P&R', status: 'active', time: '13:55', passengers: 34, delay: 0 },
  { id: 5, name: 'Oxford City Centre', status: 'upcoming', time: '14:22', passengers: null, delay: 0 },
]

export const DRIVER_INSPECTION = [
  { category: 'Exterior', items: ['Front lights', 'Rear lights', 'Indicators', 'Mirrors', 'Tyres (all)', 'Windscreen'], completed: [true, true, true, true, true, true] },
  { category: 'Interior', items: ['Emergency exits', 'Fire extinguisher', 'First aid kit', 'Seatbelts', 'Step lighting'], completed: [true, true, true, true, false] },
  { category: 'Documentation', items: ['Route sheet', 'Tachograph card', 'Insurance docs', 'Operator licence'], completed: [true, true, true, true] },
]

export const AI_PREDICTIONS = [
  { id: 'P001', module: 'Apex Predict', type: 'Maintenance', vehicle: 'AP3X-002', prediction: 'Brake pad replacement', confidence: 91, daysOut: 12, impact: 'medium', action: 'Schedule workshop booking' },
  { id: 'P002', module: 'Apex Predict', type: 'Delay', route: 'Route 7', prediction: 'M6 congestion probability 74%', confidence: 74, daysOut: 0, impact: 'high', action: 'Activate alternate route' },
  { id: 'P003', module: 'Apex Sentinel', type: 'Fatigue', driver: 'Sarah Chen', prediction: 'Fatigue threshold in 18 min', confidence: 88, daysOut: 0, impact: 'critical', action: 'Schedule mandatory break' },
  { id: 'P004', module: 'Apex RouteMind', type: 'Efficiency', route: 'Route 88', prediction: 'Fuel saving 8.3% via A702 deviation', confidence: 82, daysOut: 0, impact: 'low', action: 'Recommend reroute to driver' },
  { id: 'P005', module: 'Apex Compliance', type: 'Compliance', vehicle: 'AP3X-006', prediction: 'Tachograph calibration due in 14 days', confidence: 100, daysOut: 14, impact: 'medium', action: 'Book calibration appointment' },
]

export const TECH_STACK = [
  { layer: 'Frontend', items: ['React 18', 'Tailwind CSS', 'Recharts', 'Lucide Icons', 'React Router v6'], color: '#22d3ee' },
  { layer: 'PWA', items: ['Vite PWA Plugin', 'Workbox', 'Service Workers', 'IndexedDB', 'Background Sync'], color: '#a78bfa' },
  { layer: 'AI Engine', items: ['Multi-provider AI Router', 'Fallback System', 'Local Inference', 'Prediction Engine', 'Sentinel AI'], color: '#f87171' },
  { layer: 'Backend', items: ['Supabase PostgreSQL', 'Realtime Subscriptions', 'Row-Level Security', 'Edge Functions'], color: '#34d399' },
  { layer: 'Routing', items: ['GraphHopper', 'OSRM', 'OpenStreetMap', 'Local Routing Engine', 'Route Cache'], color: '#fbbf24' },
  { layer: 'State', items: ['Zustand', 'LocalStorage Persistence', 'BroadcastChannel API', 'IndexedDB Vault'], color: '#3b82f6' },
]

export const VERTICALS = [
  { id: 'coach', icon: '🚌', label: 'Coach Operators', desc: 'National Express-style long-distance coach operations', color: 'cyan' },
  { id: 'bus', icon: '🚍', label: 'Bus Fleets', desc: 'Urban and suburban scheduled bus networks', color: 'blue' },
  { id: 'school', icon: '🏫', label: 'School Transport', desc: 'Student transport with safeguarding and compliance', color: 'amber' },
  { id: 'airport', icon: '✈️', label: 'Airport Shuttles', desc: 'Airside and landside airport transfer operations', color: 'purple' },
  { id: 'emergency', icon: '🚑', label: 'Non-Emergency Medical', desc: 'Patient transport with accessibility tracking', color: 'red' },
  { id: 'logistics', icon: '📦', label: 'Logistics Fleets', desc: 'Last-mile delivery and mobile workforce ops', color: 'green' },
  { id: 'utility', icon: '⚡', label: 'Utility Fleets', desc: 'Field service and utility vehicle management', color: 'amber' },
  { id: 'events', icon: '🎪', label: 'Events Transport', desc: 'Stadium, festival and large-event shuttle ops', color: 'purple' },
]

export const ROADMAP = [
  { phase: 'Q1 2025', title: 'Autonomous Integration', desc: 'SDK integration with autonomous vehicle platforms. AI co-pilot assist mode.', status: 'in_progress', icon: '🤖' },
  { phase: 'Q2 2025', title: 'Smart City APIs', desc: 'Real-time traffic signal data, bus priority systems, city transport hubs.', status: 'planned', icon: '🏙️' },
  { phase: 'Q3 2025', title: 'EV Fleet Intelligence', desc: 'Battery state management, charging depot orchestration, range prediction.', status: 'planned', icon: '⚡' },
  { phase: 'Q4 2025', title: 'AI-Assisted Dispatch', desc: 'Fully autonomous job allocation, crew scheduling, depot management.', status: 'planned', icon: '🧠' },
  { phase: 'Q1 2026', title: 'Multi-Region Scaling', desc: 'EU compliance modules, multi-currency SaaS billing, international deployments.', status: 'planned', icon: '🌍' },
  { phase: 'Q2 2026', title: 'Enterprise Orchestration', desc: 'Multi-operator federation, API marketplace, white-label deployment.', status: 'planned', icon: '🏢' },
]
