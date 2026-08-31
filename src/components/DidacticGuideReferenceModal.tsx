import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Award, 
  CheckCircle,
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PenTool, 
  Gamepad2, 
  Music,
  Users,
  Eye,
  FileCheck,
  FileText
} from 'lucide-react';

interface DidacticGuideReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DidacticGuideReferenceModal: React.FC<DidacticGuideReferenceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [refTab, setRefTab] = useState<'framework' | 'year5' | 'handwriting' | 'profile' | 'pauses' | 'sla'>('framework');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          id="close-guide-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Ministry of National Education • Didactic Guide Reference
              </h3>
              <p className="text-xs text-slate-500">
                National Curriculum Council (CNP) Standards for Primary English (3PS, 4PS, 5PS - Key Stage 3 2024)
              </p>
              <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                "Created by Teacher Benaichouba Mohamed A."
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Subtabs */}
        <div className="flex space-x-2 border-b border-slate-200 py-3 overflow-x-auto shrink-0">
          <button
            onClick={() => setRefTab('framework')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              refTab === 'framework'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Level Progression (3PS • 4PS • 5PS)
          </button>

          <button
            onClick={() => setRefTab('year5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
              refTab === 'year5'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Year 5 (5PS) Didactic Guide (2024)
          </button>

          <button
            onClick={() => setRefTab('handwriting')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              refTab === 'handwriting'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Handwriting & Stroke Families
          </button>

          <button
            onClick={() => setRefTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              refTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Exit Profile & 4 Competences
          </button>

          <button
            onClick={() => setRefTab('pauses')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              refTab === 'pauses'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Assessment Pauses & Rubrics
          </button>

          <button
            onClick={() => setRefTab('sla')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              refTab === 'sla'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            SLA Pedagogy & VAKT (Head, Heart & Hand)
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-700 pr-1">
          
          {/* TAB 1: Level Progression */}
          {refTab === 'framework' && (
            <div className="space-y-4">
              
              {/* 3PS */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>
                    3PS Structure (4 Sessions per Section • 45 min each)
                  </h4>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    A1.1 Beginner
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Session 1 (Oral Installation):</strong>
                    <span><strong>I Sing & Have Fun (10m)</strong> + <strong>I Listen & Repeat (35m)</strong>. Auditory phonemic awareness, rhymes, realia, teacher modeling & choral/group drilling.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Session 2 (Phonics & Reading):</strong>
                    <span><strong>I Read & Discover (45m)</strong>. Sound-spelling relationship, grapheme-phoneme decoding, minimal pairs, CVC word blending.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Session 3 (Handwriting & Print):</strong>
                    <span><strong>I Read & Write (45m)</strong>. Left-to-right visual orientation, 4 letter stroke families, baseline awareness, print lowercase & uppercase.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Session 4 (Communicative Drama):</strong>
                    <span><strong>I Play Roles (45m)</strong>. Pair dialogues, finger-puppet dramatization, formulaic expressions, and situational exit ticket.</span>
                  </div>
                </div>
              </div>

              {/* 4PS */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 mr-2"></span>
                    4PS Structure (5 Sessions per Section • 45 min each)
                  </h4>
                  <span className="text-[11px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                    A1.2 Elementary
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-teal-700 block mb-1">Session 1:</strong>
                    <span><strong>I Sing & Have Fun (10m)</strong> + <strong>I Listen & Repeat (35m)</strong>. Extended vocabulary and oral structures.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-teal-700 block mb-1">Session 2:</strong>
                    <span><strong>I Read & Discover (45m)</strong>. Long/short vowels, digraphs (/ʃ/, /tʃ/, /θ/, /ð/), sentence decoding.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-teal-700 block mb-1">Session 3 (Reading Games):</strong>
                    <span><strong>I Read & Enjoy (45m)</strong>. Board Race, Word Jumble, Pictionary, relay reading comprehension games.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-teal-700 block mb-1">Session 4 (Connected Cursive):</strong>
                    <span><strong>I Read & Write (45m)</strong>. Cursive letters, word joining, baseline ascenders/descenders, form filling.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 sm:col-span-2">
                    <strong className="text-teal-700 block mb-1">Session 5 (Authentic Drama):</strong>
                    <span><strong>I Play Roles (45m)</strong>. Interactive dialogues, map navigation, shopping/campus roleplay, capstone projects.</span>
                  </div>
                </div>
              </div>

              {/* 5PS */}
              <div className="border border-slate-200 rounded-xl p-4 bg-indigo-50/40">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mr-2"></span>
                    5PS Structure (8 Sessions per Section • 45 min each • 6 Hours Total)
                  </h4>
                  <span className="text-[11px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                    Key Stage 3 • A2.1 Elementary (CNP 2024)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Year 5 comprises <strong>3 Sequences</strong>, each containing <strong>2 Sections</strong>. Each section spans <strong>8 structured 45-minute sessions</strong> followed by an <strong>Assessment & Remediation Pause (2 hours)</strong>. Total annual timing: <strong>42 hours</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-indigo-700 block mb-1">Session 1: I Get Ready</strong>
                    <span>Initial problem situation, listening script, reading text & portfolio writing.</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-indigo-700 block mb-1">Sessions 2 & 3: Oracy</strong>
                    <span><strong>I Listen & Interact</strong> (Gist & Exit Ticket) + <strong>I Listen & Discover</strong> (Substitution drill).</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-indigo-700 block mb-1">Sessions 4 & 5: Literacy</strong>
                    <span><strong>I Read & Understand</strong> (Skimming/Scanning) + <strong>I Read & Discover</strong> (Implicit Grammar).</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-indigo-700 block mb-1">Sessions 6, 7 & 8: Production</strong>
                    <span><strong>I Learn & Enjoy</strong> (Games), <strong>I Learn to Write</strong> (Drafting) & <strong>I Write / Check Progress</strong> (20-word text).</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: Dedicated Year 5 Didactic Guide */}
          {refTab === 'year5' && (
            <div className="space-y-4">
              
              {/* Header Box */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-indigo-950 text-sm flex items-center">
                      <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
                      Didactic Guide of English — Primary School Year 5 (Key Stage 3)
                    </h4>
                    <p className="text-xs text-indigo-800 mt-1">
                      Ministry of National Education • National Curriculum Council (CNP 2024). Target: <strong>Elementary Level A2.1</strong> (10-11 years old).
                    </p>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-mono font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-lg">
                    42 Hours / Year
                  </span>
                </div>
              </div>

              {/* 1. The 8-Session Section Architecture (Table 4 & 5) */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center text-indigo-900">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mr-1.5" />
                  Official 8-Session Section Architecture (Table 4 & 5 • 45m Each)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 1: I Get Ready</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Presents the <strong>Initial Problem Situation</strong>, listening script, decoding a 40-word text with skimming/scanning, and an initial writing task saved in the learner’s personal portfolio.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 2: I Listen & Interact</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Warm-up, prediction from flashcards/realia, checking predictions, listening for gist and specific information, followed by the <strong>Exit Ticket</strong> formative assessment.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 3: I Listen & Discover</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Discovery of structural linguistic models, controlled oral drilling with correct SV agreement and intonation, guided substitution drills, and communicative roleplay.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 4: I Read & Understand</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Grapheme-phoneme decoding fluency, skimming for general idea, scanning for specific details (numbers, names, amenities), and oral comprehension questions.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 5: I Read & Discover</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Implicit grammar in written context, discovering sentence syntax (Word Order, Subject-Verb agreement, prepositions), sentence anagram puzzles, and controlled writing drills.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 6: I Learn & Enjoy</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Pedagogical language games: word formation suffixes, <em>"Got it!"</em> card snatching, <em>"Snap!"</em> image-word matching, Dictation Race, and Punctuation Board Relay.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 7: I Learn to Write</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      Transforming structured notes from a chart or ID form into complete sentences; cooperative small-group drafting with sentence building blocks and peer proofreading.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-indigo-800 flex items-center justify-between">
                      <span>Session 8: I Write / Check Progress</span>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">45 min</span>
                    </div>
                    <p className="text-slate-600">
                      <strong>Section 1:</strong> Individual writing of a ~20-word cohesive paragraph from a profile form, silent proofreading, self/peer assessment rubric, and class Gallery Walk.<br/>
                      <strong>Section 2:</strong> <em>I Check my Progress</em> — global evaluation on the Initial Problem Situation and portfolio comparison.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Official Year 5 Sequences (Key Stage 3 Syllabus) */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm text-indigo-900">
                  Official Year 5 Sequences & Core Linguistic Syllabus (CNP 2024)
                </h5>

                {/* Sequence 1 */}
                <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-indigo-900 text-xs sm:text-sm">Sequence 1: Jobs, Occupations & Hobbies (14 Hours)</strong>
                    <span className="text-[11px] font-semibold text-indigo-700">2 Sections • 16 Sessions + 2h Pause</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900">Section 1 (Jobs & Occupations):</span> Doctor, teacher, gendarme, electrician, manager, mechanic, surgeon. Workplace prepositions (at the hospital, in an office). Occupational suffixes (-er, -or, -ist, -ian).
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Section 2 (Hobbies):</span> Playing chess, riding a bike, swimming, taking pictures. Gerund structure: <em>like/enjoy/prefer + V-ing</em>.
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-indigo-100 text-[11px] text-indigo-900">
                    <strong>Target Phonics:</strong> Consonant contrast /ʒ/ (pleasure, television) vs /dʒ/ (judge, job, gendarme) & velar nasal /ŋ/ (playing, riding, swimming, singing). Adding/deleting phonemes.
                  </div>
                </div>

                {/* Sequence 2 */}
                <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-indigo-900 text-xs sm:text-sm">Sequence 2: Hometown / City / Village: Amenities, Directions & Signs (14 Hours)</strong>
                    <span className="text-[11px] font-semibold text-indigo-700">2 Sections • 16 Sessions + 2h Pause</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900">Section 1 (Amenities):</span> Hospital, florist’s, baker’s, butcher’s, Roman ruins, mall. Questions: <em>Is there / Are there...? Where is it?</em> Prepositions: between, opposite, next to.
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Section 2 (Directions & Signs):</span> Road, traffic lights, bridge, pedestrian crossing, corner. Imperative: <em>Go straight ahead! Turn left!</em> Modal <em>can</em> for polite requests.
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-indigo-100 text-[11px] text-indigo-900">
                    <strong>Target Phonics:</strong> Semivowel contrast /j/ (yes, you, young) vs /w/ (water, wet, when, what). Word stress in navigation commands.
                  </div>
                </div>

                {/* Sequence 3 */}
                <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-indigo-900 text-xs sm:text-sm">Sequence 3: Holidays and Travelling (14 Hours)</strong>
                    <span className="text-[11px] font-semibold text-indigo-700">2 Sections • 16 Sessions + 2h Pause</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900">Section 1 (Holidays):</span> 4 seasons, weather (sunny, snowy, cold, windy), beach, mountain, hotel, El Kala, Oran. Present continuous: <em>We are going to the beach.</em>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Section 2 (Travelling & Capstone):</span> Transport (car, plane, train, boat, on foot). Sightseeing in Ghardaia, buying souvenirs. Capstone Project: <strong>"My Booklet"</strong>.
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-indigo-100 text-[11px] text-indigo-900">
                    <strong>Target Phonics:</strong> Comprehensive phonetic and phonological revision. Prosodic intonation across multisyllabic vocabulary.
                  </div>
                </div>
              </div>

              {/* 3. Pedagogical Tools: Exit Ticket & 4-Level Rubric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-2">
                  <h6 className="font-bold text-slate-900 flex items-center text-indigo-900">
                    <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    Year 5 Exit Ticket Format (Page 85)
                  </h6>
                  <p className="text-slate-600 text-[11px]">
                    At the end of Sessions 2 & 3, each learner completes a 3-question slip:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                    <li><strong>Question 1:</strong> Write two target words or jobs you learned today.</li>
                    <li><strong>Question 2:</strong> Fill in the missing word in one sentence model.</li>
                    <li><strong>Question 3:</strong> Draw or write one question you still have.</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-2">
                  <h6 className="font-bold text-slate-900 flex items-center text-indigo-900">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                    Year 5 Writing Production Rules
                  </h6>
                  <p className="text-slate-600 text-[11px]">
                    Writing in Year 5 shifts from simple words/isolated sentences to structured paragraphs:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                    <li><strong>Input:</strong> Form chart or profile with 4 cues (e.g., Name, Job, Workplace, Hobby).</li>
                    <li><strong>Output:</strong> 15-20 words in connected cursive script.</li>
                    <li><strong>Evaluation:</strong> Relevance, Coherence, Linguistic Accuracy, Layout & Handwriting.</li>
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Handwriting Families */}
          {refTab === 'handwriting' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900">
                <strong>Pedagogical Rule:</strong> Arabic native learners are accustomed to right-to-left cursive flow. Teaching English handwriting requires explicit motor grouping by stroke mechanics rather than alphabetical order.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Family 1 */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h5 className="font-bold text-slate-900 flex items-center mb-1">
                    <PenTool className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Family 1: Downward Stroke Letters (l-family)
                  </h5>
                  <p className="text-slate-500 text-[11px] mb-2">Top-to-bottom vertical strokes with baseline hooks.</p>
                  <div className="bg-slate-100 p-2.5 rounded-lg font-mono text-sm font-bold text-slate-800 tracking-widest text-center">
                    i • j • l • t • u
                  </div>
                  <span className="block mt-2 text-[11px] text-slate-600">Uppercase forms: <strong>I, J, L, T, U</strong></span>
                </div>

                {/* Family 2 */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h5 className="font-bold text-slate-900 flex items-center mb-1">
                    <PenTool className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Family 2: Clockwise Arch Letters (r-family)
                  </h5>
                  <p className="text-slate-500 text-[11px] mb-2">Downward line then upward bounce over the arch.</p>
                  <div className="bg-slate-100 p-2.5 rounded-lg font-mono text-sm font-bold text-slate-800 tracking-widest text-center">
                    b • h • k • m • n • p • r
                  </div>
                  <span className="block mt-2 text-[11px] text-slate-600">Uppercase forms: <strong>B, H, K, M, N, P, R</strong></span>
                </div>

                {/* Family 3 */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h5 className="font-bold text-slate-900 flex items-center mb-1">
                    <PenTool className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Family 3: Anticlockwise Circular Letters (c-family)
                  </h5>
                  <p className="text-slate-500 text-[11px] mb-2">Curve left and around like the letter 'c'.</p>
                  <div className="bg-slate-100 p-2.5 rounded-lg font-mono text-sm font-bold text-slate-800 tracking-widest text-center">
                    c • a • d • e • g • o • q • f • s
                  </div>
                  <span className="block mt-2 text-[11px] text-slate-600">Uppercase forms: <strong>C, A, D, E, G, O, Q, F, S</strong></span>
                </div>

                {/* Family 4 */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <h5 className="font-bold text-slate-900 flex items-center mb-1">
                    <PenTool className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Family 4: Diagonal & Zigzag Letters
                  </h5>
                  <p className="text-slate-500 text-[11px] mb-2">Diagonal directional pencil strokes and points.</p>
                  <div className="bg-slate-100 p-2.5 rounded-lg font-mono text-sm font-bold text-slate-800 tracking-widest text-center">
                    v • w • x • y • z
                  </div>
                  <span className="block mt-2 text-[11px] text-slate-600">Uppercase forms: <strong>V, W, X, Y, Z</strong></span>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Exit Profile & Competences */}
          {refTab === 'profile' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h4 className="font-bold text-slate-900 text-sm mb-2">National Exit Profile (Primary Cycle)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  By the end of primary school education, the learner will be able to understand and interact orally, read short phonetic and illustrated texts, and produce short structured sentences and messages in English within familiar contexts (family, school, environment, food, hobbies, animals, professions).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <strong className="text-emerald-700 block mb-1">1. Intellectual Competence:</strong>
                  <span>Analyze visual cues, match auditory sounds with symbols, decode simple syntax patterns, and infer relationship logic.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <strong className="text-emerald-700 block mb-1">2. Methodological Competence:</strong>
                  <span>Use graphic organizers, follow step-by-step instructions, organize weekly timetables, and apply self-correction routines.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <strong className="text-emerald-700 block mb-1">3. Communicative Competence:</strong>
                  <span>Express personal needs, ask and answer everyday questions politely, engage in pair dialogues, and read aloud with proper intonation.</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <strong className="text-emerald-700 block mb-1">4. Personal & Social Competence:</strong>
                  <span>Demonstrate pride in Algerian national heritage, exhibit good manners, collaborate generously in team games, and show empathy.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Assessment Pauses & Rubrics */}
          {refTab === 'pauses' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900">
                <strong>Didactic Assessment Strategy:</strong> Evaluates mastery across 4 standardized mastery tiers (Full, Acceptable, Partial, Minimum) following CNP criteria.
              </div>

              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="border border-slate-300 p-2 font-bold">Mastery Level</th>
                    <th className="border border-slate-300 p-2 font-bold">Performance Indicator</th>
                    <th className="border border-slate-300 p-2 font-bold">Pedagogical Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold text-emerald-700">Full Mastery (+++)</td>
                    <td className="border border-slate-300 p-2">Executes task independently, fluently, with accurate phonology/orthography.</td>
                    <td className="border border-slate-300 p-2">Extension tasks & peer coaching.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold text-teal-700">Acceptable Mastery (++)</td>
                    <td className="border border-slate-300 p-2">Satisfies key criteria with minor hesitations or phonetic approximations.</td>
                    <td className="border border-slate-300 p-2">Standard consolidation practice.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold text-amber-700">Partial Mastery (+)</td>
                    <td className="border border-slate-300 p-2">Needs teacher scaffolding or visual cues to produce words/strokes.</td>
                    <td className="border border-slate-300 p-2">Targeted Tier 2 remedial support.</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-bold text-rose-700">Minimum Mastery (-)</td>
                    <td className="border border-slate-300 p-2">Unable to complete task or responds purely non-verbally with confusion.</td>
                    <td className="border border-slate-300 p-2">Tier 3 intensive 1-on-1 multisensory intervention.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: SLA Pedagogy & VAKT */}
          {refTab === 'sla' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Action-Oriented SLA Pedagogy (Kersten & Rohde / Lund Univ)</h4>
                <p className="text-slate-700">
                  Young learners acquire second languages most naturally when instruction engages all four sensory channels (**Head, Heart & Hand**):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Visual (V):</strong>
                    <span>Realia, oversized illustrated flashcards, character masks, gesture modeling, color-coded phoneme charts.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Auditory (A):</strong>
                    <span>Chants, clapping rhymes, rhythmic prosodic intonation, choral and group row drilling, teacher motherese.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Kinesthetic (K):</strong>
                    <span>Total Physical Response (TPR), jumping to corners, mime dialogues, board race competitions, dancing songs.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <strong className="text-emerald-700 block mb-1">Tactile (T):</strong>
                    <span>Felt finger puppets, air and textured card tracing, drawing family trees, folding mini dictionaries.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 italic">
            "Created by Teacher Benaichouba Mohamed A."
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Reference Guide
          </button>
        </div>

      </div>
    </div>
  );
};
