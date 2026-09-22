'use client'

import { Sparkles, TreePine } from 'lucide-react'
import { SLOTS, type ImageSlot, type SlotKey } from '@/lib/arbor'
import { ImageUploadCard } from './image-upload-card'

type Images = Record<SlotKey, ImageSlot | null>

export function UploadPanel({
  images,
  onChangeImage,
  onAnalyze,
}: {
  images: Images
  onChangeImage: (key: SlotKey, slot: ImageSlot | null) => void
  onAnalyze: () => void
}) {
  const ready = SLOTS.filter((s) => images[s.key]).length
  const allReady = ready === 3

  const status =
    ready === 0
      ? { title: 'READY FOR YOUR TREE', body: 'Upload three images to begin.' }
      : allReady
        ? {
            title: 'ALL IMAGES READY',
            body: 'ARBOR AI can now assess your tree.',
          }
        : {
            title: `${ready} OF 3 IMAGES READY`,
            body: `Upload the remaining image${3 - ready > 1 ? 's' : ''}.`,
          }

  return (
    <section
      id="assessment"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-8"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">
            TREE ASSESSMENT
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Capture the leaf, stem and ground.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Three photographs of the same tree give ARBOR AI the visual context
            it needs for an accurate, visible-signs assessment.
          </p>
        </div>

        {/* progress pill */}
        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5">
          <TreePine className="h-4 w-4 text-primary" />
          <div className="flex gap-1.5">
            {SLOTS.map((s) => (
              <span
                key={s.key}
                className={
                  'h-1.5 w-8 rounded-full transition-colors ' +
                  (images[s.key] ? 'bg-primary' : 'bg-muted')
                }
              />
            ))}
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {ready}/3
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SLOTS.map((s) => (
          <ImageUploadCard
            key={s.key}
            index={s.index}
            title={s.title}
            instruction={s.instruction}
            value={images[s.key]}
            onChange={(slot) => onChangeImage(s.key, slot)}
          />
        ))}
      </div>

      {/* status + analyze */}
      <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/50 p-8 text-center">
        <div>
          <p className="font-display text-lg font-semibold tracking-wide">
            {status.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{status.body}</p>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!allReady}
          className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all enabled:hover:brightness-110 enabled:hover:shadow-[0_0_40px_-8px_var(--primary)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-4 w-4" />
          ANALYZE TREE
        </button>
      </div>
    </section>
  )
}
