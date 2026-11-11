export type UserRole = 'customer' | 'seller' | 'admin';

export type CategoryType =
  | 'Clothing & Textiles'
  | 'Furniture'
  | 'Electronics'
  | 'Electrical Supplies'
  | 'Construction Materials'
  | 'Packaging'
  | 'Food & Grocery'
  | 'Professional Services'
  | 'Home Services'
  | 'Industrial Supplies';

export type BusinessType =
  | 'Manufacturer'
  | 'Wholesaler'
  | 'Retailer'
  | 'Distributor'
  | 'Service Provider';

export type VerificationStatus =
  | 'unverified'
  | 'documents_submitted'
  | 'verification_pending'
  | 'verified';

export interface Product {
  id: string;
  businessId: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
  priceUnit: string; // e.g., 'per meter', 'per piece', 'per 100 boxes', 'per unit'
  moq: number;
  deliveryDays: number;
  inStock: boolean;
  customisationAvailable: boolean;
  warranty?: string;
  specifications: Record<string, string>; // Category-specific: e.g. GSM, Fabric, Ply, Voltage, Finish, Wood Type
  image: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  company?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
}

export type ChoiceLoopReason =
  | 'Better price'
  | 'Better quality'
  | 'Faster delivery'
  | 'Lower MOQ'
  | 'Better ratings or trust'
  | 'Other';

export interface ChoiceLoopStats {
  totalResponses: number;
  reasonsBreakdown: Record<ChoiceLoopReason, number>;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  category: CategoryType;
  businessType: BusinessType;
  location: {
    city: string;
    state: string;
    district?: string;
    pincode: string;
    address: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
    gstin?: string;
    udyamNo?: string;
  };
  establishedYear: number;
  employeeCount: string;
  verificationStatus: VerificationStatus;
  verificationDocs?: {
    type: string;
    docNumber: string;
    submittedAt: string;
  }[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  startingPriceUnit: string;
  minMoq: number;
  averageDeliveryDays: number;
  customisationAvailable: boolean;
  productionCapacity?: string;
  capabilities: string[];
  certifications: string[];
  products: Product[];
  reviews: Review[];
  choiceLoopStats: ChoiceLoopStats;
  isFeatured?: boolean;
  isReported?: boolean;
  reportCount?: number;
}

export interface Quotation {
  businessId: string;
  businessName: string;
  quotedPrice: string;
  deliveryTimeline: string;
  moq: string;
  productDetails: string;
  additionalTerms: string;
  status: 'Sent' | 'Accepted' | 'Declined';
  respondedAt: string;
}

export interface Enquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  businessIds: string[];
  businessNames: string[];
  productOrService: string;
  quantity: number | string;
  budgetRange: string;
  deliveryLocation: string;
  requiredDeliveryDate: string;
  specifications: string;
  status: 'Submitted' | 'Viewed' | 'Quotation received' | 'Completed' | 'Closed';
  createdAt: string;
  quotations: Quotation[];
}

export interface ChoiceLoopRecord {
  id: string;
  businessId: string;
  businessName: string;
  category: CategoryType;
  customerName?: string;
  reason: ChoiceLoopReason;
  feedbackNote?: string;
  timestamp: string;
}

export interface ComparisonItem {
  businessId: string;
  productId?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  location: string;
  businessType: string;
  minPrice: number;
  maxPrice: number;
  maxMoq: number;
  maxDeliveryDays: number;
  verifiedOnly: boolean;
  customisationOnly: boolean;
  accreditationStatus: string; // 'all' | 'verified' | 'documents_submitted' | 'unverified'
  selectedCertifications: string[]; // e.g. ['ISO 9001:2015', 'OEKO-TEX Standard 100', 'FSSAI Central Certified']
  sortBy: 'relevance' | 'rating' | 'price_low' | 'price_high' | 'moq_low' | 'delivery_fast';
}

