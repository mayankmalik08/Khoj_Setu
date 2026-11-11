import React, { useState } from 'react';
import { Search, MapPin, Building, Sparkles, SlidersHorizontal, CheckCircle } from 'lucide-react';
import { CATEGORIES_LIST, POPULAR_LOCATIONS } from '../../data/mockData';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedLocation: string;
  onLocationChange: (l: string) => void;
  businessType: string;
  onBusinessTypeChange: (t: string) => void;
  onQuickFilterClick: (filter: string) => void;
  activeQuickFilters: string[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  businessType,
  onBusinessTypeChange,
  onQuickFilterClick,
  activeQuickFilters
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localQuery);
  };

  const businessTypes = [
    'All Types',
    'Manufacturer',
    'Wholesaler',
    'Retailer',
    'Distributor',
    'Service Provider'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#101B2D] via-[#14233A] to-[#101B2D] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#19B6A4_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#19B6A4]/15 border border-[#19B6A4]/30 text-[#A7E8D5] text-xs font-semibold tracking-wide">
          <Sparkles size={14} className="text-[#19B6A4]" />
          <span>India’s Transparent B2B & Local SME Discovery Network</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white font-display max-w-4xl mx-auto leading-tight sm:leading-tight">
          Find the Right Business. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19B6A4] via-[#A7E8D5] to-emerald-300">
            Make the Smarter Choice.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover trusted local shops, suppliers and service providers. Compare what matters before you decide.
        </p>

        {/* Unified Search Console */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl shadow-black/40 border border-slate-200/40 text-slate-800 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 flex items-center px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80 focus-within:border-[#19B6A4] focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => {
                  setLocalQuery(e.target.value);
                  onSearchChange(e.target.value);
                }}
                placeholder="What are you looking for today? (e.g. Cotton fabric, Workstations, MCB...)"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3 flex items-center px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
              <Building className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES_LIST.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="md:col-span-2.5 flex items-center px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/80">
              <MapPin className="w-4 h-4 text-[#19B6A4] shrink-0 mr-1.5" />
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Action Button */}
            <div className="md:col-span-1.5">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white font-semibold text-sm shadow-md shadow-[#19B6A4]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Quick Business Type Selector underneath search bar */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs px-2 gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-slate-600">
              <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <SlidersHorizontal size={12} /> Supplier Type:
              </span>
              {businessTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => onBusinessTypeChange(type === 'All Types' ? '' : type)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    (type === 'All Types' && !businessType) || businessType === type
                      ? 'bg-[#101B2D] text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 hidden sm:block">
              Direct factory pricing • Zero broker commissions
            </div>
          </div>
        </form>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium">Fast Filters:</span>
          {[
            { id: 'verified_only', label: 'Verified Suppliers Only' },
            { id: 'low_moq', label: 'Low MOQ (< 100)' },
            { id: 'fast_delivery', label: 'Fast Delivery (< 7 Days)' },
            { id: 'customisation', label: 'Customisation Available' }
          ].map((chip) => {
            const isActive = activeQuickFilters.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onQuickFilterClick(chip.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#19B6A4] text-white border border-[#19B6A4]'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {isActive && <CheckCircle size={12} className="text-white" />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Marketplace Key Proof Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-xl sm:text-2xl font-bold text-white font-display">12,400+</p>
            <p className="text-xs text-slate-400">Verified SME Profiles</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-xl sm:text-2xl font-bold text-[#19B6A4] font-display">48</p>
            <p className="text-xs text-slate-400">Industrial Clusters</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-xl sm:text-2xl font-bold text-[#F59E0B] font-display">100%</p>
            <p className="text-xs text-slate-400">Direct Inquiries (No Broker)</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <p className="text-xl sm:text-2xl font-bold text-[#A7E8D5] font-display">ChoiceLoop™</p>
            <p className="text-xs text-slate-400">Buyer Decision Insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};
