'use client'

import { useEffect, useState } from 'react'
import { scoreColor } from '@/lib/arbor'

export function HealthScore({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)))
  const color = scoreColor(clamped)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(clamped)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * clamped))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [clamped])

  const r = 84
  const circumference = 2 * Math.PI * r
  const dash = (value / 100) * circumference

  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="10"
        />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{
            transition: 'stroke-dasharray 80ms linear',
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display text-6xl font-bold tabular-nums"
          style={{ color }}
        >
          {value}
        </span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
          HEALTH SCORE
        </span>
      </div>
    </div>
  )
}
