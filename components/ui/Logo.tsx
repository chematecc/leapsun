import Image from 'next/image';

interface LogoProps {
  height?: number;
  showSub?: boolean;
  /** isDark=true → white logo (for dark backgrounds) */
  isDark?: boolean;
}

// Natural dimensions of leapsun_logo_transparent.png: 877 × 298
const LOGO_ASPECT = 877 / 298;

export default function Logo({ height = 36, isDark = false }: LogoProps) {
  const displayWidth = Math.round(height * LOGO_ASPECT);
  return (
    <Image
      src={isDark ? '/leapsun_logo_dark.png' : '/leapsun_logo_transparent.png'}
      alt="Leapsun Partners"
      width={displayWidth}
      height={height}
      priority
      style={{ objectFit: 'contain' }}
    />
  );
}
