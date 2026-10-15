export type Tone = 'light' | 'dark';

export function inputClass(tone: Tone = 'light'): string {
  return tone === 'dark' ?
  'w-full rounded-lg border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 transition-colors duration-150 focus:border-champagne focus:outline-none' :
  'w-full rounded-lg border border-cocoa/15 bg-white/70 px-4 py-3 text-cocoa placeholder:text-cocoa/40 transition-colors duration-150 focus:border-cocoa/60 focus:outline-none';
}

export function buttonClass(variant: 'primary' | 'secondary' | 'ghost' | 'gold' = 'primary', tone: Tone = 'light'): string {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50';
  if (variant === 'gold') return `${base} bg-honey text-cocoa hover:bg-champagne`;
  if (variant === 'primary') return tone === 'dark' ? `${base} bg-cream text-forest hover:bg-champagne` : `${base} bg-cocoa text-cream hover:bg-earth`;
  if (variant === 'secondary') return tone === 'dark' ? `${base} border border-cream/30 text-cream hover:border-cream/70` : `${base} border border-cocoa/25 text-cocoa hover:border-cocoa/60`;
  return tone === 'dark' ? `${base} px-3 text-cream/80 hover:text-cream` : `${base} px-3 text-cocoa/70 hover:text-cocoa`;
}