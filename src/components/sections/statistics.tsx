'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { stats } from '@/lib/site-data'
import { useCounter } from '@/lib/anim'

function Stat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const animated = useCounter(value, inView, 2200)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative text-center lg:text-left"
    >
      <div className="font-numeric text-[56px] md:text-[72px] lg:text-[88px] font-medium text-transparent bg-clip-text bg-gradient-to-br from-[#3e2a20] via-[#7a5230] to-[#c88a5a] leading-none tracking-tight">
        {animated.toLocaleString()}{suffix}
      </div>
      <div className="mt-3 text-[11px] md:text-[12px] font-button tracking-[0.2em] uppercase text-[#5e5e5e]">
        {label}
      </div>
    </motion.div>
  )
}

export function Statistics() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#3e2a20] via-[#1a1614] to-[#1a1614] text-white overflow-hidden">
      {/* Soft grain overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(216,179,106,0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(200,138,90,0.2), transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="relative">
              <Stat value={s.value} suffix={s.suffix} label={s.label} index={i} />
              {/* Divider for non-last items on lg */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-px h-16 -translate-y-1/2 bg-white/15" />
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 lg:mt-20 text-center max-w-2xl mx-auto text-[14px] lg:text-[15px] leading-relaxed text-white/60 font-sans text-pretty"
        >
          Fifteen years of building heirloom-quality furniture for designers, architects, and homeowners across the country. Every number above represents a relationship we intend to honor for decades.
        </motion.p>
      </div>
    </section>
  )
}
