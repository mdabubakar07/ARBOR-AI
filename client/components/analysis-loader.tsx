'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Leaf, TreePine, Sprout, FileBarChart } from 'lucide-react'
import { ArborMark } from './logo'

const STAGES = [
  { label: 'ANALYZING TREE', icon: TreePine },
  { label: 'EXAMINING LEAF', icon: Leaf },
  { label: 'EXAMINING STEM', icon: TreePine },
  { label: 'EXAMINING GROUND', icon: Sprout },
  { label: 'GENERATING HEALTH REPORT', icon: FileBarChart },
]

export function AnalysisLoader() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Purely visual pacing while the real request runs; hold on the last stage.
    const id = setInterval(() => {
      setStage((s) => (s < STAGES.length - 1 ? s + 1 : s))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 px-5 backdrop-blur-xl"
      role="status"
      aria-live="polite"
      aria-label="Analyzing tree"
    >
      <div className="w-full max-w-md">
        {/* scanning centerpiece */}
        <div className="relative mx-auto flex h-52 w-52 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(25,195,125,0.35), transparent 70%)',
            }}
          />
          {/* rotating scan rings */}
          <motion.span
            className="absolute inset-2 rounded-full border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ borderTopColor: 'var(--primary)' }}
          />
          <motion.span
            className="absolute inset-8 rounded-full border border-cyan/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ borderBottomColor: 'var(--cyan)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArborMark className="h-20 w-20" />
          </motion.div>
        </div>

        {/* stage list */}
        <div className="mt-10 space-y-2.5">
          {STAGES.map((s, i) => {
            const active = i === stage
            const done = i < stage
            return (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-2.5"
                style={{ opacity: i > stage ? 0.4 : 1 }}
              >
                <span
                  className={
                    'flex h-6 w-6 items-center justify-center rounded-full ' +
                    (done
                      ? 'bg-primary text-primary-foreground'
                      : active
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground')
                  }
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <s.icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span
                  className={
                    'font-mono text-xs tracking-[0.18em] ' +
                    (active || done ? 'text-foreground' : 'text-muted-foreground')
                  }
                >
                  {s.label}
                </span>
                {active && (
                  <motion.span
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
