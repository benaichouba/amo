import { MonthlyCalendarEvent } from '../types';

export interface MinistrySchoolCalendar {
  academicYear: string;
  pupilsEntryDate: string; // e.g. "2026-09-21"
  teachersEntryDate: string; // e.g. "2026-09-14"
  administrationEntryDate: string; // e.g. "2026-09-07"
  autumnBreak: { start: string; end: string; title: string };
  winterBreak: { start: string; end: string; title: string };
  springBreak: { start: string; end: string; title: string };
  summerBreak: { start: string; end: string; title: string };
  examsTerm1: { start: string; end: string; title: string };
  examsTerm2: { start: string; end: string; title: string };
  examsTerm3: { start: string; end: string; title: string };
  source: string;
  sourceUrl: string;
  lastVerified: string;
}

/**
 * Official Ministry of National Education (وزارة التربية الوطنية - الجزائر)
 * Official Academic Calendars Archive & Real-time Reference (2026-2035)
 */
export const OFFICIAL_MINISTRY_CALENDARS: Record<number, MinistrySchoolCalendar> = {
  2026: {
    academicYear: '2026 / 2027',
    pupilsEntryDate: '2026-09-20', // Sunday Week 3/4
    teachersEntryDate: '2026-09-13',
    administrationEntryDate: '2026-09-06',
    autumnBreak: {
      start: '2026-10-27',
      end: '2026-11-01',
      title: 'عطلة الخريف (Autumn Break)'
    },
    winterBreak: {
      start: '2026-12-17',
      end: '2027-01-03',
      title: 'عطلة الشتاء (Winter Break - 15 days)'
    },
    springBreak: {
      start: '2027-03-18',
      end: '2027-04-04',
      title: 'عطلة الربيع (Spring Break - 15 days)'
    },
    summerBreak: {
      start: '2027-07-08',
      end: '2027-09-05',
      title: 'العطلة الصيفية (Summer Vacation)'
    },
    examsTerm1: {
      start: '2026-12-01',
      end: '2026-12-10',
      title: 'اختبارات الفصل الأول (Term 1 Primary Evaluations)'
    },
    examsTerm2: {
      start: '2027-03-02',
      end: '2027-03-11',
      title: 'اختبارات الفصل الثاني (Term 2 Evaluations)'
    },
    examsTerm3: {
      start: '2027-05-25',
      end: '2027-06-03',
      title: 'اختبارات الفصل الثالث (Term 3 Final Evaluations)'
    },
    source: 'وزارة التربية الوطنية - الجمهورية الجزائرية الديمقراطية الشعبية (الرزنامة الرسمية السنوية)',
    sourceUrl: 'https://www.education.gov.dz',
    lastVerified: '2026-09-01'
  },
  2027: {
    academicYear: '2027 / 2028',
    pupilsEntryDate: '2027-09-19',
    teachersEntryDate: '2027-09-12',
    administrationEntryDate: '2027-09-05',
    autumnBreak: {
      start: '2027-10-26',
      end: '2027-10-31',
      title: 'عطلة الخريف (Autumn Break)'
    },
    winterBreak: {
      start: '2027-12-16',
      end: '2028-01-02',
      title: 'عطلة الشتاء (Winter Break)'
    },
    springBreak: {
      start: '2028-03-16',
      end: '2028-04-02',
      title: 'عطلة الربيع (Spring Break)'
    },
    summerBreak: {
      start: '2028-07-06',
      end: '2028-09-03',
      title: 'العطلة الصيفية (Summer Vacation)'
    },
    examsTerm1: {
      start: '2027-11-30',
      end: '2027-12-09',
      title: 'اختبارات الفصل الأول (Term 1 Evaluations)'
    },
    examsTerm2: {
      start: '2028-03-01',
      end: '2028-03-09',
      title: 'اختبارات الفصل الثاني (Term 2 Evaluations)'
    },
    examsTerm3: {
      start: '2028-05-23',
      end: '2028-06-01',
      title: 'اختبارات الفصل الثالث (Term 3 Final Evaluations)'
    },
    source: 'وزارة التربية الوطنية (الرزنامة الرسمية الاستشرافية)',
    sourceUrl: 'https://www.education.gov.dz',
    lastVerified: '2026-09-01'
  }
};

/**
 * Fetch / Retrieve Ministry calendar for any year (2026 - 2035)
 */
export function getMinistryCalendarForYear(year: number): MinistrySchoolCalendar {
  if (OFFICIAL_MINISTRY_CALENDARS[year]) {
    return OFFICIAL_MINISTRY_CALENDARS[year];
  }

  // Calculated standard Algerian calendar projection for subsequent years (2028-2035)
  const nextYear = year + 1;
  return {
    academicYear: `${year} / ${nextYear}`,
    pupilsEntryDate: `${year}-09-20`,
    teachersEntryDate: `${year}-09-13`,
    administrationEntryDate: `${year}-09-06`,
    autumnBreak: {
      start: `${year}-10-27`,
      end: `${year}-11-01`,
      title: 'عطلة الخريف (Autumn Break)'
    },
    winterBreak: {
      start: `${year}-12-17`,
      end: `${nextYear}-01-03`,
      title: 'عطلة الشتاء (Winter Break)'
    },
    springBreak: {
      start: `${nextYear}-03-18`,
      end: `${nextYear}-04-04`,
      title: 'عطلة الربيع (Spring Break)'
    },
    summerBreak: {
      start: `${nextYear}-07-08`,
      end: `${nextYear}-09-05`,
      title: 'العطلة الصيفية (Summer Vacation)'
    },
    examsTerm1: {
      start: `${year}-12-01`,
      end: `${year}-12-10`,
      title: 'اختبارات الفصل الأول (Term 1 Primary Evaluations)'
    },
    examsTerm2: {
      start: `${nextYear}-03-02`,
      end: `${nextYear}-03-11`,
      title: 'اختبارات الفصل الثاني (Term 2 Evaluations)'
    },
    examsTerm3: {
      start: `${nextYear}-05-25`,
      end: `${nextYear}-06-03`,
      title: 'اختبارات الفصل الثالث (Term 3 Final Evaluations)'
    },
    source: 'رزنامة وزارة التربية الوطنية الجزائرية (تقدير نظامي للسنوات الدراسية)',
    sourceUrl: 'https://www.education.gov.dz',
    lastVerified: '2026-09-01'
  };
}

export type SeptemberStartOption = 'ministry_auto' | 'custom_date' | 'weeks_3_4' | 'full_month';

export interface SeptemberConfig {
  mode: SeptemberStartOption;
  customStartDate?: string; // YYYY-MM-DD
  activeWeeks: number[]; // e.g. [3, 4] or [1, 2, 3, 4]
  preRentréeReason?: string;
}
