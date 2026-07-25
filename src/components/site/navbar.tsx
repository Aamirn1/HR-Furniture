'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, ShoppingBag, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { navLinks, siteConfig } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="mx-auto max-w-[1400px] px-5 lg:px-10 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-16 h-16 shrink-0 transition-transform duration-500 group-hover:scale-105 translate-y-[3px]">
              <img
                src="/brand/brand-logo.png"
                alt="HR Furniture logo"
                className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                'font-heading text-[15px] font-semibold tracking-tight transition-colors',
                scrolled ? 'text-[#1d1d1d]' : 'text-white'
              )}>
                HR Furniture
              </span>
              <span className={cn(
                'text-[10px] tracking-[0.18em] uppercase mt-0.5 font-button transition-colors',
                scrolled ? 'text-[#5e5e5e]' : 'text-white/70'
              )}>
                Premium Sofas
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[13px] font-button font-medium tracking-wide link-underline transition-colors',
                  scrolled ? 'text-[#1d1d1d] hover:text-[#7a5230]' : 'text-white/95 hover:text-white'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                scrolled ? 'text-[#1d1d1d] hover:bg-[#7a5230]/10' : 'text-white hover:bg-white/15'
              )}
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <a
              href="#cart"
              aria-label="Cart"
              className={cn(
                'hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-colors relative',
                scrolled ? 'text-[#1d1d1d] hover:bg-[#7a5230]/10' : 'text-white hover:bg-white/15'
              )}
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#c88a5a] text-white text-[9px] font-button font-semibold flex items-center justify-center">
                0
              </span>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label="Call"
              className={cn(
                'hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-colors',
                scrolled ? 'text-[#1d1d1d] hover:bg-[#7a5230]/10' : 'text-white hover:bg-white/15'
              )}
            >
              <Phone className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="#contact"
              className={cn(
                'hidden md:inline-flex items-center gap-1.5 ml-2 px-4 h-9 rounded-full text-[12px] font-button font-medium tracking-wide transition-all duration-300',
                scrolled
                  ? 'bg-[#3e2a20] text-white hover:bg-[#6a4530] hover:shadow-luxury'
                  : 'bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25'
              )}
            >
              Book Consultation
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={cn(
                'lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                scrolled ? 'text-[#1d1d1d] hover:bg-[#7a5230]/10' : 'text-white hover:bg-white/15'
              )}
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Search drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#7a5230]/10 bg-white/80 backdrop-blur-md"
            >
              <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-5">
                <div className="flex items-center gap-3 border-b border-[#7a5230]/15 pb-2">
                  <Search className="w-4 h-4 text-[#5e5e5e]" strokeWidth={1.5} />
                  <input
                    autoFocus
                    placeholder="Search sofas, collections, materials…"
                    className="flex-1 bg-transparent outline-none text-[15px] text-[#1d1d1d] placeholder:text-[#5e5e5e]/70 font-button"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-[12px] font-button text-[#5e5e5e] hover:text-[#7a5230]">
                    ESC
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Boucle Sofas', 'L-Shape', 'Velvet', 'Under $4000', 'In Stock'].map((s) => (
                    <span key={s} className="text-[11px] font-button px-3 py-1 rounded-full bg-[#fafaf8] border border-[#7a5230]/10 text-[#5e5e5e] hover:border-[#7a5230]/30 hover:text-[#7a5230] transition-colors cursor-pointer">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#1a1614]/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#fafaf8] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#7a5230]/10">
                <span className="font-heading text-lg font-semibold text-[#1d1d1d]">Menu</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#7a5230]/10 transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-luxury px-6 py-4">
                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="py-3.5 border-b border-[#7a5230]/8 flex items-center justify-between group"
                    >
                      <span className="font-heading text-[20px] text-[#1d1d1d] group-hover:text-[#7a5230] transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#5e5e5e]/60 group-hover:text-[#7a5230] group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
                    </motion.a>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center w-full h-12 rounded-full bg-[#3e2a20] text-white text-[13px] font-button font-medium tracking-wide hover:bg-[#6a4530] transition-colors"
                >
                  Book Consultation
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-3 inline-flex items-center justify-center w-full h-12 rounded-full bg-white border border-[#7a5230]/20 text-[#1d1d1d] text-[13px] font-button font-medium tracking-wide hover:border-[#7a5230] transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" strokeWidth={1.5} /> {siteConfig.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button */}
      <motion.a
        href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp inquiry"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxury-lg hover:shadow-luxury"
      >
        <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
        <span className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/40 animate-ping" style={{ animationDuration: '2.5s' }} />
      </motion.a>
    </>
  )
}
