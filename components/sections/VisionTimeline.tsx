'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function VisionTimeline() {
  const t = useTranslations('vision');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as { year: string; title: string; desc: string }[];

  return (
    <section id="vision" className="relative py-32 lg:py-48 bg-white overflow-hidden" ref={ref}>
      {/* Background radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-20 lg:mb-28 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase">{t('label')}</span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-[-0.03em] leading-[1.0] text-[#1A2635]">
            {t('headline')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.3 }}
            className="absolute left-1/2 top-0 bottom-0 w-px origin-top hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.35) 10%, rgba(212,175,55,0.35) 90%, transparent)' }}
          />

          <div className="grid gap-0">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isFuture = item.year === '2030';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                  className={`relative flex items-center gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:flex-row mb-8 lg:mb-0`}
                >
                  {/* Content card */}
                  <div className={`w-full lg:w-[calc(50%-32px)] ${isLeft ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className={`glass-card p-8 group hover:border-[#D4AF37]/25 transition-all duration-500 ${
                        isFuture ? 'border-[#D4AF37]/25' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-3xl font-light tracking-tight ${isFuture ? 'text-gradient-gold' : 'text-[#D4AF37]'}`}>
                          {item.year}
                        </span>
                        {isFuture && (
                          <span className="text-xs text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 tracking-widest uppercase">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <h3 className="text-[#1A2635] text-xl font-light mb-3">{item.title}</h3>
                      <p className="text-[#1A2635]/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 w-16 h-16 flex-shrink-0 hidden lg:flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${isFuture ? 'border-[#D4AF37] bg-[#D4AF37]/20' : 'border-[#D4AF37] bg-[#D4AF37]'}`} />
                    <div className="absolute w-8 h-8 rounded-full border border-[#D4AF37]/20 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-[calc(50%-32px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
