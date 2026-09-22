import { SEVERITY_CONFIG, type Severity } from '@/lib/arbor'

export function SeverityBadge({
  severity,
  size = 'md',
}: {
  severity: Severity
  size?: 'sm' | 'md'
}) {
  const cfg = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.Moderate
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-mono font-semibold tracking-[0.15em] ${pad}`}
      style={{ backgroundColor: cfg.soft, color: cfg.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: cfg.color }}
      />
      {cfg.label.toUpperCase()}
    </span>
  )
}
