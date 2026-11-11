import React from 'react';
import { Compass, ShieldCheck, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';

interface FooterProps {
  onCategoryClick?: (category: string) => void;
  onOpenAiOnboarding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick, onOpenAiOnboarding }) => {
  return (
    <footer className="bg-[#101B2D] text-slate-300 mt-20 border-t border-slate-800">
      {/* Trust & Transparency Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#19B6A4]/15 flex items-center justify-center text-[#19B6A4] shrink-0 mt-0.5">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Verified SME Verification</p>
              <p className="text-slate-400 mt-0.5">
                GSTIN, MSME Udyam credentials, and physical cluster premises verified before blue badge grant.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Category-Aware Comparison</p>
              <p className="text-slate-400 mt-0.5">
                Compare fabric GSM, corrugated ply bursting factors, concrete grades, and real MOQ benchmarks side-by-side.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A7E8D5]/15 flex items-center justify-center text-[#A7E8D5] shrink-0 mt-0.5">
              <HeartHandshake size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">KhojSetu ChoiceLoop™</p>
              <p className="text-slate-400 mt-0.5">
                Crowd-powered buyer selection feedback gives real transparency into why local buyers pick specific suppliers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#101B2D] via-slate-800 to-[#19B6A4] flex items-center justify-center text-white border border-slate-700">
                <Compass className="w-5 h-5 text-[#19B6A4]" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  KHOJ<span className="text-[#19B6A4]">SETU</span>
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  Discover. Compare. Connect.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Making India’s fragmented SME and industrial ecosystem discoverable, comparable, and directly accessible without intermediaries.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAiOnboarding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#19B6A4]/15 hover:bg-[#19B6A4]/25 text-[#A7E8D5] text-xs font-semibold border border-[#19B6A4]/30 transition-all cursor-pointer"
              >
                <Sparkles size={14} className="text-[#19B6A4]" />
                <span>AI Storefront Builder</span>
              </button>
            </div>
          </div>

          {/* Clusters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Industrial Clusters
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Sonipat Textile & Weaving Hub</li>
              <li>Panipat Shoddy Yarn & Switchgears</li>
              <li>Gurugram & Manesar Auto & Packaging</li>
              <li>Kirti Nagar Timber & Modular Furniture</li>
              <li>Khari Baoli Bulk Spices & Agro Trading</li>
              <li>Rohtak IMT Institutional Garments</li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Key Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li
                onClick={() => onCategoryClick?.('Clothing & Textiles')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Clothing & Textiles (Fabrics, Uniforms)
              </li>
              <li
                onClick={() => onCategoryClick?.('Furniture')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Furniture (Modular Desks, Hardwood)
              </li>
              <li
                onClick={() => onCategoryClick?.('Electrical Supplies')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Electrical Supplies (Panels, Switchgears)
              </li>
              <li
                onClick={() => onCategoryClick?.('Packaging')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Packaging (Corrugated Boxes, Mailers)
              </li>
              <li
                onClick={() => onCategoryClick?.('Construction Materials')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Construction (Interlocking Pavers)
              </li>
            </ul>
          </div>

          {/* Demo Prototype Transparency */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-2 flex items-center gap-1.5">
              <span>Prototype Transparency</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              This interactive platform is an investor and product demonstration prototype. All vendor profiles, certificates, and ratings are simulated test data designed to illustrate real India SME procurement workflows.
            </p>
            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-2 flex items-center justify-between">
              <span>Build Version 1.0.4-demo</span>
              <span className="text-emerald-400">Status: All Systems Active</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} KhojSetu Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Seller Code of Conduct</span>
            <span className="hover:text-slate-400 cursor-pointer">ChoiceLoop Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
