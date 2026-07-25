'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls, Float } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { RotateCw, ZoomIn, Palette, Ruler, Move } from 'lucide-react'
import { SectionHeader } from './section-header'

// Reusable sofa, parameterized by fabric color and wood color
function ShowcaseSofa({ fabricColor, woodColor }: { fabricColor: string; woodColor: string }) {
  const group = useRef<THREE.Group | null>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.position.y = Math.sin(t * 0.5) * 0.04
  })

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* Seat base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.42, 1.15]} />
        <meshStandardMaterial color={fabricColor} roughness={0.78} metalness={0.04} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 1.18, -0.42]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.05, 0.28]} />
        <meshStandardMaterial color={fabricColor} roughness={0.78} metalness={0.04} />
      </mesh>
      {/* Cushions */}
      {[-0.95, 0, 0.95].map((x) => (
        <mesh key={`c-${x}`} position={[x, 0.78, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.95, 0.2, 0.95]} />
          <meshStandardMaterial color={fabricColor} roughness={0.85} metalness={0.02} />
        </mesh>
      ))}
      {/* Arms */}
      {[-1.55, 1.55].map((x) => (
        <mesh key={`a-${x}`} position={[x, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.7, 1.2]} />
          <meshStandardMaterial color={fabricColor} roughness={0.78} metalness={0.04} />
        </mesh>
      ))}
      {/* Legs */}
      {[[-1.45, -0.45], [1.45, -0.45], [-1.45, 0.45], [1.45, 0.45]].map(([x, z], i) => (
        <mesh key={`l-${i}`} position={[x, 0.05, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.04, 0.5, 16]} />
          <meshStandardMaterial color={woodColor} roughness={0.35} metalness={0.5} />
        </mesh>
      ))}
    </group>
  )
}

const fabricSwatches = [
  { name: 'Boucle Ivory', color: '#e8dcc4' },
  { name: 'Linen Sand', color: '#d8cfb8' },
  { name: 'Walnut Velvet', color: '#5a3a28' },
  { name: 'Sage Wool', color: '#a8b896' },
  { name: 'Terracotta', color: '#c88a5a' },
  { name: 'Charcoal', color: '#3a3a3a' },
]

const woodSwatches = [
  { name: 'Walnut', color: '#5a3a28' },
  { name: 'Oak', color: '#c8a878' },
  { name: 'Matte Black', color: '#1d1d1d' },
  { name: 'Brass', color: '#c8a065' },
]

function Scene({ fabricColor, woodColor }: { fabricColor: string; woodColor: string }) {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-4, 4, 2]} intensity={0.5} angle={0.5} penumbra={1} color="#f5e7c8" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.05} floatIntensity={0.18}>
          <ShowcaseSofa fabricColor={fabricColor} woodColor={woodColor} />
        </Float>
        <ContactShadows position={[0, -0.3, 0]} opacity={0.55} scale={12} blur={2.6} far={4} color="#3e2a20" />
        <Environment preset="apartment" environmentIntensity={0.5} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={9}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate={false}
          makeDefault
        />
      </Suspense>
    </Canvas>
  )
}

