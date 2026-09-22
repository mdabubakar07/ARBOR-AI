import { ArborMark } from '../logo'

export function SummarySection({ summary }: { summary: string }) {
  if (!summary) return null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-surface p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(25,195,125,0.18), transparent 70%)',
        }}
      />
      <div className="relative flex items-center gap-2.5">
        <ArborMark className="h-5 w-5" />
        <h3 className="font-mono text-xs tracking-[0.25em] text-primary">
          ARBOR AI&apos;S READ
        </h3>
      </div>
      <p className="relative mt-5 text-pretty text-lg leading-relaxed text-foreground/90 sm:text-xl">
        {summary}
      </p>
    </div>
  )
}
