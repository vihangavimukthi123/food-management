import React from 'react';

type LogoVariant = 'full' | 'compact' | 'mark' | 'app';
type LogoTone = 'onDark' | 'onLight';

interface LogoProps {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}

export function LogoMark({ size = 36, tone = 'onDark' }: {size?: number;tone?: LogoTone;}) {
  const ink = tone === 'onDark' ? '#f3ebdb' : '#24170f';
  const leaf = tone === 'onDark' ? '#a7b79a' : '#1d4631';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ color: ink }}>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="13.5" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
      <path d="M14.5 33.5 C 20 27.5, 25.5 21.5, 33.5 14.5" stroke={leaf} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M25 23 C 23.4 18.2, 26.2 14.4, 31.2 13.6 C 31.2 18.6, 29 22.2, 25 23 Z" fill={leaf} />
      <path d="M20.2 27.8 C 15.8 27, 13.6 23.6, 14.4 19.6 C 18.8 20.4, 21 23.8, 20.2 27.8 Z" fill={leaf} opacity="0.75" />
      <circle cx="33.5" cy="14.5" r="1.4" fill="#d9a441" />
    </svg>);

}

export function Logo({ variant = 'full', tone = 'onDark', className = '' }: LogoProps) {
  const text = tone === 'onDark' ? 'text-cream' : 'text-cocoa';
  if (variant === 'mark') return <span className={className}><LogoMark tone={tone} /></span>;
  if (variant === 'app') {
    return (
      <span className={`inline-flex h-16 w-16 items-center justify-center rounded-[22%] bg-forest ${className}`}>
        <LogoMark size={40} tone="onDark" />
      </span>);

  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${text} ${className}`}>
      <LogoMark size={variant === 'compact' ? 30 : 36} tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${variant === 'compact' ? 'text-[1.35rem]' : 'text-[1.6rem]'} font-medium tracking-tight`}>
          Daily<span className="italic">plate</span>
        </span>
        {variant === 'full' &&
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.28em] opacity-70">The Living Food Universe</span>
        }
      </span>
    </span>);

}