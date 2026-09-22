'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ArborMark } from './logo'

const TreeScene = dynamic(() => import('./tree-scene'), {
  ssr: false,
})

type RenderState = 'checking' | 'ok' | 'fallback'

/**
 * Check whether the browser supports the WebGL context required
 * by the Three.js scene.
 *
 * We test both WebGL 1 and WebGL 2 because browser/device support
 * can vary.
 */
function hasWebGL(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  try {
    const canvas = document.createElement('canvas')

    const webgl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')

    const webgl2 = canvas.getContext('webgl2')

    return Boolean(webgl || webgl2)
  } catch {
    return false
  }
}

export function TreeCanvas() {
  const [state, setState] = useState<RenderState>('checking')

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const reducedMotion = mediaQuery.matches
    const webglSupported = hasWebGL()

    /**
     * The Three.js scene contains continuous animation and mouse
     * interaction. If the user has explicitly requested reduced
     * motion, use the static ARBOR fallback instead.
     */
    if (reducedMotion || !webglSupported) {
      setState('fallback')
      return
    }

    setState('ok')
  }, [])

  /**
   * While the browser capability check is running, render the same
   * lightweight fallback rather than showing an empty area.
   */
  if (state !== 'ok') {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        aria-hidden="true"
      >
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(25,195,125,0.35), transparent 70%)',
            }}
          />

          <ArborMark className="h-40 w-40 opacity-90" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-full w-full"
      aria-hidden="true"
    >
      <TreeScene />
    </div>
  )
}