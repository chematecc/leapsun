'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 800),
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.25 - 0.08,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.28 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.045]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  );
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#06090f]"
    >
      {/* Brilliant cosmos / starfield — Jeremy Thomas, Unsplash free license */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1800&q=90&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
          fetchPriority="high"
        />
        {/* Minimal overlay — let the cosmos colours breathe while keeping text legible */}
        <div className="absolute inset-0" style={{ background: 'rgba(4,6,16,0.45)' }} />
        {/* Soft bottom fade to the next warm section */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(248,245,240,0.9))' }}
        />
      </div>

      {/* Radial gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Grid lines */}
      <GridBackground />

      {/* Particles */}
      <ParticleCanvas />

      {/* Ambient orb */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-medium">
            {t('tagline')}
          </span>
          <span className="h-px w-8 bg-[#D4AF37]" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3.5rem,10vw,9rem)] font-light tracking-[-0.04em] leading-[0.9] mb-2"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            <span className="text-white/35">{t('headline1_pre')}</span>
            <span className="text-gradient-gold">{t('headline1_key')}</span>
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3.5rem,10vw,9rem)] font-light tracking-[-0.04em] leading-[0.9] mb-2"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            <span className="text-gradient-gold">{t('headline2_key')}</span>
            <span className="text-white/35">{t('headline2_post')}</span>
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3.5rem,10vw,9rem)] font-light tracking-[-0.04em] leading-[0.9] text-gradient-gold"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}
          >
            {t('headline3_key')}
          </motion.h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-white/70 text-base lg:text-lg font-light max-w-xl mx-auto leading-relaxed mb-12 tracking-wide"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}
        >
          {t('subheadline')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#about"
            className="group relative bg-[#D4AF37] text-[#1A2635] text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 overflow-hidden transition-all duration-300 hover:bg-[#E8C84A]"
          >
            <span className="relative z-10">{t('cta1')}</span>
          </a>
          <a
            href="#contact"
            className="group text-white/70 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            {t('cta2')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/35 text-[10px] tracking-[0.3em] uppercase">{t('scroll')}</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/50 to-transparent scroll-indicator" />
      </motion.div>

      {/* bottom fade handled inside image wrapper above */}
    </section>
  );
}
