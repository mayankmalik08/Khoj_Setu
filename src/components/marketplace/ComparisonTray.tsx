import React from 'react';
import { Business } from '../../types';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

interface ComparisonTrayProps {
  comparisonIds: string[];
  businesses: Business[];
  onRemove: (bizId: string) => void;
  onClear: () => void;
  onOpenComparison: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  comparisonIds,
  businesses,
  onRemove,
  onClear,
  onOpenComparison
}) => {
  if (comparisonIds.length === 0) return null;

  const comparedBusinesses = comparisonIds
    .map((id) => businesses.find((b) => b.id === id))
    .filter(Boolean) as Business[];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-3xl bg-[#101B2D] text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-700/80 backdrop-blur-lg animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Info & Thumbnails */}
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-700 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#19B6A4]/20 flex items-center justify-center text-[#19B6A4]">
              <Scale size={16} />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Comparison Tray</p>
              <p className="text-[10px] text-slate-400">
                {comparedBusinesses.length} of 4 businesses
              </p>
            </div>
          </div>

          {/* Chips */}
          <div className="flex items-center gap-2">
            {comparedBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs shrink-0 max-w-[160px]"
              >
                <img
                  src={biz.logo}
                  alt=""
                  className="w-5 h-5 rounded object-cover bg-white shrink-0"
                />
                <span className="truncate text-[11px] font-medium">{biz.name}</span>
                <button
                  onClick={() => onRemove(biz.id)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Remove from comparison"
                >
                  <X size={13} />
                </button>
              </div>
            ))}

            {comparedBusinesses.length < 4 && (
              <div className="px-3 py-1.5 rounded-xl border border-dashed border-slate-700 text-slate-400 text-[11px] font-medium shrink-0 hidden sm:block">
                + Add up to {4 - comparedBusinesses.length} more
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onClear}
            title="Clear all from comparison"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={onOpenComparison}
            className="px-4 py-2 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Compare Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
