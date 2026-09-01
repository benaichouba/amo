import React, { useState } from 'react';
import { Printer, Download, ArrowLeft, Loader2, CheckCircle, GraduationCap, Calendar, BookOpen, Layers } from 'lucide-react';
import { TeacherProfile } from '../types';
import { YearlyDistributionPlan } from '../utils/yearlyDistributionHelper';
import { exportElementToPdf, printElementA4 } from '../utils/pdfExportHelper';

interface PrintableYearlyDistributionProps {
  plan: YearlyDistributionPlan;
  teacherProfile: TeacherProfile;
  onBack: () => void;
}

export const PrintableYearlyDistribution: React.FC<PrintableYearlyDistributionProps> = ({
  plan,
  teacherProfile,
  onBack
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const filename = `Yearly_Distribution_${plan.gradeYear}_${(plan.academicYear || '2026-2027').replace(/[\s/]+/g, '_')}.pdf`;
  const docTitle = `Yearly_Distribution_${plan.gradeYear}`;

  const handlePrint = () => {
    setIsPrinting(true);
    try {
      printElementA4('printable-yearly-distribution-sheet', docTitle, 'landscape');
    } catch (err) {
      console.error('Print failed:', err);
      window.print();
    } finally {
      setTimeout(() => setIsPrinting(false), 1500);
    }
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      await exportElementToPdf('printable-yearly-distribution-sheet', filename, 'landscape');
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('PDF export failed:', error);
      handlePrint();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 print:p-0 print:bg-white text-slate-900 font-sans">
      
      {/* Action Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Yearly Planner
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Official PDF...
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-200" />
                PDF Export Complete!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export as PDF (Download)
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Landscape (A4)
          </button>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-6xl mx-auto flex justify-center">
        <div
          id="printable-yearly-distribution-sheet"
          className="w-full bg-white border border-slate-300 shadow-xl rounded-lg p-6 sm:p-8 print:p-0 print:border-none print:shadow-none text-slate-900"
          style={{ minHeight: '210mm' }}
        >
          
          {/* Official Republic Header */}
          <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              People's Democratic Republic of Algeria • Ministry of National Education
            </p>
            <p className="text-[10px] font-semibold text-slate-600">
              National Pedagogical Commission for Primary English • Inspection of National Education
            </p>
            <h1 className="text-base sm:text-lg font-black uppercase text-emerald-950 tracking-tight pt-1">
              YEARLY PEDAGOGICAL DISTRIBUTION OF ENGLISH • LEVEL: {plan.gradeYear} PRIMARY
            </h1>
            <p className="text-[10.5px] font-bold text-slate-700">
              Academic Year: {plan.academicYear || '2026 / 2027'} • Weekly Timing: {plan.weeklyHours}
            </p>
          </div>

          {/* Teacher & School Administrative Data Box */}
          <div className="grid grid-cols-4 gap-2 text-[10px] border border-slate-300 rounded-lg p-2.5 mb-4 bg-slate-50/50">
            <div>
              <span className="font-bold text-slate-600">Teacher: </span>
              <span className="font-extrabold text-slate-950">{teacherProfile.fullName || '................................................'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">Primary School: </span>
              <span className="font-extrabold text-slate-950">{teacherProfile.schoolName || '................................................'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">District / Wilaya: </span>
              <span className="font-extrabold text-slate-950">{teacherProfile.district || '................................................'}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600">Total Sequences: </span>
              <span className="font-extrabold text-emerald-900">6 Sequences (3 Trimesters)</span>
            </div>
          </div>

          {/* Introductory Encounter Note */}
          <div className="mb-4 p-2 rounded-md bg-amber-50/70 border border-amber-200 text-[10px] text-amber-950 flex items-center justify-between">
            <div>
              <span className="font-extrabold">Academic Year Opening: </span>
              <span>{plan.introductorySessionTitle}</span>
            </div>
            <span className="font-bold text-[9px] bg-amber-200/80 px-2 py-0.5 rounded text-amber-950">
              Orientation Week
            </span>
          </div>

          {/* Trimesters Progression Table */}
          <div className="space-y-6">
            {plan.trimesters.map((term, tIdx) => (
              <div key={tIdx} className="space-y-2">
                
                {/* Term Header Bar */}
                <div className="flex items-center justify-between bg-emerald-900 text-white px-3 py-1.5 rounded-t-md font-bold text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      {term.termName}
                    </span>
                    <span className="text-emerald-100 text-[11px]">
                      Sequences {term.sequences.map(s => s.sequenceNumber).join(' & ')} • {term.months.map(m => m.monthName).join(', ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-200 font-medium">
                    {term.months.reduce((acc, m) => acc + m.sessionsCount, 0)} Total Sessions
                  </span>
                </div>

                {/* Sequences Table */}
                <div className="overflow-x-auto border border-slate-300 rounded-b-md">
                  <table className="w-full text-left border-collapse text-[9.5px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                        <th className="p-2 border-r border-slate-300 w-28">Sequence & Timing</th>
                        <th className="p-2 border-r border-slate-300 w-36">Section Title & Sessions</th>
                        <th className="p-2 border-r border-slate-300">Target Objectives & Communicative Situations</th>
                        <th className="p-2 border-r border-slate-300 w-44">Linguistic Resources (Lexis & Grammar)</th>
                        <th className="p-2 border-r border-slate-300 w-32">Phonics & Script</th>
                        <th className="p-2 w-40">Integration Project & Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {term.sequences.map((seq, sIdx) => (
                        <React.Fragment key={sIdx}>
                          {seq.sections.map((sec, secIdx) => (
                            <tr 
                              key={secIdx}
                              className={`border-b border-slate-200 ${secIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                            >
                              {/* Sequence details (spanned across sections or shown on first section) */}
                              {secIdx === 0 ? (
                                <td 
                                  rowSpan={seq.sections.length} 
                                  className="p-2 border-r border-slate-300 align-top bg-emerald-50/40 font-bold text-emerald-950"
                                >
                                  <div className="font-extrabold text-[10.5px] text-emerald-900">
                                    Sequence {seq.sequenceNumber}
                                  </div>
                                  <div className="text-[10px] font-bold text-slate-800 mb-1">
                                    {seq.sequenceTitle}
                                  </div>
                                  <div className="text-[9px] text-slate-600 font-medium">
                                    📅 {seq.monthRange}
                                  </div>
                                  <div className="mt-1 text-[8.5px] font-semibold text-emerald-800 bg-emerald-100/60 px-1.5 py-0.5 rounded inline-block">
                                    {seq.totalSessions} Sessions
                                  </div>
                                </td>
                              ) : null}

                              {/* Section Title & Sessions */}
                              <td className="p-2 border-r border-slate-300 align-top font-medium">
                                <div className="font-bold text-slate-900 text-[10px]">
                                  Section {sec.sectionNumber}
                                </div>
                                <div className="text-slate-700 text-[9px] mb-1">
                                  {sec.sectionTitle}
                                </div>
                                <div className="text-[8.5px] text-slate-500 font-semibold">
                                  ⏱️ {sec.targetSessionsCount} Sessions ({sec.allocatedWeeks})
                                </div>
                              </td>

                              {/* Objectives */}
                              <td className="p-2 border-r border-slate-300 align-top">
                                <ul className="list-disc list-inside space-y-0.5 text-slate-800">
                                  {sec.communicativeObjectives.slice(0, 3).map((obj, oIdx) => (
                                    <li key={oIdx} className="leading-tight">
                                      {obj}
                                    </li>
                                  ))}
                                </ul>
                              </td>

                              {/* Linguistic Resources */}
                              <td className="p-2 border-r border-slate-300 align-top space-y-1">
                                <div>
                                  <span className="font-bold text-slate-700">Lexis: </span>
                                  <span className="text-slate-800">{sec.vocabulary.join(', ')}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-700">Grammar: </span>
                                  <span className="text-slate-800">{sec.grammar.join('; ')}</span>
                                </div>
                              </td>

                              {/* Phonics & Script */}
                              <td className="p-2 border-r border-slate-300 align-top space-y-1">
                                <div>
                                  <span className="font-bold text-slate-700">Phonics: </span>
                                  <span className="text-slate-800">{sec.phonics}</span>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-700">Writing: </span>
                                  <span className="text-slate-800 text-[8.5px]">{sec.handwriting}</span>
                                </div>
                              </td>

                              {/* Integration & Values (spanned across sections or single) */}
                              {secIdx === 0 ? (
                                <td 
                                  rowSpan={seq.sections.length} 
                                  className="p-2 align-top bg-amber-50/30 space-y-1.5"
                                >
                                  <div>
                                    <div className="font-bold text-amber-950 text-[9.5px]">
                                      {seq.projectIntegrationTitle}
                                    </div>
                                    <div className="text-[8.5px] text-slate-700 leading-tight">
                                      {seq.projectObjectives}
                                    </div>
                                  </div>
                                  <div className="pt-1 border-t border-amber-200/60">
                                    <span className="font-bold text-emerald-900 text-[8.5px]">National Values: </span>
                                    <p className="text-[8px] text-slate-600 leading-tight">
                                      {seq.targetValues.join(' • ')}
                                    </p>
                                  </div>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Term Evaluation and Remediation Note */}
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-[9px] text-slate-700 font-medium flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Term Evaluation & Remediation: </span>
                    <span>{term.termEvaluationAndRemediation}</span>
                  </div>
                  <span className="font-semibold text-emerald-800 text-[8.5px]">
                    Continuous Formative Assessment & Remediation
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Official Didactic Signatures Section */}
          <div className="mt-8 pt-4 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-center text-[10px] font-bold text-slate-900">
            <div className="space-y-12">
              <p className="uppercase tracking-wider">Teacher's Signature</p>
              <p className="text-slate-400 font-normal italic">Date: ........................</p>
            </div>
            <div className="space-y-12">
              <p className="uppercase tracking-wider">School Headmaster's Visa & Stamp</p>
              <p className="text-slate-400 font-normal italic">Date: ........................</p>
            </div>
            <div className="space-y-12">
              <p className="uppercase tracking-wider">Inspector of National Education Visa</p>
              <p className="text-slate-400 font-normal italic">Date: ........................</p>
            </div>
          </div>

          {/* Footer Stamp */}
          <div className="mt-6 text-center text-[8.5px] text-slate-500 font-medium">
            Generated with DidactiPlan Algerian Primary English Planner • Developer: Teacher Benaichouba Mohamed A.
          </div>

        </div>
      </div>
    </div>
  );
};
