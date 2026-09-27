import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover'
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-4 text-slate-400">
        <Layers className="h-10 w-10 text-orange-500 mb-1" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">NST Metal</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
