import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonGeneratorForm } from './components/LessonGeneratorForm';
import { LessonPlanViewer } from './components/LessonPlanViewer';
import { MonthlyDistributionView } from './components/MonthlyDistributionView';
import { DidacticGuideReferenceModal } from './components/DidacticGuideReferenceModal';
import { SavedPlansDrawer } from './components/SavedPlansDrawer';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { PurchaseModal } from './components/PurchaseModal';
import { PrintableView } from './components/PrintableView';
import { LessonPlan, LessonGenerationParams, TeacherProfile, LicenseInfo } from './types';
import { Sparkles, AlertCircle, BookOpen, GraduationCap, CheckCircle2, UserCheck, Crown, Zap, CalendarCheck } from 'lucide-react';

const DEFAULT_LICENSE_INFO: LicenseInfo = {
  tier: 'free_trial',
  isPro: false,
  generationsUsed: 0,
  maxFreeGenerations: 3,
  unlockedLevels: ['3PS', '4PS', '5PS']
};

const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  fullName: 'Teacher Benaichouba Mohamed A.',
  schoolName: 'Ziani Mohamed Primary School',
  district: 'District 02 - Directorate of Education',
  academicYear: '2025 / 2026',
  learners3PS: 32,
  learners4PS: 34,
  learners5PS: 30,
  classesCount3PS: 1,
  classesCount4PS: 1,
  classesCount5PS: 1
};

