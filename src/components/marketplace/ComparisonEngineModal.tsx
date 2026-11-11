import React, { useState } from 'react';
import { Business } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  Scale,
  X,
  Plus,
  Send,
  Star,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  Building,
  MapPin,
  Trash2,
  Share2,
  Sparkles,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

interface ComparisonEngineModalProps {
  comparisonIds: string[];
  businesses: Business[];
  onClose: () => void;
  onRemove: (bizId: string) => void;
  onAdd: (bizId: string) => void;
  onClear: () => void;
  onSendEnquiry: (biz: Business | Business[]) => void;
  onViewProfile: (biz: Business) => void;
}

export const ComparisonEngineModal: React.FC<ComparisonEngineModalProps> = ({
  comparisonIds,
  businesses,
  onClose,
  onRemove,
  onAdd,
  onClear,
  onSendEnquiry,
  onViewProfile
}) => {
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const comparedBusinesses = comparisonIds
    .map((id) => businesses.find((b) => b.id === id))
    .filter(Boolean) as Business[];

  const availableToAdd = businesses.filter((b) => !comparisonIds.includes(b.id));

  // Determine prevailing category among compared items
  const primaryCategory = comparedBusinesses.length > 0 ? comparedBusinesses[0].category : '';
  const isUniformCategory = comparedBusinesses.every((b) => b.category === primaryCategory);

  // Compute best benchmarks for highlighting differences without declaring a single winner
  const benchmarks = React.useMemo(() => {
    if (comparedBusinesses.length < 2) return null;
    const lowestMoq = Math.min(...comparedBusinesses.map((b) => b.minMoq));
    const fastestDelivery = Math.min(...comparedBusinesses.map((b) => b.averageDeliveryDays));
    const highestRating = Math.max(...comparedBusinesses.map((b) => b.rating));
    return { lowestMoq, fastestDelivery, highestRating };
  }, [comparedBusinesses]);

  const handleSaveComparison = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Modal Top Header */}
        <div className="bg-[#101B2D] text-white p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#19B6A4]/20 flex items-center justify-center text-[#19B6A4] border border-[#19B6A4]/30">
              <Scale size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white">
                  KhojSetu Category-Aware Comparison Engine
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Objective side-by-side technical specifications, verification tiers, MOQ benchmarks, and lead times.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveComparison}
              title="Save comparison to your dashboard"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">Save Comparison</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Save confirmation toast */}
        {saveToast && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium">
            Comparison saved to your Customer Dashboard shortlisted comparisons!
          </div>
        )}

        {/* Notice Bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#19B6A4]" />
            <span>
              Comparing {comparedBusinesses.length} suppliers{' '}
              {isUniformCategory && (
                <span className="font-semibold text-slate-800">• Filtered by {primaryCategory}</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {comparedBusinesses.length > 1 && (
              <button
                onClick={() => onSendEnquiry(comparedBusinesses)}
                className="text-xs font-bold text-[#19B6A4] hover:text-[#149586] flex items-center gap-1 cursor-pointer"
              >
                <Send size={12} />
                <span>Request Quotations From All ({comparedBusinesses.length})</span>
              </button>
            )}

            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-x-auto overflow-y-auto p-4 sm:p-6 flex-1">
          {comparedBusinesses.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                <Scale size={24} />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Comparison Tray is Empty</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select businesses from the marketplace search or browse listings to compare their pricing, MOQ, fabric GSM or dimensions side-by-side.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-[#19B6A4] text-white text-xs font-bold cursor-pointer"
              >
                Return to Marketplace
              </button>
            </div>
          ) : (
            <div className="min-w-[700px] border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              {/* Header Row with Businesses */}
              <div
                className="grid bg-slate-100/80 border-b border-slate-200"
                style={{
                  gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                    comparedBusinesses.length < 4 ? '180px' : ''
                  }`
                }}
              >
                {/* Metric Label Column */}
                <div className="p-4 border-r border-slate-200 flex flex-col justify-end bg-slate-50/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Supplier Profile
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    Comparison Attributes
                  </span>
                </div>

                {/* Compared Business Columns */}
                {comparedBusinesses.map((biz) => (
                  <div
                    key={biz.id}
                    className="p-4 border-r border-slate-200 relative bg-white flex flex-col justify-between"
                  >
                    <button
                      onClick={() => onRemove(biz.id)}
                      title="Remove from comparison"
                      className="absolute top-2 right-2 p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-slate-100 cursor-pointer"
                    >
                      <X size={15} />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={biz.logo}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shadow-2xs"
                        />
                        <div className="min-w-0 pr-4">
                          <h4
                            onClick={() => onViewProfile(biz)}
                            className="font-bold text-xs text-[#101B2D] hover:text-[#19B6A4] cursor-pointer truncate"
                          >
                            {biz.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate">
                            {biz.location.city}, {biz.location.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <VerificationBadge status={biz.verificationStatus} size="sm" />
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {biz.businessType}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onViewProfile(biz)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer underline"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => onSendEnquiry(biz)}
                        className="px-2.5 py-1 rounded-lg bg-[#101B2D] hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Send size={11} className="text-[#19B6A4]" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Another Slot */}
                {comparedBusinesses.length < 4 && (
                  <div className="p-4 bg-slate-50/50 flex flex-col items-center justify-center text-center border-dashed border-slate-300">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Compare More</p>
                    <div className="relative">
                      <button
                        onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <Plus size={14} className="text-[#19B6A4]" />
                        <span>Add Supplier</span>
                      </button>

                      {addDropdownOpen && (
                        <div className="absolute right-0 sm:left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-left">
                          <div className="px-3 py-1 text-[11px] font-bold uppercase text-slate-400">
                            Available Suppliers
                          </div>
                          {availableToAdd.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-slate-400">
                              All available suppliers are in comparison
                            </div>
                          ) : (
                            availableToAdd.map((avail) => (
                              <button
                                key={avail.id}
                                onClick={() => {
                                  onAdd(avail.id);
                                  setAddDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-xs hover:bg-teal-50 flex items-center gap-2 cursor-pointer text-left"
                              >
                                <img
                                  src={avail.logo}
                                  alt=""
                                  className="w-5 h-5 rounded object-cover"
                                />
                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-800 truncate">
                                    {avail.name}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    {avail.category} • {avail.location.city}
                                  </p>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Matrix Spec Rows */}
              <div className="divide-y divide-slate-100 text-xs">
                {/* 1. Starting Price & Unit */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Starting Price / Unit
                  </div>
                  {comparedBusinesses.map((biz) => (
                    <div key={biz.id} className="p-3.5 border-r border-slate-200">
                      <span className="font-bold text-sm text-[#101B2D]">
                        ₹{biz.startingPrice.toLocaleString('en-IN')}
                      </span>{' '}
                      <span className="text-slate-500 text-[11px]">{biz.startingPriceUnit}</span>
                    </div>
                  ))}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 2. Minimum Order Quantity (MOQ) */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Minimum Order Quantity (MOQ)
                  </div>
                  {comparedBusinesses.map((biz) => {
                    const isLowest = benchmarks && biz.minMoq === benchmarks.lowestMoq;
                    return (
                      <div key={biz.id} className="p-3.5 border-r border-slate-200 flex items-center gap-2">
                        <span className="font-bold text-[#101B2D]">
                          {biz.minMoq.toLocaleString('en-IN')} units
                        </span>
                        {isLowest && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Lowest MOQ
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 3. Average Delivery Lead Time */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Avg Dispatch Lead Time
                  </div>
                  {comparedBusinesses.map((biz) => {
                    const isFastest =
                      benchmarks && biz.averageDeliveryDays === benchmarks.fastestDelivery;
                    return (
                      <div key={biz.id} className="p-3.5 border-r border-slate-200 flex items-center gap-2">
                        <span className="font-semibold text-slate-800">
                          ~{biz.averageDeliveryDays} working days
                        </span>
                        {isFastest && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                            Fastest Lead Time
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 4. Production Capacity & Scale */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Stated Capacity / Month
                  </div>
                  {comparedBusinesses.map((biz) => (
                    <div key={biz.id} className="p-3.5 border-r border-slate-200 text-slate-700">
                      {biz.productionCapacity || 'Scalable batch manufacturing'}
                    </div>
                  ))}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 5. Customisation Availability */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Custom Specs & OEM Branding
                  </div>
                  {comparedBusinesses.map((biz) => (
                    <div key={biz.id} className="p-3.5 border-r border-slate-200">
                      {biz.customisationAvailable ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <Check size={14} className="text-emerald-600 stroke-[3]" />
                          Supported (Custom prints/dimensions)
                        </span>
                      ) : (
                        <span className="text-slate-400">Standard SKUs only</span>
                      )}
                    </div>
                  ))}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 6. Rating & Buyer Sentiment */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Rating & Reviews
                  </div>
                  {comparedBusinesses.map((biz) => (
                    <div key={biz.id} className="p-3.5 border-r border-slate-200">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span>{biz.rating.toFixed(1)} / 5.0</span>
                        <span className="text-slate-400 font-normal">({biz.reviewCount} reviews)</span>
                      </div>
                    </div>
                  ))}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 7. KhojSetu ChoiceLoop™ Decision Driver */}
                <div
                  className="grid bg-teal-50/30 hover:bg-teal-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-bold text-teal-900 bg-teal-50/60 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-[#19B6A4]" />
                    <span>ChoiceLoop™ Driver</span>
                  </div>
                  {comparedBusinesses.map((biz) => {
                    const entries = Object.entries(biz.choiceLoopStats?.reasonsBreakdown || {});
                    const sorted = entries.sort((a, b) => b[1] - a[1]);
                    const top = sorted[0];
                    return (
                      <div key={biz.id} className="p-3.5 border-r border-slate-200">
                        {top && top[1] > 0 ? (
                          <div>
                            <span className="font-bold text-[#101B2D]">{top[0]}</span>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {top[1]} of {biz.choiceLoopStats.totalResponses} buyers selected this
                            </p>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Collecting buyer data</span>
                        )}
                      </div>
                    );
                  })}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 8. Verified Credentials & Documents */}
                <div
                  className="grid bg-white hover:bg-slate-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-semibold text-slate-700 bg-slate-50/60">
                    Verified Documents on File
                  </div>
                  {comparedBusinesses.map((biz) => (
                    <div key={biz.id} className="p-3.5 border-r border-slate-200 space-y-1">
                      {biz.verificationDocs && biz.verificationDocs.length > 0 ? (
                        biz.verificationDocs.map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-[11px] text-slate-700 truncate"
                          >
                            <FileCheck2 size={12} className="text-emerald-600 shrink-0" />
                            <span className="truncate">{doc.type}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[11px]">Self-declared profile</span>
                      )}
                    </div>
                  ))}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>

                {/* 9. Key Product Samples & Technical Specs (Category Aware) */}
                <div
                  className="grid bg-slate-50/40"
                  style={{
                    gridTemplateColumns: `200px repeat(${comparedBusinesses.length}, minmax(220px, 1fr)) ${
                      comparedBusinesses.length < 4 ? '180px' : ''
                    }`
                  }}
                >
                  <div className="p-3.5 border-r border-slate-200 font-bold text-slate-800 bg-slate-100/60">
                    Flagship Product Specs
                  </div>
                  {comparedBusinesses.map((biz) => {
                    const sampleProduct = biz.products[0];
                    return (
                      <div key={biz.id} className="p-3.5 border-r border-slate-200 space-y-2">
                        {sampleProduct ? (
                          <div>
                            <p className="font-bold text-xs text-[#101B2D] mb-1">
                              {sampleProduct.name}
                            </p>
                            <div className="space-y-1 bg-white p-2 rounded-lg border border-slate-200/80 text-[11px]">
                              {Object.entries(sampleProduct.specifications).map(([key, val]) => (
                                <div key={key} className="flex justify-between gap-2">
                                  <span className="text-slate-500 truncate">{key}:</span>
                                  <span className="font-semibold text-slate-800 text-right truncate">
                                    {val}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">Custom catalogue upon request</span>
                        )}
                      </div>
                    );
                  })}
                  {comparedBusinesses.length < 4 && <div className="p-3.5 bg-slate-50/30" />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Tip: Compare up to 4 businesses to negotiate terms with multiple suppliers simultaneously.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>

            {comparedBusinesses.length > 0 && (
              <button
                onClick={() => onSendEnquiry(comparedBusinesses)}
                className="px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/25 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>
                  Request Quotations From All ({comparedBusinesses.length})
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
