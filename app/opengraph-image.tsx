import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Leapsun Partners';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2635 60%, #0D1B2A 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold top border */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }} />

        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          {/* Arrow mark */}
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <polygon points="0,52 26,0 52,52 38,52 26,26 14,52" fill="#D4AF37" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FFFFFF', fontSize: 38, fontWeight: 300, letterSpacing: '-1px', lineHeight: 1.1 }}>
              LEAPSUN
            </span>
            <span style={{ color: '#D4AF37', fontSize: 14, letterSpacing: '4px', textTransform: 'uppercase' }}>
              PARTNERS
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 20,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: 40,
        }}>
          Strategic Investment &amp; Innovation Bridge
        </div>

        {/* Domain */}
        <div style={{
          color: '#D4AF37',
          fontSize: 16,
          letterSpacing: '3px',
          opacity: 0.8,
        }}>
          leapsunpartners.com
        </div>

        {/* Gold bottom border */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }} />
      </div>
    ),
    { ...size }
  );
}
