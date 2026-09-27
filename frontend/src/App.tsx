import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileActionBar } from './components/layout/MobileActionBar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';
import { NotFound } from './pages/NotFound';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { ProductsManagement } from './pages/admin/ProductsManagement';
import { AddProduct } from './pages/admin/AddProduct';
import { EditProduct } from './pages/admin/EditProduct';
import { Enquiries } from './pages/admin/Enquiries';
import { Settings } from './pages/admin/Settings';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { Product } from './types/product';

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalProduct, setQuoteModalProduct] = useState<Product | null>(null);
  const [quoteModalService, setQuoteModalService] = useState<string | null>(null);

  const handleOpenQuoteModal = (product?: Product | null, service?: string | null) => {
    setQuoteModalProduct(product || null);
    setQuoteModalService(service || null);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalProduct(null);
    setQuoteModalService(null);
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Customer Storefront Navbar (hidden on /admin routes) */}
      {!isAdminRoute && <Navbar onOpenQuoteModal={handleOpenQuoteModal} />}

      {/* Main Content Area */}
      <div className="flex-1">
        <Routes>
          {/* Customer Facing Routes */}
          <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/products/:id" element={<ProductDetails onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/services" element={<Services onOpenQuoteModal={handleOpenQuoteModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Customer Storefront Footer (hidden on /admin routes) */}
      {!isAdminRoute && <Footer />}

      {/* Mobile Sticky Action Bar */}
      {!isAdminRoute && (
        <MobileActionBar onOpenQuoteModal={() => handleOpenQuoteModal()} />
      )}

      {/* Global Quotation Request Modal */}
      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        product={quoteModalProduct}
        service={quoteModalService}
      />
    </div>
  );
};

export default App;
