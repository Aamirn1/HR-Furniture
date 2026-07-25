'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, Heart, ArrowUpRight } from 'lucide-react'
import { products, type Product } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

function SofaCard({ product, index }: { product: Product; index: number }) {
  const [liked, setLiked] = useState(false)

  // Synthesize a CSS scene for the sofa "image" — luxury studio backdrop
  const isDark = product.tone === 'dark'

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-luxury transition-all duration-500',
        index === 0 && 'lg:col-span-2'
      )}
    >
      {/* Image / synthesized scene */}
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden',
          index === 0 ? 'lg:aspect-[16/9]' : ''
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #2a2018 0%, #1a1410 60%, #2a2018 100%)'
              : 'linear-gradient(135deg, #f0e9da 0%, #e3d8bf 60%, #f4ede0 100%)',
          }}
        />
        {/* Soft floor reflection */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: isDark
              ? 'linear-gradient(to top, rgba(216,179,106,0.06), transparent)'
              : 'linear-gradient(to top, rgba(122,82,48,0.1), transparent)',
          }}
        />
        {/* Decorative ambient light */}
        <div
          className="absolute top-0 left-1/4 w-1/2 h-2/3 opacity-50"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(216,179,106,0.4) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)',
          }}
        />

        {/* Synthesized sofa illustration */}
        <SofaSilhouette color={product.accent} dark={isDark} big={index === 0} />

        {/* Top badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#3e2a20] text-white text-[10px] font-button font-medium tracking-[0.12em] uppercase">
              {product.badge}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-button font-medium tracking-[0.12em] uppercase text-[#3e2a20]">
            {product.collection}
          </span>
        </div>

        {/* Hover actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            aria-label="Save"
            onClick={() => setLiked((l) => !l)}
            className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#3e2a20] hover:bg-white transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <Heart className={cn('w-4 h-4', liked && 'fill-[#c88a5a] text-[#c88a5a]')} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Quick view"
            className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#3e2a20] hover:bg-white transition-all opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            style={{ transitionDelay: '60ms' }}
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Bottom quick-view CTA */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#1d1d1d] text-[12px] font-button font-medium hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
            Quick View
          </button>
          <button className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-[#3e2a20] text-white text-[12px] font-button font-medium hover:bg-[#6a4530] transition-colors">
            Inquire
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="font-heading text-[20px] lg:text-[22px] font-semibold text-[#1d1d1d] leading-tight truncate">
              {product.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] font-button text-[#5e5e5e]">
              <span>{product.fabric}</span>
              <span className="w-1 h-1 rounded-full bg-[#5e5e5e]/40" />
              <span>{product.seating}</span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="font-numeric text-[20px] lg:text-[22px] font-medium text-[#3e2a20]">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-numeric text-[12px] text-[#5e5e5e]/60 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#5e5e5e] font-sans line-clamp-2 text-pretty">
          {product.blurb}
        </p>
      </div>
    </motion.article>
  )
}

// SVG-based sofa silhouette — varies by tone
function SofaSilhouette({ color, dark, big }: { color: string; dark: boolean; big?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className="absolute inset-x-0 bottom-0 mx-auto w-full h-full transition-transform duration-700 group-hover:scale-[1.04]"
      style={{ transformOrigin: 'bottom center', filter: dark ? 'drop-shadow(0 -8px 24px rgba(216,179,106,0.18))' : 'drop-shadow(0 -8px 24px rgba(62,42,32,0.18))' }}
      aria-hidden
    >
      {/* Sofa shadow */}
      <ellipse cx="200" cy="200" rx="160" ry="10" fill={dark ? 'rgba(216,179,106,0.18)' : 'rgba(62,42,32,0.2)'} />

      {/* Body */}
      <path
        d="M70 130 Q70 95 100 92 L300 92 Q330 95 330 130 L330 175 Q330 185 320 185 L80 185 Q70 185 70 175 Z"
        fill={color}
        opacity="0.95"
      />
      {/* Cushions */}
      <rect x="85" y="105" width="70" height="60" rx="10" fill={color} opacity="0.85" />
      <rect x="165" y="105" width="70" height="60" rx="10" fill={color} opacity="0.85" />
      <rect x="245" y="105" width="70" height="60" rx="10" fill={color} opacity="0.85" />
      {/* Backrest pillows */}
      <rect x="85" y="85" width="70" height="30" rx="8" fill={color} opacity="0.7" />
      <rect x="165" y="82" width="70" height="33" rx="8" fill={color} opacity="0.7" />
      <rect x="245" y="85" width="70" height="30" rx="8" fill={color} opacity="0.7" />
      {/* Arms */}
      <path d="M55 110 Q55 90 75 88 L75 175 L55 175 Z" fill={color} opacity="0.9" />
      <path d="M345 110 Q345 90 325 88 L325 175 L345 175 Z" fill={color} opacity="0.9" />
      {/* Legs */}
      <rect x="80" y="183" width="8" height="14" rx="2" fill={dark ? '#d8b36a' : '#3e2a20'} />
      <rect x="312" y="183" width="8" height="14" rx="2" fill={dark ? '#d8b36a' : '#3e2a20'} />
      <rect x="190" y="183" width="8" height="14" rx="2" fill={dark ? '#d8b36a' : '#3e2a20'} opacity="0.6" />

      {/* Highlight */}
      <path
        d="M100 95 L300 95"
        stroke={dark ? 'rgba(216,179,106,0.4)' : 'rgba(255,255,255,0.4)'}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FeaturedCollection() {
  return (
    <section id="featured" className="relative py-24 lg:py-32 bg-[#fafaf8]">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader
            align="left"
            eyebrow="Featured Collection"
            title={<>Signature pieces, <span className="italic text-gradient-walnut">hand-picked.</span></>}
            description="A curated edit of our most-loved sofas — each available in custom fabrics, sizes, and finishes."
            className="lg:max-w-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2"
          >
            {['All', 'In Stock', 'New', 'Boucle', 'Velvet'].map((f, i) => (
              <button
                key={f}
                className={cn(
                  'px-3.5 h-9 rounded-full text-[12px] font-button font-medium tracking-wide transition-all',
                  i === 0
                    ? 'bg-[#3e2a20] text-white hover:bg-[#6a4530]'
                    : 'bg-white border border-[#7a5230]/15 text-[#5e5e5e] hover:border-[#7a5230] hover:text-[#7a5230]'
                )}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {products.map((p, i) => (
            <SofaCard key={p.id} product={p} index={i} />
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
            href="#gallery"
            className="group inline-flex items-center gap-2.5 h-12 px-7 rounded-full border border-[#7a5230]/25 text-[#3e2a20] text-[13px] font-button font-medium tracking-wide hover:bg-[#3e2a20] hover:text-white hover:border-[#3e2a20] transition-all duration-300"
          >
            Load More Pieces
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.8} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
