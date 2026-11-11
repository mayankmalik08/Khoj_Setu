import React, { useState } from 'react';
import { UserRole, AuthUser } from '../../types';
import {
  Compass,
  X,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
  Sparkles,
  Phone,
  Eye,
  EyeOff
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onAuthSuccess: (user: AuthUser, selectedRole: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'role_select'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pending user while choosing role
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(currentUser);
  const [chosenRole, setChosenRole] = useState<UserRole>('customer');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: 'customer',
      companyName: companyName || 'Procurement Enterprises'
    };

    setAuthenticatedUser(user);
    setMode('role_select');
    setErrorMsg('');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      name: fullName,
      email,
      role: chosenRole,
      companyName: companyName || undefined,
      phone: phone || undefined
    };

    setAuthenticatedUser(user);
    setMode('role_select');
    setErrorMsg('');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    let demoUser: AuthUser;
    if (role === 'seller') {
      demoUser = {
        id: 'usr-seller',
        name: 'Ramesh Sharma',
        email: 'ramesh@balajitexsonipat.in',
        role: 'seller',
        companyName: 'Shree Balaji Textiles (Sonipat Hub)',
        phone: '+91 98120 44812'
      };
    } else if (role === 'admin') {
      demoUser = {
        id: 'usr-admin',
        name: 'Virendra Singh',
        email: 'admin@khojsetu.in',
        role: 'admin',
        companyName: 'KhojSetu Platform Compliance Unit'
      };
    } else {
      demoUser = {
        id: 'usr-cust',
        name: 'Arjun Singhania',
        email: 'arjun@singhaniatraders.in',
        role: 'customer',
        companyName: 'Singhania Trading & Retails Pvt Ltd',
        phone: '+91 98712 34567'
      };
    }

    setAuthenticatedUser(demoUser);
    setChosenRole(role);
    onAuthSuccess(demoUser, role);
    onClose();
  };

  const handleConfirmRoleSelection = () => {
    if (!authenticatedUser) return;
    const finalUser: AuthUser = {
      ...authenticatedUser,
      role: chosenRole
    };
    onAuthSuccess(finalUser, chosenRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#101B2D] via-[#14233A] to-[#101B2D] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#101B2D] to-[#19B6A4] flex items-center justify-center text-white border border-[#19B6A4]/30">
              <Compass className="w-5 h-5 text-[#19B6A4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight font-display">
                  KHOJ<span className="text-[#19B6A4]">SETU</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#19B6A4]/20 text-[#A7E8D5] border border-[#19B6A4]/30">
                  Authentication
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Discover. Compare. Connect.
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

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 2: ROLE SELECTION SCREEN */}
          {mode === 'role_select' ? (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 mx-auto flex items-center justify-center text-[#19B6A4] mb-2">
                  <CheckCircle2 size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-extrabold text-[#101B2D]">
                  Welcome to KhojSetu, {authenticatedUser?.name}!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Select your primary operating role. You can switch roles at any time using the header bar.
                </p>
              </div>

              {/* Role Cards */}
              <div className="space-y-3">
                <div
                  onClick={() => setChosenRole('customer')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    chosenRole === 'customer'
                      ? 'border-[#19B6A4] bg-teal-50/70 shadow-xs ring-2 ring-[#19B6A4]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      chosenRole === 'customer'
                        ? 'bg-[#19B6A4] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <User size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#101B2D]">
                        Customer / Procurement Buyer
                      </h4>
                      {chosenRole === 'customer' && (
                        <CheckCircle2 size={16} className="text-[#19B6A4]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Discover verified manufacturers & stockists, run side-by-side spec comparisons, submit RFQs, and track supplier quotes.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setChosenRole('seller')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    chosenRole === 'seller'
                      ? 'border-[#19B6A4] bg-teal-50/70 shadow-xs ring-2 ring-[#19B6A4]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      chosenRole === 'seller'
                        ? 'bg-[#19B6A4] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Store size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#101B2D]">
                        Business / Supplier Storefront
                      </h4>
                      {chosenRole === 'seller' && (
                        <CheckCircle2 size={16} className="text-[#19B6A4]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Manage factory storefront, showcase products with MOQ and lead times, receive direct enquiries, and dispatch commercial quotes.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmRoleSelection}
                className="w-full py-3 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold shadow-md shadow-[#19B6A4]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>
                  Proceed to {chosenRole === 'customer' ? 'Customer Marketplace' : 'Seller Console'}
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            /* STEP 1: LOGIN OR SIGNUP */
            <div className="space-y-5">
              {/* Login / Signup Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-white text-[#101B2D] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-white text-[#101B2D] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              {/* Login Form */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="buyer@company.in or seller@mill.in"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-slate-800 focus:outline-none focus:border-[#19B6A4] focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#101B2D] hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Sign In with Email
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {mode === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98120 ..."
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business / Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Balaji Textiles or Singhania Retails"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@yourdomain.com"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password *
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create secure password"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#19B6A4]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#19B6A4] hover:bg-[#16a493] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#19B6A4]/20"
                  >
                    Create Account & Choose Role
                  </button>
                </form>
              )}

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                  Or One-Click Demo Sign In:
                </span>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('customer')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#19B6A4] hover:bg-teal-50/50 text-left transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 text-[#19B6A4] flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">
                          Demo Customer (Arjun Singhania)
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Procurement Buyer • Singhania Trading
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('seller')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#19B6A4] hover:bg-teal-50/50 text-left transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Store size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">
                          Demo Seller (Ramesh Sharma)
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Manufacturer • Shree Balaji Textiles
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#19B6A4] hover:bg-teal-50/50 text-left transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                        <ShieldCheck size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">
                          Demo Admin (Virendra Singh)
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Platform Compliance & Moderation
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
