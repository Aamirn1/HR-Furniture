'use client'

import dynamic from 'next/dynamic'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { Categories } from '@/components/sections/categories'
import { WhyHR } from '@/components/sections/why-hr'
import { FeaturedCollection } from '@/components/sections/featured-collection'
import { BeforeAfter } from '@/components/sections/before-after'
import { Materials } from '@/components/sections/materials'
import { SofaBuilder } from '@/components/sections/sofa-builder'
import { Statistics } from '@/components/sections/statistics'
import { Testimonials } from '@/components/sections/testimonials'
import { Gallery } from '@/components/sections/gallery'
import { Process } from '@/components/sections/process'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

// Lazy-load the 3D showcase so Three.js (~600KB) is in a separate chunk
// that's only fetched when the user scrolls near this section.
const Showcase3D = dynamic(
  () => import('@/components/sections/showcase-3d').then(m => m.Showcase3D),
  {
    ssr: false,
    loading: () => (
      <section id="showcase-3d" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#1a1614] via-[#221c18] to-[#1a1614] text-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="h-[420px] lg:h-[560px] rounded-3xl bg-gradient-to-br from-[#2a2420] to-[#1a1614] border border-white/10 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d8b36a]/20 to-[#c88a5a]/10 animate-pulse" />
          </div>
        </div>
      </section>
    ),
  }
)

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <WhyHR />
        <FeaturedCollection />
        <Showcase3D />
        <BeforeAfter />
        <Materials />
        <SofaBuilder />
        <Statistics />
        <Testimonials />
        <Gallery />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
