import React, { useState } from 'react';
import { UtensilsCrossedIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  eager?: boolean;
  fallbackTone?: 'dark' | 'light';
}

export function SafeImage({ src, alt, eager, fallbackTone = 'light', className = '', ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`kraft flex items-center justify-center ${fallbackTone === 'dark' ? 'bg-botanical text-cream/60' : 'text-earth/60'} ${className}`}>
        
        <UtensilsCrossedIcon className="h-6 w-6" aria-hidden="true" />
      </div>);

  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest} />);


}