import { DidacticYear, MonthlyCalendarEvent, MonthlySessionPlan, MonthlyDistributionConfig, TeacherProfile, EventCategoryType } from '../types';
import { DIDACTIC_GUIDE_3PS_PRESETS, DIDACTIC_GUIDE_4PS_PRESETS, DIDACTIC_GUIDE_5PS_PRESETS } from '../data/didacticCurriculum';
import { SeptemberConfig, getMinistryCalendarForYear } from './ministryCalendarHelper';

export const DAYS_OF_WEEK = [
  { dayIndex: 0, name: 'Sunday', short: 'Sun' },
  { dayIndex: 1, name: 'Monday', short: 'Mon' },
  { dayIndex: 2, name: 'Tuesday', short: 'Tue' },
  { dayIndex: 3, name: 'Wednesday', short: 'Wed' },
  { dayIndex: 4, name: 'Thursday', short: 'Thu' }
];

export const TIMETABLE_PRESETS = [
  { id: 'sun_tue', label: 'Sunday & Tuesday', days: [0, 2] },
  { id: 'sun_wed', label: 'Sunday & Wednesday', days: [0, 3] },
  { id: 'mon_wed', label: 'Monday & Wednesday', days: [1, 3] },
  { id: 'mon_thu', label: 'Monday & Thursday', days: [1, 4] },
  { id: 'tue_thu', label: 'Tuesday & Thursday', days: [2, 4] },
  { id: 'sun_thu', label: 'Sunday & Thursday', days: [0, 4] },
];

export const MONTH_OPTIONS = [
  { value: 9, name: 'September', academicTerm: 'Trimester 1' },
  { value: 10, name: 'October', academicTerm: 'Trimester 1' },
  { value: 11, name: 'November', academicTerm: 'Trimester 1' },
  { value: 12, name: 'December', academicTerm: 'Trimester 1' },
  { value: 1, name: 'January', academicTerm: 'Trimester 2' },
  { value: 2, name: 'February', academicTerm: 'Trimester 2' },
  { value: 3, name: 'March', academicTerm: 'Trimester 2' },
  { value: 4, name: 'April', academicTerm: 'Trimester 3' },
  { value: 5, name: 'May', academicTerm: 'Trimester 3' },
  { value: 6, name: 'June', academicTerm: 'Trimester 3' },
];

// ==========================================
// ==========================================
// Default Algerian Official School Holidays
// ==========================================
export function getAlgerianHolidaysForYear(year: number = 2026): MonthlyCalendarEvent[] {
  const nextYear = year + 1;
  return [
    {
      id: `holiday-revolution-day-${year}`,
      title: 'Revolution Day (1st November)',
      date: `${year}-11-01`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'National public holiday commemorating the outbreak of the Algerian War of Independence.'
    },
    {
      id: `holiday-autumn-break-${year}`,
      title: 'Autumn School Holiday',
      date: `${year}-10-28`,
      endDate: `${year}-11-02`,
      isSuspended: true,
      category: 'school_break',
      description: 'Official Ministry of National Education autumn break for primary schools.'
    },
    {
      id: `holiday-new-year-${nextYear}`,
      title: "New Year's Day",
      date: `${nextYear}-01-01`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'Public holiday.'
    },
    {
      id: `holiday-yennayer-${nextYear}`,
      title: `Yennayer (Amazigh New Year ${nextYear + 950})`,
      date: `${nextYear}-01-12`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'Official national holiday celebrating Amazigh heritage.'
    },
    {
      id: `holiday-winter-break-${year}-${nextYear}`,
      title: 'Winter School Holiday (15 Days)',
      date: `${year}-12-18`,
      endDate: `${nextYear}-01-04`,
      isSuspended: true,
      category: 'school_break',
      description: 'Trimester 1 winter holidays for primary students.'
    },
    {
      id: `holiday-chahid-day-${nextYear}`,
      title: 'National Martyr / Chahid Day',
      date: `${nextYear}-02-18`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'National remembrance day across all educational institutions.'
    },
    {
      id: `holiday-victory-day-${nextYear}`,
      title: 'Victory Day (Eid En-Nasr)',
      date: `${nextYear}-03-19`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'National holiday.'
    },
    {
      id: `holiday-spring-break-${nextYear}`,
      title: 'Spring School Holiday (15 Days)',
      date: `${nextYear}-03-19`,
      endDate: `${nextYear}-04-05`,
      isSuspended: true,
      category: 'school_break',
      description: 'Trimester 2 spring holidays for primary schools.'
    },
    {
      id: `holiday-eid-al-fitr-${nextYear}`,
      title: 'Eid al-Fitr (3 Days)',
      date: `${nextYear}-03-20`,
      endDate: `${nextYear}-03-23`,
      isSuspended: true,
      category: 'religious_holiday',
      description: 'Religious Islamic holiday.'
    },
    {
      id: `holiday-knowledge-day-${nextYear}`,
      title: 'Youm El-Ilm (Knowledge Day)',
      date: `${nextYear}-04-16`,
      isSuspended: false, // Normal school day with didactic activities commemorating Sheikh Ben Badis
      category: 'school_event',
      description: 'Commemoration of Sheikh Abdelhamid Ben Badis with educational projects.'
    },
    {
      id: `holiday-labour-day-${nextYear}`,
      title: 'Labour Day',
      date: `${nextYear}-05-01`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'International Workers Day.'
    },
    {
      id: `holiday-eid-al-adha-${nextYear}`,
      title: 'Eid al-Adha (3 Days)',
      date: `${nextYear}-05-27`,
      endDate: `${nextYear}-05-30`,
      isSuspended: true,
      category: 'religious_holiday',
      description: 'Religious Islamic holiday.'
    },
    {
      id: `holiday-islamic-new-year-${nextYear}`,
      title: 'Awal Muharram (Hijri New Year)',
      date: `${nextYear}-06-17`,
      isSuspended: true,
      category: 'religious_holiday',
      description: 'Hijri New Year holiday.'
    },
    {
      id: `holiday-independence-day-${nextYear}`,
      title: 'Independence & Youth Day (5th July)',
      date: `${nextYear}-07-05`,
      isSuspended: true,
      category: 'national_holiday',
      description: 'Algerian National Independence Day.'
    }
  ];
}

