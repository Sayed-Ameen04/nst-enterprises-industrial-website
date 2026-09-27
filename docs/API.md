# NST ENTERPRISES — REST API SPECIFICATION

Base URL: `http://localhost:8000`  
Interactive OpenAPI documentation: `http://localhost:8000/docs`

---

## 1. System Health

### `GET /api/health`
Returns health check status and server version.

#### Response `200 OK`
```json
{
  "status": "healthy",
  "service": "NST Enterprises API",
  "version": "1.0.0",
  "environment": "prototype"
}
```

---

## 2. Categories

### `GET /api/categories`
Returns all product categories along with dynamic product counts.

#### Response `200 OK`
```json
[
  {
    "id": "cat-1",
    "name": "Iron Plates",
    "slug": "iron-plates",
    "description": "High-durability cast and wrought industrial iron plates...",
    "image": "https://images.unsplash.com/photo-1535813547-99c456a41d4a",
    "product_count": 3
  }
]
```

---

## 3. Products

### `GET /api/products`
Fetch products with optional multi-attribute query filtering.

#### Query Parameters:
- `category` (string, optional): Category ID or Category name
- `material` (string, optional): Material filter (e.g. `Mild Steel`, `Stainless Steel`)
- `thickness` (string, optional): Thickness filter (e.g. `6 mm`, `2 mm`)
- `search` (string, optional): Search query matched against name, description, grade, tags
- `featured` (boolean, optional): Filter by `true` / `false`

#### Response `200 OK`
```json
[
  {
    "id": "prod-1",
    "name": "MS Steel Plate (IS 2062)",
    "category_id": "cat-2",
    "category_name": "MS Plates",
    "description": "Commercial and structural grade Mild Steel plates...",
    "material": "Mild Steel",
    "grade": "IS 2062 Gr E250",
    "thickness": "6 mm",
    "length": "2500 mm",
    "width": "1250 mm",
    "finish": "Hot Rolled",
    "unit": "kg",
    "available_sizes": ["1000 × 2000 mm", "1250 × 2500 mm"],
    "image": "https://images.unsplash.com/...",
    "is_available": true,
    "is_featured": true,
    "price_type": "Contact for Price",
    "tags": ["Mild Steel", "Structural"]
  }
]
```

### `GET /api/products/{id}`
Returns full specification object for single product.

### `POST /api/products`
Creates a new product record.

### `PUT /api/products/{id}`
Updates existing product specifications.

### `DELETE /api/products/{id}`
Removes a product from the catalogue.

---

## 4. Quotation Enquiries

### `GET /api/enquiries`
Returns submitted quotations with status filtering.

#### Query Parameters:
- `status` (string, optional): `New`, `Pending`, `Contacted`, `Completed`
- `search` (string, optional): Customer name, phone, or product search

### `POST /api/enquiries`
Submits a new customer quotation enquiry.

#### Request Body:
```json
{
  "product_id": "prod-1",
  "product_name": "MS Steel Plate (IS 2062)",
  "customer_name": "Rahul Sharma",
  "phone": "+91 9505456781",
  "email": "rahul.sharma@example.com",
  "quantity": "500 kg",
  "required_size": "1250 × 2500 mm",
  "thickness": "6 mm",
  "message": "Urgent delivery needed to industrial area yard."
}
```

### `PUT /api/enquiries/{id}`
Updates enquiry status and sales follow-up notes.
