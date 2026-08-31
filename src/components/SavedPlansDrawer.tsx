import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  BookOpen, 
  Calendar, 
  Clock, 
  Search, 
  ExternalLink, 
  FileText,
  Sparkles
} from 'lucide-react';
import { LessonPlan } from '../types';

interface SavedPlansDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: LessonPlan[];
  onSelectPlan: (plan: LessonPlan) => void;
  onDeletePlan: (id: string) => void;
}

export const SavedPlansDrawer: React.FC<SavedPlansDrawerProps> = ({
  isOpen,
  onClose,
  savedPlans,
  onSelectPlan,
  onDeletePlan
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPlans = savedPlans.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sequenceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sectionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.gradeYear.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Saved Lesson Plans</h3>
              <p className="text-xs text-slate-500">{savedPlans.length} plans stored locally</p>
            </div>
          </div>

          <button
            id="close-saved-drawer-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-saved-plans-input"
              type="text"
              placeholder="Search by topic, sequence, or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* List of Saved Plans */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPlans.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-30 text-emerald-600" />
              <p className="text-sm font-semibold text-slate-600">No saved plans found</p>
              <p className="text-xs text-slate-400 mt-1">Generate and save a lesson plan to see it here</p>
            </div>
          ) : (
            filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 hover:border-emerald-300 rounded-xl p-3.5 transition-all text-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {plan.gradeYear}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">
                    {plan.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {plan.sequenceTitle} • {plan.sectionTitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {plan.totalDurationMinutes}m
                    </span>
                    <span>•</span>
                    <span>{plan.stages.length} stages</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => {
                        onSelectPlan(plan);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-500 shadow-xs"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => onDeletePlan(plan.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete saved plan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
