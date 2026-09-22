'use client'

import { motion } from 'motion/react'
import { Check, type LucideIcon } from 'lucide-react'
import type { CategoryResult } from '@/lib/arbor'

export function HealthCategoryCard({
  title,
  icon: Icon,
  result,
  delay = 0,
}: {
  title: string
  icon: LucideIcon
  result: CategoryResult
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            {title}
          </p>
          <p className="font-display text-base font-semibold leading-tight">
            {result.status}
          </p>
        </div>
      </div>

      {result.findings.length > 0 ? (
        <ul className="mt-5 space-y-2.5">
          {result.findings.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          No notable findings for this area.
        </p>
      )}
    </motion.div>
  )
}
