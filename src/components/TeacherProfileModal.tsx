import React, { useState, useEffect } from 'react';
import { 
  User, 
  School, 
  Users, 
  MapPin, 
  Calendar, 
  Save, 
  X, 
  CheckCircle2, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { TeacherProfile } from '../types';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TeacherProfile;
  onSaveProfile: (profile: TeacherProfile) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [fullName, setFullName] = useState(profile.fullName || 'Teacher Benaichouba Mohamed A.');
  const [schoolName, setSchoolName] = useState(profile.schoolName || 'Ziani Mohamed Primary School');
  const [district, setDistrict] = useState(profile.district || '');
  const [academicYear, setAcademicYear] = useState(profile.academicYear || '2025 / 2026');
  const [learners3PS, setLearners3PS] = useState<number>(profile.learners3PS || 32);
  const [learners4PS, setLearners4PS] = useState<number>(profile.learners4PS || 34);
  const [learners5PS, setLearners5PS] = useState<number>(profile.learners5PS || 30);
  const [classesCount3PS, setClassesCount3PS] = useState<number>(profile.classesCount3PS || 1);
  const [classesCount4PS, setClassesCount4PS] = useState<number>(profile.classesCount4PS || 1);
  const [classesCount5PS, setClassesCount5PS] = useState<number>(profile.classesCount5PS || 1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName || 'Teacher Benaichouba Mohamed A.');
    setSchoolName(profile.schoolName || 'Ziani Mohamed Primary School');
    setDistrict(profile.district || '');
    setAcademicYear(profile.academicYear || '2025 / 2026');
    setLearners3PS(profile.learners3PS || 32);
    setLearners4PS(profile.learners4PS || 34);
    setLearners5PS(profile.learners5PS || 30);
    setClassesCount3PS(profile.classesCount3PS || 1);
    setClassesCount4PS(profile.classesCount4PS || 1);
    setClassesCount5PS(profile.classesCount5PS || 1);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: TeacherProfile = {
      fullName: fullName.trim() || 'Teacher Benaichouba Mohamed A.',
      schoolName: schoolName.trim() || 'Ziani Mohamed Primary School',
      district: district.trim() || 'District of Primary Education',
      academicYear: academicYear.trim() || '2025 / 2026',
      learners3PS: Math.max(0, Number(learners3PS) || 0),
      learners4PS: Math.max(0, Number(learners4PS) || 0),
      learners5PS: Math.max(0, Number(learners5PS) || 0),
      classesCount3PS: Math.max(1, Number(classesCount3PS) || 1),
      classesCount4PS: Math.max(1, Number(classesCount4PS) || 1),
      classesCount5PS: Math.max(1, Number(classesCount5PS) || 1)
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/15 rounded-xl border border-white/20">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Teacher Registration & Profile</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white/20 rounded-full border border-white/30 text-white">
                  3PS • 4PS • 5PS Primary English
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Official credentials for Pedagogical Session Sheets (Page 75) & Class Registers
              </p>
              <div className="mt-1 text-[11px] font-semibold text-emerald-200 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span>Created by Teacher Benaichouba Mohamed A.</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Teacher Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Teacher's Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="teacher-fullname-input"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Teacher Benaichouba Mohamed A."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Appears on official inspection sheets and lesson plan headers.</p>
          </div>

          {/* School Name & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                School Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <School className="w-4 h-4" />
                </div>
                <input
                  id="teacher-school-input"
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Ziani Mohamed Primary School"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Inspection District / Wilaya
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="teacher-district-input"
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. District 02 - Directorate of Education"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Academic Year */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Academic Year
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="teacher-academic-year-input"
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025 / 2026"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Multi-Class & Number of Learners for Each Level (3PS, 4PS, 5PS) */}
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  Classes Taught & Total Learners (3PS, 4PS, 5PS)
                </label>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                No Limits
              </span>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-relaxed">
              If you teach multiple classes of any level (e.g., 3PS-1, 3PS-2, 4PS-1, 4PS-2, 5PS-1), specify classes and total learners with <strong>no upper limits</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              {/* 3PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800">3PS Level</span>
                  <span className="text-[10px] text-slate-500">3rd Primary</span>
                </div>
                
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Classes Count:</label>
                  <input
                    id="classes-count-3ps-input"
                    type="number"
                    min={1}
                    value={classesCount3PS}
                    onChange={(e) => setClassesCount3PS(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 3"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Total Learners:</label>
                  <input
                    id="learners-3ps-input"
                    type="number"
                    min={0}
                    required
                    value={learners3PS}
                    onChange={(e) => setLearners3PS(parseInt(e.target.value) || 0)}
                    className="w-full text-center px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-extrabold text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 96"
                  />
                  <span className="text-[10px] text-slate-400 block text-center mt-0.5">pupils</span>
                </div>
              </div>

              {/* 4PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800">4PS Level</span>
                  <span className="text-[10px] text-slate-500">4th Primary</span>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Classes Count:</label>
                  <input
                    id="classes-count-4ps-input"
                    type="number"
                    min={1}
                    value={classesCount4PS}
                    onChange={(e) => setClassesCount4PS(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 2"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Total Learners:</label>
                  <input
                    id="learners-4ps-input"
                    type="number"
                    min={0}
                    required
                    value={learners4PS}
                    onChange={(e) => setLearners4PS(parseInt(e.target.value) || 0)}
                    className="w-full text-center px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-extrabold text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 68"
                  />
                  <span className="text-[10px] text-slate-400 block text-center mt-0.5">pupils</span>
                </div>
              </div>

              {/* 5PS */}
              <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800">5PS Level</span>
                  <span className="text-[10px] text-slate-500">5th Primary</span>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Classes Count:</label>
                  <input
                    id="classes-count-5ps-input"
                    type="number"
                    min={1}
                    value={classesCount5PS}
                    onChange={(e) => setClassesCount5PS(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full text-center px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 2"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Total Learners:</label>
                  <input
                    id="learners-5ps-input"
                    type="number"
                    min={0}
                    required
                    value={learners5PS}
                    onChange={(e) => setLearners5PS(parseInt(e.target.value) || 0)}
                    className="w-full text-center px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-extrabold text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. 60"
                  />
                  <span className="text-[10px] text-slate-400 block text-center mt-0.5">pupils</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 italic">
              "Created by Teacher Benaichouba Mohamed A."
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="save-teacher-profile-btn"
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-white" />
                    Saved Successfully!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1.5" />
                    Save Registration Profile
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
