import React, { useState } from 'react';
import { Printer, Download, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { MonthlyDistributionConfig, TeacherProfile, MonthlySessionPlan } from '../types';
import { exportElementToPdf } from '../utils/pdfExportHelper';

interface PrintableMonthlyDistributionProps {
  distribution: MonthlyDistributionConfig;
  teacherProfile: TeacherProfile;
  onBack: () => void;
}

export const PrintableMonthlyDistribution: React.FC<PrintableMonthlyDistributionProps> = ({
  distribution,
  teacherProfile,
  onBack
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      const safeMonth = distribution.monthName.replace(/\s+/g, '_');
      const filename = `Monthly_Distribution_${distribution.gradeYear}_${safeMonth}_${teacherProfile.academicYear || '2025-2026'}.pdf`;
      await exportElementToPdf('printable-distribution-sheet', filename);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('PDF export failed:', error);
      // Fallback to window.print() if canvas fails
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const weeks = [1, 2, 3, 4];
  const sessionRows: (1 | 2)[] = [1, 2];

  const getSessionPlan = (weekNum: number, sessNum: 1 | 2): MonthlySessionPlan | undefined => {
    return distribution.sessions.find(s => s.weekNumber === weekNum && s.sessionNumber === sessNum);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 print:p-0 print:bg-white text-slate-900 font-sans">
      
      {/* Non-printable Action Bar */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Distribution Planner
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
                Generating PDF...
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-emerald-200" />
                PDF Downloaded!
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
            Print Sheet
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div 
        id="printable-distribution-sheet"
        className="max-w-6xl mx-auto bg-white p-6 sm:p-8 shadow-lg print:shadow-none border border-slate-200 print:border-none rounded-2xl print:rounded-none"
      >
        
        {/* Ministry Top Header */}
        <div className="text-center border-b border-slate-300 pb-2.5 mb-3">
          <div className="text-[11px] font-bold text-slate-800 tracking-wide uppercase font-serif">
            <p>People's Democratic Republic of Algeria</p>
            <p className="text-[10px] font-medium text-slate-600">Ministry of National Education</p>
          </div>
        </div>

        {/* Required Pre-Table Information Header Block */}
        <div className="mb-4 space-y-2">
          
          {/* Level, Teacher Name, School, Academic Year */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Level</span>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                {distribution.gradeYear} Primary School
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Teacher's Full Name</span>
              <span className="font-bold text-slate-900">
                {teacherProfile.fullName || 'Primary English Teacher'}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">School</span>
              <span className="font-semibold text-slate-800">
                {teacherProfile.schoolName || 'Primary School'}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Academic Year</span>
              <span className="font-bold text-emerald-800">
                {teacherProfile.academicYear || '2025/2026'}
              </span>
            </div>
          </div>

          {/* Monthly Distribution Title Banner */}
          <div className="text-center py-2 bg-emerald-50 rounded-xl border border-emerald-300">
            <h1 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-emerald-950 font-serif">
              Monthly Distribution of {distribution.monthName}
            </h1>
            <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
              Primary English Curriculum • 4 Weeks × 2 Sessions / Week (60 min each)
            </p>
          </div>

        </div>

        {/* THE 4 COLUMNS (4 WEEKS) × 2 LINES (2 SESSIONS) OFFICIAL TABLE */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left border-collapse border border-slate-300 text-[10px]">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-center text-[10px] tracking-wide uppercase">
                <th className="border border-slate-300 px-3 py-2 w-28 bg-slate-950">
                  <div>Sessions / Weeks</div>
                </th>
                {weeks.map((w) => (
                  <th key={w} className="border border-slate-300 px-3 py-2">
                    <div>Week {w}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessionRows.map((sessNum) => (
                <tr key={sessNum}>
                  
                  {/* Line Header */}
                  <td className="border border-slate-300 px-2 py-3 bg-slate-100 font-bold text-center align-top">
                    <div className="text-slate-900 font-bold text-xs">
                      Session {sessNum}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5 font-normal">
                      60 Minutes
                    </div>
                  </td>

                  {/* 4 Columns for Week 1..4 */}
                  {weeks.map((weekNum) => {
                    const session = getSessionPlan(weekNum, sessNum);
                    
                    if (!session) {
                      return (
                        <td key={weekNum} className="border border-slate-300 p-2 align-top text-center text-slate-400">
                          -
                        </td>
                      );
                    }

                    if (session.isSuspended) {
                      return (
                        <td key={weekNum} className="border border-slate-300 p-2.5 align-top bg-rose-50/60 text-rose-950">
                          <div className="font-bold text-[10px] text-rose-800">
                            {session.sessionName}
                          </div>
                          <div className="text-[9px] text-rose-700 mt-0.5 leading-relaxed">
                            {session.communicativeObjectives[0]}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={weekNum} className="border border-slate-300 p-2.5 align-top">
                        <div className="space-y-1">
                          
                          {/* Sequence & Section */}
                          <div className="font-bold text-emerald-950 text-[9.5px]">
                            {session.sequenceTitle}
                          </div>
                          <div className="text-[9px] text-slate-600 font-medium">
                            {session.sectionTitle}
                          </div>

                          {/* Session Name */}
                          <div className="text-[10px] font-bold text-slate-900">
                            {session.sessionName}
                          </div>

                          {/* Objective */}
                          <div className="text-[9px] text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-200 leading-tight">
                            <strong>Objective:</strong> "{session.communicativeObjectives[0]}"
                          </div>

                          {/* Lexis & Phonics */}
                          <div className="text-[8.5px] text-slate-600 pt-0.5">
                            {session.vocabulary.length > 0 && (
                              <div><strong>Lexis:</strong> {session.vocabulary.slice(0, 3).join(', ')}</div>
                            )}
                            {session.phonics && (
                              <div><strong>Phonics:</strong> {session.phonics.split(' ')[0]}</div>
                            )}
                          </div>

                        </div>
                      </td>
                    );
                  })}

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pedagogical Observations & Notes */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] mb-6">
          <span className="font-bold text-slate-800 block mb-0.5">Pedagogical Notes:</span>
          <p className="text-[9.5px] text-slate-600 leading-relaxed">
            - Teaching conforms to the Algerian National Curriculum Framework and Didactic Guide for Primary English (2 sessions of 60 min/week).<br />
            - In case of school holidays or exceptional closures, pedagogical objectives shift forward to maintain didactic continuity.
          </p>
        </div>

        {/* Official Signatures Block Requested at the Bottom */}
        <div className="grid grid-cols-3 gap-6 text-center pt-5 border-t-2 border-slate-900 text-xs font-bold text-slate-900">
          <div className="space-y-12">
            <p className="tracking-wide uppercase text-[11px]">Teacher Signature</p>
            <div className="text-[10px] text-slate-400 font-normal italic">Signature & Date</div>
          </div>
          <div className="space-y-12">
            <p className="tracking-wide uppercase text-[11px]">Principal's Signature</p>
            <div className="text-[10px] text-slate-400 font-normal italic">Visa, Stamp & Date</div>
          </div>
          <div className="space-y-12">
            <p className="tracking-wide uppercase text-[11px]">Inspector Signature</p>
            <div className="text-[10px] text-slate-400 font-normal italic">Visa & Observation</div>
          </div>
        </div>

        {/* Print/Export Footer */}
        <div className="text-center text-[8.5px] text-slate-400 mt-5">
          DidactiPlan • Algerian Primary English Curriculum • Ministry of National Education
        </div>

      </div>
    </div>
  );
};
