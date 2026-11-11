import React, { useState } from 'react';
import { Business, Enquiry } from '../../types';
import {
  Send,
  X,
  CheckCircle2,
  Building,
  Calendar,
  MapPin,
  FileText,
  DollarSign,
  User,
  Phone,
  Mail,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface EnquiryModalProps {
  targets: Business[];
  onClose: () => void;
  onSubmitEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'quotations' | 'status'>) => Enquiry;
  onViewCustomerDashboard: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  targets,
  onClose,
  onSubmitEnquiry,
  onViewCustomerDashboard
}) => {
  const [productOrService, setProductOrService] = useState(
    targets[0]?.products[0]?.name || ''
  );
  const [quantity, setQuantity] = useState('500');
  const [budgetRange, setBudgetRange] = useState('₹50,000 - ₹1,00,000');
  const [deliveryLocation, setDeliveryLocation] = useState('Delhi NCR, India');
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState('2026-11-30');
  const [specifications, setSpecifications] = useState(
    'Need standard commercial grade, sample swatch / test report required prior to dispatch. Quotation should include GST and freight charges.'
  );
  const [customerName, setCustomerName] = useState('Arjun Singhania');
  const [customerPhone, setCustomerPhone] = useState('+91 98712 34567');
  const [customerEmail, setCustomerEmail] = useState('arjun@singhaniatraders.in');

  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const isMulti = targets.length > 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productOrService.trim() || !quantity.trim() || !customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please complete all mandatory fields marked with an asterisk (*).');
      return;
    }

    const newEnq = onSubmitEnquiry({
      customerName,
      customerPhone,
      customerEmail,
      businessIds: targets.map((t) => t.id),
      businessNames: targets.map((t) => t.name),
      productOrService,
      quantity,
      budgetRange,
      deliveryLocation,
      requiredDeliveryDate,
      specifications
    });

    setSubmittedEnquiry(newEnq);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Modal Top Banner */}
        <div className="bg-[#101B2D] text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#19B6A4]/20 flex items-center justify-center text-[#19B6A4] border border-[#19B6A4]/30">
              <Send size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-white">
                {isMulti
                  ? `Request Quotations from ${targets.length} Suppliers`
                  : `Send Enquiry to ${targets[0]?.name}`}
              </h2>
              <p className="text-xs text-slate-300">
                Direct quotation request with tailored technical specifications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedEnquiry ? (
            /* Submission Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center animate-in zoom-in duration-300">
                <CheckCircle2 size={36} className="stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide mb-2">
                  Enquiry ID #{submittedEnquiry.id} • Status: {submittedEnquiry.status}
                </span>
                <h3 className="text-xl font-extrabold text-[#101B2D]">
                  Quotation Request Successfully Dispatched!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Your enquiry has been delivered to{' '}
                  <span className="font-semibold text-slate-800">
                    {submittedEnquiry.businessNames.join(', ')}
                  </span>
                  . The supplier will review your technical specifications and submit a commercial quotation.
                </p>
              </div>

              {/* Demo Notice */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-lg mx-auto text-left space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <Sparkles size={14} className="text-[#19B6A4]" />
                  <span>Demo Workflow Tip:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  You can switch to the <strong>Business / Seller View</strong> via the top header bar to inspect this enquiry as a vendor and respond with a formal price quotation! The response will instantly appear in your Customer Dashboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onViewCustomerDashboard();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/20 cursor-pointer"
                >
                  View My Enquiries & Quotations
                </button>
              </div>
            </div>
          ) : (
            /* Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Target Suppliers Ribbon */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Sending RFQ to:
                </span>
                <div className="flex flex-wrap gap-2">
                  {targets.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                    >
                      <img src={t.logo} alt="" className="w-4 h-4 rounded object-cover" />
                      <span className="font-semibold text-slate-800">{t.name}</span>
                      <span className="text-[10px] text-slate-500">({t.location.city})</span>
                    </div>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Product and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product or Service Required *
                  </label>
                  <input
                    type="text"
                    required
                    value={productOrService}
                    onChange={(e) => setProductOrService(e.target.value)}
                    placeholder="e.g. 60s Combed Cotton or 5-Ply Cartons"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Required Quantity & Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 500 meters or 2,000 boxes"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Budget and Delivery Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Budget Range
                  </label>
                  <input
                    type="text"
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    placeholder="e.g. ₹75,000 - ₹1,20,000"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Required Delivery By (Target Date)
                  </label>
                  <input
                    type="date"
                    value={requiredDeliveryDate}
                    onChange={(e) => setRequiredDeliveryDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Destination / Pincode
                </label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Okhla Industrial Area, Phase-1, New Delhi - 110020"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                />
              </div>

              {/* Additional Technical Specifications */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Technical Specifications, Customization & Quality Terms
                </label>
                <textarea
                  rows={3}
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  placeholder="Mention desired GSM, dimensions, finish, burst factor, color codes, certification needs..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                />
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Your Contact Details (For Supplier Response):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Send size={13} />
                  <span>
                    {isMulti
                      ? `Send RFQ to ${targets.length} Suppliers`
                      : 'Submit Direct Enquiry'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
