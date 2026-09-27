import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { ProductImage } from './ProductImage';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images = [],
  productName
}) => {
  const imageList = images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      
      {/* Main Image Container with Prev/Next Controls */}
      <div className="relative aspect-4/3 sm:aspect-16/11 bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shadow-xs group">
        <ProductImage
          src={imageList[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 select-none"
        />

        {/* Counter Badge */}
        {imageList.length > 1 && (
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-full z-10">
            {activeIndex + 1} / {imageList.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Horizontal Thumbnail Bar (Touch & Click Friendly) */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin scrollbar-thumb-slate-300">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer focus:outline-none ${
                activeIndex === idx
                  ? 'border-orange-600 ring-2 ring-orange-500/30 scale-95'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
