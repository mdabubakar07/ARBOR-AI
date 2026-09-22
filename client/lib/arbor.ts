export type Severity = 'Healthy' | 'Low' | 'Moderate' | 'High' | 'Critical'

export type CategoryResult = {
  status: string
  findings: string[]
}

export type Assessment = {
  healthScore: number
  severity: Severity
  leaf: CategoryResult
  stem: CategoryResult
  ground: CategoryResult
  problems: string[]
  recommendations: string[]
  treatment: string[]
  summary: string
}

export type SavedReport = Assessment & {
  id: string
  createdAt: number
}

export type SlotKey = 'leaf' | 'stem' | 'ground'

export type ImageSlot = {
  dataUrl: string
  base64: string
  mediaType: string
}

export const SLOTS: {
  key: SlotKey
  index: string
  title: string
  instruction: string
}[] = [
  {
    key: 'leaf',
    index: '01',
    title: 'LEAF',
    instruction: 'Capture a close-up of the leaf.',
  },
  {
    key: 'stem',
    index: '02',
    title: 'STEM',
    instruction: 'Capture bark and stem condition.',
  },
  {
    key: 'ground',
    index: '03',
    title: 'GROUND',
    instruction: 'Capture the soil around the trunk.',
  },
]

type SeverityStyle = {
  label: Severity
  /** primary token color used for rings, text accents */
  color: string
  /** soft translucent background */
  soft: string
  /** short human description */
  blurb: string
}

export const SEVERITY_CONFIG: Record<Severity, SeverityStyle> = {
  Healthy: {
    label: 'Healthy',
    color: '#19c37d',
    soft: 'rgba(25, 195, 125, 0.14)',
    blurb: 'No significant visible issues detected.',
  },
  Low: {
    label: 'Low',
    color: '#74e39a',
    soft: 'rgba(116, 227, 154, 0.14)',
    blurb: 'Minor visible signs worth monitoring.',
  },
  Moderate: {
    label: 'Moderate',
    color: '#5de1e6',
    soft: 'rgba(93, 225, 230, 0.14)',
    blurb: 'Noticeable conditions that need attention.',
  },
  High: {
    label: 'High',
    color: '#f0a63a',
    soft: 'rgba(240, 166, 58, 0.15)',
    blurb: 'Serious visible stress requiring prompt care.',
  },
  Critical: {
    label: 'Critical',
    color: '#ff5c5c',
    soft: 'rgba(255, 92, 92, 0.15)',
    blurb: 'Severe visible decline. Act immediately.',
  },
}

export function severityFromScore(score: number): Severity {
  if (score >= 85) return 'Healthy'
  if (score >= 70) return 'Low'
  if (score >= 50) return 'Moderate'
  if (score >= 30) return 'High'
  return 'Critical'
}

export function scoreColor(score: number): string {
  return SEVERITY_CONFIG[severityFromScore(score)].color
}
