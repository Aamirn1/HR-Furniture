'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { processSteps } from '@/lib/site-data'
import { SectionHeader } from './section-header'

export function Process() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Animated connecting line — goes from 0% to 100% as user scrolls through
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%'])

  return (
    <section className="relative py-24 lg:py-32 bg-[#fafaf8] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="Our Process"
          title={<>From consultation to <span className="italic text-gradient-walnut">delivery.</span></>}
          description="Five deliberate steps that turn a sketch into a sofa you’ll keep for a decade. Transparent, communicative, and quietly meticulous."
        />

        <div ref={ref} className="mt-16 lg:mt-20 relative grid lg:grid-cols-5 gap-8 lg:gap-4">
          {/* Animated vertical line on mobile, horizontal on desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-[#7a5230]/12">
            <motion.div
              style={{ width: lineHeight }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#7a5230] via-[#c88a5a] to-[#d8b36a]"
            />
          </div>
          <div className="lg:hidden absolute top-0 bottom-0 left-[27px] w-[2px] bg-[#7a5230]/12">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#7a5230] via-[#c88a5a] to-[#d8b36a]"
            />
          </div>

          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex lg:flex-col lg:items-center gap-4 lg:gap-0 lg:text-center"
            >
              {/* Step number circle */}
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-[#7a5230]/15 shadow-soft flex items-center justify-center font-numeric text-[18px] lg:text-[20px] font-semibold text-[#3e2a20]">
                  {step.step}
                </div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-[#d8b36a]/20 blur-xl -z-10" />
              </div>

              {/* Content */}
              <div className="flex-1 lg:mt-6">
                <h3 className="font-heading text-[18px] lg:text-[20px] font-semibold text-[#1d1d1d]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12px] lg:text-[13px] leading-relaxed text-[#5e5e5e] font-sans text-pretty lg:max-w-[22ch] lg:mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { k: '3–5 wks', v: 'Lead Time' },
            { k: '14-pt', v: 'Quality Check' },
            { k: '10 yr', v: 'Frame Warranty' },
            { k: '∞', v: 'Reupholstery' },
          ].map((s) => (
            <div key={s.v} className="text-center px-4 py-3 rounded-2xl bg-white border border-[#7a5230]/8">
              <div className="font-numeric text-[18px] lg:text-[22px] font-medium text-[#3e2a20]">{s.k}</div>
              <div className="text-[10px] font-button tracking-[0.14em] uppercase text-[#5e5e5e] mt-1">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
