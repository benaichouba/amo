import { GoogleGenAI, Type } from '@google/genai';
import { LessonGenerationParams, LessonPlan } from '../src/types';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Mock/fallback generation will be used if needed.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || 'mock-key',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function generateDidacticLessonPlan(params: LessonGenerationParams): Promise<LessonPlan> {
  const ai = getGeminiClient();

  const systemInstruction = `
You are an expert pedagogical Didactic Curriculum Specialist and Teacher Education Master.
You strictly adhere to official didactic frameworks, specifically:
1. PRIMARY SOURCES: The official Algerian Primary English Didactic Guides (Ministry of National Education / National Curriculum Council CNP):
   - Year 3 & Year 4 Primary Education (Key Stages 1 & 2):
     * Session 1: "I Sing and Have Fun" (10 min) + "I Listen and Repeat" (35 min auditory phonemic awareness).
     * Session 2: "I Read and Discover" (45 min phonics, sound-spelling mapping).
     * Session 3 (in Year 4): "I Read and Enjoy" (45 min reading games: Board Race, Word Jumble, Snap).
     * Session 3 (Y3) / Session 4 (Y4): "I Read and Write" (45 min handwriting stroke families: anticlockwise (a,c,d,g,q,e,o,f,s), clockwise (m,n,r,x,z,h,k,p), i-family (i,t,l,j), u-family (u,y,v,w,b); print in Y3; connected cursive in Y4).
     * Session 4 (Y3) / Session 5 (Y4): "I Play Roles" (45 min authentic communicative drama).
   - Year 5 Primary Education (Key Stage 3 - CNP 2024 Didactic Guide):
     * Target Level: Elementary A2.1 (10-11 years old). 42 hours annually across 3 Sequences (Jobs/Occupations & Hobbies; Hometown Amenities/Directions; Holidays & Travelling), each with 2 Sections and 3 Assessment Pauses (2 hours each).
     * 8-Session Section Architecture (45m each • 6 hours total per section):
       - Session 1: "I Get Ready" (Initial Problem Situation, listening script, decoding 40-word text, portfolio writing).
       - Session 2: "I Listen & Interact" (Prediction, listening for gist/specifics, Exit Ticket formative check).
       - Session 3: "I Listen & Discover" (Structural discovery, controlled SV agreement & intonation drilling, substitution drills).
       - Session 4: "I Read & Understand" (Grapheme-phoneme decoding, skimming for gist, scanning for specific amenities/names).
       - Session 5: "I Read & Discover" (Implicit grammar in written context, syntax, word order, sentence anagrams).
       - Session 6: "I Learn & Enjoy" (Language games: word formation suffixes -er/-or/-ist/-ian, "Got it!", "Snap!", Dictation race).
       - Session 7: "I Learn to Write" (Transforming notes from ID/profile charts into sentences, cooperative small-group drafting, proofreading).
       - Session 8: "I Write" (Section 1: Individual ~20-word cursive paragraph from form, peer rubric, Gallery Walk) OR "I Check my Progress" (Section 2: Global competence evaluation).
     * Target Phonics: /ʒ/ vs /dʒ/, velar nasal /ŋ/, /j/ vs /w/, adding/deleting phonemes.
     * Capstone Project: "My Booklet".
   - Exit Profile: Global competence, National identity/values (Algerian/Muslim/Arab/Amazigh identity, citizenship, mutual respect, openness to the world), 4 Cross-Curricular Competences (Intellectual, Methodological, Communicative, Personal/Social), and 4 Core Domains (Oral Comprehension, Oral Production, Written Comprehension, Written Production).
   - Problem Solving & Evaluation: Initial problem situation, 3 Assessment/Remediation Pauses with 4-level evaluation grid (Full Mastery, Acceptable, Partial, Minimum Mastery).
   - Official Session Layout Template (Class Profile, Sequence, Section, Session, Objectives, Target Competence, Linguistic Resources, Teaching Materials, Anticipated Problems & Plan B, Stages: Warmer, Install Resources, Assessment, Self-reflection: What worked / What hindered / Action plan).

2. SECONDARY SOURCES: Research in Applied Linguistics & Second Language Acquisition (Lund University / Kersten & Rohde, Processability Theory, Swain Output Hypothesis):
   - Action-Oriented Pedagogy ("Head, Heart & Hand" multisensory VAKT - Visual, Auditory, Kinesthetic, Tactile).
   - Teacher language: Rich input commentary, adapted teacher talk / motherese without being condescending, gestures, mime, facial expressions, formulaic scaffolding routines, implicit focus on form (recasts, prompts).
   - Multi-Tier Differentiated Instruction:
     * Tier 1 (Universal Core): Visual organizers, whole-class games, rhythmic clapping.
     * Tier 2 (Targeted Support): Scaffolded word banks, phoneme flashcards, peer buddy pair work, guided practice.
     * Tier 3 (Intensive/Accommodations): Dyslexia accommodations (enlarged font, color-coded vowels/consonants), Dysgraphia accommodations (spaced lined guidelines, tactile sand/air tracing, motor stroke grouping), ADHD movement breaks, Multilingual EAL / L1-L2 transfer scaffolds (cognates, contrastive noticing).
     * Fast Finishers / Gifted: Creative extension dialogues, challenging cross-curricular puzzles, peer coaching.

3. MULTI-SUBJECT EXTENSIBILITY:
   - For Science: 5E Inquiry Model (Engage, Explore, Explain, Elaborate, Evaluate).
   - For Mathematics: Concrete-Pictorial-Abstract (CPA) Bruner framework.
   - For Social Studies / History: Source inquiry, timeline reasoning, and empathetic historical simulation.

Return a rich, complete, fully populated JSON matching the requested schema with highly detailed pedagogical content, realistic teacher and learner steps, printable student handouts, and an authentic 4-level evaluation grid.
`;

  const userPrompt = `
Generate a complete, comprehensive, publication-grade Didactic Lesson Plan with the following parameters:
- Subject: ${params.subject}
- Grade/Year Level: ${params.gradeYear}
- Topic: ${params.topic}
${params.sequenceTitle ? `- Sequence: ${params.sequenceTitle}` : ''}
${params.sectionTitle ? `- Section: ${params.sectionTitle}` : ''}
${params.sessionType ? `- Session Type / Focus: ${params.sessionType}` : ''}
- Duration: ${params.durationMinutes} minutes
- Pedagogical Framework: ${params.framework}
- Perceptual Style Emphasis: ${params.vaktEmphasis}
${params.customObjectives ? `- Custom Teacher Objectives: ${params.customObjectives}` : ''}
${params.targetLanguageLevel ? `- Target Language Level: ${params.targetLanguageLevel}` : ''}
- Include Special Needs & Differentiated Materials: ${params.includeSpecialNeeds ? 'YES (Include detailed accommodations for Dyslexia, Dysgraphia, ADHD, and EAL Multilingual Learners)' : 'Standard'}
${params.additionalContext ? `- Additional Teacher Notes / Context: ${params.additionalContext}` : ''}

Ensure every section is thoroughly developed:
- Class profile, communicative & subsidiary objectives, target competences.
- Full values & citizenship alignments (Algerian identity, respect, global openness).
- 4 Cross-curricular competences (Intellectual, Methodological, Communicative, Personal/Social).
- Linguistic resources (key vocabulary, grammar chunks, phonics sounds, handwriting stroke families).
- Step-by-step instructional stages (Warmer / Sing & Fun, Install Resources / Listen & Repeat, Read & Discover / Phonics, Read & Enjoy / Game, Read & Write / Handwriting, Play Roles / Communicative Drama, Wrap-up / Assessment) with exact minutes, teacher actions, learner activities, interaction patterns, and differentiation notes.
- Tiered differentiation breakdown (Tier 1, Tier 2, Tier 3, VAKT, Special Needs, Fast Finishers).
- Official 4-level evaluation grid (Full, Acceptable, Partial, Minimum Mastery).
- 3 to 4 ready-to-print student handouts (e.g. Phonics decoding worksheet, Handwriting stroke sheet with family grouping, Role-play dialogue prompt cards, and Exit ticket).
- Teacher self-reflection framework (What worked, What hindered, Action plan).
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            targetLevel: { type: Type.STRING },
            gradeYear: { type: Type.STRING },
            sequenceTitle: { type: Type.STRING },
            sectionTitle: { type: Type.STRING },
            sessionNumber: { type: Type.STRING },
            totalDurationMinutes: { type: Type.NUMBER },
            framework: { type: Type.STRING },
            classProfile: {
              type: Type.OBJECT,
              properties: {
                level: { type: Type.STRING },
                estimatedLearners: { type: Type.NUMBER },
                ageRange: { type: Type.STRING },
              },
              required: ['level', 'estimatedLearners', 'ageRange']
            },
            sessionObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            subsidiaryObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            targetCompetences: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            valuesAndCitizenship: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            crossCurricularCompetences: {
              type: Type.OBJECT,
              properties: {
                intellectual: { type: Type.STRING },
                methodological: { type: Type.STRING },
                communicative: { type: Type.STRING },
                personalSocial: { type: Type.STRING },
              },
              required: ['intellectual', 'methodological', 'communicative', 'personalSocial']
            },
            linguisticResources: {
              type: Type.OBJECT,
              properties: {
                vocabulary: { type: Type.ARRAY, items: { type: Type.STRING } },
                grammar: { type: Type.ARRAY, items: { type: Type.STRING } },
                phonicsSounds: { type: Type.ARRAY, items: { type: Type.STRING } },
                handwritingLetterFamilies: { type: Type.STRING },
              },
              required: ['vocabulary', 'grammar', 'phonicsSounds']
            },
            teachingMaterials: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            anticipatedProblems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            solutionsPlanB: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            stages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stageName: { type: Type.STRING },
                  timeMinutes: { type: Type.NUMBER },
                  teacherRole: { type: Type.STRING },
                  learnerActivity: { type: Type.STRING },
                  interactionPattern: { type: Type.STRING },
                  teachingMaterials: { type: Type.ARRAY, items: { type: Type.STRING } },
                  phonemicPhonicsFocus: { type: Type.STRING },
                  differentiationTip: { type: Type.STRING },
                },
                required: ['stageName', 'timeMinutes', 'teacherRole', 'learnerActivity', 'interactionPattern', 'teachingMaterials']
              }
            },
            differentiatedInstruction: {
              type: Type.OBJECT,
              properties: {
                tier1Universal: { type: Type.ARRAY, items: { type: Type.STRING } },
                tier2Targeted: { type: Type.ARRAY, items: { type: Type.STRING } },
                tier3Intensive: { type: Type.ARRAY, items: { type: Type.STRING } },
                vaktStrategies: {
                  type: Type.OBJECT,
                  properties: {
                    visual: { type: Type.STRING },
                    auditory: { type: Type.STRING },
                    kinesthetic: { type: Type.STRING },
                    tactile: { type: Type.STRING },
                  },
                  required: ['visual', 'auditory', 'kinesthetic', 'tactile']
                },
                specialNeedsAccommodations: {
                  type: Type.OBJECT,
                  properties: {
                    dysgraphia: { type: Type.STRING },
                    dyslexia: { type: Type.STRING },
                    adhdOrFocus: { type: Type.STRING },
                    multilingualEAL: { type: Type.STRING },
                  },
                  required: ['dysgraphia', 'dyslexia', 'adhdOrFocus', 'multilingualEAL']
                },
                fastFinishersAndGifted: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['tier1Universal', 'tier2Targeted', 'tier3Intensive', 'vaktStrategies', 'specialNeedsAccommodations', 'fastFinishersAndGifted']
            },
            evaluationGrid: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  domain: { type: Type.STRING },
                  criterion: { type: Type.STRING },
                  fullMastery: { type: Type.STRING },
                  acceptableMastery: { type: Type.STRING },
                  partialMastery: { type: Type.STRING },
                  minimumMastery: { type: Type.STRING },
                },
                required: ['id', 'domain', 'criterion', 'fullMastery', 'acceptableMastery', 'partialMastery', 'minimumMastery']
              }
            },
            studentHandouts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  title: { type: Type.STRING },
                  instructions: { type: Type.STRING },
                  content: { type: Type.STRING },
                  solutions: { type: Type.STRING },
                },
                required: ['id', 'type', 'title', 'instructions', 'content']
              }
            },
            selfReflectionTemplate: {
              type: Type.OBJECT,
              properties: {
                whatWorked: { type: Type.STRING },
                whatHindered: { type: Type.STRING },
                actionPlan: { type: Type.STRING },
              },
              required: ['whatWorked', 'whatHindered', 'actionPlan']
            }
          },
          required: [
            'title', 'subject', 'targetLevel', 'gradeYear', 'sequenceTitle', 'sectionTitle',
            'sessionNumber', 'totalDurationMinutes', 'classProfile', 'sessionObjectives',
            'targetCompetences', 'valuesAndCitizenship', 'crossCurricularCompetences',
            'linguisticResources', 'teachingMaterials', 'anticipatedProblems', 'solutionsPlanB',
            'stages', 'differentiatedInstruction', 'evaluationGrid', 'studentHandouts', 'selfReflectionTemplate'
          ]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    const fullPlan: LessonPlan = {
      id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      framework: params.framework,
      teacherProfile: params.teacherProfile,
      ...parsedJson
    };

    return fullPlan;
  } catch (error) {
    console.error('Error generating lesson plan via Gemini API:', error);
    // Return a structured robust fallback populated with full Didactic Guide Year 3 / 4 / 5 standards
    return createRichFallbackPlan(params);
  }
}

export function createRichFallbackPlan(params: LessonGenerationParams): LessonPlan {
  const isYear5 = params.gradeYear.includes('5');
  const isYear4 = params.gradeYear.includes('4');
  const duration = params.durationMinutes || 45;
  const learnersCount = 
    params.gradeYear === '3PS' ? (params.teacherProfile?.learners3PS || 32) :
    params.gradeYear === '4PS' ? (params.teacherProfile?.learners4PS || 34) :
    (params.teacherProfile?.learners5PS || 30);

  return {
    id: 'plan_' + Date.now(),
    title: params.topic ? `${params.topic} - Didactic Lesson Plan` : 'Primary English Didactic Lesson Plan',
    subject: params.subject,
    targetLevel: params.targetLanguageLevel || (isYear5 ? 'Key Stage 3 (Elementary A2.1)' : isYear4 ? 'Key Stage 2 (Elementary A1.2)' : 'Key Stage 1 (Beginner A1.1)'),
    gradeYear: params.gradeYear,
    sequenceTitle: params.sequenceTitle || 'Sequence 1: Family & Friends',
    sectionTitle: params.sectionTitle || 'Section 1: Family Members',
    sessionNumber: params.sessionType || 'Session 1 (I Sing & Have Fun + I Listen & Repeat)',
    totalDurationMinutes: duration,
    framework: params.framework,
    teacherProfile: params.teacherProfile,
    classProfile: {
      level: `${params.gradeYear} Primary`,
      estimatedLearners: learnersCount,
      ageRange: isYear5 ? '10-11 years old' : isYear4 ? '9-10 years old' : '8-9 years old',
      homeLanguages: ['Algerian Arabic', 'Tamazight'],
      l1LiteracyNotes: 'Learners are familiar with Arabic script (RTL). English Left-to-Right layout and letter families scaffolded.'
    },
    sessionObjectives: [
      `Introduce key vocabulary and communicative functions related to ${params.topic || 'the topic'}`,
      'Recognize and isolate target phonemic sound units through auditory awareness and visual flashcards',
      'Participate in interactive oral drilling and authentic pair role-play dialogue',
      'Apply correct letter stroke formation and spacing according to Didactic Guide standards'
    ],
    subsidiaryObjectives: [
      'Discriminate between contrasting phonemes in initial and medial positions',
      'Follow classroom instructions and formulaic routine commands with TPR actions',
      'Express polite conversational turns (greeting, asking, and thanking)'
    ],
    targetCompetences: [
      'Comprehend oral messages and identify the meaning of words in familiar context using paralinguistic features',
      'Interact orally in communicative situations related to daily concerns using simple words and chunks',
      'Decode symbols, read simple messages of 30-40 words using graphophonic knowledge and visuals',
      'Write letters, words and simple sentences using correct handwriting, sizing, alignment and punctuation'
    ],
    valuesAndCitizenship: [
      'National Identity: Pride in cultural heritage and mother tongue foundations',
      'Citizenship: Demonstrating respect, patience, and attentive listening towards peers and teacher',
      'Openness to the World: Communicating in a global language with enthusiasm and curiosity'
    ],
    crossCurricularCompetences: {
      intellectual: 'Discover the relationship between communicative context, paralinguistic gestures, and word meaning.',
      methodological: 'Exploit linguistic repertoire, phonemic decoding strategies, and left-to-right handwriting stroke alignment.',
      communicative: 'React to verbal and non-verbal cues, select appropriate formulaic expressions for oral interaction.',
      personalSocial: 'Collaborate respectfully in pairs, value classmates’ readings and handwriting efforts.'
    },
    linguisticResources: {
      vocabulary: ['father', 'mother', 'brother', 'sister', 'grandfather', 'grandmother', 'friend', 'house', 'pencil', 'school'],
      grammar: ['Present simple (to be, to have)', 'Contracted forms: I’m, He’s, She’s', 'Wh-questions: Who is it? What’s his/her name?', 'Articles: a, an'],
      phonicsSounds: ['/i/ (in, live, six)', '/æ/ (cat, bag, black)', '/ʌ/ (under, Sunday)', 'Consonant discrimination: /p/ vs /b/'],
      handwritingLetterFamilies: isYear4 
        ? 'Connected Cursive handwriting (joined script, ascenders, descenders, and line discipline)'
        : 'Family 1 (l-family: i, j, l, t, u) & Family 2 (r-family: b, h, k, m) Print Lowercase'
    },
    teachingMaterials: [
      'Colourful flashcards and word-picture matching cards',
      'Audio recording / Rhyme audio for "I Sing and Have Fun"',
      'Realia and puppet figures for family/school items',
      'Grid four-line whiteboard and student handwriting slates',
      'Four-level Didactic Guide Rubric assessment sheet'
    ],
    anticipatedProblems: [
      'Learners might confuse similar consonant sounds (/p/ and /b/) or vowel lengths (/i/ and /i:/)',
      'Letter reversals such as "b" and "d" or Arabic right-to-left interference in pencil orientation',
      'Short span of attention after 10-12 minutes of static instruction'
    ],
    solutionsPlanB: [
      'Plan B: Use tactile mirror checks and finger-whisper repetition for /p/ aspiration vs /b/ voicing',
      'Plan B: Use rhythmic stroke air-tracing and anticlockwise visual anchors (dots and arrows) before writing',
      'Plan B: Switch activity immediately to a high-energy TPR song or 3-minute kinesthetic relay game'
    ],
    stages: [
      {
        stageName: 'Warmer: I Sing and Have Fun (Opening & Motivation)',
        timeMinutes: 10,
        teacherRole: 'Displays colorful visual cards; sings the topic rhyme with lively gestures, rhythm, and clear facial expressions; invites whole-class choral join-in.',
        learnerActivity: 'Listen attentively to rhythm and melody, replicate phonemes, clap rhythmically in unison, and mime actions with enthusiasm.',
        interactionPattern: 'T-C (Teacher-Class)',
        teachingMaterials: ['Song audio track', 'Topic visual poster', 'Action cards'],
        phonemicPhonicsFocus: 'Auditory pitch discrimination and initial phoneme isolation',
        differentiationTip: 'Tier 1: Full choral chant. Tier 2: Provide illustrated song strip with icon prompts.'
      },
      {
        stageName: 'Install Resources: I Listen & Repeat (Phonemic Awareness & Drilling)',
        timeMinutes: 15,
        teacherRole: 'Models target lexical items using realia and picture flashcards. Conducts 3-finger phoneme isolation, blending, and segmenting. Guides chorus and individual repetition.',
        learnerActivity: 'Hold up 3 fingers for individual sounds (e.g. /c/-/a/-/t/), blend sounds into target words, repeat in choral and pair drilling, answer simple prompt questions.',
        interactionPattern: 'T-L (Teacher-Learner)',
        teachingMaterials: ['Realia props', 'Word-sound flashcards', 'Phoneme segmentation markers'],
        phonemicPhonicsFocus: 'Isolating first, medial, and final phonemes in VC and CVC words',
        differentiationTip: 'Tier 3 / EAL: Use concrete manipulative counters and tactile tapping.'
      },
      {
        stageName: 'I Read & Discover / I Read & Enjoy (Phonics & Reading Game)',
        timeMinutes: 10,
        teacherRole: 'Presents short text (30 words) on board; demonstrates left-to-right finger decoding; facilitates a fast-paced Board Race / Word Jumble relay.',
        learnerActivity: 'Track words with index finger, decode letter-sound mappings, collaborate in teams to assemble scrambled word cards and race to match definitions.',
        interactionPattern: 'Groups',
        teachingMaterials: ['Mini flashcard sets', 'Board race colored markers', 'Pocket chart'],
        phonemicPhonicsFocus: 'Grapheme-to-phoneme correspondence and chunking',
        differentiationTip: 'Dyslexia Accommodation: Color-code vowels in red and consonants in blue.'
      },
      {
        stageName: 'I Read & Write (Handwriting & Form Practice)',
        timeMinutes: 7,
        teacherRole: 'Models letter formation on 4-line grid showing starting dot, direction of pull/push, sizing, and spacing within letter families. Monitors seated posture.',
        learnerActivity: 'Air-trace letter strokes, practice on slates/lined handouts adhering to top-to-bottom and left-to-right orientation, copy short label correctly.',
        interactionPattern: 'Individual',
        teachingMaterials: ['4-line ruled worksheet', 'Pencil grips', 'Handwriting stroke reference card'],
        handwritingFamily: 'Anticlockwise stroke family (c, a, d, g, q, o)',
        differentiationTip: 'Dysgraphia Accommodation: Provide highlighted baseline tracks and spaced letter boxes.'
      },
      {
        stageName: 'I Play Roles & Assessment Wrap-up',
        timeMinutes: 3,
        teacherRole: 'Guides two pairs to act out the target dialogue using props. Conducts quick thumbs-up / emoji self-assessment check.',
        learnerActivity: 'Perform authentic mini-dialogue in pairs using conversational chunks and friendly gestures. Complete 1-minute exit ticket.',
        interactionPattern: 'L-L (Pair Work)',
        teachingMaterials: ['Roleplay dialogue cards', 'Emoji peer feedback cards', 'Exit tickets'],
        differentiationTip: 'Fast Finishers: Add an extra conversational detail (e.g. asking age or favorite color).'
      }
    ],
    differentiatedInstruction: {
      tier1Universal: [
        'Multi-sensory instruction integrating visual posters, audio rhymes, and physical TPR gestures',
        'Whole-group choral drilling to build confidence and lower affective filter',
        'Structured classroom routines with visual daily schedule and predictable prompts'
      ],
      tier2Targeted: [
        'Pre-taught vocabulary flashcard banks with bilingual image cues',
        'Peer buddy system pairing confident readers with emerging readers',
        'Targeted teacher recasts and scaffolded sentence frames (e.g. "This is my ____")'
      ],
      tier3Intensive: [
        'One-on-one phonemic tapping with tactile sandpaper letters and concrete tokens',
        'Reduced text density: single-word prompt cards instead of full paragraphs',
        'Frequent praise, immediate positive feedback, and simplified oral instructions'
      ],
      vaktStrategies: {
        visual: 'High-contrast color flashcards, visual timetable, graphic organizing family trees, and illustrated lyrics.',
        auditory: 'Teacher modeling, choral cadence chanting, rhythm clapping, and song melodies.',
        kinesthetic: 'Total Physical Response (TPR) body movements, Board Race relay competitions, and drama role-play.',
        tactile: 'Holding and manipulating realia, tracing sandpaper letters, and sliding physical phoneme counters.'
      },
      specialNeedsAccommodations: {
        dysgraphia: 'Provide wide-ruled paper with highlighted base guidance lines, triangular ergonomic pencil grips, allow oral responses alongside tracing.',
        dyslexia: 'Use high-legibility sans-serif fonts with generous letter tracking, color-coded vowel/consonant pairs, and avoid timed reading pressure.',
        adhdOrFocus: 'Incorporate 30-second kinesthetic stretch breaks between 10-minute activity shifts, clear visual task checklists, and tactile fidget tools.',
        multilingualEAL: 'Leverage cognates and positive L1/L2 transfer, incorporate translanguaging bridge notes, and ensure non-stigmatizing communicative validation.'
      },
      fastFinishersAndGifted: [
        'Write an extended dialogue introducing three characters and describing their favorite objects',
        'Act as student peer mentor in role-play coaching',
        'Design a mini illustrated dictionary page with creative definitions'
      ]
    },
    evaluationGrid: [
      {
        id: 'crit-1',
        domain: 'Oral Interaction',
        criterion: 'Recognize and pronounce target vocabulary with correct phonemic intonation',
        fullMastery: 'Independently identifies and pronounces all target words accurately with expressive paralinguistic features.',
        acceptableMastery: 'Identifies and pronounces most words correctly with minor phonemic hesitation.',
        partialMastery: 'Recognizes words with visual support; pronunciation requires teacher modeling/recasting.',
        minimumMastery: 'Struggles to recognize words; requires continuous individual prompting.'
      },
      {
        id: 'crit-2',
        domain: 'Written Comprehension',
        criterion: 'Decode symbols and short messages using grapheme-phoneme strategies',
        fullMastery: 'Fluently segments and blends target CVC words; reads short text with complete comprehension.',
        acceptableMastery: 'Decodes familiar words accurately; needs slight guidance on novel blends.',
        partialMastery: 'Recognizes isolated letters and sounds; requires segmenting assistance for words.',
        minimumMastery: 'Recognizes few initial letter sounds; cannot yet blend CVC units.'
      },
      {
        id: 'crit-3',
        domain: 'Written Production',
        criterion: 'Implement correct handwriting features (sizing, spacing, alignment, and stroke family)',
        fullMastery: 'Forms all letters correctly within standard lines with consistent spacing and clear directionality.',
        acceptableMastery: 'Forms letters legibly on baseline; minor irregularities in spacing or ascender height.',
        partialMastery: 'Letters are identifiable but inconsistent in sizing or stroke order; occasional reversals.',
        minimumMastery: 'Significant difficulty with letter strokes; struggles with baseline alignment.'
      }
    ],
    studentHandouts: [
      {
        id: 'handout-1',
        type: 'phonics_card',
        title: 'Phonics & Sound Explorer Card',
        instructions: 'Look at the picture. Say the word. Tap the 3 sounds on your fingers. Circle the correct vowel sound!',
        content: `
1. [ CAT ] -> /c/ - /æ/ - /t/  -> Sound: [ /æ/ | /i/ | /ɒ/ ]
2. [ PIN ] -> /p/ - /i/ - /n/  -> Sound: [ /i/  | /e/ | /ʌ/ ]
3. [ DOG ] -> /d/ - /ɒ/ - /g/  -> Sound: [ /ɒ/ | /æ/ | /u:/ ]
4. [ PEN ] -> /p/ - /e/ - /n/  -> Sound: [ /e/  | /i/ | /ʌ/ ]
        `,
        solutions: '1. /æ/ (cat), 2. /i/ (pin), 3. /ɒ/ (dog), 4. /e/ (pen)'
      },
      {
        id: 'handout-2',
        type: 'writing_worksheet',
        title: 'Handwriting & Stroke Family Practice',
        instructions: 'Trace the lowercase letters from top to bottom. Pay attention to the starting dot and arrows!',
        content: `
Family 1 (l-family):  i | j | l | t | u
Family 2 (r-family):  b | h | k | m | n | p | r
Family 3 (c-family):  c | a | d | e | g | o | q | f | s

Practice Word:  m y   f a m i l y
____________________________________________________
____________________________________________________
____________________________________________________
        `
      },
      {
        id: 'handout-3',
        type: 'roleplay_dialogue',
        title: 'Pair Roleplay Dialogue Cards',
        instructions: 'Work with your partner. Student A is Pupil 1, Student B is Pupil 2. Use realia props and smile!',
        content: `
Pupil 1: "Hello! My name is ____. What is your name?"
Pupil 2: "Hi! I am ____. Pleased to meet you!"
Pupil 1: "Who is in this photo?"
Pupil 2: "This is my ____ [father/mother/brother]. His/Her name is ____."
Pupil 1: "Wonderful! Thank you!"
Pupil 2: "You are welcome!"
        `
      },
      {
        id: 'handout-4',
        type: 'exit_ticket',
        title: 'Daily Exit Ticket (3-2-1 Check)',
        instructions: 'Before you leave, complete your quick 3-2-1 reflection ticket!',
        content: `
1. Two words I learned today: __________________  and  __________________
2. One sound I practiced: / ___ /
3. How I feel about today's lesson: [ 😊 I got it! | 😐 Need more practice | 🙁 Need help ]
        `
      }
    ],
    selfReflectionTemplate: {
      whatWorked: 'High student engagement during "I Sing and Have Fun" chant; finger-tapping strategy effectively supported phoneme segmentation.',
      whatHindered: 'Several learners experienced confusion between /p/ and /b/ minimal pairs during individual drilling.',
      actionPlan: 'Introduce tactile mirror checks and color-coded flashcard sorting in next session warmer to solidify /p/ vs /b/ discrimination.'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
