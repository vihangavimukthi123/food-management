import React from 'react';
import { InfoIcon } from 'lucide-react';

export function PrototypeNotice({ children, tone = 'light', className = '' }: {children?: React.ReactNode;tone?: 'light' | 'dark';className?: string;}) {
  return (
    <p className={`flex items-start gap-2 text-xs leading-relaxed ${tone === 'dark' ? 'text-cream/60' : 'text-cocoa/60'} ${className}`}>
      <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children ?? 'Prototype: recommendations are simulated on this device and are not medical or nutritional advice. Data is stored only in this browser.'}</span>
    </p>);

}