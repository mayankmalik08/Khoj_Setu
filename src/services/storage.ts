import { Business, Enquiry, ChoiceLoopRecord, Product, UserRole, ChoiceLoopReason, AuthUser } from '../types';
import { INITIAL_BUSINESSES, INITIAL_ENQUIRIES, INITIAL_CHOICELOOP_FEEDBACK } from '../data/mockData';

const DEFAULT_AUTH_USER: AuthUser = {
  id: 'usr-1',
  name: 'Arjun Singhania',
  email: 'arjun@singhaniatraders.in',
  role: 'customer',
  companyName: 'Singhania Trading & Retails Pvt Ltd',
  phone: '+91 98712 34567'
};

const STORAGE_KEYS = {
  BUSINESSES: 'khojsetu_businesses_v2',
  ENQUIRIES: 'khojsetu_enquiries_v2',
  CHOICELOOP: 'khojsetu_choiceloop_v2',
  SAVED_BUSINESSES: 'khojsetu_saved_v2',
  SAVED_PRODUCTS: 'khojsetu_saved_products_v2',
  AUTH_USER: 'khojsetu_auth_user_v2',
  COMPARISON_IDS: 'khojsetu_comparison_v2',
  CURRENT_ROLE: 'khojsetu_role_v2',
  ACTIVE_SELLER_BIZ_ID: 'khojsetu_seller_biz_v2'
};

const notifyChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('khojsetu_data_updated'));
  }
};

