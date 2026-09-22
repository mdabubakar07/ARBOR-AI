'use client'

import { useCallback, useRef, useState } from 'react'
import { Check, ImageUp, RefreshCw, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACCEPTED, MAX_FILE_BYTES, processImageFile } from '@/lib/image'
import type { ImageSlot } from '@/lib/arbor'

type Props = {
  index: string
  title: string
  instruction: string
  value: ImageSlot | null
  onChange: (slot: ImageSlot | null) => void
}

export function ImageUploadCard({
  index,
  title,
  instruction,
  value,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handleFile = useCallback(
    async (file: File | undefined) => {
      setError(null)
      if (!file) return
      if (!ACCEPTED.includes(file.type)) {
        setError('Use a JPG, PNG or WebP image.')
        return
      }
      if (file.size > MAX_FILE_BYTES) {
        setError('Image is too large (max 15MB).')
        return
      }
      try {
        setBusy(true)
        const slot = await processImageFile(file)
        onChange(slot)
      } catch {
        setError("We couldn't read that image. Try another.")
      } finally {
        setBusy(false)
      }
    },
    [onChange],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      void handleFile(e.dataTransfer.files?.[0])
    },
    [handleFile],
  )

  const open = () => inputRef.current?.click()

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300',
        dragging
          ? 'border-primary ring-2 ring-primary/40'
          : value
            ? 'border-primary/30'
            : 'border-border hover:border-primary/30',
      )}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary">
            {index}
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.15em]">
            {title}
          </span>
        </div>
        {value && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-primary">
            <Check className="h-3 w-3" />
            IMAGE READY
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-5 pt-4">
        {value ? (
          <div className="relative overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.dataUrl || '/placeholder.svg'}
              alt={`${title} preview`}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 right-2.5 flex gap-2">
              <button
                onClick={open}
                className="inline-flex items-center gap-1.5 rounded-lg bg-background/80 px-2.5 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-background"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Replace
              </button>
              <button
                onClick={() => {
                  onChange(null)
                  setError(null)
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-background/80 px-2.5 py-1.5 text-xs font-medium text-destructive backdrop-blur transition-colors hover:bg-background"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={open}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 text-center transition-colors hover:bg-muted/70"
            aria-label={`Upload ${title} image`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary">
              {busy ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <ImageUp className="h-5 w-5" />
              )}
            </span>
            <span className="px-6 text-sm text-muted-foreground">
              {instruction}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/70">
              DRAG & DROP OR CLICK
            </span>
          </button>
        )}

        {error && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
