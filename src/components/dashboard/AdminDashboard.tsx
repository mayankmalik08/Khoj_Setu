import React, { useState } from 'react';
import { Business, Enquiry, VerificationStatus } from '../../types';
import { VerificationBadge } from '../common/VerificationBadge';
import {
  ShieldCheck,
  Building,
  Users,
  Package,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  Eye,
  Filter,
  Search,
  Check,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  businesses: Business[];
  enquiries: Enquiry[];
  onUpdateVerification: (bizId: string, status: VerificationStatus) => void;
  onToggleReport: (bizId: string) => void;
  onResetDemoData: () => void;
  onViewBusinessProfile: (biz: Business) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  businesses,
  enquiries,
  onUpdateVerification,
  onToggleReport,
  onResetDemoData,
  onViewBusinessProfile
}) => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'businesses' | 'reported' | 'activity'>('verifications');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingVerificationBusinesses = businesses.filter(
    (b) => b.verificationStatus === 'documents_submitted' || b.verificationStatus === 'verification_pending'
  );

  const reportedBusinesses = businesses.filter((b) => b.isReported);

  const totalListings = businesses.reduce((acc, b) => acc + b.products.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#101B2D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
            <ShieldCheck size={28} className="text-[#19B6A4]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white">
                Platform Compliance & Trust Console
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Verify GSTIN and MSME Udyam documentation, moderate listings, and monitor marketplace transparency.
            </p>
          </div>
        </div>

        <button
          onClick={onResetDemoData}
          title="Restore baseline demo listings and test dataset"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer self-start md:self-auto transition-colors"
        >
          <RotateCcw size={14} />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Users</span>
          <p className="text-xl font-bold text-[#101B2D] mt-1">1,840</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Active simulated</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Suppliers</span>
          <p className="text-xl font-bold text-[#101B2D] mt-1">{businesses.length}</p>
          <span className="text-[10px] text-slate-500 font-medium">Onboarded SMEs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Listings</span>
          <p className="text-xl font-bold text-[#101B2D] mt-1">{totalListings}</p>
          <span className="text-[10px] text-slate-500 font-medium">Active SKUs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total RFQs</span>
          <p className="text-xl font-bold text-[#101B2D] mt-1">{enquiries.length}</p>
          <span className="text-[10px] text-slate-500 font-medium">Delivered</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Pending KYC
          </span>
          <p className="text-xl font-bold text-amber-600 mt-1">
            {pendingVerificationBusinesses.length}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold">Review queue</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Reported</span>
          <p className="text-xl font-bold text-rose-600 mt-1">{reportedBusinesses.length}</p>
          <span className="text-[10px] text-rose-600 font-medium">Needs audit</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-bold text-slate-600 overflow-x-auto pb-0.5">
        {[
          { id: 'verifications', label: `Pending Verifications (${pendingVerificationBusinesses.length})` },
          { id: 'businesses', label: `All Businesses (${businesses.length})` },
          { id: 'reported', label: `Reported / Flagged (${reportedBusinesses.length})` },
          { id: 'activity', label: 'Cluster Activity & Health' }
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

      {/* TAB 1: PENDING VERIFICATIONS QUEUE */}
      {activeTab === 'verifications' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-base text-[#101B2D]">
              Supplier Verification & Regulatory Queue
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review submitted GSTIN and MSME Udyam documentation before approving verified supplier badges.
            </p>
          </div>

          {pendingVerificationBusinesses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-2">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <p className="font-semibold text-slate-800 text-sm">All Verification Queues Cleared!</p>
              <p className="text-slate-400">
                No supplier profiles are currently awaiting document review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingVerificationBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={biz.logo}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#101B2D]">{biz.name}</h4>
                          <VerificationBadge status={biz.verificationStatus} size="sm" />
                        </div>
                        <p className="text-xs text-slate-500">
                          {biz.category} • {biz.location.city}, {biz.location.state} • GSTIN: {biz.contact.gstin}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => onViewBusinessProfile(biz)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        Inspect Storefront
                      </button>

                      <button
                        onClick={() => onUpdateVerification(biz.id, 'unverified')}
                        className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => onUpdateVerification(biz.id, 'verified')}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Approve & Verify</span>
                      </button>
                    </div>
                  </div>

                  {/* Documents list */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                      Submitted Compliance Documents on File:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {biz.verificationDocs?.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <FileText size={14} className="text-slate-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-semibold text-slate-800 block truncate">
                              {doc.type}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {doc.docNumber} • Submitted {doc.submittedAt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ALL BUSINESSES DIRECTORY */}
      {activeTab === 'businesses' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#101B2D]">All Registered Suppliers</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Master supplier index with verification toggle and moderation control.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter suppliers by name..."
                className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Supplier Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Cluster / City</th>
                    <th className="p-3.5">Verification</th>
                    <th className="p-3.5">Products</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {businesses
                    .filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((biz) => (
                      <tr key={biz.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={biz.logo}
                              alt=""
                              className="w-7 h-7 rounded-lg object-cover bg-white border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-800 block">{biz.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {biz.contact.gstin || 'No GST'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-600">{biz.category}</td>
                        <td className="p-3.5 text-slate-600">{biz.location.city}</td>
                        <td className="p-3.5">
                          <VerificationBadge status={biz.verificationStatus} size="sm" />
                        </td>
                        <td className="p-3.5 font-semibold text-slate-800">
                          {biz.products.length} SKUs
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          <button
                            onClick={() => onViewBusinessProfile(biz)}
                            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() =>
                              onUpdateVerification(
                                biz.id,
                                biz.verificationStatus === 'verified' ? 'unverified' : 'verified'
                              )
                            }
                            className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                              biz.verificationStatus === 'verified'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {biz.verificationStatus === 'verified' ? 'Revoke' : 'Verify'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REPORTED LISTINGS */}
      {activeTab === 'reported' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-base text-[#101B2D]">Reported Content & Buyer Safety</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Investigate listings flagged for non-standard pricing, MOQ discrepancies, or copyright claims.
            </p>
          </div>

          {reportedBusinesses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-2">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <p className="font-semibold text-slate-800 text-sm">No Active Reports</p>
              <p className="text-slate-400">Zero listings currently flagged by buyers.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reportedBusinesses.map((biz) => (
                <div
                  key={biz.id}
                  className="bg-white rounded-2xl border border-rose-200 p-4 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#101B2D]">{biz.name}</h4>
                      <p className="text-slate-500">
                        {biz.category} • Flagged for specification review
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleReport(biz.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => onUpdateVerification(biz.id, 'unverified')}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
                    >
                      Suspend Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CLUSTER ACTIVITY & HEALTH */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-[#101B2D]">Top Industrial Clusters by RFQ Volume</h4>
            <div className="space-y-2 text-xs">
              {[
                { cluster: 'Sonipat Textile & Weaving Hub (Haryana)', rfqs: 148, active: true },
                { cluster: 'Kirti Nagar Furniture Block (Delhi)', rfqs: 122, active: true },
                { cluster: 'Gurugram & Manesar Auto Hub (Haryana)', rfqs: 110, active: true },
                { cluster: 'Panipat Electrical & Yarn Hub (Haryana)', rfqs: 94, active: true },
                { cluster: 'Khari Baoli Bulk Spices Hub (Delhi)', rfqs: 86, active: true }
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="font-medium text-slate-800">{c.cluster}</span>
                  <span className="font-bold text-[#19B6A4]">{c.rfqs} enquiries</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-[#101B2D]">ChoiceLoop™ Integrity Metrics</h4>
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-2 text-teal-900">
              <p className="font-semibold">
                Anonymized Buyer Decision Aggregation: 100% Active
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                ChoiceLoop responses are validated to ensure only buyers who initiated direct contact or finalized contracts can submit selection drivers. Individual respondent IDs are stripped before seller dashboard aggregation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
