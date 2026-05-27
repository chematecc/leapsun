'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

const cardImages = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format&fit=crop',
];

export default function InsightsSection() {
  const t = useTranslations('insights');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as { category: string; title: string; excerpt: string; readTime: string }[];

  return (
    <section id="insights" className="relative py-32 lg:py-48 bg-[#F7F4EF] overflow-hidden" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase">{t('label')}</span>
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-[-0.03em] leading-[1.0] text-[#1A2635]">
              {t('headline')}
            </h2>
          </div>
          <a
            href="#"
            className="text-[#1A2635]/45 hover:text-[#D4AF37] text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-300 self-end"
          >
            View All
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Articles grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, i) => (
            <motion.article
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
              }}
              className="group cursor-pointer"
            >
              {/* Article image */}
              <div className="relative w-full mb-5 overflow-hidden" style={{ paddingBottom: '62%' }}>
                <img
                  src={cardImages[i]}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2635]/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[#D4AF37] text-[9px] tracking-[0.3em] uppercase border border-[#D4AF37]/50 px-2 py-1 bg-[#1A2635]/60 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-[#1A2635] text-base font-light leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#1A2635]/50 text-xs leading-relaxed mb-4">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#1A2635]/35 text-[10px] tracking-widest uppercase">{item.readTime}</span>
                  <div className="w-4 h-px bg-[#D4AF37] group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
