import React, { useState, useEffect } from 'react';
import { 
  User, 
  School, 
  Users, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Phone,
  ArrowRight,
  Lock,
  Wifi,
  KeyRound,
  Info
} from 'lucide-react';
import { TeacherProfile, ACADEMIC_YEARS_LIST } from '../types';

interface RegistrationGateModalProps {
  isOpen: boolean;
  onRegisteredSuccess: (profile: TeacherProfile) => void;
  onOpenActivationKeyModal?: () => void;
  ipAddress?: string;
  initialProfile?: TeacherProfile;
}

export const RegistrationGateModal: React.FC<RegistrationGateModalProps> = ({
  isOpen,
  onRegisteredSuccess,
  onOpenActivationKeyModal,
  ipAddress,
  initialProfile
}) => {
  const [fullName, setFullName] = useState(initialProfile?.fullName || '');
  const [phone, setPhone] = useState(initialProfile?.phone || '');
  const [schoolName, setSchoolName] = useState(initialProfile?.schoolName || '');
  const [district, setDistrict] = useState(initialProfile?.district || '');
  const [academicYear, setAcademicYear] = useState(initialProfile?.academicYear || '2026 / 2027');
  
  const [learners3PS, setLearners3PS] = useState<number>(initialProfile?.learners3PS || 0);
  const [learners4PS, setLearners4PS] = useState<number>(initialProfile?.learners4PS || 0);
  const [learners5PS, setLearners5PS] = useState<number>(initialProfile?.learners5PS || 0);
  
  const [classesCount3PS, setClassesCount3PS] = useState<number>(initialProfile?.classesCount3PS || 1);
  const [classesCount4PS, setClassesCount4PS] = useState<number>(initialProfile?.classesCount4PS || 1);
  const [classesCount5PS, setClassesCount5PS] = useState<number>(initialProfile?.classesCount5PS || 1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.fullName) setFullName(initialProfile.fullName);
      if (initialProfile.phone) setPhone(initialProfile.phone);
      if (initialProfile.schoolName) setSchoolName(initialProfile.schoolName);
      if (initialProfile.district) setDistrict(initialProfile.district);
      if (initialProfile.academicYear) setAcademicYear(initialProfile.academicYear);
    }
  }, [initialProfile]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg('Please enter your full teacher name (Nom & Prénom).');
      return;
    }

    if (!schoolName.trim()) {
      setErrorMsg('Please enter the name of your primary school.');
      return;
    }

    setIsSubmitting(true);

    const profileData: TeacherProfile = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      schoolName: schoolName.trim(),
      district: district.trim(),
      academicYear: academicYear.trim() || '2026 / 2027',
      learners3PS: Math.max(0, Number(learners3PS) || 0),
      learners4PS: Math.max(0, Number(learners4PS) || 0),
      learners5PS: Math.max(0, Number(learners5PS) || 0),
      classesCount3PS: Math.max(1, Number(classesCount3PS) || 1),
      classesCount4PS: Math.max(1, Number(classesCount4PS) || 1),
      classesCount5PS: Math.max(1, Number(classesCount5PS) || 1)
    };

    try {
      // Register with the server (binding to device IP)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teacherProfile: profileData })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server registration failed');
      }

      onRegisteredSuccess(data.teacherProfile || profileData);
    } catch (err: any) {
      console.warn('Network registration error, falling back to local registration:', err);
      // Fallback local save if offline
      onRegisteredSuccess(profileData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 font-black shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                  Welcome to DidactiPlan
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950 shadow-xs uppercase">
                  Device Registration
                </span>
              </div>
              <p className="text-xs text-emerald-200 mt-1">
                Algerian Primary English Pedagogical Suite (3PS • 4PS • 5PS)
              </p>
            </div>
          </div>

          {/* Device IP Security Notice */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                Device IP Protected: <strong className="font-mono text-emerald-300">{ipAddress || 'Checking Device...'}</strong>
              </span>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-emerald-200 font-medium">
              3 Free Plans Included
            </span>
          </div>
        </div>

        {/* Informative Step Message */}
        <div className="bg-emerald-50/80 border-b border-emerald-200/80 px-6 py-3 flex items-center justify-between text-xs text-emerald-950">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Please complete your registration to automatically link this device and format your lesson sheets.
            </span>
          </div>
          {onOpenActivationKeyModal && (
            <button
              type="button"
              onClick={onOpenActivationKeyModal}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 underline flex items-center space-x-1 cursor-pointer shrink-0 ml-2"
            >
              <KeyRound className="w-3 h-3 mr-0.5" />
              <span>Have a Key?</span>
            </button>
          )}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[72vh] overflow-y-auto bg-slate-50/50">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center space-x-2">
              <span className="font-bold">Error:</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Teacher Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Teacher's Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Benaichouba Mohamed A."
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Official Name printed on all session and monthly sheets.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Phone Number (WhatsApp)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0556346916"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Used for instant license verification and WhatsApp updates.</p>
            </div>
          </div>

          {/* School Name & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Primary School Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <School className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Ecole Primaire Emir Abdelkader"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                District / Inspection Wilaya
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. District 01 - Mostaganem"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Academic School Year
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer shadow-xs"
              >
                {ACADEMIC_YEARS_LIST.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr} {yr === '2026 / 2027' ? '(Current Academic Year)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Classes & Learners Count */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <label className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                  Classes Taught & Pupils Count (3PS, 4PS, 5PS)
                </label>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Customizable
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 3PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="text-xs font-extrabold text-emerald-900">3PS Level</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Classes:</span>
                    <input
                      type="number"
                      min={1}
                      value={classesCount3PS}
                      onChange={(e) => setClassesCount3PS(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Pupils:</span>
                    <input
                      type="number"
                      min={0}
                      value={learners3PS}
                      onChange={(e) => setLearners3PS(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50 text-emerald-900"
                    />
                  </div>
                </div>
              </div>

              {/* 4PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="text-xs font-extrabold text-emerald-900">4PS Level</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Classes:</span>
                    <input
                      type="number"
                      min={1}
                      value={classesCount4PS}
                      onChange={(e) => setClassesCount4PS(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Pupils:</span>
                    <input
                      type="number"
                      min={0}
                      value={learners4PS}
                      onChange={(e) => setLearners4PS(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50 text-emerald-900"
                    />
                  </div>
                </div>
              </div>

              {/* 5PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-1.5">
                <div className="text-xs font-extrabold text-emerald-900">5PS Level</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Classes:</span>
                    <input
                      type="number"
                      min={1}
                      value={classesCount5PS}
                      onChange={(e) => setClassesCount5PS(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-slate-500 block">Pupils:</span>
                    <input
                      type="number"
                      min={0}
                      value={learners5PS}
                      onChange={(e) => setLearners5PS(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs font-bold border border-slate-200 rounded-lg text-center bg-slate-50 text-emerald-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
            >
              <span>{isSubmitting ? 'Registering Device...' : 'Complete Registration & Open DidactiPlan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 flex items-center justify-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Securely bound to this device. You can update your profile anytime.</span>
          </div>

        </form>

      </div>
    </div>
  );
};
