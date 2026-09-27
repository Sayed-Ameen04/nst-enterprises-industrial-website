import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  FileText,
  ShieldCheck,
  Plus,
  Minus,
  ChevronRight,
  Sparkles,
  Layers,
  Award,
  Flame
} from 'lucide-react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { ProductGallery } from '../components/products/ProductGallery';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { BUSINESS_CONFIG } from '../config/business';
import { generatePhoneLink, generateWhatsAppLink } from '../utils/whatsapp';

interface ProductDetailsProps {
  onOpenQuoteModal: (product?: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ onOpenQuoteModal }) => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setIsLoading(true);
      try {
        const item = await productService.getProductById(id);
        setProduct(item);
        if (item?.measurements && item.measurements.length > 0) {
          setSelectedSize(item.measurements[0]);
        } else if (item?.standard_sizes && item.standard_sizes.length > 0) {
          setSelectedSize(item.standard_sizes[0]);
        }
        if (item?.shapes && item.shapes.length > 0) {
          setSelectedShape(item.shapes[0]);
        }
        if (item?.grades && item.grades.length > 0) {
          setSelectedGrade(item.grades[0]);
        }
      } catch (e) {
        console.error('Failed to load product:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner message="Loading product specifications & photos..." fullHeight />;
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-600 text-sm">The product you are looking for may have been removed or does not exist.</p>
        <Link to="/products">
          <Button variant="primary" size="md">
            Return to Products Catalogue
          </Button>
        </Link>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const waUrl = generateWhatsAppLink({
      productName: product.name,
      material: product.material,
      thickness: product.thickness_info,
      shape: selectedShape || undefined,
      grade: selectedGrade || undefined,
      size: selectedSize,
      quantity: `${quantity} ${product.unit}`
    });
    window.open(waUrl, '_blank');
  };

  // Shape-specific image gallery support (Requirement 10, 11, 12)
  const activeShapeItem = product.shape_items?.find(s => s.name.toLowerCase() === selectedShape.toLowerCase());
  const productImages = activeShapeItem && activeShapeItem.images && activeShapeItem.images.length > 0
    ? activeShapeItem.images
    : (product.images && product.images.length > 0
      ? product.images
      : (product.image ? [product.image] : []));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto pb-1">
        <Link to="/products" className="hover:text-orange-600 inline-flex items-center gap-1 shrink-0">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Products</span>
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
        <Link to={`/products?category=${product.category_id}`} className="hover:text-orange-600 shrink-0">
          {product.category_name}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
        <span className="text-slate-900 truncate font-bold">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <ProductGallery images={productImages} productName={product.name} />

          {/* Business Quality Guarantee Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Award className="h-4 w-4 text-orange-600 shrink-0" />
              <span>50+ Years Experience in Prime Steel & Job Works</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Supplied directly from our yard at IDA Jeedimetla, Hyderabad with neat edge finishing and size maintenance.
            </p>
          </div>
        </div>

        {/* Right: Product Specifications & Order Options */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-2">
              <Sparkles className="h-3 w-3 text-orange-600" />
              <span>{product.category_name} Division</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {product.subtitle && (
              <p className="text-sm font-semibold text-orange-600 mt-1">
                {product.subtitle}
              </p>
            )}

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Policy Box */}
          <div className="p-4 rounded-lg bg-orange-50/70 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-slate-600">Pricing Policy</div>
              <div className="text-xl font-black text-orange-600">{product.price_type || 'Contact for Price'}</div>
            </div>
            <p className="text-[11px] text-slate-500 sm:text-right max-w-xs">
              Prices depend on dimensions, shapes, and daily market rates.
            </p>
          </div>

          {/* Universal Thickness Notice (Always displayed) */}
          <div className="p-3 bg-slate-100 rounded-md border border-slate-200 text-xs flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-orange-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Thickness Availability:</span>
              <span className="text-slate-700 font-medium">
                {product.thickness_info || "Available in all thicknesses as per requirement."}
              </span>
            </div>
          </div>

          {/* Available Measurements for Naagal */}
          {product.measurements && product.measurements.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                Available Inch Measurements:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.measurements.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedSize(m)}
                    className={`px-4 py-2 text-xs font-bold rounded-md border transition-all ${
                      selectedSize === m
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs scale-105'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Strict size maintenance across 19", 21", 23", 24", and 26" cultivator tynes.
              </p>
            </div>
          )}

          {/* Available Shapes for MS Plates with Shape-Specific Previews (Requirement 10 & 12) */}
          {product.shapes && product.shapes.length > 0 && (
            <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-600" />
                  <span>AVAILABLE SHAPES & PROFILE CUTTING</span>
                </label>
                {selectedShape && (
                  <span className="text-xs font-bold text-orange-600 bg-orange-100/80 px-2 py-0.5 rounded">
                    Active: {selectedShape}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.shapes.map(s => {
                  const shapeItem = product.shape_items?.find(item => item.name.toLowerCase() === s.toLowerCase());
                  const shapeImg = shapeItem?.images?.[0];
                  const isSelected = selectedShape === s;

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedShape(s)}
                      className={`flex items-center gap-2 p-2 rounded-md border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/50'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      {shapeImg && (
                        <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-slate-200 border border-slate-300/60">
                          <img src={shapeImg} alt={s} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block truncate">{s}</span>
                        <span className={`text-[10px] block ${isSelected ? 'text-orange-400 font-semibold' : 'text-slate-500'}`}>
                          {shapeItem?.images?.length || 1} Photo{(shapeItem?.images?.length || 1) > 1 ? 's' : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Select any shape above to inspect its dedicated profile image gallery and request a targeted quote.
              </p>
            </div>
          )}

          {/* Available Grades for MS Plates (Visible on Details Page) */}
          {product.grades && product.grades.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                Available Steel Grades:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.grades.map(g => (
                  <span
                    key={g}
                    className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold px-2.5 py-1 rounded"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Standard Sizes for MS Plates / Sheets */}
          {product.standard_sizes && product.standard_sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                Standard Measurements (mm):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.standard_sizes.map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1.5 text-xs font-mono font-semibold rounded border text-center transition-all ${
                      selectedSize === sz
                        ? 'bg-orange-600 text-white border-orange-600 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Custom lengths and profile gas cuts available on requirement.
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
              Estimated Order Quantity ({product.unit}):
            </label>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-slate-300 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-l-md transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-sm font-bold text-slate-900 border-x border-slate-200 py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-r-md transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Dispatch directly from IDA Jeedimetla yard
              </span>
            </div>
          </div>

          {/* Action CTAs: Request Quote, WhatsApp, Call */}
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<FileText className="h-5 w-5" />}
                onClick={() => onOpenQuoteModal({
                  ...product,
                  shapes: selectedShape ? [selectedShape, ...(product.shapes?.filter(s => s !== selectedShape) || [])] : product.shapes,
                  standard_sizes: selectedSize ? [selectedSize] : product.standard_sizes,
                  measurements: selectedSize ? [selectedSize] : product.measurements,
                  grades: selectedGrade ? [selectedGrade] : product.grades
                })}
              >
                Request Quotation {selectedShape ? `(${selectedShape})` : ''}
              </Button>

              <Button
                variant="success"
                size="lg"
                fullWidth
                leftIcon={<MessageSquare className="h-5 w-5" />}
                onClick={handleWhatsAppClick}
              >
                WhatsApp Inquiry
              </Button>
            </div>

            <a
              href={generatePhoneLink()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-600" />
              <span>Call Tanveer Ahmed: {BUSINESS_CONFIG.displayPhone}</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
