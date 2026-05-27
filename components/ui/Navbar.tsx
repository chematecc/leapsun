'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === 'en' ? 'zh' : 'en';
  const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'expertise', href: '#expertise' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'vision', href: '#vision' },
    { key: 'insights', href: '#insights' },
    { key: 'contact', href: '#contact' },
  ] as const;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.96)] backdrop-blur-xl border-b border-[#1A2635]/[0.07] shadow-[0_1px_12px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-18 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center">
            <Logo height={52} showSub={true} isDark={!scrolled} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 relative group ${
                  scrolled ? 'text-[#1A2635]/55 hover:text-[#1A2635]' : 'text-white/65 hover:text-white'
                }`}
              >
                {t(key)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              href={localePath}
              className="text-[#D4AF37] text-xs tracking-widest uppercase border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3 py-1.5 transition-all duration-300 hover:bg-[#D4AF37]/08"
            >
              {t('language')}
            </Link>

            <a
              href="#contact"
              className="hidden lg:block bg-[#D4AF37] text-[#1A2635] text-xs font-semibold tracking-widest uppercase px-5 py-2.5 hover:bg-[#E8C84A] transition-colors duration-300"
            >
              {t('contact')}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-full h-px origin-left transition-all ${scrolled ? 'bg-[#1A2635]' : 'bg-white'}`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-4 h-px ${scrolled ? 'bg-[#1A2635]' : 'bg-white'}`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-full h-px origin-left ${scrolled ? 'bg-[#1A2635]' : 'bg-white'}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8 lg:hidden"
          >
            {navItems.map(({ key, href }, i) => (
              <motion.a
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="text-[#1A2635] text-3xl font-light tracking-widest uppercase hover:text-[#D4AF37] transition-colors"
              >
                {t(key)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