export const DEFAULT_ALGERIAN_HOLIDAYS: MonthlyCalendarEvent[] = getAlgerianHolidaysForYear(2026);

// Helper to check if a specific date string (YYYY-MM-DD) falls within an event
export function findEventForDate(dateStr: string, events: MonthlyCalendarEvent[]): MonthlyCalendarEvent | undefined {
  const targetTime = new Date(dateStr).getTime();
  
  return events.find(event => {
    const startTime = new Date(event.date).getTime();
    if (event.endDate) {
      const endTime = new Date(event.endDate).getTime();
      return targetTime >= startTime && targetTime <= endTime;
    }
    return event.date === dateStr;
  });
}

// Generate all session dates for a month given 2 days per week
export interface CalculatedSessionDate {
  date?: string; // Optional reference date
  weekNumber: number; // 1, 2, 3, 4
  sessionNumber: 1 | 2; // Session 1 or Session 2
  event?: MonthlyCalendarEvent;
  isSuspended: boolean;
}

export interface LastTaughtSessionConfig {
  sequenceNumber: number; // 1-6
  sectionNumber: number;  // 1-2 (or 3)
  sessionNumber: number;  // 0 = Start with Session 1 (Fresh start); 1 = Session 1 taught (Next is Session 2); etc.
}

// Helper to get available sequences for a grade
export function getAvailableSequencesForGrade(gradeYear: DidacticYear): { sequenceNumber: number; sequenceTitle: string }[] {
  let presets = DIDACTIC_GUIDE_3PS_PRESETS;
  if (gradeYear === '4PS') presets = DIDACTIC_GUIDE_4PS_PRESETS;
  if (gradeYear === '5PS') presets = DIDACTIC_GUIDE_5PS_PRESETS;

  const map = new Map<number, string>();
  presets.forEach(p => {
    if (!map.has(p.sequenceNumber)) {
      map.set(p.sequenceNumber, p.sequenceTitle);
    }
  });

  return Array.from(map.entries()).map(([num, title]) => ({
    sequenceNumber: num,
    sequenceTitle: `Sequence ${num}: ${title}`
  })).sort((a, b) => a.sequenceNumber - b.sequenceNumber);
}

