'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'

// Split-letter text reveal
function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              aria-hidden
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: delay + (wi * 0.08) + (ci * 0.025),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{ willChange: 'transform' }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block w-[0.28em]">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden bg-[#1a1614]">
      {/* Background image with parallax + scale on scroll */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-[1]"
      >
        <Image
          src="/hero/living-room.jpg"
          alt="Luxury living room with a cream boucle sofa, walnut floors, and natural daylight"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlays for text readability — left-darker so the headline stays crisp */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#1a1614]/85 via-[#1a1614]/55 to-transparent" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#1a1614]/90 via-transparent to-[#1a1614]/35" />

      {/* Subtle grain for editorial feel */}
      <div className="absolute inset-0 z-[3] grain pointer-events-none opacity-60" />

      {/* Soft champagne glow that drifts */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl z-[2] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(216, 179, 106, 0.45) 0%, transparent 70%)' }}
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* White initial-load overlay that fades to reveal the image */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: loaded ? 0 : 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-0 z-[8] bg-[#fafaf8] pointer-events-none"
      />
      {/* Top reveal sweep line */}
      <motion.div
        initial={{ opacity: 1, scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1.4, ease: [0.77, 0, 0.18, 1] }}
        style={{ originX: 1 }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7a5230] via-[#d8b36a] to-transparent z-[9]"
      />

      {/* Foreground content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-10 pt-28 lg:pt-36 pb-10 min-h-screen flex flex-col justify-between pointer-events-none"
      >
        <div className="flex-1 flex flex-col items-start justify-end pb-8 lg:pb-12">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md mb-5 pointer-events-auto"
          >
            <Sparkles className="w-3 h-3 text-[#d8b36a]" />
            <span className="text-[11px] font-button tracking-[0.18em] uppercase text-white/85">
              Premium Sofas · Since 2009
            </span>
          </motion.div>

          {/* Headline — white on dark overlay for contrast */}
          <h1 className="font-heading text-[40px] leading-[1.02] sm:text-[56px] md:text-[72px] lg:text-[92px] xl:text-[108px] font-semibold text-white tracking-[-0.02em] max-w-[14ch] drop-shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
            <SplitText text="Crafted" delay={0.6} />
            <br />
            <span className="italic text-gradient-gold font-medium">
              <SplitText text="For Beautiful" delay={0.95} />
            </span>
            <br />
            <SplitText text="Living." delay={1.35} />
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-5 max-w-md text-[14px] md:text-[15px] leading-relaxed text-white/80 font-sans text-pretty pointer-events-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
          >
            Premium sofas designed for comfort, elegance, and timeless interiors. Each piece is hand-built by master upholsterers in our workshop.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.0 }}
            className="mt-7 flex flex-wrap items-center gap-3 pointer-events-auto"
          >
            <a
              href="#collections"
              className="group inline-flex items-center gap-2.5 h-12 pl-6 pr-5 rounded-full bg-[#d8b36a] text-[#1a1614] text-[13px] font-button font-semibold tracking-wide hover:bg-[#e6c588] transition-all duration-300 hover:shadow-luxury"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 h-12 pl-6 pr-5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-[13px] font-button font-medium tracking-wide hover:bg-white/20 hover:border-white/60 transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-[#d8b36a]" strokeWidth={1.5} />
              Book Consultation
            </a>
          </motion.div>
        </div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 pointer-events-auto border-t border-white/15 pt-6"
        >
          {[
            { k: '15+', v: 'Years of Craft' },
            { k: '5000+', v: 'Homes Furnished' },
            { k: '600+', v: 'Curated Fabrics' },
            { k: '10y', v: 'Frame Warranty' },
          ].map((s) => (
            <div key={s.v} className="flex flex-col">
              <span className="font-numeric text-[26px] md:text-[34px] font-medium text-white tracking-tight">
                {s.k}
              </span>
              <span className="text-[11px] font-button tracking-[0.16em] uppercase text-white/65 mt-1">
                {s.v}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint — hidden on small viewports to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="hidden xl:flex absolute bottom-8 right-8 z-10 flex-col items-center gap-2 pointer-events-none"
        style={{ opacity }}
      >
        <span className="text-[10px] font-button tracking-[0.2em] uppercase text-white/70 rotate-90 origin-center whitespace-nowrap">Scroll</span>
      </motion.div>
    </section>
  )
}
