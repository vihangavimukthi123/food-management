import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  size?: 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, tone = 'light', size = 'md' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus(), 30);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, onClose]);

  const surface = tone === 'dark' ? 'bg-forest text-cream' : 'bg-ivory text-cocoa';

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`grain max-h-[92vh] w-full overflow-y-auto ${size === 'lg' ? 'sm:max-w-3xl' : 'sm:max-w-lg'} ${surface} rounded-t-2xl sm:rounded-2xl`}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-start justify-between gap-4 px-6 pb-2 pt-6 sm:px-8">
              <h2 className="font-display text-3xl leading-tight">{title}</h2>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`-mr-2 rounded-full p-2 transition-colors duration-150 ${tone === 'dark' ? 'hover:bg-cream/10' : 'hover:bg-cocoa/5'}`}>
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 pb-7 sm:px-8">{children}</div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}