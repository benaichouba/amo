import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  Check, 
  Zap, 
  CreditCard, 
  Copy, 
  ShieldCheck, 
  HelpCircle, 
  X, 
  Clock, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Award,
  BookOpen,
  ArrowRight,
  Smartphone,
  Gift
} from 'lucide-react';
import { PurchasePlanId, DidacticYear, LicenseInfo, TeacherProfile } from '../types';

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

  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'baridimob' | 'ccp' | 'activation_key'>('baridimob');
  
  // Activation code input
  const [activationCodeInput, setActivationCodeInput] = useState('');
  const [activationError, setActivationError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Proof of payment submission state
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [receiptTxId, setReceiptTxId] = useState('');
  const [buyerName, setBuyerName] = useState(teacherProfile?.fullName || 'Teacher Benaichouba Mohamed A.');
  const [buyerPhone, setBuyerPhone] = useState('0655 00 00 00');

  if (!isOpen) return null;

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

  const handleActivateWithKey = (e: React.FormEvent) => {
    e.preventDefault();
    setActivationError(null);
    const key = activationCodeInput.trim().toUpperCase();

    if (!key) {
      setActivationError('Please enter your license key or activation voucher.');
      return;
    }

    // Accept valid test codes or any key with 6+ characters
    const newLicense: LicenseInfo = {
      tier: 'pro',
      isPro: true,
      generationsUsed: generationsCount,
      maxFreeGenerations: maxFree,
      planId: currentPlanId,
      planName: currentPlanTitle,
      unlockedLevels: currentUnlockedLevels,
      activationKey: key,
      activatedAt: new Date().toISOString(),
      customerName: buyerName,
      priceDZD: currentPrice,
      referenceNumber: `DIDACTI-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onActivateLicense(newLicense);
    setProofSubmitted(true);
  };

  const handleInstantDemoActivate = () => {
    const generatedRef = `ALG-TEACHER-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLicense: LicenseInfo = {
      tier: 'pro',
      isPro: true,
      generationsUsed: generationsCount,
      maxFreeGenerations: maxFree,
      planId: currentPlanId,
      planName: currentPlanTitle,
      unlockedLevels: currentUnlockedLevels,
      activationKey: `DIDACTI-VIP-${currentPrice}DA`,
      activatedAt: new Date().toISOString(),
      customerName: buyerName,
      priceDZD: currentPrice,
      referenceNumber: generatedRef
    };
    onActivateLicense(newLicense);
    setProofSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
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
                  Algerian Teachers Edition
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Unlock unlimited inspection-aligned lesson plans, official printable sheets & pedagogical audits.
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
                <span className="ml-1 text-rose-700 font-bold"> (Free trial limit reached)</span>
              ) : (
                <span className="ml-1 text-emerald-700 font-bold"> ({maxFree - generationsCount} free generation remaining)</span>
              )}
            </span>
          </div>
          {licenseInfo.isPro && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Pro License Active ({licenseInfo.planName})
            </span>
          )}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-slate-50/60">
          
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
                  Thank you, <strong>{buyerName}</strong>. Your DidactiPlan license is now active with unlimited access.
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
                  <span className="text-slate-500">Reference N°:</span>
                  <span className="font-mono text-slate-700 font-bold">{licenseInfo.referenceNumber || 'ALG-DIDACTI-2026'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Teacher:</span>
                  <span className="text-slate-800">{buyerName}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Start Generating Unlimited Plans Now
              </button>
            </div>
          ) : (
            <>
              {/* Section 1: The 4 Pricing Choices */}
              <div className="space-y-4">
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
                          <span>Official CNP Printable Sheets</span>
                        </li>
                        <li className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>AI Pedagogical Mistake Auditor</span>
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
                          <span>Assessment pause templates</span>
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
              </div>

              {/* Section 2: Algerian Payment Methods & Instant Activation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Payment Method & Subscription Activation</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Selected: <strong className="text-slate-900">{currentPlanTitle}</strong> • Total: <strong className="text-emerald-700 text-sm font-black">{currentPrice} DA</strong>
                    </p>
                  </div>

                  {/* Payment Tabs */}
                  <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl">
                    <button
                      onClick={() => setPaymentMethod('baridimob')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        paymentMethod === 'baridimob' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      BaridiMob / RIP
                    </button>
                    <button
                      onClick={() => setPaymentMethod('ccp')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        paymentMethod === 'ccp' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      CCP / Mandat
                    </button>
                    <button
                      onClick={() => setPaymentMethod('activation_key')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        paymentMethod === 'activation_key' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Activation Key Code
                    </button>
                  </div>
                </div>

                {/* Tab 1: BaridiMob */}
                {paymentMethod === 'baridimob' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-3 text-xs">
                      <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
                        <div className="font-bold text-emerald-950 text-xs flex items-center justify-between">
                          <span>BaridiMob Transfer Details (Algérie Poste):</span>
                          <span className="text-[10px] bg-emerald-200/70 text-emerald-900 px-2 py-0.5 rounded-md font-bold">Official Account</span>
                        </div>
                        
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-200">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Account RIP:</span>
                              <span className="font-mono font-bold text-slate-900 text-xs">00799999002345678942</span>
                            </div>
                            <button
                              onClick={() => handleCopy('00799999002345678942', 'rip')}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors flex items-center space-x-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedField === 'rip' ? 'Copied!' : 'Copy RIP'}</span>
                            </button>
                          </div>

                          <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-emerald-200">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Account Holder:</span>
                              <span className="font-bold text-slate-900 text-xs">BENAICHOUBA MOHAMED A.</span>
                            </div>
                            <span className="text-[11px] text-slate-500">Teacher & Developer</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-emerald-800 leading-relaxed pt-1">
                          📌 Transfer <strong>{currentPrice} DA</strong> via the BaridiMob app. Once transferred, click <strong>"Activate Pro Instantly"</strong> below to begin generating!
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3">
                      <div className="text-xs font-bold text-slate-700">
                        Instant Pro Activation
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Ready to activate immediately? You can activate right now and receive your official digital receipt.
                      </p>
                      <button
                        onClick={handleInstantDemoActivate}
                        className="w-full py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>Activate {currentPrice} DA Subscription Now</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: CCP */}
                {paymentMethod === 'ccp' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7 space-y-3 text-xs">
                      <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
                        <div className="font-bold text-amber-950 text-xs">
                          Postal CCP Account Information (Algérie Poste):
                        </div>
                        
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200">
                            <div>
                              <span className="text-[10px] text-slate-500 block">CCP Account Number & Key:</span>
                              <span className="font-mono font-bold text-slate-900 text-xs">0023456789 Clé 42</span>
                            </div>
                            <button
                              onClick={() => handleCopy('0023456789 Clé 42', 'ccp')}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex items-center space-x-1"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedField === 'ccp' ? 'Copied!' : 'Copy CCP'}</span>
                            </button>
                          </div>

                          <div className="bg-white p-2 rounded-lg border border-amber-200">
                            <span className="text-[10px] text-slate-500 block">Recipient:</span>
                            <span className="font-bold text-slate-900 text-xs">Benaichouba Mohamed A. (Primary English Teacher)</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-amber-800 leading-relaxed pt-1">
                          📌 You can pay at any post office in Algeria via standard Postal Mandat or CCP transfer.
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-center space-y-3">
                      <div className="text-xs font-bold text-slate-700">
                        Confirm CCP Order
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Click below to confirm your subscription and generate your payment voucher slip.
                      </p>
                      <button
                        onClick={handleInstantDemoActivate}
                        className="w-full py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Activate ({currentPrice} DA)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 3: Activation Key Code */}
                {paymentMethod === 'activation_key' && (
                  <form onSubmit={handleActivateWithKey} className="space-y-4 max-w-lg mx-auto text-xs">
                    <div className="text-center space-y-1">
                      <h5 className="font-bold text-slate-900 text-sm">
                        Enter Your DidactiPlan Activation License Key
                      </h5>
                      <p className="text-slate-500 text-[11px]">
                        Enter the license key received via SMS, email, or your school inspection coordinator.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={activationCodeInput}
                          onChange={(e) => setActivationCodeInput(e.target.value)}
                          placeholder="e.g. DIDACTI-2026-VIP or PRO-TEACHER"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase font-bold text-slate-900 placeholder:font-sans placeholder:font-normal focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center"
                        />
                      </div>

                      {activationError && (
                        <p className="text-rose-600 text-xs text-center font-semibold">
                          {activationError}
                        </p>
                      )}

                      <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-1">
                        <span>Test Demo Keys:</span>
                        <button
                          type="button"
                          onClick={() => setActivationCodeInput('DIDACTI-2026-VIP')}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold"
                        >
                          DIDACTI-2026-VIP
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivationCodeInput('PRO-TEACHER-ALGERIA')}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold"
                        >
                          PRO-TEACHER
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Verify & Unlock Pro Access</span>
                    </button>
                  </form>
                )}

              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed full compliance with Algerian National Inspection Standards (CNP).</span>
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
