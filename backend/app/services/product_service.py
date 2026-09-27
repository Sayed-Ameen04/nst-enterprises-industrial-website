import uuid
from typing import List, Optional
from ..data.mock_data import MOCK_PRODUCTS, MOCK_CATEGORIES
from ..schemas.product import ProductCreate, ProductUpdate, ProductResponse
from ..schemas.category import CategoryResponse

class ProductService:
    def __init__(self):
        # In-memory working state cloned from mock data
        self.products: List[dict] = [dict(p) for p in MOCK_PRODUCTS]
        self.categories: List[dict] = [dict(c) for c in MOCK_CATEGORIES]

    def get_all_categories(self) -> List[CategoryResponse]:
        # Recalculate dynamic product counts
        for cat in self.categories:
            cat["product_count"] = sum(1 for p in self.products if p["category_id"] == cat["id"])
        return [CategoryResponse(**c) for c in self.categories]

    def get_all_products(
        self,
        category: Optional[str] = None,
        material: Optional[str] = None,
        thickness: Optional[str] = None,
        search: Optional[str] = None,
        is_featured: Optional[bool] = None
    ) -> List[ProductResponse]:
        results = self.products

        if category and category.lower() != "all":
            results = [p for p in results if p["category_id"] == category or p["category_name"].lower() == category.lower()]

        if material and material.lower() != "all":
            results = [p for p in results if p["material"].lower() == material.lower()]

        if thickness and thickness.lower() != "all":
            results = [p for p in results if p["thickness"].lower() == thickness.lower()]

        if is_featured is not None:
            results = [p for p in results if p.get("is_featured") == is_featured]

        if search:
            query = search.strip().lower()
            results = [
                p for p in results
                if query in p["name"].lower()
                or query in p["description"].lower()
                or query in p["material"].lower()
                or (p.get("grade") and query in p["grade"].lower())
                or any(query in tag.lower() for tag in p.get("tags", []))
            ]

        return [ProductResponse(**p) for p in results]

    def get_product_by_id(self, product_id: str) -> Optional[ProductResponse]:
        for p in self.products:
            if p["id"] == product_id:
                return ProductResponse(**p)
        return None

    def create_product(self, product_in: ProductCreate) -> ProductResponse:
        new_id = f"prod-{uuid.uuid4().hex[:6]}"
        data = product_in.model_dump()
        data["id"] = new_id
        self.products.insert(0, data)
        return ProductResponse(**data)

    def update_product(self, product_id: str, product_update: ProductUpdate) -> Optional[ProductResponse]:
        for idx, p in enumerate(self.products):
            if p["id"] == product_id:
                update_data = product_update.model_dump(exclude_unset=True)
                updated_item = {**p, **update_data}
                self.products[idx] = updated_item
                return ProductResponse(**updated_item)
        return None

    def delete_product(self, product_id: str) -> bool:
        for idx, p in enumerate(self.products):
            if p["id"] == product_id:
                self.products.pop(idx)
                return True
        return False

product_service = ProductService()
