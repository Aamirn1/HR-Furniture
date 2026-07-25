'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { SectionHeader } from './section-header'

function Scene({ type }: { type: 'before' | 'after' }) {
  const isAfter = type === 'after'
  return (
    <div className="absolute inset-0">
      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: isAfter
            ? 'linear-gradient(to top, #d8c9a8 0%, #e8dcc4 100%)'
            : 'linear-gradient(to top, #b8a890 0%, #c8b8a0 100%)',
        }}
      />
      {/* Wall */}
      <div
        className="absolute top-0 left-0 right-0 bottom-1/2"
        style={{
          background: isAfter
            ? 'linear-gradient(to bottom, #f0e9da 0%, #e8dcc4 100%)'
            : 'linear-gradient(to bottom, #d8cfc0 0%, #c8b8a0 100%)',
        }}
      />

      {/* Window */}
      <div className="absolute top-[12%] left-[8%] w-[28%] aspect-[3/4] rounded-lg border-2 overflow-hidden"
        style={{ borderColor: isAfter ? '#7a5230' : '#5e5e5e' }}
      >
        <div className="absolute inset-0" style={{ background: isAfter ? 'linear-gradient(135deg, #cfe0f0 0%, #e8f0f5 100%)' : 'linear-gradient(135deg, #a8b8c0 0%, #c0c8d0 100%)' }} />
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: isAfter ? '#7a5230' : '#5e5e5e' }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: isAfter ? '#7a5230' : '#5e5e5e' }} />
      </div>

      {/* Plant */}
      <div className="absolute bottom-[42%] right-[8%] flex flex-col items-center">
        <div className="w-12 h-20 relative">
          <svg viewBox="0 0 40 60" className="w-full h-full" aria-hidden>
            <path d="M20 60 Q15 40 10 30 Q5 25 12 18 Q18 25 20 35 Q22 25 28 18 Q35 25 30 30 Q25 40 20 60" fill={isAfter ? '#4a8c5d' : '#7a8a6a'} opacity="0.85" />
          </svg>
        </div>
        <div className="w-8 h-6 rounded-b-md -mt-1" style={{ background: isAfter ? '#5a3a28' : '#5e5e5e' }} />
      </div>

      {/* Sofa — only on After */}
      {isAfter && (
        <svg viewBox="0 0 400 220" className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[78%] h-auto" aria-hidden>
          {/* Shadow */}
          <ellipse cx="200" cy="200" rx="160" ry="8" fill="rgba(62,42,32,0.2)" />
          {/* Body */}
          <path d="M70 130 Q70 95 100 92 L300 92 Q330 95 330 130 L330 175 Q330 185 320 185 L80 185 Q70 185 70 175 Z" fill="#7a5230" />
          <rect x="85" y="105" width="70" height="60" rx="10" fill="#8a6240" />
          <rect x="165" y="105" width="70" height="60" rx="10" fill="#8a6240" />
          <rect x="245" y="105" width="70" height="60" rx="10" fill="#8a6240" />
          <rect x="85" y="85" width="70" height="30" rx="8" fill="#9a7250" />
          <rect x="165" y="82" width="70" height="33" rx="8" fill="#9a7250" />
          <rect x="245" y="85" width="70" height="30" rx="8" fill="#9a7250" />
          <rect x="80" y="183" width="8" height="14" rx="2" fill="#d8b36a" />
          <rect x="312" y="183" width="8" height="14" rx="2" fill="#d8b36a" />
        </svg>
      )}

      {/* Before — sad empty floor with a box */}
      {!isAfter && (
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[24%]">
          <div className="w-full h-full rounded-md shadow-soft" style={{ background: 'linear-gradient(135deg, #c8b8a0, #a89878)' }} />
          <div className="absolute inset-0 flex items-center justify-center text-[#5e5e5e] text-[11px] font-button tracking-wide">
            Empty Space
          </div>
        </div>
      )}

      {/* Lamp */}
      <div className="absolute bottom-[42%] left-[8%] flex flex-col items-center">
        <div className="w-10 h-7 rounded-t-full" style={{ background: isAfter ? '#d8b36a' : '#a8a090' }} />
        <div className="w-[2px] h-16" style={{ background: isAfter ? '#3e2a20' : '#5e5e5e' }} />
        <div className="w-6 h-1 rounded-full" style={{ background: isAfter ? '#3e2a20' : '#5e5e5e' }} />
      </div>

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
