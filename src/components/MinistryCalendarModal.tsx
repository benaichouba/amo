import React from 'react';
import { Landmark, Calendar, CheckCircle2, ExternalLink, X, BookOpen, AlertCircle } from 'lucide-react';
import { getMinistryCalendarForYear, MinistrySchoolCalendar } from '../utils/ministryCalendarHelper';

interface MinistryCalendarModalProps {
  year: number;
  isOpen: boolean;
  onClose: () => void;
  onApplyEntryDate: (date: string, activeWeeks: number[]) => void;
}

export const MinistryCalendarModal: React.FC<MinistryCalendarModalProps> = ({
  year,
  isOpen,
  onClose,
  onApplyEntryDate
}) => {
  if (!isOpen) return null;

  const calendar: MinistrySchoolCalendar = getMinistryCalendarForYear(year);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-emerald-700/60 rounded-xl border border-emerald-500/30 text-amber-300">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300 block">
                الجمهورية الجزائرية الديمقراطية الشعبية • وزارة التربية الوطنية
              </span>
              <h3 className="text-lg font-bold text-white font-serif">
                Official Ministry Calendar & School Holidays ({calendar.academicYear})
              </h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed mt-1">
            الرزنامة الرسمية لتنظيم السنة الدراسية، تواريخ الدخول المدرسي، فترات الاختبارات والعطل المدرسية الصادرة عن وزارة التربية الوطنية.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Section 1: School Entry Dates (تواريخ الدخول المدرسي) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-emerald-600" />
              1. تواريخ الدخول المدرسي (School Entry & Opening Dates)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">الموظفون الإداريون</span>
                <span className="text-xs font-bold text-slate-800">{calendar.administrationEntryDate}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Administrative Staff</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">الأساتذة والمعلمون</span>
                <span className="text-xs font-bold text-slate-800">{calendar.teachersEntryDate}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Primary Teachers</span>
              </div>

              <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">دخول التلاميذ</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white">رسمي</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-950 block">{calendar.pupilsEntryDate}</span>
                <span className="text-[10px] text-emerald-800 block mt-0.5">Pupils First Class Day</span>
              </div>
            </div>
          </div>

          {/* Section 2: School Holidays (العطل المدرسية الرسمية) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
              <BookOpen className="w-4 h-4 mr-1.5 text-emerald-600" />
              2. العطل المدرسية الرسمية (Official Primary School Holidays)
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-amber-950 block">{calendar.autumnBreak.title}</span>
                  <span className="text-[11px] text-amber-800">من {calendar.autumnBreak.start} إلى {calendar.autumnBreak.end}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-900">
                  خريف
                </span>
              </div>

              <div className="p-3 rounded-xl border border-sky-200 bg-sky-50/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-sky-950 block">{calendar.winterBreak.title}</span>
                  <span className="text-[11px] text-sky-800">من {calendar.winterBreak.start} إلى {calendar.winterBreak.end}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-sky-300 text-sky-900">
                  15 يوماً
                </span>
              </div>

              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-emerald-950 block">{calendar.springBreak.title}</span>
                  <span className="text-[11px] text-emerald-800">من {calendar.springBreak.start} إلى {calendar.springBreak.end}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-900">
                  15 يوماً
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Exams & Evaluations (فترات الاختبارات والتقويم) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5 text-emerald-600" />
              3. فترات الاختبارات والتقويمات الفصلية (Evaluation Periods)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-slate-900 block">الفصل الأول (Term 1)</span>
                <span className="text-[11px] text-slate-600">{calendar.examsTerm1.start}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-slate-900 block">الفصل الثاني (Term 2)</span>
                <span className="text-[11px] text-slate-600">{calendar.examsTerm2.start}</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 bg-white">
                <span className="font-bold text-slate-900 block">الفصل الثالث (Term 3)</span>
                <span className="text-[11px] text-slate-600">{calendar.examsTerm3.start}</span>
              </div>
            </div>
          </div>

          {/* Source Link & Verification Info */}
          <div className="bg-slate-100 rounded-xl p-3.5 border border-slate-200 text-slate-700 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Landmark className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>المصدر: <strong>{calendar.source}</strong></span>
            </div>
            <a
              href={calendar.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-800 text-xs"
            >
              <span>موقع الوزارة</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            إغلاق (Close)
          </button>

          <button
            onClick={() => {
              onApplyEntryDate(calendar.pupilsEntryDate, [3, 4]);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-amber-300" />
            <span>تطبيق مواعيد الوزارة على شهر سبتمبر (Apply Ministry Dates)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
