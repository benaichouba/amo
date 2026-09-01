import { DidacticYear, TeacherProfile, MonthlyCalendarEvent } from '../types';
import { getMinistryCalendarForYear, SeptemberConfig } from './ministryCalendarHelper';
import { getAlgerianHolidaysForYear } from './monthlyDistributionHelper';
import { DIDACTIC_GUIDE_3PS_PRESETS, DIDACTIC_GUIDE_4PS_PRESETS, DIDACTIC_GUIDE_5PS_PRESETS } from '../data/didacticCurriculum';

export interface YearlySequenceSectionEntry {
  sectionNumber: number;
  sectionTitle: string;
  targetSessionsCount: number; // typically 4 sessions for 3PS, 5 for 4PS/5PS
  communicativeObjectives: string[];
  vocabulary: string[];
  grammar: string[];
  phonics: string;
  handwriting: string;
  allocatedMonthName: string; // e.g. "October", "November"
  allocatedTerm: 'Trimester 1' | 'Trimester 2' | 'Trimester 3';
  allocatedWeeks: string; // e.g. "Weeks 1 & 2"
}

export interface YearlySequenceEntry {
  sequenceNumber: number;
  sequenceTitle: string;
  term: 'Trimester 1' | 'Trimester 2' | 'Trimester 3';
  monthRange: string; // e.g. "September - October"
  totalSessions: number;
  sections: YearlySequenceSectionEntry[];
  projectIntegrationTitle: string;
  projectObjectives: string;
  targetValues: string[];
}

export interface YearlyDistributionTermPlan {
  termName: 'Trimester 1' | 'Trimester 2' | 'Trimester 3';
  months: {
    monthNumber: number;
    monthName: string;
    weeksCount: number;
    activeInstructionWeeks: number;
    sessionsCount: number;
    sequencesCovered: string;
    majorBreakOrHoliday?: string;
  }[];
  sequences: YearlySequenceEntry[];
  termEvaluationAndRemediation: string;
}

export interface YearlyDistributionPlan {
  id: string;
  gradeYear: DidacticYear;
  academicYear: string;
  teacherProfile: TeacherProfile;
  schoolYear: number; // e.g. 2026
  weeklyHours: string; // "1h30 (2 sessions of 45m)" for 5PS or "2h00 (2 sessions of 60m)" for 3PS/4PS
  totalAcademicWeeks: number; // 32-34 weeks
  totalSessionsPlanned: number; // ~60-64 sessions
  introductorySessionTitle: string;
  trimesters: YearlyDistributionTermPlan[];
  pedagogicalDirectives: string[];
  createdAt: string;
}

/**
 * Builds the official Algerian Primary English Yearly Pedagogical Distribution
 * based on Ministry specifications (CNP Curriculum & Didactic Guides for 3PS, 4PS, 5PS).
 */
