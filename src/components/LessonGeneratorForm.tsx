import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Layers, 
  Eye, 
  Volume2, 
  Activity, 
  Hand, 
  CheckSquare, 
  RefreshCw, 
  Compass, 
  Zap, 
  FileText,
  SlidersHorizontal,
  ChevronDown,
  User,
  School,
  Users,
  Smartphone,
  Crown,
  Lock,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { 
  DidacticYear, 
  PedagogicalFramework, 
  VAKTEmphasis, 
  LessonGenerationParams, 
  TeacherProfile
} from '../types';
import { 
  getPresetsByLevel, 
  getSequencesForLevel, 
  getSectionsForSequence, 
  getSessionOptionsForLevel 
} from '../data/didacticCurriculum';

interface LessonGeneratorFormProps {
  onGenerate: (params: LessonGenerationParams) => void;
  isLoading: boolean;
  teacherProfile: TeacherProfile;
  onOpenTeacherProfile: () => void;
}

export const LessonGeneratorForm: React.FC<LessonGeneratorFormProps> = ({
  onGenerate,
  isLoading,
  teacherProfile,
  onOpenTeacherProfile
}) => {
  // 1. Grade Level: 3PS, 4PS, 5PS
  const [gradeYear, setGradeYear] = useState<DidacticYear>('3PS');

  // 2. Cascaded Menu Selections
  const sequences = useMemo(() => getSequencesForLevel(gradeYear), [gradeYear]);
  const [selectedSequenceNumber, setSelectedSequenceNumber] = useState<number>(1);

  const sections = useMemo(() => {
    return getSectionsForSequence(gradeYear, selectedSequenceNumber);
  }, [gradeYear, selectedSequenceNumber]);
  const [selectedSectionNumber, setSelectedSectionNumber] = useState<number>(1);

  const sessionOptions = useMemo(() => getSessionOptionsForLevel(gradeYear), [gradeYear]);
  const [selectedSessionType, setSelectedSessionType] = useState<string>(
    'Session 1: I Sing & Have Fun (10m) + I Listen & Repeat (35m)'
  );

  // 3. Detailed configurations & pedagogical parameters
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [framework, setFramework] = useState<PedagogicalFramework>('didactic_guide_algeria');
  const [vaktEmphasis, setVaktEmphasis] = useState<VAKTEmphasis>('Multisensory (All 4)');
  const [includeSpecialNeeds, setIncludeSpecialNeeds] = useState<boolean>(true);
  const [includeClassroomFormat, setIncludeClassroomFormat] = useState<boolean>(true);
  const [customObjectives, setCustomObjectives] = useState<string>('');
  const [additionalContext, setAdditionalContext] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Active preset metadata matching current (gradeYear, sequence, section)
  const currentPreset = useMemo(() => {
    const found = sections.find(s => s.number === selectedSectionNumber);
    if (found) return found.preset;
    if (sections.length > 0) return sections[0].preset;
    return getPresetsByLevel(gradeYear)[0];
  }, [sections, selectedSectionNumber, gradeYear]);

  // When Grade Year changes: reset sequence & section to valid defaults
  const handleGradeYearChange = (newYear: DidacticYear) => {
    setGradeYear(newYear);
    const newSeqs = getSequencesForLevel(newYear);
    const firstSeq = newSeqs[0]?.number || 1;
    setSelectedSequenceNumber(firstSeq);

    const newSecs = getSectionsForSequence(newYear, firstSeq);
    const firstSec = newSecs[0]?.number || 1;
    setSelectedSectionNumber(firstSec);

    const newSessions = getSessionOptionsForLevel(newYear);
    setSelectedSessionType(newSessions[1]?.label || newSessions[0]?.label || 'Session 1');
  };

  // When Sequence changes: reset section to first available
  const handleSequenceChange = (seqNum: number) => {
    setSelectedSequenceNumber(seqNum);
    const newSecs = getSectionsForSequence(gradeYear, seqNum);
    const firstSec = newSecs[0]?.number || 1;
    setSelectedSectionNumber(firstSec);
  };

  // Synchronize objectives with current preset if not manually customized
  useEffect(() => {
    if (currentPreset) {
      setCustomObjectives(currentPreset.communicativeObjectives.join('; '));
    }
  }, [currentPreset]);

  // Helper for active level learner count
  const activeLearnerCount = useMemo(() => {
    if (gradeYear === '3PS') return teacherProfile.learners3PS || 32;
    if (gradeYear === '4PS') return teacherProfile.learners4PS || 34;
    if (gradeYear === '5PS') return teacherProfile.learners5PS || 30;
    return 32;
  }, [gradeYear, teacherProfile]);

  const classesCount = useMemo(() => {
    if (gradeYear === '3PS') return teacherProfile.classesCount3PS || 1;
    if (gradeYear === '4PS') return teacherProfile.classesCount4PS || 1;
    if (gradeYear === '5PS') return teacherProfile.classesCount5PS || 1;
    return 1;
  }, [gradeYear, teacherProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSeqObj = sequences.find(s => s.number === selectedSequenceNumber);
    const currentSecObj = sections.find(s => s.number === selectedSectionNumber);

    const seqTitle = `Sequence ${selectedSequenceNumber}: ${currentSeqObj?.title || 'English Unit'}`;
    const secTitle = `Section ${selectedSectionNumber}: ${currentSecObj?.title || 'Communicative Topic'}`;
    const topicSummary = `${currentSeqObj?.title || 'English'} - ${currentSecObj?.title || 'Lesson'} (${currentPreset?.sessionName || selectedSessionType})`;

    onGenerate({
      subject: 'english_primary',
      gradeYear,
      topic: topicSummary,
      sequenceTitle: seqTitle,
      sectionTitle: secTitle,
      sessionType: selectedSessionType,
      durationMinutes,
      framework,
      vaktEmphasis,
      includeSpecialNeeds,
      includeClassroomFormat,
      customObjectives: customObjectives.trim() || undefined,
      additionalContext: additionalContext.trim() || undefined,
      presetId: currentPreset?.id,
      teacherProfile: {
        ...teacherProfile
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      
      {/* Header & Quick Teacher Profile Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-5 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Didactic Lesson Planner (Primary English)</h2>
            <p className="text-xs text-slate-500">Official Didactic Guide Syllabus (3PS • 4PS • 5PS Algerian Ministry of Education)</p>
          </div>
        </div>

        {/* Teacher Registration Pill */}
        <button
          type="button"
          onClick={onOpenTeacherProfile}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <User className="w-3.5 h-3.5 text-emerald-700" />
          <span className="truncate max-w-[140px]">{teacherProfile.fullName || 'Register Teacher'}</span>
          <span className="px-1.5 py-0.5 rounded-md bg-white text-[10px] font-bold text-emerald-800 border border-emerald-200">
            {activeLearnerCount} pupils ({gradeYear})
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">

        {/* 1. Grade Level Selection: 3PS, 4PS, 5PS */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            1. Select Grade Level (Primary English)
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(['3PS', '4PS', '5PS'] as DidacticYear[]).map((level) => {
              const isSelected = gradeYear === level;
              const levelTitle = level === '3PS' ? '3rd Year' : level === '4PS' ? '4th Year' : '5th Year';
              const sessionCount = level === '3PS' ? '4 Sessions / Sec' : level === '4PS' ? '5 Sessions / Sec' : '8 Sessions (Key Stage 3)';
              const learners = level === '3PS' 
                ? teacherProfile.learners3PS 
                : level === '4PS' 
                  ? teacherProfile.learners4PS 
                  : teacherProfile.learners5PS;
              const currentClasses = level === '3PS'
                ? (teacherProfile.classesCount3PS || 1)
                : level === '4PS'
                  ? (teacherProfile.classesCount4PS || 1)
                  : (teacherProfile.classesCount5PS || 1);

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleGradeYearChange(level)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold">{level}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {learners || 30} pupils
                    </span>
                  </div>
                  <div className={`text-xs font-semibold mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-600'}`}>
                    {levelTitle} Primary
                  </div>
                  <div className={`text-[10px] mt-1 flex items-center justify-between ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                    <span>{sessionCount}</span>
                    {currentClasses > 1 && (
                      <span className={`font-bold ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                        {currentClasses} classes
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Sequence Menu (Dropdown) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            2. Sequence (Curriculum Unit Menu)
          </label>
          <select
            id="sequence-select"
            value={selectedSequenceNumber}
            onChange={(e) => handleSequenceChange(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all cursor-pointer"
          >
            {sequences.map((seq) => (
              <option key={seq.number} value={seq.number}>
                Sequence {seq.number}: {seq.title}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Section Menu (Dropdown) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            3. Section (Communicative Topic Menu)
          </label>
          <select
            id="section-select"
            value={selectedSectionNumber}
            onChange={(e) => setSelectedSectionNumber(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all cursor-pointer"
          >
            {sections.map((sec) => (
              <option key={sec.number} value={sec.number}>
                Section {sec.number}: {sec.title}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Session Stage Menu (Dropdown) & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              4. Session Menu (Didactic Step & Progression)
            </label>
            <select
              id="session-select"
              value={selectedSessionType}
              onChange={(e) => setSelectedSessionType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all cursor-pointer"
            >
              {sessionOptions.map((opt) => (
                <option key={opt.id} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="duration-input"
                type="number"
                min={15}
                max={180}
                step={5}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <span className="text-xs font-medium text-slate-500">min</span>
            </div>
          </div>
        </div>

        {/* 5. Official Curriculum Resources Summary Preview Card */}
        {currentPreset && (
          <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 uppercase tracking-wide text-[11px] flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Didactic Guide Presets: {currentPreset.sequenceTitle} → {currentPreset.sectionTitle}
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                Official CNP Standards
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[11px]">
              <div>
                <strong className="text-emerald-900">Vocabulary:</strong> {currentPreset.vocabulary.slice(0, 8).join(', ')}...
              </div>
              <div>
                <strong className="text-emerald-900">Grammar:</strong> {currentPreset.grammar.slice(0, 2).join('; ')}
              </div>
              <div>
                <strong className="text-emerald-900">Phonics:</strong> {currentPreset.phonics}
              </div>
              <div>
                <strong className="text-emerald-900">Handwriting:</strong> {currentPreset.handwritingFamily || 'Standard stroke progression'}
              </div>
            </div>
          </div>
        )}

        {/* 6. Advanced Pedagogical Fine-Tuning Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span>{showAdvanced ? 'Hide Custom Objectives & Options' : 'Customize Objectives, Special Needs & VAKT (Optional)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Advanced Options Accordion */}
        {showAdvanced && (
          <div className="space-y-3.5 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
            
            {/* Custom Objectives Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Learning Objectives (Semicolon Separated)
              </label>
              <textarea
                id="custom-objectives-input"
                rows={2}
                value={customObjectives}
                onChange={(e) => setCustomObjectives(e.target.value)}
                placeholder="e.g. Introduce family members; discriminate /f/ and /m/; act out family puppets dialogue..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* VAKT and Framework */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Didactic Framework
                </label>
                <select
                  id="framework-select"
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as PedagogicalFramework)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="didactic_guide_algeria">Algerian Didactic Guide (Sing/Listen/Read/Write/Play)</option>
                  <option value="action_oriented_clil">Action-Oriented SLA (Head, Heart, Hand)</option>
                  <option value="universal_design_udl">Universal Design for Learning (UDL)</option>
                  <option value="blooms_differentiated">Differentiated Bloom’s Taxonomy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perceptual Channel (VAKT Model)
                </label>
                <select
                  id="vakt-select"
                  value={vaktEmphasis}
                  onChange={(e) => setVaktEmphasis(e.target.value as VAKTEmphasis)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Multisensory (All 4)">Multisensory (VAKT: Visual, Auditory, Kinesthetic, Tactile)</option>
                  <option value="Kinesthetic">Kinesthetic & TPR (Movement & Action)</option>
                  <option value="Visual">Visual Emphasis (Flashcards & Realia)</option>
                  <option value="Auditory">Auditory Emphasis (Songs, Chants & Rhymes)</option>
                  <option value="Tactile">Tactile & Motor (Puppets & Tracing)</option>
                </select>
              </div>
            </div>

            {/* Additional Teacher Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Teacher Context / Remediation Focus
              </label>
              <input
                id="additional-context-input"
                type="text"
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder="e.g. Include phonemic articulation mirror drills for /θ/ and /ð/ confusion; prepare puppet dialogue cards"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="inline-flex items-center text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSpecialNeeds}
                  onChange={(e) => setIncludeSpecialNeeds(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mr-2"
                />
                <span>Include Special Needs & Multi-Tier SLA Accommodations (Dysgraphia, Dyslexia, ADHD)</span>
              </label>

              <label className="inline-flex items-center text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeClassroomFormat}
                  onChange={(e) => setIncludeClassroomFormat(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mr-2"
                />
                <span>Include Printable Handouts & Google Classroom Exportable Materials</span>
              </label>
            </div>

          </div>
        )}

        {/* Generate Action Button */}
        <div className="pt-2">
          <button
            id="generate-lesson-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Didactic Plan for {gradeYear}...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Generate Official Didactic Lesson Plan ({gradeYear})</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
