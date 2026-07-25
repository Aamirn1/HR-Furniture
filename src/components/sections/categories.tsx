'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { categories } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

export function Categories() {
  return (
    <section id="collections" className="relative py-24 lg:py-32 bg-[#fafaf8]">
      {/* soft top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7a5230]/15 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader
            align="left"
            eyebrow="Featured Categories"
            title={<>Find your <span className="italic text-gradient-walnut">silhouette.</span></>}
            description="Seven collections, each defined by a distinct posture, materiality, and intended use — from lounging to gathering to retreating."
            className="lg:max-w-2xl"
          />
          <motion.a
            href="#gallery"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group inline-flex items-center gap-2 text-[13px] font-button font-medium text-[#3e2a20] hover:text-[#7a5230] transition-colors self-start lg:self-end"
          >
            View Full Catalog
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.8} />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href="#featured"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-luxury transition-all duration-500',
                // First card spans 2 columns on lg for visual rhythm
                i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
              )}
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                {/* Professional interior image */}
                <Image
                  src={cat.image}
                  alt={`${cat.name} — ${cat.blurb}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Bottom-up dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614]/85 via-[#1a1614]/15 to-transparent" />
                {/* Subtle top vignette for tag/count readability */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1a1614]/40 to-transparent" />

                {/* Animated border accent on hover */}
                <div className="absolute inset-3 rounded-xl border border-white/0 group-hover:border-white/40 transition-all duration-500 pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-button font-medium tracking-[0.12em] uppercase text-[#3e2a20]">
                    {cat.tag}
                  </span>
                </div>

                {/* Count */}
                <div className="absolute top-4 right-4">
                  <span className="font-numeric text-[11px] text-white/80">
                    {String(cat.count).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col">
                      <h3 className="font-heading text-[18px] lg:text-[22px] font-semibold text-white leading-tight">
                        {cat.name}
                      </h3>
                      <p className="hidden md:block text-[11px] lg:text-[12px] text-white/75 mt-1 leading-snug max-w-[24ch] line-clamp-2">
                        {cat.blurb}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Final cell — "View All" CTA card */}
          <motion.a
            href="#gallery"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: categories.length * 0.06 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3e2a20] to-[#1a1614] p-6 lg:p-7 flex flex-col justify-between min-h-[240px] hover:shadow-luxury transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(216,179,106,0.5) 0%, transparent 50%)' }} />
            <div className="relative">
              <span className="text-[11px] font-button tracking-[0.18em] uppercase text-[#d8b36a]">
                Browse All
              </span>
              <h3 className="mt-3 font-heading text-[22px] lg:text-[26px] text-white leading-tight">
                Explore the full<br />HR Furniture catalog.
              </h3>
            </div>
            <div className="relative flex items-center justify-between mt-6">
              <span className="font-numeric text-[12px] text-white/70">200+ pieces</span>
              <div className="w-10 h-10 rounded-full bg-[#d8b36a] text-[#3e2a20] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowUpRight className="w-5 h-5" strokeWidth={1.8} />
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
