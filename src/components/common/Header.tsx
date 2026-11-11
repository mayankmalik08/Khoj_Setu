import React, { useState } from 'react';
import { UserRole } from '../../types';
import { POPULAR_LOCATIONS } from '../../data/mockData';
import {
  Compass,
  MapPin,
  Scale,
  Heart,
  LayoutDashboard,
  Store,
  ShieldCheck,
  User,
  RotateCcw,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  comparisonCount: number;
  savedCount: number;
  onOpenComparison: () => void;
  onOpenSaved: () => void;
  currentView: 'marketplace' | 'comparison' | 'dashboard' | 'business_profile' | 'choiceloop_directory';
  onNavigate: (view: 'marketplace' | 'comparison' | 'dashboard' | 'choiceloop_directory') => void;
  onResetDemo: () => void;
  onOpenAiOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  selectedLocation,
  onLocationChange,
  comparisonCount,
  savedCount,
  onOpenComparison,
  onOpenSaved,
  currentView,
  onNavigate,
  onResetDemo,
  onOpenAiOnboarding
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Demo Notice & Role Selector Bar */}
      <div className="bg-[#101B2D] text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#19B6A4]/20 text-[#A7E8D5] font-semibold tracking-wider text-[10px] uppercase border border-[#19B6A4]/30">
              Interactive Prototype
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Fictional Indian SME listings & simulated metrics for investor demo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDemo}
              title="Reset all demo listings, enquiries and ChoiceLoop responses back to default"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <RotateCcw size={12} />
              <span>Reset Data</span>
            </button>

            <span className="text-slate-600">|</span>

            {/* Quick Role Switcher Pill */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/80">
              <span className="text-[11px] text-slate-400 px-2 font-medium hidden md:inline">
                Viewing As:
              </span>
              <button
                onClick={() => onRoleChange('customer')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  currentRole === 'customer'
                    ? 'bg-[#19B6A4] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <User size={13} />
                <span>Customer</span>
              </button>

              <button
                onClick={() => onRoleChange('seller')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  currentRole === 'seller'
                    ? 'bg-[#19B6A4] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Store size={13} />
                <span>Seller / SME</span>
              </button>

              <button
                onClick={() => onRoleChange('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  currentRole === 'admin'
                    ? 'bg-[#19B6A4] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ShieldCheck size={13} />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('marketplace')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#101B2D] via-[#101B2D] to-[#19B6A4] flex items-center justify-center text-white shadow-md shadow-[#19B6A4]/15 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-[#19B6A4]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-[#101B2D] font-display">
                    KHOJ<span className="text-[#19B6A4]">SETU</span>
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  Discover. Compare. Connect.
                </p>
              </div>
            </button>

            {/* Location Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                <MapPin size={14} className="text-[#19B6A4]" />
                <span className="max-w-[140px] truncate">{selectedLocation}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Select Cluster / Region
                  </div>
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onLocationChange(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                        selectedLocation === loc
                          ? 'text-[#19B6A4] font-semibold bg-teal-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('marketplace')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'marketplace'
                  ? 'text-[#19B6A4] bg-teal-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Browse Marketplace
            </button>

            <button
              onClick={onOpenComparison}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'comparison'
                  ? 'text-[#19B6A4] bg-teal-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Scale size={16} />
              <span>Compare Engine</span>
              {comparisonCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold bg-[#19B6A4] text-white">
                  {comparisonCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'text-[#19B6A4] bg-teal-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>
                {currentRole === 'customer'
                  ? 'My Dashboard'
                  : currentRole === 'seller'
                  ? 'Seller Console'
                  : 'Admin Panel'}
              </span>
            </button>
          </nav>

          {/* Right Action Icons & Onboarding */}
          <div className="flex items-center gap-2.5">
            {/* AI Onboarding Button for Sellers or Curious Users */}
            <button
              onClick={onOpenAiOnboarding}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[#101B2D] to-slate-800 text-white hover:to-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer border border-slate-700 hover:border-slate-600"
            >
              <Sparkles size={14} className="text-[#19B6A4]" />
              <span>AI Onboarding</span>
            </button>

            {/* Saved Shortlist Button */}
            <button
              onClick={onOpenSaved}
              title="View saved businesses shortlist"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Heart size={20} className={savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('marketplace');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Browse Marketplace
            </button>
            <button
              onClick={() => {
                onOpenComparison();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Scale size={16} /> Compare Engine
              </span>
              {comparisonCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#19B6A4] text-white text-xs font-bold">
                  {comparisonCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <LayoutDashboard size={16} />
              <span>
                {currentRole === 'customer'
                  ? 'My Dashboard'
                  : currentRole === 'seller'
                  ? 'Seller Console'
                  : 'Admin Panel'}
              </span>
            </button>
            <button
              onClick={() => {
                onOpenAiOnboarding();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-teal-700 bg-teal-50 flex items-center gap-2"
            >
              <Sparkles size={16} className="text-[#19B6A4]" />
              <span>AI SME Onboarding Assistant</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2">Location:</div>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 bg-slate-50"
            >
              {POPULAR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