const INITIAL_DEFAULT_PLAN: LessonPlan = {
  id: 'plan-default-3ps-family',
  title: '3PS • Sequence 1: Family & Friends (Section 1: Family)',
  subject: 'english_primary',
  gradeYear: '3PS',
  sequenceTitle: 'Sequence 1: Family & Friends',
  sectionTitle: 'Section 1: Family',
  sessionNumber: 'Session 1: I Sing & Have Fun (10m) + I Listen & Repeat (50m)',
  totalDurationMinutes: 60,
  targetLevel: 'Beginner / Key Stage 1 Primary (A1.1)',
  pedagogicalFramework: 'didactic_guide_algeria',
  teacherProfile: DEFAULT_TEACHER_PROFILE,
  
  classProfile: {
    level: '3PS Primary (A1.1 Beginner Literacy)',
    ageRange: '8 - 9 years old',
    estimatedLearners: 32,
    homeLanguages: ['Algerian Arabic', 'Tamazight'],
    l1LiteracyNotes: 'Learners write Right-to-Left in Arabic. Requires orientation support for English Left-to-Right layout and anticlockwise/downward letter families.'
  },

  sessionObjectives: [
    'Recognize and pronounce family vocabulary orally: father, mother, brother, sister, grandfather, grandmother',
    'Discriminate the short vowel /i/ (sister) vs long vowel /i:/ (teacher) in spoken chants',
    'Execute TPR hand gestures in response to family oral cues without written text',
    'Greet peers and introduce family members using formulaic chunks: "This is my brother."'
  ],

  targetCompetences: [
    'Interact orally in simple, predictable everyday classroom situations',
    'Interpret non-verbal paralinguistic cues and facial gestures to deduce word meaning',
    'Demonstrate active listening and phonemic segmentation through rhythmic chants'
  ],

  valuesAndCitizenship: [
    'Family bonding & respect: Showing affection and filial respect towards parents and grandparents',
    'National Identity: Proud of Algerian family traditions and social solidarity',
    'Citizenship & Politeness: Using courtesy formulas (Please, Thank you, Nice to meet you)'
  ],

  crossCurricularCompetences: {
    intellectual: 'Associates auditory sound cues with visual family characters; deduces relationships from family trees.',
    methodological: 'Works collaboratively in pairs; uses visual flashcards to memorize oral language chunks.',
    communicative: 'Uses spoken formulaic expressions to introduce peers and family members with appropriate prosody.',
    personalSocial: 'Demonstrates polite turn-taking during roleplay; respects diverse family backgrounds.'
  },

  linguisticResources: {
    vocabulary: ['father', 'mother', 'brother', 'sister', 'grandfather', 'grandmother', 'family', 'baby'],
    grammar: ['This is my [father/mother].', 'Who is this?', 'He is / She is...'],
    phonicsSounds: ['/i/ as in sister', '/i:/ as in see/meet', '/f/ as in father', '/m/ as in mother'],
    handwritingLetterFamilies: 'Family 1 (l-family: i, l, t) & Family 3 (c-family: c, a, d, o) for subsequent writing session'
  },

  anticipatedProblems: [
    'Learners may confuse /b/ in "brother" and /v/ in "father/family"',
    'Overlapping talk during whole-class finger song',
    'Some pupils may feel shy introducing family in English'
  ],

  solutionsPlanB: [
    'Use tactile mouth-mirror articulation and exaggerated lip placement',
    'Divide into row-by-row call and response to manage noise level',
    'Allow pair puppets to speak rather than direct learner speech'
  ],

  stages: [
    {
      stageName: '1. Warmer • I Sing & Have Fun',
      timeMinutes: 10,
      teacherRole: 'Plays the rhythmic "Finger Family" nursery chant with realia finger puppets. Teacher models hand gestures and prosodic pitch.',
      learnerActivity: 'Learners stand up, watch teacher gestures, sing chorus, and wiggle corresponding fingers (Daddy finger, Mommy finger).',
      interactionPattern: 'T-C (Whole Class)',
      teachingMaterials: ['Audio track / Chant', 'Felt finger puppets', 'Flashcards'],
      phonemicPhonicsFocus: 'Auditory discrimination of /f/ in father and /m/ in mother',
      differentiationTip: 'Visual cues & physical finger puppets allow low-confidence learners to participate instantly without speech anxiety.'
    },
    {
      stageName: '2. Install Resources • I Listen & Repeat (Choral Drill)',
      timeMinutes: 15,
      teacherRole: 'Presents oversized character flashcards (Father, Mother, Brother, Sister). Pronounces words with exaggerated lip-rounding and clear articulation (Motherese).',
      learnerActivity: 'Choral repetition: Whole class → Group rows → Individual echo. Learners isolate the initial phonemes /f/, /m/, /b/, /s/.',
      interactionPattern: 'T-C → T-L',
      teachingMaterials: ['Large pictorial flashcards', 'Character masks'],
      phonemicPhonicsFocus: 'Isolating initial consonants /b/ (brother) vs /s/ (sister)',
      differentiationTip: 'Provide immediate positive reinforcement and recasts for phonetic approximations without penalization.'
    },
    {
      stageName: '3. Physical Response & Game • Point & Say (TPR)',
      timeMinutes: 20,
      teacherRole: 'Places flashcards around the classroom walls. Calls out: "Point to the sister!" or "Run to grandfather!" in quick rounds.',
      learnerActivity: 'Learners point or raise color-coded picture tokens matching the spoken word. Pairs test each other: "Show me mother!"',
      interactionPattern: 'L-L (Pair Work)',
      teachingMaterials: ['Wall posters', 'Mini-picture cards'],
      differentiationTip: 'Kinesthetic movement channels ADHD energy into structured listening drills.'
    },
    {
      stageName: '4. Wrap-up & Communicative Exit Ticket',
      timeMinutes: 15,
      teacherRole: 'Invites pupil pairs to the front holding puppet cards. Prompts: "Who is this?" Models: "This is my brother."',
      learnerActivity: 'Pupils introduce their partner puppet to the class using the target formulaic chunk.',
      interactionPattern: 'L-C (Individual to Class)',
      teachingMaterials: ['Puppets', 'Quick check evaluation stamp'],
      phonemicPhonicsFocus: 'Stress on demonstrative "This is..."',
      differentiationTip: 'Tier 3 learners can hold up the puppet while teacher scaffolds the first word.'
    }
  ],

  differentiatedInstruction: {
    tier1Universal: [
      'Multi-sensory input combining audio song, visual puppet flashcards, and kinesthetic finger movements',
      'Consistent pedagogical routines (Warmer → Repeat → Play → Exit ticket) establishing emotional safety'
    ],
    tier2Targeted: [
      'Pre-teaching phonemes with mouth articulation mirrors for struggling pronunciations',
      'Peer-buddy pairing with enthusiastic models for interactive pair drills'
    ],
    tier3Intensive: [
      '1-on-1 tactile finger-puppet manipulation and reduced target chunk length (e.g. single word "father" before full sentence)',
      'Simplified picture cards with high-contrast borders'
    ],
    vaktStrategies: {
      visual: 'Oversized illustrated Algerian family cards with explicit gender and elder cues.',
      auditory: 'Rhythmic call-and-response clapping for syllable counts (fa-ther = 2 claps, sis-ter = 2 claps).',
      kinesthetic: 'Total Physical Response (TPR) jumping and pointing to designated classroom corners.',
      tactile: 'Felt finger puppets and textured tactile card tracing.'
    },
    specialNeedsAccommodations: {
      dysgraphia: 'Exempt from fine-motor handwriting during oral sessions; use sticker placement and oral matching.',
      dyslexia: 'Color-coded initial phoneme flashcards (e.g., green for /f/, blue for /m/) to assist visual discrimination.',
      adhdOrFocus: 'Movement-based TPR relay every 7-8 minutes to refresh dopamine and engagement.',
      multilingualEAL: 'Acknowledge Arabic/Berber cognates (Ab / Oum) while celebrating English acquisition as an empowering new tool.'
    },
    fastFinishersAndGifted: [
      'Challenge fast learners to introduce two family members in a single breath: "This is my father AND this is my mother."',
      'Act as mini-teachers leading their table group in the "Point & Say" challenge.'
    ]
  },

  evaluationGrid: [
    {
      id: 'crit-1',
      domain: 'Oral Interaction',
      criterion: 'Criterion 1: Correctly identifies and names family members when prompted with pictures',
      fullMastery: 'Independently names all 6 family members with clear pronunciation (6/6).',
      acceptableMastery: 'Names 4-5 family members with minor phonemic hesitation (4-5/6).',
      partialMastery: 'Names 2-3 family members with teacher prompting (2-3/6).',
      minimumMastery: 'Recognizes 1 family member or responds only through non-verbal pointing.'
    },
    {
      id: 'crit-2',
      domain: 'Phonemic Awareness',
      criterion: 'Criterion 2: Distinguishes initial phonemes /f/ (father) and /m/ (mother)',
      fullMastery: 'Accurately claps/points to /f/ vs /m/ flashcards on 100% of auditory trials.',
      acceptableMastery: 'Accurate on 80% of trials with occasional self-correction.',
      partialMastery: 'Confuses /f/ and /m/ occasionally; achieves 50-70% accuracy with prompt.',
      minimumMastery: 'Shows random guessing or unable to discriminate sounds (<50%).'
    }
  ],

  studentHandouts: [
    {
      id: 'handout-1',
      type: 'worksheet',
      title: 'Activity Sheet: My Family Finger Puppets',
      instructions: 'Color your family puppets, cut them out with scissors, and wear them on your fingers to practice introducing your family!',
      content: `
[ Visual Cutout Frames ]
- Finger 1: FATHER (Daddy)  [Draw glasses or short hair]
- Finger 2: MOTHER (Mummy)  [Draw a warm smile]
- Finger 3: BROTHER         [Draw your brother]
- Finger 4: SISTER          [Draw your sister]
- Finger 5: BABY            [Draw little baby]

Practice Dialogue with Your Friend:
A: "Who is this?"
B: "This is my father!"
      `
    },
    {
      id: 'handout-2',
      type: 'exit_ticket',
      title: 'Exit Ticket: Rate & Name',
      instructions: 'Circle your favorite family word today and color your emoji feeling!',
      content: `
1. Today's favorite word: [ FATHER | MOTHER | SISTER | BROTHER ]
2. My pronunciation today: [ ⭐⭐⭐ Super! | ⭐⭐ Good! | ⭐ Keep practicing! ]
      `
    }
  ],

  selfReflectionTemplate: {
    whatWorked: 'High student engagement during the "Finger Family" nursery chant with felt puppets.',
    whatHindered: 'Some pupils experienced hesitation distinguishing /b/ and /v/ sounds.',
    actionPlan: 'Include mirror articulation drills in session 2 to reinforce lip placement.'
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export function App() {
  // Teacher Registration Profile State
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => {
    try {
      const stored = localStorage.getItem('didactiplan_teacher_profile');
      return stored ? JSON.parse(stored) : DEFAULT_TEACHER_PROFILE;
    } catch {
      return DEFAULT_TEACHER_PROFILE;
    }
  });

  // License & Subscription State (3 free lesson plans limit)
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo>(() => {
    try {
      const stored = localStorage.getItem('didactiplan_license_info');
      return stored ? JSON.parse(stored) : DEFAULT_LICENSE_INFO;
    } catch {
      return DEFAULT_LICENSE_INFO;
    }
  });

  const [currentPlan, setCurrentPlan] = useState<LessonPlan | null>(INITIAL_DEFAULT_PLAN);
  
  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>(() => {
    try {
      const stored = localStorage.getItem('didactiplan_saved_plans');
      return stored ? JSON.parse(stored) : [INITIAL_DEFAULT_PLAN];
    } catch {
      return [INITIAL_DEFAULT_PLAN];
    }
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals & Views
  const [activeTab, setActiveTab] = useState<'lesson_planner' | 'monthly_distribution'>('lesson_planner');
  const [isTeacherProfileOpen, setIsTeacherProfileOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isPrintView, setIsPrintView] = useState<boolean>(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);

  // Save Teacher Profile to state and localStorage
  const handleSaveTeacherProfile = (profile: TeacherProfile) => {
    setTeacherProfile(profile);
    try {
      localStorage.setItem('didactiplan_teacher_profile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save teacher profile to localStorage', e);
    }
    // Update current plan's teacher profile if present
    if (currentPlan) {
      const updated = { ...currentPlan, teacherProfile: profile };
      setCurrentPlan(updated);
      handleSavePlan(updated);
    }
  };

  // Save License Info
  const handleActivateLicense = (newLicense: LicenseInfo) => {
    setLicenseInfo(newLicense);
    try {
      localStorage.setItem('didactiplan_license_info', JSON.stringify(newLicense));
    } catch (e) {
      console.error('Failed to save license info', e);
    }
  };

  // Save Lesson Plan to LocalStorage
  const handleSavePlan = (plan: LessonPlan) => {
    const exists = savedPlans.some(p => p.id === plan.id);
    let updated: LessonPlan[];
    if (exists) {
      updated = savedPlans.map(p => (p.id === plan.id ? plan : p));
    } else {
      updated = [plan, ...savedPlans];
    }
    setSavedPlans(updated);
    try {
      localStorage.setItem('didactiplan_saved_plans', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleDeleteSavedPlan = (id: string) => {
    const updated = savedPlans.filter(p => p.id !== id);
    setSavedPlans(updated);
    try {
      localStorage.setItem('didactiplan_saved_plans', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleGenerate = async (params: LessonGenerationParams) => {
    // 1. CHECK FREE TRIAL GENERATION LIMIT (3 Free Plans)
    if (!licenseInfo.isPro && licenseInfo.generationsUsed >= licenseInfo.maxFreeGenerations) {
      setIsPurchaseModalOpen(true);
      setErrorMessage(
        `You have used your ${licenseInfo.maxFreeGenerations} free lesson plan generations. Please select an affordable subscription plan to continue generating unlimited lesson plans.`
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Merge teacher profile
    const mergedParams: LessonGenerationParams = {
      ...params,
      teacherProfile
    };

    try {
      const response = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedParams),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const generatedPlan: LessonPlan = await response.json();
      generatedPlan.teacherProfile = teacherProfile;
      setCurrentPlan(generatedPlan);
      
      // Auto save plan
      handleSavePlan(generatedPlan);

      // Increment generationsUsed
      const updatedGenerations = (licenseInfo.generationsUsed || 0) + 1;
      const updatedLicense: LicenseInfo = {
        ...licenseInfo,
        generationsUsed: updatedGenerations
      };
      setLicenseInfo(updatedLicense);
      try {
        localStorage.setItem('didactiplan_license_info', JSON.stringify(updatedLicense));
      } catch (e) {
        console.error(e);
      }

      // If user just hit the 3rd generation, open purchase modal to present the 4 choices
      if (!licenseInfo.isPro && updatedGenerations >= licenseInfo.maxFreeGenerations) {
        setTimeout(() => {
          setIsPurchaseModalOpen(true);
        }, 1200);
      }

    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err?.message || 'Failed to generate lesson plan. Please check your connection or parameters.');
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentPlanSaved = savedPlans.some(p => p.id === currentPlan?.id);

  if (isPrintView && currentPlan) {
    return (
      <PrintableView 
        plan={currentPlan} 
        onBack={() => setIsPrintView(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedPlans.length}
        teacherProfile={teacherProfile}
        onOpenTeacherProfile={() => setIsTeacherProfileOpen(true)}
        onOpenPurchase={() => setIsPurchaseModalOpen(true)}
        licenseInfo={licenseInfo}
        generationsCount={licenseInfo.generationsUsed}
        maxFree={licenseInfo.maxFreeGenerations}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Error notification banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-600 hover:text-rose-900 font-bold ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View Switcher Content */}
        {activeTab === 'monthly_distribution' ? (
          <MonthlyDistributionView
            licenseInfo={licenseInfo}
            teacherProfile={teacherProfile}
            onOpenPurchase={() => setIsPurchaseModalOpen(true)}
            onOpenTeacherProfile={() => setIsTeacherProfileOpen(true)}
            onSelectSessionToGenerate={(params) => {
              setActiveTab('lesson_planner');
              handleGenerate(params);
            }}
          />
        ) : (
          /* 2-Column Responsive Layout for Lesson Plan Studio */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Form Controls (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Generator Form with Cascaded Menus & English 3PS/4PS/5PS */}
              <LessonGeneratorForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
                teacherProfile={teacherProfile}
                onOpenTeacherProfile={() => setIsTeacherProfileOpen(true)}
              />

              {/* Quick Registration & Didactic Overview Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <span className="font-bold text-slate-800 flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Primary English Didactic Syllabus
                  </span>
                  <span 
                    className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline" 
                    onClick={() => setIsGuideOpen(true)}
                  >
                    Full CNP Guide ↗
                  </span>
                </div>

                {/* Quick Teacher Registration Summary */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 flex items-center">
                      <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      Teacher & Class Profile
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTeacherProfileOpen(true)}
                      className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Edit Registration
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <div className="font-semibold text-slate-900">{teacherProfile.fullName}</div>
                    <div>{teacherProfile.schoolName} • {teacherProfile.district}</div>
                    <div className="text-emerald-800 font-bold mt-1 text-[10px] flex space-x-2">
                      <span>3PS: {teacherProfile.learners3PS} learners</span>
                      <span>•</span>
                      <span>4PS: {teacherProfile.learners4PS} learners</span>
                      <span>•</span>
                      <span>5PS: {teacherProfile.learners5PS} learners</span>
                    </div>
                  </div>
                </div>

                {/* Levels Overview */}
                <div className="space-y-2 text-slate-600 text-[11px]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>3PS:</strong> 4 Sessions / Section • Oral Installation & Print Letters.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>4PS:</strong> 5 Sessions / Section • Adds <em>I Read & Enjoy</em> & Connected Cursive.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>5PS:</strong> 8 Sessions / Section (Key Stage 3) • Paragraph Writing & Real-World Capstones.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Lesson Plan Viewer (7 cols on lg) */}
            <div className="lg:col-span-7">
              {currentPlan ? (
                <LessonPlanViewer
                  plan={currentPlan}
                  onSavePlan={handleSavePlan}
                  isSaved={isCurrentPlanSaved}
                  onPrint={() => setIsPrintView(true)}
                  onUpdatePlan={(updated) => {
                    setCurrentPlan(updated);
                    handleSavePlan(updated);
                  }}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 shadow-xs">
                  <BookOpen className="w-16 h-16 mx-auto mb-3 opacity-20 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-700">No Lesson Plan Selected</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your sequence, section and session menus on the left to generate an official didactic plan.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Elegant Footer & Creator Attribution */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  DidactiPlan • Algerian Primary English Lesson Planner (3PS, 4PS, 5PS)
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Aligned with CNP Didactic Guide, Oral-First SLA & Official Inspection Formats (Page 75)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-emerald-800">"Created by Teacher Benaichouba Mohamed A."</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Teacher Registration Profile Modal */}
      <TeacherProfileModal
        isOpen={isTeacherProfileOpen}
        onClose={() => setIsTeacherProfileOpen(false)}
        profile={teacherProfile}
        onSaveProfile={handleSaveTeacherProfile}
      />

      {/* Didactic Guide Reference Modal */}
      <DidacticGuideReferenceModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Saved Plans Drawer */}
      <SavedPlansDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedPlans={savedPlans}
        onSelectPlan={(plan) => setCurrentPlan(plan)}
        onDeletePlan={handleDeleteSavedPlan}
      />

      {/* Purchase / Upgrade Modal (4 Pricing Options & Algerian Payment) */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        generationsCount={licenseInfo.generationsUsed}
        maxFree={licenseInfo.maxFreeGenerations}
        licenseInfo={licenseInfo}
        onActivateLicense={handleActivateLicense}
        teacherProfile={teacherProfile}
      />

    </div>
  );
}

export default App;
