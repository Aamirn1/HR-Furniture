'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 max-w-3xl',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 text-[11px] font-button tracking-[0.22em] uppercase text-[#7a5230]"
        >
          <span className="w-6 h-px bg-[#d8b36a]" />
          {eyebrow}
          <span className="w-6 h-px bg-[#d8b36a]" />
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-[34px] md:text-[46px] lg:text-[58px] font-semibold tracking-[-0.02em] text-[#1d1d1d] leading-[1.05] text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-[15px] md:text-[16px] leading-relaxed text-[#5e5e5e] font-sans text-pretty"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
