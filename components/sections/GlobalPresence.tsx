'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Approximate SVG world map regions (simplified paths for display)
const mapDots = [
  // Asia Pacific
  { x: 75, y: 42, region: 0, delay: 0 },
  { x: 73, y: 38, region: 0, delay: 0.2 },
  { x: 71, y: 46, region: 0, delay: 0.4 },
  { x: 77, y: 44, region: 0, delay: 0.1 },
  // Europe
  { x: 49, y: 30, region: 1, delay: 0.2 },
  { x: 51, y: 28, region: 1, delay: 0.4 },
  { x: 48, y: 32, region: 1, delay: 0.6 },
];

const regionColors = ['#D4AF37', '#E8C84A'];

export default function GlobalPresence() {
  const t = useTranslations('global');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeRegion, setActiveRegion] = useState<number | null>(null);

  const regions = t.raw('regions') as { name: string; desc: string }[];

  return (
    <section id="global" className="relative py-32 lg:py-48 bg-[#122033] overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0D1B2A] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase">{t('label')}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-[-0.03em] leading-[1.0] text-[#F5F5F5]">
              {t('headline')}
            </h2>
            <p className="text-[#F5F5F5]/40 text-sm max-w-xs leading-relaxed">
              {t('subheadline')}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Map visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative w-full rounded-sm overflow-hidden glass-card p-6 lg:p-8"
              style={{ paddingBottom: '50%' }}
            >
              <div className="absolute inset-6 lg:inset-8">
                {/* World map SVG (simplified wireframe) */}
                <svg viewBox="0 0 100 56" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Very simplified continent outlines */}
                  {/* North America */}
                  <path d="M5 20 Q12 15 20 18 Q25 20 27 28 Q28 35 22 42 Q18 46 12 44 Q6 40 5 34 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* South America */}
                  <path d="M20 44 Q24 42 28 46 Q30 50 28 54 Q25 56 22 54 Q18 50 18 46 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* Europe */}
                  <path d="M44 18 Q48 14 54 16 Q56 20 52 26 Q48 28 44 26 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* Africa */}
                  <path d="M46 28 Q50 26 56 28 Q60 32 58 42 Q56 48 52 50 Q46 48 44 42 Q42 34 44 28 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* Middle East */}
                  <path d="M54 30 Q58 28 62 30 Q64 34 62 38 Q58 40 54 38 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* Asia */}
                  <path d="M58 12 Q70 8 86 12 Q92 16 90 26 Q88 34 80 36 Q70 38 64 34 Q58 28 58 20 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* SE Asia */}
                  <path d="M72 36 Q78 34 82 38 Q80 44 76 44 Q72 42 72 38 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />
                  {/* Australia */}
                  <path d="M78 44 Q84 42 88 46 Q90 50 86 52 Q80 54 76 50 Q74 46 76 44 Z" fill="rgba(245,245,245,0.03)" stroke="rgba(245,245,245,0.08)" strokeWidth="0.5" />

                  {/* Connection line: Asia Pacific ↔ Europe */}
                  <line x1="74" y1="43" x2="49" y2="30" stroke="rgba(212,175,55,0.2)" strokeWidth="0.3" strokeDasharray="1 2" />

                  {/* Dots */}
                  {mapDots.map((dot, i) => (
                    <g key={i}>
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r="0.8"
                        fill={activeRegion === dot.region ? '#D4AF37' : 'rgba(212,175,55,0.5)'}
                        style={{
                          transition: 'fill 0.3s',
                          animation: `mapPulse ${2.5 + dot.delay}s ease-in-out infinite`,
                          animationDelay: `${dot.delay}s`,
                        }}
                      />
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r="2.5"
                        fill="none"
                        stroke={activeRegion === dot.region ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)'}
                        className="map-pulse"
                        style={{ animationDelay: `${dot.delay}s` }}
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Region list */}
          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
            className="flex flex-col gap-3"
          >
            {regions.map((region, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
                }}
                onMouseEnter={() => setActiveRegion(i)}
                onMouseLeave={() => setActiveRegion(null)}
                className={`p-5 glass-card cursor-default transition-all duration-400 ${
                  activeRegion === i ? 'border-[#D4AF37]/30 bg-[#D4AF37]/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: regionColors[i] }}
                  />
                  <div>
                    <div className="text-[#F5F5F5] text-sm font-medium mb-1">{region.name}</div>
                    <div className="text-[#F5F5F5]/40 text-xs leading-relaxed">{region.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D1B2A] to-transparent pointer-events-none" />
    </section>
  );
}
