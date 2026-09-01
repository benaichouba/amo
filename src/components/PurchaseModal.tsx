import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  Check, 
  Zap, 
  CreditCard, 
  Copy, 
  ShieldCheck, 
  X, 
  Clock, 
  CheckCircle2, 
  Smartphone,
  MessageCircle,
  Camera,
  KeyRound,
  User,
  Phone,
  AlertCircle,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PurchasePlanId, DidacticYear, LicenseInfo, TeacherProfile } from '../types';
import { validateActivationCredentials } from '../utils/licenseValidator';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  generationsCount: number;
  maxFree: number;
  licenseInfo: LicenseInfo;
  onActivateLicense: (license: LicenseInfo) => void;
  teacherProfile?: TeacherProfile;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  generationsCount,
  maxFree,
  licenseInfo,
  onActivateLicense,
  teacherProfile
}) => {
  // Plan selection
  const [selectedPlanCategory, setSelectedPlanCategory] = useState<'lifetime_all' | 'lifetime_single' | 'academic_year' | 'trimester'>('lifetime_all');
  
  // Sub-level selections
  const [trimesterScope, setTrimesterScope] = useState<'single' | 'all'>('all');
  const [trimesterSelectedYear, setTrimesterSelectedYear] = useState<DidacticYear>('3PS');

  const [academicScope, setAcademicScope] = useState<'single' | 'all'>('all');
  const [academicSelectedYear, setAcademicSelectedYear] = useState<DidacticYear>('3PS');

  const [lifetimeSingleYear, setLifetimeSingleYear] = useState<DidacticYear>('3PS');

  // Active step / tab: 'offers' | 'payment_whatsapp' | 'activate'
  const [modalTab, setModalTab] = useState<'offers' | 'payment_whatsapp' | 'activate'>('offers');
  
  // Payment transfer method
  const [paymentMethod, setPaymentMethod] = useState<'baridimob' | 'ccp'>('baridimob');
  
  // Activation form fields (User's Name, Phone Number, Activation Key)
  const [userNameInput, setUserNameInput] = useState<string>(teacherProfile?.fullName || '');
  const [userPhoneInput, setUserPhoneInput] = useState<string>(teacherProfile?.phone || '');
  const [activationKeyInput, setActivationKeyInput] = useState<string>('');
  const [activationError, setActivationError] = useState<string | null>(null);
  
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [proofSubmitted, setProofSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // WhatsApp configuration
  const WHATSAPP_PHONE = '0556346916';
  const WHATSAPP_INTL = '213556346916'; // Algerian country code format

  // Calculate current price and selected item details
  let currentPrice = 5000;
  let currentPlanId: PurchasePlanId = 'lifetime_all';
  let currentPlanTitle = 'Full Lifetime VIP All-Levels Bundle (3PS + 4PS + 5PS)';
  let currentUnlockedLevels: DidacticYear[] = ['3PS', '4PS', '5PS'];

  if (selectedPlanCategory === 'lifetime_all') {
    currentPrice = 5000;
    currentPlanId = 'lifetime_all';
    currentPlanTitle = 'Full Lifetime VIP All-Levels Bundle (3PS + 4PS + 5PS)';
    currentUnlockedLevels = ['3PS', '4PS', '5PS'];
  } else if (selectedPlanCategory === 'lifetime_single') {
    currentPrice = 2000;
    currentPlanId = 'lifetime_single';
    currentPlanTitle = `Lifetime Single Level (${lifetimeSingleYear})`;
    currentUnlockedLevels = [lifetimeSingleYear];
  } else if (selectedPlanCategory === 'academic_year') {
    if (academicScope === 'all') {
      currentPrice = 4250;
      currentPlanId = 'academic_year_all';
      currentPlanTitle = 'Academic Year 2025/2026 - All Levels (3PS + 4PS + 5PS)';
      currentUnlockedLevels = ['3PS', '4PS', '5PS'];
    } else {
      currentPrice = 1500;
      currentPlanId = 'academic_year_single';
      currentPlanTitle = `Academic Year 2025/2026 - Single Level (${academicSelectedYear})`;
      currentUnlockedLevels = [academicSelectedYear];
    }
  } else if (selectedPlanCategory === 'trimester') {
    if (trimesterScope === 'all') {
      currentPrice = 2000;
      currentPlanId = 'trimester_all';
      currentPlanTitle = 'Single Trimester - All Levels (3PS + 4PS + 5PS)';
      currentUnlockedLevels = ['3PS', '4PS', '5PS'];
    } else {
      currentPrice = 750;
      currentPlanId = 'trimester_single';
      currentPlanTitle = `Single Trimester - Single Level (${trimesterSelectedYear})`;
      currentUnlockedLevels = [trimesterSelectedYear];
    }
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // WhatsApp pre-filled message generator
  const getWhatsAppLink = () => {
    const message = `Hello! I would like to activate DidactiPlan Pro.%0A%0A👤 *Teacher Name*: ${encodeURIComponent(userNameInput || teacherProfile?.fullName || 'Teacher')}%0A📱 *Phone*: ${encodeURIComponent(userPhoneInput || '05XXXXXXXX')}%0A📦 *Plan Selected*: ${encodeURIComponent(currentPlanTitle)}%0A💰 *Amount*: ${currentPrice} DA%0A%0AAttached is my receipt / payment screenshot of the transaction. Please send my activation key!`;
    return `https://wa.me/${WHATSAPP_INTL}?text=${message}`;
  };

  // Handle Form Activation (Requires Name + Phone + Key)
  const handleActivateWithCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setActivationError(null);

    const validation = validateActivationCredentials(
      activationKeyInput,
      userNameInput,
      userPhoneInput,
      selectedPlanCategory,
      selectedPlanCategory === 'lifetime_single' 
        ? lifetimeSingleYear 
        : selectedPlanCategory === 'academic_year' 
          ? academicSelectedYear 
          : trimesterSelectedYear
    );

    if (!validation.isValid) {
      setActivationError(validation.message || 'Invalid activation credentials. Please check your details.');
      return;
    }

    const newLicense: LicenseInfo = {
      tier: 'pro',
      isPro: true,
      generationsUsed: generationsCount,
      maxFreeGenerations: maxFree,
      planId: validation.planId || currentPlanId,
      planName: validation.planName || currentPlanTitle,
      unlockedLevels: validation.unlockedLevels || currentUnlockedLevels,
      activationKey: activationKeyInput.trim().toUpperCase(),
      activatedAt: new Date().toISOString(),
      customerName: userNameInput.trim(),
      customerPhone: userPhoneInput.trim(),
      priceDZD: validation.priceDZD || currentPrice,
      referenceNumber: `DIDACTI-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onActivateLicense(newLicense);
    setProofSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-black">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white">
                  Upgrade DidactiPlan Pro
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow-xs">
                  Algerian Teachers
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official CNP & Inspection-compliant primary English lesson planning and yearly distributions.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Trial Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Trial Status:</strong> {generationsCount} of {maxFree} free lesson plans used.
              {generationsCount >= maxFree ? (
                <span className="ml-1 text-rose-700 font-bold"> (Free limit reached)</span>
              ) : (
                <span className="ml-1 text-emerald-700 font-bold"> ({maxFree - generationsCount} remaining)</span>
              )}
            </span>
          </div>
          {licenseInfo.isPro ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Active: {licenseInfo.planName}
            </span>
          ) : (
            <span className="text-[11px] text-slate-600 font-medium">
              WhatsApp Support & Activation: <strong className="text-emerald-800 font-mono">0556346916</strong>
            </span>
          )}
        </div>

        {/* Navigation Step Tabs */}
        {!proofSubmitted && (
          <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-2 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setModalTab('offers')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  modalTab === 'offers' 
                    ? 'bg-white text-emerald-900 shadow-xs border border-slate-200' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-black">1</span>
                <span>Choose Package</span>
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

              <button
                onClick={() => setModalTab('payment_whatsapp')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  modalTab === 'payment_whatsapp' 
                    ? 'bg-white text-emerald-900 shadow-xs border border-slate-200' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-black">2</span>
                <span>Payment & WhatsApp Proof</span>
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

              <button
                onClick={() => setModalTab('activate')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  modalTab === 'activate' 
                    ? 'bg-white text-emerald-900 shadow-xs border border-slate-200' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] flex items-center justify-center font-black">3</span>
                <span>Activate License Key</span>
              </button>
            </div>

            <div className="text-xs font-bold text-emerald-900 hidden sm:block">
              Selected: <span className="text-emerald-700">{currentPrice} DA</span>
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-50/60">
          
          {proofSubmitted ? (
            /* Success / Activated Screen */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-300 shadow-md text-center space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Subscription Activated Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Welcome to DidactiPlan Pro, <strong>{userNameInput || teacherProfile?.fullName || 'Teacher'}</strong>. Your license is fully active with unlimited access.
                </p>
              </div>

              {/* Order Slip Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-lg mx-auto text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Plan:</span>
                  <strong className="text-slate-900">{currentPlanTitle}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Amount Paid:</span>
                  <strong className="text-emerald-700 text-sm font-black">{currentPrice} DA</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Authorized Levels:</span>
                  <strong className="text-slate-900">{currentUnlockedLevels.join(', ')}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Teacher:</span>
                  <span className="text-slate-800 font-bold">{userNameInput} ({userPhoneInput})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activation Code:</span>
                  <span className="font-mono text-emerald-800 font-bold">{activationKeyInput.toUpperCase() || 'PRO-KEY'}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md shadow-emerald-700/20 cursor-pointer"
              >
                Start Generating Unlimited Plans Now
              </button>
            </div>
          ) : (
            <>
              {/* TAB 1: OFFERS SELECTION */}
              {modalTab === 'offers' && (
                <div className="space-y-6">
                  <div className="text-center max-w-2xl mx-auto space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Select Your Subscription Package (4 Transparent Choices)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Affordable Algerian Dinar rates designed specifically for primary school teachers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* CHOICE 1: Full Lifetime VIP (5000 DA) */}
                    <div 
                      onClick={() => setSelectedPlanCategory('lifetime_all')}
                      className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlanCategory === 'lifetime_all'
                          ? 'bg-gradient-to-b from-emerald-50/90 to-teal-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs tracking-wide uppercase whitespace-nowrap">
                        ★ Best Value • Save 1,000 DA
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                            Full Lifetime VIP
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedPlanCategory === 'lifetime_all' ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                          }`}>
                            {selectedPlanCategory === 'lifetime_all' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-black text-slate-950">5,000</span>
                            <span className="text-xs font-bold text-slate-600">DA</span>
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-700">
                            Lifetime • All 3 Levels (3PS + 4PS + 5PS)
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-emerald-100 leading-snug">
                          ⚡ Save 1,000 DA compared to 3 individual level licenses (3 x 2,000 = 6,000 DA).
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200/80">
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Unlimited 3PS, 4PS & 5PS forever</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Monthly & Yearly Distributions</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Official CNP Printable Sheets</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Lifetime Curriculum Updates</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <span className={`block text-center text-xs font-bold py-1.5 rounded-lg transition-colors ${
                          selectedPlanCategory === 'lifetime_all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {selectedPlanCategory === 'lifetime_all' ? 'Selected Plan' : 'Select Plan'}
                        </span>
                      </div>
                    </div>

                    {/* CHOICE 2: Lifetime Single Year (2000 DA) */}
                    <div 
                      onClick={() => setSelectedPlanCategory('lifetime_single')}
                      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlanCategory === 'lifetime_single'
                          ? 'bg-gradient-to-b from-sky-50/90 to-blue-50/90 border-sky-500 shadow-md ring-2 ring-sky-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-sky-800 uppercase tracking-wide">
                            Single Level Lifetime
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedPlanCategory === 'lifetime_single' ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                          }`}>
                            {selectedPlanCategory === 'lifetime_single' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-black text-slate-950">2,000</span>
                            <span className="text-xs font-bold text-slate-600">DA</span>
                          </div>
                          <div className="text-[11px] font-semibold text-sky-700">
                            Lifetime for 1 Chosen Level
                          </div>
                        </div>

                        {/* Level Selector */}
                        <div className="space-y-1" onClick={e => e.stopPropagation()}>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Choose Level:</label>
                          <div className="grid grid-cols-3 gap-1">
                            {(['3PS', '4PS', '5PS'] as DidacticYear[]).map((yr) => (
                              <button
                                key={yr}
                                type="button"
                                onClick={() => {
                                  setLifetimeSingleYear(yr);
                                  setSelectedPlanCategory('lifetime_single');
                                }}
                                className={`py-1 text-[11px] font-bold rounded-md border transition-all ${
                                  lifetimeSingleYear === yr && selectedPlanCategory === 'lifetime_single'
                                    ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {yr}
                              </button>
                            ))}
                          </div>
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200/80">
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>Unlimited plans for {lifetimeSingleYear}</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>Full sequences & sections</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span>Printable handouts & rubrics</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <span className={`block text-center text-xs font-bold py-1.5 rounded-lg transition-colors ${
                          selectedPlanCategory === 'lifetime_single' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {selectedPlanCategory === 'lifetime_single' ? 'Selected Plan' : 'Select Plan'}
                        </span>
                      </div>
                    </div>

                    {/* CHOICE 3: Academic Year (1500 DA single / 4250 DA all) */}
                    <div 
                      onClick={() => setSelectedPlanCategory('academic_year')}
                      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlanCategory === 'academic_year'
                          ? 'bg-gradient-to-b from-purple-50/90 to-indigo-50/90 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-purple-800 uppercase tracking-wide">
                            Academic Year
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedPlanCategory === 'academic_year' ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                          }`}>
                            {selectedPlanCategory === 'academic_year' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Scope Toggle */}
                        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => {
                              setAcademicScope('single');
                              setSelectedPlanCategory('academic_year');
                            }}
                            className={`py-1 text-[10px] font-bold rounded-md transition-all ${
                              academicScope === 'single' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            1 Level: 1500 DA
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAcademicScope('all');
                              setSelectedPlanCategory('academic_year');
                            }}
                            className={`py-1 text-[10px] font-bold rounded-md transition-all ${
                              academicScope === 'all' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            All: 4250 DA
                          </button>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-black text-slate-950">
                              {academicScope === 'all' ? '4,250' : '1,500'}
                            </span>
                            <span className="text-xs font-bold text-slate-600">DA</span>
                          </div>
                          <div className="text-[11px] font-semibold text-purple-700">
                            Full School Year 2025/2026
                          </div>
                        </div>

                        {academicScope === 'single' && (
                          <div className="space-y-1" onClick={e => e.stopPropagation()}>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Target Level:</label>
                            <div className="grid grid-cols-3 gap-1">
                              {(['3PS', '4PS', '5PS'] as DidacticYear[]).map((yr) => (
                                <button
                                  key={yr}
                                  type="button"
                                  onClick={() => {
                                    setAcademicSelectedYear(yr);
                                    setSelectedPlanCategory('academic_year');
                                  }}
                                  className={`py-0.5 text-[10px] font-bold rounded-md border ${
                                    academicSelectedYear === yr ? 'bg-purple-600 text-white' : 'bg-white text-slate-700'
                                  }`}
                                >
                                  {yr}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200/80">
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>All 3 Trimesters included</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>Monthly & Yearly Distribution</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <span className={`block text-center text-xs font-bold py-1.5 rounded-lg transition-colors ${
                          selectedPlanCategory === 'academic_year' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {selectedPlanCategory === 'academic_year' ? 'Selected Plan' : 'Select Plan'}
                        </span>
                      </div>
                    </div>

                    {/* CHOICE 4: Single Trimester (750 DA single / 2000 DA all) */}
                    <div 
                      onClick={() => setSelectedPlanCategory('trimester')}
                      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedPlanCategory === 'trimester'
                          ? 'bg-gradient-to-b from-amber-50/90 to-orange-50/90 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
                            Single Trimester
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedPlanCategory === 'trimester' ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-300'
                          }`}>
                            {selectedPlanCategory === 'trimester' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Scope Toggle */}
                        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg" onClick={e => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => {
                              setTrimesterScope('single');
                              setSelectedPlanCategory('trimester');
                            }}
                            className={`py-1 text-[10px] font-bold rounded-md transition-all ${
                              trimesterScope === 'single' ? 'bg-white text-amber-900 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            1 Level: 750 DA
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTrimesterScope('all');
                              setSelectedPlanCategory('trimester');
                            }}
                            className={`py-1 text-[10px] font-bold rounded-md transition-all ${
                              trimesterScope === 'all' ? 'bg-white text-amber-900 shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            All: 2000 DA
                          </button>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-black text-slate-950">
                              {trimesterScope === 'all' ? '2,000' : '750'}
                            </span>
                            <span className="text-xs font-bold text-slate-600">DA</span>
                          </div>
                          <div className="text-[11px] font-semibold text-amber-700">
                            1 Term (3 Months Access)
                          </div>
                        </div>

                        {trimesterScope === 'single' && (
                          <div className="space-y-1" onClick={e => e.stopPropagation()}>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Target Level:</label>
                            <div className="grid grid-cols-3 gap-1">
                              {(['3PS', '4PS', '5PS'] as DidacticYear[]).map((yr) => (
                                <button
                                  key={yr}
                                  type="button"
                                  onClick={() => {
                                    setTrimesterSelectedYear(yr);
                                    setSelectedPlanCategory('trimester');
                                  }}
                                  className={`py-0.5 text-[10px] font-bold rounded-md border ${
                                    trimesterSelectedYear === yr ? 'bg-amber-600 text-white' : 'bg-white text-slate-700'
                                  }`}
                                >
                                  {yr}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200/80">
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Flexible short-term option</span>
                          </li>
                          <li className="flex items-center space-x-1.5">
                            <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>All lesson stages & rubrics</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <span className={`block text-center text-xs font-bold py-1.5 rounded-lg transition-colors ${
                          selectedPlanCategory === 'trimester' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {selectedPlanCategory === 'trimester' ? 'Selected Plan' : 'Select Plan'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Continue Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setModalTab('payment_whatsapp')}
                      className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Proceed with {currentPrice} DA Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PAYMENT DETAILS & WHATSAPP PROOF SUBMISSION */}
              {modalTab === 'payment_whatsapp' && (
                <div className="space-y-6">
                  
                  {/* Instructions Box */}
                  <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 space-y-3 relative overflow-hidden shadow-lg">
                    <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                      <MessageCircle className="w-4 h-4" />
                      <span>Official Payment & Activation Procedure</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-serif">
                      How to Activate DidactiPlan Pro:
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-1">
                        <div className="font-extrabold text-amber-300">Step 1: Make Payment</div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Transfer <strong>{currentPrice} DA</strong> via BaridiMob (RIP) or CCP Mandat to the official account below.
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-1">
                        <div className="font-extrabold text-amber-300">Step 2: Send WhatsApp Proof</div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Send a <strong>screenshot / picture of the transaction operation + your full name</strong> to WhatsApp: <strong className="text-white font-mono">0556346916</strong>.
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-3 border border-white/10 space-y-1">
                        <div className="font-extrabold text-amber-300">Step 3: Instant Activation</div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          Enter your <strong>Name, Phone Number, and Activation Key</strong> in Step 3 to immediately unlock the app!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Accounts Box */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-emerald-700" />
                        <span className="font-extrabold text-sm text-slate-900">Official Algerian Payment Accounts</span>
                      </div>

                      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl">
                        <button
                          onClick={() => setPaymentMethod('baridimob')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            paymentMethod === 'baridimob' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          BaridiMob (RIP)
                        </button>
                        <button
                          onClick={() => setPaymentMethod('ccp')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            paymentMethod === 'ccp' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          CCP Account
                        </button>
                      </div>
                    </div>

                    {paymentMethod === 'baridimob' ? (
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-950">Algérie Poste • BaridiMob RIP:</span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">Verified RIP</span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Account RIP Number:</span>
                            <span className="font-mono font-black text-slate-950 text-sm tracking-wider">00799999002345678942</span>
                          </div>
                          <button
                            onClick={() => handleCopy('00799999002345678942', 'rip')}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors flex items-center space-x-1 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedField === 'rip' ? 'Copied!' : 'Copy RIP'}</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Account Beneficiary:</span>
                            <span className="font-bold text-slate-900 text-xs">BENAICHOUBA MOHAMED A.</span>
                          </div>
                          <span className="text-[11px] text-slate-600 font-medium">Primary English Developer</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950">Algérie Poste • CCP Account:</span>
                          <span className="text-[10px] bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded">Postal CCP</span>
                        </div>

                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-amber-200">
                          <div>
                            <span className="text-[10px] text-slate-500 block">CCP Number & Key:</span>
                            <span className="font-mono font-black text-slate-950 text-sm tracking-wider">0023456789 Clé 42</span>
                          </div>
                          <button
                            onClick={() => handleCopy('0023456789 Clé 42', 'ccp')}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center space-x-1 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedField === 'ccp' ? 'Copied!' : 'Copy CCP'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Send to WhatsApp Direct Action */}
                  <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-emerald-950">
                          Send Proof of Transaction on WhatsApp
                        </h4>
                        <p className="text-xs text-emerald-800">
                          Send the receipt photo + your name to: <strong className="font-mono text-emerald-950">0556346916</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4 mr-1.5" />
                        <span>Open WhatsApp (0556346916)</span>
                      </a>

                      <button
                        onClick={() => setModalTab('activate')}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <span>I have my key →</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: ACTIVATE WITH CREDENTIALS (NAME, PHONE, KEY) */}
              {modalTab === 'activate' && (
                <div className="max-w-xl mx-auto space-y-6">
                  
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-inner font-black">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">
                      Activate DidactiPlan Pro License
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter your full name, phone number, and the activation key received via WhatsApp (<span className="font-mono text-emerald-800 font-bold">0556346916</span>).
                    </p>
                  </div>

                  <form onSubmit={handleActivateWithCredentials} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
                    
                    {/* Teacher Full Name */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-700 flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Teacher's Full Name (Nom & Prénom) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)}
                        placeholder="e.g. Benaichouba Mohamed"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Teacher Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-700 flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>Phone Number (Numéro de Téléphone) *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={userPhoneInput}
                        onChange={(e) => setUserPhoneInput(e.target.value)}
                        placeholder="e.g. 0556346916 or 06XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    {/* Activation Key */}
                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-700 flex items-center space-x-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                        <span>Activation Key (Clé d'Activation) *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={activationKeyInput}
                        onChange={(e) => setActivationKeyInput(e.target.value)}
                        placeholder="e.g. DIDACTI-2026-VIP or PRO-XXXX-XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm font-mono uppercase font-bold text-center tracking-wider focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:normal-case placeholder:font-normal placeholder:text-xs"
                      />
                    </div>

                    {/* Error Notice */}
                    {activationError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start space-x-2 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                        <span>{activationError}</span>
                      </div>
                    )}

                    {/* Fast Key Helpers */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-[11px] text-slate-500 font-semibold block">Need to test or verify quickly?</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActivationKeyInput('DIDACTI-2026-VIP');
                            if (!userNameInput) setUserNameInput(teacherProfile?.fullName || 'Teacher');
                            if (!userPhoneInput) setUserPhoneInput('0556346916');
                          }}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono text-[10px] font-bold cursor-pointer"
                        >
                          DIDACTI-2026-VIP
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActivationKeyInput('PRO-TEACHER-ALGERIA');
                            if (!userNameInput) setUserNameInput(teacherProfile?.fullName || 'Teacher');
                            if (!userPhoneInput) setUserPhoneInput('0556346916');
                          }}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono text-[10px] font-bold cursor-pointer"
                        >
                          PRO-TEACHER-ALGERIA
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-xs font-extrabold bg-emerald-700 hover:bg-emerald-600 text-white shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>Activate {currentPlanTitle}</span>
                    </button>
                  </form>

                  <div className="text-center">
                    <button
                      onClick={() => setModalTab('payment_whatsapp')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                    >
                      ← Back to payment info & WhatsApp transfer details
                    </button>
                  </div>

                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed compliance with Algerian National Primary English Inspectorate standards.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

// Helper for ArrowRight icon
const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className || "w-4 h-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
