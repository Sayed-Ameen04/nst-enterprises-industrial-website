import { Enquiry } from '../types/enquiry';

/**
 * NST Enterprises - Sample Quotation Enquiries
 */
export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-101",
    product_id: "prod-naagal",
    product_name: "Naagal (Cultivator Tynes)",
    customer_name: "Sri Krishna Agri Implements",
    phone: "+91 95054 56781",
    email: "agri.krishna@example.com",
    quantity: "250 pieces (23 & 24 Inch)",
    required_size: "23 Inch & 24 Inch",
    thickness: "Standard Maintained",
    message: "Need delivery to Medchal rural warehouse. Require wear-resistant prime finish Naagal.",
    created_at: "2026-09-26 09:30 AM",
    status: "New",
    notes: "Urgent requirement for tractor cultivator assembly batch."
  },
  {
    id: "enq-102",
    product_id: "prod-ms-plate-standard",
    product_name: "MS Plates (IS 2062 / E250)",
    customer_name: "Deccan Heavy Fabricators",
    phone: "+91 83281 37740",
    email: "procurement@deccanheavy.example",
    quantity: "8.5 Tons",
    required_size: "1500 × 6300 mm",
    thickness: "16 mm & 20 mm",
    message: "Quotation required for prime material with mill test certificate. Delivery to IDA Jeedimetla.",
    created_at: "2026-09-25 03:15 PM",
    status: "Pending",
    notes: "Awaiting final tonnage confirmation."
  },
  {
    id: "enq-103",
    product_id: "prod-shape-base-plates",
    product_name: "Profile Gas Cut Base Plates",
    customer_name: "Telangana Pre-Engineered Structures",
    phone: "+91 98490 12345",
    email: "structures@telanganapes.example",
    quantity: "120 pieces",
    required_size: "500 × 500 mm",
    thickness: "25 mm",
    message: "Profile gas cutting job work required with 4 anchor holes. Neat edge finishing essential.",
    created_at: "2026-09-24 11:45 AM",
    status: "Contacted",
    notes: "Drawing received on WhatsApp, price quote shared."
  },
  {
    id: "enq-104",
    product_id: "prod-shape-circles",
    product_name: "Profile Gas Cut Circles (Round Discs)",
    customer_name: "Apex Gear Works",
    phone: "+91 97000 88776",
    email: "sales@apexgear.example",
    quantity: "40 pieces",
    required_size: "Ø 600 mm",
    thickness: "40 mm (EN8)",
    message: "EN8 prime plate round discs for gear blank machining.",
    created_at: "2026-09-23 02:20 PM",
    status: "Completed",
    notes: "Gas cut cleanly, dispatched from yard."
  }
];
