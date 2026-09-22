import { cn } from '@/lib/utils'

/**
 * ARBOR AI mark: an abstract tree built from a trunk line, three branch nodes
 * (leaf / stem / ground) and an AI signal apex — precise, technical, natural.
 */
export function ArborMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {/* trunk */}
      <path
        d="M16 30V14"
        stroke="url(#arbor-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* branches */}
      <path
        d="M16 20L8.5 13M16 17L23.5 10.5M16 14L16 6"
        stroke="url(#arbor-stroke)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* data nodes */}
      <circle cx="16" cy="6" r="2.6" fill="var(--cyan)" />
      <circle cx="8.5" cy="13" r="2" fill="var(--leaf)" />
      <circle cx="23.5" cy="10.5" r="2" fill="var(--primary)" />
      <circle cx="16" cy="14" r="1.4" fill="var(--foreground)" opacity="0.9" />
      <defs>
        <linearGradient id="arbor-stroke" x1="16" y1="6" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--leaf)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function ArborWordmark({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <ArborMark className={cn('h-7 w-7', markClassName)} />
      <span className="font-display text-lg font-bold tracking-[0.14em] text-foreground">
        ARBOR<span className="text-primary"> AI</span>
      </span>
    </span>
  )
}
