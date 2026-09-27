"""
NST Enterprises - Backend API
FastAPI Application serving Industrial Iron & Steel Product Catalog and Enquiries.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.products import router as products_router
from .api.categories import router as categories_router
from .api.enquiries import router as enquiries_router

app = FastAPI(
    title="NST Enterprises API",
    description="Backend API for NST Enterprises - Industrial Iron & Steel Products Website",
    version="1.0.0"
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(products_router)
app.include_router(categories_router)
app.include_router(enquiries_router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "NST Enterprises API",
        "version": "1.0.0",
        "environment": "prototype"
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to NST Enterprises Industrial Metal Catalog API",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }
