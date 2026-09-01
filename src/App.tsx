import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonGeneratorForm } from './components/LessonGeneratorForm';
import { LessonPlanViewer } from './components/LessonPlanViewer';
import { MonthlyDistributionView } from './components/MonthlyDistributionView';
import { YearlyDistributionView } from './components/YearlyDistributionView';
import { DidacticGuideReferenceModal } from './components/DidacticGuideReferenceModal';
import { SavedPlansDrawer } from './components/SavedPlansDrawer';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { PurchaseModal } from './components/PurchaseModal';
import { RegistrationGateModal } from './components/RegistrationGateModal';
import { PrintableView } from './components/PrintableView';
import { LessonPlan, LessonGenerationParams, TeacherProfile, LicenseInfo } from './types';
import { Sparkles, AlertCircle, BookOpen, GraduationCap, CheckCircle2, UserCheck, Crown, Zap, CalendarCheck, ShieldAlert } from 'lucide-react';

const DEFAULT_LICENSE_INFO: LicenseInfo = {
  tier: 'free_trial',
  isPro: false,
  generationsUsed: 0,
  maxFreeGenerations: 3,
  unlockedLevels: ['3PS', '4PS', '5PS']
};

const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  fullName: '',
  phone: '',
  schoolName: '',
  district: '',
  academicYear: '2026 / 2027',
  learners3PS: 0,
  learners4PS: 0,
  learners5PS: 0,
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
    homeLanguages: ['National Language', 'Tamazight'],
    l1LiteracyNotes: 'Learners write Right-to-Left in home literacy. Requires orientation support for English Left-to-Right layout and anticlockwise/downward letter families.'
  },

  sessionObjectives: [
    'Recognize and pronounce family vocabulary orally: father, mother, brother, sister, grandfather, grandmother',
    'Discriminate the short vowel /i/ (sister) vs long vowel /i:/ (teacher) in spoken chants',
    'Execute TPR hand gestures in response to family oral cues without written text',
    'Chant the "Finger Family" nursery song with rhythmic finger puppet actions',
    'Ask and answer formulaic chunks: "Who is this?" -> "This is my father/mother."'
  ],

  crossCurricularCompetencies: {
    intellectual: 'Discovers auditory and visual associations between words and pictorial icons.',
    methodological: 'Works collaboratively in pairs and small choral rows.',
    communicative: 'Uses spoken formulaic chunks to identify family members in roleplay.',
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
      'Pairing hesitant learners with enthusiastic peers for choral chants'
    ],
    tier3Intensive: [
      'Tactile finger-puppet touching and simplified 1-word responses ("Father")',
      'Visual vocabulary strip kept on pupil desk during whole-class games'
    ]
  },

  assessmentRubrics: [
    {
      criterion: 'Pronunciation & Phonics (/f/, /m/, /i/)',
      emerging: 'Hesitates on initial sounds; replaces /f/ with /b/',
      developing: 'Produces target phonemes with teacher prompt',
      proficient: 'Clear, intelligible pronunciation of all family words',
      advanced: 'Flawless prosody, tone, and independent nursery chant recitation'
    },
    {
      criterion: 'Oral Interaction ("Who is this?" / "This is...")',
      emerging: 'Responds with single isolated word ("Sister")',
      developing: 'Produces formulaic chunk with noticeable pausing',
      proficient: 'Spontaneously uses "This is my [member]" in pair work',
      advanced: 'Initiates dialogue and assists peers confidently'
    }
  ],

  printableHandouts: [
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
  // Device IP and Mandatory First-Time Registration State
  const [deviceIp, setDeviceIp] = useState<string>('');
  const [isRegistrationGateOpen, setIsRegistrationGateOpen] = useState<boolean>(false);
  const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false);

  // Teacher Registration Profile State
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => {
    try {
      const stored = localStorage.getItem('didactiplan_teacher_profile');
      return stored ? JSON.parse(stored) : DEFAULT_TEACHER_PROFILE;
    } catch {
      return DEFAULT_TEACHER_PROFILE;
    }
  });

  // License & Subscription State (3 free lesson plans limit bound to Device IP)
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
  const [activeTab, setActiveTab] = useState<'lesson_planner' | 'monthly_distribution' | 'yearly_distribution'>('lesson_planner');
  const [isTeacherProfileOpen, setIsTeacherProfileOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isPrintView, setIsPrintView] = useState<boolean>(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);

  // Check Server Auth & Device IP Registration on Platform Launch
  useEffect(() => {
    async function checkDeviceStatus() {
      try {
        const res = await fetch('/api/auth/status');
        if (res.ok) {
          const data = await res.json();
          setDeviceIp(data.ip || '');

          if (data.requiresRegistration || !data.isRegistered) {
            // First time on this IP: Mandate registration page FIRST
            setIsRegistrationGateOpen(true);
          } else {
            // Existing registered IP: restore server verified teacher profile and license
            if (data.teacherProfile && data.teacherProfile.fullName) {
              setTeacherProfile(data.teacherProfile);
              localStorage.setItem('didactiplan_teacher_profile', JSON.stringify(data.teacherProfile));
            }
            if (data.licenseInfo) {
              setLicenseInfo(data.licenseInfo);
              localStorage.setItem('didactiplan_license_info', JSON.stringify(data.licenseInfo));
            }
            setIsRegistrationGateOpen(false);
          }
        } else {
          // Fallback if network offline: check local storage
          const stored = localStorage.getItem('didactiplan_teacher_profile');
          if (!stored || !JSON.parse(stored).fullName) {
            setIsRegistrationGateOpen(true);
          }
        }
      } catch (err) {
        console.warn('Could not contact /api/auth/status, checking local storage:', err);
        const stored = localStorage.getItem('didactiplan_teacher_profile');
        if (!stored || !JSON.parse(stored).fullName) {
          setIsRegistrationGateOpen(true);
        }
      } finally {
        setIsAppInitialized(true);
      }
    }

    checkDeviceStatus();
  }, []);

  // Handle successful mandatory registration
  const handleRegistrationSuccess = (profile: TeacherProfile) => {
    setTeacherProfile(profile);
    setIsRegistrationGateOpen(false);
    try {
      localStorage.setItem('didactiplan_teacher_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  // Save Teacher Profile to state and localStorage & sync with server
  const handleSaveTeacherProfile = async (profile: TeacherProfile) => {
    setTeacherProfile(profile);
    try {
      localStorage.setItem('didactiplan_teacher_profile', JSON.stringify(profile));
      // Sync update to server
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherProfile: profile })
      });
    } catch (e) {
      console.error('Failed to sync teacher profile to server/storage', e);
    }
    // Update current plan's teacher profile if present
    if (currentPlan) {
      const updated = { ...currentPlan, teacherProfile: profile };
      setCurrentPlan(updated);
      handleSavePlan(updated);
    }
  };

  // Save License Info & Sync with Server
  const handleActivateLicense = async (newLicense: LicenseInfo) => {
    setLicenseInfo(newLicense);
    try {
      localStorage.setItem('didactiplan_license_info', JSON.stringify(newLicense));
      // Sync license activation with server (permanently locking Pro status to IP)
      await fetch('/api/auth/activate-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseInfo: newLicense })
      });
    } catch (e) {
      console.error('Failed to sync license activation with server', e);
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
        `You have used your ${licenseInfo.maxFreeGenerations} free lesson plan generations on this device. Please activate a subscription package to continue generating unlimited lesson plans.`
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

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.isLimitReached) {
          // Device IP quota reached on server
          setIsPurchaseModalOpen(true);
          const updatedLicense: LicenseInfo = {
            ...licenseInfo,
            generationsUsed: responseData.generationsCount || 3
          };
          setLicenseInfo(updatedLicense);
          localStorage.setItem('didactiplan_license_info', JSON.stringify(updatedLicense));
          throw new Error(responseData.error || 'Trial limit reached on this device.');
        }

        if (responseData.requiresRegistration) {
          setIsRegistrationGateOpen(true);
          throw new Error(responseData.error || 'Please register your device first.');
        }

        throw new Error(responseData.error || `Server responded with status ${response.status}`);
      }

      const generatedPlan: LessonPlan = responseData;
      generatedPlan.teacherProfile = teacherProfile;
      setCurrentPlan(generatedPlan);
      
      // Auto save plan
      handleSavePlan(generatedPlan);

      // Increment generationsUsed with verified server stats
      const serverGenerations = responseData._serverStats?.generationsUsed ?? ((licenseInfo.generationsUsed || 0) + 1);
      const updatedLicense: LicenseInfo = {
        ...licenseInfo,
        generationsUsed: serverGenerations
      };
      setLicenseInfo(updatedLicense);
      try {
        localStorage.setItem('didactiplan_license_info', JSON.stringify(updatedLicense));
      } catch (e) {
        console.error(e);
      }

      // If user just hit the 3rd generation, open purchase modal to present the 4 choices
      if (!licenseInfo.isPro && serverGenerations >= licenseInfo.maxFreeGenerations) {
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
        
        {/* Device Registration & License Status Header Widget */}
        <div className="mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-700">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">
                  Teacher: {teacherProfile.fullName || 'Registered Teacher'}
                </span>
                {licenseInfo.isPro ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-slate-950 uppercase tracking-wide">
                    Pro Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wide">
                    Free Trial ({licenseInfo.generationsUsed} / {licenseInfo.maxFreeGenerations} used)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 flex items-center space-x-2 mt-0.5">
                <span>{teacherProfile.schoolName || 'Primary School'} • {teacherProfile.district || 'National Curriculum'}</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-mono text-[11px]">IP: {deviceIp || '127.0.0.1'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            {!licenseInfo.isPro && (
              <button
                onClick={() => setIsPurchaseModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Upgrade Pro</span>
              </button>
            )}

            <button
              onClick={() => setIsTeacherProfileOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>

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
        {activeTab === 'yearly_distribution' ? (
          <YearlyDistributionView
            licenseInfo={licenseInfo}
            teacherProfile={teacherProfile}
            onOpenPurchase={() => setIsPurchaseModalOpen(true)}
            onOpenTeacherProfile={() => setIsTeacherProfileOpen(true)}
            onSelectSessionToGenerate={(params) => {
              setActiveTab('lesson_planner');
              handleGenerate(params);
            }}
          />
        ) : activeTab === 'monthly_distribution' ? (
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
                    View CNP Guide
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="font-black text-emerald-900 block text-xs">3PS</span>
                    <span className="text-[10px] text-slate-500">6 Sequences Oral/Phonics</span>
                  </div>
                  <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100">
                    <span className="font-black text-teal-900 block text-xs">4PS</span>
                    <span className="text-[10px] text-slate-500">6 Sequences Reading/Writing</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="font-black text-amber-900 block text-xs">5PS</span>
                    <span className="text-[10px] text-slate-500">6 Sequences Integrated SLA</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  <p>✓ Strictly follows the 4/5 session sequence model.</p>
                  <p>✓ All lesson plans automatically populated with teacher name: <strong className="text-slate-900">{teacherProfile.fullName || 'Not Registered'}</strong>.</p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Lesson Plan Viewer & Print Ready (7 cols on lg) */}
            <div className="lg:col-span-7">
              <LessonPlanViewer
                plan={currentPlan}
                isLoading={isLoading}
                onSavePlan={handleSavePlan}
                isSaved={isCurrentPlanSaved}
                onPrint={() => setIsPrintView(true)}
                onOpenPurchaseModal={() => setIsPurchaseModalOpen(true)}
                licenseInfo={licenseInfo}
              />
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
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                <span>Created and Developed by Teacher : <strong className="text-emerald-950 font-bold">Benaichouba Mohamed A.</strong></span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MANDATORY FIRST-TIME REGISTRATION GATE (Bound to Device IP) */}
      <RegistrationGateModal
        isOpen={isRegistrationGateOpen}
        onRegisteredSuccess={handleRegistrationSuccess}
        onOpenActivationKeyModal={() => {
          setIsPurchaseModalOpen(true);
        }}
        ipAddress={deviceIp}
        initialProfile={teacherProfile}
      />

      {/* Teacher Profile Editing Modal */}
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
