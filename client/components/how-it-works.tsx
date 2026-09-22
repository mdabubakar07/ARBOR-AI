'use client'

import { motion } from 'motion/react'
import { Camera, ScanSearch, FileBarChart } from 'lucide-react'

const STEPS = [
  {
    icon: Camera,
    label: 'CAPTURE',
    title: 'Three photographs',
    body: 'Photograph the leaf, the stem or bark, and the ground around the trunk of a single tree.',
  },
  {
    icon: ScanSearch,
    label: 'ANALYZE',
    title: 'Multimodal AI vision',
    body: 'ARBOR AI examines only visible conditions across all three images, cross-referencing signs of stress.',
  },
  {
    icon: FileBarChart,
    label: 'REPORT',
    title: 'Health intelligence',
    body: 'Receive a score, severity, findings, problems, recommendations and a treatment plan in seconds.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-8"
    >
      <div className="max-w-xl">
        <p className="font-mono text-xs tracking-[0.25em] text-primary">
          HOW IT WORKS
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          From three photos to a full diagnosis.
        </h2>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-card p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-primary transition-colors group-hover:border-primary/40">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-5xl font-bold text-muted/60">
                0{i + 1}
              </span>
            </div>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-primary/80">
              {s.label}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
