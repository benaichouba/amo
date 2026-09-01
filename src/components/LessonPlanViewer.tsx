import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Printer, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  Sparkles, 
  Layers, 
  FileText, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  Send,
  Eye,
  Volume2,
  Activity,
  Hand,
  ShieldCheck,
  AlertCircle,
  Pencil,
  Edit3,
  FileCheck,
  AlertTriangle,
  Wand2,
  Lightbulb,
  Info
} from 'lucide-react';
import { LessonPlan, StudentHandoutItem, DidacticAuditReport, DidacticAuditIssue } from '../types';
import { auditLessonPlan, applyAuditAutoFix } from '../utils/didacticAuditor';

interface LessonPlanViewerProps {
  plan: LessonPlan;
  onSavePlan: (plan: LessonPlan) => void;
  isSaved: boolean;
  onPrint: () => void;
  onUpdatePlan: (updatedPlan: LessonPlan) => void;
}

type TabType = 'template' | 'audit' | 'stages' | 'profile' | 'differentiation' | 'rubric' | 'handouts' | 'reflection';

export const LessonPlanViewer: React.FC<LessonPlanViewerProps> = ({
  plan,
  onSavePlan,
  isSaved,
  onPrint,
  onUpdatePlan
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('template');
  const [copiedHandoutId, setCopiedHandoutId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [editingReflection, setEditingReflection] = useState<boolean>(false);
  const [reflectionState, setReflectionState] = useState(plan.selfReflectionTemplate);
  const [fixedIssueIds, setFixedIssueIds] = useState<string[]>([]);

  const auditReport: DidacticAuditReport = auditLessonPlan(plan);

  const handleApplyFix = (issue: DidacticAuditIssue) => {
    if (!issue.autoFixAction) return;
    const updated = applyAuditAutoFix(plan, issue.autoFixAction);
    onUpdatePlan(updated);
    setFixedIssueIds(prev => [...prev, issue.id]);
  };

  const handleCopyHandout = (handout: StudentHandoutItem) => {
    const text = `${handout.title}\n\nInstructions: ${handout.instructions}\n\n${handout.content}${handout.solutions ? `\n\nAnswer Key:\n${handout.solutions}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedHandoutId(handout.id);
    setTimeout(() => setCopiedHandoutId(null), 2000);
  };

  const handleCopyFullPlan = () => {
    const markdown = `# ${plan.title}
**Subject:** ${plan.subject} | **Level:** ${plan.targetLevel} | **Duration:** ${plan.totalDurationMinutes} min
**Sequence:** ${plan.sequenceTitle} | **Section:** ${plan.sectionTitle}

## Session Objectives
${plan.sessionObjectives.map(o => `- ${o}`).join('\n')}

## Stages & Procedures
${plan.stages.map(s => `### ${s.stageName} (${s.timeMinutes} min) - [${s.interactionPattern}]
- **Teacher:** ${s.teacherRole}
- **Learners:** ${s.learnerActivity}
- **Materials:** ${s.teachingMaterials.join(', ')}
${s.phonemicPhonicsFocus ? `- **Phonics/Focus:** ${s.phonemicPhonicsFocus}` : ''}
${s.differentiationTip ? `- **Differentiation:** ${s.differentiationTip}` : ''}
`).join('\n')}

## Differentiated Instruction
- **Tier 1 (Universal):** ${plan.differentiatedInstruction.tier1Universal.join(', ')}
- **Tier 2 (Targeted):** ${plan.differentiatedInstruction.tier2Targeted.join(', ')}
- **Tier 3 (Intensive):** ${plan.differentiatedInstruction.tier3Intensive.join(', ')}

## Evaluation Grid
${plan.evaluationGrid.map(g => `- **${g.domain} - ${g.criterion}**: Full: ${g.fullMastery} | Acceptable: ${g.acceptableMastery}`).join('\n')}
`;
    navigator.clipboard.writeText(markdown);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const saveReflection = () => {
    onUpdatePlan({
      ...plan,
      selfReflectionTemplate: reflectionState,
      updatedAt: new Date().toISOString()
    });
    setEditingReflection(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Top Banner & Action Controls */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">
                {plan.gradeYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-700/80 text-slate-300">
                {plan.targetLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-500/20 text-teal-300 border border-teal-400/30">
                {plan.totalDurationMinutes} min • {plan.sessionNumber}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              {plan.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              <span className="font-semibold text-emerald-400">{plan.sequenceTitle}</span> • {plan.sectionTitle}
            </p>
            {plan.teacherProfile && (
              <div className="pt-1 text-[11px] text-emerald-300/90 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Teacher: <strong>{plan.teacherProfile.fullName || 'Primary English Teacher'}</strong></span>
                <span>•</span>
                <span>School: {plan.teacherProfile.schoolName || 'Primary School'}</span>
                <span>•</span>
                <span className="italic text-emerald-200">Official Curriculum Framework</span>
              </div>
            )}
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Check Mistakes & Suggestions */}
            <button
              id="audit-plan-btn"
              onClick={() => setActiveTab('audit')}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="Audit lesson plan for mistakes and pedagogical suggestions"
            >
              <FileCheck className="w-3.5 h-3.5 mr-1.5" />
              <span>Check Mistakes & Suggestions</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-black bg-slate-950 text-amber-400">
                {auditReport.overallScore}/100
              </span>
            </button>

            {/* Save to Local Storage */}
            <button
              id="save-plan-btn"
              onClick={() => onSavePlan(plan)}
              className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isSaved 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50' 
                  : 'bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <span>Save Plan</span>
                </>
              )}
            </button>

            {/* Print Official Session Sheet */}
            <button
              id="print-plan-btn"
              onClick={onPrint}
              className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
              title="Print official session layout"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print Template Sheet</span>
            </button>

            {/* Copy Markdown */}
            <button
              id="copy-markdown-btn"
              onClick={handleCopyFullPlan}
              className="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              title="Copy formatted plan"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>

          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 flex overflow-x-auto no-scrollbar">
        <nav className="flex space-x-2 sm:space-x-3 py-2">
          
          <button
            id="tab-template-btn"
            onClick={() => setActiveTab('template')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'template'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Official Template Sheet</span>
          </button>

          <button
            id="tab-audit-btn"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'audit'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-slate-900" />
            <span>Didactic Audit & Mistakes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
              activeTab === 'audit' ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {auditReport.overallScore}/100
            </span>
          </button>

          <button
            id="tab-stages-btn"
            onClick={() => setActiveTab('stages')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'stages'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Step-by-Step Stages ({plan.stages.length})</span>
          </button>

          <button
            id="tab-profile-btn"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'profile'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Profile & Competences</span>
          </button>

          <button
            id="tab-diff-btn"
            onClick={() => setActiveTab('differentiation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'differentiation'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Differentiated SLA</span>
          </button>

          <button
            id="tab-rubric-btn"
            onClick={() => setActiveTab('rubric')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'rubric'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Evaluation Grid</span>
          </button>

          <button
            id="tab-handouts-btn"
            onClick={() => setActiveTab('handouts')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'handouts'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Handouts ({plan.studentHandouts.length})</span>
          </button>

          <button
            id="tab-reflection-btn"
            onClick={() => setActiveTab('reflection')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === 'reflection'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Self-Reflection</span>
          </button>

        </nav>
      </div>

      {/* Tab Contents */}
      <div className="p-5 sm:p-6">
        
        {/* TAB 0: OFFICIAL TEMPLATE SHEET (Exact Algerian layout) */}
        {activeTab === 'template' && (
          <div className="space-y-4">
            
            {/* Header description */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Official Algerian Pedagogical Session Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Exact template format aligned with primary English inspection guidelines.
                </p>
              </div>
              <button
                onClick={onPrint}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                <span>Print This Sheet</span>
              </button>
            </div>

            {/* Template Container */}
            <div className="bg-white border border-slate-300 rounded-2xl p-4 sm:p-6 shadow-xs text-xs font-sans space-y-3">
              
              {/* Row 1: Teacher & School (Warm Amber Pill) */}
              <div className="bg-[#fef3c7] border border-amber-300 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-amber-950 font-medium">
                <div>
                  <strong className="font-bold text-amber-900">Teacher: </strong>
                  <span>{plan.teacherProfile?.fullName || 'Primary English Teacher'}</span>
                </div>
                <div>
                  <strong className="font-bold text-amber-900">School: </strong>
                  <span>{plan.teacherProfile?.schoolName || 'Primary School'}</span>
                </div>
              </div>

              {/* Row 2: Class profile, Level, Number of Ls (Lavender Pill) */}
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
                  <span className="font-extrabold">
                    {plan.gradeYear === '3PS' ? (plan.teacherProfile?.learners3PS || 32) :
                     plan.gradeYear === '4PS' ? (plan.teacherProfile?.learners4PS || 34) :
                     (plan.teacherProfile?.learners5PS || 30)}
                  </span>
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

              {/* Row 4: Teaching materials (Sky Blue Pill) */}
              <div className="bg-[#e0f2fe] border border-sky-300 rounded-xl p-2.5 text-xs text-sky-950 font-medium">
                <strong className="font-bold text-sky-900">Teaching materials: </strong>
                <span>
                  {Array.from(new Set([
                    ...plan.stages.flatMap(s => s.teachingMaterials),
                    'Whiteboard / Slate',
                    'Flashcards',
                    'Audio player / Chant'
                  ])).slice(0, 5).join(', ')}
                </span>
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
                <div className="bg-[#fef3c7] border border-amber-300 rounded-t-xl p-2 text-center text-xs font-extrabold text-amber-950 uppercase tracking-wide">
                  Self-reflection
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 border-x border-b border-slate-300 rounded-b-xl overflow-hidden text-xs">
                  <div className="bg-[#dcfce7] p-3 border-b sm:border-b-0 sm:border-r border-emerald-300 text-emerald-950">
                    <strong className="font-bold text-emerald-900 block mb-1">What worked</strong>
                    <p className="text-[11px] leading-relaxed text-emerald-900/90 italic">
                      {plan.selfReflectionTemplate.whatWorked}
                    </p>
                  </div>

                  <div className="bg-[#ffe4e6] p-3 border-b sm:border-b-0 sm:border-r border-rose-300 text-rose-950">
                    <strong className="font-bold text-rose-900 block mb-1">What hindered</strong>
                    <p className="text-[11px] leading-relaxed text-rose-900/90 italic">
                      {plan.selfReflectionTemplate.whatHindered}
                    </p>
                  </div>

                  <div className="bg-[#fef9c3] p-3 text-amber-950">
                    <strong className="font-bold text-amber-900 block mb-1">Action plan</strong>
                    <p className="text-[11px] leading-relaxed text-amber-900/90 italic">
                      {plan.selfReflectionTemplate.actionPlan}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 0: AUDIT & MISTAKES CHECKER */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Top Score Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Score Card */}
              <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
                auditReport.overallScore >= 90 ? 'text-emerald-700 bg-emerald-50 border-emerald-300' :
                auditReport.overallScore >= 75 ? 'text-sky-700 bg-sky-50 border-sky-300' :
                auditReport.overallScore >= 60 ? 'text-amber-700 bg-amber-50 border-amber-300' :
                'text-rose-700 bg-rose-50 border-rose-300'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-current/20 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-black">{auditReport.overallScore}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider">/ 100</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block">
                    Conformity Rating
                  </span>
                  <div className="text-lg font-black leading-tight">
                    Grade {auditReport.complianceGrade}
                  </div>
                  <p className="text-[11px] opacity-90 leading-tight mt-0.5">
                    {auditReport.overallScore >= 90 ? 'Inspection-Ready Didactic Plan' : 'Minor pedagogical adjustments recommended'}
                  </p>
                </div>
              </div>

              {/* Timing Verification Card */}
              <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
                auditReport.timingMatches 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  auditReport.timingMatches ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Session Timing Balance
                  </span>
                  <div className="text-base font-bold">
                    {auditReport.calculatedStagesSum} min / {auditReport.totalDurationMinutes} min
                  </div>
                  <p className="text-[11px] mt-0.5 font-medium">
                    {auditReport.timingMatches 
                      ? '✓ Stages match session target duration exactly' 
                      : `⚠️ Discrepancy of ${auditReport.calculatedStagesSum - auditReport.totalDurationMinutes} min detected`}
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Pedagogical Health
                  </span>
                  <p className="text-xs text-slate-700 font-medium mt-1">
                    {auditReport.issues.length} points checked • {auditReport.strengths.length} strengths verified
                  </p>
                </div>
                <div className="mt-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Algerian Primary English CNP Standards</span>
                </div>
              </div>

            </div>

            {/* Detected Issues & Auto-Fixes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Detected Pedagogical Items ({auditReport.issues.length})</span>
                </h3>
                <span className="text-xs text-slate-500">
                  Click "Apply Fix" to auto-correct the plan instantly
                </span>
              </div>

              {auditReport.issues.length === 0 ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900 space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Outstanding! No Didactic Mistakes Detected</div>
                  <p className="text-xs text-emerald-700">
                    This lesson plan strictly adheres to Algerian Primary English Didactic inspection standards.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {auditReport.issues.map((issue) => {
                    const isFixed = fixedIssueIds.includes(issue.id);
                    return (
                      <div 
                        key={issue.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isFixed 
                            ? 'bg-emerald-50/70 border-emerald-200 opacity-75' 
                            : issue.severity === 'error'
                              ? 'bg-rose-50/50 border-rose-200'
                              : issue.severity === 'warning'
                                ? 'bg-amber-50/50 border-amber-200'
                                : 'bg-sky-50/50 border-sky-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5 shrink-0">
                              {isFixed ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              ) : issue.severity === 'error' ? (
                                <AlertCircle className="w-5 h-5 text-rose-600" />
                              ) : issue.severity === 'warning' ? (
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                              ) : (
                                <Info className="w-5 h-5 text-sky-600" />
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-xs text-slate-900">
                                  {issue.title}
                                </span>
                                <span className={`px-2 py-0.2 rounded-full text-[9px] font-extrabold uppercase ${
                                  issue.severity === 'error' ? 'bg-rose-100 text-rose-800' :
                                  issue.severity === 'warning' ? 'bg-amber-100 text-amber-800' :
                                  'bg-sky-100 text-sky-800'
                                }`}>
                                  {issue.severity}
                                </span>
                              </div>

                              <p className="text-xs text-slate-700 leading-relaxed">
                                {issue.message}
                              </p>

                              <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-md border border-slate-200/80 leading-relaxed">
                                <strong className="text-slate-900 font-semibold">Inspector Recommendation: </strong>
                                {issue.recommendation}
                              </div>
                            </div>
                          </div>

                          {/* Fix Action Button */}
                          {issue.canAutoFix && (
                            <div className="sm:self-center shrink-0">
                              {isFixed ? (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300">
                                  <Check className="w-3.5 h-3.5 mr-1" />
                                  <span>Fixed</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleApplyFix(issue)}
                                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
                                >
                                  <Wand2 className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                                  <span>{issue.autoFixLabel || 'Apply Fix'}</span>
                                </button>
                              )}
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Verified Strengths Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Strengths & Inspector Conformity ({auditReport.strengths.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {auditReport.strengths.map((str, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-800 shadow-2xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pedagogical Delivery Suggestions */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Didactic Suggestions & Best Practices:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-900">
                {auditReport.suggestions.map((sug, idx) => (
                  <div key={idx} className="p-2 bg-white/80 rounded-lg border border-amber-200/80 leading-relaxed">
                    {sug}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 1: SESSION STAGES */}
        {activeTab === 'stages' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Didactic Procedure & Step-by-Step Stages</h3>
                <p className="text-xs text-slate-500">
                  Follows the official progression: Warmer (Sing/Fun) → Install Resources (Listen/Repeat) → Read & Discover → Read & Write → Play Roles
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Total: {plan.totalDurationMinutes} minutes
              </span>
            </div>

            <div className="space-y-4">
              {plan.stages.map((stage, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-all hover:border-emerald-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {stage.stageName}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100/70 text-emerald-800">
                        ⏱ {stage.timeMinutes} min
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-200 text-slate-700">
                        {stage.interactionPattern}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">Teacher Role & Directives:</span>
                      <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80">
                        {stage.teacherRole}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block mb-1">Learner Activities & Tasks:</span>
                      <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200/80">
                        {stage.learnerActivity}
                      </p>
                    </div>
                  </div>

                  {/* Badges for Phonics focus & Differentiation tip */}
                  {(stage.phonemicPhonicsFocus || stage.differentiationTip || stage.teachingMaterials.length > 0) && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-2 text-[11px]">
                      {stage.phonemicPhonicsFocus && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          <strong>Phonics:</strong>&nbsp;{stage.phonemicPhonicsFocus}
                        </span>
                      )}
                      {stage.differentiationTip && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          <strong>Differentiation:</strong>&nbsp;{stage.differentiationTip}
                        </span>
                      )}
                      {stage.teachingMaterials.length > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          <strong>Materials:</strong>&nbsp;{stage.teachingMaterials.join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & COMPETENCES */}
        {activeTab === 'profile' && (
          <div className="space-y-6 text-xs sm:text-sm">
            
            {/* Class Profile & Exit Profile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Class Profile</span>
                <p className="font-bold text-slate-900">{plan.classProfile.level}</p>
                <p className="text-slate-600 text-xs">Learners: {plan.classProfile.estimatedLearners} • Age: {plan.classProfile.ageRange}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 md:col-span-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Competences</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                  {plan.targetCompetences.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Values & Citizenship */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-2 flex items-center text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-700" />
                Values, National Identity & Citizenship (Algerian Curriculum Alignment)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-emerald-800">
                {plan.valuesAndCitizenship.map((v, i) => (
                  <div key={i} className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                    {v}
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Cross-Curricular Competences */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs sm:text-sm">
                The 4 Cross-Curricular Competences (Didactic Guide Framework)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">1. Intellectual Competence:</span>
                  <p className="text-slate-600 leading-relaxed">{plan.crossCurricularCompetences.intellectual}</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">2. Methodological Competence:</span>
                  <p className="text-slate-600 leading-relaxed">{plan.crossCurricularCompetences.methodological}</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">3. Communicative Competence:</span>
                  <p className="text-slate-600 leading-relaxed">{plan.crossCurricularCompetences.communicative}</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">4. Personal & Social Competence:</span>
                  <p className="text-slate-600 leading-relaxed">{plan.crossCurricularCompetences.personalSocial}</p>
                </div>
              </div>
            </div>

            {/* Linguistic Resources */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs sm:text-sm">Linguistic & Didactic Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Key Vocabulary Chunks</span>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.linguisticResources.vocabulary.map((w, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-medium">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Grammar & Formulaic Structures</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {plan.linguisticResources.grammar.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-2">Phonics & Handwriting Families</span>
                  <p className="text-slate-700 mb-2">
                    <strong>Sounds:</strong> {plan.linguisticResources.phonicsSounds.join(', ')}
                  </p>
                  {plan.linguisticResources.handwritingLetterFamilies && (
                    <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Handwriting:</strong> {plan.linguisticResources.handwritingLetterFamilies}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Anticipated Problems & Plan B */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1.5 text-amber-700" />
                Anticipated Problems & Solutions (Plan B)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="font-bold text-amber-900 block mb-1">Potential Learning Obstacles:</span>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    {plan.anticipatedProblems.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-amber-900 block mb-1">Teacher Action Plan B:</span>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    {plan.solutionsPlanB.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DIFFERENTIATION & SLA */}
        {activeTab === 'differentiation' && (
          <div className="space-y-6 text-xs sm:text-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Multi-Tier Differentiated Instruction & SLA Framework</h3>
              <p className="text-xs text-slate-500">
                Grounding in Kersten & Rohde Action-Orientation, VAKT Perceptual Styles, and Multilingual Scaffolding
              </p>
            </div>

            {/* 3-Tier Multi-Tier Support */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-900 mb-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Tier 1: Universal Core</span>
                </div>
                <p className="text-slate-500 text-[11px] mb-2">All learners (high-quality visual input & routines)</p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                  {plan.differentiatedInstruction.tier1Universal.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-1.5 font-bold text-blue-900 mb-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Tier 2: Targeted Scaffolding</span>
                </div>
                <p className="text-slate-500 text-[11px] mb-2">Guided practice & peer buddy support</p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                  {plan.differentiatedInstruction.tier2Targeted.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-1.5 font-bold text-purple-900 mb-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Tier 3: Intensive Support</span>
                </div>
                <p className="text-slate-500 text-[11px] mb-2">One-on-one modifications & sensory tools</p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-700">
                  {plan.differentiatedInstruction.tier3Intensive.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* VAKT Perceptual Matrix */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-xs sm:text-sm flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5 text-emerald-600" />
                VAKT Perceptual Learning Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 mb-1.5">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Visual (Verbal/Graphic)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.differentiatedInstruction.vaktStrategies.visual}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 mb-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Auditory (Chants & Rhymes)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.differentiatedInstruction.vaktStrategies.auditory}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 mb-1.5">
                    <Activity className="w-4 h-4 text-amber-600" />
                    <span>Kinesthetic (TPR & Relays)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.differentiatedInstruction.vaktStrategies.kinesthetic}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 mb-1.5">
                    <Hand className="w-4 h-4 text-purple-600" />
                    <span>Tactile (Manipulatives)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{plan.differentiatedInstruction.vaktStrategies.tactile}</p>
                </div>

              </div>
            </div>

            {/* Special Needs & Fast Finishers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Specific Neurodivergent Accommodations</h4>
                <div className="space-y-2 text-slate-700">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Dysgraphia:</strong> {plan.differentiatedInstruction.specialNeedsAccommodations.dysgraphia}
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Dyslexia:</strong> {plan.differentiatedInstruction.specialNeedsAccommodations.dyslexia}
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">ADHD & Attention:</strong> {plan.differentiatedInstruction.specialNeedsAccommodations.adhdOrFocus}
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-slate-900">Multilingual EAL / Transfer:</strong> {plan.differentiatedInstruction.specialNeedsAccommodations.multilingualEAL}
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-950 mb-2">Fast Finishers & Extension Tasks</h4>
                <ul className="list-disc list-inside space-y-2 text-amber-900">
                  {plan.differentiatedInstruction.fastFinishersAndGifted.map((task, i) => (
                    <li key={i} className="bg-white p-2.5 rounded-lg border border-amber-100 leading-relaxed">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: RUBRIC / EVALUATION GRID */}
        {activeTab === 'rubric' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Didactic Evaluation Grid (4-Level Mastery Rubric)</h3>
                <p className="text-xs text-slate-500">
                  Official Algerian Didactic Guide grid format for Assessment, Remediation & Standardization Pauses
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="py-3 px-3 text-left w-1/4">Domain & Criterion</th>
                    <th className="py-3 px-3 text-left text-emerald-800 bg-emerald-50/80">Full Mastery</th>
                    <th className="py-3 px-3 text-left text-blue-800 bg-blue-50/80">Acceptable Mastery</th>
                    <th className="py-3 px-3 text-left text-amber-800 bg-amber-50/80">Partial Mastery</th>
                    <th className="py-3 px-3 text-left text-rose-800 bg-rose-50/80">Minimum Mastery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {plan.evaluationGrid.map((crit, idx) => (
                    <tr key={crit.id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 align-top">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 uppercase mb-1">
                          {crit.domain}
                        </span>
                        <div className="text-slate-800">{crit.criterion}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 align-top bg-emerald-50/20">
                        {crit.fullMastery}
                      </td>
                      <td className="py-3 px-3 text-slate-700 align-top bg-blue-50/20">
                        {crit.acceptableMastery}
                      </td>
                      <td className="py-3 px-3 text-slate-700 align-top bg-amber-50/20">
                        {crit.partialMastery}
                      </td>
                      <td className="py-3 px-3 text-slate-700 align-top bg-rose-50/20">
                        {crit.minimumMastery}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: STUDENT HANDOUTS */}
        {activeTab === 'handouts' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Student Printables & Activity Handouts</h3>
                <p className="text-xs text-slate-500">
                  Ready to copy, distribute, or attach as assignments in Google Classroom
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.studentHandouts.map((handout) => (
                <div 
                  key={handout.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-emerald-800 border border-slate-200 uppercase">
                        {handout.type.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleCopyHandout(handout)}
                        className="inline-flex items-center text-xs text-slate-600 hover:text-emerald-700 font-medium"
                      >
                        {copiedHandoutId === handout.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1">{handout.title}</h4>
                    <p className="text-xs text-slate-600 italic mb-3">{handout.instructions}</p>

                    <pre className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono whitespace-pre-wrap text-slate-800 leading-relaxed overflow-x-auto">
                      {handout.content.trim()}
                    </pre>

                    {handout.solutions && (
                      <div className="mt-2.5 p-2 bg-emerald-50/80 rounded-md border border-emerald-200 text-[11px] text-emerald-900">
                        <strong>Teacher Answer Key:</strong> {handout.solutions}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SELF REFLECTION */}
        {activeTab === 'reflection' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Teacher Self-Reflection & Action Plan</h3>
                <p className="text-xs text-slate-500">
                  Continuous professional development log straight from Page 75 of the Didactic Guide
                </p>
              </div>

              {!editingReflection ? (
                <button
                  onClick={() => setEditingReflection(true)}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1" />
                  <span>Edit Reflection</span>
                </button>
              ) : (
                <button
                  onClick={saveReflection}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Save Notes</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-2 text-xs uppercase tracking-wider">
                  What Worked (Successes)
                </span>
                {editingReflection ? (
                  <textarea
                    rows={4}
                    value={reflectionState.whatWorked}
                    onChange={(e) => setReflectionState({ ...reflectionState, whatWorked: e.target.value })}
                    className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs outline-none"
                  />
                ) : (
                  <p className="text-emerald-800 bg-white/80 p-3 rounded-lg border border-emerald-100 leading-relaxed text-xs">
                    {reflectionState.whatWorked}
                  </p>
                )}
              </div>

              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-2 text-xs uppercase tracking-wider">
                  What Hindered (Challenges)
                </span>
                {editingReflection ? (
                  <textarea
                    rows={4}
                    value={reflectionState.whatHindered}
                    onChange={(e) => setReflectionState({ ...reflectionState, whatHindered: e.target.value })}
                    className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs outline-none"
                  />
                ) : (
                  <p className="text-amber-800 bg-white/80 p-3 rounded-lg border border-amber-100 leading-relaxed text-xs">
                    {reflectionState.whatHindered}
                  </p>
                )}
              </div>

              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900 block mb-2 text-xs uppercase tracking-wider">
                  Action Plan (Next Steps)
                </span>
                {editingReflection ? (
                  <textarea
                    rows={4}
                    value={reflectionState.actionPlan}
                    onChange={(e) => setReflectionState({ ...reflectionState, actionPlan: e.target.value })}
                    className="w-full p-2 bg-white border border-blue-300 rounded-lg text-xs outline-none"
                  />
                ) : (
                  <p className="text-blue-800 bg-white/80 p-3 rounded-lg border border-blue-100 leading-relaxed text-xs">
                    {reflectionState.actionPlan}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
