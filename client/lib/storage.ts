'use client'

import type { Assessment, SavedReport } from './arbor'

const KEY = 'arbor_ai.reports'

function read(): SavedReport[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as SavedReport[]) : []
  } catch {
    return []
  }
}

function write(reports: SavedReport[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(reports))
  } catch {
    // storage may be full or unavailable; fail silently
  }
}

export function getReports(): SavedReport[] {
  return read().sort((a, b) => b.createdAt - a.createdAt)
}

export function saveReport(assessment: Assessment): SavedReport {
  const report: SavedReport = {
    ...assessment,
    id: `ARB-${Date.now().toString(36).toUpperCase()}`,
    createdAt: Date.now(),
  }
  const next = [report, ...read()].slice(0, 50)
  write(next)
  return report
}

export function deleteReport(id: string) {
  write(read().filter((r) => r.id !== id))
}
