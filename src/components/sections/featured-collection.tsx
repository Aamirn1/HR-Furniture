'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, Heart, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { products, type Product } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

function SofaCard({ product, index }: { product: Product; index: number }) {
  const [liked, setLiked] = useState(false)

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
      {/* Product image */}
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden',
          index === 0 ? 'lg:aspect-[16/9]' : ''
        )}
      >
        <Image
          src={product.image}
          alt={`${product.name} — ${product.blurb}`}
          fill
          sizes={index === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle bottom shadow for badge/CTA readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1a1614]/40 to-transparent" />

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