// Safe storage retrieval
function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyChange();
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const StorageService = {
  // Initialize default data if absent
  initialize(): void {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(INITIAL_BUSINESSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHOICELOOP)) {
      localStorage.setItem(STORAGE_KEYS.CHOICELOOP, JSON.stringify(INITIAL_CHOICELOOP_FEEDBACK));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_BUSINESSES)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_BUSINESSES, JSON.stringify(['biz-1', 'biz-4']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(['prod-101', 'prod-401']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUTH_USER)) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(DEFAULT_AUTH_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPARISON_IDS)) {
      localStorage.setItem(STORAGE_KEYS.COMPARISON_IDS, JSON.stringify(['biz-1', 'biz-5']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, JSON.stringify('customer'));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_SELLER_BIZ_ID)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SELLER_BIZ_ID, JSON.stringify('biz-1'));
    }
  },

  resetDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(INITIAL_BUSINESSES));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.CHOICELOOP, JSON.stringify(INITIAL_CHOICELOOP_FEEDBACK));
    localStorage.setItem(STORAGE_KEYS.SAVED_BUSINESSES, JSON.stringify(['biz-1', 'biz-4']));
    localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(['prod-101', 'prod-401']));
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(DEFAULT_AUTH_USER));
    localStorage.setItem(STORAGE_KEYS.COMPARISON_IDS, JSON.stringify(['biz-1', 'biz-5']));
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, JSON.stringify('customer'));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SELLER_BIZ_ID, JSON.stringify('biz-1'));
    notifyChange();
  },

  // Role management
  getCurrentRole(): UserRole {
    return getStorageItem<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'customer');
  },

  setCurrentRole(role: UserRole): void {
    setStorageItem(STORAGE_KEYS.CURRENT_ROLE, role);
  },

  getActiveSellerBizId(): string {
    return getStorageItem<string>(STORAGE_KEYS.ACTIVE_SELLER_BIZ_ID, 'biz-1');
  },

  setActiveSellerBizId(bizId: string): void {
    setStorageItem(STORAGE_KEYS.ACTIVE_SELLER_BIZ_ID, bizId);
  },

  // Businesses
  getBusinesses(): Business[] {
    return getStorageItem<Business[]>(STORAGE_KEYS.BUSINESSES, INITIAL_BUSINESSES);
  },

  getBusinessById(id: string): Business | undefined {
    const list = this.getBusinesses();
    return list.find((b) => b.id === id);
  },

  saveBusiness(business: Business): void {
    const list = this.getBusinesses();
    const index = list.findIndex((b) => b.id === business.id);
    if (index >= 0) {
      list[index] = business;
    } else {
      list.unshift(business);
    }
    setStorageItem(STORAGE_KEYS.BUSINESSES, list);
  },

  updateBusinessVerification(bizId: string, status: Business['verificationStatus']): void {
    const list = this.getBusinesses();
    const target = list.find((b) => b.id === bizId);
    if (target) {
      target.verificationStatus = status;
      setStorageItem(STORAGE_KEYS.BUSINESSES, list);
    }
  },

  toggleReportBusiness(bizId: string): void {
    const list = this.getBusinesses();
    const target = list.find((b) => b.id === bizId);
    if (target) {
      target.isReported = !target.isReported;
      target.reportCount = (target.reportCount || 0) + (target.isReported ? 1 : -1);
      setStorageItem(STORAGE_KEYS.BUSINESSES, list);
    }
  },

  // Product Operations
  addProduct(businessId: string, product: Product): void {
    const list = this.getBusinesses();
    const biz = list.find((b) => b.id === businessId);
    if (biz) {
      biz.products.push(product);
      setStorageItem(STORAGE_KEYS.BUSINESSES, list);
    }
  },

  updateProduct(businessId: string, product: Product): void {
    const list = this.getBusinesses();
    const biz = list.find((b) => b.id === businessId);
    if (biz) {
      const pIndex = biz.products.findIndex((p) => p.id === product.id);
      if (pIndex >= 0) {
        biz.products[pIndex] = product;
        setStorageItem(STORAGE_KEYS.BUSINESSES, list);
      }
    }
  },

  deleteProduct(businessId: string, productId: string): void {
    const list = this.getBusinesses();
    const biz = list.find((b) => b.id === businessId);
    if (biz) {
      biz.products = biz.products.filter((p) => p.id !== productId);
      setStorageItem(STORAGE_KEYS.BUSINESSES, list);
    }
  },

  // Comparison
  getComparisonIds(): string[] {
    return getStorageItem<string[]>(STORAGE_KEYS.COMPARISON_IDS, []);
  },

  addToComparison(businessId: string): boolean {
    const current = this.getComparisonIds();
    if (current.includes(businessId)) return false;
    if (current.length >= 4) return false; // Maximum 4 for clean side-by-side
    const updated = [...current, businessId];
    setStorageItem(STORAGE_KEYS.COMPARISON_IDS, updated);
    return true;
  },

  removeFromComparison(businessId: string): void {
    const current = this.getComparisonIds();
    const updated = current.filter((id) => id !== businessId);
    setStorageItem(STORAGE_KEYS.COMPARISON_IDS, updated);
  },

  clearComparison(): void {
    setStorageItem(STORAGE_KEYS.COMPARISON_IDS, []);
  },

  // Shortlist / Saved Businesses
  getSavedBusinessIds(): string[] {
    return getStorageItem<string[]>(STORAGE_KEYS.SAVED_BUSINESSES, []);
  },

  toggleSaveBusiness(businessId: string): boolean {
    const current = this.getSavedBusinessIds();
    const exists = current.includes(businessId);
    const updated = exists ? current.filter((id) => id !== businessId) : [...current, businessId];
    setStorageItem(STORAGE_KEYS.SAVED_BUSINESSES, updated);
    return !exists;
  },

  isSaved(businessId: string): boolean {
    const current = this.getSavedBusinessIds();
    return current.includes(businessId);
  },

  // Saved Products
  getSavedProductIds(): string[] {
    return getStorageItem<string[]>(STORAGE_KEYS.SAVED_PRODUCTS, ['prod-101', 'prod-401']);
  },

  toggleSaveProduct(productId: string): boolean {
    const current = this.getSavedProductIds();
    const exists = current.includes(productId);
    const updated = exists ? current.filter((id) => id !== productId) : [...current, productId];
    setStorageItem(STORAGE_KEYS.SAVED_PRODUCTS, updated);
    return !exists;
  },

  isProductSaved(productId: string): boolean {
    const current = this.getSavedProductIds();
    return current.includes(productId);
  },

  // Authentication
  getAuthUser(): AuthUser | null {
    return getStorageItem<AuthUser | null>(STORAGE_KEYS.AUTH_USER, DEFAULT_AUTH_USER);
  },

  setAuthUser(user: AuthUser | null): void {
    setStorageItem(STORAGE_KEYS.AUTH_USER, user);
    if (user) {
      this.setCurrentRole(user.role);
    }
  },

  loginDemoUser(role: UserRole): AuthUser {
    let demoUser: AuthUser;
    if (role === 'seller') {
      demoUser = {
        id: 'usr-seller',
        name: 'Ramesh Sharma',
        email: 'ramesh@balajitexsonipat.in',
        role: 'seller',
        companyName: 'Shree Balaji Textiles (Sonipat)',
        phone: '+91 98120 44812'
      };
    } else if (role === 'admin') {
      demoUser = {
        id: 'usr-admin',
        name: 'Virendra Singh',
        email: 'admin@khojsetu.in',
        role: 'admin',
        companyName: 'KhojSetu Platform Compliance Unit'
      };
    } else {
      demoUser = {
        id: 'usr-cust',
        name: 'Arjun Singhania',
        email: 'arjun@singhaniatraders.in',
        role: 'customer',
        companyName: 'Singhania Trading & Retails Pvt Ltd',
        phone: '+91 98712 34567'
      };
    }
    this.setAuthUser(demoUser);
    return demoUser;
  },

  // Enquiries
  getEnquiries(): Enquiry[] {
    return getStorageItem<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  },

  createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'quotations' | 'status'>): Enquiry {
    const list = this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      quotations: []
    };
    list.unshift(newEnquiry);
    setStorageItem(STORAGE_KEYS.ENQUIRIES, list);
    return newEnquiry;
  },

  updateEnquiryStatus(enquiryId: string, status: Enquiry['status']): void {
    const list = this.getEnquiries();
    const target = list.find((e) => e.id === enquiryId);
    if (target) {
      target.status = status;
      setStorageItem(STORAGE_KEYS.ENQUIRIES, list);
    }
  },

  submitQuotation(
    enquiryId: string,
    businessId: string,
    businessName: string,
    quotationData: {
      quotedPrice: string;
      deliveryTimeline: string;
      moq: string;
      productDetails: string;
      additionalTerms: string;
    }
  ): void {
    const list = this.getEnquiries();
    const enquiry = list.find((e) => e.id === enquiryId);
    if (enquiry) {
      const existingQuotIndex = enquiry.quotations.findIndex((q) => q.businessId === businessId);
      const newQuote = {
        businessId,
        businessName,
        quotedPrice: quotationData.quotedPrice,
        deliveryTimeline: quotationData.deliveryTimeline,
        moq: quotationData.moq,
        productDetails: quotationData.productDetails,
        additionalTerms: quotationData.additionalTerms,
        status: 'Sent' as const,
        respondedAt: new Date().toISOString()
      };

      if (existingQuotIndex >= 0) {
        enquiry.quotations[existingQuotIndex] = newQuote;
      } else {
        enquiry.quotations.push(newQuote);
      }
      enquiry.status = 'Quotation received';
      setStorageItem(STORAGE_KEYS.ENQUIRIES, list);
    }
  },

  // ChoiceLoop
  getChoiceLoopFeedback(): ChoiceLoopRecord[] {
    return getStorageItem<ChoiceLoopRecord[]>(STORAGE_KEYS.CHOICELOOP, INITIAL_CHOICELOOP_FEEDBACK);
  },

  submitChoiceLoopFeedback(record: Omit<ChoiceLoopRecord, 'id' | 'timestamp'>): void {
    const list = this.getChoiceLoopFeedback();
    const newRecord: ChoiceLoopRecord = {
      ...record,
      id: `cl-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    list.unshift(newRecord);
    setStorageItem(STORAGE_KEYS.CHOICELOOP, list);

    // Also increment aggregated breakdown on the business object
    const businesses = this.getBusinesses();
    const biz = businesses.find((b) => b.id === record.businessId);
    if (biz) {
      if (!biz.choiceLoopStats) {
        biz.choiceLoopStats = {
          totalResponses: 0,
          reasonsBreakdown: {
            'Better price': 0,
            'Better quality': 0,
            'Faster delivery': 0,
            'Lower MOQ': 0,
            'Better ratings or trust': 0,
            'Other': 0
          }
        };
      }
      biz.choiceLoopStats.totalResponses += 1;
      biz.choiceLoopStats.reasonsBreakdown[record.reason] =
        (biz.choiceLoopStats.reasonsBreakdown[record.reason] || 0) + 1;
      setStorageItem(STORAGE_KEYS.BUSINESSES, businesses);
    }
  }
};
