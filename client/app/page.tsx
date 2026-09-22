'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { UploadPanel } from '@/components/upload-panel'
import { AnalysisLoader } from '@/components/analysis-loader'
import { ReportView } from '@/components/report/report-view'
import { ReportsList } from '@/components/reports-list'
import { ErrorState, type AnalysisError } from '@/components/error-state'
import { Footer } from '@/components/footer'
import type { Assessment, ImageSlot, SavedReport, SlotKey } from '@/lib/arbor'
import { deleteReport, getReports, saveReport } from '@/lib/storage'

type Phase = 'idle' | 'analyzing' | 'report' | 'error'

const EMPTY: Record<SlotKey, ImageSlot | null> = {
  leaf: null,
  stem: null,
  ground: null,
}

export default function Page() {
  const [images, setImages] = useState<Record<SlotKey, ImageSlot | null>>(EMPTY)
  const [phase, setPhase] = useState<Phase>('idle')
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [meta, setMeta] = useState<{ id: string; createdAt: number } | undefined>()
  const [saved, setSaved] = useState(false)
  const [errorKind, setErrorKind] = useState<AnalysisError>('failed')
  const [reports, setReports] = useState<SavedReport[]>([])

  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReports(getReports())
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const changeImage = useCallback((key: SlotKey, slot: ImageSlot | null) => {
    setImages((prev) => ({ ...prev, [key]: slot }))
  }, [])

  const analyze = useCallback(async () => {
    if (!images.leaf || !images.stem || !images.ground) return
    setPhase('analyzing')
    const startedAt = Date.now()

    try {
      const res = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaf: { base64: images.leaf.base64, mediaType: images.leaf.mediaType },
          stem: { base64: images.stem.base64, mediaType: images.stem.mediaType },
          ground: { base64: images.ground.base64, mediaType: images.ground.mediaType },
        }),
      })

      if (!res.ok) {
        setErrorKind(res.status === 503 ? 'busy' : 'failed')
        setPhase('error')
        return
      }

      const data = (await res.json()) as Assessment

      // Keep the analysis animation on screen a beat for perceived quality.
      const elapsed = Date.now() - startedAt
      if (elapsed < 2600) await new Promise((r) => setTimeout(r, 2600 - elapsed))

      setAssessment(data)
      setMeta({ id: `ARB-${Date.now().toString(36).toUpperCase()}`, createdAt: Date.now() })
      setSaved(false)
      setPhase('report')
      requestAnimationFrame(() =>
        reportRef.current?.scrollIntoView({ behavior: 'smooth' }),
      )
    } catch {
      setErrorKind('failed')
      setPhase('error')
    }
  }, [images])

  const handleSave = useCallback(() => {
    if (!assessment || saved) return
    const report = saveReport(assessment)
    setMeta({ id: report.id, createdAt: report.createdAt })
    setReports(getReports())
    setSaved(true)
  }, [assessment, saved])

  const handleNew = useCallback(() => {
    setImages(EMPTY)
    setAssessment(null)
    setMeta(undefined)
    setSaved(false)
    setPhase('idle')
    scrollTo('assessment')
  }, [])

  const openSaved = useCallback((report: SavedReport) => {
    setAssessment(report)
    setMeta({ id: report.id, createdAt: report.createdAt })
    setSaved(true)
    setPhase('report')
    requestAnimationFrame(() =>
      reportRef.current?.scrollIntoView({ behavior: 'smooth' }),
    )
  }, [])

  const handleDelete = useCallback((id: string) => {
    deleteReport(id)
    setReports(getReports())
  }, [])

  return (
    <main className="relative">
      <Navbar onStart={() => scrollTo('assessment')} />
      <Hero
        onStart={() => scrollTo('assessment')}
        onHowItWorks={() => scrollTo('how-it-works')}
      />
      <HowItWorks />

      <UploadPanel images={images} onChangeImage={changeImage} onAnalyze={analyze} />

      <div ref={reportRef}>
        {phase === 'report' && assessment && (
          <ReportView
            assessment={assessment}
            meta={meta}
            saved={saved}
            onSave={handleSave}
            onNew={handleNew}
          />
        )}
        {phase === 'error' && (
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <ErrorState kind={errorKind} onRetry={analyze} />
          </div>
        )}
      </div>

      <ReportsList reports={reports} onOpen={openSaved} onDelete={handleDelete} />

      <Footer />

      {phase === 'analyzing' && <AnalysisLoader />}
    </main>
  )
}
