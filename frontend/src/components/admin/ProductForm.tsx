import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, ProductFormData, ShapeItem } from '../../types/product';
import { Category } from '../../types/category';
import { productService } from '../../services/productService';
import { Button } from '../common/Button';
import { Save, Plus, Trash2, Image as ImageIcon, Star, Flame } from 'lucide-react';

interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  isEditing = false
}) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    category_id: initialData?.category_id || 'cat-industrial',
    category_name: initialData?.category_name || 'Industrial',
    subtitle: initialData?.subtitle || '',
    description: initialData?.description || '',
    material: initialData?.material || 'Mild Steel',
    grades: initialData?.grades || ['IS 2062', 'E250', 'E350', 'EN8', 'C45'],
    shapes: initialData?.shapes || ['Square Plates', 'Base Plates', 'Rectangle Plates', 'Circles', 'Rings'],
    standard_sizes: initialData?.standard_sizes || ['1250 × 2500 mm', '1500 × 2500 mm', '1250 × 6300 mm', '1500 × 6300 mm', '2500 × 6000 mm'],
    measurements: initialData?.measurements || ['19 Inch', '21 Inch', '23 Inch', '24 Inch', '26 Inch'],
    thickness_info: initialData?.thickness_info || 'Available in all thicknesses as per requirement.',
    finish: initialData?.finish || 'Hot Rolled Prime / Clean Cut',
    unit: initialData?.unit || 'kg / piece',
    images: initialData?.images && initialData.images.length > 0
      ? initialData.images
      : (initialData?.image ? [initialData.image] : ['https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80']),
    image: initialData?.image || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    is_available: initialData?.is_available ?? true,
    is_featured: initialData?.is_featured ?? false,
    price_type: initialData?.price_type || 'Contact for Price',
    tags: initialData?.tags || ['MS Plates', 'Prime Material']
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [gradesInput, setGradesInput] = useState<string>(
    initialData?.grades ? initialData.grades.join(', ') : 'IS 2062, E250, E350, EN8, C45'
  );
  const [shapesInput, setShapesInput] = useState<string>(
    initialData?.shapes ? initialData.shapes.join(', ') : 'Square Plates, Base Plates, Rectangle Plates, Circles, Rings'
  );
  const [sizesInput, setSizesInput] = useState<string>(
    initialData?.standard_sizes ? initialData.standard_sizes.join(', ') : '1250 × 2500 mm, 1500 × 2500 mm, 1250 × 6300 mm, 1500 × 6300 mm, 2500 × 6000 mm'
  );
  const [measurementsInput, setMeasurementsInput] = useState<string>(
    initialData?.measurements ? initialData.measurements.join(', ') : '19 Inch, 21 Inch, 23 Inch, 24 Inch, 26 Inch'
  );
  const [tagsInput, setTagsInput] = useState<string>(
    initialData?.tags ? initialData.tags.join(', ') : 'Prime Material'
  );

  // Shape-specific galleries state (Requirement 14)
  const defaultShapes = ['Square Plates', 'Base Plates', 'Rectangle Plates', 'Circles', 'Rings'];
  const [shapeItems, setShapeItems] = useState<ShapeItem[]>(
    initialData?.shape_items && initialData.shape_items.length > 0
      ? initialData.shape_items
      : defaultShapes.map(name => ({ name, images: [] }))
  );
  const [activeShapeTab, setActiveShapeTab] = useState<string>('Square Plates');
  const [newShapeImageUrl, setNewShapeImageUrl] = useState<string>('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
      } catch (e) {
        console.error('Failed to load categories:', e);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value as 'cat-agriculture' | 'cat-industrial';
    const cat = categories.find(c => c.id === selectedId);
    setFormData(prev => ({
      ...prev,
      category_id: selectedId,
      category_name: cat ? (cat.name as any) : (selectedId === 'cat-agriculture' ? 'Agriculture' : 'Industrial')
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
        image: prev.images.length === 0 ? newImageUrl.trim() : prev.image
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        image: updated[0] || ''
      };
    });
  };

  const handleSetPrimaryImage = (indexToPrimary: number) => {
    setFormData(prev => {
      const selected = prev.images[indexToPrimary];
      const otherImages = prev.images.filter((_, idx) => idx !== indexToPrimary);
      return {
        ...prev,
        images: [selected, ...otherImages],
        image: selected
      };
    });
  };

  const handleAddShapeImage = () => {
    if (!newShapeImageUrl.trim()) return;
    setShapeItems(prev => {
      const existing = prev.find(s => s.name.toLowerCase() === activeShapeTab.toLowerCase());
      if (existing) {
        return prev.map(s =>
          s.name.toLowerCase() === activeShapeTab.toLowerCase()
            ? { ...s, images: [...s.images, newShapeImageUrl.trim()] }
            : s
        );
      } else {
        return [...prev, { name: activeShapeTab, images: [newShapeImageUrl.trim()] }];
      }
    });
    setNewShapeImageUrl('');
  };

  const handleRemoveShapeImage = (shapeName: string, indexToRemove: number) => {
    setShapeItems(prev =>
      prev.map(s =>
        s.name.toLowerCase() === shapeName.toLowerCase()
          ? { ...s, images: s.images.filter((_, idx) => idx !== indexToRemove) }
          : s
      )
    );
  };

  const handleSetPrimaryShapeImage = (shapeName: string, indexToPrimary: number) => {
    setShapeItems(prev =>
      prev.map(s => {
        if (s.name.toLowerCase() === shapeName.toLowerCase()) {
          const selected = s.images[indexToPrimary];
          const others = s.images.filter((_, idx) => idx !== indexToPrimary);
          return { ...s, images: [selected, ...others] };
        }
        return s;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide a Product Name.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const parsedShapes = shapesInput.split(',').map(s => s.trim()).filter(Boolean);

    // Ensure all shapes present in shapesInput exist in shapeItems
    const synchronizedShapeItems = parsedShapes.map(shapeName => {
      const existing = shapeItems.find(s => s.name.toLowerCase() === shapeName.toLowerCase());
      return existing || { name: shapeName, images: [] };
    });

    const processedData: ProductFormData = {
      ...formData,
      grades: gradesInput.split(',').map(s => s.trim()).filter(Boolean),
      shapes: parsedShapes,
      shape_items: synchronizedShapeItems,
      standard_sizes: sizesInput.split(',').map(s => s.trim()).filter(Boolean),
      measurements: measurementsInput.split(',').map(s => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      image: formData.images[0] || formData.image || ''
    };

    try {
      if (isEditing && initialData?.id) {
        await productService.updateProduct(initialData.id, processedData);
      } else {
        await productService.createProduct(processedData);
      }
      navigate('/admin/products');
    } catch (err) {
      setError((err as Error).message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Main Info Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400">Basic Product Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Primary Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Naagal or MS Plates"
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="cat-agriculture">Agriculture (Naagal, Plow Material)</option>
              <option value="cat-industrial">Industrial (MS Plates, MS Sheets HR)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Secondary Subtitle / Alternative Terminology
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle || ''}
            onChange={handleChange}
            placeholder="e.g. Also known as Cultivator Tynes / Agricultural Cultivator Component"
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of prime material, size maintenance, and application..."
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Multiple Photos Gallery Upload Card (Section 10) */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Product Photos & Shape References ({formData.images.length})</span>
          </h3>
          <span className="text-[11px] text-slate-400">Supports multiple photos per product</span>
        </div>

        {/* Add Photo Input */}
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={e => setNewImageUrl(e.target.value)}
            placeholder="Enter Image URL (e.g. https://... or /images/...)"
            className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddImage}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Image
          </Button>
        </div>

        {/* Image Previews & Order Management */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative group bg-slate-900 rounded-md overflow-hidden border border-slate-800 aspect-4/3">
              <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
              {idx === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  <span>Primary</span>
                </div>
              )}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimaryImage(idx)}
                    className="p-1 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded text-[10px] font-bold"
                    title="Set as primary"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded"
                  title="Remove image"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shape-Specific Image Galleries (Requirement 14) */}
      {formData.shapes && formData.shapes.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <Flame className="h-4 w-4" />
                <span>MS Plate Shapes — Independent Image Galleries (Requirement 14)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage separate image collections for each shape (Square Plates, Base Plates, Rectangle Plates, Circles, Rings).
              </p>
            </div>
            <span className="text-[10px] bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono w-fit">
              {shapeItems.length} Shapes Configured
            </span>
          </div>

          {/* Shape Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {shapeItems.map(shape => {
              const count = shape.images.length;
              const isSelected = activeShapeTab.toLowerCase() === shape.name.toLowerCase();
              return (
                <button
                  key={shape.name}
                  type="button"
                  onClick={() => setActiveShapeTab(shape.name)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span>{shape.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-orange-800 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Shape Gallery Management Box */}
          {(() => {
            const currentShape = shapeItems.find(s => s.name.toLowerCase() === activeShapeTab.toLowerCase()) || { name: activeShapeTab, images: [] };
            return (
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Active Shape:</span>
                    <span className="text-orange-400 font-mono text-sm underline">{currentShape.name}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {currentShape.images.length} image{currentShape.images.length !== 1 ? 's' : ''} in gallery
                  </span>
                </div>

                {/* Add Image for Active Shape */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newShapeImageUrl}
                    onChange={e => setNewShapeImageUrl(e.target.value)}
                    placeholder={`Enter Image URL for ${currentShape.name}...`}
                    className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddShapeImage}
                    leftIcon={<Plus className="h-3.5 w-3.5" />}
                  >
                    Add to Shape
                  </Button>
                </div>

                {/* Active Shape Images Grid */}
                {currentShape.images.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-800 rounded-md text-xs text-slate-500">
                    No images added for {currentShape.name} yet. Enter an image URL above to add the first photo.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {currentShape.images.map((img, idx) => (
                      <div key={idx} className="relative group bg-slate-950 rounded-md overflow-hidden border border-slate-800 aspect-4/3">
                        <img src={img} alt={`${currentShape.name} ${idx + 1}`} className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <div className="absolute top-1.5 left-1.5 bg-orange-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                            <Star className="h-2.5 w-2.5 fill-current" />
                            <span>Shape Primary</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryShapeImage(currentShape.name, idx)}
                              className="p-1 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded text-[10px] font-bold cursor-pointer"
                              title="Set as primary for this shape"
                            >
                              Set Primary
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveShapeImage(currentShape.name, idx)}
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer"
                            title="Remove image from shape"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Specifications & Measurements Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-orange-400">Specifications & Options</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Material Description
            </label>
            <input
              type="text"
              name="material"
              value={formData.material || ''}
              onChange={handleChange}
              placeholder="e.g. Mild Steel / Wear-Resistant Steel"
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Thickness Policy / Statement
            </label>
            <input
              type="text"
              name="thickness_info"
              value={formData.thickness_info}
              onChange={handleChange}
              placeholder="Available in all thicknesses as per requirement."
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Naagal Measurements */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Available Measurements (For Naagal - Comma Separated)
          </label>
          <input
            type="text"
            value={measurementsInput}
            onChange={e => setMeasurementsInput(e.target.value)}
            placeholder="19 Inch, 21 Inch, 23 Inch, 24 Inch, 26 Inch"
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
          />
        </div>

        {/* MS Plates Shapes */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Available Shapes (For MS Plates - Comma Separated)
          </label>
          <input
            type="text"
            value={shapesInput}
            onChange={e => setShapesInput(e.target.value)}
            placeholder="Square Plates, Base Plates, Rectangle Plates, Circles, Rings"
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Steel Grades (Shown on Details Page) */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Available Grades (Shown on Details Page - Comma Separated)
          </label>
          <input
            type="text"
            value={gradesInput}
            onChange={e => setGradesInput(e.target.value)}
            placeholder="IS 2062, E250, E350, EN8, C45"
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
          />
        </div>

        {/* Standard Mill Measurements */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Standard Measurements (mm - Comma Separated)
          </label>
          <input
            type="text"
            value={sizesInput}
            onChange={e => setSizesInput(e.target.value)}
            placeholder="1250 × 2500 mm, 1500 × 2500 mm, 1250 × 6300 mm, 1500 × 6300 mm, 2500 × 6000 mm"
            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Active in Inventory</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Feature on Homepage</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="md"
          className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
          onClick={() => navigate('/admin/products')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          leftIcon={<Save className="h-4 w-4" />}
        >
          {isEditing ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>

    </form>
  );
};
