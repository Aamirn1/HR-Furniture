'use client'

import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/sections/hero'
import { Categories } from '@/components/sections/categories'
import { WhyHR } from '@/components/sections/why-hr'
import { FeaturedCollection } from '@/components/sections/featured-collection'
import { Showcase3D } from '@/components/sections/showcase-3d'
import { BeforeAfter } from '@/components/sections/before-after'
import { Materials } from '@/components/sections/materials'
import { SofaBuilder } from '@/components/sections/sofa-builder'
import { Statistics } from '@/components/sections/statistics'
import { Testimonials } from '@/components/sections/testimonials'
import { Gallery } from '@/components/sections/gallery'
import { Process } from '@/components/sections/process'
import { FAQ } from '@/components/sections/faq'
import { CTA } from '@/components/sections/cta'

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
