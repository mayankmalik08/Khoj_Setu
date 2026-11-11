import React from 'react';
import { FilterState } from '../../types';
import { CATEGORIES_LIST, POPULAR_LOCATIONS } from '../../data/mockData';
import { RotateCcw, Sliders, ChevronDown, ShieldCheck, Award, Check } from 'lucide-react';

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const COMMON_CERTIFICATIONS = [
  'ISO 9001:2015',
  'OEKO-TEX Standard 100',
  'BIFMA Compliant',
  'FSC Certified Wood',
  'CPRI Type Tested Panels',
  'FSSAI Central Certified',
  'IS 15658:2006 (Paver Blocks)',
  'SEDEX Smeta Audited',
  'ROHS Compliant Inks'
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {
  const toggleCertification = (cert: string) => {
    const current = filters.selectedCertifications || [];
    const exists = current.includes(cert);
    const updated = exists ? current.filter((c) => c !== cert) : [...current, cert];
    onFilterChange('selectedCertifications', updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-[#19B6A4]" />
          <h3 className="font-bold text-sm text-[#101B2D]">Refine Suppliers</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sort Results</label>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#19B6A4] cursor-pointer appearance-none"
          >
            <option value="relevance">Relevance & Match</option>
            <option value="rating">Highest Rating</option>
            <option value="price_low">Starting Price: Low to High</option>
            <option value="price_high">Starting Price: High to Low</option>
            <option value="moq_low">Lowest MOQ First</option>
            <option value="delivery_fast">Fastest Delivery Lead Time</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* NEW: Supplier Accreditation Status */}
      <div className="space-y-1.5 pt-1">
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#19B6A4]" />
            Accreditation Tier
          </span>
          {filters.accreditationStatus && filters.accreditationStatus !== 'all' && (
            <span className="text-[10px] text-[#19B6A4] font-bold">Active</span>
          )}
        </label>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Suppliers' },
            { id: 'verified', label: 'Verified Business (GST/Udyam)' },
            { id: 'documents_submitted', label: 'Docs Submitted / In Review' },
            { id: 'unverified', label: 'Self-Reported / None' }
          ].map((tier) => (
            <label
              key={tier.id}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                (filters.accreditationStatus || 'all') === tier.id
                  ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="accreditationTier"
                checked={(filters.accreditationStatus || 'all') === tier.id}
                onChange={() => onFilterChange('accreditationStatus', tier.id)}
                className="text-[#19B6A4] focus:ring-[#19B6A4] text-xs"
              />
              <span>{tier.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* NEW: Product & Factory Certifications */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Award size={14} className="text-[#F59E0B]" />
            Certifications ({filters.selectedCertifications?.length || 0})
          </label>
          {filters.selectedCertifications && filters.selectedCertifications.length > 0 && (
            <button
              onClick={() => onFilterChange('selectedCertifications', [])}
              className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
          {COMMON_CERTIFICATIONS.map((cert) => {
            const isChecked = filters.selectedCertifications?.includes(cert);
            return (
              <label
                key={cert}
                className={`flex items-center gap-2 p-1.5 rounded-lg text-[11px] cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-amber-50/80 text-amber-900 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCertification(cert)}
                  className="rounded border-slate-300 text-[#F59E0B] focus:ring-[#F59E0B]"
                />
                <span className="truncate">{cert}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Business Type */}
      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Supplier Role</label>
        <select
          value={filters.businessType}
          onChange={(e) => onFilterChange('businessType', e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#19B6A4] cursor-pointer"
        >
          <option value="">All Supplier Roles</option>
          <option value="Manufacturer">Manufacturer (Factory Direct)</option>
          <option value="Wholesaler">Wholesaler / Stockist</option>
          <option value="Distributor">Distributor</option>
          <option value="Retailer">Retail Shop</option>
          <option value="Service Provider">Industrial / Home Service</option>
        </select>
      </div>

      {/* Cluster Location */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Cluster / City</label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#19B6A4] cursor-pointer"
        >
          {POPULAR_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Max MOQ Slider */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <label className="font-semibold text-slate-700">Maximum MOQ</label>
          <span className="font-bold text-[#19B6A4]">
            {filters.maxMoq >= 2000 ? 'Any MOQ' : `Up to ${filters.maxMoq} units`}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="2000"
          step="25"
          value={filters.maxMoq}
          onChange={(e) => onFilterChange('maxMoq', Number(e.target.value))}
          className="w-full accent-[#19B6A4] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>1 unit</span>
          <span>500</span>
          <span>1,000</span>
          <span>Any</span>
        </div>
      </div>

      {/* Max Delivery Days Slider */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <label className="font-semibold text-slate-700">Max Delivery Timeline</label>
          <span className="font-bold text-[#19B6A4]">
            {filters.maxDeliveryDays >= 20 ? 'Any Time' : `Within ${filters.maxDeliveryDays} days`}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="1"
          value={filters.maxDeliveryDays}
          onChange={(e) => onFilterChange('maxDeliveryDays', Number(e.target.value))}
          className="w-full accent-[#19B6A4] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>24 hrs</span>
          <span>7 days</span>
          <span>14 days</span>
          <span>20+ days</span>
        </div>
      </div>

      {/* Customisation Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-slate-900">
          <input
            type="checkbox"
            checked={filters.customisationOnly}
            onChange={(e) => onFilterChange('customisationOnly', e.target.checked)}
            className="rounded border-slate-300 text-[#19B6A4] focus:ring-[#19B6A4]"
          />
          <span className="font-medium">Supports Custom Branding / Specs</span>
        </label>
      </div>

      {/* Results Count Tag */}
      <div className="pt-2 text-center text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-[#101B2D]">{totalResults}</span> matching suppliers
      </div>
    </div>
  );
};
