'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/lib/site-data'
import { SectionHeader } from './section-header'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Answers to <span className="italic text-gradient-walnut">common</span> questions.</>}
          description="Everything you need to know about lead times, fabrics, delivery, and our warranty. Still curious? Reach out — we love a good question."
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#7a5230]/25 bg-[#fafaf8] shadow-soft'
                    : 'border-[#7a5230]/10 bg-white hover:border-[#7a5230]/20'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-[16px] lg:text-[19px] font-semibold text-[#1d1d1d] leading-snug">
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#3e2a20] text-white rotate-180'
                      : 'bg-[#fafaf8] text-[#3e2a20]'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" strokeWidth={2} /> : <Plus className="w-4 h-4" strokeWidth={2} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-[14px] lg:text-[15px] leading-relaxed text-[#5e5e5e] font-sans text-pretty">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-[13px] font-button text-[#5e5e5e]">
            Still have questions?{' '}
            <a href="#contact" className="text-[#7a5230] font-semibold link-underline">
              Talk to our concierge team →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