// Helper to get available sections for a grade and sequence
export function getAvailableSectionsForGradeAndSequence(
  gradeYear: DidacticYear, 
  sequenceNumber: number
): { sectionNumber: number; sectionTitle: string }[] {
  let presets = DIDACTIC_GUIDE_3PS_PRESETS;
  if (gradeYear === '4PS') presets = DIDACTIC_GUIDE_4PS_PRESETS;
  if (gradeYear === '5PS') presets = DIDACTIC_GUIDE_5PS_PRESETS;

  const seqPresets = presets.filter(p => p.sequenceNumber === sequenceNumber);
  const map = new Map<number, string>();
  seqPresets.forEach(p => {
    if (!map.has(p.sectionNumber)) {
      map.set(p.sectionNumber, p.sectionTitle);
    }
  });

  return Array.from(map.entries()).map(([num, title]) => ({
    sectionNumber: num,
    sectionTitle: `Section ${num}: ${title}`
  })).sort((a, b) => a.sectionNumber - b.sectionNumber);
}

// Didactic Rubric Session Types based on official syllabus (60 min each)
export const SESSION_TYPES_3PS = [
  {
    sessionNumber: 1,
    title: 'Session 1: I Sing & Have Fun (10m) + I Listen & Repeat (50m)',
    type: 'Oral 1: Discovery & Auditory Receptive Input',
    rubricObjective: 'Identify and orally repeat key communicative chunks and vocabulary in response to audio rhymes and flashcards with slates.'
  },
  {
    sessionNumber: 2,
    title: 'Session 2: I Discover & Practice (Vocabulary & Formulaic Exchanges)',
    type: 'Oral 2: Guided Production & Pair Interaction',
    rubricObjective: 'Ask and answer basic formulaic questions using slates, realia, and peer dialogues.'
  },
  {
    sessionNumber: 3,
    title: 'Session 3: I Read & Write (Phonics Isolation & Handwriting)',
    type: 'Written 1: Grapheme-Phoneme & Letter Families',
    rubricObjective: 'Isolate target phonemes and trace handwriting letter families in print lowercase on ruled baselines.'
  },
  {
    sessionNumber: 4,
    title: 'Session 4: I Play & Learn / Mini-Task (Formative Check)',
    type: 'Integration: Formative Task & Classroom Presentation',
    rubricObjective: 'Reinvest acquired communicative structures in an active mini-project, game, or roleplay.'
  }
];

export const SESSION_TYPES_4PS = [
  {
    sessionNumber: 1,
    title: 'Session 1: Oral Installation (I Listen & Discover)',
    type: 'Oral Discovery & Listening Comprehension',
    rubricObjective: 'Listen to oral dialogues and identify target linguistic structures in familiar situations.'
  },
  {
    sessionNumber: 2,
    title: 'Session 2: I Practice & Say Sounds (Grammar & Phonics)',
    type: 'Linguistic Practice & Phonemic Contrast',
    rubricObjective: 'Manipulate basic syntax patterns and contrast vowel/consonant phonemes in speech.'
  },
  {
    sessionNumber: 3,
    title: 'Session 3: I Read & Enjoy (Reading & Meaning)',
    type: 'Reading Comprehension & Word Recognition',
    rubricObjective: 'Read short illustrated captions, match words with pictures, and answer basic comprehension queries.'
  },
  {
    sessionNumber: 4,
    title: 'Session 4: I Write & Trace (Connected Cursive & Chunks)',
    type: 'Writing Mechanics & Cursive Flow',
    rubricObjective: 'Write words and short sentences in connected cursive script respecting height and inter-letter spacing.'
  },
  {
    sessionNumber: 5,
    title: 'Session 5: I Play & Consolidate (Pair Action & Integration)',
    type: 'Integration & Pair Collaboration',
    rubricObjective: 'Produce meaningful oral/written chunks collaboratively in a structured communicative situation.'
  }
];

export const SESSION_TYPES_5PS = [
  {
    sessionNumber: 1,
    title: 'Session 1: Oral Interaction & Listening Discovery',
    type: 'Key Stage 3 Oral Interaction',
    rubricObjective: 'Engage in spontaneous dialogue, expressing preferences and describing everyday situations.'
  },
  {
    sessionNumber: 2,
    title: 'Session 2: Linguistic Structures & Syntax Mechanics',
    type: 'Grammar & Syntax Application',
    rubricObjective: 'Apply sentence structures accurately in guided oral and written drills.'
  },
  {
    sessionNumber: 3,
    title: 'Session 3: Reading & Text Exploration (A1.2 Literacy)',
    type: 'Reading for Information & Meaning',
    rubricObjective: 'Read simple informational paragraphs, locate specific details, and deduce meaning from context.'
  },
  {
    sessionNumber: 4,
    title: 'Session 4: Guided Writing & Paragraph Construction',
    type: 'Productive Written Expression',
    rubricObjective: 'Draft a short coherent paragraph (3-4 sentences) using connectors, capitalization, and punctuation.'
  }
];

