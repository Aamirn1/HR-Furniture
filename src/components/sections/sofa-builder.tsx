'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'
import { sofaBuilderOptions } from '@/lib/site-data'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

const steps = [
  { key: 'shape', label: 'Shape', options: sofaBuilderOptions.shapes },
  { key: 'fabric', label: 'Fabric', options: sofaBuilderOptions.fabrics },
  { key: 'wood', label: 'Wood', options: sofaBuilderOptions.woodFinishes },
  { key: 'leg', label: 'Leg Style', options: sofaBuilderOptions.legStyles },
  { key: 'size', label: 'Size', options: sofaBuilderOptions.sizes },
] as const

export function SofaBuilder() {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({
    shape: '3seat',
    fabric: 'boucle',
    wood: 'walnut',
    leg: 'sabre',
    size: 'standard',
  })

  const current = steps[step]
  const isLast = step === steps.length - 1

  const set = (val: string) => {
    setSelections((s) => ({ ...s, [current.key]: val }))
  }

  const next = () => {
    if (isLast) return
    setStep((s) => s + 1)
  }
  const prev = () => setStep((s) => Math.max(0, s - 1))
  const reset = () => {
    setStep(0)
    setSelections({ shape: '3seat', fabric: 'boucle', wood: 'walnut', leg: 'sabre', size: 'standard' })
  }

  // Get the active fabric color for preview
  const fabricColor = sofaBuilderOptions.fabrics.find((f) => f.id === selections.fabric)?.color ?? '#e8dcc4'
  const woodColor = sofaBuilderOptions.woodFinishes.find((w) => w.id === selections.wood)?.color ?? '#5a3a28'

  // Pricing
  const basePrice = 3890
  const stepAdjust: Record<string, number> = {
    '4seat': 800, 'lshape': 1800, 'loveseat': -700,
    'velvet': 350, 'leather': 1100,
    'oak': 0, 'matte-black': 100, 'brass': 350,
    'tapered': 0, 'block': 0, 'metal-stiletto': 250,
    'compact': -400, 'lounge': 600,
  }
  const adjustments = Object.values(selections).reduce((sum, v) => sum + (stepAdjust[v] ?? 0), 0)
  const price = basePrice + adjustments

  return (
    <section id="sofa-builder" className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-[#fafaf8] overflow-hidden">
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-25 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(200,138,90,0.4) 0%, transparent 70%)' }} />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader
          eyebrow="Custom Sofa Builder"
          title={<>Design your <span className="italic text-gradient-walnut">own</span> sofa.</>}
          description="A five-step configurator with live preview and instant pricing. Every combination is hand-built to order."
        />

        <div className="mt-14 grid lg:grid-cols-[1fr_440px] gap-6 lg:gap-10 items-stretch">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#fafaf8] to-[#f0e9da] border border-[#7a5230]/10 shadow-soft p-8 lg:p-10 flex flex-col"
          >
            {/* Studio backdrop */}
            <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at center, rgba(216,179,106,0.15), transparent 65%)' }} />

            {/* Live preview SVG */}
            <div className="relative flex-1 flex items-center justify-center min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selections.shape}-${selections.fabric}-${selections.wood}-${selections.leg}-${selections.size}`}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[460px]"
                >
                  <SofaPreview fabricColor={fabricColor} woodColor={woodColor} shape={selections.shape} size={selections.size} leg={selections.leg} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selections summary */}
            <div className="relative mt-6 pt-6 border-t border-[#7a5230]/12 grid grid-cols-5 gap-2">
              {steps.map((s) => {
                const sel = selections[s.key]
                const opt = (s.options as Array<{ id: string; name: string }>).find((o) => o.id === sel)
                return (
                  <div key={s.key} className="flex flex-col gap-1 text-center">
                    <span className="text-[10px] font-button tracking-[0.14em] uppercase text-[#5e5e5e]">{s.label}</span>
                    <span className="text-[11px] font-button font-medium text-[#1d1d1d] truncate">{opt?.name ?? '—'}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Stepper panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="rounded-3xl bg-white border border-[#7a5230]/10 shadow-soft p-6 lg:p-8 flex flex-col"
          >
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5">
                {steps.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => setStep(i)}
                    className="group flex flex-col items-center"
                    aria-label={`Go to ${s.label}`}
                  >
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-button font-semibold transition-all',
                        i === step
                          ? 'bg-[#3e2a20] text-white scale-110'
                          : i < step
                          ? 'bg-[#7a5230] text-white'
                          : 'bg-[#fafaf8] border border-[#7a5230]/15 text-[#5e5e5e]'
                      )}
                    >
                      {i < step ? <Check className="w-3 h-3" strokeWidth={2.4} /> : i + 1}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-[11px] font-button text-[#5e5e5e] hover:text-[#7a5230] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Reset
              </button>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[11px] font-button tracking-[0.16em] uppercase text-[#5e5e5e]">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-[11px] font-button text-[#7a5230]">{current.label}</span>
            </div>
            <h3 className="font-heading text-[22px] font-semibold text-[#1d1d1d] mb-5">
              Choose your {current.label.toLowerCase()}.
            </h3>

            {/* Options */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-2.5"
                >
                  {current.options.map((opt) => {
                    const o = opt as { id: string; name: string; color?: string; dims?: string; note?: string }
                    const selected = selections[current.key] === o.id
                    return (
                      <button
                        key={o.id}
                        onClick={() => set(o.id)}
                        className={cn(
                          'relative flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all',
                          selected
                            ? 'border-[#3e2a20] bg-[#fafaf8] shadow-soft'
                            : 'border-[#7a5230]/10 hover:border-[#7a5230]/30 hover:bg-[#fafaf8]/50'
                        )}
                      >
                        {o.color && (
                          <span
                            className="w-8 h-8 rounded-full border border-[#7a5230]/15 shrink-0"
                            style={{ backgroundColor: o.color }}
                          />
                        )}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-[13px] font-button font-medium text-[#1d1d1d] truncate">{o.name}</span>
                          {(o.dims || o.note) && (
                            <span className="text-[10px] font-button text-[#5e5e5e] truncate">{o.dims ?? o.note}</span>
                          )}
                        </div>
                        {selected && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#3e2a20] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" strokeWidth={2.4} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-7 pt-6 border-t border-[#7a5230]/12">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[10px] font-button tracking-[0.16em] uppercase text-[#5e5e5e]">Live Estimate</div>
                  <div className="font-numeric text-[26px] font-medium text-[#3e2a20]">
                    ${price.toLocaleString()}
                  </div>
                </div>
                <span className="text-[11px] font-button text-[#5e5e5e]">Lead time 3–5 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#7a5230]/20 text-[#3e2a20] hover:bg-[#fafaf8] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous step"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.8} />
                </button>
                {isLast ? (
                  <a
                    href="#contact"
                    className="flex-1 inline-flex items-center justify-center h-11 rounded-full bg-[#3e2a20] text-white text-[13px] font-button font-medium tracking-wide hover:bg-[#6a4530] transition-colors"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.8} />
                  </a>
                ) : (
                  <button
                    onClick={next}
                    className="flex-1 inline-flex items-center justify-center h-11 rounded-full bg-[#3e2a20] text-white text-[13px] font-button font-medium tracking-wide hover:bg-[#6a4530] transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.8} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SofaPreview({ fabricColor, woodColor, shape, size, leg }: { fabricColor: string; woodColor: string; shape: string; size: string; leg: string }) {
  // Adjust viewBox / scale based on shape and size
  const isLShape = shape === 'lshape'
  const isLarge = shape === '4seat' || shape === 'lshape'
  const isSmall = shape === 'loveseat'
  const scale = isLarge ? 1.05 : isSmall ? 0.85 : 1

  // Leg style affects leg thickness and length
  const legW = leg === 'block' ? 12 : leg === 'metal-stiletto' ? 4 : leg === 'tapered' ? 8 : 8
  const legH = leg === 'metal-stiletto' ? 22 : leg === 'block' ? 10 : 16
  const legColor = leg === 'metal-stiletto' ? (woodColor === '#1d1d1d' ? '#1d1d1d' : '#c8a065') : woodColor

  return (
    <svg viewBox="0 0 400 240" className="w-full h-auto" style={{ transform: `scale(${scale})`, transformOrigin: 'center', filter: 'drop-shadow(0 18px 30px rgba(62,42,32,0.18))' }} aria-hidden>
      {/* Shadow */}
      <ellipse cx="200" cy="215" rx={isLShape ? 200 : 170} ry="8" fill="rgba(62,42,32,0.18)" />

      {isLShape ? (
        <>
          {/* L-Shape: main body + corner */}
          <path d="M40 140 Q40 105 70 102 L300 102 Q330 105 330 140 L330 180 Q330 190 320 190 L50 190 Q40 190 40 180 Z" fill={fabricColor} />
          {/* L extension */}
          <path d="M260 140 Q260 130 270 130 L330 130 L330 220 Q330 230 320 230 L270 230 Q260 230 260 220 Z" fill={fabricColor} opacity="0.95" />
          <rect x="70" y="115" width="60" height="55" rx="8" fill={fabricColor} opacity="0.88" />
          <rect x="140" y="115" width="60" height="55" rx="8" fill={fabricColor} opacity="0.88" />
          <rect x="210" y="115" width="60" height="55" rx="8" fill={fabricColor} opacity="0.88" />
          <rect x="275" y="145" width="40" height="50" rx="6" fill={fabricColor} opacity="0.88" />
          {/* Backrest */}
          <rect x="70" y="92" width="60" height="28" rx="6" fill={fabricColor} opacity="0.72" />
          <rect x="140" y="89" width="60" height="31" rx="6" fill={fabricColor} opacity="0.72" />
          <rect x="210" y="92" width="60" height="28" rx="6" fill={fabricColor} opacity="0.72" />
        </>
      ) : (
        <>
          {/* Main body — coordinates chosen by shape */}
          {(() => {
            const left = isSmall ? 110 : 70
            const right = isSmall ? 290 : 330
            const top = 102
            const bottom = 190
            const path = `M${left} 140 Q${left} 105 ${left + 30} ${top} L${right - 30} ${top} Q${right} 105 ${right} 140 L${right} 180 Q${right} ${bottom} ${right - 10} ${bottom} L${left + 10} ${bottom} Q${left} ${bottom} ${left} 180 Z`
            return <path d={path} fill={fabricColor} />
          })()}
          {/* Cushions */}
          {isSmall ? (
            <>
              <rect x="125" y="115" width="70" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="205" y="115" width="70" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="125" y="92" width="70" height="28" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="205" y="92" width="70" height="28" rx="6" fill={fabricColor} opacity="0.72" />
            </>
          ) : isLarge ? (
            <>
              <rect x="85" y="115" width="55" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="150" y="115" width="55" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="215" y="115" width="55" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="280" y="115" width="40" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="85" y="92" width="55" height="28" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="150" y="89" width="55" height="31" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="215" y="92" width="55" height="28" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="280" y="92" width="40" height="28" rx="6" fill={fabricColor} opacity="0.72" />
            </>
          ) : (
            <>
              <rect x="85" y="115" width="70" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="165" y="115" width="70" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="245" y="115" width="70" height="55" rx="9" fill={fabricColor} opacity="0.88" />
              <rect x="85" y="92" width="70" height="28" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="165" y="89" width="70" height="31" rx="6" fill={fabricColor} opacity="0.72" />
              <rect x="245" y="92" width="70" height="28" rx="6" fill={fabricColor} opacity="0.72" />
            </>
          )}
        </>
      )}

      {/* Legs */}
      <rect x="80" y="188" width={legW} height={legH} rx="2" fill={legColor} />
      <rect x="312" y="188" width={legW} height={legH} rx="2" fill={legColor} />
      {isLShape && <rect x="312" y="218" width={legW} height={legH} rx="2" fill={legColor} />}
      {isSmall && <rect x="195" y="188" width={legW} height={legH} rx="2" fill={legColor} opacity="0.6" />}

      {/* Highlight */}
      <line x1="100" y1="105" x2="300" y2="105" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
