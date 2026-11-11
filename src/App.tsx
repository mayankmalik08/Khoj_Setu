import React, { useState, useMemo } from 'react';
import { useMarketplace } from './hooks/useMarketplace';
import { Business, FilterState, UserRole, AuthUser } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/marketplace/HeroSection';
import { CategoryBrowser } from './components/marketplace/CategoryBrowser';
import { SearchFilters } from './components/marketplace/SearchFilters';
import { BusinessCard } from './components/marketplace/BusinessCard';
import { ComparisonTray } from './components/marketplace/ComparisonTray';
import { ComparisonEngineModal } from './components/marketplace/ComparisonEngineModal';
import { BusinessProfileModal } from './components/marketplace/BusinessProfileModal';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { ChoiceLoopModal } from './components/choiceloop/ChoiceLoopModal';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { SellerDashboard } from './components/dashboard/SellerDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AiOnboardingModal } from './components/onboarding/AiOnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { Scale, Sparkles, SlidersHorizontal, ArrowUpDown, UserCheck, LogIn, Heart } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: '',
  location: 'All India',
  businessType: '',
  minPrice: 0,
  maxPrice: 50000,
  maxMoq: 2000,
  maxDeliveryDays: 20,
  verifiedOnly: false,
  customisationOnly: false,
  accreditationStatus: 'all',
  selectedCertifications: [],
  sortBy: 'relevance'
};

