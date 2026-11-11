import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storage';
import { Business, Enquiry, ChoiceLoopRecord, Product, UserRole, ChoiceLoopReason, AuthUser } from '../types';

export function useMarketplace() {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [activeSellerBizId, setActiveSellerBizIdState] = useState<string>('biz-1');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [choiceLoopFeedbacks, setChoiceLoopFeedbacks] = useState<ChoiceLoopRecord[]>([]);
  const [authUser, setAuthUserState] = useState<AuthUser | null>(null);

  const loadData = useCallback(() => {
    StorageService.initialize();
    setRoleState(StorageService.getCurrentRole());
    setActiveSellerBizIdState(StorageService.getActiveSellerBizId());
    setBusinesses(StorageService.getBusinesses());
    setSavedIds(StorageService.getSavedBusinessIds());
    setSavedProductIds(StorageService.getSavedProductIds());
    setComparisonIds(StorageService.getComparisonIds());
    setEnquiries(StorageService.getEnquiries());
    setChoiceLoopFeedbacks(StorageService.getChoiceLoopFeedback());
    setAuthUserState(StorageService.getAuthUser());
  }, []);

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('khojsetu_data_updated', handleUpdate);
    return () => {
      window.removeEventListener('khojsetu_data_updated', handleUpdate);
    };
  }, [loadData]);

  const setRole = (newRole: UserRole) => {
    StorageService.setCurrentRole(newRole);
    setRoleState(newRole);
  };

  const setActiveSellerBizId = (id: string) => {
    StorageService.setActiveSellerBizId(id);
    setActiveSellerBizIdState(id);
  };

  const toggleSave = (bizId: string) => {
    return StorageService.toggleSaveBusiness(bizId);
  };

  const isSaved = (bizId: string) => {
    return savedIds.includes(bizId);
  };

  const toggleSaveProduct = (productId: string) => {
    return StorageService.toggleSaveProduct(productId);
  };

  const isProductSaved = (productId: string) => {
    return savedProductIds.includes(productId);
  };

  const setAuthUser = (user: AuthUser | null) => {
    StorageService.setAuthUser(user);
    setAuthUserState(user);
  };

  const loginDemoUser = (userRole: UserRole) => {
    const user = StorageService.loginDemoUser(userRole);
    setAuthUserState(user);
    setRoleState(userRole);
    return user;
  };

  const logout = () => {
    StorageService.setAuthUser(null);
    setAuthUserState(null);
  };

  const addToComparison = (bizId: string): { success: boolean; message?: string } => {
    if (comparisonIds.includes(bizId)) {
      return { success: false, message: 'Already in comparison shortlist' };
    }
    if (comparisonIds.length >= 4) {
      return { success: false, message: 'Maximum 4 businesses can be compared at once' };
    }
    const added = StorageService.addToComparison(bizId);
    return { success: added };
  };

  const removeFromComparison = (bizId: string) => {
    StorageService.removeFromComparison(bizId);
  };

  const clearComparison = () => {
    StorageService.clearComparison();
  };

  const createEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'quotations' | 'status'>) => {
    return StorageService.createEnquiry(enquiryData);
  };

  const submitQuotation = (
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
  ) => {
    StorageService.submitQuotation(enquiryId, businessId, businessName, quotationData);
  };

  const updateEnquiryStatus = (enquiryId: string, status: Enquiry['status']) => {
    StorageService.updateEnquiryStatus(enquiryId, status);
  };

  const submitChoiceLoop = (record: Omit<ChoiceLoopRecord, 'id' | 'timestamp'>) => {
    StorageService.submitChoiceLoopFeedback(record);
  };

  const saveBusiness = (business: Business) => {
    StorageService.saveBusiness(business);
  };

  const updateVerification = (bizId: string, status: Business['verificationStatus']) => {
    StorageService.updateBusinessVerification(bizId, status);
  };

  const toggleReport = (bizId: string) => {
    StorageService.toggleReportBusiness(bizId);
  };

  const addProduct = (businessId: string, product: Product) => {
    StorageService.addProduct(businessId, product);
  };

  const updateProduct = (businessId: string, product: Product) => {
    StorageService.updateProduct(businessId, product);
  };

  const deleteProduct = (businessId: string, productId: string) => {
    StorageService.deleteProduct(businessId, productId);
  };

  const resetDemoData = () => {
    StorageService.resetDemoData();
  };

  const activeSellerBusiness = businesses.find((b) => b.id === activeSellerBizId) || businesses[0];

  return {
    role,
    setRole,
    activeSellerBizId,
    setActiveSellerBizId,
    activeSellerBusiness,
    businesses,
    savedIds,
    savedProductIds,
    comparisonIds,
    enquiries,
    choiceLoopFeedbacks,
    authUser,
    setAuthUser,
    loginDemoUser,
    logout,
    toggleSave,
    isSaved,
    toggleSaveProduct,
    isProductSaved,
    addToComparison,
    removeFromComparison,
    clearComparison,
    createEnquiry,
    submitQuotation,
    updateEnquiryStatus,
    submitChoiceLoop,
    saveBusiness,
    updateVerification,
    toggleReport,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDemoData
  };
}
