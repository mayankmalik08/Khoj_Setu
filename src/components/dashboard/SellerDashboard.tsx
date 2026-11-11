import React, { useState } from 'react';
import { Business, Enquiry, Product, CategoryType } from '../../types';
import { CATEGORIES_LIST } from '../../data/mockData';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Store,
  Package,
  Inbox,
  TrendingUp,
  Settings,
  Plus,
  Send,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  Building,
  MapPin,
  Calendar,
  X,
  FileCheck2,
  DollarSign
} from 'lucide-react';

interface SellerDashboardProps {
  businesses: Business[];
  activeBusiness: Business;
  onSelectActiveBusiness: (id: string) => void;
  enquiries: Enquiry[];
  onAddProduct: (businessId: string, product: Product) => void;
  onUpdateProduct: (businessId: string, product: Product) => void;
  onDeleteProduct: (businessId: string, productId: string) => void;
  onSubmitQuotation: (
    enquiryId: string,
    businessId: string,
    businessName: string,
    data: {
      quotedPrice: string;
      deliveryTimeline: string;
      moq: string;
      productDetails: string;
      additionalTerms: string;
    }
  ) => void;
  onUpdateBusiness: (biz: Business) => void;
  onOpenAiOnboarding: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  businesses,
  activeBusiness,
  onSelectActiveBusiness,
  enquiries,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSubmitQuotation,
  onUpdateBusiness,
  onOpenAiOnboarding
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'products' | 'profile'>('overview');

  // Quotation response modal state
  const [respondingEnquiry, setRespondingEnquiry] = useState<Enquiry | null>(null);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [deliveryTimeline, setDeliveryTimeline] = useState('');
  const [quoteMoq, setQuoteMoq] = useState('');
  const [quoteProductDetails, setQuoteProductDetails] = useState('');
  const [quoteAdditionalTerms, setQuoteAdditionalTerms] = useState('');

  // Add/Edit Product modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<CategoryType>(activeBusiness.category);
  const [prodDescription, setProdDescription] = useState('');
  const [prodPrice, setProdPrice] = useState(150);
  const [prodPriceUnit, setProdPriceUnit] = useState('per piece');
  const [prodMoq, setProdMoq] = useState(100);
  const [prodDeliveryDays, setProdDeliveryDays] = useState(7);
  const [prodImage, setProdImage] = useState(
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
  );
  const [prodSpecs, setProdSpecs] = useState<Record<string, string>>({
    'Material Grade': 'Industrial Certified',
    'Standard Dimension': 'Customizable',
    'Finish / Coating': 'Standard'
  });

  // Filter enquiries for this business
  const businessEnquiries = enquiries.filter(
    (e) => e.businessIds.includes(activeBusiness.id) || e.businessNames.includes(activeBusiness.name)
  );

  const pendingCount = businessEnquiries.filter(
    (e) => !e.quotations || !e.quotations.some((q) => q.businessId === activeBusiness.id)
  ).length;

  const handleOpenQuoteModal = (enq: Enquiry) => {
    setRespondingEnquiry(enq);
    const existingQuote = enq.quotations?.find((q) => q.businessId === activeBusiness.id);
    if (existingQuote) {
      setQuotedPrice(existingQuote.quotedPrice);
      setDeliveryTimeline(existingQuote.deliveryTimeline);
      setQuoteMoq(existingQuote.moq);
      setQuoteProductDetails(existingQuote.productDetails);
      setQuoteAdditionalTerms(existingQuote.additionalTerms);
    } else {
      setQuotedPrice(`₹${activeBusiness.startingPrice} ${activeBusiness.startingPriceUnit} (Total estimate pending lot count)`);
      setDeliveryTimeline(`${activeBusiness.averageDeliveryDays} working days from PO approval`);
      setQuoteMoq(`${activeBusiness.minMoq} units minimum`);
      setQuoteProductDetails(`Standard specification meeting ${enq.productOrService} requirements.`);
      setQuoteAdditionalTerms('30% Advance with Purchase Order, 70% against dispatch bill of lading.');
    }
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingEnquiry) return;

