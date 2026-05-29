export default function StatusBadge({ status, size = 'sm' }) {
  const config = {
    active:      { label: 'Active',      dot: 'bg-green-400',  text: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
    idle:        { label: 'Idle',        dot: 'bg-slate-400',  text: 'text-slate-400',  bg: 'bg-slate-500/10',  border: 'border-slate-500/20' },
    maintenance: { label: 'Maintenance', dot: 'bg-amber-400',  text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20' },
    warning:     { label: 'Warning',     dot: 'bg-amber-400',  text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20' },
    alert:       { label: 'Alert',       dot: 'bg-red-400',    text: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
    on_route:    { label: 'On Route',    dot: 'bg-cyan-400',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20' },
    break:       { label: 'On Break',    dot: 'bg-blue-400',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20' },
    standby:     { label: 'Standby',     dot: 'bg-slate-400',  text: 'text-slate-400',  bg: 'bg-slate-500/10',  border: 'border-slate-500/20' },
    completed:   { label: 'Completed',   dot: 'bg-green-400',  text: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20' },
    upcoming:    { label: 'Upcoming',    dot: 'bg-slate-500',  text: 'text-slate-400',  bg: 'bg-slate-500/10',  border: 'border-slate-500/20' },
    in_progress: { label: 'In Progress', dot: 'bg-cyan-400',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20' },
    planned:     { label: 'Planned',     dot: 'bg-slate-500',  text: 'text-slate-500',  bg: 'bg-slate-800/50',  border: 'border-slate-700/50' },
  }
  const c = config[status] || config.idle
  const sz = size === 'xs' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-0.5'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sz} ${c.text} ${c.bg} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'active' || status === 'on_route' ? 'animate-pulse' : ''}`} />
      {c.label}
    </span>
  )
}
