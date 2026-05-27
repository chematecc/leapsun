'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function AboutSection() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: t('stat1_value'), label: t('stat1_label') },
    { value: t('stat2_value'), label: t('stat2_label') },
    { value: t('stat3_value'), label: t('stat3_label') },
  ];

  return (
    <section id="about" className="relative py-32 lg:py-48 overflow-hidden section-warm" ref={ref}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: editorial text */}
          <div>
            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-label">{t('label')}</span>
              </motion.div>

              <motion.h2 variants={fadeUp}
                className="text-headline text-[#1A2635] mb-10">
                {t('headline')}
              </motion.h2>

              <motion.p variants={fadeUp}
                className="text-[#1A2635]/70 text-lg leading-relaxed mb-5 font-light">
                {t('body1')}
              </motion.p>

              <motion.p variants={fadeUp}
                className="text-[#1A2635]/50 text-base leading-relaxed">
                {t('body2')}
              </motion.p>
            </motion.div>

            {/* Stats row */}
            <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'}
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
              className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[#1A2635]/[0.07]">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <div className="text-[clamp(2rem,4vw,3.2rem)] font-light text-gradient-gold tracking-tight leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[#1A2635]/40 text-xs tracking-widest uppercase leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: image + quote card stacked */}
          <div className="flex flex-col gap-6">
            {/* Image card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
              className="relative overflow-hidden"
              style={{ height: '240px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop"
                alt="Strategic partnership"
                className="w-full h-full object-cover"
              />
              {/* Gold gradient overlay at bottom */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,38,53,0.55) 0%, rgba(26,38,53,0.10) 50%, transparent 100%)' }}
              />
              <div className="absolute bottom-5 left-6">
                <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase">
                  Leapsun Partners · Singapore
                </span>
              </div>
            </motion.div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            >
              <div className="glass-card p-8 lg:p-10 relative overflow-hidden">
                <div className="text-[6rem] leading-none text-[#D4AF37]/10 font-serif absolute -top-3 -left-1 select-none">"</div>
                <p className="text-[#1A2635]/80 text-xl lg:text-2xl font-light leading-relaxed italic relative z-10">
                  Connecting Ideas, Capital and Opportunities.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-label">Core Mission</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }}
      />
    </section>
  );
}
