'use client'

import { CloudOff, RotateCcw } from 'lucide-react'

export type AnalysisError = 'busy' | 'failed'

export function ErrorState({
  kind,
  onRetry,
}: {
  kind: AnalysisError
  onRetry: () => void
}) {
  const busy = kind === 'busy'
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-primary">
        <CloudOff className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold tracking-wide">
        {busy ? 'AI SERVICE TEMPORARILY BUSY' : 'ASSESSMENT INTERRUPTED'}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {busy
          ? 'Please try the assessment again.'
          : "We couldn't complete the tree assessment. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
      >
        <RotateCcw className="h-4 w-4" /> TRY AGAIN
      </button>
    </div>
  )
}
