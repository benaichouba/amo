import React from 'react';
import { LessonPlan } from '../types';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintableViewProps {
  plan: LessonPlan;
  onBack: () => void;
}

export const PrintableView: React.FC<PrintableViewProps> = ({ 
  plan, 
  onBack
}) => {
  const teacher = plan.teacherProfile;
  const learnersCount = 
    plan.gradeYear === '3PS' ? (teacher?.learners3PS || 32) :
    plan.gradeYear === '4PS' ? (teacher?.learners4PS || 34) :
    (teacher?.learners5PS || 30);

  const classesCount = 
    plan.gradeYear === '3PS' ? (teacher?.classesCount3PS || 1) :
    plan.gradeYear === '4PS' ? (teacher?.classesCount4PS || 1) :
    (teacher?.classesCount5PS || 1);

  // Extract materials
  const allMaterials = Array.from(new Set([
    ...plan.stages.flatMap(s => s.teachingMaterials),
    'Whiteboard / Slate',
    'Flashcards',
    'Audio player / Chant'
  ])).slice(0, 5).join(', ');

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-3 sm:px-6">
      
      {/* Action Bar (hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to Lesson Planner</span>
        </button>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 cursor-pointer"
        >
          <Printer className="w-4 h-4 mr-1.5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Official Session Sheet (Exact Layout from Algerian Template) */}
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 shadow-lg border border-slate-300 print:border-none print:shadow-none print:p-0 text-slate-900 text-xs font-sans space-y-3">
        
        {/* Row 1: Teacher & School (Warm Amber/Beige Pill) */}
        <div className="bg-[#fef3c7] border border-amber-300 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-amber-950 font-medium">
          <div>
            <strong className="font-bold text-amber-900">Teacher: </strong>
            <span>{teacher?.fullName || 'Teacher Benaichouba Mohamed A.'}</span>
          </div>
          <div>
            <strong className="font-bold text-amber-900">School: </strong>
            <span>{teacher?.schoolName || 'Primary School'}</span>
          </div>
        </div>

        {/* Row 2: Class profile, Level, Number of Ls (Lavender/Purple Pill) */}
        <div className="bg-[#ede9fe] border border-purple-300 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-purple-950 font-medium">
          <div>
            <strong className="font-bold text-purple-900">Class profile: </strong>
            <span>{plan.classProfile?.level || `${plan.gradeYear} Primary (Beginner Literacy)`}</span>
          </div>
          <div>
            <strong className="font-bold text-purple-900">Level: </strong>
            <span className="font-extrabold">{plan.gradeYear}</span>
          </div>
          <div>
            <strong className="font-bold text-purple-900">Number of Ls: </strong>
            <span className="font-extrabold">{learnersCount} {classesCount > 1 ? `(${classesCount} classes)` : ''}</span>
          </div>
        </div>

        {/* Row 3: Sequence & Session (Sky Blue Pill) */}
        <div className="bg-[#e0f2fe] border border-sky-300 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-sky-950 font-medium">
          <div className="sm:max-w-[55%]">
            <strong className="font-bold text-sky-900">Sequence: </strong>
            <span>{plan.sequenceTitle}</span>
          </div>
          <div className="sm:max-w-[45%] text-left sm:text-right">
            <strong className="font-bold text-sky-900">Session: </strong>
            <span>{plan.sessionNumber || 'Session 1'}</span>
          </div>
        </div>

        {/* Row 4: Teaching materials (Light Sky Pill) */}
        <div className="bg-[#e0f2fe] border border-sky-300 rounded-xl p-2.5 text-xs text-sky-950 font-medium">
          <strong className="font-bold text-sky-900">Teaching materials: </strong>
          <span>{allMaterials}</span>
        </div>

        {/* Rows 5 & 6: Grid of Target Competencies, Anticipated Problems & Session Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          
          {/* Left Column (5 cols on md): Target Competencies + Anticipated Problems */}
          <div className="md:col-span-5 flex flex-col gap-3">
            
            {/* Target Competencies Box (Teal/Mint) */}
            <div className="bg-[#ccfbf1] border border-teal-300 rounded-xl p-3 text-teal-950 text-xs flex-1">
              <strong className="font-bold text-teal-900 block mb-1">Target competencies:</strong>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                {plan.targetCompetences.map((comp, idx) => (
                  <li key={idx} className="text-teal-950">{comp}</li>
                ))}
              </ul>
            </div>

            {/* Anticipated Problems Box (Soft Peach/Orange) */}
            <div className="bg-[#ffedd5] border border-orange-300 rounded-xl p-3 text-orange-950 text-xs flex-1">
              <strong className="font-bold text-orange-900 block mb-1">Anticipated problems:</strong>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                {plan.anticipatedProblems.map((prob, idx) => (
                  <li key={idx} className="text-orange-950">{prob}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column (7 cols on md): Session Outcomes */}
          <div className="md:col-span-7 bg-[#cffafe] border border-cyan-300 rounded-xl p-3.5 text-cyan-950 text-xs flex flex-col justify-start">
            <strong className="font-bold text-cyan-950 text-[13px] block mb-1.5">Session outcomes:</strong>
            <p className="font-medium text-cyan-900 italic mb-2 text-[11px]">
              By the end of the session, Ls will be able to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[11.5px] leading-relaxed text-cyan-950">
              {plan.sessionObjectives.map((obj, idx) => (
                <li key={idx} className="leading-snug">{obj}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Row 7: Solutions Box (Soft Green) */}
        <div className="bg-[#dcfce7] border border-emerald-300 rounded-xl p-3 text-xs text-emerald-950 font-medium">
          <strong className="font-bold text-emerald-900 block mb-1">Solutions:</strong>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] leading-relaxed">
            {plan.solutionsPlanB.map((sol, idx) => (
              <li key={idx}>{sol}</li>
            ))}
          </ul>
        </div>

        {/* Procedures Table */}
        <div className="pt-2">
          <div className="overflow-x-auto rounded-xl border border-slate-400">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#fef3c7] border-b border-slate-400 text-amber-950">
                  <th className="border-r border-slate-400 p-2.5 text-center font-extrabold w-20">Time</th>
                  <th className="border-r border-slate-400 p-2.5 text-center font-extrabold w-36">Stage</th>
                  <th className="border-r border-slate-400 p-2.5 text-left font-extrabold">Procedures/ Tasks</th>
                  <th className="p-2.5 text-center font-extrabold w-28">Interaction</th>
                </tr>
              </thead>
              <tbody>
                {plan.stages.map((stage, idx) => (
                  <tr key={idx} className={`border-b border-slate-300 ${idx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}`}>
                    <td className="border-r border-slate-300 p-2.5 text-center align-top font-bold text-slate-800">
                      {stage.timeMinutes} mn
                    </td>
                    <td className="border-r border-slate-300 p-2.5 align-top font-bold text-slate-900">
                      {stage.stageName}
                    </td>
                    <td className="border-r border-slate-300 p-2.5 align-top text-slate-800 space-y-1">
                      <div className="leading-relaxed">
                        <strong className="text-slate-900">Teacher: </strong>
                        {stage.teacherRole}
                      </div>
                      <div className="leading-relaxed text-slate-700">
                        <strong className="text-slate-900">Learners: </strong>
                        {stage.learnerActivity}
                      </div>
                      {stage.phonemicPhonicsFocus && (
                        <div className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                          Phonics/Focus: {stage.phonemicPhonicsFocus}
                        </div>
                      )}
                    </td>
                    <td className="p-2.5 text-center align-top font-bold text-slate-900">
                      {stage.interactionPattern || 'T-Ls'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section: Self-Reflection */}
        <div className="pt-2">
          {/* Header Banner */}
          <div className="bg-[#fef3c7] border border-amber-300 rounded-t-xl p-2 text-center text-xs font-extrabold text-amber-950 uppercase tracking-wide">
            Self-reflection
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-x border-b border-slate-300 rounded-b-xl overflow-hidden text-xs">
            
            {/* What worked */}
            <div className="bg-[#dcfce7] p-3 border-b sm:border-b-0 sm:border-r border-emerald-300 text-emerald-950">
              <strong className="font-bold text-emerald-900 block mb-1">What worked</strong>
              <p className="text-[11px] leading-relaxed text-emerald-900/90 italic">
                {plan.selfReflectionTemplate.whatWorked}
              </p>
            </div>

            {/* What hindered */}
            <div className="bg-[#ffe4e6] p-3 border-b sm:border-b-0 sm:border-r border-rose-300 text-rose-950">
              <strong className="font-bold text-rose-900 block mb-1">What hindered</strong>
              <p className="text-[11px] leading-relaxed text-rose-900/90 italic">
                {plan.selfReflectionTemplate.whatHindered}
              </p>
            </div>

            {/* Action plan */}
            <div className="bg-[#fef9c3] p-3 text-amber-950">
              <strong className="font-bold text-amber-900 block mb-1">Action plan</strong>
              <p className="text-[11px] leading-relaxed text-amber-900/90 italic">
                {plan.selfReflectionTemplate.actionPlan}
              </p>
            </div>

          </div>
        </div>

        {/* Footer Signature */}
        <div className="pt-4 border-t border-slate-300 flex justify-between items-end text-slate-700 text-[10px]">
          <div>
            <span className="block font-bold">Teacher: {teacher?.fullName || 'Teacher Signature'}</span>
            <span className="text-slate-500">Signature: _______________________</span>
          </div>
          <div className="text-right">
            <span className="font-medium italic">DidactiPlan • Teacher Benaichouba Mohamed A.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
