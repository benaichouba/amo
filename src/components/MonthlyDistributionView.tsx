import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Plus, 
  Printer, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Layers, 
  GraduationCap,
  CalendarCheck,
  Zap,
  Info,
  Target,
  Download,
  Loader2
} from 'lucide-react';
import { 
  DidacticYear, 
  MonthlyDistributionConfig, 
  MonthlyCalendarEvent, 
  MonthlySessionPlan, 
  SessionStatus,
  TeacherProfile, 
  LicenseInfo, 
  LessonGenerationParams 
} from '../types';
import { 
  MONTH_OPTIONS, 
  DEFAULT_ALGERIAN_HOLIDAYS, 
  generateMonthlyDistribution,
  getAvailableSequencesForGrade,
  getAvailableSectionsForGradeAndSequence,
  getAvailableSessionsForGrade,
  calculateStartingSession
} from '../utils/monthlyDistributionHelper';
import { AddEventModal } from './AddEventModal';
import { PrintableMonthlyDistribution } from './PrintableMonthlyDistribution';

interface MonthlyDistributionViewProps {
  licenseInfo: LicenseInfo;
  teacherProfile: TeacherProfile;
  onOpenPurchase: () => void;
  onOpenTeacherProfile: () => void;
  onSelectSessionToGenerate: (params: LessonGenerationParams) => void;
}