export default function App() {
  const {
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
  } = useMarketplace();

  // Navigation & View State
  const [currentView, setCurrentView] = useState<'marketplace' | 'comparison' | 'dashboard' | 'choiceloop_directory'>('marketplace');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  // Modals state
  const [selectedProfileBusiness, setSelectedProfileBusiness] = useState<Business | null>(null);
  const [enquiryTargets, setEnquiryTargets] = useState<Business[] | null>(null);
  const [choiceLoopTarget, setChoiceLoopTarget] = useState<Business | null>(null);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [aiOnboardingOpen, setAiOnboardingOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Handler
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setActiveQuickFilters([]);
  };

  const handleQuickFilterClick = (filterId: string) => {
    const isCurrentlyActive = activeQuickFilters.includes(filterId);
    const updated = isCurrentlyActive
      ? activeQuickFilters.filter((f) => f !== filterId)
      : [...activeQuickFilters, filterId];

    setActiveQuickFilters(updated);

    if (filterId === 'verified_only') {
      setFilters((prev) => ({ ...prev, verifiedOnly: !isCurrentlyActive }));
    } else if (filterId === 'low_moq') {
      setFilters((prev) => ({ ...prev, maxMoq: isCurrentlyActive ? 2000 : 100 }));
    } else if (filterId === 'fast_delivery') {
      setFilters((prev) => ({ ...prev, maxDeliveryDays: isCurrentlyActive ? 20 : 7 }));
    } else if (filterId === 'customisation') {
      setFilters((prev) => ({ ...prev, customisationOnly: !isCurrentlyActive }));
    }
  };

  // Filtered and Sorted Businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      // 1. Keyword search (business name, description, tags, product names, location)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = biz.name.toLowerCase().includes(q);
        const matchesDesc = biz.description.toLowerCase().includes(q) || biz.tagline.toLowerCase().includes(q);
        const matchesLocation = biz.location.city.toLowerCase().includes(q) || biz.location.state.toLowerCase().includes(q);
        const matchesCategory = biz.category.toLowerCase().includes(q);
        const matchesProducts = biz.products.some(
          (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
        );
        if (!matchesName && !matchesDesc && !matchesLocation && !matchesCategory && !matchesProducts) {
          return false;
        }
      }

      // 2. Category
      if (filters.category && biz.category !== filters.category) {
        return false;
      }

      // 3. Location
      if (filters.location && filters.location !== 'All India') {
        const cleanLoc = filters.location.split('(')[0].trim().toLowerCase();
        const bizLoc = `${biz.location.city} ${biz.location.state}`.toLowerCase();
        if (!bizLoc.includes(cleanLoc) && !cleanLoc.includes(biz.location.city.toLowerCase())) {
          return false;
        }
      }

      // 4. Business Type
      if (filters.businessType && biz.businessType !== filters.businessType) {
        return false;
      }

      // 5. Max MOQ
      if (filters.maxMoq < 2000 && biz.minMoq > filters.maxMoq) {
        return false;
      }

      // 6. Max Delivery Days
      if (filters.maxDeliveryDays < 20 && biz.averageDeliveryDays > filters.maxDeliveryDays) {
        return false;
      }

      // 7. Verified Only toggle
      if (filters.verifiedOnly && biz.verificationStatus !== 'verified') {
        return false;
      }

      // 8. Customisation Only
      if (filters.customisationOnly && !biz.customisationAvailable) {
        return false;
      }

      // 9. NEW: Accreditation Status filter
      if (filters.accreditationStatus && filters.accreditationStatus !== 'all') {
        if (filters.accreditationStatus === 'verified' && biz.verificationStatus !== 'verified') {
          return false;
        }
        if (
          filters.accreditationStatus === 'documents_submitted' &&
          biz.verificationStatus !== 'documents_submitted' &&
          biz.verificationStatus !== 'verification_pending'
        ) {
          return false;
        }
        if (filters.accreditationStatus === 'unverified' && biz.verificationStatus !== 'unverified') {
          return false;
        }
      }

      // 10. NEW: Product & Factory Certifications
      if (filters.selectedCertifications && filters.selectedCertifications.length > 0) {
        const hasMatchingCert = filters.selectedCertifications.some((cert) =>
          biz.certifications.some((c) => c.toLowerCase().includes(cert.toLowerCase()))
        );
        if (!hasMatchingCert) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'price_low') return a.startingPrice - b.startingPrice;
      if (filters.sortBy === 'price_high') return b.startingPrice - a.startingPrice;
      if (filters.sortBy === 'moq_low') return a.minMoq - b.minMoq;
      if (filters.sortBy === 'delivery_fast') return a.averageDeliveryDays - b.averageDeliveryDays;
      // Default: featured first, then review count
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.reviewCount - a.reviewCount;
    });
  }, [businesses, filters]);

  // Actions
  const handleAddToComparison = (bizId: string) => {
    const res = addToComparison(bizId);
    if (res.success) {
      showToast('Supplier added to comparison shortlist tray');
    } else if (res.message) {
      showToast(res.message);
    }
  };

  const handleOpenEnquirySingle = (biz: Business) => {
    setEnquiryTargets([biz]);
  };

  const handleOpenEnquiryMulti = (targets: Business[]) => {
    setEnquiryTargets(targets);
  };

  const handleAuthSuccess = (user: AuthUser, selectedRole: UserRole) => {
    setAuthUser(user);
    setRole(selectedRole);
    showToast(`Signed in as ${user.name} (${selectedRole === 'customer' ? 'Customer' : 'Seller'})`);
    if (selectedRole === 'seller') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('marketplace');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#101B2D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-6 z-50 bg-[#101B2D] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 animate-in slide-in-from-top-3 duration-200 flex items-center gap-2">
          <Sparkles size={14} className="text-[#19B6A4]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentRole={role}
        onRoleChange={setRole}
        selectedLocation={filters.location}
        onLocationChange={(loc) => handleFilterChange('location', loc)}
        comparisonCount={comparisonIds.length}
        savedCount={savedIds.length + savedProductIds.length}
        onOpenComparison={() => setComparisonModalOpen(true)}
        onOpenSaved={() => {
          setRole('customer');
          setCurrentView('dashboard');
        }}
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'comparison') {
            setComparisonModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        onResetDemo={() => {
          resetDemoData();
          showToast('Demo data successfully restored to default state');
        }}
        onOpenAiOnboarding={() => setAiOnboardingOpen(true)}
      />

      {/* User Auth Banner Strip */}
      <div className="bg-slate-100 border-b border-slate-200/80 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck size={13} className="text-[#19B6A4]" />
            <span className="text-slate-600">
              Active Session:{' '}
              <strong className="text-slate-800">
                {authUser?.name || 'Guest Explorer'}
              </strong>{' '}
              ({authUser?.companyName || 'Demo Enterprise'})
            </span>
          </div>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="text-[11px] font-bold text-[#19B6A4] hover:text-[#149586] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <LogIn size={12} />
            <span>{authUser ? 'Switch Account / Role' : 'Sign In / Register'}</span>
          </button>
        </div>
      </div>

      {/* Main Body Routing */}
      <main className="flex-1">
        {/* VIEW 1: CUSTOMER MARKETPLACE */}
        {currentView === 'marketplace' && role === 'customer' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={filters.searchQuery}
              onSearchChange={(q) => handleFilterChange('searchQuery', q)}
              selectedCategory={filters.category}
              onCategoryChange={(c) => handleFilterChange('category', c)}
              selectedLocation={filters.location}
              onLocationChange={(l) => handleFilterChange('location', l)}
              businessType={filters.businessType}
              onBusinessTypeChange={(t) => handleFilterChange('businessType', t)}
              onQuickFilterClick={handleQuickFilterClick}
              activeQuickFilters={activeQuickFilters}
            />

            {/* Category Browser */}
            <CategoryBrowser
              selectedCategory={filters.category}
              onSelectCategory={(c) => handleFilterChange('category', c)}
            />

            {/* Search Results & Filter Ecosystem */}
            <section id="results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#101B2D] font-display">
                    {filters.category ? `${filters.category} Suppliers` : 'Discover Vetted Suppliers & Mills'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {filteredBusinesses.length} suppliers match your exact procurement criteria
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="text-xs text-slate-500 hidden sm:inline">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 cursor-pointer focus:outline-none"
                  >
                    <option value="relevance">Relevance & Match</option>
                    <option value="rating">Highest Rating</option>
                    <option value="price_low">Starting Price: Low to High</option>
                    <option value="price_high">Starting Price: High to Low</option>
                    <option value="moq_low">Lowest MOQ First</option>
                    <option value="delivery_fast">Fastest Delivery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Filter Sidebar */}
                <div className="lg:col-span-3 lg:sticky lg:top-20">
                  <SearchFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                    totalResults={filteredBusinesses.length}
                  />
                </div>

                {/* Right Results Grid */}
                <div className="lg:col-span-9">
                  {filteredBusinesses.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                        <SlidersHorizontal size={24} />
                      </div>
                      <h3 className="font-bold text-base text-slate-800">
                        No Suppliers Match Your Specific Filter Criteria
                      </h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Try loosening your MOQ slider, clearing specific certification filters, or selecting "All India" location.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 rounded-xl bg-[#19B6A4] text-white text-xs font-bold cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredBusinesses.map((biz) => (
                        <BusinessCard
                          key={biz.id}
                          business={biz}
                          onViewProfile={(b) => setSelectedProfileBusiness(b)}
                          onAddToComparison={handleAddToComparison}
                          isCompared={comparisonIds.includes(biz.id)}
                          onSendEnquiry={handleOpenEnquirySingle}
                          onToggleSave={(id) => {
                            const nowSaved = toggleSave(id);
                            showToast(nowSaved ? 'Supplier saved to shortlist' : 'Supplier removed from shortlist');
                          }}
                          isSaved={isSaved(biz.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: CUSTOMER DASHBOARD */}
        {(currentView === 'dashboard' && role === 'customer') && (
          <CustomerDashboard
            businesses={businesses}
            enquiries={enquiries}
            savedBusinessIds={savedIds}
            savedProductIds={savedProductIds}
            choiceLoopFeedbacks={choiceLoopFeedbacks}
            onViewBusinessProfile={(biz) => setSelectedProfileBusiness(biz)}
            onOpenComparison={() => setComparisonModalOpen(true)}
            onRemoveSaved={(bizId) => {
              toggleSave(bizId);
              showToast('Removed from saved shortlist');
            }}
            onRemoveSavedProduct={(productId) => {
              toggleSaveProduct(productId);
              showToast('Product removed from saved items');
            }}
            onSendEnquiry={handleOpenEnquirySingle}
            onSwitchToSellerMode={() => setRole('seller')}
          />
        )}

        {/* VIEW 3: SELLER DASHBOARD (STOREFRONT OWNER) */}
        {role === 'seller' && (
          <SellerDashboard
            businesses={businesses}
            activeBusiness={activeSellerBusiness}
            onSelectActiveBusiness={setActiveSellerBizId}
            enquiries={enquiries}
            onAddProduct={(bizId, prod) => {
              addProduct(bizId, prod);
              showToast('Product SKU successfully published to marketplace');
            }}
            onUpdateProduct={(bizId, prod) => {
              updateProduct(bizId, prod);
              showToast('Product SKU updated');
            }}
            onDeleteProduct={(bizId, prodId) => {
              deleteProduct(bizId, prodId);
              showToast('Product SKU removed');
            }}
            onSubmitQuotation={(enqId, bId, bName, data) => {
              submitQuotation(enqId, bId, bName, data);
              showToast('Formal commercial quotation dispatched to buyer!');
            }}
            onUpdateBusiness={saveBusiness}
            onOpenAiOnboarding={() => setAiOnboardingOpen(true)}
          />
        )}

        {/* VIEW 4: ADMIN DASHBOARD */}
        {role === 'admin' && (
          <AdminDashboard
            businesses={businesses}
            enquiries={enquiries}
            onUpdateVerification={(bizId, status) => {
              updateVerification(bizId, status);
              showToast(`Supplier verification status updated to: ${status}`);
            }}
            onToggleReport={(bizId) => {
              toggleReport(bizId);
              showToast('Report status updated');
            }}
            onResetDemoData={() => {
              resetDemoData();
              showToast('All demo listings and records reset');
            }}
            onViewBusinessProfile={(biz) => setSelectedProfileBusiness(biz)}
          />
        )}
      </main>

      {/* Floating Bottom Comparison Tray for Customers */}
      {role === 'customer' && (
        <ComparisonTray
          comparisonIds={comparisonIds}
          businesses={businesses}
          onRemove={removeFromComparison}
          onClear={clearComparison}
          onOpenComparison={() => setComparisonModalOpen(true)}
        />
      )}

      {/* MODAL 1: COMPARISON ENGINE */}
      {comparisonModalOpen && (
        <ComparisonEngineModal
          comparisonIds={comparisonIds}
          businesses={businesses}
          onClose={() => setComparisonModalOpen(false)}
          onRemove={removeFromComparison}
          onAdd={handleAddToComparison}
          onClear={clearComparison}
          onSendEnquiry={(targets) => {
            const list = Array.isArray(targets) ? targets : [targets];
            handleOpenEnquiryMulti(list);
          }}
          onViewProfile={(biz) => {
            setComparisonModalOpen(false);
            setSelectedProfileBusiness(biz);
          }}
        />
      )}

      {/* MODAL 2: BUSINESS STOREFRONT PROFILE */}
      {selectedProfileBusiness && (
        <BusinessProfileModal
          business={selectedProfileBusiness}
          onClose={() => setSelectedProfileBusiness(null)}
          onAddToComparison={handleAddToComparison}
          isCompared={comparisonIds.includes(selectedProfileBusiness.id)}
          onToggleSave={(id) => {
            const nowSaved = toggleSave(id);
            showToast(nowSaved ? 'Supplier saved to shortlist' : 'Supplier removed from shortlist');
          }}
          isSaved={isSaved(selectedProfileBusiness.id)}
          onToggleSaveProduct={(prodId) => {
            const nowSaved = toggleSaveProduct(prodId);
            showToast(nowSaved ? 'Product saved to personal list' : 'Product removed from saved list');
          }}
          isProductSaved={isProductSaved}
          onSendEnquiry={handleOpenEnquirySingle}
          onSelectAsPartner={(b) => setChoiceLoopTarget(b)}
        />
      )}

      {/* MODAL 3: DIRECT ENQUIRY & RFQ */}
      {enquiryTargets && enquiryTargets.length > 0 && (
        <EnquiryModal
          targets={enquiryTargets}
          onClose={() => setEnquiryTargets(null)}
          onSubmitEnquiry={(data) => {
            const newEnq = createEnquiry(data);
            showToast(`RFQ dispatched with ID #${newEnq.id}`);
            return newEnq;
          }}
          onViewCustomerDashboard={() => {
            setRole('customer');
            setCurrentView('dashboard');
          }}
        />
      )}

      {/* MODAL 4: CHOICELOOP SURVEY */}
      {choiceLoopTarget && (
        <ChoiceLoopModal
          business={choiceLoopTarget}
          onClose={() => setChoiceLoopTarget(null)}
          onSubmitFeedback={(data) => {
            submitChoiceLoop(data);
            showToast('ChoiceLoop feedback recorded into supplier insights');
          }}
        />
      )}

      {/* MODAL 5: AI-ASSISTED ONBOARDING */}
      {aiOnboardingOpen && (
        <AiOnboardingModal
          isOpen={aiOnboardingOpen}
          onClose={() => setAiOnboardingOpen(false)}
          onPublishStorefront={(newBiz) => {
            saveBusiness(newBiz);
            setActiveSellerBizId(newBiz.id);
            setRole('seller');
            setCurrentView('dashboard');
            showToast(`${newBiz.name} successfully published to KhojSetu marketplace!`);
          }}
        />
      )}

      {/* MODAL 6: AUTHENTICATION & ROLE SELECTION */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={authUser}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* Footer */}
      <Footer
        onCategoryClick={(cat) => {
          handleFilterChange('category', cat);
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }}
        onOpenAiOnboarding={() => setAiOnboardingOpen(true)}
      />
    </div>
  );
}
