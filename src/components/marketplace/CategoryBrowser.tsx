import React from 'react';
import { CATEGORIES_LIST } from '../../data/mockData';
import {
  Shirt,
  Armchair,
  Cpu,
  Zap,
  Building2,
  Package,
  Apple,
  Wrench,
  Briefcase,
  Home,
  ArrowRight
} from 'lucide-react';

interface CategoryBrowserProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-[#19B6A4]" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-[#19B6A4]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#19B6A4]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#19B6A4]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#19B6A4]" />;
      case 'Package':
        return <Package className="w-5 h-5 text-[#19B6A4]" />;
      case 'Apple':
        return <Apple className="w-5 h-5 text-[#19B6A4]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#19B6A4]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#19B6A4]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#19B6A4]" />;
      default:
        return <Package className="w-5 h-5 text-[#19B6A4]" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#19B6A4] mb-1">
            Browse By Industry
          </div>
          <h2 className="text-2xl font-extrabold text-[#101B2D] tracking-tight font-display">
            Explore Category Ecosystems
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Each category features tailored comparison metrics (GSM, dimensions, rated voltage, ply specs)
          </p>
        </div>

        {selectedCategory && (
          <button
            onClick={() => onSelectCategory('')}
            className="text-xs font-semibold text-[#19B6A4] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Show All Categories
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(isSelected ? '' : cat.name)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-[#19B6A4] bg-teal-50/60 shadow-md ring-2 ring-[#19B6A4]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#19B6A4]/20 text-[#19B6A4]'
                        : 'bg-slate-100 group-hover:bg-[#19B6A4]/10'
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {cat.count}+
                  </span>
                </div>

                <h3 className="font-bold text-xs sm:text-sm text-[#101B2D] group-hover:text-[#19B6A4] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-[#19B6A4]">
                <span className="truncate max-w-[100px]">{cat.popularSpecs[0]}</span>
                <ArrowRight size={12} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
