import React from 'react';
import { Business } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  MapPin,
  Star,
  Clock,
  Box,
  Scale,
  Send,
  Heart,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  onViewProfile: (biz: Business) => void;
  onAddToComparison: (bizId: string) => void;
  isCompared: boolean;
  onSendEnquiry: (biz: Business) => void;
  onToggleSave: (bizId: string) => void;
  isSaved: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onViewProfile,
  onAddToComparison,
  isCompared,
  onSendEnquiry,
  onToggleSave,
  isSaved
}) => {
  // Find top ChoiceLoop driver if available
  const topChoiceReason = React.useMemo(() => {
    if (!business.choiceLoopStats || business.choiceLoopStats.totalResponses === 0) return null;
    const entries = Object.entries(business.choiceLoopStats.reasonsBreakdown);
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    if (sorted[0] && sorted[0][1] > 0) {
      const pct = Math.round((sorted[0][1] / business.choiceLoopStats.totalResponses) * 100);
      return { reason: sorted[0][0], pct };
    }
    return null;
  }, [business.choiceLoopStats]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Card Header Cover / Image */}
        <div className="relative h-40 bg-slate-100 overflow-hidden">
          <img
            src={business.coverImage}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Floating Category & Supplier Type Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#101B2D]/85 backdrop-blur-md text-white border border-white/10">
              {business.businessType}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800">
              {business.category}
            </span>
          </div>

          {/* Save Shortlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(business.id);
            }}
            title={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 shadow-md transition-all cursor-pointer"
          >
            <Heart
              size={16}
              className={isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}
            />
          </button>

          {/* Logo overlay & Verification status */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={business.logo}
                alt=""
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white"
              />
              <div className="text-white">
                <VerificationBadge status={business.verificationStatus} size="sm" />
              </div>
            </div>

            {/* Rating badge */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span>{business.rating.toFixed(1)}</span>
              <span className="text-slate-300 text-[10px]">({business.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3">
          <div>
            <h3
              onClick={() => onViewProfile(business)}
              className="text-base font-bold text-[#101B2D] hover:text-[#19B6A4] transition-colors cursor-pointer leading-snug line-clamp-1"
            >
              {business.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin size={13} className="text-[#19B6A4] shrink-0" />
              <span className="truncate">
                {business.location.city}, {business.location.state} • {business.location.district || 'Industrial Hub'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {business.tagline || business.description}
          </p>

          {/* Spec & Procurement Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <div>
              <span className="block text-[10px] uppercase font-semibold text-slate-400">
                Starting At
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#101B2D]">
                ₹{business.startingPrice.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-slate-500 truncate">
                {business.startingPriceUnit}
              </span>
            </div>

            <div className="border-x border-slate-200">
              <span className="block text-[10px] uppercase font-semibold text-slate-400">
                Min MOQ
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#101B2D]">
                {business.minMoq.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-slate-500">units</span>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-semibold text-slate-400">
                Lead Time
              </span>
              <span className="font-bold text-xs sm:text-sm text-[#101B2D]">
                ~{business.averageDeliveryDays}d
              </span>
              <span className="block text-[10px] text-slate-500">Dispatch</span>
            </div>
          </div>

          {/* ChoiceLoop Decision Insight Badge if available */}
          {topChoiceReason && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50/70 border border-[#19B6A4]/20 text-[11px] text-teal-800 font-medium">
              <TrendingUp size={13} className="text-[#19B6A4] shrink-0" />
              <span className="truncate">
                <span className="font-bold">{topChoiceReason.pct}%</span> of buyers picked for:{' '}
                <span className="text-[#101B2D] font-semibold">{topChoiceReason.reason}</span>
              </span>
            </div>
          )}

          {/* Capabilities Tags */}
          <div className="flex flex-wrap gap-1">
            {business.capabilities.slice(0, 2).map((cap, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 truncate max-w-[190px]"
              >
                {cap}
              </span>
            ))}
            {business.customisationAvailable && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Custom Specs
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToComparison(business.id)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
              isCompared
                ? 'bg-teal-50 text-[#19B6A4] border-[#19B6A4] font-bold'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Scale size={14} className={isCompared ? 'text-[#19B6A4]' : 'text-slate-400'} />
            <span>{isCompared ? 'In Compare' : 'Add Compare'}</span>
          </button>

          <button
            onClick={() => onViewProfile(business)}
            className="py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>View Profile</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <button
          onClick={() => onSendEnquiry(business)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#101B2D] hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Send size={13} className="text-[#19B6A4]" />
          <span>Send Direct Enquiry</span>
        </button>
      </div>
    </div>
  );
};
