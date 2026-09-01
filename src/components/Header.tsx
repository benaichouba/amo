import React from 'react';
import { BookOpen, Sparkles, Cloud, CheckCircle2, Bookmark, HelpCircle, GraduationCap, User, School, Smartphone, Crown, Zap, CalendarCheck, FileText } from 'lucide-react';
import { GoogleClassroomCourse, TeacherProfile, LicenseInfo } from '../types';

interface HeaderProps {
  activeTab: 'lesson_planner' | 'monthly_distribution' | 'yearly_distribution';
  onTabChange: (tab: 'lesson_planner' | 'monthly_distribution' | 'yearly_distribution') => void;
  onOpenGuide: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  teacherProfile: TeacherProfile;
  onOpenTeacherProfile: () => void;
  onOpenPurchase: () => void;
  licenseInfo: LicenseInfo;
  generationsCount: number;
  maxFree: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenGuide,
  onOpenSaved,
  savedCount,
  teacherProfile,
  onOpenTeacherProfile,
  onOpenPurchase,
  licenseInfo,
  generationsCount,
  maxFree
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-serif">
                  DidactiPlan
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-3 h-3 mr-1 text-emerald-600" /> English 3PS • 4PS • 5PS
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100/70 text-emerald-800 border border-emerald-300">
                  Algerian Syllabus
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:flex items-center space-x-1.5">
                <span>Primary English Didactic Lesson Planner</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Created & Developed by Teacher: Benaichouba Mohamed A.
                </span>
              </p>
              <p className="text-[10px] text-emerald-800 font-bold sm:hidden">
                Created & Developed by Teacher: Benaichouba Mohamed A.
              </p>
            </div>
          </div>

          {/* Navigation View Switcher (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => onTabChange('lesson_planner')}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'lesson_planner'
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              <span>Lesson Plan Studio</span>
            </button>

            <button
              onClick={() => onTabChange('monthly_distribution')}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'monthly_distribution'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              <span>Monthly Distribution</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-md text-[9px] font-extrabold uppercase ${
                activeTab === 'monthly_distribution' ? 'bg-emerald-800 text-amber-200' : 'bg-amber-100 text-amber-900'
              }`}>
                Pro
              </span>
            </button>

            <button
              onClick={() => onTabChange('yearly_distribution')}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'yearly_distribution'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>Yearly Distribution</span>
              <span className={`ml-1.5 px-1.5 py-0.2 rounded-md text-[9px] font-extrabold uppercase ${
                activeTab === 'yearly_distribution' ? 'bg-slate-700 text-emerald-300' : 'bg-emerald-100 text-emerald-900'
              }`}>
                Official
              </span>
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Purchase / Upgrade / License Pill */}
            <button
              id="pricing-upgrade-header-btn"
              onClick={onOpenPurchase}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
                licenseInfo.isPro
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              <Crown className="w-3.5 h-3.5 mr-1.5" />
              {licenseInfo.isPro ? (
                <span className="hidden sm:inline">Pro VIP Active</span>
              ) : (
                <span>
                  {generationsCount >= maxFree ? (
                    <span className="text-amber-200 font-extrabold">Upgrade (3/3 Used)</span>
                  ) : (
                    <span>Pricing • {maxFree - generationsCount} Free Left</span>
                  )}
                </span>
              )}
            </button>

            {/* Teacher Registration Profile Button */}
            <button
              id="teacher-profile-header-btn"
              onClick={onOpenTeacherProfile}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer shadow-2xs"
            >
              <User className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
              <div className="text-left hidden lg:block">
                <span className="block text-[11px] leading-tight font-bold text-slate-900 truncate max-w-[120px]">
                  {teacherProfile.fullName || 'Register Teacher'}
                </span>
                <span className="block text-[9px] text-emerald-700 leading-tight truncate max-w-[120px]">
                  {teacherProfile.schoolName || 'Set School & Class'}
                </span>
              </div>
              <span className="lg:hidden font-bold">Profile</span>
            </button>

            {/* Saved Plans */}
            <button
              id="saved-plans-btn"
              onClick={onOpenSaved}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Didactic Reference Guide */}
            <button
              id="didactic-reference-guide-btn"
              onClick={onOpenGuide}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
              <span className="hidden md:inline">Didactic Guide</span>
              <span className="md:hidden">Guide</span>
            </button>

          </div>

        </div>

        {/* Mobile View Switcher Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => onTabChange('lesson_planner')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center space-x-1 ${
              activeTab === 'lesson_planner' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plans</span>
          </button>
          <button
            onClick={() => onTabChange('monthly_distribution')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center space-x-1 ${
              activeTab === 'monthly_distribution' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Monthly</span>
          </button>
          <button
            onClick={() => onTabChange('yearly_distribution')}
            className={`flex-1 py-1 text-center font-bold flex items-center justify-center space-x-1 ${
              activeTab === 'yearly_distribution' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Yearly</span>
          </button>
        </div>

      </div>
    </header>
  );
};


