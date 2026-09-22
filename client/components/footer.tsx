import { ArborWordmark } from './logo'

export function Footer() {
  return (
    <footer
      id="about"
      className="relative scroll-mt-20 border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div className="max-w-md">
            <ArborWordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ARBOR AI transforms tree photographs into an understandable health
              intelligence report. It assesses only visible conditions and is
              intended to support — not replace — professional arboricultural
              judgment.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-primary/80">
              SEE. ANALYZE. PROTECT.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                PLATFORM
              </p>
              <ul className="mt-4 space-y-2.5 text-muted-foreground">
                <li>
                  <a href="#assessment" className="hover:text-foreground">
                    Assessment
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#reports" className="hover:text-foreground">
                    Reports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                INTELLIGENCE
              </p>
              <ul className="mt-4 space-y-2.5 text-muted-foreground">
                <li>Multimodal vision</li>
                <li>Visible-signs only</li>
                <li>Environmental tech</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ARBOR AI — AI-Powered Tree Health Intelligence.</p>
          <p className="font-mono tracking-wide">arbor_ai</p>
        </div>
      </div>
    </footer>
  )
}
