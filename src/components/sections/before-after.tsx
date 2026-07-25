'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import Image from 'next/image'
import { SectionHeader } from './section-header'

function Scene({ type }: { type: 'before' | 'after' }) {
  const isAfter = type === 'after'
  const imageSrc = isAfter ? '/scenes/after-styled.jpg' : '/scenes/before-empty.jpg'

  return (
    <div className="absolute inset-0">
      {/* Professional interior image */}
      <Image
        src={imageSrc}
        alt={isAfter ? 'After: a styled modern living room with an HR Furniture sofa' : 'Before: an empty modern living room before styling'}
        fill
        sizes="(max-width: 1024px) 100vw, 1400px"
        className="object-cover"
      />

      {/* Label */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-button font-medium tracking-[0.16em] uppercase"
        style={{
          background: isAfter ? 'rgba(216,179,106,0.95)' : 'rgba(94,94,94,0.85)',
          color: isAfter ? '#1a1614' : '#ffffff',
        }}
      >
        {isAfter ? 'After · HR Furniture' : 'Before · Empty Room'}
      </div>
    </div>
  )
}

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(2, Math.min(98, p)))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      update(e.clientX)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return
      update(e.touches[0].clientX)
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [update])

  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="Before & After"
          title={<>See the <span className="italic text-gradient-walnut">transformation.</span></>}
          description="Drag the divider to compare a bare room against the same space styled with an HR Furniture sofa, lamp, and greenery."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          ref={containerRef}
          className="relative mt-14 w-full aspect-[16/10] lg:aspect-[16/8] rounded-3xl overflow-hidden shadow-luxury-lg cursor-ew-resize select-none"
          onMouseDown={(e) => { dragging.current = true; update(e.clientX) }}
          onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX) }}
        >
          {/* After (full) */}
          <Scene type="after" />
          {/* Before (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Scene type="before" />
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-luxury pointer-events-none"
            style={{ left: `${pos}%`, transform: 'translateX(-1px)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-luxury flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5 text-[#3e2a20]" strokeWidth={1.8} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-button text-[#5e5e5e]"
        >
          <span>● walnut sofa with brass legs</span>
          <span>● ivory boucle cushions</span>
          <span>● champagne gold pendant lamp</span>
          <span>● ceramic planter with fiddle-leaf fig</span>
        </motion.div>
      </div>
    </section>
  )
}