    onSubmitQuotation(respondingEnquiry.id, activeBusiness.id, activeBusiness.name, {
      quotedPrice,
      deliveryTimeline,
      moq: quoteMoq,
      productDetails: quoteProductDetails,
      additionalTerms: quoteAdditionalTerms
    });

    setRespondingEnquiry(null);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory(activeBusiness.category);
    setProdDescription('');
    setProdPrice(activeBusiness.startingPrice || 200);
    setProdPriceUnit(activeBusiness.startingPriceUnit || 'per piece');
    setProdMoq(activeBusiness.minMoq || 50);
    setProdDeliveryDays(activeBusiness.averageDeliveryDays || 7);
    setProdSpecs({
      'Standard Specs': 'Meets industrial tolerance standards',
      'Quality Check': '100% factory inspected'
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdDescription(p.description);
    setProdPrice(p.price);
    setProdPriceUnit(p.priceUnit);
    setProdMoq(p.moq);
    setProdDeliveryDays(p.deliveryDays);
    setProdImage(p.image);
    setProdSpecs({ ...p.specifications });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;

    if (editingProduct) {
      onUpdateProduct(activeBusiness.id, {
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        description: prodDescription,
        price: prodPrice,
        priceUnit: prodPriceUnit,
        moq: prodMoq,
        deliveryDays: prodDeliveryDays,
        image: prodImage,
        specifications: prodSpecs
      });
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        businessId: activeBusiness.id,
        name: prodName,
        category: prodCategory,
        description: prodDescription,
        price: prodPrice,
        priceUnit: prodPriceUnit,
        moq: prodMoq,
        deliveryDays: prodDeliveryDays,
        inStock: true,
        customisationAvailable: true,
        specifications: prodSpecs,
        image: prodImage,
        tags: [prodCategory, activeBusiness.location.city]
      };
      onAddProduct(activeBusiness.id, newProduct);
    }
    setProductModalOpen(false);
  };

