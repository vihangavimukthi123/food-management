import React from 'react';
import { CheckIcon } from 'lucide-react';

interface ChipProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

export function Chip({ selected, onClick, children, tone = 'light', size = 'md' }: ChipProps) {
  const base = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  const palette =
  tone === 'dark' ?
  selected ?
  'border-champagne bg-champagne text-forest' :
  'border-cream/25 text-cream/85 hover:border-cream/60' :
  selected ?
  'border-cocoa bg-cocoa text-cream' :
  'border-cocoa/20 text-cocoa/80 hover:border-cocoa/50';
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${base} ${palette}`}>
      
      {selected && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </button>);

}