export function Showcase3D() {
  const [fabric, setFabric] = useState(fabricSwatches[0])
  const [wood, setWood] = useState(woodSwatches[0])
  const [shouldRender3D, setShouldRender3D] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)

  // Lazy-load the 3D Canvas only when the section enters the viewport.
  // This prevents Three.js (a ~600KB library) from loading on initial page load.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender3D(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="showcase-3d" className="relative py-24 lg:py-32 bg-gradient-to-b from-[#1a1614] via-[#221c18] to-[#1a1614] text-white overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(216,179,106,0.4) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(200,138,90,0.3) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-button tracking-[0.22em] uppercase text-[#d8b36a]">
            <span className="w-6 h-px bg-[#d8b36a]" /> Interactive 3D <span className="w-6 h-px bg-[#d8b36a]" />
          </span>
          <h2 className="mt-4 font-heading text-[34px] md:text-[46px] lg:text-[58px] font-semibold tracking-[-0.02em] leading-[1.05] text-balance">
            Spin it. <span className="italic text-gradient-gold">Style it.</span> Make it yours.
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-white/70 font-sans text-pretty">
            Drag to rotate, scroll to zoom, and swap fabrics and leg finishes in real time. Every combination is buildable.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-stretch">
          {/* 3D Stage */}
          <motion.div
            ref={stageRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative h-[420px] lg:h-[560px] rounded-3xl bg-gradient-to-br from-[#2a2420] to-[#1a1614] border border-white/10 overflow-hidden shadow-luxury-lg"
          >
            {/* Floor reflection hint */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#d8b36a]/8 to-transparent pointer-events-none" />
            {/* 3D Canvas — only rendered when section enters viewport (defers ~600KB Three.js load) */}
            {shouldRender3D ? (
              <Scene fabricColor={fabric.color} woodColor={wood.color} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d8b36a]/20 to-[#c88a5a]/10 animate-pulse" />
              </div>
            )}

            {/* Floating control hints */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-button text-white/80">
                <Move className="w-3.5 h-3.5" strokeWidth={1.5} /> Drag to rotate
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-button text-white/80">
                <ZoomIn className="w-3.5 h-3.5" strokeWidth={1.5} /> Scroll to zoom
              </div>
            </div>

            {/* Specs */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              {[
                { icon: Ruler, label: 'Dimensions', value: '220 × 95 × 78 cm' },
                { icon: Palette, label: 'Fabric', value: fabric.name },
                { icon: RotateCw, label: 'Frame', value: wood.name },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/8 backdrop-blur-md border border-white/12 p-3 lg:p-4">
                  <div className="flex items-center gap-2 text-[10px] font-button tracking-[0.12em] uppercase text-white/50 mb-1">
                    <s.icon className="w-3 h-3" strokeWidth={1.5} />
                    {s.label}
                  </div>
                  <div className="font-numeric text-[12px] lg:text-[13px] text-white truncate">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Configurator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-7 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="font-heading text-[20px] font-semibold text-white">Configure Live</h3>
              <p className="text-[12px] text-white/60 mt-1 font-sans">Tap a swatch to apply it instantly.</p>
            </div>

            <div className="space-y-7 flex-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-button tracking-[0.16em] uppercase text-white/60">Fabric</span>
                  <span className="text-[12px] font-button text-white">{fabric.name}</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {fabricSwatches.map((f) => (
                    <button
                      key={f.name}
                      onClick={() => setFabric(f)}
                      aria-label={f.name}
                      className="relative aspect-square rounded-full border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: f.color,
                        borderColor: fabric.name === f.name ? '#d8b36a' : 'rgba(255,255,255,0.15)',
                        transform: fabric.name === f.name ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {fabric.name === f.name && (
                        <span className="absolute -inset-1 rounded-full ring-1 ring-[#d8b36a]/40" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-button tracking-[0.16em] uppercase text-white/60">Wood Finish</span>
                  <span className="text-[12px] font-button text-white">{wood.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {woodSwatches.map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setWood(w)}
                      className="flex flex-col items-center gap-2 p-2 rounded-xl border transition-all hover:bg-white/5"
                      style={{
                        borderColor: wood.name === w.name ? '#d8b36a' : 'rgba(255,255,255,0.1)',
                        backgroundColor: wood.name === w.name ? 'rgba(216,179,106,0.08)' : 'transparent',
                      }}
                    >
                      <span className="w-8 h-8 rounded-full border border-white/15" style={{ backgroundColor: w.color }} />
                      <span className="text-[10px] font-button text-white/70">{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-button tracking-[0.16em] uppercase text-white/60">Seating</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['2-Seater', '3-Seater', 'L-Shape', 'Sectional'].map((s, i) => (
                    <button
                      key={s}
                      className={`px-3 h-9 rounded-full text-[12px] font-button font-medium transition-all ${
                        i === 1 ? 'bg-[#d8b36a] text-[#1a1614]' : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-button tracking-[0.16em] uppercase text-white/50">From</div>
                <div className="font-numeric text-[24px] font-medium text-white">$3,890</div>
              </div>
              <a
                href="#sofa-builder"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-[#d8b36a] text-[#1a1614] text-[12px] font-button font-semibold tracking-wide hover:bg-[#e0c078] transition-colors"
              >
                Build Your Own
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
