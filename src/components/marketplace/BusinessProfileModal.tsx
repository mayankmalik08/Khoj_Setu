import React, { useState } from 'react';
import { Business, Product } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  MapPin,
  Phone,
  Mail,
  Scale,
  Send,
  Heart,
  Star,
  CheckCircle2,
  Clock,
  Box,
  FileCheck,
  Building,
  ShieldCheck,
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  X,
  Award,
  Sparkles,
  Info
} from 'lucide-react';

interface BusinessProfileModalProps {
  business: Business;
  onClose: () => void;
  onAddToComparison: (bizId: string) => void;
  isCompared: boolean;
  onToggleSave: (bizId: string) => void;
  isSaved: boolean;
  onToggleSaveProduct: (productId: string) => void;
  isProductSaved: (productId: string) => boolean;
  onSendEnquiry: (biz: Business) => void;
  onSelectAsPartner: (biz: Business) => void; // Triggers ChoiceLoop survey!
}

export const BusinessProfileModal: React.FC<BusinessProfileModalProps> = ({
  business,
  onClose,
  onAddToComparison,
  isCompared,
  onToggleSave,
  isSaved,
  onToggleSaveProduct,
  isProductSaved,
  onSendEnquiry,
  onSelectAsPartner
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'capabilities' | 'reviews' | 'compliance'>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Compute ChoiceLoop percentages
  const choiceLoopStats = business.choiceLoopStats;
  const choiceBreakdown = Object.entries(choiceLoopStats?.reasonsBreakdown || {}).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Cover Photo Header */}
        <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0 overflow-hidden">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          {/* Close & Action Buttons at top */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleSave(business.id)}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all cursor-pointer"
              title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
            >
              <Heart
                size={18}
                className={isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Business Badges & Identity */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={business.logo}
                alt=""
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-4 border-white shadow-xl bg-white shrink-0"
              />
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
                    {business.name}
                  </h1>
                  <VerificationBadge status={business.verificationStatus} size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 line-clamp-1">{business.tagline}</p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#19B6A4]" />
                    {business.location.city}, {business.location.state}
                  </span>
                  <span>•</span>
                  <span>Est. {business.establishedYear}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-amber-400 fill-amber-400" />
                    {business.rating.toFixed(1)} ({business.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Top Primary Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAddToComparison(business.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md ${
                  isCompared
                    ? 'bg-[#19B6A4] text-white font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                <Scale size={14} />
                <span>{isCompared ? 'In Comparison' : 'Add to Compare'}</span>
              </button>

              <button
                onClick={() => onSendEnquiry(business)}
                className="px-4 py-2 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-lg shadow-[#19B6A4]/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Send size={13} />
                <span>Send Direct Enquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verification & Trust Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-800">Cluster Hub:</span>
            <span>{business.location.district || business.location.city}</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-slate-800 hidden sm:inline">GSTIN:</span>
            <span className="font-mono text-slate-700 hidden sm:inline">
              {business.contact.gstin || 'GST Verified on file'}
            </span>
          </div>

          {/* Differentiating Feature: Mark as Chosen / Selected Partner */}
          <button
            onClick={() => onSelectAsPartner(business)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold border border-emerald-300 transition-colors cursor-pointer"
            title="Have you finalized an order with this business? Give ChoiceLoop feedback"
          >
            <Sparkles size={13} className="text-emerald-600" />
            <span>Mark as Chosen Supplier (ChoiceLoop™)</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 px-6 flex gap-4 text-xs font-bold text-slate-600 bg-white shrink-0">
          {[
            { id: 'products', label: 'Products & Price Catalogue' },
            { id: 'capabilities', label: 'Factory & Technical Specs' },
            { id: 'reviews', label: `Reviews & ChoiceLoop (${business.reviewCount})` },
            { id: 'compliance', label: 'Certifications & Trust Documents' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#19B6A4] text-[#19B6A4] font-extrabold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PRODUCTS & CATALOGUE */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#101B2D]">
                  Product Catalogue & Detailed Technical Specifications
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct manufacturer and stockist listings with standard MOQ and batch pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-24 h-24 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {prod.category}
                          </span>
                          <h4 className="font-bold text-sm text-[#101B2D] leading-snug">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{prod.description}</p>
                        </div>
                      </div>

                      {/* Pricing and MOQ ribbon */}
                      <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Price</span>
                          <span className="font-bold text-[#101B2D]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {prod.priceUnit}
                          </span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[10px] text-slate-400 block font-semibold">MOQ</span>
                          <span className="font-bold text-[#101B2D]">{prod.moq} units</span>
                          <span className="text-[10px] text-slate-500 block">minimum</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Lead Time</span>
                          <span className="font-bold text-[#101B2D]">~{prod.deliveryDays}d</span>
                          <span className="text-[10px] text-slate-500 block">dispatch</span>
                        </div>
                      </div>

                      {/* Technical specifications */}
                      <div className="mt-3 space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Category Specifications:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                          {Object.entries(prod.specifications).map(([k, v]) => (
                            <div key={k} className="flex flex-col">
                              <span className="text-[10px] text-slate-400 truncate">{k}</span>
                              <span className="font-semibold text-slate-700 truncate">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {prod.warranty && (
                        <p className="text-[11px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                          <Award size={13} />
                          <span>{prod.warranty}</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleSaveProduct(prod.id)}
                          className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            isProductSaved(prod.id)
                              ? 'bg-rose-50 text-rose-600 border-rose-200'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                          title={isProductSaved(prod.id) ? 'Remove from saved products' : 'Save product to shortlist'}
                        >
                          <Heart
                            size={14}
                            className={isProductSaved(prod.id) ? 'fill-rose-500 text-rose-500' : ''}
                          />
                          <span className="hidden sm:inline">
                            {isProductSaved(prod.id) ? 'Saved' : 'Save'}
                          </span>
                        </button>
                        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                          {prod.inStock ? (
                            <span className="text-emerald-600">● In Stock</span>
                          ) : (
                            <span className="text-amber-600">● Made to Order</span>
                          )}
                        </span>
                      </div>

                      <button
                        onClick={() => onSendEnquiry(business)}
                        className="px-3 py-1.5 rounded-lg bg-[#101B2D] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Send size={12} className="text-[#19B6A4]" />
                        <span>Enquire for SKU</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CAPABILITIES & FACTORY INFRASTRUCTURE */}
          {activeTab === 'capabilities' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#101B2D]">
                  Factory Infrastructure, Machines & Turnaround Capacity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed operational capabilities reported by the supplier and verified during inspection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Building size={16} className="text-[#19B6A4]" />
                    Facility & Workforce
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Established Year:</span>
                      <span className="font-semibold text-slate-800">{business.establishedYear}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Workforce Size:</span>
                      <span className="font-semibold text-slate-800">{business.employeeCount}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Monthly Stated Capacity:</span>
                      <span className="font-semibold text-slate-800">
                        {business.productionCapacity || '50,000 units'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Facility Address:</span>
                      <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">
                        {business.location.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#19B6A4]" />
                    Core Capabilities & Machinery
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {business.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Full Description */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Business Overview
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">{business.description}</p>
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS & CHOICELOOP INSIGHTS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* ChoiceLoop Insights Banner */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-[#19B6A4]" size={18} />
                  <h4 className="font-bold text-sm text-[#101B2D]">
                    KhojSetu ChoiceLoop™ Decision Drivers
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {choiceLoopStats?.totalResponses || 0} Buyer Selections
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Aggregated reasons why verified buyers selected this supplier instead of competitors:
                </p>

                <div className="space-y-2.5">
                  {choiceBreakdown.map(([reason, count]) => {
                    const total = choiceLoopStats?.totalResponses || 1;
                    const pct = Math.round((count / total) * 100);
                    return (
                      <div key={reason} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-800">{reason}</span>
                          <span className="text-[#19B6A4] font-bold">
                            {pct}% ({count} votes)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-teal-100">
                          <div
                            className="h-full bg-gradient-to-r from-[#19B6A4] to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-teal-200/60 text-[11px] text-teal-800 flex items-center justify-between">
                  <span>Simulated DEMO ChoiceLoop Dataset</span>
                  <button
                    onClick={() => onSelectAsPartner(business)}
                    className="font-bold hover:underline cursor-pointer"
                  >
                    + Submit your selection reason
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Buyer Reviews & Ratings
                </h4>
                {business.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-800">{rev.author}</span>
                        {rev.company && (
                          <span className="text-xs text-slate-500"> • {rev.company}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold text-xs text-slate-800">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Date: {rev.date}</span>
                      {rev.verifiedBuyer && (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COMPLIANCE & TRUST */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#101B2D]">
                  Verification Documents & Regulatory Registrations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Platform-inspected official certificates and licenses on record for this SME.
                </p>
              </div>

              <div className="space-y-3">
                {business.verificationDocs?.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <FileCheck size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">{doc.type}</p>
                        <p className="text-[11px] text-slate-500 font-mono">Doc No: {doc.docNumber}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Verified on {doc.submittedAt}
                    </span>
                  </div>
                ))}

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                      <Award size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">Quality Certifications</p>
                      <p className="text-[11px] text-slate-500">
                        {business.certifications.join(', ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Info size={14} /> Trust & Safety Protocol:
                </p>
                <p className="text-[11px] leading-relaxed">
                  KhojSetu verifies registered tax credentials (GSTIN) and MSME Udyam status. While inspection data is validated against public registries, buyers are encouraged to sign formal contracts and inspect sample lots prior to high-value dispatches.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <Phone size={13} className="text-[#19B6A4]" />
              {business.contact.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={13} className="text-[#19B6A4]" />
              {business.contact.email}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => onSelectAsPartner(business)}
              className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
            >
              ChoiceLoop Feedback
            </button>

            <button
              onClick={() => onSendEnquiry(business)}
              className="px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>Send Direct RFQ / Enquiry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
