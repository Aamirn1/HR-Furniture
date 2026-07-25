'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { galleryItems } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

// Size classes for masonry layout
const sizeClasses: Record<string, string> = {
  big: 'md:col-span-2 md:row-span-2',
  tall: 'md:row-span-2',
  wide: 'md:col-span-2',
  square: '',
}

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeader
            align="left"
            eyebrow="Gallery"
            title={<>Real rooms. <span className="italic text-gradient-walnut">Real life.</span></>}
            description="Completed projects and styled interiors from HR Furniture homeowners and designers across the country."
            className="lg:max-w-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2"
          >
            {['All', 'Living', 'Interior', 'Loft', 'Sunroom'].map((f, i) => (
              <button
                key={f}
                className={cn(
                  'px-3.5 h-9 rounded-full text-[12px] font-button font-medium tracking-wide transition-all',
                  i === 0
                    ? 'bg-[#3e2a20] text-white hover:bg-[#6a4530]'
                    : 'bg-[#fafaf8] border border-[#7a5230]/15 text-[#5e5e5e] hover:border-[#7a5230] hover:text-[#7a5230]'
                )}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3 lg:gap-4">
          {galleryItems.map((item, i) => (
            <motion.a
              key={item.id}
              href="#featured"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-luxury transition-all duration-500',
                sizeClasses[item.size]
              )}
            >
              {/* Professional interior image */}
              <Image
                src={item.image}
                alt={`${item.title} — ${item.collection} collection in ${item.location}`}
                fill
                sizes={item.size === 'big' || item.size === 'wide' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1614]/85 via-[#1a1614]/10 to-transparent" />

              {/* Hover overlay (extra darkening on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover arrow */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#3e2a20] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-button font-medium tracking-[0.12em] uppercase text-[#3e2a20] mb-2">
                  {item.category}
                </span>
                <h3 className="font-heading text-[18px] lg:text-[20px] font-semibold text-white leading-tight">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] font-button text-white/80">
                  <MapPin className="w-3 h-3" strokeWidth={1.5} />
                  {item.location}
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  {item.collection}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-full border border-[#7a5230]/25 text-[#3e2a20] text-[13px] font-button font-medium tracking-wide hover:bg-[#3e2a20] hover:text-white hover:border-[#3e2a20] transition-all duration-300"
          >
            Submit Your Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.8} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
