import React, { useState } from 'react';
import { Business, ChoiceLoopReason, ChoiceLoopRecord } from '../../types';
import {
  TrendingUp,
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  DollarSign,
  Award,
  Zap,
  Box,
  Star
} from 'lucide-react';

interface ChoiceLoopModalProps {
  business: Business;
  onClose: () => void;
  onSubmitFeedback: (data: Omit<ChoiceLoopRecord, 'id' | 'timestamp'>) => void;
}

export const ChoiceLoopModal: React.FC<ChoiceLoopModalProps> = ({
  business,
  onClose,
  onSubmitFeedback
}) => {
  const [selectedReason, setSelectedReason] = useState<ChoiceLoopReason | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [customerName, setCustomerName] = useState('Anand Verma');
  const [submitted, setSubmitted] = useState(false);

  const reasons: {
    reason: ChoiceLoopReason;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      reason: 'Better price',
      label: 'Better Price',
      description: 'More competitive unit rates or better commercial discount',
      icon: <DollarSign size={16} className="text-emerald-500" />
    },
    {
      reason: 'Better quality',
      label: 'Better Quality',
      description: 'Superior fabric GSM, wood finish, compressive strength or specs',
      icon: <Award size={16} className="text-blue-500" />
    },
    {
      reason: 'Faster delivery',
      label: 'Faster Delivery',
      description: 'Quicker dispatch lead time or proximity to cluster',
      icon: <Zap size={16} className="text-amber-500" />
    },
    {
      reason: 'Lower MOQ',
      label: 'Lower MOQ',
      description: 'Willingness to take smaller trial batches or lower minimums',
      icon: <Box size={16} className="text-purple-500" />
    },
    {
      reason: 'Better ratings or trust',
      label: 'Trust & Reputation',
      description: 'Verified GSTIN, strong buyer ratings or recognized certifications',
      icon: <Star size={16} className="text-yellow-500" />
    },
    {
      reason: 'Other',
      label: 'Other Factors',
      description: 'Responsive communication, payment terms or custom tooling',
      icon: <Sparkles size={16} className="text-slate-500" />
    }
  ];

  const handleSelectReason = (reason: ChoiceLoopReason) => {
    setSelectedReason(reason);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    onSubmitFeedback({
      businessId: business.id,
      businessName: business.name,
      category: business.category,
      customerName,
      reason: selectedReason,
      feedbackNote: feedbackNote.trim() || undefined
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#101B2D] to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#19B6A4]/20 flex items-center justify-center text-[#19B6A4] border border-[#19B6A4]/30">
              <TrendingUp size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight">
                  KhojSetu ChoiceLoop™
                </span>
                <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.2 rounded bg-teal-400/20 text-[#A7E8D5] uppercase">
                  Buyer Loop
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Help other buyers discover what makes suppliers truly excel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            /* Thank you view */
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-[#19B6A4] border border-teal-200 mx-auto flex items-center justify-center">
                <CheckCircle2 size={30} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-bold text-[#101B2D]">Thank You for Your Feedback!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your response has been anonymized and added to{' '}
                <span className="font-semibold text-slate-800">{business.name}</span>'s ChoiceLoop decision insights.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100 max-w-sm mx-auto">
                ChoiceLoop insights are aggregated to protect customer anonymity and help small manufacturers understand what drives purchase decisions.
              </div>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Survey View */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Supplier Selected:
                </span>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <img
                    src={business.logo}
                    alt=""
                    className="w-8 h-8 rounded-lg object-cover bg-white border border-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#101B2D] truncate">{business.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {business.category} • {business.location.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Question */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Why did you choose this business? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {reasons.map((item) => {
                    const isSelected = selectedReason === item.reason;
                    return (
                      <button
                        key={item.reason}
                        type="button"
                        onClick={() => handleSelectReason(item.reason)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-[#19B6A4] bg-teal-50/70 shadow-xs ring-1 ring-[#19B6A4]'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">{item.icon}</div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold leading-tight ${
                              isSelected ? 'text-[#19B6A4]' : 'text-slate-800'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Note */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Optional Details (e.g. specific shade match, prompt sample delivery):
                </label>
                <textarea
                  rows={2}
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  placeholder="Share a brief note on what stood out in this supplier's proposal..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                />
              </div>

              {/* Privacy and optionality notice */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] text-slate-500 flex items-start gap-2">
                <Shield size={14} className="text-[#19B6A4] shrink-0 mt-0.5" />
                <span>
                  This survey is completely optional. Individual responses are never shared with suppliers; only aggregated percentage insights are displayed.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Skip for Now
                </button>

                <button
                  type="submit"
                  disabled={!selectedReason}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedReason
                      ? 'bg-[#19B6A4] hover:bg-[#16a493] text-white shadow-md shadow-[#19B6A4]/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Submit ChoiceLoop</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
