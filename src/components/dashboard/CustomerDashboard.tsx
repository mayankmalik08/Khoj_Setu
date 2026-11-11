import React, { useState } from 'react';
import { Business, Enquiry, ChoiceLoopRecord, Product } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  User,
  Heart,
  Scale,
  Send,
  FileCheck2,
  Clock,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Calendar,
  ChevronRight,
  ExternalLink,
  DollarSign,
  AlertCircle,
  Building,
  RotateCcw,
  Package,
  Trash2
} from 'lucide-react';

interface CustomerDashboardProps {
  businesses: Business[];
  enquiries: Enquiry[];
  savedBusinessIds: string[];
  savedProductIds: string[];
  choiceLoopFeedbacks: ChoiceLoopRecord[];
  onViewBusinessProfile: (biz: Business) => void;
  onOpenComparison: () => void;
  onRemoveSaved: (bizId: string) => void;
  onRemoveSavedProduct: (productId: string) => void;
  onSendEnquiry: (biz: Business) => void;
  onSwitchToSellerMode: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  businesses,
  enquiries,
  savedBusinessIds,
  savedProductIds,
  choiceLoopFeedbacks,
  onViewBusinessProfile,
  onOpenComparison,
  onRemoveSaved,
  onRemoveSavedProduct,
  onSendEnquiry,
  onSwitchToSellerMode
}) => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'shortlist' | 'choiceloop' | 'profile'>('enquiries');
  const [savedSubTab, setSavedSubTab] = useState<'businesses' | 'products'>('businesses');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(
    enquiries[0] || null
  );

  const savedBusinesses = savedBusinessIds
    .map((id) => businesses.find((b) => b.id === id))
    .filter(Boolean) as Business[];

  // Retrieve all saved products across all businesses
  const savedProductsWithBiz = React.useMemo(() => {
    const list: { product: Product; business: Business }[] = [];
    businesses.forEach((biz) => {
      biz.products.forEach((prod) => {
        if (savedProductIds.includes(prod.id)) {
          list.push({ product: prod, business: biz });
        }
      });
    });
    return list;
  }, [businesses, savedProductIds]);

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
            <Clock size={12} />
            <span>Submitted</span>
          </span>
        );
      case 'Viewed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <Clock size={12} />
            <span>Viewed by Seller</span>
          </span>
        );
      case 'Quotation received':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Quotation Received</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#101B2D] to-[#19B6A4] flex items-center justify-center text-white text-xl font-bold font-display shadow-md shadow-[#19B6A4]/20 shrink-0">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#101B2D] font-display">
                Arjun Singhania
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-[#19B6A4] border border-[#19B6A4]/30">
                Buyer / Procurement
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Singhania Trading & Retails • Delhi NCR Cluster • Member since Oct 2024
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[90px]">
            <span className="block text-lg font-extrabold text-[#101B2D]">{enquiries.length}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Enquiries</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[90px]">
            <span className="block text-lg font-extrabold text-[#19B6A4]">
              {savedBusinesses.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Shortlisted</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 min-w-[90px]">
            <span className="block text-lg font-extrabold text-[#F59E0B]">
              {choiceLoopFeedbacks.length}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400">ChoiceLoops</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold text-slate-600 overflow-x-auto pb-0.5">
        {[
          { id: 'enquiries', label: `My Enquiries & RFQs (${enquiries.length})` },
          { id: 'shortlist', label: `Saved Items (${savedBusinesses.length + savedProductsWithBiz.length})` },
          { id: 'choiceloop', label: `ChoiceLoop™ History (${choiceLoopFeedbacks.length})` },
          { id: 'profile', label: 'Procurement Preferences' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`pb-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#19B6A4] text-[#19B6A4] font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ENQUIRIES & QUOTATIONS */}
      {activeTab === 'enquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Enquiries List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Submitted Quotation Requests
            </h3>

            {enquiries.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                You have not submitted any enquiries yet. Browse the marketplace to send direct RFQs to suppliers.
              </div>
            ) : (
              enquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                const hasQuote = enq.quotations && enq.quotations.length > 0;
                return (
                  <div
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'border-[#19B6A4] bg-teal-50/50 shadow-xs ring-1 ring-[#19B6A4]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">#{enq.id}</span>
                      {getStatusBadge(enq.status)}
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-[#101B2D] leading-snug">
                        {enq.productOrService}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Target Suppliers: <span className="font-semibold text-slate-700">{enq.businessNames.join(', ')}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Qty: <strong className="text-slate-800">{enq.quantity}</strong></span>
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>

                    {hasQuote && (
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold flex items-center justify-between">
                        <span>Commercial Quote Available</span>
                        <ChevronRight size={13} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Enquiry Detail & Formal Quotation Response */}
          <div className="lg:col-span-7">
            {selectedEnquiry ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#101B2D]">
                        {selectedEnquiry.productOrService}
                      </h2>
                      <span className="text-xs text-slate-400">#{selectedEnquiry.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Quantity
                    </span>
                    <span className="font-bold text-slate-800">{selectedEnquiry.quantity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Target Budget
                    </span>
                    <span className="font-bold text-slate-800">{selectedEnquiry.budgetRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Delivery Target
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedEnquiry.requiredDeliveryDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Destination
                    </span>
                    <span className="font-bold text-slate-800 truncate block">
                      {selectedEnquiry.deliveryLocation}
                    </span>
                  </div>
                </div>

                {/* Stated Specifications */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Customer Technical Specifications
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    {selectedEnquiry.specifications}
                  </div>
                </div>

                {/* Quotations Received Section */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <FileCheck2 size={16} className="text-[#19B6A4]" />
                      Formal Supplier Quotations ({selectedEnquiry.quotations?.length || 0})
                    </h4>
                  </div>

                  {!selectedEnquiry.quotations || selectedEnquiry.quotations.length === 0 ? (
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
                      <Clock size={24} className="text-amber-600 mx-auto" />
                      <p className="text-xs font-bold text-amber-900">
                        Awaiting Quotation from Supplier
                      </p>
                      <p className="text-[11px] text-amber-700 max-w-sm mx-auto leading-relaxed">
                        The vendor has received your enquiry notification. In this interactive demo, you can test the seller side response right now!
                      </p>
                      <button
                        onClick={onSwitchToSellerMode}
                        className="mt-2 px-3.5 py-1.5 rounded-lg bg-[#101B2D] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Switch to Seller Console to Submit Quote</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  ) : (
                    /* Display received formal quotation */
                    selectedEnquiry.quotations.map((quote, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/60 border border-emerald-200 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                              Official Supplier Quote
                            </span>
                            <h4 className="font-extrabold text-sm text-[#101B2D]">
                              {quote.businessName}
                            </h4>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                            Status: {quote.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-emerald-100">
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                              Quoted Price
                            </span>
                            <span className="font-extrabold text-sm text-[#101B2D]">
                              {quote.quotedPrice}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                              Delivery Timeline
                            </span>
                            <span className="font-bold text-slate-800">
                              {quote.deliveryTimeline}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                              Agreed MOQ
                            </span>
                            <span className="font-bold text-slate-800">{quote.moq}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-700 block mb-0.5">
                              Supplier Product & Batch Details:
                            </span>
                            <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-emerald-100">
                              {quote.productDetails}
                            </p>
                          </div>

                          {quote.additionalTerms && (
                            <div>
                              <span className="font-bold text-slate-700 block mb-0.5">
                                Commercial Terms & Payment Milestones:
                              </span>
                              <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-emerald-100">
                                {quote.additionalTerms}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                          <span>Responded: {new Date(quote.respondedAt).toLocaleString()}</span>
                          <span className="text-emerald-700 font-bold">
                            Direct negotiation enabled
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-400">
                Select an enquiry from the list to view specifications and vendor quotations.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED ITEMS (BUSINESSES & PRODUCTS) */}
      {activeTab === 'shortlist' && (
        <div className="space-y-6">
          {/* Sub-Tabs Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSavedSubTab('businesses')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  savedSubTab === 'businesses'
                    ? 'bg-[#101B2D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building size={14} />
                <span>Saved Businesses ({savedBusinesses.length})</span>
              </button>

              <button
                onClick={() => setSavedSubTab('products')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  savedSubTab === 'products'
                    ? 'bg-[#101B2D] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Package size={14} />
                <span>Saved Products ({savedProductsWithBiz.length})</span>
              </button>
            </div>

            {savedBusinesses.length > 1 && savedSubTab === 'businesses' && (
              <button
                onClick={onOpenComparison}
                className="text-xs font-bold text-[#19B6A4] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Scale size={14} />
                <span>Compare Shortlisted Suppliers ({savedBusinesses.length})</span>
              </button>
            )}
          </div>

          {/* SUB-SECTION 1: SAVED BUSINESSES */}
          {savedSubTab === 'businesses' && (
            <div>
              {savedBusinesses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-2">
                  <Heart size={28} className="mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700 text-sm">No Suppliers Shortlisted Yet</p>
                  <p className="text-slate-400">
                    Click the heart icon on any supplier card in the marketplace to save them here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedBusinesses.map((biz) => (
                    <div
                      key={biz.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-slate-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {biz.category}
                          </span>
                          <button
                            onClick={() => onRemoveSaved(biz.id)}
                            className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={biz.logo}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-[#101B2D] leading-snug">{biz.name}</h4>
                            <p className="text-xs text-slate-500">
                              {biz.location.city}, {biz.location.state}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-slate-50 rounded-xl text-center text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Min MOQ</span>
                            <span className="font-bold text-slate-800">{biz.minMoq} units</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Lead Time</span>
                            <span className="font-bold text-slate-800">~{biz.averageDeliveryDays}d</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex gap-2">
                        <button
                          onClick={() => onViewBusinessProfile(biz)}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer text-center"
                        >
                          View Storefront
                        </button>
                        <button
                          onClick={() => onSendEnquiry(biz)}
                          className="px-3 py-2 rounded-xl bg-[#101B2D] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                          title="Send RFQ"
                        >
                          <Send size={12} className="text-[#19B6A4]" />
                          <span>Enquire</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SUB-SECTION 2: SAVED PRODUCTS */}
          {savedSubTab === 'products' && (
            <div>
              {savedProductsWithBiz.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-2">
                  <Package size={28} className="mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700 text-sm">No Specific Products Saved Yet</p>
                  <p className="text-slate-400">
                    Bookmark products in supplier storefronts to create your tailored procurement list.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProductsWithBiz.map(({ product, business }) => (
                    <div
                      key={product.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {product.category}
                          </span>
                          <button
                            onClick={() => onRemoveSavedProduct(product.id)}
                            className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <img
                            src={product.image}
                            alt=""
                            className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-[#101B2D] leading-snug truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[#19B6A4] font-semibold mt-0.5 truncate">
                              {business.name}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {business.location.city}, {business.location.state}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 mt-3 p-2 bg-slate-50 rounded-xl text-center text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Price</span>
                            <span className="font-bold text-[#101B2D]">
                              ₹{product.price}
                            </span>
                            <span className="text-[9px] text-slate-500 block truncate">
                              {product.priceUnit}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">MOQ</span>
                            <span className="font-bold text-slate-800">{product.moq}</span>
                            <span className="text-[9px] text-slate-500 block">units</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Lead Time</span>
                            <span className="font-bold text-slate-800">~{product.deliveryDays}d</span>
                            <span className="text-[9px] text-slate-500 block">dispatch</span>
                          </div>
                        </div>

                        {/* Top Specifications snapshot */}
                        <div className="mt-2.5 bg-slate-50/70 p-2 rounded-lg text-[10px] space-y-0.5">
                          {Object.entries(product.specifications).slice(0, 2).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-slate-600">
                              <span className="text-slate-400">{k}:</span>
                              <span className="font-semibold truncate max-w-[150px]">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex gap-2">
                        <button
                          onClick={() => onViewBusinessProfile(business)}
                          className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer text-center"
                        >
                          View Storefront
                        </button>
                        <button
                          onClick={() => onSendEnquiry(business)}
                          className="px-3 py-1.5 rounded-xl bg-[#101B2D] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Send size={12} className="text-[#19B6A4]" />
                          <span>Request Quote</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CHOICELOOP HISTORY */}
      {activeTab === 'choiceloop' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your ChoiceLoop™ Selection Records
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Crowdsourced feedback that powers transparency for SME procurement across India.
            </p>
          </div>

          {choiceLoopFeedbacks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
              No ChoiceLoop responses recorded yet. Whenever you choose a supplier, tap "Mark as Chosen" to log your selection driver.
            </div>
          ) : (
            <div className="space-y-3">
              {choiceLoopFeedbacks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#19B6A4] shrink-0">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#101B2D]">{item.businessName}</h4>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      {item.feedbackNote && (
                        <p className="text-xs text-slate-600 mt-1 italic">"{item.feedbackNote}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-[#19B6A4] border border-[#19B6A4]/30">
                      Chosen for: {item.reason}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROCUREMENT PREFERENCES */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-2xl">
          <h3 className="text-base font-bold text-[#101B2D]">Buyer Profile & Cluster Logistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-500 mb-1">Company / Organization</label>
              <input
                type="text"
                disabled
                value="Singhania Trading & Retails Pvt Ltd"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Buyer GSTIN</label>
              <input
                type="text"
                disabled
                value="07AABCS9912D1ZX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Default Delivery Address</label>
              <input
                type="text"
                disabled
                value="Plot 18, Okhla Industrial Area Phase-1, New Delhi"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Preferred Freight Terms</label>
              <input
                type="text"
                disabled
                value="Doorstep delivery with transit insurance"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Profile details are automatically populated in new RFQs for convenience.
          </p>
        </div>
      )}
    </div>
  );
};