export const MonthlyDistributionView: React.FC<MonthlyDistributionViewProps> = ({
  licenseInfo,
  teacherProfile,
  onOpenPurchase,
  onOpenTeacherProfile,
  onSelectSessionToGenerate
}) => {
  // State for selections
  const [selectedGrade, setSelectedGrade] = useState<DidacticYear>('3PS');
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // October default
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  
  // Last taught session state (User indicates last taught sequence, section, and session)
  // 0 means no session taught yet (fresh start starting at Session 1)
  const [lastSequenceNumber, setLastSequenceNumber] = useState<number>(1);
  const [lastSectionNumber, setLastSectionNumber] = useState<number>(1);
  const [lastSessionNumber, setLastSessionNumber] = useState<number>(0);
  
  // Custom user-added events (stored in localStorage)
  const [customEvents, setCustomEvents] = useState<MonthlyCalendarEvent[]>(() => {
    try {
      const stored = localStorage.getItem('didactiplan_custom_events');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals & Print view state
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  const [isPrintView, setIsPrintView] = useState<boolean>(false);

  // Available options for last taught sequence, section, and session
  const availableSequences = useMemo(() => {
    return getAvailableSequencesForGrade(selectedGrade);
  }, [selectedGrade]);

  const availableSections = useMemo(() => {
    return getAvailableSectionsForGradeAndSequence(selectedGrade, lastSequenceNumber);
  }, [selectedGrade, lastSequenceNumber]);

  const availableSessions = useMemo(() => {
    return getAvailableSessionsForGrade(selectedGrade);
  }, [selectedGrade]);

  // Adjust section if out of bounds for selected sequence
  useEffect(() => {
    if (availableSections.length > 0 && !availableSections.some(s => s.sectionNumber === lastSectionNumber)) {
      setLastSectionNumber(availableSections[0].sectionNumber);
    }
  }, [availableSections, lastSectionNumber]);

  // Calculate starting session state
  const startingSessionState = useMemo(() => {
    return calculateStartingSession(selectedGrade, lastSequenceNumber, lastSectionNumber, lastSessionNumber);
  }, [selectedGrade, lastSequenceNumber, lastSectionNumber, lastSessionNumber]);

  // Generated distribution state
  const [distribution, setDistribution] = useState<MonthlyDistributionConfig>(() => {
    return generateMonthlyDistribution(
      selectedYear,
      selectedMonth,
      selectedGrade,
      customEvents,
      teacherProfile,
      { sequenceNumber: 1, sectionNumber: 1, sessionNumber: 0 }
    );
  });

  // Re-generate distribution when filters change
  useEffect(() => {
    const newDist = generateMonthlyDistribution(
      selectedYear,
      selectedMonth,
      selectedGrade,
      customEvents,
      teacherProfile,
      {
        sequenceNumber: lastSequenceNumber,
        sectionNumber: lastSectionNumber,
        sessionNumber: lastSessionNumber
      }
    );
    setDistribution(newDist);
  }, [
    selectedGrade, 
    selectedMonth, 
    selectedYear, 
    customEvents, 
    lastSequenceNumber, 
    lastSectionNumber, 
    lastSessionNumber, 
    teacherProfile
  ]);

  // Handle adding custom event
  const handleAddCustomEvent = (event: MonthlyCalendarEvent) => {
    const updated = [...customEvents, event];
    setCustomEvents(updated);
    try {
      localStorage.setItem('didactiplan_custom_events', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom event', e);
    }
  };

  // Handle deleting custom event
  const handleDeleteCustomEvent = (id: string) => {
    const updated = customEvents.filter(e => e.id !== id);
    setCustomEvents(updated);
    try {
      localStorage.setItem('didactiplan_custom_events', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Handle session status update (Taught / Scheduled / etc.)
  const handleToggleSessionStatus = (sessionId: string) => {
    setDistribution(prev => {
      const updatedSessions = prev.sessions.map(s => {
        if (s.id === sessionId) {
          const nextStatus: SessionStatus = s.status === 'taught' ? 'scheduled' : 'taught';
          return { ...s, status: nextStatus };
        }
        return s;
      });
      return { ...prev, sessions: updatedSessions };
    });
  };

  // Quick 1-click generation of the full 60m lesson plan
  const handleGenerateSessionPlan = (session: MonthlySessionPlan) => {
    const params: LessonGenerationParams = {
      subject: 'english_primary',
      gradeYear: session.year,
      topic: `${session.sequenceTitle} - ${session.sectionTitle}: ${session.sessionName}`,
      sequenceTitle: session.sequenceTitle,
      sectionTitle: session.sectionTitle,
      sessionType: session.sessionType,
      durationMinutes: 60,
      presetId: session.presetId,
      customObjectives: session.communicativeObjectives.join('\n'),
      teacherProfile
    };

    onSelectSessionToGenerate(params);
  };

  // Print view mode
  if (isPrintView) {
    return (
      <PrintableMonthlyDistribution
        distribution={distribution}
        teacherProfile={teacherProfile}
        onBack={() => setIsPrintView(false)}
      />
    );
  }

  // Filter events relevant to this month
  const monthEvents = [...DEFAULT_ALGERIAN_HOLIDAYS, ...customEvents].filter(event => {
    const eventDate = new Date(event.date);
    const inMonth = eventDate.getFullYear() === selectedYear && (eventDate.getMonth() + 1) === selectedMonth;
    if (inMonth) return true;
    if (event.endDate) {
      const end = new Date(event.endDate);
      const start = new Date(event.date);
      const targetMonthStart = new Date(selectedYear, selectedMonth - 1, 1);
      const targetMonthEnd = new Date(selectedYear, selectedMonth, 0);
      return start <= targetMonthEnd && end >= targetMonthStart;
    }
    return false;
  });

  const activeTeachingSessions = distribution.sessions.filter(s => !s.isSuspended).length;
  const suspendedSessions = distribution.sessions.filter(s => s.isSuspended).length;
  const taughtSessions = distribution.sessions.filter(s => s.status === 'taught').length;

  // Weeks list for the 4-column table
  const weeks = [1, 2, 3, 4];
  const sessionRows: (1 | 2)[] = [1, 2];

  // Helper to find session plan for a given week & session number
  const getSessionPlan = (weekNum: number, sessNum: 1 | 2): MonthlySessionPlan | undefined => {
    return distribution.sessions.find(s => s.weekNumber === weekNum && s.sessionNumber === sessNum);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Pro Exclusive Feature Header / Banner */}
      {!licenseInfo.isPro ? (
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-2xl p-6 text-white shadow-lg shadow-amber-600/20 border border-amber-400/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-950/40 text-amber-200 border border-amber-300/30">
                <Crown className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                DidactiPlan Pro • Algerian Monthly Curriculum Distribution
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                Monthly Distribution Table (4 Weeks × 2 Sessions)
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                Structured into <strong>4 Columns (4 Weeks) and 2 Lines (2 Sessions/week of 60 min)</strong>. Automatically aligns with the official Algerian Didactic Guide objectives, maps school holidays, and enables 1-click lesson sheet generation.
              </p>
            </div>
            
            <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
              <button
                onClick={onOpenPurchase}
                className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 border border-amber-400/30"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Unlock Pro Version (4 Pricing Choices)</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-amber-100/90">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-amber-200" />
              <span>Interactive table preview with official Didactic Guide objectives.</span>
            </div>
            <span className="font-semibold text-white">Academic Year: {teacherProfile.academicYear || '2025/2026'}</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
              <CalendarCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                  Monthly Curriculum Distribution
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  <Crown className="w-3 h-3 mr-1 text-amber-700" /> Pro VIP Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official Algerian Syllabus Table • <strong>4 Columns (4 Weeks) × 2 Lines (2 Sessions/week)</strong> • Academic Year: <strong className="text-slate-800">{teacherProfile.academicYear || '2025/2026'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={() => setIsAddEventOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5 text-emerald-700" />
              Add Event
            </button>
            <button
              onClick={() => setIsPrintView(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export PDF
            </button>
            <button
              onClick={() => setIsPrintView(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print Sheet
            </button>
          </div>
        </div>
      )}

      {/* 2. Control Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-4">
        
        {/* Row 1: Grade Year Level Switcher & Academic Year Auto Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div>
            <span className="font-bold text-slate-800 text-sm flex items-center">
              <GraduationCap className="w-4 h-4 mr-1.5 text-emerald-600" />
              Target Class Level
            </span>
            <span className="text-[11px] text-slate-500">Each cohort is scheduled for 2 sessions of 60 mins per week</span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Auto Academic Year Badge */}
            <div 
              onClick={onOpenTeacherProfile}
              className="inline-flex items-center px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 font-mono font-bold text-xs cursor-pointer transition-colors"
              title="Click to edit teacher profile and academic year"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
              <span>Year: {teacherProfile.academicYear || '2025/2026'}</span>
              <Edit3 className="w-3 h-3 ml-1.5 text-slate-400" />
            </div>

            {/* Level Switcher */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              {(['3PS', '4PS', '5PS'] as DidacticYear[]).map((yr) => {
                const isSelected = selectedGrade === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => setSelectedGrade(yr)}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {yr} Primary
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Month & Calendar Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-3.5 border-b border-slate-100">
          
          {/* Month Selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Academic Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white font-medium cursor-pointer"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name} • {m.academicTerm}
                </option>
              ))}
            </select>
          </div>

          {/* Calendar Year */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">
              Calendar Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white font-medium cursor-pointer"
            >
              <option value={2025}>2025 (Trimester 1)</option>
              <option value={2026}>2026 (Trimester 2 & 3)</option>
              <option value={2027}>2027</option>
            </select>
          </div>

        </div>

        {/* Row 3: Last Taught Progression Controls (Sequence, Section, Session) */}
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200 space-y-3">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span className="text-xs">Your Last Taught Didactic Session</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Select where you stopped. If you are starting fresh, choose <strong>"None taught yet"</strong> so the distribution begins with Session 1.
              </p>
            </div>

            {/* Calculated Starting Session Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-white rounded-lg border border-emerald-300 shadow-2xs text-[11px] text-emerald-950 font-bold space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Starts at: Seq {startingSessionState.sequenceNumber}, Sec {startingSessionState.sectionNumber}, Session {startingSessionState.sessionNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* 1. Last Sequence */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 text-[11px] block">
                1. Target / Last Sequence
              </label>
              <select
                value={lastSequenceNumber}
                onChange={(e) => setLastSequenceNumber(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-medium cursor-pointer text-xs"
              >
                {availableSequences.map((seq) => (
                  <option key={seq.sequenceNumber} value={seq.sequenceNumber}>
                    {seq.sequenceTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Last Section */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 text-[11px] block">
                2. Target / Last Section
              </label>
              <select
                value={lastSectionNumber}
                onChange={(e) => setLastSectionNumber(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-medium cursor-pointer text-xs"
              >
                {availableSections.map((sec) => (
                  <option key={sec.sectionNumber} value={sec.sectionNumber}>
                    {sec.sectionTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Last Session */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 text-[11px] block">
                3. Last Session Completed
              </label>
              <select
                value={lastSessionNumber}
                onChange={(e) => setLastSessionNumber(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-white font-medium cursor-pointer text-xs"
              >
                <option value={0}>None taught yet (Start with Session 1)</option>
                {availableSessions.map((sess) => (
                  <option key={sess.sessionNumber} value={sess.sessionNumber}>
                    Session {sess.sessionNumber}: {sess.type} (Completed)
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Stats Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Standard 4-Week Grid</span>
            <span className="text-lg font-extrabold text-slate-900">4 Weeks • 8 Sessions</span>
          </div>
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-800 block uppercase font-bold">Active Teaching</span>
            <span className="text-lg font-extrabold text-emerald-700">{activeTeachingSessions} sessions</span>
          </div>
          <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200">
            <span className="text-[10px] text-rose-800 block uppercase font-bold">Holidays & Suspensions</span>
            <span className="text-lg font-extrabold text-rose-700">{suspendedSessions} suspended</span>
          </div>
          <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200">
            <span className="text-[10px] text-teal-800 block uppercase font-bold">Completed / Taught</span>
            <span className="text-lg font-extrabold text-teal-800">{taughtSessions} / {activeTeachingSessions}</span>
          </div>
        </div>

      </div>

      {/* 3. Holidays & Suspended Days Alert Card for this Month */}
      {monthEvents.length > 0 && (
        <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-4 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-bold text-amber-950 text-xs">
                Identified Holidays & Events in {distribution.monthName} ({monthEvents.length})
              </span>
            </div>
            <button
              onClick={() => setIsAddEventOpen(true)}
              className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer flex items-center"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add custom event
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {monthEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs flex items-start justify-between"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-900 text-[11px]">{evt.title}</span>
                    {evt.isSuspended ? (
                      <span className="px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-800 text-[9px] font-extrabold">
                        Suspended
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[9px] font-extrabold">
                        Class On
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-amber-800 font-mono font-semibold">
                    {evt.date} {evt.endDate ? `to ${evt.endDate}` : ''}
                  </div>
                </div>

                {evt.isCustom && (
                  <button
                    onClick={() => handleDeleteCustomEvent(evt.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                    title="Delete custom event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. THE 4 COLUMNS (4 WEEKS) × 2 LINES (2 SESSIONS) OFFICIAL TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold font-serif flex items-center">
              <CalendarCheck className="w-4 h-4 mr-2 text-emerald-400" />
              Monthly Distribution Grid • {selectedGrade} ({distribution.monthName})
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              4 Columns (4 Weeks) × 2 Lines (2 Sessions/week) • Academic Year: <strong>{teacherProfile.academicYear || '2025/2026'}</strong>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPrintView(true)}
              className="inline-flex items-center px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              PDF Export
            </button>
            <button
              onClick={() => setIsPrintView(true)}
              className="inline-flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all border border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1" />
              Print
            </button>
          </div>
        </div>

        {/* Required Pre-Table Information Header Block */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Level</span>
              <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                {selectedGrade} Primary School
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Teacher's Full Name</span>
              <span className="font-bold text-slate-900">
                {teacherProfile.fullName || 'Primary English Teacher'}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">School</span>
              <span className="font-semibold text-slate-800">
                {teacherProfile.schoolName || 'Primary School'}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Academic Year</span>
              <span className="font-bold text-emerald-800">
                {teacherProfile.academicYear || '2025/2026'}
              </span>
            </div>
          </div>

          <div className="text-center py-2 bg-emerald-50/80 rounded-xl border border-emerald-200">
            <h4 className="text-sm sm:text-base font-extrabold uppercase font-serif tracking-wider text-emerald-950">
              Monthly Distribution of {distribution.monthName}
            </h4>
            <p className="text-[11px] text-emerald-800 font-medium">
              4 Weeks × 2 Sessions / Week (60 min each)
            </p>
          </div>
        </div>

        {/* The Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            
            {/* Table Header: 4 Columns (4 Weeks) */}
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                <th className="py-3 px-4 w-36 sm:w-44 border-r border-slate-200 text-xs font-extrabold uppercase tracking-wider text-center bg-slate-200/60">
                  <div className="text-slate-900 font-bold">Sessions / Weeks</div>
                </th>
                
                {weeks.map((weekNum) => (
                  <th key={weekNum} className="py-3 px-4 min-w-[260px] sm:min-w-[280px] border-r border-slate-200 last:border-r-0 text-center">
                    <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100/80 text-emerald-950 rounded-lg font-bold text-xs border border-emerald-200">
                      <span>Week {weekNum}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: 2 Lines (2 Sessions) */}
            <tbody className="divide-y divide-slate-200 text-xs">
              {sessionRows.map((sessNum) => (
                <tr key={sessNum} className="hover:bg-slate-50/40 transition-colors">
                  
                  {/* Row Label (Line Header) */}
                  <td className="py-4 px-3.5 border-r border-slate-200 bg-slate-50/90 align-top">
                    <div className="sticky left-0 space-y-1.5 text-center">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center font-bold shadow-xs">
                        <span className="text-[9px] uppercase tracking-tighter">Line {sessNum}</span>
                        <span className="text-sm font-extrabold">S{sessNum}</span>
                      </div>
                      <div className="font-extrabold text-slate-900 text-xs">
                        Session {sessNum}
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold">
                        60 Minutes
                      </span>
                    </div>
                  </td>

                  {/* 4 Week Columns for this Session Line */}
                  {weeks.map((weekNum) => {
                    const session = getSessionPlan(weekNum, sessNum);
                    
                    if (!session) {
                      return (
                        <td key={weekNum} className="py-4 px-3.5 border-r border-slate-200 last:border-r-0 align-top text-center text-slate-400">
                          -
                        </td>
                      );
                    }

                    if (session.isSuspended) {
                      return (
                        <td key={weekNum} className="py-4 px-3.5 border-r border-slate-200 last:border-r-0 align-top bg-rose-50/60">
                          <div className="h-full flex flex-col justify-between space-y-3 p-3 bg-white rounded-xl border border-rose-200 shadow-2xs">
                            <div className="space-y-1.5">
                              <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-200">
                                Holiday / Class Suspension
                              </div>
                              <div className="font-bold text-rose-950 text-xs">
                                {session.sessionName}
                              </div>
                              <p className="text-[11px] text-rose-700 leading-relaxed">
                                {session.communicativeObjectives[0]}
                              </p>
                            </div>

                            <div className="text-[10px] text-slate-500 italic bg-rose-50 p-2 rounded-lg border border-rose-100">
                              Didactic progression resumes on the next scheduled session.
                            </div>
                          </div>
                        </td>
                      );
                    }

                    const isTaught = session.status === 'taught';

                    return (
                      <td 
                        key={weekNum} 
                        className={`py-4 px-3.5 border-r border-slate-200 last:border-r-0 align-top transition-colors ${
                          isTaught ? 'bg-emerald-50/30' : ''
                        }`}
                      >
                        <div className="h-full flex flex-col justify-between space-y-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all">
                          
                          {/* Top: Sequence & Section */}
                          <div className="space-y-2">
                            
                            {/* Sequence Tag */}
                            <div className="flex items-center justify-between gap-1">
                              <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-200">
                                {session.sequenceTitle}
                              </span>
                              {isTaught && (
                                <span className="px-1.5 py-0.2 rounded-md font-bold text-[9px] bg-emerald-600 text-white flex items-center">
                                  <CheckCircle2 className="w-3 h-3 mr-0.5" /> Done
                                </span>
                              )}
                            </div>

                            {/* Section Title */}
                            <div className="text-[11px] font-bold text-slate-700 flex items-center">
                              <span className="text-emerald-700 mr-1">•</span>
                              <span>{session.sectionTitle}</span>
                            </div>

                            {/* Session Name / Rubric Title */}
                            <div className="text-xs font-extrabold text-slate-900 leading-tight">
                              {session.sessionName}
                            </div>

                            {/* Session Objective (Copied from Didactic Guide) */}
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                              <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                                <Target className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>Session Objective (from Didactic Guide):</span>
                              </div>
                              <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                                "{session.communicativeObjectives[0]}"
                              </p>
                            </div>

                            {/* Linguistic Chips (Lexis & Phonics) */}
                            <div className="flex flex-wrap gap-1 pt-0.5 text-[10px]">
                              {session.vocabulary.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  <strong>Lexis:</strong> {session.vocabulary.slice(0, 3).join(', ')}
                                </span>
                              )}
                              {session.phonics && (
                                <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                                  <strong>Phonics:</strong> {session.phonics.split(' ')[0]}
                                </span>
                              )}
                            </div>

                          </div>

                          {/* Bottom Action Buttons */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                            
                            {/* Toggle Mark Taught */}
                            <button
                              onClick={() => handleToggleSessionStatus(session.id)}
                              className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                                isTaught
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              title={isTaught ? 'Mark as Scheduled' : 'Mark as Taught'}
                            >
                              <CheckCircle2 className={`w-3 h-3 ${isTaught ? 'text-emerald-700' : 'text-slate-400'}`} />
                              <span>{isTaught ? 'Taught' : 'Mark Done'}</span>
                            </button>

                            {/* 1-Click Generate 60m Lesson Plan */}
                            <button
                              onClick={() => handleGenerateSessionPlan(session)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-2xs transition-all cursor-pointer flex items-center space-x-1"
                              title="Load this session into Lesson Plan Studio to generate the official 60-minute lesson plan"
                            >
                              <Zap className="w-3 h-3 text-amber-300" />
                              <span>Generate 60m Plan</span>
                            </button>

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

        {/* Footer Note */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>* Each week comprises 2 pedagogical sessions of 60 minutes as prescribed by the Ministry of National Education.</span>
          <button
            onClick={() => setIsPrintView(true)}
            className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Open Inspection-Ready Landscape Print Sheet</span>
          </button>
        </div>

      </div>

      {/* Add Custom Event Modal */}
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={handleAddCustomEvent}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

    </div>
  );
};
