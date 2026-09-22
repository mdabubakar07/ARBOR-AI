'use client'

import { motion } from 'motion/react'
import { BookmarkCheck, Bookmark, RotateCcw } from 'lucide-react'
import type { Assessment, SavedReport } from '@/lib/arbor'
import { SEVERITY_CONFIG, severityFromScore } from '@/lib/arbor'
import { HealthScore } from './health-score'
import { SeverityBadge } from './severity-badge'
import { HealthBreakdown } from './health-breakdown'
import { ProblemsSection } from './problems-section'
import { RecommendationsSection } from './recommendations-section'
import { TreatmentSection } from './treatment-section'
import { SummarySection } from './summary-section'

const ease = [0.22, 1, 0.36, 1] as const

export function ReportView({
  assessment,
  meta,
  saved,
  onSave,
  onNew,
}: {
  assessment: Assessment
  meta?: { id: string; createdAt: number }
  saved: boolean
  onSave: () => void
  onNew: () => void
}) {
  const severity = assessment.severity ?? severityFromScore(assessment.healthScore)
  const cfg = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.Moderate

  return (
    <section id="report" className="scroll-mt-20 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        {/* report header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-primary">
              TREE HEALTH INTELLIGENCE REPORT
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Assessment complete.
            </h2>
            {meta && (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {meta.id} · {new Date(meta.createdAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onSave}
              disabled={saved}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors enabled:hover:border-primary/40 disabled:opacity-60"
            >
              {saved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-primary" /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" /> Save Report
                </>
              )}
            </button>
            <button
              onClick={onNew}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <RotateCcw className="h-4 w-4" /> New Assessment
            </button>
          </div>
        </motion.div>

        {/* score hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="ring-glow mt-10 grid items-center gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[auto_1fr] md:p-12"
        >
          <div className="mx-auto">
            <HealthScore score={assessment.healthScore} />
          </div>
          <div>
            <SeverityBadge severity={severity} />
            <h3 className="mt-4 font-display text-2xl font-bold" style={{ color: cfg.color }}>
              {severity} condition
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {cfg.blurb}
            </p>
          </div>
        </motion.div>

        {/* breakdown */}
        <div className="mt-10">
          <HealthBreakdown assessment={assessment} />
        </div>

        {/* problems + summary */}
        <div className="mt-6 grid gap-6">
          <SummarySection summary={assessment.summary} />
          <ProblemsSection problems={assessment.problems ?? []} />
          <div className="grid gap-6 lg:grid-cols-2">
            <RecommendationsSection recommendations={assessment.recommendations ?? []} />
            <TreatmentSection treatment={assessment.treatment ?? []} />
          </div>
        </div>
      </div>
    </section>
  )
}

export type { SavedReport }
