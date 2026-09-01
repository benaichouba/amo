import { LessonPlan, DidacticAuditReport, DidacticAuditIssue } from '../types';

export function auditLessonPlan(plan: LessonPlan): DidacticAuditReport {
  const issues: DidacticAuditIssue[] = [];
  const strengths: string[] = [];
  const suggestions: string[] = [];

  // 1. TIMING AUDIT
  const targetDuration = plan.totalDurationMinutes || 45;
  const stagesSum = plan.stages.reduce((acc, stage) => acc + (Number(stage.timeMinutes) || 0), 0);
  const timingMatches = stagesSum === targetDuration;

  if (!timingMatches) {
    const diff = stagesSum - targetDuration;
    issues.push({
      id: 'timing-mismatch',
      severity: 'error',
      category: 'timing',
      title: 'Session Duration Mismatch',
      message: `The sum of stage durations (${stagesSum} min) does not match the official session target (${targetDuration} min). Discrepancy: ${diff > 0 ? `+${diff}` : diff} min.`,
      recommendation: `Adjust stage durations so they sum to exactly ${targetDuration} minutes. In Algerian Primary education, typical distributions are: Warmer (5-10m), Installation (12-15m), Practice/Game (12-15m), Evaluation/Wrap-up (5-8m).`,
      canAutoFix: true,
      autoFixLabel: `Auto-Balance Stages to ${targetDuration} min`,
      autoFixAction: 'rebalance_timing'
    });
  } else {
    strengths.push(`Timing is mathematically balanced to exactly ${targetDuration} minutes across ${plan.stages.length} instructional stages.`);
  }

  // Check Warmer duration (should not exceed 10m in 45m lesson)
  const warmerStage = plan.stages.find(s => 
    s.stageName.toLowerCase().includes('warmer') || 
    s.stageName.toLowerCase().includes('sing') || 
    s.stageName.toLowerCase().includes('fun')
  );
  if (warmerStage && warmerStage.timeMinutes > 10 && targetDuration <= 45) {
    issues.push({
      id: 'warmer-too-long',
      severity: 'warning',
      category: 'timing',
      title: 'Warmer Stage Exceeds Recommended Limit',
      message: `The warmer "${warmerStage.stageName}" is allocated ${warmerStage.timeMinutes} minutes. Primary pupils have a short attention span.`,
      recommendation: 'Cap the warmer at 5 to 10 minutes to preserve sufficient instructional time for resource installation and communicative practice.',
      canAutoFix: true,
      autoFixLabel: 'Cap Warmer at 8 minutes',
      autoFixAction: 'cap_warmer'
    });
  }

  // 2. BLOOM'S TAXONOMY & MEASURABLE OBJECTIVES AUDIT
  const passiveVerbs = ['understand', 'know', 'learn', 'appreciate', 'be familiar with', 'be aware of'];
  const activeVerbsFound: string[] = [];
  const problematicObjectives: string[] = [];

  plan.sessionObjectives.forEach((obj, idx) => {
    const lower = obj.toLowerCase();
    const hasPassive = passiveVerbs.some(v => lower.includes(v));
    if (hasPassive) {
      problematicObjectives.push(`Objective #${idx + 1}: "${obj}"`);
    } else {
      activeVerbsFound.push(obj.split(' ')[0]);
    }
  });

  if (problematicObjectives.length > 0) {
    issues.push({
      id: 'bloom-passive-verbs',
      severity: 'warning',
      category: 'bloom_verbs',
      title: 'Non-Measurable Verbs in Session Outcomes',
      message: `Pedagogical inspectors require measurable, observable behavioral verbs. The following objectives contain passive phrasing: ${problematicObjectives.join(', ')}.`,
      recommendation: 'Replace passive verbs ("understand", "know") with concrete observable performance verbs: "identify", "pronounce", "match", "discriminate", "trace", "mime", "construct".',
      canAutoFix: true,
      autoFixLabel: 'Upgrade to Observable Bloom Action Verbs',
      autoFixAction: 'upgrade_bloom_verbs'
    });
  } else {
    strengths.push('All session outcomes use measurable, observable action verbs aligned with competency-based inspection standards.');
  }

  // 3. PRIMARY METHODOLOGY & ORAL-TO-WRITTEN PROGRESSION
  const is3PSor4PS = plan.gradeYear?.includes('3PS') || plan.gradeYear?.includes('4PS') || plan.gradeYear?.includes('Year 3') || plan.gradeYear?.includes('Year 4');
  
  if (is3PSor4PS) {
    // Check Oral First principle
    const hasListeningOrSinging = plan.stages.some(s => 
      s.stageName.toLowerCase().includes('listen') || 
      s.stageName.toLowerCase().includes('sing') || 
      s.stageName.toLowerCase().includes('oral') ||
      s.stageName.toLowerCase().includes('fun')
    );

    if (!hasListeningOrSinging) {
      issues.push({
        id: 'oral-first-missing',
        severity: 'error',
        category: 'oral_written',
        title: 'Oral-First Pedagogical Phase Missing',
        message: 'Algerian Didactic Guides strictly mandate an oral-aural foundation (I Sing and Have Fun / I Listen and Repeat) before introducing reading or writing.',
        recommendation: 'Ensure the session opens with auditory-vocal exposure (rhythmic songs, TPR chants, spoken teacher modeling).',
        canAutoFix: true,
        autoFixLabel: 'Insert Oral Nursery / Chant Warmer',
        autoFixAction: 'insert_oral_warmer'
      });
    } else {
      strengths.push('Session adheres to the National Didactic Oral-First principle (Listening -> Speaking -> Reading -> Writing).');
    }

    // Check Phonics & Letter strokes
    if (plan.linguisticResources?.phonicsSounds?.length === 0) {
      issues.push({
        id: 'phonics-missing',
        severity: 'warning',
        category: 'phonics_handwriting',
        title: 'No Explicit Phonics Focus Defined',
        message: 'Primary English didactic plans must isolate target phonemes (e.g. /i/ vs /i:/, /f/, /m/, /s/).',
        recommendation: 'Define target phonemes and sound-spelling patterns in the linguistic resources section.',
        canAutoFix: true,
        autoFixLabel: 'Add Target Phonics Discrimination',
        autoFixAction: 'add_phonics'
      });
    } else {
      strengths.push(`Explicit phonemic awareness target defined: ${plan.linguisticResources.phonicsSounds.join(', ')}`);
    }

    // Check L1 Left-to-Right orientation reminder
    const hasL1Note = plan.classProfile?.l1LiteracyNotes && plan.classProfile.l1LiteracyNotes.length > 10;
    if (!hasL1Note) {
      issues.push({
        id: 'l1-orientation-missing',
        severity: 'info',
        category: 'phonics_handwriting',
        title: 'Left-to-Right Literacy Directionality Note Recommended',
        message: 'Since primary pupils are accustomed to Right-to-Left script in home literacy, didactic sheets should highlight explicit orientation cues (anticlockwise strokes, left-to-right margins).',
        recommendation: 'Include a note on L1-to-L2 script transfer and anticlockwise/downward letter families.',
        canAutoFix: true,
        autoFixLabel: 'Add L1 Left-to-Right Orientation Note',
        autoFixAction: 'add_l1_note'
      });
    }
  }

  // 4. VAKT MULTI-SENSORY SLA DIFFERENTIATION
  const vakt = plan.differentiatedInstruction?.vaktStrategies;
  if (!vakt || !vakt.visual || !vakt.auditory || !vakt.kinesthetic || !vakt.tactile) {
    issues.push({
      id: 'vakt-incomplete',
      severity: 'warning',
      category: 'differentiation',
      title: 'Incomplete VAKT Multi-Sensory Differentiation',
      message: 'Multisensory Second Language Acquisition (SLA) requires Visual, Auditory, Kinesthetic, and Tactile strategies.',
      recommendation: 'Ensure tactile and kinesthetic strategies (slates, flashcard pointing, body movements) are explicitly populated.',
      canAutoFix: true,
      autoFixLabel: 'Complete 4-Pillar VAKT SLA Profile',
      autoFixAction: 'complete_vakt'
    });
  } else {
    strengths.push('Comprehensive VAKT multi-sensory strategies defined across Visual, Auditory, Kinesthetic, and Tactile channels.');
  }

  // 5. EVALUATION GRID AUDIT
  if (!plan.evaluationGrid || plan.evaluationGrid.length === 0) {
    issues.push({
      id: 'rubric-missing',
      severity: 'error',
      category: 'rubric',
      title: '4-Level Evaluation Rubric Missing',
      message: 'Official Algerian inspection sheets require a 4-level competency evaluation rubric (Full, Acceptable, Partial, Minimum Mastery).',
      recommendation: 'Add the 4-level evaluation grid aligned with CNP criteria.',
      canAutoFix: true,
      autoFixLabel: 'Generate CNP 4-Level Evaluation Grid',
      autoFixAction: 'generate_rubric'
    });
  } else {
    const incompleteCriteria = plan.evaluationGrid.filter(
      c => !c.fullMastery || !c.acceptableMastery || !c.partialMastery || !c.minimumMastery
    );
    if (incompleteCriteria.length > 0) {
      issues.push({
        id: 'rubric-incomplete',
        severity: 'warning',
        category: 'rubric',
        title: 'Evaluation Criteria Incomplete',
        message: `${incompleteCriteria.length} evaluation criteria have missing performance descriptors.`,
        recommendation: 'Complete descriptors for all 4 mastery levels.',
        canAutoFix: true,
        autoFixLabel: 'Auto-Complete Mastery Descriptors',
        autoFixAction: 'complete_rubric_descriptors'
      });
    } else {
      strengths.push(`4-Level CNP evaluation rubric complete with ${plan.evaluationGrid.length} detailed competency criteria.`);
    }
  }

  // 6. VALUES & CITIZENSHIP AUDIT
  if (!plan.valuesAndCitizenship || plan.valuesAndCitizenship.length === 0) {
    issues.push({
      id: 'values-missing',
      severity: 'info',
      category: 'values',
      title: 'National Identity & Values Section Empty',
      message: 'National curriculum guidelines require integrating civic values (solidarity, Algerian cultural identity, mutual respect).',
      recommendation: 'Add explicit values and citizenship connections for this sequence.',
      canAutoFix: true,
      autoFixLabel: 'Add National Identity & Civic Values',
      autoFixAction: 'add_values'
    });
  } else {
    strengths.push(`Civic & National Identity values integrated: ${plan.valuesAndCitizenship.join(', ')}`);
  }

  // 7. DIDACTIC SUGGESTIONS FOR FURTHER ENHANCEMENT
  suggestions.push('💡 Add an "Exit Ticket" (5-minute quick formative check) where pupils show slates or point to a flashcard before dismissal.');
  suggestions.push('💡 Incorporate a "Teacher Motherese" recast technique: when a learner makes a pronunciation error, repeat the correct model naturally without interrupting fluency.');
  suggestions.push('💡 For fast-finishers, prepare a mini pair-dialogue challenge card to maintain active cognitive engagement.');
  suggestions.push('💡 Utilize choral drilling in 3 tiers: Whole Class → Group Rows → Individual Echo to build shy learner confidence.');

  // Calculate Overall Score (0 to 100)
  let score = 100;
  issues.forEach(issue => {
    if (issue.severity === 'error') score -= 20;
    else if (issue.severity === 'warning') score -= 10;
    else if (issue.severity === 'info') score -= 3;
  });
  score = Math.max(20, Math.min(100, score));

  let complianceGrade: DidacticAuditReport['complianceGrade'] = 'A+';
  if (score >= 95) complianceGrade = 'A+';
  else if (score >= 85) complianceGrade = 'A';
  else if (score >= 75) complianceGrade = 'B+';
  else if (score >= 65) complianceGrade = 'B';
  else complianceGrade = 'Needs Review';

  return {
    overallScore: score,
    complianceGrade,
    totalDurationMinutes: targetDuration,
    calculatedStagesSum: stagesSum,
    timingMatches,
    issues,
    strengths,
    suggestions,
    inspectedAt: new Date().toISOString()
  };
}

