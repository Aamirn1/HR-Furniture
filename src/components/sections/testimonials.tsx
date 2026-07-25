'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/site-data'
import { SectionHeader } from './section-header'

export function Testimonials() {
  // Duplicate for seamless marquee
  const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)]
  const row2 = [...testimonials.slice(2).concat(testimonials.slice(0, 2)), ...testimonials.slice(2).concat(testimonials.slice(0, 2))]

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-[#fafaf8] overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(216,179,106,0.3) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Loved by <span className="italic text-gradient-walnut">designers</span> & homeowners.</>}
          description="Real words from real rooms. Read what our clients say about their HR Furniture pieces."
        />
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative mt-14 flex overflow-hidden">
        <div className="flex gap-5 animate-marquee-slow w-max">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse direction */}
      <div className="relative mt-5 flex overflow-hidden">
        <div className="flex gap-5 animate-marquee w-max" style={{ animationDirection: 'reverse' }}>
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-72 bg-gradient-to-r from-[#fafaf8] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-72 bg-gradient-to-l from-[#fafaf8] to-transparent pointer-events-none" />
    </section>
  )
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <article
      className="group relative w-[340px] md:w-[420px] shrink-0 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-soft hover:shadow-luxury transition-all duration-500 p-6 lg:p-7"
    >
      {/* Quote mark */}
      <div
        className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-soft"
        style={{ background: `linear-gradient(135deg, ${t.accent}, #3e2a20)` }}
      >
        <Quote className="w-4 h-4" strokeWidth={1.8} />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mt-2">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#d8b36a] text-[#d8b36a]" />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-[14px] lg:text-[15px] leading-relaxed text-[#1d1d1d] font-sans text-pretty line-clamp-5">
        “{t.quote}”
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-[#7a5230]/10">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-heading font-semibold text-[14px] shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.accent}, #3e2a20)` }}
        >
          {t.initials}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-button font-semibold text-[#1d1d1d] truncate">{t.name}</span>
          <span className="text-[11px] font-button text-[#5e5e5e] truncate">{t.role} · {t.location}</span>
        </div>
      </div>
    </article>
  )
}
