'use client'

import { motion } from 'framer-motion'
import { Sparkles, Hammer, Palette, Gem, Truck, ShieldCheck } from 'lucide-react'
import { whyItems } from '@/lib/site-data'
import { SectionHeader } from './section-header'

const iconMap = {
  sparkles: Sparkles,
  hammer: Hammer,
  palette: Palette,
  gem: Gem,
  truck: Truck,
  shield: ShieldCheck,
}

export function WhyHR() {
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(216,179,106,0.4) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 relative">
        <SectionHeader
          eyebrow="Why HR Furniture"
          title={<>Six reasons our clients <span className="italic text-gradient-walnut">stay</span> with us.</>}
          description="We design for the long view — every sofa is built to outlive trends, outlast moves, and earn a place in the rooms that matter most."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {whyItems.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-[#7a5230]/10 bg-gradient-to-b from-white to-[#fafaf8] p-6 lg:p-8 hover:shadow-luxury transition-all duration-500 hover:-translate-y-1"
              >
                {/* Hover gradient reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(216,179,106,0.18) 0%, transparent 60%)' }} />

                {/* Number */}
                <div className="absolute top-6 right-6 font-numeric text-[12px] font-medium text-[#5e5e5e]/40">
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7a5230]/10 to-[#d8b36a]/15 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#7a5230]" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-[22px] lg:text-[24px] font-semibold text-[#1d1d1d] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5e5e5e] font-sans text-pretty">
                  {item.description}
                </p>

                {/* Animated underline */}
                <div className="mt-6 h-px bg-gradient-to-r from-[#7a5230] via-[#d8b36a] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.div>
            )
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 lg:mt-20 flex flex-col items-center gap-4"
        >
          <span className="text-[11px] font-button tracking-[0.22em] uppercase text-[#5e5e5e]">
            As Featured In
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-12 gap-y-3">
            {['Architectural Digest', 'Dwell', 'Wallpaper*', 'Elle Decor', 'House & Garden', 'Dezeen'].map((brand) => (
              <span key={brand} className="font-heading text-[16px] lg:text-[20px] text-[#1d1d1d]/35 hover:text-[#7a5230] transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
