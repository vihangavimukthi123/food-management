import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function Toggle({ id, label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <label htmlFor={id} className="cursor-pointer font-semibold">{label}</label>
        {description && <p className="mt-0.5 text-sm text-cocoa/60">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-botanical' : 'bg-cocoa/20'}`}>
        
        <motion.span className="absolute top-1 h-5 w-5 rounded-full bg-ivory shadow" initial={false} animate={{ left: checked ? 24 : 4 }} transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }} />
      </button>
    </div>);

}