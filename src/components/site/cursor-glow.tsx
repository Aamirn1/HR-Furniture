'use client'

import { useEffect, useRef, useState } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const el = ref.current
    if (!el) return

    let raf = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX
    let curY = mouseY

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)

    const loop = () => {
      curX += (mouseX - curX) * 0.18
      curY += (mouseY - curY) * 0.18
      el.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [visible])

  return <div ref={ref} className="cursor-glow" style={{ opacity: visible ? 1 : 0 }} aria-hidden />
}
