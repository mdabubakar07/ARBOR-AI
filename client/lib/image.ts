'use client'

import type { ImageSlot } from './arbor'

const MAX_DIM = 1280
const QUALITY = 0.82

export const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_BYTES = 15 * 1024 * 1024 // 15MB raw

/**
 * Loads an image file, downscales it to fit within MAX_DIM while preserving
 * aspect ratio, and re-encodes it as JPEG to keep the API payload small
 * without losing enough detail for AI analysis.
 */
export async function processImageFile(file: File): Promise<ImageSlot> {
  const dataUrl = await readAsDataUrl(file)
  const img = await loadImage(dataUrl)

  const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height))
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    // Fallback: send the original data URL.
    const base64 = dataUrl.split(',')[1] ?? ''
    return { dataUrl, base64, mediaType: file.type || 'image/jpeg' }
  }

  ctx.drawImage(img, 0, 0, width, height)
  const out = canvas.toDataURL('image/jpeg', QUALITY)
  const base64 = out.split(',')[1] ?? ''
  return { dataUrl: out, base64, mediaType: 'image/jpeg' }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('read-failed'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('decode-failed'))
    img.src = src
  })
}