export function applyAuditAutoFix(plan: LessonPlan, autoFixAction: string): LessonPlan {
  const updated: LessonPlan = JSON.parse(JSON.stringify(plan));
  const targetDuration = updated.totalDurationMinutes || 45;

  switch (autoFixAction) {
    case 'rebalance_timing': {
      // Rebalance stages to equal targetDuration
      const stagesCount = updated.stages.length;
      if (stagesCount === 4) {
        if (targetDuration === 45) {
          updated.stages[0].timeMinutes = 8;  // Warmer
          updated.stages[1].timeMinutes = 14; // Install
          updated.stages[2].timeMinutes = 15; // Practice
          updated.stages[3].timeMinutes = 8;  // Wrap-up / Exit
        } else if (targetDuration === 60) {
          updated.stages[0].timeMinutes = 10;
          updated.stages[1].timeMinutes = 18;
          updated.stages[2].timeMinutes = 20;
          updated.stages[3].timeMinutes = 12;
        }
      } else if (stagesCount > 0) {
        const base = Math.floor(targetDuration / stagesCount);
        const rem = targetDuration % stagesCount;
        updated.stages.forEach((s, idx) => {
          s.timeMinutes = base + (idx === 0 ? rem : 0);
        });
      }
      break;
    }

    case 'cap_warmer': {
      const warmer = updated.stages.find(s => 
        s.stageName.toLowerCase().includes('warmer') || 
        s.stageName.toLowerCase().includes('sing') || 
        s.stageName.toLowerCase().includes('fun')
      );
      if (warmer && warmer.timeMinutes > 8) {
        const excess = warmer.timeMinutes - 8;
        warmer.timeMinutes = 8;
        // give excess to practice stage
        const practice = updated.stages.find(s => 
          s.stageName.toLowerCase().includes('practice') || 
          s.stageName.toLowerCase().includes('game') || 
          s.stageName.toLowerCase().includes('role')
        ) || updated.stages[1];
        if (practice) {
          practice.timeMinutes += excess;
        }
      }
      break;
    }

    case 'upgrade_bloom_verbs': {
      updated.sessionObjectives = updated.sessionObjectives.map(obj => {
        let text = obj;
        text = text.replace(/understand/gi, 'Identify and demonstrate comprehension of');
        text = text.replace(/know/gi, 'Recognize and name');
        text = text.replace(/learn/gi, 'Produce and articulate');
        text = text.replace(/be familiar with/gi, 'Discriminate and use');
        text = text.replace(/be aware of/gi, 'Differentiate');
        return text;
      });
      break;
    }

    case 'insert_oral_warmer': {
      updated.stages.unshift({
        stageName: '1. Warmer • I Sing & Have Fun (Aural-Oral Warm-up)',
        timeMinutes: 8,
        teacherRole: 'Plays rhythmic nursery chant with TPR hand gestures. Uses exaggerated lip-rounding and cheerful tone.',
        learnerActivity: 'Learners stand, imitate hand motions, and join in with call-and-response chorus.',
        interactionPattern: 'T-C (Whole Class)',
        teachingMaterials: ['Audio chant track', 'Realia puppets', 'Flashcards'],
        phonemicPhonicsFocus: 'Auditory pitch discrimination and prosodic rhythm'
      });
      // Re-adjust total duration
      const total = updated.stages.reduce((acc, s) => acc + s.timeMinutes, 0);
      if (total > targetDuration) {
        const excess = total - targetDuration;
        if (updated.stages[2]) updated.stages[2].timeMinutes = Math.max(5, updated.stages[2].timeMinutes - excess);
      }
      break;
    }

    case 'add_phonics': {
      if (!updated.linguisticResources.phonicsSounds || updated.linguisticResources.phonicsSounds.length === 0) {
        updated.linguisticResources.phonicsSounds = [
          '/i/ as in sister vs /i:/ as in teacher',
          '/f/ initial fricative as in father',
          '/m/ bilabial nasal as in mother'
        ];
      }
      break;
    }

    case 'add_l1_note': {
      if (!updated.classProfile.l1LiteracyNotes) {
        updated.classProfile.l1LiteracyNotes = 
          'Learners write Right-to-Left in home literacy. Requires explicit orientation support for English Left-to-Right margins, top-to-bottom stroke order, and anticlockwise letter family formation.';
      }
      break;
    }

    case 'complete_vakt': {
      updated.differentiatedInstruction.vaktStrategies = {
        visual: 'Oversized pictorial flashcards, color-coded word cards, and visual storyboard posters.',
        auditory: 'Rhythmic call-and-response clapping, choral echo repetition, and audio song tracks.',
        kinesthetic: 'Total Physical Response (TPR) body movements, classroom corner pointing games, and roleplay drama.',
        tactile: 'Individual slate chalk writing, plasticine 3D letter molding, and textured sandpaper tracing cards.'
      };
      break;
    }

    case 'generate_rubric': {
      updated.evaluationGrid = [
        {
          domain: 'Oral Comprehension',
          criterion: 'Identifies target vocabulary when heard in short spoken utterances',
          fullMastery: 'Correctly identifies and points to all 6 target items immediately without hesitation.',
          acceptableMastery: 'Identifies 4-5 items with minor delay or 1 teacher repetition.',
          partialMastery: 'Identifies 2-3 items with visual prompt support.',
          minimumMastery: 'Identifies 1 item or requires peer prompting.'
        },
        {
          domain: 'Oral Production',
          criterion: 'Articulates formulaic chunks and words with intelligible pronunciation',
          fullMastery: 'Articulates words accurately with correct stress and initial phoneme isolation.',
          acceptableMastery: 'Articulates with minor phonetic approximation (recasts accepted).',
          partialMastery: 'Pronounces isolated single words with heavy hesitation.',
          minimumMastery: 'Mimics gesture without clear verbal articulation.'
        },
        {
          domain: 'Social & Communicative',
          criterion: 'Demonstrates polite turn-taking and active listening during pair games',
          fullMastery: 'Consistently respects peer speaking turns and shows enthusiasm.',
          acceptableMastery: 'Participates politely with occasional reminder.',
          partialMastery: 'Needs teacher intervention to share materials or wait for turn.',
          minimumMastery: 'Reluctant to participate in interactive pair work.'
        }
      ];
      break;
    }

    case 'add_values': {
      updated.valuesAndCitizenship = [
        'National Identity: Pride in Algerian cultural heritage, hospitality, and civic unity',
        'Social Bonding: Respect for parents, elders, and cooperative solidarity among peers',
        'Global Citizenship: Openness to learning international languages and cultural respect'
      ];
      break;
    }

    default:
      break;
  }

  return updated;
}
