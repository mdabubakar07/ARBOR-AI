'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArborWordmark } from './logo'

const LINKS = [
  { href: '#assessment', label: 'Assessment' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#reports', label: 'Reports' },
  { href: '#about', label: 'About' },
]

export function Navbar({ onStart }: { onStart: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="ARBOR AI home">
          <ArborWordmark />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStart}
            className="hidden rounded-full bg-primary px-5 py-2 text-xs font-semibold tracking-wide text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--primary)] sm:inline-flex"
          >
            START ASSESSMENT
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onStart()
              }}
              className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              START ASSESSMENT
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
