"""
NST ENTERPRISES - OFFICIAL DATA
Authoritative Source:
Contact Person: Tanveer Ahmed (9505456781 / 8328137740)
Email: tanveer1026@gmail.com
Address: Plot No: 125, Phase V Doolapally Road, Near HARYANA WEIGH BRIDGE, IDA Jeedimetla, Hyderabad, Telangana 500055
Business Experience: 50+ Years (Serving customers for over 50 years)
"""

from typing import List, Dict, Any

MOCK_CATEGORIES: List[Dict[str, Any]] = [
    {
        "id": "cat-agriculture",
        "name": "Agriculture",
        "slug": "agriculture",
        "description": "Agricultural implement components including Naagal (Cultivator Tynes in 19\", 21\", 23\", 24\", 26\") and Plow Material in various custom shapes.",
        "image": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
        "product_count": 2
    },
    {
        "id": "cat-industrial",
        "name": "Industrial",
        "slug": "industrial",
        "description": "Industrial steel supplies including MS Plates in all shapes & grades (IS 2062, E250, E350, EN8, C45) and Prime Hot Rolled MS Sheets (HR) in standard sizes.",
        "image": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
        "product_count": 2
    }
]

MOCK_PRODUCTS: List[Dict[str, Any]] = [
    {
        "id": "prod-naagal",
        "name": "Naagal",
        "category_id": "cat-agriculture",
        "category_name": "Agriculture",
        "subtitle": "Also known as Cultivator Tynes / Agricultural Cultivator Component",
        "description": "Heavy-duty agricultural Naagal (Cultivator Tynes) manufactured with strict size maintenance and high wear resistance. Sourced from prime materials with clean curvature and rugged durability for tough soil cultivation. Available in all standard inch measurements.",
        "material": "High Wear-Resistant Mild Steel & Alloy",
        "measurements": ["19\"", "21\"", "23\"", "24\"", "26\""],
        "thickness_info": "Available in all thicknesses as per requirement.",
        "finish": "Prime Forged & Clean Cut",
        "unit": "piece",
        "images": [
          "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80"
        ],
        "image": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
        "is_available": True,
        "is_featured": True,
        "price_type": "Contact for Price",
        "tags": ["Naagal", "Cultivator Tynes", "Cultivator", "Agriculture", "19 inch", "21 inch", "23 inch", "24 inch", "26 inch", "Prime Material"]
    },
    {
        "id": "prod-plow-material",
        "name": "Plow Material",
        "category_id": "cat-agriculture",
        "category_name": "Agriculture",
        "subtitle": "Agricultural Implement Plow Shapes & Share Points",
        "description": "Agricultural plow material cut and formed into specialized agrarian shapes. Manufactured from prime wear-resistant steel designed to withstand extreme soil friction. Available in multiple shape profiles as shown in reference photos.",
        "material": "Prime Wear-Resistant Steel / Mild Steel",
        "thickness_info": "Available in all thicknesses as per requirement.",
        "finish": "Neat Profile Cut Edge",
        "unit": "piece",
        "images": [
          "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=80"
        ],
        "image": "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80",
        "is_available": True,
        "is_featured": True,
        "price_type": "Contact for Price",
        "tags": ["Plow Material", "Plough Shapes", "Agriculture", "Plow Points", "Share Points", "Prime Material"]
    },
    {
        "id": "prod-ms-plates",
        "name": "MS Plates",
        "category_id": "cat-industrial",
        "category_name": "Industrial",
        "subtitle": "Prime Mild Steel Plates for Industrial & Commercial Fabrication",
        "description": "High-quality Mild Steel (MS) Plates supplied in prime condition for industrial fabrication, structural engineering, machine bases, and equipment manufacturing. Available in standard full mill sizes and precision gas-cut shapes including Square Plates, Base Plates, Rectangle Plates, Circles, and Rings with neat edge finishing.",
        "material": "Mild Steel",
        "grades": ["IS 2062", "E250", "E350", "EN8", "C45"],
        "shapes": ["Square Plates", "Base Plates", "Rectangle Plates", "Circles", "Rings"],
        "shape_items": [
          {
            "name": "Square Plates",
            "images": [
              "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=80"
            ]
          },
          {
            "name": "Base Plates",
            "images": [
              "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
            ]
          },
          {
            "name": "Rectangle Plates",
            "images": [
              "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
            ]
          },
          {
            "name": "Circles",
            "images": [
              "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
            ]
          },
          {
            "name": "Rings",
            "images": [
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
              "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80"
            ]
          }
        ],
        "standard_sizes": [
          "1250 × 2500 mm",
          "1500 × 2500 mm",
          "1250 × 6300 mm",
          "1500 × 6300 mm",
          "2500 × 6000 mm"
        ],
        "thickness_info": "Available in all thicknesses as per requirement.",
        "finish": "Hot Rolled Prime Mill Surface / Neat Gas Cut",
        "unit": "kg / piece",
        "images": [
          "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
        ],
        "image": "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
        "is_available": True,
        "is_featured": True,
        "price_type": "Contact for Price",
        "tags": ["MS Plates", "Mild Steel", "IS 2062", "E250", "E350", "EN8", "C45", "Square Plates", "Base Plates", "Rectangle Plates", "Circles", "Rings", "Prime Material"]
    },
    {
        "id": "prod-ms-sheets-hr",
        "name": "MS Sheets (HR)",
        "category_id": "cat-industrial",
        "category_name": "Industrial",
        "subtitle": "Hot Rolled Mild Steel Sheets & Plates",
        "description": "Prime Hot Rolled (HR) Mild Steel Sheets offering excellent weldability, clean surface finish, and accurate gauge tolerances. Sourced in prime material suitable for industrial ducting, chassis, tank building, structural framing, and general sheet metal work. Available in standard measurements and custom sheared sizes.",
        "material": "Mild Steel (Hot Rolled)",
        "grades": ["IS 1079", "IS 2062 Gr E250"],
        "standard_sizes": [
          "1250 × 2500 mm",
          "1500 × 2500 mm",
          "1250 × 6300 mm",
          "1500 × 6300 mm",
          "2500 × 6000 mm"
        ],
        "thickness_info": "Available in all thicknesses as per requirement.",
        "finish": "Hot Rolled Clean Pickled Finish",
        "unit": "kg / sheet",
        "images": [
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
        ],
        "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
        "is_available": True,
        "is_featured": True,
        "price_type": "Contact for Price",
        "tags": ["MS Sheets", "MS Sheets (HR)", "Hot Rolled", "HR Sheets", "Mild Steel", "Prime Steel", "1250x2500", "1500x2500", "1250x6300"]
    }
]

