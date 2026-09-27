# NST ENTERPRISES — INDUSTRIAL IRON & STEEL PLATFORM

## 📋 Executive Overview

**NST Enterprises** is a modern, responsive web application and digital product catalogue prototype designed specifically for an industrial metal and steel supplier. It bridges the gap between traditional industrial steel procurement and modern digital product discovery.

### Business Goals
- Enable commercial contractors, engineers, fabricators, and manufacturing units to effortlessly browse metal sheets, plates, and structural steel items.
- Provide comprehensive technical specifications (standard grades, thickness gauges, surface finishes, stock dimensions).
- Streamline quotation requests via direct web inquiry, pre-formatted WhatsApp chat integration, and direct telephony.
- Provide an intuitive administrative control panel for the business owner to maintain inventory, review quotations, and configure company contact parameters.

---

## 🏗️ Architecture & Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS (Tailwind v4 with custom industrial palette)
- **Routing**: React Router 7 (`react-router-dom`)
- **Icons**: Lucide React
- **Design System**: Industrial dark charcoal (`#0f172a`), slate metallic grey, and high-visibility industrial orange accents (`#ea580c`).

### Backend
- **Framework**: Python 3.10+ / FastAPI
- **Data Validation**: Pydantic v2 schemas
- **Server**: Uvicorn ASGI Server
- **Persistence Architecture**: Modular service layer with in-memory state and clean abstraction ready for PostgreSQL / Supabase / MySQL integration.

---

## 📁 Directory Structure

```
nst-enterprises/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── ProductForm.tsx
│   │   │   ├── common/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── enquiry/
│   │   │   │   ├── EnquiryModal.tsx
│   │   │   │   └── QuoteForm.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   └── products/
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductFilters.tsx
│   │   │       ├── ProductGrid.tsx
│   │   │       ├── ProductImage.tsx
│   │   │       └── ProductSearch.tsx
│   │   ├── config/
│   │   │   └── business.ts
│   │   ├── data/
│   │   │   ├── categories.ts
│   │   │   ├── enquiries.ts
│   │   │   └── products.ts
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   ├── pages/
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── NotFound.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Quote.tsx
│   │   │   └── admin/
│   │   │       ├── AddProduct.tsx
│   │   │       ├── AdminLayout.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       ├── EditProduct.tsx
│   │   │       ├── Enquiries.tsx
│   │   │       ├── ProductsManagement.tsx
│   │   │       └── Settings.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── enquiryService.ts
│   │   │   └── productService.ts
│   │   ├── types/
│   │   │   ├── category.ts
│   │   │   ├── enquiry.ts
│   │   │   └── product.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   └── whatsapp.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── categories.py
│   │   │   ├── enquiries.py
│   │   │   └── products.py
│   │   ├── data/
│   │   │   └── mock_data.py
│   │   ├── models/
│   │   │   ├── category.py
│   │   │   ├── enquiry.py
│   │   │   └── product.py
│   │   ├── schemas/
│   │   │   ├── category.py
│   │   │   ├── enquiry.py
│   │   │   └── product.py
│   │   ├── services/
│   │   │   ├── enquiry_service.py
│   │   │   └── product_service.py
│   │   └── main.py
│   ├── requirements.txt
│   └── README.md
├── docs/
│   ├── API.md
│   └── PROJECT.md
├── .gitignore
└── README.md
```
