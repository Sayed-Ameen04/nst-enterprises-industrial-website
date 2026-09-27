import { BUSINESS_CONFIG } from '../config/business';

export interface WhatsAppProductQuery {
  productName?: string;
  customerName?: string; // Your Name / Company Name
  shape?: string;
  grade?: string;
  thickness?: string;
  material?: string;
  size?: string;
  quantity?: string | number;
  unit?: string;
  customMessage?: string;
}

/**
 * Builds a direct WhatsApp click-to-chat URL preserving the clean base structure,
 * with dynamic customer / company name and product-specific specs.
 */
export function generateWhatsAppLink(details?: WhatsAppProductQuery): string {
  const cleanNumber = BUSINESS_CONFIG.whatsapp.replace(/[^0-9]/g, '');

  if (!details || (!details.productName && !details.customMessage)) {
    const generalText = `Hello ${BUSINESS_CONFIG.businessName},\n\nI am interested in your MS Plates, Profile Gas Cutting works, or Naagal agricultural products.\n\nPlease provide current availability and pricing.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(generalText)}`;
  }

  const parts: string[] = [`Hello ${BUSINESS_CONFIG.businessName},`];
  parts.push(`\nI am interested in:\n`);

  if (details.productName) {
    parts.push(`Product: ${details.productName}`);
  }

  if (details.customerName) {
    parts.push(`Name / Company: ${details.customerName}`);
  }

  if (details.shape) {
    parts.push(`Shape: ${details.shape}`);
  }

  if (details.grade) {
    parts.push(`Grade: ${details.grade}`);
  }

  if (details.thickness) {
    parts.push(`Thickness: ${details.thickness}`);
  }

  if (details.size) {
    parts.push(`Size: ${details.size}`);
  }

  if (details.quantity) {
    const unit = details.unit ? ` ${details.unit}` : '';
    parts.push(`Quantity: ${details.quantity}${unit}`);
  }

  if (details.material) {
    parts.push(`Material: ${details.material}`);
  }

  if (details.customMessage) {
    parts.push(`Notes: ${details.customMessage}`);
  }

  parts.push(`\nPlease provide the current price and availability.`);

  const message = parts.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a standard tel: link using central business config
 */
export function generatePhoneLink(): string {
  return `tel:${BUSINESS_CONFIG.phone}`;
}

/**
 * Generates a mailto: link using central business config
 */
export function generateEmailLink(subject = "Product Quotation Enquiry - NST Enterprises"): string {
  return `mailto:${BUSINESS_CONFIG.email}?subject=${encodeURIComponent(subject)}`;
}
