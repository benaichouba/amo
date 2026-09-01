import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Printer, 
  Download, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Clock, 
  Target, 
  ChevronRight, 
  FileText, 
  Compass, 
  ShieldCheck,
  Award,
  Filter
} from 'lucide-react';
import { 
  DidacticYear, 
  TeacherProfile, 
  LicenseInfo, 
  LessonGenerationParams 
} from '../types';
import { 
  generateYearlyDistribution, 
  YearlyDistributionPlan,
  YearlySequenceEntry,
  YearlySequenceSectionEntry
} from '../utils/yearlyDistributionHelper';
import { PrintableYearlyDistribution } from './PrintableYearlyDistribution';

interface YearlyDistributionViewProps {
  licenseInfo: LicenseInfo;
  teacherProfile: TeacherProfile;
  onOpenPurchase: () => void;
  onOpenTeacherProfile: () => void;
  onSelectSessionToGenerate: (params: LessonGenerationParams) => void;
}

export const YearlyDistributionView: React.FC<YearlyDistributionViewProps> = ({
  licenseInfo,
  teacherProfile,
  onOpenPurchase,
  onOpenTeacherProfile,
  onSelectSessionToGenerate
}) => {
  const [selectedGrade, setSelectedGrade] = useState<DidacticYear>('3PS');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedTermFilter, setSelectedTermFilter] = useState<'all' | 'Trimester 1' | 'Trimester 2' | 'Trimester 3'>('all');
  const [isPrintView, setIsPrintView] = useState<boolean>(false);
  const [selectedSequenceModal, setSelectedSequenceModal] = useState<YearlySequenceEntry | null>(null);

  // Generate the yearly plan
  const yearlyPlan: YearlyDistributionPlan = useMemo(() => {
    return generateYearlyDistribution(
      selectedGrade,
      teacherProfile.academicYear || '2026 / 2027',
      selectedYear,
      teacherProfile
    );
  }, [selectedGrade, selectedYear, teacherProfile]);

  const filteredTrimesters = useMemo(() => {
    if (selectedTermFilter === 'all') return yearlyPlan.trimesters;
    return yearlyPlan.trimesters.filter(t => t.termName === selectedTermFilter);
  }, [yearlyPlan, selectedTermFilter]);

  if (isPrintView) {
    return (
      <PrintableYearlyDistribution
        plan={yearlyPlan}
        teacherProfile={teacherProfile}
        onBack={() => setIsPrintView(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Algerian Primary English Annual Curriculum</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
              Yearly Pedagogical Distribution ({selectedGrade})
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Complete annual syllabus progression covering all 6 sequences, 3 trimesters, phonics milestones, handwriting families, and cross-curricular integration projects.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                {yearlyPlan.weeklyHours}
              </span>
              <span className="flex items-center bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <Layers className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
                6 Sequences • 34 Instructional Weeks
              </span>
              <span className="flex items-center bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <Award className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                6 Integration Projects
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsPrintView(true)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Printer className="w-4 h-4 mr-2" />
              Official Print & PDF Export (A4)
            </button>
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Grade Selection Tabs */}
        <div className="flex items-center space-x-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
            Primary Grade:
          </span>
          {(['3PS', '4PS', '5PS'] as DidacticYear[]).map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                selectedGrade === grade
                  ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {grade} English
            </button>
          ))}
        </div>

        {/* Trimester Filter & School Year */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(['all', 'Trimester 1', 'Trimester 2', 'Trimester 3'] as const).map(t => (
              <button
                key={t}
                onClick={() => setSelectedTermFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedTermFilter === t
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'all' ? 'All Year' : t}
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            Academic Year: <span className="text-emerald-800 font-extrabold">{teacherProfile.academicYear || '2026 / 2027'}</span>
          </div>
        </div>

      </div>

      {/* Opening Encounter Reminder Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900 font-extrabold text-xs shrink-0">
            W1
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-amber-950">
              {yearlyPlan.introductorySessionTitle}
            </h4>
            <p className="text-[11px] text-amber-800 font-medium">
              Scheduled before Sequence 1 Section 1 Session 1 ("I Sing & Have Fun") to establish warm contact, classroom discipline, and check school supplies.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[10px] uppercase shrink-0">
          Curriculum Re-entry
        </span>
      </div>

      {/* Trimester Cards & Progression */}
      <div className="space-y-8">
        {filteredTrimesters.map((term, tIdx) => (
          <div key={tIdx} className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 space-y-6">
            
            {/* Term Title Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-base border border-emerald-200 shadow-xs">
                  T{tIdx + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-extrabold text-slate-900 font-serif">
                      {term.termName}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {term.sequences.length} Sequences Planned
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Months: {term.months.map(m => m.monthName).join(', ')} • {term.months.reduce((acc, m) => acc + m.sessionsCount, 0)} Total Guided Sessions
                  </p>
                </div>
              </div>

              {/* Monthly breakdown pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {term.months.map((m, mIdx) => (
                  <div 
                    key={mIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700"
                  >
                    <span className="text-emerald-800">{m.monthName}</span>: {m.sessionsCount} sess
                  </div>
                ))}
              </div>
            </div>

            {/* Sequence Grid for this Term */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {term.sequences.map((seq, sIdx) => (
                <div 
                  key={sIdx}
                  className="rounded-2xl border border-slate-200 hover:border-emerald-500/50 bg-slate-50/50 hover:bg-white p-5 transition-all shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Header: Sequence Number and Title */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                          Sequence {seq.sequenceNumber}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 mt-1">
                          {seq.sequenceTitle}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          📅 {seq.monthRange} • {seq.totalSessions} Sessions ({seq.totalSessions * (selectedGrade === '5PS' ? 45 : 60)} minutes)
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedSequenceModal(seq)}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors cursor-pointer"
                        title="View Full Sequence Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sections Accordion / Summary */}
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      {seq.sections.map((sec, secIdx) => (
                        <div 
                          key={secIdx}
                          className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-extrabold text-emerald-950">
                              Section {sec.sectionNumber}: {sec.sectionTitle}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {sec.targetSessionsCount} Sessions ({sec.allocatedWeeks})
                            </span>
                          </div>

                          {/* Communicative Objective preview */}
                          <p className="text-[11px] text-slate-700 leading-snug">
                            🎯 <span className="font-medium">{sec.communicativeObjectives[0]}</span>
                          </p>

                          {/* Phonics & Lexis summary */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-slate-600">
                            <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-100">
                              Phonics: {sec.phonics.split('.')[0]}
                            </span>
                            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              Lexis: {sec.vocabulary.slice(0, 4).join(', ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Culminating Project Card */}
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1 text-xs">
                      <div className="flex items-center text-amber-950 font-extrabold">
                        <Award className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                        <span>{seq.projectIntegrationTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-tight">
                        {seq.projectObjectives}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action: Jump to lesson plan generator */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500">
                      {seq.targetValues[0]?.slice(0, 35)}...
                    </span>
                    <button
                      onClick={() => {
                        onSelectSessionToGenerate({
                          subject: 'english_primary',
                          gradeYear: selectedGrade,
                          sequenceTitle: `Sequence ${seq.sequenceNumber}: ${seq.sequenceTitle}`,
                          sectionTitle: `Section 1: ${seq.sections[0]?.sectionTitle || ''}`,
                          topic: `${seq.sequenceTitle} - Section 1`,
                          durationMinutes: selectedGrade === '5PS' ? 45 : 60,
                          teacherProfile
                        });
                      }}
                      className="inline-flex items-center text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-emerald-200"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                      Plan This Sequence
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Term Remediation Footer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-extrabold text-slate-900">{term.termName} Assessment & Remediation: </span>
                  <span>{term.termEvaluationAndRemediation}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Sequence Details Modal */}
      {selectedSequenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 text-emerald-900">
                  {selectedGrade} • Sequence {selectedSequenceModal.sequenceNumber}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedSequenceModal.sequenceTitle}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedSequenceModal.term} • {selectedSequenceModal.monthRange} ({selectedSequenceModal.totalSessions} Guided Sessions)
                </p>
              </div>
              <button
                onClick={() => setSelectedSequenceModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Sections Detailed List */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900">
                Sequence Sections & Pedagogical Progression
              </h4>
              {selectedSequenceModal.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-emerald-950">
                      Section {sec.sectionNumber}: {sec.sectionTitle}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {sec.targetSessionsCount} Sessions
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-700">Communicative Objectives:</span>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5 mt-1">
                      {sec.communicativeObjectives.map((obj, oIdx) => (
                        <li key={oIdx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="font-bold text-slate-700">Vocabulary Lexis:</span>
                      <p className="text-slate-600">{sec.vocabulary.join(', ')}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Grammar & Syntax:</span>
                      <p className="text-slate-600">{sec.grammar.join('; ')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="font-bold text-slate-700">Phonics Focus:</span>
                      <p className="text-slate-600">{sec.phonics}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Handwriting Script:</span>
                      <p className="text-slate-600">{sec.handwriting}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Culminating Project */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs">
              <h5 className="font-extrabold text-amber-950 flex items-center">
                <Award className="w-4 h-4 mr-1.5 text-amber-700" />
                {selectedSequenceModal.projectIntegrationTitle}
              </h5>
              <p className="text-slate-700 leading-relaxed">
                {selectedSequenceModal.projectObjectives}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSequenceModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Close Sequence
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
