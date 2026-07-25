'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { materials } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

export function Materials() {
  const [active, setActive] = useState(materials[0])

  return (
    <section className="relative py-24 lg:py-32 bg-[#fafaf8] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(ellipse, rgba(216,179,106,0.3) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="Materials"
          title={<>The texture of <span className="italic text-gradient-walnut">craft.</span></>}
          description="Every fabric, leather, and wood is sourced from a named mill or tannery. Hover a swatch to study the detail."
        />

        <div className="mt-14 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Large preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
                style={{ background: active.swatch }}
              />
            </AnimatePresence>

            {/* Weave / texture overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: active.type === 'fabric'
                  ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.08) 0, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 6px)'
                  : active.type === 'leather'
                  ? 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.18), transparent 60%)'
                  : 'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 16px)',
              }}
            />

            {/* Soft light sweep */}
            <motion.div
              key={`sweep-${active.id}`}
              initial={{ x: '-100%' }}
              animate={{ x: '120%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-button font-medium tracking-[0.14em] uppercase text-[#3e2a20] mb-3">
                    {active.type}
                  </span>
                  <h3 className="font-heading text-[26px] lg:text-[34px] font-semibold text-white leading-tight">
                    {active.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-white/80 max-w-md">{active.description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Swatches grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {materials.map((m, i) => (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setActive(m)}
                onMouseEnter={() => setActive(m)}
                className={cn(
                  'group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.04]',
                  active.id === m.id ? 'border-[#7a5230] shadow-luxury' : 'border-transparent shadow-soft'
                )}
                style={{ background: m.swatch }}
                aria-label={m.name}
              >
                <div
                  className="absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: m.type === 'fabric'
                      ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 4px)'
                      : m.type === 'leather'
                      ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%)'
                      : 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 8px)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-[10px] font-button text-white/90 truncate block">{m.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
