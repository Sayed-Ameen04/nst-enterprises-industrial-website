import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowUpRight, MessageSquare, Layers } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductImage } from './ProductImage';
import { Button } from '../common/Button';
import { generateWhatsAppLink } from '../../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRequestQuote
}) => {
  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : (product.image || '');

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      generateWhatsAppLink({
        productName: product.name,
        material: product.material,
        thickness: product.thickness_info
      }),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRequestQuote) {
      onRequestQuote(product);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col hover:border-orange-500 hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 relative block"
      aria-label={`View details for ${product.name}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden block">
        <ProductImage
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge & Photos Count */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span className="bg-slate-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
            {product.category_name}
          </span>
          {product.images && product.images.length > 1 && (
            <span className="bg-slate-800/80 text-slate-200 text-[10px] font-mono px-1.5 py-0.2 rounded w-fit backdrop-blur-xs flex items-center gap-1">
              <Layers className="h-2.5 w-2.5" />
              <span>{product.images.length} Photos</span>
            </span>
          )}
        </div>

        {/* Quick WhatsApp Floating Action */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="absolute bottom-2.5 right-2.5 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow transition-colors z-20 cursor-pointer"
          title="Direct WhatsApp Inquiry"
          aria-label="Direct WhatsApp Inquiry"
        >
          <MessageSquare className="h-4 w-4" />
        </button>
      </div>

      {/* Product Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Primary Name */}
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          {/* Subtitle / Alternate Name */}
          {product.subtitle && (
            <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-snug">
              {product.subtitle}
            </div>
          )}

          {/* Measurements for Naagal */}
          {product.measurements && product.measurements.length > 0 && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-bold text-slate-700 mr-1">Available Sizes:</span>
              {product.measurements.map(m => (
                <span key={m} className="bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Shapes for MS Plates */}
          {product.shapes && product.shapes.length > 0 && (
            <div className="mt-2 text-xs text-slate-600">
              <span className="font-bold text-slate-700 block text-[11px] mb-1">Available Shapes:</span>
              <div className="flex flex-wrap gap-1">
                {product.shapes.slice(0, 4).map(s => (
                  <span key={s} className="bg-orange-50 text-orange-800 text-[10px] font-medium px-1.5 py-0.2 rounded border border-orange-200">
                    {s}
                  </span>
                ))}
                {product.shapes.length > 4 && (
                  <span className="text-[10px] text-slate-500 self-center">+{product.shapes.length - 4} more</span>
                )}
              </div>
            </div>
          )}

          {/* Standard Sizes for MS Sheets */}
          {product.standard_sizes && product.standard_sizes.length > 0 && !product.shapes && (
            <div className="mt-2 text-xs text-slate-600">
              <span className="font-bold text-slate-700 block text-[11px] mb-0.5">Standard Measurements:</span>
              <div className="text-[11px] text-slate-600 font-mono">
                1250×2500, 1500×2500, 1500×6300 mm...
              </div>
            </div>
          )}

          {/* Universal Thickness Information */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="text-[11px] text-slate-500 font-medium italic">
              {product.thickness_info || "Available in all thicknesses as per requirement."}
            </span>
          </div>

          {/* Pricing Policy Line */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Price:</span>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
              {product.price_type || 'Contact for Price'}
            </span>
          </div>
        </div>

        {/* Action Buttons: [ View Details ] [ Get Quote ] */}
        <div className="mt-4 pt-2 grid grid-cols-2 gap-2">
          <span className="inline-flex items-center justify-center min-h-[38px] px-3 py-2 text-xs font-semibold rounded-md border border-slate-300 bg-white text-slate-700 group-hover:bg-slate-50 group-hover:border-slate-400 group-hover:text-slate-900 transition-colors gap-1.5 w-full">
            <span>View Details</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>

          <Button
            type="button"
            variant="primary"
            size="sm"
            fullWidth
            leftIcon={<FileText className="h-3.5 w-3.5" />}
            onClick={handleQuoteClick}
            className="relative z-20"
          >
            Get Quote
          </Button>
        </div>

      </div>

    </Link>
  );
};
