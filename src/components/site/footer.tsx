'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, ArrowUp, ArrowRight } from 'lucide-react'
import { siteConfig, navLinks, categories } from '@/lib/site-data'

export function Footer() {
  return (
    <footer className="relative bg-[#1a1614] text-white overflow-hidden">
      {/* Decorative top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b36a]/50 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(216,179,106,0.4) 0%, transparent 70%)' }} />

      {/* Newsletter */}
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 py-16 lg:py-20 border-b border-white/8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[11px] font-button tracking-[0.22em] uppercase text-[#d8b36a]">
              The HR Journal
            </span>
            <h3 className="mt-3 font-heading text-[28px] md:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
              New collections, behind-the-scenes craft, and design notes — monthly.
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-12 rounded-full bg-white/8 border border-white/12 px-5 text-[14px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#d8b36a] text-[#1a1614] text-[13px] font-button font-semibold tracking-wide hover:bg-[#e6c588] transition-colors"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </form>
            <p className="mt-3 text-[11px] font-button text-white/50">
              We respect your inbox. Unsubscribe anytime. No spam, ever.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 py-14 lg:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7a5230] to-[#d8b36a] flex items-center justify-center text-white font-heading font-bold text-sm shadow-soft">
              HR
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-[16px] font-semibold tracking-tight text-white">
                HR Furniture
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-[#d8b36a]/80 mt-0.5 font-button">
                Premium Sofas
              </span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-white/55 font-sans max-w-sm text-pretty">
            Hand-built premium sofas and living furniture, crafted for comfort, elegance, and timeless interiors since 2009.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[
              { Icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
              { Icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
              { Icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#d8b36a] hover:text-[#1a1614] hover:border-[#d8b36a] transition-all duration-300"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-button tracking-[0.18em] uppercase text-[#d8b36a] mb-2">Explore</span>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-button text-white/65 hover:text-white transition-colors link-underline self-start"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Collections */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-button tracking-[0.18em] uppercase text-[#d8b36a] mb-2">Collections</span>
          {categories.slice(0, 6).map((cat) => (
            <a
              key={cat.id}
              href="#collections"
              className="text-[13px] font-button text-white/65 hover:text-white transition-colors link-underline self-start"
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <span className="text-[11px] font-button tracking-[0.18em] uppercase text-[#d8b36a] mb-2">Visit</span>
          <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-2 text-[13px] font-button text-white/65 hover:text-white transition-colors">
            <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#d8b36a]" strokeWidth={1.5} />
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-2 text-[13px] font-button text-white/65 hover:text-white transition-colors">
            <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#d8b36a]" strokeWidth={1.5} />
            {siteConfig.email}
          </a>
          <div className="flex items-start gap-2 text-[13px] font-button text-white/65">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#d8b36a]" strokeWidth={1.5} />
            {siteConfig.address}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] font-button text-white/45">
            <span>© {new Date().getFullYear()} HR Furniture. All rights reserved.</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/30" />
            <a href="#" className="hidden sm:inline hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hidden sm:inline hover:text-white transition-colors">Terms</a>
            <a href="#" className="hidden sm:inline hover:text-white transition-colors">Warranty</a>
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-[11px] font-button tracking-[0.16em] uppercase text-white/60 hover:text-[#d8b36a] transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </footer>
  )
}
