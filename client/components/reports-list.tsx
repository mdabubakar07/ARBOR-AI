'use client'

import { Archive, Trash2, ArrowUpRight } from 'lucide-react'
import type { SavedReport } from '@/lib/arbor'
import { scoreColor } from '@/lib/arbor'
import { SeverityBadge } from './report/severity-badge'

export function ReportsList({
  reports,
  onOpen,
  onDelete,
}: {
  reports: SavedReport[]
  onOpen: (report: SavedReport) => void
  onDelete: (id: string) => void
}) {
  return (
    <section
      id="reports"
      className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-8"
    >
      <div className="flex items-center gap-2.5">
        <Archive className="h-4 w-4 text-primary" />
        <p className="font-mono text-xs tracking-[0.25em] text-primary">
          SAVED REPORTS
        </p>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Your assessment history.
      </h2>

      {reports.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
          <p className="font-display text-base font-semibold">No saved reports yet</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Complete an assessment and save it to build your history.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <div
              key={r.id}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[11px] text-muted-foreground">{r.id}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className="font-display text-3xl font-bold tabular-nums"
                  style={{ color: scoreColor(r.healthScore) }}
                >
                  {Math.round(r.healthScore)}
                </span>
              </div>

              <div className="mt-4">
                <SeverityBadge severity={r.severity} size="sm" />
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-snug text-muted-foreground">
                {r.summary}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <button
                  onClick={() => onOpen(r)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:brightness-125"
                >
                  Open report
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onDelete(r.id)}
                  aria-label={`Delete report ${r.id}`}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
