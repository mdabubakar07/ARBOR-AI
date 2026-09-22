import { AlertTriangle, ShieldCheck } from 'lucide-react'

export function ProblemsSection({ problems }: { problems: string[] }) {
  const has = problems.length > 0

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs tracking-[0.25em] text-primary">
          VISIBLE PROBLEMS
        </h3>
      </div>

      {has ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {problems.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-[10px] font-bold text-destructive">
                {i + 1}
              </span>
              <span className="leading-snug text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <div>
            <p className="font-display text-sm font-semibold">
              NO VISIBLE PROBLEMS DETECTED
            </p>
            <p className="text-sm text-muted-foreground">
              ARBOR AI found no visible signs of concern.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
