'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { createClient } from '@/lib/supabase';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const formT = t.raw('form') as Record<string, string>;

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const supabase = createClient();
    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      message: form.message,
      locale,
    });

    if (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="relative py-32 lg:py-48 bg-white overflow-hidden" ref={ref}>
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase">{t('label')}</span>
            </div>

            <h2 className="text-[clamp(3rem,6vw,6rem)] font-light tracking-[-0.04em] leading-[0.9] text-[#1A2635] mb-8 whitespace-pre-line">
              {t('headline')}
            </h2>

            <p className="text-[#1A2635]/55 text-base leading-relaxed mb-12 max-w-sm">
              {t('subheadline')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M2 5 L10 11 L18 5 M2 5 L2 15 L18 15 L18 5 L2 5" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#1A2635]/30 text-[10px] tracking-widest uppercase mb-1">Email</div>
                  <a href="mailto:ask@leapsunpartners.com" className="text-[#1A2635] text-sm hover:text-[#D4AF37] transition-colors">
                    ask@leapsunpartners.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M10 2C5.58 2 2 5.58 2 10c0 1.49.39 2.88 1.07 4.09L2 18l4.05-1.05A7.94 7.94 0 0010 18c4.42 0 8-3.58 8-8s-3.58-8-8-8z" stroke="#D4AF37" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                    <path d="M7.5 8.5c.3.7.8 1.4 1.4 2 .6.6 1.3 1.1 2 1.4l.7-.7c.2-.2.4-.2.6-.1.5.2 1 .4 1.5.5.2.1.3.3.3.5v1.4c0 .3-.2.5-.5.5C8.8 14 6 11.2 6 7.5c0-.3.2-.5.5-.5h1.4c.2 0 .4.1.5.3.1.5.3 1 .5 1.5.1.2 0 .4-.1.6l-.8.6z" stroke="#D4AF37" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[#1A2635]/30 text-[10px] tracking-widest uppercase mb-1">WhatsApp</div>
                  <a href="https://wa.me/6587988740" target="_blank" rel="noopener noreferrer"
                    className="text-[#1A2635] text-sm hover:text-[#D4AF37] transition-colors">
                    Chat with us →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M10 2 Q15 2 15 8 Q15 13 10 18 Q5 13 5 8 Q5 2 10 2 Z" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
                    <circle cx="10" cy="8" r="2" stroke="#D4AF37" strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#1A2635]/30 text-[10px] tracking-widest uppercase mb-1">{t('address_sg')}</div>
                  <div className="text-[#1A2635] text-sm leading-relaxed">
                    100 Peck Seah Street, PS100 #08-14<br />Singapore 079333
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                    <path d="M10 2 Q15 2 15 8 Q15 13 10 18 Q5 13 5 8 Q5 2 10 2 Z" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
                    <circle cx="10" cy="8" r="2" stroke="#D4AF37" strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <div className="text-[#1A2635]/30 text-[10px] tracking-widest uppercase mb-1">{t('address_sh')}</div>
                  <div className="text-[#1A2635] text-sm leading-relaxed">
                    上海市新金桥路1122号方正大厦1912室<br />上海 201206
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          >
            {status === 'success' ? (
              <div className="glass-card p-12 flex flex-col items-center justify-center text-center h-full min-h-80">
                <div className="w-12 h-12 border border-[#D4AF37] flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M4 12 L9 17 L20 7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[#1A2635] text-xl font-light mb-3">Message Received</h3>
                <p className="text-[#1A2635]/45 text-sm">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 lg:p-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#1A2635]/35 text-[10px] tracking-widest uppercase block mb-2">{formT.name}</label>
                    <input
                      type="text" name="name" required value={form.name} onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A2635]/10 focus:border-[#D4AF37] text-[#1A2635] text-sm py-2 outline-none transition-colors duration-300 placeholder-[#1A2635]/20"
                      placeholder="—"
                    />
                  </div>
                  <div>
                    <label className="text-[#1A2635]/35 text-[10px] tracking-widest uppercase block mb-2">{formT.email}</label>
                    <input
                      type="email" name="email" required value={form.email} onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#1A2635]/10 focus:border-[#D4AF37] text-[#1A2635] text-sm py-2 outline-none transition-colors duration-300 placeholder-[#1A2635]/20"
                      placeholder="—"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#1A2635]/35 text-[10px] tracking-widest uppercase block mb-2">{formT.company}</label>
                  <input
                    type="text" name="company" value={form.company} onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#1A2635]/10 focus:border-[#D4AF37] text-[#1A2635] text-sm py-2 outline-none transition-colors duration-300 placeholder-[#1A2635]/20"
                    placeholder="—"
                  />
                </div>
                <div>
                  <label className="text-[#1A2635]/35 text-[10px] tracking-widest uppercase block mb-2">{formT.message}</label>
                  <textarea
                    name="message" required rows={4} value={form.message} onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#1A2635]/10 focus:border-[#D4AF37] text-[#1A2635] text-sm py-2 outline-none transition-colors duration-300 placeholder-[#1A2635]/20 resize-none"
                    placeholder="—"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500/70 text-xs tracking-wide">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#D4AF37] text-[#1A2635] text-xs font-semibold tracking-[0.2em] uppercase py-4 hover:bg-[#E8C84A] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '···' : formT.submit}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
