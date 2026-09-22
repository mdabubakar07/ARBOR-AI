import { ListChecks } from 'lucide-react'

export function RecommendationsSection({
  recommendations,
}: {
  recommendations: string[]
}) {
  if (!recommendations.length) return null

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <ListChecks className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs tracking-[0.25em] text-primary">
          RECOMMENDED ACTIONS
        </h3>
      </div>

      <ol className="mt-6 space-y-3">
        {recommendations.map((r, i) => (
          <li
            key={i}
            className="flex items-start gap-4 rounded-xl border border-border bg-muted/40 p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="pt-1 text-sm leading-snug text-foreground/90">
              {r}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
