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
   * All coordinates derived from pixel-accurate measurements of the reference logo
   * plus browser-measured rendered dimensions (wordmark = 106 × 26 px at height=26).
   *
   * Coordinate system — viewBox "0 0 80 36":
   *   SVG is right-aligned (right:0) and bottom-aligned (bottom:100%) to the wordmark.
   *   arrowW = 2.6 × height  →  SVG left is at ~37 % of wordmark left edge
   *   arrowH = 1.2 × height  →  SVG top is ~1.12 × cap-heights above the letters
   *   marginBottom = -0.08 × height  →  SVG bottom overlaps letterforms by ~2 px
   *
   * Swoosh cubic Bezier  "M 16 32 C 36 29 46 16 55 8"
   *   (16, 32) → start ≈ 49 % from wordmark left, AT cap-height
   *   CP1 (36, 29) → start tangent ≈ 8.5° above horizontal (nearly flat, matches reference)
   *   CP2 (46, 16) → end tangent   ≈ 42° above horizontal
   *   (55,  8) → enters the arrowhead; stroke terminates hidden inside the filled shape
   *
   * Arrowhead triangle  "M 57 3 L 44 6 L 52 16 Z"
   *   Tip    (57,  3) → 82 % from wordmark left, 26.5 px above cap-height  ✓ reference
   *   Wing 1 (44,  6) → upper-left base
   *   Wing 2 (52, 16) → lower base
   *   Centroid-to-tip direction ≈ 42° above horizontal  ✓ reference
   *
   * Animation: both elements fade in with opacity only — shape is never distorted.
   */
  const arrowW = height * 2.6;
  const arrowH = height * 1.2;

  return (
    <div className="relative inline-flex flex-col items-start leading-none">
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
        {/* Swoosh */}
        <motion.path
          d="M 16 32 C 36 29 46 16 55 8"
          stroke="#F59E0B"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Arrowhead — opacity fade only, shape is never distorted */}
        <motion.path
          d="M 57 3 L 44 6 L 52 16 Z"
          fill="#F59E0B"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
