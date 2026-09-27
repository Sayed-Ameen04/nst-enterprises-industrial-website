import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Award,
  Flame,
  CheckCircle2,
  Tractor,
  ArrowRight,
  ShieldCheck,
  Building,
  Wrench,
  MapPin
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { Button } from '../components/common/Button';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="bg-slate-950 text-white rounded-xl p-8 sm:p-12 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-orange-400 text-xs font-semibold">
            <Award className="h-4 w-4" />
            <span>Established Legacy of 50 - 55 Years in Metal & Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Supplying MS Plates, Profile Gas Cutting Works & Agricultural Metal
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            {BUSINESS_CONFIG.businessName} is a premier industrial and agricultural metal enterprise located in IDA Jeedimetla, Hyderabad. With over 50 years of industry experience, we specialize in supplying Mild Steel (MS) Plates, HR Sheets, precision Profile Gas Cutting Job Works in all shapes, and heavy-duty Naagal (Cultivator Tynes).
          </p>
        </div>
      </section>

      {/* 2. Core Capabilities & 50+ Years Legacy */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">Our Capabilities & Legacy</div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">50+ Years of Industrial Metal Experience & Precision Job Works</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Decades of trusted service supplying prime quality material, precision profile gas cutting in all shapes, and strict size maintenance.
          </p>
        </div>

        {/* Highlight Summary Grid */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <span>Key Experience & Capabilities Summary</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">50 - 55 Years of Experience</span>
                <span className="text-xs text-slate-600">Deep industry knowledge and long-term customer relationships across Telangana and neighboring regions.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">MS Plates & MS Sheets (HR)</span>
                <span className="text-xs text-slate-600">Supplying mill standard sizes (1250x2500 up to 2500x6000 mm) in all thicknesses as per requirement.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">Profile Gas Cutting & Job Works</span>
                <span className="text-xs text-slate-600">Precision flame profile cutting for Base Plates, Square Plates, Rectangle Plates, Circles, and Concentric Rings.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">Naagal (Cultivator Tynes)</span>
                <span className="text-xs text-slate-600">Precision size-maintained cultivator tynes in standard 19", 21", 23", 24", and 26" measurements.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">Prime Material for Cutting & Job Work</span>
                <span className="text-xs text-slate-600">Dealings in certified prime grades including IS 2062, E250, E350, EN8, and C45.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 text-sm block">Neat Finishing of Cut Materials</span>
                <span className="text-xs text-slate-600">Clean deburring and slag removal ensuring smooth, uniform edges ready for immediate fabrication.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          
          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Prime Material Dealings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We handle prime certified steel grades (IS 2062, E250, E350, EN8, and C45), guaranteeing dependable mechanical strength, weldability, and structural soundness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Profile Gas Cutting Job Works</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full-fledged profile gas cutting job works executed directly from mother plates. We cut Base Plates, Square Plates, Rectangle Plates, Circles, and Concentric Rings to exact drawings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Neat Finishing of Cut Materials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every gas-cut piece undergoes thorough slag cleaning and edge deburring, ensuring smooth edges and accurate tolerances ready for immediate welding or machining.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Tractor className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Naagal (Cultivator Tynes)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintained standard inch measurements: 19", 21", 23", 24", and 26". Engineered with high wear resistance for long operational life in challenging agricultural soils.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Standard & Large Plate Sizes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Available in mill measurements: 1250×2500, 1500×2500, 1250×6300, 1500×6300, and 2500×6000 mm. Available in all thicknesses as per custom requirements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">50 - 55 Years Trusted Heritage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Operating from IDA Jeedimetla, Hyderabad, we are trusted by industrial fabricators, machinery builders, and agricultural implement manufacturers.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Facility Sourcing Callout */}
      <section className="bg-slate-100 rounded-xl p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <MapPin className="h-4 w-4 text-orange-600" />
            <span>Facility: {BUSINESS_CONFIG.address.full}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Have a drawing or specific plate size requirement?</h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Send us your dimensional requirements or CAD/profile sketch. <strong>Tanveer Ahmed</strong> and the team will provide prompt pricing and cutting timelines.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/products">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Explore Products
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="md">
              Contact Desk
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};
