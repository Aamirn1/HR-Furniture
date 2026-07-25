'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { siteConfig } from '@/lib/site-data'
import { SectionHeader } from './section-header'

export function CTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#fafaf8] to-white overflow-hidden">
      {/* Big premium CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1400px] px-5 lg:px-10"
      >
        <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#3e2a20] via-[#1a1614] to-[#3e2a20] px-6 lg:px-16 py-16 lg:py-24">
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(216,179,106,0.5) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(200,138,90,0.5) 0%, transparent 70%)' }} />

          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px), radial-gradient(circle at 80% 30%, white 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-[11px] font-button tracking-[0.22em] uppercase text-[#d8b36a]"
              >
                <span className="w-6 h-px bg-[#d8b36a]" />
                Ready When You Are
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="mt-5 font-heading text-[36px] md:text-[48px] lg:text-[60px] font-semibold text-white tracking-[-0.02em] leading-[1.02] text-balance"
              >
                Ready to transform<br />
                <span className="italic text-gradient-gold">your living space?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-md text-[14px] lg:text-[15px] leading-relaxed text-white/65 font-sans text-pretty"
              >
                Book a private consultation with our design team. We’ll review your space, discuss fabric and finish options, and provide a transparent quote within 48 hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-2.5 h-12 pl-6 pr-5 rounded-full bg-[#d8b36a] text-[#1a1614] text-[13px] font-button font-semibold tracking-wide hover:bg-[#e6c588] transition-all duration-300 hover:shadow-luxury"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2.5 h-12 pl-6 pr-5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[13px] font-button font-medium tracking-wide hover:bg-white/15 transition-colors"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  {siteConfig.phone}
                </a>
              </motion.div>
            </div>

            {/* Right form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="rounded-3xl bg-white/8 backdrop-blur-md border border-white/12 p-6 lg:p-8"
            >
              <h3 className="font-heading text-[20px] lg:text-[22px] font-semibold text-white mb-1">
                Quick Inquiry
              </h3>
              <p className="text-[12px] text-white/60 mb-6 font-sans">We reply within 1 business day.</p>

              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="First name"
                    className="h-11 rounded-xl bg-white/8 border border-white/12 px-4 text-[13px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors"
                  />
                  <input
                    placeholder="Last name"
                    className="h-11 rounded-xl bg-white/8 border border-white/12 px-4 text-[13px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-11 rounded-xl bg-white/8 border border-white/12 px-4 text-[13px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors"
                />
                <input
                  placeholder="Tell us about your space"
                  className="h-11 rounded-xl bg-white/8 border border-white/12 px-4 text-[13px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors"
                />
                <textarea
                  placeholder="Project details (optional)"
                  rows={3}
                  className="rounded-xl bg-white/8 border border-white/12 px-4 py-3 text-[13px] text-white placeholder:text-white/40 font-button focus:outline-none focus:border-[#d8b36a] transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#d8b36a] text-[#1a1614] text-[13px] font-button font-semibold tracking-wide hover:bg-[#e6c588] transition-colors"
                >
                  Send Inquiry
                  <Send className="w-4 h-4" strokeWidth={1.8} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Contact details strip */}
      <div className="mt-16 mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Phone, label: 'Call Us', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
            { icon: Mail, label: 'Email Us', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
            { icon: MapPin, label: 'Visit Showroom', value: siteConfig.address, href: '#map' },
            { icon: Clock, label: 'Open Hours', value: siteConfig.hours, href: '#contact-form' },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#7a5230]/10 hover:border-[#7a5230]/25 hover:shadow-soft transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7a5230]/8 flex items-center justify-center group-hover:bg-[#7a5230] group-hover:text-white transition-colors">
                <item.icon className="w-4 h-4 text-[#7a5230] group-hover:text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-button tracking-[0.16em] uppercase text-[#5e5e5e]">{item.label}</span>
                <span className="mt-1 text-[13px] font-button font-medium text-[#1d1d1d] leading-snug">{item.value}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Map embed (synthetic) */}
      <motion.div
        id="map"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mt-10 mx-auto max-w-[1400px] px-5 lg:px-10"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#fafaf8] to-[#f0e9da] border border-[#7a5230]/10 aspect-[16/6] lg:aspect-[16/5]">
          {/* Map grid */}
          <div className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(122,82,48,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(122,82,48,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Roads */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
              <path d="M0 180 Q200 150 400 180 T800 200" stroke="rgba(122,82,48,0.3)" strokeWidth="3" fill="none" />
              <path d="M0 100 Q300 120 500 80 T800 120" stroke="rgba(122,82,48,0.2)" strokeWidth="2" fill="none" />
              <path d="M100 0 L120 300" stroke="rgba(122,82,48,0.2)" strokeWidth="2" fill="none" />
              <path d="M400 0 L420 300" stroke="rgba(122,82,48,0.25)" strokeWidth="2.5" fill="none" />
              <path d="M650 0 L680 300" stroke="rgba(122,82,48,0.2)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          {/* Pin */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-[#3e2a20] border-4 border-white shadow-luxury-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#d8b36a]" strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#7a5230]/30 animate-ping" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-full bg-white shadow-soft text-[11px] font-button font-medium text-[#3e2a20] whitespace-nowrap">
                HR Furniture Showroom
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
