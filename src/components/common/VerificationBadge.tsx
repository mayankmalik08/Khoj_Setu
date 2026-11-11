import React from 'react';
import { VerificationStatus } from '../../types';
import { ShieldCheck, Clock, FileText, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  if (status === 'verified') {
    return (
      <span
        title="Verified Business: GSTIN, MSME Udyam, and physical premises verified"
        className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium ${sizeClasses[size]}`}
      >
        <ShieldCheck size={iconSizes[size]} className="text-emerald-600 stroke-[2.5]" />
        {showLabel && <span>Verified Business</span>}
      </span>
    );
  }

  if (status === 'verification_pending') {
    return (
      <span
        title="Verification Pending: Documents currently under review by admin"
        className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium ${sizeClasses[size]}`}
      >
        <Clock size={iconSizes[size]} className="text-amber-600" />
        {showLabel && <span>Verification Pending</span>}
      </span>
    );
  }

  if (status === 'documents_submitted') {
    return (
      <span
        title="Documents Submitted: Awaiting compliance check"
        className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium ${sizeClasses[size]}`}
      >
        <FileText size={iconSizes[size]} className="text-blue-600" />
        {showLabel && <span>Docs Submitted</span>}
      </span>
    );
  }

  return (
    <span
      title="Unverified Listing: Self-reported SME profile"
      className={`inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium ${sizeClasses[size]}`}
    >
      <AlertCircle size={iconSizes[size]} className="text-slate-400" />
      {showLabel && <span>Self-Reported</span>}
    </span>
  );
};
