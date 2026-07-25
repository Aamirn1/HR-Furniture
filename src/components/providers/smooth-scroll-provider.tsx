'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (target) {
        const id = target.getAttribute('href')?.slice(1)
        if (id) {
          const el = document.getElementById(id)
          if (el) {
            e.preventDefault()
            lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
          }
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
