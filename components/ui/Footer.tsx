'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="relative bg-[#1A2635] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo height={24} showSub={true} isDark={true} />
            </div>
            <p className="text-[#F5F5F5]/30 text-sm leading-relaxed max-w-xs mb-6">
              {t('tagline')}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {['LI', 'TW', 'WC'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-[#F5F5F5]/10 hover:border-[#D4AF37]/50 flex items-center justify-center text-[#F5F5F5]/30 hover:text-[#D4AF37] text-[9px] tracking-wider transition-all duration-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6">Navigation</div>
            <div className="flex flex-col gap-3">
              {(['about', 'expertise', 'portfolio', 'vision', 'insights', 'contact'] as const).map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-[#F5F5F5]/40 hover:text-[#F5F5F5] text-xs tracking-widest uppercase transition-colors duration-300"
                >
                  {nav(key)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-6">Contact</div>
            <div className="flex flex-col gap-3">
              <a href="mailto:ask@leapsunpartners.com" className="text-[#F5F5F5]/40 hover:text-[#F5F5F5] text-xs transition-colors duration-300">
                ask@leapsunpartners.com
              </a>
              <a href="https://wa.me/6588181454" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F5]/40 hover:text-[#D4AF37] text-xs transition-colors duration-300">
                WhatsApp →
              </a>
              <div className="text-[#F5F5F5]/20 text-xs leading-relaxed">
                100 Peck Seah Street, PS100 #08-14<br />Singapore 079333
              </div>
              <div className="text-[#F5F5F5]/20 text-xs leading-relaxed">
                上海市新金桥路1122号<br />方正大厦1912室 上海 201206
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#F5F5F5]/20 text-[10px] tracking-widest uppercase">
            {t('rights')}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#F5F5F5]/20 hover:text-[#F5F5F5]/50 text-[10px] tracking-widest uppercase transition-colors">
              {t('privacy')}
            </a>
            <a href="#" className="text-[#F5F5F5]/20 hover:text-[#F5F5F5]/50 text-[10px] tracking-widest uppercase transition-colors">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
