export type SubjectType = 'english_primary' | 'english';

export type DidacticYear = '3PS' | '4PS' | '5PS' | 'Year 3 (Primary)' | 'Year 4 (Primary)' | 'Year 5 (Primary)';

export interface TeacherProfile {
  fullName: string;
  schoolName: string;
  district?: string;
  academicYear?: string;
  learners3PS: number;
  learners4PS: number;
  learners5PS: number;
  classesCount3PS?: number;
  classesCount4PS?: number;
  classesCount5PS?: number;
}

export type PedagogicalFramework = 
  | 'didactic_guide_algeria' // 4/5 session sequence (Sing/Listen/Discover/Enjoy/Write/Roleplay)
  | 'action_oriented_clil'   // Kersten & Rohde (Head, Heart, Hand, Task-Based)
  | '5e_inquiry_cycle'       // Engage, Explore, Explain, Elaborate, Evaluate (Science)
  | 'cpa_math_model'         // Concrete, Pictorial, Abstract (Bruner)
  | 'blooms_differentiated'  // Remember, Understand, Apply, Analyze, Evaluate, Create
  | 'universal_design_udl';  // Representation, Engagement, Expression

export type VAKTEmphasis = 'Visual' | 'Auditory' | 'Kinesthetic' | 'Tactile' | 'Multisensory (All 4)';

export interface DidacticPreset {
  id: string;
  year: DidacticYear;
  sequenceNumber: number;
  sequenceNumberInternal?: number | string;
  sequenceTitle: string;
  sectionNumber: number;
  sectionTitle: string;
  sessionType: 'Session 1' | 'Session 2' | 'Session 3' | 'Session 4' | 'Session 5' | 'Full Sequence';
  sessionName: string;
  communicativeObjectives: string[];
  vocabulary: string[];
  grammar: string[];
  phonics: string;
  handwritingFamily?: string;
  suggestedSituation: string;
  values: string[];
  crossCurricular: {
    intellectual: string;
    methodological: string;
    communicative: string;
    personalSocial: string;
  };
}

export interface LessonPlanStage {
  stageName: string; // e.g., "Warmer: I Sing and Have Fun", "Install Resources: I Listen & Repeat", "Assessment / Production"
  timeMinutes: number;
  teacherRole: string;
  learnerActivity: string;
  interactionPattern: string;
  teachingMaterials: string[];
  phonemicPhonicsFocus?: string;
  differentiationTip?: string;
  handwritingFamily?: string;
}

export interface DifferentiatedInstruction {
  tier1Universal: string[];
  tier2Targeted: string[];
  tier3Intensive: string[];
  vaktStrategies: {
    visual: string;
    auditory: string;
    kinesthetic: string;
    tactile: string;
  };
  specialNeedsAccommodations: {
    dysgraphia: string;
    dyslexia: string;
    adhdOrFocus: string;
    multilingualEAL: string;
  };
  fastFinishersAndGifted: string[];
}

export interface EvaluationCriterion {
  id?: string;
  domain: 'Oral Interaction' | 'Oral Comprehension' | 'Written Comprehension' | 'Written Production' | 'Communicative Production' | 'Problem Solving' | string;
  criterion: string;
  fullMastery: string;
  acceptableMastery: string;
  partialMastery: string;
  minimumMastery: string;
}

export interface StudentHandoutItem {
  id: string;
  type: 'worksheet' | 'phonics_card' | 'reading_game' | 'writing_worksheet' | 'roleplay_dialogue' | 'exit_ticket' | string;
  title: string;
  instructions: string;
  content: string;
  solutions?: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  targetLevel: string;
  gradeYear: string;
  sequenceTitle: string;
  sectionTitle: string;
  sessionNumber: string;
  totalDurationMinutes: number;
  framework?: PedagogicalFramework;
  pedagogicalFramework?: string;
  classProfile: {
    level: string;
    estimatedLearners: number;
    ageRange: string;
    homeLanguages?: string[];
    l1LiteracyNotes?: string;
  };
  sessionObjectives: string[];
  subsidiaryObjectives?: string[];
  targetCompetences: string[];
  valuesAndCitizenship: string[];
  crossCurricularCompetences: {
    intellectual: string;
    methodological: string;
    communicative: string;
    personalSocial: string;
  };
  linguisticResources: {
    vocabulary: string[];
    grammar: string[];
    phonicsSounds: string[];
    handwritingLetterFamilies?: string;
  };
  teachingMaterials?: string[];
  anticipatedProblems: string[];
  solutionsPlanB: string[];
  stages: LessonPlanStage[];
  differentiatedInstruction: DifferentiatedInstruction;
  evaluationGrid: EvaluationCriterion[];
  studentHandouts: StudentHandoutItem[];
  selfReflectionTemplate: {
    whatWorked: string;
    whatHindered: string;
    actionPlan: string;
  };
  googleClassroomExportStatus?: {
    courseId?: string;
    courseName?: string;
    exportedAt?: string;
    postType?: 'coursework' | 'material' | 'announcement';
    alternateLink?: string;
  };
  teacherProfile?: TeacherProfile;
  createdAt: string;
  updatedAt: string;
}