export function generateYearlyDistribution(
  gradeYear: DidacticYear,
  academicYear: string = '2026 / 2027',
  schoolYear: number = 2026,
  teacherProfile: TeacherProfile
): YearlyDistributionPlan {
  const is5PS = gradeYear === '5PS';
  const weeklyHours = is5PS 
    ? '1 hour 30 mins (2 sessions × 45 minutes / week)' 
    : '2 hours 00 mins (2 sessions × 60 minutes / week)';

  let presets = DIDACTIC_GUIDE_3PS_PRESETS;
  if (gradeYear === '4PS') presets = DIDACTIC_GUIDE_4PS_PRESETS;
  if (gradeYear === '5PS') presets = DIDACTIC_GUIDE_5PS_PRESETS;

  // Group presets by sequence
  const seqMap = new Map<number, typeof presets>();
  presets.forEach(p => {
    const list = seqMap.get(p.sequenceNumber) || [];
    list.push(p);
    seqMap.set(p.sequenceNumber, list);
  });

  const getSectionsForSeq = (seqNumber: number, monthName: string, term: 'Trimester 1' | 'Trimester 2' | 'Trimester 3'): YearlySequenceSectionEntry[] => {
    const seqPresets = seqMap.get(seqNumber) || [];
    return seqPresets.map((preset, idx) => ({
      sectionNumber: preset.sectionNumber,
      sectionTitle: preset.sectionTitle,
      targetSessionsCount: gradeYear === '3PS' ? 4 : 5,
      communicativeObjectives: preset.communicativeObjectives,
      vocabulary: preset.vocabulary.slice(0, 6),
      grammar: preset.grammar.slice(0, 3),
      phonics: preset.phonics,
      handwriting: preset.handwritingFamily || 'Print & Cursive letter mechanics',
      allocatedMonthName: monthName,
      allocatedTerm: term,
      allocatedWeeks: idx === 0 ? 'Weeks 1 & 2' : 'Weeks 3 & 4'
    }));
  };

  // Helper projects and situation descriptions for primary grades
  const getProjectForSeq = (seqNumber: number): { title: string; objectives: string } => {
    if (gradeYear === '3PS') {
      switch (seqNumber) {
        case 1: return { title: 'Project 1: My Family Tree & Finger Puppets', objectives: 'Craft a visual family tree and introduce members to peers using formulaic oral chunks.' };
        case 2: return { title: 'Project 2: My Dream Classroom & Weekly Timetable Poster', objectives: 'Label school items and design an illustrated weekly schedule of favorite subjects.' };
        case 3: return { title: 'Project 3: My Ideal House & Room Floorplan', objectives: 'Draw a home floorplan and describe furniture positions using prepositions.' };
        case 4: return { title: 'Project 4: My Toy Box & Counting Board Game', objectives: 'Present favorite toys, express possession, and play numerical counting games (1-20).' };
        case 5: return { title: 'Project 5: My Pet & Farm Animals Mini-Book', objectives: 'Create a mini-booklet naming domestic pets, physical traits, and animal sounds.' };
        case 6: return { title: 'Project 6: Class Birthday Card & Invitation Roleplay', objectives: 'Design personalized birthday cards and act out polite hospitality scenes.' };
        default: return { title: `Sequence ${seqNumber} Culminating Task`, objectives: 'Consolidate oral and written linguistic chunks in a collaborative project.' };
      }
    } else if (gradeYear === '4PS') {
      switch (seqNumber) {
        case 1: return { title: 'Project 1: Extended Family Album & International Keypal ID Card', objectives: 'Design extended family profiles and create international ID cards with countries/nationalities.' };
        case 2: return { title: 'Project 2: School Guide Map & Rules Poster', objectives: 'Draw a labeled school facility map with directional prepositions and write school rules.' };
        case 3: return { title: 'Project 3: Healthy Food Pyramid & Traditional Recipe Menu', objectives: 'Categorize healthy foods and write an illustrated Algerian recipe with countable/uncountable nouns.' };
        case 4: return { title: 'Project 4: Weekly Leisure & Sports Hobby Brochure', objectives: 'Interview peers about leisure activities, frequencies, and create a hobbies magazine page.' };
        case 5: return { title: 'Project 5: City Landmark Tour & Direction Guide', objectives: 'Present town landmarks, give transit directions, and design safety road signs.' };
        case 6: return { title: 'Project 6: Algerian Wildlife & Nature Conservation Booklet', objectives: 'Research endangered national wildlife, natural habitats, and formulate protection slogans.' };
        default: return { title: `Sequence ${seqNumber} Task`, objectives: 'Integrate target communicative competences through connected cursive production.' };
      }
    } else {
      // 5PS
      switch (seqNumber) {
        case 1: return { title: 'Project 1: Heritage & Historic Algerian Figures Biographies', objectives: 'Write mini-biographies of Algerian national figures and describe personality traits.' };
        case 2: return { title: 'Project 2: Eco-Citizen Waste Recycling & Green Planet Charter', objectives: 'Formulate environmental protection rules, recycling steps, and eco-citizenship posters.' };
        case 3: return { title: 'Project 3: Future Careers & Technology Exhibition Portfolio', objectives: 'Present dream occupations, technological inventions, and explain future ambitions.' };
        case 4: return { title: 'Project 4: Great World Explorations & Travel Log', objectives: 'Write a travel diary narrating historical discoveries and geographic expeditions in the past simple.' };
        case 5: return { title: 'Project 5: Health, Wellbeing & Safety First-Aid Guide', objectives: 'Provide advice on personal hygiene, nutrition, and write simple first-aid instructions.' };
        case 6: return { title: 'Project 6: Universal Friendship & Cultural Fair Album', objectives: 'Celebrate national and international solidarity with short descriptive presentations.' };
        default: return { title: `Sequence ${seqNumber} Project`, objectives: 'Produce coherent paragraphs combining past, present, and modal structures.' };
      }
    }
  };

  // Trimester 1 (Sept, Oct, Nov, Dec) -> Sequences 1 & 2
  const t1Sequences: YearlySequenceEntry[] = [
    {
      sequenceNumber: 1,
      sequenceTitle: (seqMap.get(1)?.[0]?.sequenceTitle) || 'Family & Friends',
      term: 'Trimester 1',
      monthRange: 'September - October',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(1, 'September - October', 'Trimester 1'),
      projectIntegrationTitle: getProjectForSeq(1).title,
      projectObjectives: getProjectForSeq(1).objectives,
      targetValues: ['Civic politeness, filial respect towards elders, pride in Algerian identity and family unity']
    },
    {
      sequenceNumber: 2,
      sequenceTitle: (seqMap.get(2)?.[0]?.sequenceTitle) || 'School',
      term: 'Trimester 1',
      monthRange: 'November - December',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(2, 'November - December', 'Trimester 1'),
      projectIntegrationTitle: getProjectForSeq(2).title,
      projectObjectives: getProjectForSeq(2).objectives,
      targetValues: ['Respect for school property, teamwork, appreciation for academic disciplines']
    }
  ];

  // Trimester 2 (Jan, Feb, March) -> Sequences 3 & 4
  const t2Sequences: YearlySequenceEntry[] = [
    {
      sequenceNumber: 3,
      sequenceTitle: (seqMap.get(3)?.[0]?.sequenceTitle) || (gradeYear === '3PS' ? 'Home' : 'Food & Health'),
      term: 'Trimester 2',
      monthRange: 'January - February',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(3, 'January - February', 'Trimester 2'),
      projectIntegrationTitle: getProjectForSeq(3).title,
      projectObjectives: getProjectForSeq(3).objectives,
      targetValues: ['Cleanliness in living spaces, healthy dietary habits, family cooperation']
    },
    {
      sequenceNumber: 4,
      sequenceTitle: (seqMap.get(4)?.[0]?.sequenceTitle) || (gradeYear === '3PS' ? 'Playtime' : 'Free Time & Hobbies'),
      term: 'Trimester 2',
      monthRange: 'February - March',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(4, 'February - March', 'Trimester 2'),
      projectIntegrationTitle: getProjectForSeq(4).title,
      projectObjectives: getProjectForSeq(4).objectives,
      targetValues: ['Fair play, active sportsmanship, constructive leisure habits and sharing']
    }
  ];

  // Trimester 3 (April, May, June) -> Sequences 5 & 6
  const t3Sequences: YearlySequenceEntry[] = [
    {
      sequenceNumber: 5,
      sequenceTitle: (seqMap.get(5)?.[0]?.sequenceTitle) || (gradeYear === '3PS' ? 'Pets' : 'Environment & Nature'),
      term: 'Trimester 3',
      monthRange: 'April - May',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(5, 'April - May', 'Trimester 3'),
      projectIntegrationTitle: getProjectForSeq(5).title,
      projectObjectives: getProjectForSeq(5).objectives,
      targetValues: ['Kindness to animals, environmental stewardship, ecological responsibility']
    },
    {
      sequenceNumber: 6,
      sequenceTitle: (seqMap.get(6)?.[0]?.sequenceTitle) || (gradeYear === '3PS' ? 'Fancy Birthday' : 'Celebrations & World'),
      term: 'Trimester 3',
      monthRange: 'May - June',
      totalSessions: gradeYear === '3PS' ? 8 : 10,
      sections: getSectionsForSeq(6, 'May - June', 'Trimester 3'),
      projectIntegrationTitle: getProjectForSeq(6).title,
      projectObjectives: getProjectForSeq(6).objectives,
      targetValues: ['Hospitality, sharing joy, empathy, mutual celebration of peer achievements']
    }
  ];

  const trimesters: YearlyDistributionTermPlan[] = [
    {
      termName: 'Trimester 1',
      months: [
        {
          monthNumber: 9,
          monthName: 'September',
          weeksCount: 4,
          activeInstructionWeeks: 2,
          sessionsCount: 4,
          sequencesCovered: 'Introductory Contact Session + Sequence 1 (Section 1)',
          majorBreakOrHoliday: 'School Year Opening / Official Re-entry'
        },
        {
          monthNumber: 10,
          monthName: 'October',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 1 (Section 1 & Section 2) + Project 1',
          majorBreakOrHoliday: 'Autumn School Break (Late Oct)'
        },
        {
          monthNumber: 11,
          monthName: 'November',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 2 (Section 1: School Facilities / Timetable)',
          majorBreakOrHoliday: 'Revolution Day (Nov 1st)'
        },
        {
          monthNumber: 12,
          monthName: 'December',
          weeksCount: 4,
          activeInstructionWeeks: 3,
          sessionsCount: 6,
          sequencesCovered: 'Sequence 2 (Section 2) + T1 Formative Evaluation & Remediation',
          majorBreakOrHoliday: 'Winter Break (Dec 18 - Jan 4)'
        }
      ],
      sequences: t1Sequences,
      termEvaluationAndRemediation: 'Trimester 1 Diagnostic & Continuous Assessment, Oral/Written Remediation Week, and Integration Project Submission.'
    },
    {
      termName: 'Trimester 2',
      months: [
        {
          monthNumber: 1,
          monthName: 'January',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 3 (Section 1)',
          majorBreakOrHoliday: 'Yennayer Amazigh New Year (Jan 12)'
        },
        {
          monthNumber: 2,
          monthName: 'February',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 3 (Section 2) + Sequence 4 (Section 1)',
          majorBreakOrHoliday: 'National Martyr Day (Feb 18)'
        },
        {
          monthNumber: 3,
          monthName: 'March',
          weeksCount: 4,
          activeInstructionWeeks: 3,
          sessionsCount: 6,
          sequencesCovered: 'Sequence 4 (Section 2) + T2 Formative Evaluation & Remediation',
          majorBreakOrHoliday: 'Spring Break & Eid al-Fitr (Mid-Late March)'
        }
      ],
      sequences: t2Sequences,
      termEvaluationAndRemediation: 'Trimester 2 Achievement Check, Slate Orthography Verification, Differentiated Remediation Workshops.'
    },
    {
      termName: 'Trimester 3',
      months: [
        {
          monthNumber: 4,
          monthName: 'April',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 5 (Section 1 & Section 2)',
          majorBreakOrHoliday: 'Knowledge Day / Youm El-Ilm (Apr 16)'
        },
        {
          monthNumber: 5,
          monthName: 'May',
          weeksCount: 4,
          activeInstructionWeeks: 4,
          sessionsCount: 8,
          sequencesCovered: 'Sequence 6 (Section 1 & Section 2) + Project 6',
          majorBreakOrHoliday: 'Labour Day (May 1) & Eid al-Adha'
        },
        {
          monthNumber: 6,
          monthName: 'June',
          weeksCount: 3,
          activeInstructionWeeks: 2,
          sessionsCount: 4,
          sequencesCovered: 'Final Annual Assessment, Remediation, Pedagogical Portfolios & Class Exhibition',
          majorBreakOrHoliday: 'Official End-of-Year Pedagogical Councils'
        }
      ],
      sequences: t3Sequences,
      termEvaluationAndRemediation: 'Annual Summative Evaluation, Terminal Competency Portfolio Validation, and Certificate Celebration.'
    }
  ];

  return {
    id: `yearly-dist-${gradeYear}-${schoolYear}`,
    gradeYear,
    academicYear,
    teacherProfile,
    schoolYear,
    weeklyHours,
    totalAcademicWeeks: 34,
    totalSessionsPlanned: 64,
    introductorySessionTitle: 'Introductory Session: Initial Meeting, Introductions & highlight Classroom Rules',
    trimesters,
    pedagogicalDirectives: [
      `Official Algerian Primary English curriculum: exactly 2 sessions per week (${gradeYear === '5PS' ? '45' : '60'} mins each).`,
      'Session 1 of Sequence 1 Section 1 follows the Introductory Encounter and begins systematically with oral discovery ("I Sing & Have Fun").',
      'Continuous formative evaluation via slates, TPR, and interactive peer roleplays throughout all 6 sequences.',
      'Integration projects conclude each sequence to foster communicative autonomy, values of Algerian citizenship, and collaborative learning.'
    ],
    createdAt: new Date().toISOString()
  };
}