export function getAvailableSessionsForGrade(gradeYear: DidacticYear) {
  if (gradeYear === '4PS') return SESSION_TYPES_4PS;
  if (gradeYear === '5PS') return SESSION_TYPES_5PS;
  return SESSION_TYPES_3PS;
}

// Calculate the immediate next session in sequence given the last taught session
export function calculateNextSession(
  gradeYear: DidacticYear,
  lastSeq: number,
  lastSec: number,
  lastSess: number
): { sequenceNumber: number; sectionNumber: number; sessionNumber: number } {
  const sessionTypes = getAvailableSessionsForGrade(gradeYear);
  const maxSessions = sessionTypes.length;

  let presets = DIDACTIC_GUIDE_3PS_PRESETS;
  if (gradeYear === '4PS') presets = DIDACTIC_GUIDE_4PS_PRESETS;
  if (gradeYear === '5PS') presets = DIDACTIC_GUIDE_5PS_PRESETS;

  const seqPresets = presets.filter(p => p.sequenceNumber === lastSeq);
  const maxSectionsInSeq = seqPresets.length > 0 ? Math.max(...seqPresets.map(p => p.sectionNumber)) : 2;
  const maxSeqInLevel = Math.max(...presets.map(p => p.sequenceNumber));

  if (lastSess < maxSessions) {
    return {
      sequenceNumber: lastSeq,
      sectionNumber: lastSec,
      sessionNumber: lastSess + 1
    };
  } else {
    // Advance to next section
    if (lastSec < maxSectionsInSeq) {
      return {
        sequenceNumber: lastSeq,
        sectionNumber: lastSec + 1,
        sessionNumber: 1
      };
    } else {
      // Advance to next sequence
      const nextSeq = lastSeq < maxSeqInLevel ? lastSeq + 1 : 1;
      return {
        sequenceNumber: nextSeq,
        sectionNumber: 1,
        sessionNumber: 1
      };
    }
  }
}

// Calculate the starting session for the monthly distribution
// If lastSess is 0 (or less), it means no session in this section has been taught yet,
// so the distribution starts directly from the very first session (Session 1).
export function calculateStartingSession(
  gradeYear: DidacticYear,
  lastSeq: number,
  lastSec: number,
  lastSess: number
): { sequenceNumber: number; sectionNumber: number; sessionNumber: number } {
  if (lastSess <= 0) {
    return {
      sequenceNumber: lastSeq,
      sectionNumber: lastSec,
      sessionNumber: 1
    };
  }

  return calculateNextSession(gradeYear, lastSeq, lastSec, lastSess);
}