export interface GoogleClassroomCourse {
  id: string;
  name: string;
  section?: string;
  room?: string;
  descriptionHeading?: string;
  courseState: string;
  alternateLink?: string;
}

export type LicenseTier = 'free' | 'free_trial' | 'pro';

export type PurchasePlanId = 
  | 'trimester_single'  // 750 DA (Single level: 3PS, 4PS, or 5PS)
  | 'trimester_all'     // 2,000 DA (All levels)
  | 'academic_year_single' // 1,500 DA (Single level)
  | 'academic_year_all'    // 4,250 DA (All levels)
  | 'lifetime_single'   // 2,000 DA (Single level lifetime)
  | 'lifetime_all';     // 5,000 DA (All levels lifetime - Save 1,000 DA)

export interface PricingOption {
  id: PurchasePlanId;
  category: 'trimester' | 'academic_year' | 'lifetime_single' | 'lifetime_all';
  title: string;
  badge?: string;
  priceDZD: number;
  durationLabel: string;
  savingsNote?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
  defaultLevel?: DidacticYear;
  supportsLevelChoice?: boolean;
}

export interface LicenseInfo {
  tier: LicenseTier;
  generationsUsed: number;
  maxFreeGenerations: number;
  isPro: boolean;
  unlockedLevels?: DidacticYear[]; // ['3PS', '4PS', '5PS'] or subset if single-level purchased
  activationKey?: string;
  activatedAt?: string;
  planId?: PurchasePlanId;
  planName?: string;
  referenceNumber?: string;
  customerName?: string;
  priceDZD?: number;
  expiresAt?: string;
}

export interface DidacticAuditIssue {
  id: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  category: 'timing' | 'bloom_verbs' | 'oral_written' | 'phonics_handwriting' | 'rubric' | 'differentiation' | 'values';
  title: string;
  message: string;
  recommendation: string;
  canAutoFix?: boolean;
  autoFixLabel?: string;
  autoFixAction?: string;
}

export interface DidacticAuditReport {
  overallScore: number; // 0 - 100
  complianceGrade: 'A+' | 'A' | 'B+' | 'B' | 'Needs Review';
  totalDurationMinutes: number;
  calculatedStagesSum: number;
  timingMatches: boolean;
  issues: DidacticAuditIssue[];
  suggestions: string[];
  strengths: string[];
  inspectedAt: string;
}

export interface LessonGenerationParams {
  subject: SubjectType;
  gradeYear: DidacticYear;
  topic: string;
  sequenceTitle?: string;
  sectionTitle?: string;
  sessionType?: string;
  durationMinutes?: number;
  framework?: PedagogicalFramework;
  vaktEmphasis?: VAKTEmphasis;
  targetLanguageLevel?: string;
  includeSpecialNeeds?: boolean;
  includeClassroomFormat?: boolean;
  customObjectives?: string;
  additionalContext?: string;
  presetId?: string;
  teacherProfile?: TeacherProfile;
}

// ==========================================
// Monthly Distribution & Calendar Types (Pro)
// ==========================================

export type EventCategoryType = 
  | 'national_holiday'
  | 'religious_holiday'
  | 'school_break'
  | 'pedagogical_seminar'
  | 'teacher_training'
  | 'school_event'
  | 'remediation_day'
  | 'weather_closure'
  | 'custom';

export interface MonthlyCalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // For multi-day breaks
  isSuspended: boolean; // Whether regular classes are suspended
  category: EventCategoryType;
  description?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export type SessionStatus = 'scheduled' | 'taught' | 'suspended' | 'rescheduled';

export interface MonthlySessionPlan {
  id: string;
  weekNumber: number; // 1, 2, 3, 4, 5
  sessionNumber: 1 | 2; // Each level has 2 sessions per week in Algerian Primary
  date: string; // YYYY-MM-DD
  dayName: string; // Sunday, Monday, Tuesday, Wednesday, Thursday
  year: DidacticYear;
  sequenceNumber: number;
  sequenceTitle: string;
  sectionNumber: number;
  sectionTitle: string;
  sessionName: string;
  sessionType: string;
  communicativeObjectives: string[];
  vocabulary: string[];
  grammar: string[];
  phonics: string;
  handwritingFamily?: string;
  didacticAids: string[];
  values?: string[];
  isSuspended: boolean;
  suspensionReason?: string;
  status: SessionStatus;
  notes?: string;
  presetId?: string;
}

export interface MonthlyDistributionConfig {
  id: string;
  month: number; // 1 - 12 (e.g. 10 for October)
  year: number; // e.g. 2025 or 2026
  monthName: string; // e.g. "October"
  academicYear: string; // e.g. "2025/2026"
  gradeYear: DidacticYear;
  timetableDays: number[]; // Day numbers: 0 (Sun), 1 (Mon), 2 (Tue), 3 (Wed), 4 (Thu)
  sessions: MonthlySessionPlan[];
  customEvents: MonthlyCalendarEvent[];
  teacherProfile?: TeacherProfile;
  pedagogicalRemarks?: string;
  lastUpdated?: string;
}

