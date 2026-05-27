'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  height?: number;
  showSub?: boolean;
  /** isDark=true → white wordmark (for use on dark backgrounds) */
  isDark?: boolean;
}

export default function Logo({ height = 28, showSub = true, isDark = false }: LogoProps) {
  const wordmarkColor = isDark ? '#FFFFFF' : '#1A2635';

  /*
   * Geometry calibrated against the reference logo image:
   *
   *  arrowW = 2.6× height  → arrow spans from ~52 % of wordmark left edge to past right edge
   *  arrowH = 1.05× height → tip floats ~1.05 letter-heights above cap-line (matches original)
   *  viewBox 0 0 80 36, overflow: visible (tip at x=82 intentionally extends beyond SVG bounds)
   *
   *  Swoosh "M 16 38 C 28 36 50 22 64 10":
   *    • Start (16, 38) — y=38 is outside viewBox but visible; maps to cap-height of letters
   *    • CP1  (28, 36) → start tangent ≈ 9° above horizontal (nearly flat, matches original)
   *    • CP2  (50, 22) → end tangent ≈ 37° above horizontal (rising toward arrowhead)
   *    • End  (64, 10) — terminates inside the arrowhead base so the stroke is hidden
   *
   *  Arrowhead "M 82 2 L 65 6 L 74 20 Z":
   *    • Tip  (82,  2) — 1–2 px past the wordmark's right edge
   *    • Wing (65,  6) — upper-left base
   *    • Wing (74, 20) — lower base
   *    • Centroid direction → ~40° above horizontal, matching the original
   *
   *  Animation: swoosh uses pathLength draw-on; arrowhead uses opacity fade only
   *  (no scale) so the shape is never distorted during the transition.
   */
  const arrowW = height * 2.6;
  const arrowH = height * 1.05;

  return (
    <div className="relative inline-flex flex-col items-start leading-none">
      {/* Orange arrow — absolutely positioned above the wordmark, right-aligned */}
      <svg
        className="absolute pointer-events-none"
        style={{
          bottom: '100%',
          right: 0,
          marginBottom: `-${height * 0.08}px`,
          overflow: 'visible',
        }}
        width={arrowW}
        height={arrowH}
        viewBox="0 0 80 36"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 16 38 C 28 36 50 22 64 10"
          stroke="#F59E0B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.path
          d="M 82 2 L 65 6 L 74 20 Z"
          fill="#F59E0B"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.75 }}
        />
      </svg>

      {/* Wordmark */}
      <span
        className="font-bold tracking-tight"
        style={{
          fontSize: height,
          lineHeight: 1,
          color: wordmarkColor,
          fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        Leapsun
      </span>

      {/* Optional subtitle */}
      {showSub && (
        <span
          style={{
            fontSize: height * 0.30,
            lineHeight: 1,
            marginTop: height * 0.14,
            letterSpacing: '0.30em',
            textTransform: 'uppercase' as const,
            color: '#F59E0B',
            fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
          }}
        >
          Partners
        </span>
      )}
    </div>
  );
}
