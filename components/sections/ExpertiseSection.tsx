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

export default function ExpertiseSection() {
  const t = useTranslations('expertise');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as { title: string; desc: string; url?: string }[];

  return (
    <section id="expertise" className="relative py-32 lg:py-48 overflow-hidden" ref={ref}
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #fafaf8 100%)' }}>
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(26,38,53,0.9) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-20 lg:mb-28"
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

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5"
        >
          {items.map((item, i) => {
            const s = cardStyles[i];
            // 5 items: row1 = 3 cards (span 2 each), row2 = 2 cards centered
            const colClass =
              i < 3 ? 'lg:col-span-2' :
              i === 3 ? 'lg:col-start-2 lg:col-span-2' :
              'lg:col-span-2';

            const inner = (
              <>
                {/* Large number watermark */}
                <div className="absolute -top-2 right-5 pointer-events-none select-none leading-none"
                  style={{ color: s.numColor, fontSize: '5rem', fontWeight: 300 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-11 h-11 flex items-center justify-center mb-6 rounded-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.iconColor, backgroundColor: `${s.accentColor}14` }}>
                    {s.icon}
                  </div>
                  <h3 className="text-[#1A2635] text-lg font-semibold tracking-tight mb-3 leading-snug">{item.title}</h3>
                  <p className="text-[#1A2635]/55 text-sm leading-relaxed flex-1">{item.desc}</p>
                  {item.url && (
                    <div className="mt-7 flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: s.accentColor }}>
                      <span>Learn More</span>
                      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                        <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </>
            );

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
                }}
                className={`group relative p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${colClass}`}
                style={{ backgroundColor: s.tint, borderTop: `2.5px solid ${s.accentColor}` }}
              >
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={item.title} />
                ) : null}
                {inner}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
