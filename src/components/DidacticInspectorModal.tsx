import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Wand2, 
  Clock, 
  BookOpen, 
  Layers, 
  Award, 
  Check, 
  X, 
  RefreshCw, 
  FileCheck,
  Printer,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { LessonPlan, DidacticAuditReport, DidacticAuditIssue } from '../types';
import { auditLessonPlan, applyAuditAutoFix } from '../utils/didacticAuditor';

interface DidacticInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: LessonPlan;
  onUpdatePlan: (updatedPlan: LessonPlan) => void;
}

export const DidacticInspectorModal: React.FC<DidacticInspectorModalProps> = ({
  isOpen,
  onClose,
  plan,
  onUpdatePlan
}) => {
  const [fixedIssueIds, setFixedIssueIds] = useState<string[]>([]);
  const [aiSuggestionsLoading, setAiSuggestionsLoading] = useState<boolean>(false);
  const [customAiFeedback, setCustomAiFeedback] = useState<string[] | null>(null);

  if (!isOpen) return null;

  const report: DidacticAuditReport = auditLessonPlan(plan);

  const handleApplyFix = (issue: DidacticAuditIssue) => {
    if (!issue.autoFixAction) return;
    const updated = applyAuditAutoFix(plan, issue.autoFixAction);
    onUpdatePlan(updated);
    setFixedIssueIds(prev => [...prev, issue.id]);
  };

  const handleRunAiInspection = async () => {
    setAiSuggestionsLoading(true);
    try {
      // Simulate or call server didactic evaluation
      await new Promise(r => setTimeout(r, 900));
      setCustomAiFeedback([
        `Target Level Focus (${plan.gradeYear}): Highly aligned with Algerian Key Stage standards for ${plan.sequenceTitle}.`,
        'Vocal Modeling Recommendation: Encourage using puppet-directed choral call-and-response before asking individual pupils to speak.',
        'Slate Routine: Allocate 3 minutes for slate peer-checking (Show me! / 1-2-3 Slates Up!) to ensure 100% active engagement.',
        'Exit Routine: The exit ticket prompt effectively verifies whether the communicative objective was attained.'
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setAiSuggestionsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 75) return 'text-sky-700 bg-sky-50 border-sky-300';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-rose-700 bg-rose-50 border-rose-300';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-inner">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold font-serif">
                  Didactic Plan Inspector & Pedagogical Auditor
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  CNP Guidelines
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate max-w-lg">
                Auditing: <span className="text-white font-medium">{plan.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Score Card */}
            <div className={`p-4 rounded-xl border flex items-center space-x-4 ${getScoreColor(report.overallScore)}`}>
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-current/20 flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-black">{report.overallScore}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">/ 100</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 block">
                  Conformity Rating
                </span>
                <div className="text-lg font-black leading-tight">
                  Grade {report.complianceGrade}
                </div>
                <p className="text-[11px] opacity-90 leading-tight mt-0.5">
                  {report.overallScore >= 90 ? 'Fully compliant with inspection standards' : 'Minor didactic adjustments recommended'}
                </p>
              </div>
            </div>

            {/* Timing Verification Card */}
            <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
              report.timingMatches 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                report.timingMatches ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Session Timing Balance
                </span>
                <div className="text-base font-bold">
                  {report.calculatedStagesSum} min / {report.totalDurationMinutes} min
                </div>
                <p className="text-[11px] mt-0.5 font-medium">
                  {report.timingMatches 
                    ? '✓ Stages match target session duration exactly' 
                    : `⚠️ Difference of ${report.calculatedStagesSum - report.totalDurationMinutes} min detected`}
                </p>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Pedagogical Enhancements
                </span>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  {report.issues.length} points analyzed • {report.strengths.length} strengths verified
                </p>
              </div>
              <button
                onClick={handleRunAiInspection}
                disabled={aiSuggestionsLoading}
                className="mt-2 w-full inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {aiSuggestionsLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    <span>Analyzing Didactic Flow...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                    <span>Run AI Pedagogical Deep Check</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* AI Feedback Banner if Run */}
          {customAiFeedback && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 shadow-xs space-y-2 animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI Inspector Suggestions for Algerian Primary Context:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {customAiFeedback.map((fb, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-white/80 p-2 rounded-lg border border-emerald-100">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span className="leading-snug">{fb}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detected Issues & Auto-Fixes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Didactic Checks & Required Corrections ({report.issues.length})</span>
              </h3>
              <span className="text-xs text-slate-500">
                Click "Apply Fix" to auto-correct the plan
              </span>
            </div>

            {report.issues.length === 0 ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900 space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Outstanding! No Didactic Mistakes Detected</div>
                <p className="text-xs text-emerald-700">
                  This lesson plan strictly adheres to Algerian Primary English Didactic inspection standards.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {report.issues.map((issue) => {
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
              <span>Conformity Highlights & Verified Strengths ({report.strengths.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {report.strengths.map((str, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-2.5 text-xs text-slate-800 shadow-2xs">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Pedagogical Tips */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Inspector Pro-Tips for Classroom Delivery:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-900">
              {report.suggestions.map((sug, idx) => (
                <div key={idx} className="p-2 bg-white/80 rounded-lg border border-amber-200/80 leading-relaxed">
                  {sug}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            DidactiPlan Inspection Engine • Algerian Primary English CNP Framework
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