// Generate the monthly didactic distribution for 3PS, 4PS, or 5PS
// Structured cleanly as 4 weeks with 2 sessions each of 60 mins (8 sessions per month)
export function generateMonthlyDistribution(
  year: number,
  month: number,
  gradeYear: DidacticYear,
  customEvents: MonthlyCalendarEvent[] = [],
  teacherProfile?: TeacherProfile,
  lastTaughtSession?: LastTaughtSessionConfig,
  septemberConfig?: SeptemberConfig
): MonthlyDistributionConfig {
  const holidaysForYear = getAlgerianHolidaysForYear(year);
  const ministryCalendar = getMinistryCalendarForYear(year);
  const allEvents = [...holidaysForYear, ...customEvents];
  
  // Pick curriculum presets based on grade
  let presets = DIDACTIC_GUIDE_3PS_PRESETS;
  if (gradeYear === '4PS') presets = DIDACTIC_GUIDE_4PS_PRESETS;
  if (gradeYear === '5PS') presets = DIDACTIC_GUIDE_5PS_PRESETS;

  const sessionTypesList = getAvailableSessionsForGrade(gradeYear);

  // Compute starting state: starts with the session that follows the last taught one, or Session 1 if starting fresh
  let currentPointer: { sequenceNumber: number; sectionNumber: number; sessionNumber: number };

  // Needs introductory encounter session if starting at the very beginning of the school year (Sequence 1, Section 1, and sessionNumber === 0)
  // or default in September when starting fresh.
  let pendingIntroductorySession = (
    (!lastTaughtSession && (month === 9 || month === 10)) ||
    (lastTaughtSession?.sequenceNumber === 1 && 
     lastTaughtSession?.sectionNumber === 1 && 
     lastTaughtSession?.sessionNumber === 0)
  );

  if (lastTaughtSession) {
    currentPointer = calculateStartingSession(
      gradeYear,
      lastTaughtSession.sequenceNumber,
      lastTaughtSession.sectionNumber,
      lastTaughtSession.sessionNumber
    );
  } else {
    // Default fallback based on month
    let defaultSeq = 1;
    if (month === 9 || month === 10) defaultSeq = 1;
    else if (month === 11 || month === 12) defaultSeq = 2;
    else if (month === 1) defaultSeq = 3;
    else if (month === 2 || month === 3) defaultSeq = 4;
    else if (month === 4) defaultSeq = 5;
    else if (month === 5 || month === 6) defaultSeq = 6;
    
    currentPointer = {
      sequenceNumber: defaultSeq,
      sectionNumber: 1,
      sessionNumber: 1
    };
  }

  const sessionPlans: MonthlySessionPlan[] = [];

  for (let week = 1; week <= 4; week++) {
    for (let sessNum = 1; sessNum <= 2; sessNum++) {
      
      // Determine if this week / session corresponds to a holiday suspension or pre-school period
      let suspendedEvent: MonthlyCalendarEvent | undefined = undefined;

      // Special handling for September School Start
      if (month === 9) {
        const sepMode = septemberConfig?.mode || 'ministry_auto';
        const activeWeeks = septemberConfig?.activeWeeks || [3, 4];

        if (sepMode === 'ministry_auto' || sepMode === 'weeks_3_4' || sepMode === 'custom_date') {
          if (!activeWeeks.includes(week)) {
            // Pre-rentrée administrative reception & teacher pedagogical organization
            suspendedEvent = {
              id: `pre-rentree-september-w${week}`,
              title: week === 1 
                ? 'الدخول الإداري والتحضير البيداغوجي (Staff Rentrée & Pedagogical Councils)' 
                : 'دخول الأساتذة واستقبال الأفواج (Teacher Rentrée & Welcoming Cohorts)',
              date: `${year}-09-${week === 1 ? '07' : '14'}`,
              isSuspended: true,
              category: 'school_event',
              description: `الفترة السابقة لانطلاق الدروس الرسمية وفق رزنامة وزارة التربية الوطنية (${ministryCalendar.pupilsEntryDate}).`
            };
          }
        }
      }
      
      if (!suspendedEvent && month === 11 && week === 1) {
        // November 1st Revolution Day & Autumn Break
        suspendedEvent = allEvents.find(e => e.id.includes('revolution-day') || e.id.includes('autumn-break'));
      } else if (!suspendedEvent && month === 12 && (week === 3 || week === 4)) {
        // Winter break
        suspendedEvent = allEvents.find(e => e.id.includes('winter-break'));
      } else if (!suspendedEvent && month === 1 && week === 1) {
        // Winter break continuation / New Year
        suspendedEvent = allEvents.find(e => e.id.includes('winter-break') || e.id.includes('new-year'));
      } else if (!suspendedEvent && month === 1 && week === 2 && sessNum === 2) {
        // Yennayer Jan 12
        suspendedEvent = allEvents.find(e => e.id.includes('yennayer'));
      } else if (!suspendedEvent && month === 3 && (week === 3 || week === 4)) {
        // Spring break / Eid al-Fitr
        suspendedEvent = allEvents.find(e => e.id.includes('spring-break') || e.id.includes('eid-al-fitr'));
      } else if (!suspendedEvent && month === 5 && week === 1 && sessNum === 1) {
        // Labour Day May 1st
        suspendedEvent = allEvents.find(e => e.id.includes('labour-day'));
      } else if (!suspendedEvent && month === 5 && week === 4) {
        // Eid al-Adha
        suspendedEvent = allEvents.find(e => e.id.includes('eid-al-adha'));
      }

      // Check any custom added event matching this month
      if (!suspendedEvent && customEvents.length > 0) {
        const customMatch = customEvents.find(e => {
          const d = new Date(e.date);
          return (d.getMonth() + 1) === month;
        });
        if (customMatch && customMatch.isSuspended) {
          suspendedEvent = customMatch;
        }
      }

      if (suspendedEvent && suspendedEvent.isSuspended) {
        // Find preset for display reference
        const currentPreset = presets.find(
          p => p.sequenceNumber === currentPointer.sequenceNumber && p.sectionNumber === currentPointer.sectionNumber
        ) || presets[0];

        sessionPlans.push({
          id: `dist-${gradeYear}-${year}-${month}-w${week}-s${sessNum}`,
          weekNumber: week,
          sessionNumber: sessNum as 1 | 2,
          date: `Week ${week}, Session ${sessNum}`,
          dayName: `Session ${sessNum}`,
          year: gradeYear,
          sequenceNumber: currentPointer.sequenceNumber,
          sequenceTitle: currentPreset?.sequenceTitle || `Sequence ${currentPointer.sequenceNumber}`,
          sectionNumber: currentPointer.sectionNumber,
          sectionTitle: currentPreset?.sectionTitle || `Section ${currentPointer.sectionNumber}`,
          sessionName: `[Suspension] ${suspendedEvent.title}`,
          sessionType: 'Official School Holiday / Class Suspension',
          communicativeObjectives: [
            `Classes officially suspended: ${suspendedEvent.title}. Pedagogical progression shifts to next active session.`
          ],
          vocabulary: [],
          grammar: [],
          phonics: '',
          didacticAids: [],
          isSuspended: true,
          suspensionReason: suspendedEvent.title,
          status: 'suspended',
          notes: 'No class due to official national / religious holiday or school break.'
        });
        // Suspended session does NOT advance currentPointer
        continue;
      }

      // Check if an introductory encounter session is pending before Session 1 (I Sing and Have Fun)
      if (pendingIntroductorySession) {
        const introPreset = presets.find(p => p.sequenceNumber === 1 && p.sectionNumber === 1) || presets[0];
        const introPlan: MonthlySessionPlan = {
          id: `dist-${gradeYear}-${year}-${month}-w${week}-s${sessNum}`,
          weekNumber: week,
          sessionNumber: sessNum as 1 | 2,
          date: `Week ${week}, Session ${sessNum}`,
          dayName: `Session ${sessNum}`,
          year: gradeYear,
          sequenceNumber: 1,
          sequenceTitle: introPreset?.sequenceTitle ? `Sequence 1: ${introPreset.sequenceTitle}` : `Sequence 1`,
          sectionNumber: 1,
          sectionTitle: `Introductory Contact & Highlight Classroom Rules`,
          sessionName: 'Introductory Session: Initial Meeting, Introductions & highlight Classroom Rules',
          sessionType: 'First Encounter: Teacher-Pupil Contact, Classroom Rules & School Supplies',
          communicativeObjectives: [
            'Initial meeting & greetings: Establish warm contact between teacher and pupils, reciprocal self-introductions ("Hello! / My name is...").',
            'Classroom rules & conduct: Establish essential classroom routines, polite interaction norms (Raise hand, listen attentively, quiet please).',
            'English school supplies: Inform pupils about required English materials (Coursebook, 64p copybook, slate, felt pen/chalk, colored pencils).'
          ],
          vocabulary: ['hello', 'good morning', 'teacher', 'pupil', 'name', 'copybook', 'slate', 'pencil', 'book', 'please', 'thank you'],
          grammar: ['Greetings: Hello / Good morning', 'Formulaic intro: My name is...', 'Classroom commands: Stand up / Sit down / Raise your hand / Listen'],
          phonics: 'Auditory recognition of greeting formulas and initial consonant sounds',
          handwritingFamily: 'Pencil grip, paper posture & slate handling orientation',
          didacticAids: [
            'Classroom Rules Chart / Poster',
            'English School Supplies Realia (Coursebook, copybook, slate, pencil case)',
            'Teacher Name Tag / Badge',
            'Individual Slates'
          ],
          values: ['Mutual respect, active listening, classroom order, and enthusiasm for learning English'],
          isSuspended: false,
          status: 'scheduled',
          presetId: introPreset?.id,
          notes: 'Initial introductory session: teacher-student introductions, establishing classroom rules, and informing students about required school supplies.'
        };

        sessionPlans.push(introPlan);
        pendingIntroductorySession = false;
        // Keep currentPointer at Sequence 1, Section 1, Session 1 ("I sing and have fun...") for the very next active session!
        currentPointer = { sequenceNumber: 1, sectionNumber: 1, sessionNumber: 1 };
        continue;
      }

      // Active didactic session: Find matching preset
      const currentPreset = presets.find(
        p => p.sequenceNumber === currentPointer.sequenceNumber && p.sectionNumber === currentPointer.sectionNumber
      ) || presets.find(p => p.sequenceNumber === currentPointer.sequenceNumber) || presets[0];

      const rubric = sessionTypesList.find(r => r.sessionNumber === currentPointer.sessionNumber) || sessionTypesList[0];

      // Objective copied directly from didactic guide presets
      const guidePresetObj = currentPreset?.communicativeObjectives?.[(currentPointer.sessionNumber - 1) % (currentPreset.communicativeObjectives?.length || 1)];
      const officialObjective = guidePresetObj 
        ? `${guidePresetObj} (Official Algerian Primary English Didactic Guide).`
        : rubric.rubricObjective;

      const communicativeObjectives: string[] = [
        officialObjective,
        `Consolidate active lexis through TPR, individual slates, flashcards, and peer dialogues.`
      ];

      const plan: MonthlySessionPlan = {
        id: `dist-${gradeYear}-${year}-${month}-w${week}-s${sessNum}`,
        weekNumber: week,
        sessionNumber: sessNum as 1 | 2,
        date: `Week ${week}, Session ${sessNum}`,
        dayName: `Session ${sessNum}`,
        year: gradeYear,
        sequenceNumber: currentPointer.sequenceNumber,
        sequenceTitle: currentPreset?.sequenceTitle ? `Sequence ${currentPointer.sequenceNumber}: ${currentPreset.sequenceTitle}` : `Sequence ${currentPointer.sequenceNumber}`,
        sectionNumber: currentPointer.sectionNumber,
        sectionTitle: currentPreset?.sectionTitle ? `Section ${currentPointer.sectionNumber}: ${currentPreset.sectionTitle}` : `Section ${currentPointer.sectionNumber}`,
        sessionName: rubric.title,
        sessionType: rubric.type,
        communicativeObjectives,
        vocabulary: currentPreset?.vocabulary?.slice(0, 5) || ['family', 'friend', 'school', 'numbers', 'greetings'],
        grammar: currentPreset?.grammar?.slice(0, 2) || ['Demonstratives (This is my...)', 'Wh-questions'],
        phonics: currentPreset?.phonics || 'Auditory isolation & phonic contrast',
        handwritingFamily: currentPreset?.handwritingFamily || 'Print lowercase baseline strokes',
        didacticAids: ['Coursebook', 'Flashcards', 'Individual Slates', 'Audio Chant Track', 'Real Classroom Objects'],
        values: currentPreset?.values || ['Civic politeness, sharing, attentive listening'],
        isSuspended: false,
        status: 'scheduled',
        presetId: currentPreset?.id,
        notes: `Official ${gradeYear === '5PS' ? '45' : '60'}-minute Algerian Primary syllabus session.`
      };

      sessionPlans.push(plan);

      // Advance to next session for the next slot
      currentPointer = calculateNextSession(
        gradeYear,
        currentPointer.sequenceNumber,
        currentPointer.sectionNumber,
        currentPointer.sessionNumber
      );
    }
  }

  const monthObj = MONTH_OPTIONS.find(m => m.value === month) || {
    value: month,
    name: `Month ${month}`,
    academicTerm: 'Trimester'
  };

  // Academic year automatically derived from teacher registration profile or default
  const academicYear = teacherProfile?.academicYear?.trim() || '2026/2027';

  return {
    id: `monthly-dist-${gradeYear}-${year}-${month}`,
    month,
    year,
    monthName: monthObj.name,
    academicYear,
    gradeYear,
    timetableDays: [0, 2], // 2 sessions per week standard
    sessions: sessionPlans,
    customEvents,
    teacherProfile,
    pedagogicalRemarks: `Monthly lesson distribution prepared according to the official Algerian Primary English Curriculum. Exactly 2 sessions of ${gradeYear === '5PS' ? '45' : '60'} minutes per week across 4 weeks (8 sessions total).`,
    lastUpdated: new Date().toISOString()
  };
}
