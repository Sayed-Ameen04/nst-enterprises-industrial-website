/**
 * Central Business Configuration for NST Enterprises
 * 
 * Updated with official business credentials, Tanveer Ahmed's contact lines,
 * Jeedimetla Hyderabad yard address, and 50+ years legacy in MS Plates & Agriculture Tynes.
 */

import facilityPhotoAsset from '../assets/facility.webp';

/**
 * Replaceable Facility Photograph Asset
 * 
 * To update the NST Enterprises facility photo later:
 * 1. Replace the file at 'src/assets/facility.webp' with the new image, OR
 * 2. Update the import path below to point to the new image file.
 */
export const FACILITY_PHOTO_ASSET = facilityPhotoAsset;

export interface BusinessConfig {
  businessName: string;
  contactPerson: string;
  tagline: string;
  shortDescription: string;
  facilityPhoto: string;
  phone: string;
  displayPhone: string;
  secondaryPhone: string;
  displaySecondaryPhone: string;
  whatsapp: string;
  displayWhatsapp: string;
  email: string;
  address: {
    plotNo: string;
    road: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  experienceYears: string;
  workingHours: string;
  workingDays: string;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  businessName: "NST ENTERPRISES",
  contactPerson: "Tanveer Ahmed",
  tagline: "50+ Years of Excellence in MS Plates, Profile Gas Cutting & Job Works, and Naagal",
  shortDescription: "Specialized in MS Plates, HR Sheets, Profile Gas Cutting Job Works, Base Plates, Rings, Circles, and Naagal (Cultivator Tynes) with precision size maintenance and neat edge finishing.",
  facilityPhoto: FACILITY_PHOTO_ASSET,
  phone: "+919505456781",
  displayPhone: "+91 95054 56781",
  secondaryPhone: "+918328137740",
  displaySecondaryPhone: "+91 83281 37740",
  whatsapp: "+919505456781",
  displayWhatsapp: "+91 95054 56781",
  email: "tanveer1026@gmail.com",
  address: {
    plotNo: "Plot No. 125",
    road: "Phase V Doolapally Road",
    landmark: "Near Haryana Weigh Bridge",
    area: "IDA Jeedimetla",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500055",
    full: "Plot No. 125, Phase V Doolapally Road, Near Haryana Weigh Bridge, IDA Jeedimetla, Hyderabad, Telangana 500055"
  },
  experienceYears: "50 - 55 Years",
  workingHours: "9:00 AM - 8:00 PM",
  workingDays: "Monday - Saturday"
};
