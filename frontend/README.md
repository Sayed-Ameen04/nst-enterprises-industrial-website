# NST Enterprises - Frontend Application

Responsive React + TypeScript web application for **NST Enterprises**, providing a product catalogue, search/filter engine, quotation request workflow, WhatsApp/Phone integrations, and an administrative control panel.

## 🚀 Key Features

- **Product Catalogue**: Real-time filtering by category, thickness, material, and full-text search.
- **Product Details**: Technical specifications, dimensional gauges, quantity selection, and direct quote requests.
- **Multi-Channel Quotation**:
  - Web quote form with validation and instant feedback.
  - WhatsApp click-to-chat with auto-formatted inquiry strings.
  - Direct telephone links (`tel:`).
- **Admin Dashboard (`/admin`)**:
  - Overview KPI metrics and recent enquiry feed.
  - Product catalogue management (Create, Edit, Delete, Toggle Availability).
  - Enquiry management with pipeline statuses (`New`, `Pending`, `Contacted`, `Completed`).
  - Business profile & contact configuration.
- **Offline / Local Fallback**: Automatically falls back to local data/storage if the FastAPI backend is offline.

---

## 🛠️ Setup & Running

### 1. Requirements
- Node.js 18+
- `npm`

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Build for Production
```bash
npm run build
```
The compiled static assets will be in `frontend/dist/`.
