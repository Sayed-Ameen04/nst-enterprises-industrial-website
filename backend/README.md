# NST Enterprises - Backend API

FastAPI-powered RESTful API for **NST Enterprises**, providing product catalog search, category filtering, quotation enquiry submission, and admin management endpoints.

## 🚀 Features

- **Product Catalog Management**: Full CRUD operations for industrial metal products (MS Plates, GI Sheets, Steel Plates, etc.).
- **Category Listing**: Dynamic product count tracking by category.
- **Enquiry Management**: Quotation intake pipeline with status workflow (`New`, `Pending`, `Contacted`, `Completed`).
- **Pydantic Validation**: Strict schema enforcement for data integrity.
- **CORS Enabled**: Seamless integration with the Vite React frontend.
- **Ready for DB Migration**: Structured service and schema architecture designed for drop-in connection to PostgreSQL, Supabase, or MySQL.

---

## 🛠️ Setup & Running

### 1. Requirements
- Python 3.10+
- `pip`

### 2. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Run Development Server
```bash
uvicorn app.main:app --reload --port 8000
```
The API will be live at: `http://localhost:8000`  
Interactive Swagger documentation: `http://localhost:8000/docs`  
Alternative ReDoc documentation: `http://localhost:8000/redoc`

---

## 📡 Key Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/products` | Get products (supports `category`, `material`, `thickness`, `search`, `featured`) |
| `GET` | `/api/products/{id}` | Get single product by ID |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/{id}` | Update product specifications |
| `DELETE` | `/api/products/{id}` | Delete product |
| `GET` | `/api/categories` | List all product categories |
| `GET` | `/api/enquiries` | List quotation enquiries (supports `status`, `search`) |
| `GET` | `/api/enquiries/{id}` | Get single enquiry |
| `POST` | `/api/enquiries` | Submit customer quotation request |
| `PUT` | `/api/enquiries/{id}` | Update enquiry status and notes |
