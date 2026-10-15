import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { useStore } from '../../contexts/StoreContext';

export function MotionRoot({ children }: {children: React.ReactNode;}) {
  const { data } = useStore();
  return (
    <MotionConfig reducedMotion={data?.settings.reduceMotion ? 'always' : 'user'}>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: '#24170f', color: '#f3ebdb', border: '1px solid rgba(230,211,163,0.25)', fontFamily: 'Manrope, sans-serif' }
        }} />
      
    </MotionConfig>);

}