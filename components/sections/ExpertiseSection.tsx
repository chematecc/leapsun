'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const cardStyles = [
  {
    tint: '#EEF9F5',
    accentColor: '#16A086',
    iconColor: '#16A086',
    numColor: 'rgba(22,160,134,0.12)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tint: '#EEF4FD',
    accentColor: '#2563EB',
    iconColor: '#2563EB',
    numColor: 'rgba(37,99,235,0.10)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M6 3 Q12 7 18 3 Q12 11 6 11 Q12 15 18 11 Q12 19 6 19 Q12 23 18 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tint: '#FEF9EE',
    accentColor: '#D97706',
    iconColor: '#D97706',
    numColor: 'rgba(217,119,6,0.10)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3 Q8 7 8 12 Q8 17 12 21M12 3 Q16 7 16 12 Q16 17 12 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tint: '#F3EFFD',
    accentColor: '#7C3AED',
    iconColor: '#7C3AED',
    numColor: 'rgba(124,58,237,0.10)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tint: '#FEF1F4',
    accentColor: '#E11D48',
    iconColor: '#E11D48',
    numColor: 'rgba(225,29,72,0.10)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M2 12 Q6 8 10 10 L14 10 Q16 9 18 10 L22 12M10 10 L12 14 L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 16 Q10 18 14 16 Q18 14 20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

/* Flat-top hexagon clip path */
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

export default function ExpertiseSection() {
  const t = useTranslations('expertise');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as { title: string; desc: string; url?: string }[];

  /*
   * Honeycomb layout — 5 cells:
   *   Row 1: cells 0, 1, 2  (3 hexagons)
   *   Row 2: cells 3, 4     (2 hexagons, offset to sit in the gaps)
   *
   * Using flat-top hexagons (rotated 90°):
   *   W = hex width, H = hex height = W * sin(60°) * 2 = W * √3
   *   Horizontal step = W * 0.75
   *   Vertical step   = H
   *   Row 2 offset    = H / 2
   */
  const HEX_W = 270;
  const HEX_H = Math.round(HEX_W * Math.sqrt(3) / 2); // ≈ 234
  const H_STEP = HEX_W * 0.75;                         // horizontal step between hex centres
  const V_STEP = HEX_H;                                // vertical step

  // Row 1: 3 hexes centred
  const row1W = 2 * H_STEP + HEX_W;   // span from first centre to last centre + half hex each side
  const r1StartX = -(H_STEP);          // relative to canvas centre

  const positions = [
    { x: r1StartX + 0 * H_STEP, y: 0 },
    { x: r1StartX + 1 * H_STEP, y: 0 },
    { x: r1StartX + 2 * H_STEP, y: 0 },
    // Row 2: offset so they sit in the notches between row-1 hexes
    { x: r1StartX + 0.5 * H_STEP, y: V_STEP },
    { x: r1StartX + 1.5 * H_STEP, y: V_STEP },
  ];

  const canvasW = row1W + HEX_W;
  const canvasH = V_STEP + HEX_H;

  return (
    <section
      id="expertise"
      className="relative py-32 lg:py-48 overflow-hidden"
      ref={ref}
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fafaf8 100%)' }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(26,38,53,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-label">{t('label')}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="text-headline text-[#1A2635]">{t('headline')}</h2>
            <p className="text-[#1A2635]/45 text-sm max-w-xs lg:text-right leading-relaxed">
              Five domains where we identify, connect and accelerate transformative opportunities.
            </p>
          </div>
        </motion.div>

        {/* ── Honeycomb (desktop ≥ lg) ── */}
        <div className="hidden lg:flex justify-center items-start">
          <div className="relative" style={{ width: canvasW, height: canvasH }}>
            {items.map((item, i) => {
              const s = cardStyles[i];
              const pos = positions[i];
              const left = pos.x + canvasW / 2 - HEX_W / 2;
              const top  = pos.y;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.65,
                    delay: 0.1 + i * 0.09,
                    ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                  }}
                  className="absolute group"
                  style={{ width: HEX_W, height: HEX_H, left, top }}
                >
                  {/* Outer glow border hex */}
                  <div
                    className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      clipPath: HEX_CLIP,
                      background: s.accentColor,
                      transform: 'scale(1.025)',
                    }}
                  />

                  {/* Main hex cell */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:brightness-[0.96]"
                    style={{ clipPath: HEX_CLIP, backgroundColor: s.tint }}
                  >
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20"
                        aria-label={item.title}
                      />
                    )}

                    <div className="relative z-10 flex flex-col items-center gap-2 px-10">
                      {/* Sequence number */}
                      <span
                        className="text-[10px] font-mono tracking-[0.25em]"
                        style={{ color: `${s.accentColor}70` }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ color: s.iconColor, backgroundColor: `${s.accentColor}18` }}
                      >
                        {s.icon}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-[#1A2635] font-semibold tracking-tight leading-tight mt-1"
                        style={{ fontSize: '0.82rem' }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-[#1A2635]/50 leading-relaxed"
                        style={{ fontSize: '0.68rem', maxWidth: '140px' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile fallback: stacked cards ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          {items.map((item, i) => {
            const s = cardStyles[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.05 * i,
                  ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                }}
                className="group relative p-7 overflow-hidden"
                style={{ backgroundColor: s.tint, borderTop: `2.5px solid ${s.accentColor}` }}
              >
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={item.title} />
                )}
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-sm"
                    style={{ color: s.iconColor, backgroundColor: `${s.accentColor}18` }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-[#1A2635] text-base font-semibold tracking-tight mb-1 leading-snug">{item.title}</h3>
                    <p className="text-[#1A2635]/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
