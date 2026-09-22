'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { TreeCanvas } from './tree-canvas'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({
  onStart,
  onHowItWorks,
}: {
  onStart: () => void
  onHowItWorks: () => void
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid"
    >
      {/* atmospheric background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(25,195,125,0.22), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[50vh] w-[50vh] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(93,225,230,0.14), transparent 65%)',
        }}
      />

      {/* 3D scene: right half on desktop, full-bleed faded on mobile */}
      <div className="absolute inset-0 md:left-1/2">
        <div className="h-full w-full opacity-40 md:opacity-100">
          <TreeCanvas />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background md:bg-gradient-to-r md:from-background md:via-background/20 md:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              AI-POWERED TREE INTELLIGENCE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            See what your tree
            <br />
            <span className="text-primary text-glow">is telling you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.16 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Upload three photographs. ARBOR AI analyzes visible signs across the
            leaf, stem and surrounding ground — turning a snapshot into a full
            health intelligence report.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_36px_-6px_var(--primary)]"
            >
              START TREE ASSESSMENT
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onHowItWorks}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-card"
            >
              HOW IT WORKS
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-primary/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            BOTANICAL INTELLIGENCE ONLINE
          </motion.div>
        </div>
      </div>
    </section>
  )
}
