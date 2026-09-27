import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Phone,
  FileText,
  Flame,
  Tractor,
  MessageSquare,
  MapPin,
  Mail,
  Navigation
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/products/ProductCard';
import { ProductImage } from '../components/products/ProductImage';
import { Button } from '../components/common/Button';
import { generateWhatsAppLink, generateEmailLink } from '../utils/whatsapp';
import { Product } from '../types/product';
import { FacilitySection } from '../components/home/FacilitySection';

interface HomeProps {
  onOpenQuoteModal: (product?: Product | null, service?: string | null) => void;
  showHeroImage?: boolean; // Future shop/warehouse photograph support (Requirement 19)
}

const GST_NUMBER = '36BXJPM1398C1ZC';

const styles = {
  page: 'space-y-16 pb-16',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contactCard: 'relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-7 space-y-5',
  contactPanel: 'p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3',
  contactLabel: 'flex items-center gap-2 text-xs font-bold uppercase tracking-wide',
} as const;

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal, showHeroImage = false }) => {
  const { products, categories } = useProducts();

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 4);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_CONFIG.address.full)}`;

  return (
    <div className={styles.page}>
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        {/* Subtle industrial grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-orange-400 text-xs font-semibold tracking-wide">
                <Award className="h-4 w-4 text-orange-400" />
                <span>Established Heritage in Hyderabad • IDA Jeedimetla</span>
              </div>

              {/* Main Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                MS Plates • <br className="hidden sm:inline" />
                <span className="text-orange-500">Profile Gas Cutting & Job Works</span> • <br className="hidden sm:inline" />
                <span className="text-slate-100">Naagal</span>
              </h1>

              {/* Tagline - Responsive Sizing as per Requirement 4 */}
              <div className="pt-1">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white leading-snug sm:leading-tight">
                  Over 50+ Years of Industrial & Agricultural Profile Gas Cutting Experience
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {BUSINESS_CONFIG.businessName} has been supplying quality MS plates, sheets, Naagal agricultural products, and providing precision profile gas cutting & job works for over 50 years.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link to="/products">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Browse Products & Shapes
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600"
                  leftIcon={<FileText className="h-4 w-4 text-orange-400" />}
                  onClick={() => onOpenQuoteModal()}
                >
                  Request a Quote
                </Button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <div className="text-orange-500 font-extrabold text-sm sm:text-base">Prime Material</div>
                  <div className="text-slate-400 text-xs mt-0.5">IS 2062, E250, E350, EN8, C45</div>
                </div>
                <div>
                  <div className="text-orange-500 font-extrabold text-sm sm:text-base">Naagal</div>
                  <div className="text-slate-400 text-xs mt-0.5">19", 21", 23", 24", 26" Maintained</div>
                </div>
                <div>
                  <div className="text-orange-500 font-extrabold text-sm sm:text-base">Profile Job Works</div>
                  <div className="text-slate-400 text-xs mt-0.5">Neat Gas Cut All Shapes</div>
                </div>
              </div>

            </div>

            {/* Repurposed Hero Area: Prominent "Contact & Location" Card (Requirement 1 & 19) */}
            <div className="lg:col-span-5">
              <div className={styles.contactCard}>
                
                {/* Optional Future Warehouse Image (Requirement 19) */}
                {showHeroImage && (
                  <div className="aspect-16/9 rounded-lg overflow-hidden border border-slate-800 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
                      alt="NST Enterprises Facility"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Card Header & Contact Person */}
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded border border-orange-800/60">
                      Contact & Location Desk
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Direct Inquiries</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-2 tracking-tight">
                    {BUSINESS_CONFIG.businessName}
                  </h2>
                  <p className="text-sm font-semibold text-orange-400 mt-0.5">
                    {BUSINESS_CONFIG.contactPerson} <span className="text-slate-400 text-xs font-normal">• Sales & Managing Desk</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    GSTIN: <span className="font-mono font-semibold text-slate-200">{GST_NUMBER}</span>
                  </p>
                </div>

                {/* Actionable Phone Numbers & Email (Requirement 2) */}
                <div className="space-y-2.5 text-xs sm:text-sm">
                  {/* WhatsApp Line */}
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-emerald-600/20 text-emerald-400 rounded-md">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-mono font-bold text-white group-hover:text-emerald-300">
                          {BUSINESS_CONFIG.displayWhatsapp}
                        </div>
                        <span className="text-[11px] text-emerald-400 font-medium">Business WhatsApp / Call</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-900/80 px-2 py-0.5 rounded">
                      Chat Now
                    </span>
                  </a>

                  {/* Secondary Phone Line */}
                  <a
                    href="tel:+918328137740"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-600/20 text-orange-400 rounded-md">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-mono font-bold text-white group-hover:text-orange-300">
                          {BUSINESS_CONFIG.displaySecondaryPhone}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">Call / Contact Line</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-white bg-slate-800 px-2 py-0.5 rounded">
                      Call
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={generateEmailLink()}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-colors group text-slate-300 hover:text-white"
                  >
                    <div className="p-1.5 bg-slate-800 text-slate-300 rounded-md">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-xs text-slate-300 group-hover:text-orange-400 truncate">
                      {BUSINESS_CONFIG.email}
                    </span>
                  </a>
                </div>

                {/* Multi-line Address (Requirement 3) */}
                <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wide">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>Office & Yard Address</span>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed font-sans pl-5 space-y-0.5">
                    <p className="font-bold text-white">NST ENTERPRISES</p>
                    <p>Plot No: 125, Phase V</p>
                    <p>Doolapally Road</p>
                    <p className="text-amber-400 font-semibold">Near HARYANA WEIGH BRIDGE</p>
                    <p>IDA Jeedimetla</p>
                    <p>Hyderabad, Telangana - 500055</p>
                  </div>
                </div>

                {/* Prominent Action Buttons (Requirement 1) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <a
                    href="tel:+919505456781"
                    className="flex flex-col items-center justify-center p-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-center transition-all group"
                  >
                    <Phone className="h-4 w-4 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold">CALL NOW</span>
                  </a>

                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-center transition-all shadow-xs group"
                  >
                    <MessageSquare className="h-4 w-4 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold">WHATSAPP</span>
                  </a>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-md bg-orange-600 hover:bg-orange-500 text-white text-center transition-all shadow-xs group"
                  >
                    <Navigation className="h-4 w-4 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold">DIRECTIONS</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* 2. OUR FACILITY SECTION */}
      <FacilitySection />

      {/* 3. PRODUCT CATEGORIES & CATALOG OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Catalog Overview</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Our Core Offerings</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Naagal (Cultivator Tynes), MS Plates in standard mill sizes, HR Sheets, and customized Profile Gas Cutting Job Works.
            </p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700">
            <span>View Full Inventory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 relative block"
              aria-label={`Browse ${cat.name} products`}
            >
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <ProductImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white text-[11px] font-mono font-semibold px-2 py-0.5 rounded">
                  {cat.product_count} Items
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Quality Stock</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors border border-orange-200 group-hover:border-orange-600">
                    <span>View Products</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-14">
        <div className={styles.container}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Featured Inventory & Job Works</div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Popular Products & Shapes</h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore standard sizes, Naagal measurements, and custom gas cut steel profiles.
              </p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700">
              <span>See All Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onRequestQuote={onOpenQuoteModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BUSINESS HIGHLIGHTS / WHY CUSTOMERS CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">50+ Years Legacy</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Why Choose NST Enterprises</h2>
          <p className="text-sm text-slate-600 mt-2">
            Built on reliable dealings in prime materials, accurate size maintenance, and clean gas cut finishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Dealings in Prime Material</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We supply only prime quality steel plates and sheets (IS 2062, E250, E350, EN8, C45) ensuring integrity for high-stress applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Profile Gas Cutting Job Works</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Precision gas cutting in all shapes: Square plates, Base plates, Circles, Rings, and Custom Profiles with neat, deburred finishing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <Tractor className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Naagal (Cultivator Tynes)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict size-maintained agricultural Naagal in 19, 21, 23, 24, and 26 inches with high wear-resistance for reliable farming operations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">50 - 55 Years Experience</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Decades of trusted service from our facility at IDA Jeedimetla, Hyderabad, meeting fabrication and agricultural demands promptly.
            </p>
          </div>

        </div>
      </section>

      {/* 6. DEDICATED CONTACT & LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-950/80 px-3 py-1 rounded border border-orange-800/60 inline-block">
              Business Contact & Facility
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              CONTACT NST ENTERPRISES
            </h2>
            <p className="text-orange-400 font-semibold text-sm sm:text-base">
              Over 50+ Years of Industrial & Agricultural Metal Experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* Visit Us */}
            <div className={styles.contactPanel}>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wide">
                <MapPin className="h-4 w-4" />
                <span>VISIT US</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-0.5">
                <p className="font-bold text-white">NST ENTERPRISES</p>
                <p>Plot No: 125, Phase V</p>
                <p>Doolapally Road</p>
                <p className="text-amber-400 font-medium">Near HARYANA WEIGH BRIDGE</p>
                <p>IDA Jeedimetla</p>
                <p>Hyderabad, Telangana - 500055</p>
                <p className="pt-1 text-slate-400">
                  GSTIN: <span className="font-mono font-semibold text-slate-200">{GST_NUMBER}</span>
                </p>
              </div>
            </div>

            {/* Call */}
            <div className={styles.contactPanel}>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wide">
                <Phone className="h-4 w-4" />
                <span>CALL US</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <a
                    href="tel:+919505456781"
                    className="font-mono font-bold text-sm text-white hover:text-orange-400 block transition-colors"
                  >
                    9505456781
                  </a>
                  <span className="text-[11px] text-slate-400">Business WhatsApp / Primary</span>
                </div>
                <div>
                  <a
                    href="tel:+918328137740"
                    className="font-mono font-bold text-sm text-white hover:text-orange-400 block transition-colors"
                  >
                    8328137740
                  </a>
                  <span className="text-[11px] text-slate-400">Alternative Calling Line</span>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className={styles.contactPanel}>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                <MessageSquare className="h-4 w-4" />
                <span>WHATSAPP</span>
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-sm text-white hover:text-emerald-400 block transition-colors"
                >
                  9505456781
                </a>
                <p className="text-slate-400 text-xs">
                  Direct WhatsApp chat with <strong>Tanveer Ahmed</strong> for quick estimates & stock checks.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className={styles.contactPanel}>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wide">
                <Mail className="h-4 w-4" />
                <span>EMAIL US</span>
              </div>
              <div className="space-y-2 text-xs">
                <a
                  href={generateEmailLink()}
                  className="font-mono font-bold text-xs sm:text-sm text-white hover:text-orange-400 block break-all transition-colors"
                >
                  tanveer1026@gmail.com
                </a>
                <p className="text-slate-400 text-xs">
                  Send drawings, RFQs, and purchase orders directly.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-8 flex flex-wrap items-center gap-4 border-t border-slate-800 mt-8">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-md text-sm font-bold transition-colors shadow-xs"
            >
              <Navigation className="h-4 w-4" />
              <span>GET DIRECTIONS</span>
            </a>

            <a
              href="tel:+919505456781"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-bold border border-slate-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-orange-400" />
              <span>CALL NOW</span>
            </a>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-bold transition-colors shadow-xs"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WHATSAPP</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-xl p-8 sm:p-12 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Need custom profile gas cutting or full plate supplies?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Connect directly with <strong>Tanveer Ahmed</strong> for immediate quotations on standard MS Plates (1250x2500 to 2500x6000), HR Sheets, Base Plates, Circles, or Naagal.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onOpenQuoteModal()}
              leftIcon={<FileText className="h-4 w-4" />}
            >
              Request Custom Quote
            </Button>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md text-base font-semibold transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp: 9505456781</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