MOCK_ENQUIRIES: List[Dict[str, Any]] = [
    {
        "id": "enq-101",
        "product_id": "prod-naagal",
        "product_name": "Naagal",
        "customer_name": "Sri Krishna Agri Implements",
        "phone": "+91 95054 56781",
        "email": "agri.krishna@example.com",
        "quantity": "250 pieces",
        "required_size": "23\" & 24\"",
        "thickness": "As per requirement",
        "message": "Need delivery to Medchal rural warehouse. Require wear-resistant prime finish Naagal.",
        "created_at": "2026-09-26 09:30 AM",
        "status": "New",
        "notes": "Urgent requirement for tractor cultivator assembly batch."
    },
    {
        "id": "enq-102",
        "product_id": "prod-ms-plates",
        "product_name": "MS Plates",
        "customer_name": "Deccan Heavy Fabricators",
        "phone": "+91 83281 37740",
        "email": "procurement@deccanheavy.example",
        "quantity": "8.5 Tons",
        "required_size": "1500 × 6300 mm",
        "thickness": "16 mm & 20 mm",
        "shape": "Base Plates",
        "grade": "IS 2062 / E250",
        "message": "Quotation required for prime material with neat cut finishing. Delivery to IDA Jeedimetla.",
        "created_at": "2026-09-25 03:15 PM",
        "status": "Pending",
        "notes": "Awaiting final tonnage confirmation."
    }
]