  // ChoiceLoop decision breakdown
  const choiceLoop = activeBusiness.choiceLoopStats;
  const choiceBreakdown = Object.entries(choiceLoop?.reasonsBreakdown || {}).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Storefront Switcher Header */}
      <div className="bg-[#101B2D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activeBusiness.logo}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 bg-white shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeBusiness.name}
              </h1>
              <VerificationBadge status={activeBusiness.verificationStatus} size="sm" />
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {activeBusiness.category} • {activeBusiness.location.city}, {activeBusiness.location.state}
            </p>
          </div>
        </div>

        {/* Switch Active Demo Storefront & AI Onboarding */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Switch Demo Storefront:
            </span>
            <select
              value={activeBusiness.id}
              onChange={(e) => onSelectActiveBusiness(e.target.value)}
              className="bg-slate-800 text-xs text-white border border-slate-700 rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.location.city})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 sm:pt-0">
            <button
              onClick={onOpenAiOnboarding}
              className="px-3.5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#19B6A4]/25"
            >
              <Sparkles size={14} />
              <span>AI Onboarding Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold text-slate-600 overflow-x-auto pb-0.5">
        {[
          { id: 'overview', label: 'Storefront Overview & Metrics' },
          { id: 'enquiries', label: `Enquiries & RFQs (${businessEnquiries.length})` },
          { id: 'products', label: `Product Catalogue (${activeBusiness.products.length})` },
          { id: 'profile', label: 'Storefront Profile & Capabilities' }
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

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Profile Views
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#101B2D] mt-1">1,420</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+18% this month</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Product Views
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#101B2D] mt-1">4,890</p>
              <span className="text-[10px] text-emerald-600 font-semibold">+24% this month</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Enquiries Received
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#19B6A4] mt-1">
                {businessEnquiries.length}
              </p>
              <span className="text-[10px] text-slate-500 font-medium">All time</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Pending Quotations
              </span>
              <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              <span className="text-[10px] text-amber-700 font-semibold">Needs response</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Response Rate
              </span>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">94%</p>
              <span className="text-[10px] text-slate-500 font-medium">Under 4 hours</span>
            </div>
          </div>

          {/* ChoiceLoop Decision Drivers Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#19B6A4]" />
                <h3 className="font-bold text-base text-[#101B2D]">
                  Customer Decision Insights (KhojSetu ChoiceLoop™)
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-[#19B6A4] border border-[#19B6A4]/20 self-start sm:self-auto">
                {choiceLoop?.totalResponses || 0} Total Verified Buyer Choices
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Real analytics derived from buyers who selected your business. Individual responses remain strictly anonymous.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {choiceBreakdown.map(([reason, count]) => {
                const total = choiceLoop?.totalResponses || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={reason} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{reason}</span>
                      <span className="text-[#19B6A4] font-bold">
                        {pct}% ({count} votes)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#19B6A4] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Enquiries Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#101B2D]">Recent Buyer Quotation Requests</h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs font-bold text-[#19B6A4] hover:underline cursor-pointer"
              >
                View All Enquiries
              </button>
            </div>

            {businessEnquiries.length === 0 ? (
              <p className="text-xs text-slate-500">No enquiries received yet.</p>
            ) : (
              <div className="space-y-2.5">
                {businessEnquiries.slice(0, 3).map((enq) => {
                  const hasQuote = enq.quotations?.some((q) => q.businessId === activeBusiness.id);
                  return (
                    <div
                      key={enq.id}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{enq.productOrService}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Buyer: {enq.customerName} • Qty: {enq.quantity} • Target Budget: {enq.budgetRange}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {hasQuote ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Quotation Sent
                          </span>
                        ) : (
                          <button
                            onClick={() => handleOpenQuoteModal(enq)}
                            className="px-3 py-1.5 rounded-lg bg-[#19B6A4] hover:bg-[#16a493] text-white font-bold cursor-pointer"
                          >
                            Respond with Quote
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ENQUIRIES & QUOTATION MANAGEMENT */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#101B2D]">
                Enquiry Inbox & Quotation Dispatch
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review technical requirements from verified buyers and issue formal commercial quotations.
              </p>
            </div>
          </div>

          {businessEnquiries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
              No buyer enquiries received yet for {activeBusiness.name}.
            </div>
          ) : (
            <div className="space-y-4">
              {businessEnquiries.map((enq) => {
                const quote = enq.quotations?.find((q) => q.businessId === activeBusiness.id);
                return (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">#{enq.id}</span>
                        <h4 className="font-bold text-sm text-[#101B2D]">
                          {enq.productOrService}
                        </h4>
                        <p className="text-xs text-slate-500">
                          From: <strong className="text-slate-800">{enq.customerName}</strong> ({enq.customerPhone} • {enq.customerEmail})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {quote ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 size={13} />
                            <span>Quoted on {new Date(quote.respondedAt).toLocaleDateString()}</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                            <Clock size={13} />
                            <span>Awaiting Quotation</span>
                          </span>
                        )}

                        <button
                          onClick={() => handleOpenQuoteModal(enq)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#101B2D] hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                        >
                          {quote ? 'Edit Quotation' : 'Send Quotation'}
                        </button>
                      </div>
                    </div>

                    {/* Buyer RFQ details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                          Requested Qty
                        </span>
                        <span className="font-bold text-slate-800">{enq.quantity}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                          Target Budget
                        </span>
                        <span className="font-bold text-slate-800">{enq.budgetRange}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                          Delivery Target
                        </span>
                        <span className="font-bold text-slate-800">{enq.requiredDeliveryDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                          Location
                        </span>
                        <span className="font-bold text-slate-800 truncate block">
                          {enq.deliveryLocation}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block mb-1">
                        Buyer Specifications:
                      </span>
                      <p className="text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                        {enq.specifications}
                      </p>
                    </div>

                    {/* If vendor has already quoted, show preview */}
                    {quote && (
                      <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 text-xs space-y-1">
                        <span className="font-bold text-teal-900 block">
                          Your Active Quotation to Buyer:
                        </span>
                        <p className="text-slate-800 font-semibold">
                          Price: {quote.quotedPrice} • Lead Time: {quote.deliveryTimeline} • MOQ: {quote.moq}
                        </p>
                        <p className="text-[11px] text-slate-600 italic">"{quote.productDetails}"</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PRODUCT CATALOGUE MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#101B2D]">Digital Product Catalogue</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add, edit, or configure technical specifications and MOQ tiers.
              </p>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm"
            >
              <Plus size={14} />
              <span>Add New Product SKU</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBusiness.products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
              >
                <div>
                  <div className="flex gap-3">
                    <img
                      src={prod.image}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-sm text-[#101B2D] truncate">{prod.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 p-2 rounded-lg bg-slate-50 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Unit Price</span>
                      <span className="font-bold text-[#101B2D]">
                        ₹{prod.price} {prod.priceUnit}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Batch MOQ</span>
                      <span className="font-bold text-[#101B2D]">{prod.moq}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Lead Time</span>
                      <span className="font-bold text-[#101B2D]">~{prod.deliveryDays}d</span>
                    </div>
                  </div>

                  {/* Specifications Preview */}
                  <div className="mt-2.5 text-[11px] space-y-1">
                    {Object.entries(prod.specifications).slice(0, 3).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-slate-600">
                        <span className="text-slate-400 truncate">{k}:</span>
                        <span className="font-semibold truncate">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    ● Live on Marketplace
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(activeBusiness.id, prod.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STOREFRONT PROFILE & CAPABILITIES */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#101B2D]">Storefront Details & KYC</h3>
              <p className="text-xs text-slate-500">Public profile visible to all marketplace buyers.</p>
            </div>
            <VerificationBadge status={activeBusiness.verificationStatus} size="md" />
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                disabled
                value={activeBusiness.name}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category & Type</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  disabled
                  value={activeBusiness.category}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
                <input
                  type="text"
                  disabled
                  value={activeBusiness.businessType}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={3}
                disabled
                value={activeBusiness.description}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Registered Address
              </label>
              <input
                type="text"
                disabled
                value={activeBusiness.location.address}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: FORMAL QUOTATION RESPONSE MODAL */}
      {respondingEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            <div className="bg-[#101B2D] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base">
                  Respond with Quotation: {respondingEnquiry.productOrService}
                </h3>
                <p className="text-xs text-slate-300">
                  Buyer: {respondingEnquiry.customerName} • Target Qty: {respondingEnquiry.quantity}
                </p>
              </div>
              <button
                onClick={() => setRespondingEnquiry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuotation} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quoted Commercial Price (including GST/Freight) *
                </label>
                <input
                  type="text"
                  required
                  value={quotedPrice}
                  onChange={(e) => setQuotedPrice(e.target.value)}
                  placeholder="e.g. ₹142 per meter + 5% GST (Total ₹3,55,000)"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Lead Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryTimeline}
                    onChange={(e) => setDeliveryTimeline(e.target.value)}
                    placeholder="e.g. 10 working days from approval"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Agreed Minimum Batch MOQ *
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteMoq}
                    onChange={(e) => setQuoteMoq(e.target.value)}
                    placeholder="e.g. 500 meters per shade"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Specs & Sample Availability
                </label>
                <textarea
                  rows={2}
                  value={quoteProductDetails}
                  onChange={(e) => setQuoteProductDetails(e.target.value)}
                  placeholder="Mention shade approval, test reports or sample dispatch..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Commercial & Payment Terms
                </label>
                <input
                  type="text"
                  value={quoteAdditionalTerms}
                  onChange={(e) => setQuoteAdditionalTerms(e.target.value)}
                  placeholder="e.g. 30% advance, balance against bill of lading"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setRespondingEnquiry(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold cursor-pointer"
                >
                  Submit Official Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT PRODUCT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            <div className="bg-[#101B2D] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-bold text-base">
                {editingProduct ? 'Edit Product SKU' : 'Add New Product Listing'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. 100% Combed Cotton Oxford Cloth"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodPriceUnit}
                    onChange={(e) => setProdPriceUnit(e.target.value)}
                    placeholder="e.g. per meter, per box"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Minimum Order Quantity (MOQ) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodMoq}
                    onChange={(e) => setProdMoq(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dispatch Lead Time (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodDeliveryDays}
                    onChange={(e) => setProdDeliveryDays(Number(e.target.value))}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Short technical description for buyers..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
