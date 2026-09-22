import { Stethoscope, Check } from 'lucide-react'

export function TreatmentSection({ treatment }: { treatment: string[] }) {
  const has = treatment.length > 0

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Stethoscope className="h-4 w-4 text-primary" />
        <h3 className="font-mono text-xs tracking-[0.25em] text-primary">
          TREATMENT PLAN
        </h3>
      </div>

      {has ? (
        <ul className="mt-6 space-y-3">
          {treatment.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-3 w-3" />
              </span>
              <span className="leading-snug text-foreground/90">{t}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <Check className="h-6 w-6 text-primary" />
          <div>
            <p className="font-display text-sm font-semibold">
              NO TREATMENT REQUIRED
            </p>
            <p className="text-sm text-muted-foreground">
              Continue routine care and monitoring.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
