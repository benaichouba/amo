import { DidacticPreset, DidacticYear } from '../types';

export interface CurriculumSequence {
  sequenceNumber: number;
  sequenceTitle: string;
  sections: {
    sectionNumber: number;
    sectionTitle: string;
    presetId: string;
    defaultObjectives: string[];
    defaultVocabulary: string[];
    defaultGrammar: string[];
    phonics: string;
    handwritingFamily: string;
    values: string[];
  }[];
}

// ==========================================
// 3PS (3rd Primary School) Official Curriculum
// ==========================================
export const DIDACTIC_GUIDE_3PS_PRESETS: DidacticPreset[] = [
  {
    id: '3ps-seq1-sec1',
    year: '3PS',
    sequenceNumber: 1,
    sequenceTitle: 'Family & Friends',
    sectionNumber: 1,
    sectionTitle: 'Family',
    sessionType: 'Full Sequence',
    sessionName: 'Introducing Family Members & Kinship Terms',
    communicativeObjectives: [
      'Introduce family members (father, mother, brother, sister, grandfather, grandmother)',
      'Ask and answer questions about family members: "Who is this? - This is my father."',
      'Recognize simple kinship words in familiar context using phonemic awareness',
      'Act a scene out with family finger puppets or family photos'
    ],
    vocabulary: ['parents', 'father', 'dad', 'mother', 'mum', 'brother', 'sister', 'grandfather', 'grandmother', 'family', 'baby'],
    grammar: ['Present simple: to be (I am, He is, She is)', 'Demonstrative: This is my...', 'Wh-questions: Who is it? What’s his/her name?'],
    phonics: 'Auditory isolation of initial /f/ (father, family) and /m/ (mother, mum). Short vowel /i/ (sister).',
    handwritingFamily: 'Family 1: Downward stroke letters (i, j, l, t, u) - Print lowercase on baseline',
    suggestedSituation: '- Who is it? - It’s my father. - What’s his name? - His name is Omar.',
    values: ['Pride in Algerian family & identity', 'Filial respect towards parents & elders', 'Attentive listening habits'],
    crossCurricular: {
      intellectual: 'Discover relationship between context, visual family photos, and oral words.',
      methodological: 'Exploit auditory cues and decoding strategies to read and interact orally.',
      communicative: 'React to verbal and non-verbal messages, select appropriate kinship terms.',
      personalSocial: 'Respond respectfully to oral messages and value peers’ drawings.'
    }
  },
  {
    id: '3ps-seq1-sec2',
    year: '3PS',
    sequenceNumber: 1,
    sequenceTitle: 'Family & Friends',
    sectionNumber: 2,
    sectionTitle: 'Friends & Greetings',
    sessionType: 'Full Sequence',
    sessionName: 'Greetings, Self-Introduction & Age (Numbers 0-10)',
    communicativeObjectives: [
      'Greet people and take leave (Hello, Hi, Good morning, Goodbye)',
      'Introduce oneself (name, age, language, and town of residence)',
      'Introduce a friend and ask peer questions: "How old are you? - I am 8."',
      'Count and recognize numbers from 0 to 10 in oral and written form'
    ],
    vocabulary: ['friend', 'mate', 'numbers (0-10): zero, one, two, three, four, five, six, seven, eight, nine, ten', 'live', 'speak', 'English', 'National Language'],
    grammar: ['Present simple: to be (I am), to live (I live in...)', 'Wh-questions: What’s your name? How old are you? Where do you live?'],
    phonics: 'Short vowel sound /i/ in "six", "in", "live". CVC word decoding.',
    handwritingFamily: 'Family 1: Print UPPERCASE (I, J, L, T, U) and capital personal pronoun "I"',
    suggestedSituation: '- Hello, my name’s Ali. I am 8. I live in Algiers. - What’s your name? - I’m Lina, I’m 8.',
    values: ['Openness to friendship, polite greetings, classroom camaraderie'],
    crossCurricular: {
      intellectual: 'Understand symbol decoding strategies and numerical concepts (0-10).',
      methodological: 'Use context and paralinguistic cues to identify meanings.',
      communicative: 'Formulate polite self-introduction and interview peers.',
      personalSocial: 'Collaborate in pairs and appreciate classmate responses.'
    }
  },
  {
    id: '3ps-seq2-sec1',
    year: '3PS',
    sequenceNumber: 2,
    sequenceTitle: 'School',
    sectionNumber: 1,
    sectionTitle: 'School Objects & Colours',
    sessionType: 'Full Sequence',
    sessionName: 'Classroom Stationery & Primary Colours',
    communicativeObjectives: [
      'Name classroom objects (schoolbag, book, chair, eraser, pencil, crayon, pen, table, board)',
      'Name and match primary and secondary colours (red, blue, green, yellow, black, white, brown)',
      'Locate classroom objects with prepositions: in, on, under',
      'Ask and answer: "What’s this? - It’s a blue pencil."'
    ],
    vocabulary: ['school', 'bag', 'book', 'chair', 'eraser', 'pencil', 'crayon', 'pen', 'table', 'board', 'ruler', 'sharpener', 'black', 'white', 'blue', 'green', 'red', 'yellow', 'brown'],
    grammar: ['Demonstrative pronoun: this, that', 'Indefinite articles: a / an (a pen, an eraser)', 'Wh-questions: What’s this? What colour is it? Where is...?'],
    phonics: 'Initial sound isolation (/b/ bag, /p/ pen, /r/ red). Phonic discrimination between /p/ and /b/.',
    handwritingFamily: 'Family 2: Clockwise arch letters (b, h, k, m, n, p, r) - Print lowercase',
    suggestedSituation: '- What’s this? - It’s a red pencil. - Where is it? - It’s on the table.',
    values: ['Care for educational materials, sharing stationery politely in class'],
    crossCurricular: {
      intellectual: 'Classify items by category (objects vs colours) and spatial position.',
      methodological: 'Implement left-to-right stroke formation for clockwise letters.',
      communicative: 'Name items clearly using correct indefinite articles.',
      personalSocial: 'Demonstrate classroom manners and turn-taking.'
    }
  },
  {
    id: '3ps-seq2-sec2',
    year: '3PS',
    sequenceNumber: 2,
    sequenceTitle: 'School',
    sectionNumber: 2,
    sectionTitle: 'School Subjects & Days of the Week',
    sessionType: 'Full Sequence',
    sessionName: 'Weekly Timetable, Academic Disciplines & Routine',
    communicativeObjectives: [
      'Name school subjects (National Language, English, Maths, Science, Civic Education, Art, Sport)',
      'Recite and read the 7 days of the week in chronological order',
      'Ask and answer questions about weekly timetable: "When do you have English? - On Sunday."',
      'Express favorite school subjects: "My favorite subject is Art."'
    ],
    vocabulary: ['National Language', 'English', 'Maths', 'Science', 'Civic Education', 'Art', 'Sport', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    grammar: ['Preposition of time: on (on Monday, on Wednesday)', 'Wh-questions: When do you have...? What’s your favourite subject?'],
    phonics: 'Short vowel sound /ʌ/ spelt "u" in "under", "number", "Sunday". Capitalization of days of the week.',
    handwritingFamily: 'Family 2: Print UPPERCASE (B, H, K, M, N, P, R) - Days of the week capitalization',
    suggestedSituation: '- When do you have English? - I have English on Sunday and Tuesday.',
    values: ['Love of learning and academic curiosity, punctuality and schedule discipline'],
    crossCurricular: {
      intellectual: 'Read and interpret tabular scheduling information.',
      methodological: 'Organize weekly routine using visual timetables.',
      communicative: 'Express schedule preferences with clarity.',
      personalSocial: 'Respect peer schedule differences and classroom routines.'
    }
  },
  {
    id: '3ps-seq3-sec1',
    year: '3PS',
    sequenceNumber: 3,
    sequenceTitle: 'Home',
    sectionNumber: 1,
    sectionTitle: 'Describing a House & Rooms',
    sessionType: 'Full Sequence',
    sessionName: 'Rooms in a House or Flat (Spatial Layout)',
    communicativeObjectives: [
      'Name rooms in a home (living room, bedroom, kitchen, bathroom, dining room, toilet, garden)',
      'Describe a house layout using "There is..." and "There are..."',
      'Ask and answer questions about housing: "Is there a garden? - Yes, there is."'
    ],
    vocabulary: ['home', 'house', 'flat', 'bedroom', 'kitchen', 'living room', 'dining room', 'bathroom', 'toilet', 'garden', 'balcony', 'door', 'window'],
    grammar: ['Existential structures: There is a... / There are...', 'Interrogative: Is there a...? Yes, there is / No, there isn’t'],
    phonics: 'Consonant blend discrimination: /k/ kitchen, /b/ bedroom, /l/ living room.',
    handwritingFamily: 'Family 2: Print lowercase (n, p, r) & ascending stroke discipline',
    suggestedSituation: '- In my house, there is a kitchen and there are two bedrooms. - Is there a garden? - Yes, there is.',
    values: ['Appreciation of home and family sanctuary, cleanliness in living spaces'],
    crossCurricular: {
      intellectual: 'Map 2D floor plans to real spatial domestic environments.',
      methodological: 'Use singular vs plural quantity structures accurately.',
      communicative: 'Describe domestic environments with spatial clarity.',
      personalSocial: 'Respect diverse family housing types.'
    }
  },
  {
    id: '3ps-seq3-sec2',
    year: '3PS',
    sequenceNumber: 3,
    sequenceTitle: 'Home',
    sectionNumber: 2,
    sectionTitle: 'Furniture & Household Items',
    sessionType: 'Full Sequence',
    sessionName: 'Home Furniture & Item Locations',
    communicativeObjectives: [
      'Name household furniture (bed, sofa, table, fridge, cooker, wardrobe, lamp, TV)',
      'Locate furniture in rooms using spatial prepositions: in, on, next to, under',
      'Draw and label a simple bedroom floorplan'
    ],
    vocabulary: ['bed', 'sofa', 'fridge', 'cooker', 'wardrobe', 'lamp', 'TV', 'mirror', 'rug', 'carpet', 'next to', 'between'],
    grammar: ['Prepositions of location: next to, between, in front of', 'Where is the sofa? It is in the living room.'],
    phonics: 'Short vowel sound /e/ in "bed", "red", "next". Initial /f/ in "fridge".',
    handwritingFamily: 'Family 3: Anticlockwise circular letters (c, a, d, e, g) - Print lowercase',
    suggestedSituation: '- Where is the lamp? - The lamp is next to the bed.',
    values: ['Keeping household items tidy, domestic cooperation and helping parents'],
    crossCurricular: {
      intellectual: 'Spatial mapping and furniture arrangement logic.',
      methodological: 'Label diagrams with correct spelling.',
      communicative: 'Formulate accurate spatial statements.',
      personalSocial: 'Help maintain family order.'
    }
  },
  {
    id: '3ps-seq4-sec1',
    year: '3PS',
    sequenceNumber: 4,
    sequenceTitle: 'Playtime',
    sectionNumber: 1,
    sectionTitle: 'Toys & Preferences',
    sessionType: 'Full Sequence',
    sessionName: 'Naming Toys & Expressing Possession',
    communicativeObjectives: [
      'Name different toys (ball, bike, doll, robot, kite, train, car, teddy bear, computer game)',
      'Ask and answer questions about toy possession: "Have you got a bike? - Yes, I have."',
      'Express toy preferences: "I like my red car. It is fast."'
    ],
    vocabulary: ['ball', 'bike', 'car', 'doll', 'kite', 'robot', 'computer', 'train', 'teddy bear', 'plane', 'puzzle', 'big', 'small', 'fast'],
    grammar: ['Have you got a...? / I have got (I’ve got) a...', 'Yes, I have / No, I haven’t', 'Adjectives before nouns: a red bike, a fast train'],
    phonics: 'Short vowel sound /æ/ in "bag", "cat", "black". Consonant /b/ in "bike", "ball".',
    handwritingFamily: 'Family 3: Anticlockwise letters (c, a, d, e, g) - Print lowercase',
    suggestedSituation: '- Have you got a robot? - Yes, I have got a blue robot. Look, it’s fast!',
    values: ['Fair play, sharing toys, taking turns in pair games'],
    crossCurricular: {
      intellectual: 'Categorize toys by mechanical, digital, and outdoor types.',
      methodological: 'Apply anticlockwise circular pencil strokes.',
      communicative: 'Express possession and polite borrowing requests.',
      personalSocial: 'Cooperative play and empathy with peers.'
    }
  },
  {
    id: '3ps-seq4-sec2',
    year: '3PS',
    sequenceNumber: 4,
    sequenceTitle: 'Playtime',
    sectionNumber: 2,
    sectionTitle: 'Games & Numbers (11-20)',
    sessionType: 'Full Sequence',
    sessionName: 'Counting Toys, Board Games & Plural Suffixes',
    communicativeObjectives: [
      'Count items from 11 to 20 (eleven, twelve, thirteen, fourteen, fifteen...)',
      'Identify regular plural nouns with suffix -s (three cars, five balls)',
      'Participate in classroom counting games and board races'
    ],
    vocabulary: ['numbers 11-20: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty', 'board game', 'dice', 'cards'],
    grammar: ['Plural noun endings: noun + -s', 'How many toys have you got? I have got three cars.'],
    phonics: 'Plural endings phonetic realization: /s/ in "kites", /z/ in "cars", /ɪz/ in "boxes".',
    handwritingFamily: 'Family 3: Anticlockwise letters (o, q, f, s) & print numbers 11-20',
    suggestedSituation: '- How many balls have you got? - I have got twelve balls.',
    values: ['Honesty in gameplay, celebratory sportsmanship'],
    crossCurricular: {
      intellectual: 'Numerical reasoning and pluralization grammar rules.',
      methodological: 'Count and tally items visually.',
      communicative: 'Announce game scores and quantities.',
      personalSocial: 'Positive sportsmanship.'
    }
  },
  {
    id: '3ps-seq5-sec1',
    year: '3PS',
    sequenceNumber: 5,
    sequenceTitle: 'Pets',
    sectionNumber: 1,
    sectionTitle: 'Pets & Pet Care',
    sessionType: 'Full Sequence',
    sessionName: 'Identifying Domestic Pets & Physical Characteristics',
    communicativeObjectives: [
      'Name domestic pets (cat, dog, canary, chick, rabbit, goldfish, kitten, puppy)',
      'Describe simple pet physical traits (tail, fur, feathers, fin, bill, ears)',
      'Ask and answer: "Has it got a long tail? - Yes, it has."'
    ],
    vocabulary: ['pet', 'cat', 'dog', 'canary', 'chick', 'rabbit', 'goldfish', 'tail', 'feather', 'fin', 'fur', 'bill', 'ears', 'big', 'small', 'long', 'short'],
    grammar: ['It has got (It’s got) a...', 'Has it got...? Yes, it has / No, it hasn’t', 'Adjectives: big, small, long, short, soft'],
    phonics: 'Short vowel sound /ɒ/ spelt "o" in "on", "dog", "frog". Initial /k/ in "cat", "canary".',
    handwritingFamily: 'Family 3: Anticlockwise letters (c, a, d, e, g, o, q, f, s) and UPPERCASE (C, A, D, E, G, O, Q, F, S)',
    suggestedSituation: '- Have you got a pet? - Yes, I have a canary. It is yellow and has small feathers.',
    values: ['Kindness to animals, responsibility in feeding and caring for domestic pets'],
    crossCurricular: {
      intellectual: 'Classify animals by anatomical characteristics (fur, feathers, scales).',
      methodological: 'Formulate descriptive statements combining adjectives and body parts.',
      communicative: 'Participate in oral pet presentation.',
      personalSocial: 'Demonstrate animal welfare awareness.'
    }
  },
  {
    id: '3ps-seq5-sec2',
    year: '3PS',
    sequenceNumber: 5,
    sequenceTitle: 'Pets',
    sectionNumber: 2,
    sectionTitle: 'Farm Animals & Animal Sounds',
    sessionType: 'Full Sequence',
    sessionName: 'Farm Animals, Animal Actions & Sounds',
    communicativeObjectives: [
      'Name farm animals (sheep, lamb, cow, horse, donkey, hen, duck, goat)',
      'Imitate and describe animal sounds and actions (The duck swims, The horse runs)',
      'Sing the "Old MacDonald" farm song with TPR actions'
    ],
    vocabulary: ['sheep', 'lamb', 'cow', 'horse', 'donkey', 'hen', 'duck', 'goat', 'farm', 'swim', 'run', 'fly', 'jump'],
    grammar: ['Present simple 3rd person: The horse runs. The duck swims.', 'Can it fly? Yes, it can / No, it can’t.'],
    phonics: 'Vowel digraph /i:/ in "sheep", "green", "see". Contrast with short /i/.',
    handwritingFamily: 'Family 4: Diagonal letters (v, w, x, y, z) - Print lowercase',
    suggestedSituation: '- Look at the duck! Can it swim? - Yes, it can swim in the pond.',
    values: ['Appreciation for nature and farm animals in the rural community'],
    crossCurricular: {
      intellectual: 'Associate animal species with locomotion capabilities.',
      methodological: 'Use modal "can" for animal abilities.',
      communicative: 'Deliver animal chant with expressive prosody.',
      personalSocial: 'Respect living creatures.'
    }
  },
  {
    id: '3ps-seq6-sec1',
    year: '3PS',
    sequenceNumber: 6,
    sequenceTitle: 'Fancy Birthday',
    sectionNumber: 1,
    sectionTitle: 'Party Invitation & Celebration',
    sessionType: 'Full Sequence',
    sessionName: 'Offers, Invitations & Social Etiquette',
    communicativeObjectives: [
      'Express birthday wishes: "Happy birthday to you!"',
      'Offer food and drinks politely: "Have some cake, please. - Thank you!"',
      'Respond to gratitude: "You’re welcome / My pleasure."',
      'Name party items (cake, candles, balloons, juice, sweets, presents, hat)'
    ],
    vocabulary: ['birthday', 'party', 'cake', 'candles', 'balloons', 'juice', 'sweets', 'presents', 'hat', 'cup', 'fork', 'spoon', 'happy', 'excited'],
    grammar: ['Imperative for polite offers: Have some juice! Help yourself!', 'Polite formulas: Please, Thank you, You are welcome', 'Time preposition: at (at 3 o’clock)'],
    phonics: 'Short vowel sound /e/ in "ten", "pen", "red". Consonant sound contrast: /f/ (fork) vs /v/ (van).',
    handwritingFamily: 'Family 4: Diagonal & zigzag letters (v, w, x, y, z) - Print lower & uppercase',
    suggestedSituation: '- Happy birthday, Amina! Have some cake, please. - Thank you, Ali! - You’re welcome!',
    values: ['Hospitality, sharing joy with community and family, polite social manners'],
    crossCurricular: {
      intellectual: 'Calculate party items and temporal schedule.',
      methodological: 'Execute diagonal motor strokes for v, w, x, y, z.',
      communicative: 'Use polite social interaction routines authentically.',
      personalSocial: 'Inclusive celebrations and group solidarity.'
    }
  },
  {
    id: '3ps-seq6-sec2',
    year: '3PS',
    sequenceNumber: 6,
    sequenceTitle: 'Fancy Birthday',
    sectionNumber: 2,
    sectionTitle: 'Feelings & Social Etiquette',
    sessionType: 'Full Sequence',
    sessionName: 'Expressing Emotions & Congratulations',
    communicativeObjectives: [
      'Express emotional states (happy, excited, tired, hungry, thirsty)',
      'Ask and answer: "How are you? - I am happy today."',
      'Write a simple birthday greeting card to a classmate'
    ],
    vocabulary: ['happy', 'sad', 'excited', 'tired', 'hungry', 'thirsty', 'smile', 'card', 'celebration'],
    grammar: ['To be with emotion adjectives: I am happy, He is excited, She is tired', 'How are you feeling?'],
    phonics: 'Diphthong /aɪ/ in "five", "kite", "bike", "smile".',
    handwritingFamily: 'Year 3 Handwriting Review: Writing full greeting card with uppercase first letter',
    suggestedSituation: '- How are you today? - I am very happy because it’s my birthday!',
    values: ['Emotional awareness, empathy, congratulating peers on special occasions'],
    crossCurricular: {
      intellectual: 'Recognize facial expressions and emotional vocabulary.',
      methodological: 'Format a mini greeting card with greeting and signature.',
      communicative: 'Express personal feelings clearly.',
      personalSocial: 'Promote mutual empathy in class.'
    }
  }
];

// ==========================================
// 4PS (4th Primary School) Official Curriculum
// ==========================================
export const DIDACTIC_GUIDE_4PS_PRESETS: DidacticPreset[] = [
  {
    id: '4ps-seq1-sec1',
    year: '4PS',
    sequenceNumber: 1,
    sequenceTitle: 'Family & Friends',
    sectionNumber: 1,
    sectionTitle: 'Extended Family & Occupations',
    sessionType: 'Full Sequence',
    sessionName: 'Extended Kinship, Occupations & Cursive Writing',
    communicativeObjectives: [
      'Introduce extended family members (uncle, aunt, cousin, nephew, niece, grandparents)',
      'Ask and answer questions about family members, occupations and workplaces',
      'Fill in a structured family tree form with connected cursive handwriting',
      'Read short descriptive text (30-40 words) using decoding strategies'
    ],
    vocabulary: ['aunt', 'uncle', 'cousin', 'nephew', 'niece', 'son', 'daughter', 'teacher', 'doctor', 'engineer', 'nurse', 'journalist', 'carpenter', 'farmer', 'hospital', 'school', 'farm'],
    grammar: ['Present simple: to be, to live, to work (He works in a hospital)', 'Possessive adjectives: my, his, her, their', 'Suffixes for jobs: -er (teacher), -or (doctor), -ist (journalist)'],
    phonics: 'Vowel contrast: short /i/ (sit, live) vs long /i:/ (seat, leave, teacher). Short vs long vowel decoding.',
    handwritingFamily: 'Connected Cursive handwriting: Joining letters, baseline alignment, ascender/descender discipline',
    suggestedSituation: '- Who is he? - It’s my uncle Ahmed. - What is his job? - He is a doctor. He works in a hospital.',
    values: ['Pride in Algerian heritage, respect for all honest professions, family solidarity'],
    crossCurricular: {
      intellectual: 'Construct genealogical hierarchical diagrams and infer relationships.',
      methodological: 'Apply decoding rules to read multisyllabic occupational nouns.',
      communicative: 'Deliver fluent spoken family biographies.',
      personalSocial: 'Appreciate societal contribution of different professions.'
    }
  },
  {
    id: '4ps-seq1-sec2',
    year: '4PS',
    sequenceNumber: 1,
    sequenceTitle: 'Family & Friends',
    sectionNumber: 2,
    sectionTitle: 'Friends & Keypals (Countries & Nationalities)',
    sessionType: 'Full Sequence',
    sessionName: 'Countries, Nationalities, Languages & ID Card Form',
    communicativeObjectives: [
      'Introduce international friends and e-pals (name, country, nationality, language)',
      'Ask and answer: "Where are you from? - I am from Algeria. I am Algerian. I speak English."',
      'Fill in an ID card or profile registration form with accurate capitalisation'
    ],
    vocabulary: ['e-pal', 'country', 'nationality', 'Algeria/Algerian', 'England/English', 'France/French', 'Tunisia/Tunisian', 'Palestine/Palestinian', 'China/Chinese', 'Spain/Spanish', 'speak', 'flag'],
    grammar: ['Adjectives of nationality suffixes: -an, -ian, -ese, -ish, -ch', 'Wh-questions: Where are you from? What nationality are you? What language do you speak?'],
    phonics: 'Consonant sound discrimination: /ʃ/ (English, shoe) vs /tʃ/ (teacher, chair, Chinese).',
    handwritingFamily: 'Form Completion & Capital letters for Proper Nouns (Countries, Nationalities, Towns)',
    suggestedSituation: '- This is my e-pal Jack. - Where is he from? - He is from England. He speaks English.',
    values: ['Openness to the world, intercultural tolerance, global citizenship, pride in Algerian flag'],
    crossCurricular: {
      intellectual: 'Locate nations on world maps and associate nationalities.',
      methodological: 'Structure information to complete official forms accurately.',
      communicative: 'Engage in friendly intercultural exchange.',
      personalSocial: 'Demonstrate respect for diverse cultural and linguistic backgrounds.'
    }
  },
  {
    id: '4ps-seq2-sec1',
    year: '4PS',
    sequenceNumber: 2,
    sequenceTitle: 'School',
    sectionNumber: 1,
    sectionTitle: 'School Facilities & Campus Tour',
    sessionType: 'Full Sequence',
    sessionName: 'Naming School Buildings, Rooms & Facilities',
    communicativeObjectives: [
      'Name school facilities (classrooms, library, canteen, schoolyard, staffroom, computer room, headmaster office, toilets)',
      'Describe school premises with quality adjectives: large, spacious, clean, beautiful',
      'Play vocabulary games (Board Race, Word Jumble) to consolidate reading'
    ],
    vocabulary: ['facility', 'classroom', 'library', 'canteen', 'schoolyard', 'staffroom', 'headmaster office', 'toilets', 'large', 'spacious', 'modern', 'clean', 'trees', 'flowers'],
    grammar: ['Existential clauses: There is a... / There are...', 'Articles: a, an, the', 'Adjectives before nouns: a large library, a clean canteen'],
    phonics: 'Vowel contrast: /ʊ/ (book, foot) vs /u:/ (school, room, boot).',
    handwritingFamily: 'Connected Cursive sentence writing with proper word spacing and punctuation',
    suggestedSituation: '- Is this your school? - Yes, it is. There is a large library and a big yard with green trees.',
    values: ['Pride in school community, maintaining clean public spaces and school property'],
    crossCurricular: {
      intellectual: 'Analyze campus zones by educational, nutritional, and recreational functions.',
      methodological: 'Collaborate in timed word puzzle races.',
      communicative: 'Guide a visitor through school landmarks.',
      personalSocial: 'Show stewardship for school cleanliness and property.'
    }
  },
  {
    id: '4ps-seq2-sec2',
    year: '4PS',
    sequenceNumber: 2,
    sequenceTitle: 'School',
    sectionNumber: 2,
    sectionTitle: 'School Mapping & Directions',
    sessionType: 'Full Sequence',
    sessionName: 'Spatial Prepositions, School Map Reading & Giving Directions',
    communicativeObjectives: [
      'Locate school facilities using prepositions of place: opposite, next to, between, behind, in front of, on the left, on the right',
      'Ask and answer: "Where is the staffroom, please? - It is on the left, next to the library."',
      'Follow and give directional instructions on a 2D map'
    ],
    vocabulary: ['on the left', 'on the right', 'next to', 'opposite', 'in front of', 'behind', 'between', 'turn left', 'turn right', 'go straight', 'corridor', 'stairs'],
    grammar: ['Prepositions of location: opposite, next to, behind, in front of, between... and...', 'Imperative for directions: Turn left! Go straight!'],
    phonics: 'Voiced dental fricative /ð/ in "this", "that", "there", "the", "mother".',
    handwritingFamily: 'Cursive writing for complex prepositional phrases and spatial descriptions',
    suggestedSituation: '- Where is the staffroom, please? - It’s on the left, opposite the computer lab.',
    values: ['Helpfulness, offering polite assistance to lost visitors and younger peers'],
    crossCurricular: {
      intellectual: 'Spatial reasoning, map orientation, and coordinate comprehension.',
      methodological: 'Translate visual map cues into accurate verbal descriptions.',
      communicative: 'Give concise and polite directional guidance.',
      personalSocial: 'Cooperative pair navigation exercises.'
    }
  },
  {
    id: '4ps-seq3-sec1',
    year: '4PS',
    sequenceNumber: 3,
    sequenceTitle: 'Fun Time & Games',
    sectionNumber: 1,
    sectionTitle: 'Fun Time Activities & Sports',
    sessionType: 'Full Sequence',
    sessionName: 'Indoor & Outdoor Sports, Hobbies and Leisure',
    communicativeObjectives: [
      'Name fun time activities (swimming, cycling, football, basketball, drawing, reading stories, video games)',
      'Ask and answer questions about favorite hobbies: "What do you like doing on weekends? - I like playing football."',
      'Express likes and preferences using love, like, enjoy, prefer'
    ],
    vocabulary: ['swimming', 'cycling', 'football', 'basketball', 'drawing', 'reading stories', 'music', 'gaming', 'weekend', 'park', 'playground'],
    grammar: ['Present simple verbs of preference + gerund/noun: love, like, prefer, enjoy (I love swimming)', 'Prepositions of time: in summer, on weekends, after school'],
    phonics: 'Long vowel sound /ɔ:/ in "sport", "ball", "door", "four", "draw".',
    handwritingFamily: 'Cursive handwriting paragraph completion: "My Favourite Hobby"',
    suggestedSituation: '- What do you like doing on weekends? - I love playing football with my friends in the park.',
    values: ['Healthy active lifestyle, balanced recreation, camaraderie and teamwork'],
    crossCurricular: {
      intellectual: 'Categorize activities into indoor vs outdoor, individual vs team.',
      methodological: 'Express seasonal recreational patterns.',
      communicative: 'Interview peers about leisure habits.',
      personalSocial: 'Value sportsmanship and teamwork.'
    }
  },
  {
    id: '4ps-seq3-sec2',
    year: '4PS',
    sequenceNumber: 3,
    sequenceTitle: 'Fun Time & Games',
    sectionNumber: 2,
    sectionTitle: 'Leisure, Hobbies & Seasons',
    sessionType: 'Full Sequence',
    sessionName: 'The 4 Seasons, Weather & Seasonal Leisure',
    communicativeObjectives: [
      'Name the 4 seasons: autumn, winter, spring, summer',
      'Describe weather conditions (sunny, rainy, windy, snowy, hot, cold)',
      'Associate seasonal weather with recreational activities: "In winter, I stay home and read stories."'
    ],
    vocabulary: ['autumn', 'winter', 'spring', 'summer', 'sunny', 'rainy', 'windy', 'snowy', 'hot', 'cold', 'umbrella', 'sunglasses', 'snowman'],
    grammar: ['Prepositions with seasons: in autumn, in winter, in spring, in summer', 'What’s the weather like? It is sunny and hot.'],
    phonics: 'Diphthong /aʊ/ in "cloud", "out", "now", "brown".',
    handwritingFamily: 'Designing a 4-Seasons Weather & Activity Wheel with cursive captions',
    suggestedSituation: '- What’s the weather like in spring? - It is warm and sunny. I like riding my bike.',
    values: ['Appreciation for natural seasons, outdoor vitality, safety during extreme weather'],
    crossCurricular: {
      intellectual: 'Meteorological cycles and seasonal adaptation.',
      methodological: 'Match weather symbols with activity choices.',
      communicative: 'Deliver seasonal weather report.',
      personalSocial: 'Enjoy outdoors cooperatively.'
    }
  },
  {
    id: '4ps-seq4-sec1',
    year: '4PS',
    sequenceNumber: 4,
    sequenceTitle: 'Food & Health',
    sectionNumber: 1,
    sectionTitle: 'Healthy Food & Nutrition',
    sessionType: 'Full Sequence',
    sessionName: 'Food Groups, Balanced Diet & Nutritional Dialogues',
    communicativeObjectives: [
      'Name healthy food items (cereals, vegetables, fruits, dairy, fish, meat, water, fresh juice)',
      'Distinguish between healthy nutrients and junk food (burger, sweets, fizzy soda)',
      'Ask and answer questions about daily meals: breakfast, lunch, dinner'
    ],
    vocabulary: ['bread', 'rice', 'cereals', 'tomato', 'potato', 'carrot', 'orange', 'banana', 'apple', 'meat', 'chicken', 'fish', 'milk', 'cheese', 'water', 'fresh juice', 'burger', 'sweets', 'breakfast', 'lunch', 'dinner'],
    grammar: ['Present simple: eat, drink, need', 'Countable vs uncountable food items', 'Plural endings: -s, -es (tomatoes, apples)'],
    phonics: 'Vowel contrasts: /ɚ/ (burger, butter) vs /ɜ:/ (bird, skirt, shirt).',
    handwritingFamily: 'Designing a Healthy Meal Menu with decorative cursive titles',
    suggestedSituation: '- What’s for lunch, mum? - We are having lentil soup, grilled fish, and fresh salad. - Great, it is healthy!',
    values: ['Health consciousness, gratitude for food sustenance, healthy lifestyle'],
    crossCurricular: {
      intellectual: 'Classify food pyramid groups (proteins, carbohydrates, vitamins).',
      methodological: 'Plan a balanced daily nutritional menu.',
      communicative: 'Roleplay a healthy dining scenario.',
      personalSocial: 'Promote hygiene and conscious consumption.'
    }
  },
  {
    id: '4ps-seq4-sec2',
    year: '4PS',
    sequenceNumber: 4,
    sequenceTitle: 'Food & Health',
    sectionNumber: 2,
    sectionTitle: 'Health & Body Care',
    sessionType: 'Full Sequence',
    sessionName: 'Body Parts, Common Illnesses & Health Advice',
    communicativeObjectives: [
      'Name body parts (head, shoulders, knees, toes, eyes, stomach, teeth, mouth, ears)',
      'Ask and answer questions about common ailments: headache, toothache, stomachache, flu, cough',
      'Give health advice using the imperative: "Brush your teeth! Drink water! Visit the doctor!"'
    ],
    vocabulary: ['head', 'shoulder', 'knee', 'toe', 'stomach', 'tooth/teeth', 'ear', 'headache', 'toothache', 'stomachache', 'flu', 'cough', 'doctor', 'medicine', 'dentist'],
    grammar: ['Imperative for health advice: Brush your teeth! Drink plenty of water! Do not eat too many sweets!', 'Have you got...? I have got a headache.'],
    phonics: 'Voiceless dental fricative /θ/ in "tooth", "teeth", "mouth", "healthy", "three".',
    handwritingFamily: 'Writing emergency health tips with bullet points and punctuation',
    suggestedSituation: '- What’s the matter? - I have a terrible toothache. - You should visit the dentist and brush after meals.',
    values: ['Personal hygiene, empathy with sick peers, self-care discipline'],
    crossCurricular: {
      intellectual: 'Understand biological causes of dental and digestive health.',
      methodological: 'Formulate preventive hygiene rules.',
      communicative: 'Express physical sensations and offer comforting remedies.',
      personalSocial: 'Practice empathy and medical consultation etiquette.'
    }
  },
  {
    id: '4ps-seq5-sec1',
    year: '4PS',
    sequenceNumber: 5,
    sequenceTitle: 'Animals',
    sectionNumber: 1,
    sectionTitle: 'Farm Animals & Habitats',
    sessionType: 'Full Sequence',
    sessionName: 'Farm Animals, Diets, Offspring & Physical Features',
    communicativeObjectives: [
      'Name farm animals and their young (cow/calf, sheep/lamb, horse/foal, hen/chick, goat/kid)',
      'Describe animal body parts (horns, hooves, tail, beak, fleece, feathers)',
      'Ask and answer questions about what farm animals eat: "Does a cow eat grass? - Yes, it does."'
    ],
    vocabulary: ['cow', 'sheep', 'goat', 'horse', 'donkey', 'duck', 'chicken', 'rabbit', 'calf', 'lamb', 'chick', 'grass', 'plants', 'grains', 'seeds', 'horns', 'tail', 'fur', 'feathers'],
    grammar: ['Present simple 3rd person questions: Does a cow eat grass? Yes, it does.', 'Plural forms: sheep (irregular), horses, cows', 'There is / There are on the farm'],
    phonics: 'Consonant sound review and decoding multisyllabic animal terms.',
    handwritingFamily: 'Animal Encyclopedia Profile sheet with cursive labels',
    suggestedSituation: '- Look at the horse! It is strong. What does it eat? - It eats fresh green grass and apples.',
    values: ['Appreciation for agriculture, farm animals, biodiversity, and ecosystem harmony'],
    crossCurricular: {
      intellectual: 'Differentiate herbivores, carnivores, and granivores.',
      methodological: 'Record animal attributes in comparison matrix.',
      communicative: 'Narrate a farm visit in clear sequence.',
      personalSocial: 'Respect farming traditions and nature conservation.'
    }
  },
  {
    id: '4ps-seq5-sec2',
    year: '4PS',
    sequenceNumber: 5,
    sequenceTitle: 'Animals',
    sectionNumber: 2,
    sectionTitle: 'Zoo Animals & Global Wildlife',
    sessionType: 'Full Sequence',
    sessionName: 'Wild Animals, Geographic Origins & Environmental Protection',
    communicativeObjectives: [
      'Name wild and zoo animals (lion, elephant, giraffe, zebra, panda, kangaroo, penguin, tiger)',
      'Describe animal habitats and geographic continents (savannah, jungle, desert, arctic)',
      'Create a mini-dictionary project entry with illustrations and cursive descriptions'
    ],
    vocabulary: ['lion', 'elephant', 'giraffe', 'zebra', 'tiger', 'panda', 'kangaroo', 'snake', 'monkey', 'jungle', 'savannah', 'desert', 'forest', 'Africa', 'Asia', 'fast', 'heavy', 'tall', 'wild'],
    grammar: ['Comparative adjectives: taller than, bigger than, faster than', 'Prepositions of habitat: in the jungle, in the desert'],
    phonics: 'Cumulative sound discrimination review (/ʃ/, /tʃ/, /θ/, /ð/, /i:/ vs /i/, /u:/ vs /ʊ/).',
    handwritingFamily: 'Year 4 Final Capstone Project: "My Mini Dictionary" - Illustrated & Cursive Entries',
    suggestedSituation: '- Which animal is your favourite? - I love the zebra! It has black and white stripes and runs very fast.',
    values: ['Wildlife conservation, protecting endangered species, global ecological responsibility'],
    crossCurricular: {
      intellectual: 'Synthesize geographical, biological, and environmental concepts.',
      methodological: 'Alphabetize and organize dictionary entries.',
      communicative: 'Deliver an engaging wildlife report.',
      personalSocial: 'Demonstrate global environmental stewardship.'
    }
  }
];

// ==========================================
// 5PS (5th Primary School) Official Curriculum (CNP 2024 Didactic Guide - Key Stage 3)
// ==========================================
export const DIDACTIC_GUIDE_5PS_PRESETS: DidacticPreset[] = [
  {
    id: '5ps-seq1-sec1',
    year: '5PS',
    sequenceNumber: 1,
    sequenceTitle: 'Jobs, Occupations & Hobbies',
    sectionNumber: 1,
    sectionTitle: 'Jobs and Occupations',
    sessionType: 'Full Sequence',
    sessionName: 'Naming Jobs, Workplace Places & Occupational Interview',
    communicativeObjectives: [
      'Name and identify common jobs and occupations with occupational suffixes (-er, -or, -ist, -ian)',
      'Ask and answer questions about family members and friends’ jobs: "What’s your father’s job? - He is a gendarme / doctor / teacher."',
      'Name and identify common places of work (hospital, school, farm, office, post office, garage, TV station)',
      'Identify the gist of an oral message and decode a short reading text of about 20-40 words',
      'Recognize and isolate phonemic contrast /ʒ/ vs /dʒ/ (pleasure, television vs judge, gendarme, manager, job)',
      'Transfer notes from a form into a short written message of about 10-20 words using correct writing mechanics'
    ],
    vocabulary: [
      'farmer', 'teacher', 'doctor', 'dentist', 'musician', 'electrician', 'gendarme', 'manager', 'mechanic', 'surgeon', 'journalist',
      'school', 'hospital', 'farm', 'office', 'post office', 'garage', 'TV station', 'sport club', 'private company'
    ],
    grammar: [
      'The present simple: to do, to be, to work',
      'Wh-questions: "What’s her/his job?"',
      'Yes/no questions: "Is s/he a doctor? - Yes, he is. / No, he isn’t."',
      'Articles: a, an (a teacher, an electrician)',
      'Prepositions of place: in, at (at the hospital, in an office)',
      'Full & contracted forms: am, are, is / ’m, ’re, ’s',
      'Intonation in simple sentences and Wh-questions'
    ],
    phonics: 'Consonant contrast: /ʒ/ (pleasure, division, television) vs /dʒ/ (just, age, judge, job, manager, gendarme). Adding and deleting phonemes.',
    handwritingFamily: 'Sentence writing from form notes: Transforming occupational profile cards into connected cursive paragraphs (capitalization, punctuation, subject-verb agreement)',
    suggestedSituation: 'Djawad and Jack are e-pals. - Jack: What’s your father’s job? - Djawad: He is a gendarme. - Jack: Interesting! My father is a manager in a private company.',
    values: ['National Identity: Pride in Algerian working community', 'Citizenship: Respect for all manual and intellectual professions', 'Attitude: Manifest positive attitude towards interlocutor'],
    crossCurricular: {
      intellectual: 'Demonstrate understanding of the gist and paralinguistic features in context; discover word usage in oral interaction.',
      methodological: 'Make use of context and decoding skills to comprehend short messages; implement writing mechanics to produce 20-word texts.',
      communicative: 'React to verbal and non-verbal messages; select appropriate words and formulaic chunks for oral interviews.',
      personalSocial: 'Collaborate with peers verbally and non-verbally; publish written production in the class gallery walk.'
    }
  },
  {
    id: '5ps-seq1-sec2',
    year: '5PS',
    sequenceNumber: 1,
    sequenceTitle: 'Jobs, Occupations & Hobbies',
    sectionNumber: 2,
    sectionTitle: 'Hobbies',
    sessionType: 'Full Sequence',
    sessionName: 'Expressing Leisure Preferences, Sports & Indoor/Outdoor Hobbies',
    communicativeObjectives: [
      'Identify and name different hobbies (playing football/basketball/tennis, riding a bike, painting, swimming, taking pictures, playing chess, creating collages)',
      'Identify and name family members and friends’ favourite hobbies',
      'Ask and answer questions about favourite hobbies: "What’s your favourite hobby? / Do you like reading books? - Yes, I enjoy reading stories."',
      'Read words containing the velar nasal sound /ŋ/ (playing, riding, swimming, singing, ring, bring)',
      'Transfer notes from a form into a short written message of about 10-20 words applying writing mechanics'
    ],
    vocabulary: [
      'playing football', 'playing basketball', 'playing tennis', 'riding a bike', 'painting', 'swimming', 'taking pictures', 'playing chess', 'creating collages',
      'indoor hobbies', 'outdoor hobbies', 'stories', 'tales', 'library', 'park', 'weekend', 'Sunday', 'Monday', 'Saturday'
    ],
    grammar: [
      'Present simple: to like / to love / to enjoy / to prefer',
      'Gerund structure: like/love/enjoy/prefer + stem+ing (I enjoy reading stories. He prefers playing chess.)',
      'Wh-questions: "What’s your favourite hobby?"',
      'Yes/no questions: "Do you like playing video games? - Yes, I do. / No, I don’t. I prefer..."',
      'Prepositions of time & place: on (on Saturday), at (at night, in the park)',
      'Exclamations: "Fantastic! / Wonderful!"'
    ],
    phonics: 'Velar nasal sound: /ŋ/ in "playing", "riding", "swimming", "singing", "ring", "bring". Adding /b/ to "ring" -> "bring".',
    handwritingFamily: 'Cursive paragraph construction: Combining sentences about hobby preferences into a cohesive message with comma lists and full stops',
    suggestedSituation: 'Amine and his mom are at the Library. - Mom: Do you like reading books? - Amine: Yes, I enjoy reading stories and tales. They teach me lessons.',
    values: ['Healthy lifestyle through sports and creative hobbies, love of reading and literature, cooperative play'],
    crossCurricular: {
      intellectual: 'Understand leisure classification (indoor vs outdoor) and infer emotional preferences.',
      methodological: 'Structure sentences with subject-verb-object and gerunds.',
      communicative: 'Participate in information gap exchanges and hobby interviews.',
      personalSocial: 'Share personal hobbies warmly and encourage peers.'
    }
  },
  {
    id: '5ps-seq2-sec1',
    year: '5PS',
    sequenceNumber: 2,
    sequenceTitle: 'Hometown / City / Village: Amenities, Directions & Signs',
    sectionNumber: 1,
    sectionTitle: 'Hometown / City / Village Amenities',
    sessionType: 'Full Sequence',
    sessionName: 'Describing Town Amenities, Public Facilities & Landmark Locations',
    communicativeObjectives: [
      'Name and identify different amenities in city/hometown/village (school, hospital, shop, restaurant, park, butcher’s, baker’s, grocer’s, post office, petrol station, mall, florist’s, library, bank, Roman ruins)',
      'Ask and answer questions about different amenities and their locations: "Is there a florist’s? - Yes, there is. Where is it? - It is between the post office and the bank."',
      'Decode a short simple text of about 30 words and identify gist and specific information',
      'Recognize and isolate phonemic contrast /j/ (yes, young, your) vs /w/ (when, what, water, wet)',
      'Write a short message of about 15 words describing local amenities'
    ],
    vocabulary: [
      'hometown', 'city', 'village', 'amenities', 'school', 'hospital', 'shop', 'restaurant', 'park', 'the butcher’s', 'the baker’s', 'the grocer’s',
      'post office', 'petrol station', 'mall', 'cafeteria', 'florist’s', 'library', 'bank', 'Roman ruins', 'town hall', 'police station'
    ],
    grammar: [
      'Present simple: to be, to have, to find',
      'Existential questions: "Is there / Are there...? - Yes, there is. / No, there isn’t. / Yes, there are. / No, there aren’t."',
      'Wh-question: "Where is it?"',
      'Possessive case: ’s (the butcher’s, the florist’s)',
      'Articles: a, an, the',
      'Prepositions of location: in, in front of, between, next to, opposite, on Larbi Ben M’hidi road',
      'Exclamations: "What a beautiful park! / Wow! / Nice!"'
    ],
    phonics: 'Semivowel glide contrast: /j/ in "yes", "young", "your" vs /w/ in "water", "wet", "when", "what".',
    handwritingFamily: 'Town layout and map labeling with cursive annotations and prepositional phrases (next to, opposite, between)',
    suggestedSituation: 'Amine describes his hometown to Jack: - Amine: My hometown is big. You can find all amenities you need: a hospital, a park, a post office. - Jack: Is there a florist’s? - Amine: Yes, there is. It’s on Larbi Ben M’hidi road, between the cafeteria and the library.',
    values: ['Pride in Algerian towns and cities, preservation of historical heritage (Roman ruins, old landmarks), community care'],
    crossCurricular: {
      intellectual: 'Spatial mapping and reading pictorial city grids.',
      methodological: 'Use scanning strategies to extract specific locations from texts and maps.',
      communicative: 'Formulate location inquiries and provide precise spatial descriptions.',
      personalSocial: 'Express hospitality and welcome visitors to one’s hometown.'
    }
  },
  {
    id: '5ps-seq2-sec2',
    year: '5PS',
    sequenceNumber: 2,
    sequenceTitle: 'Hometown / City / Village: Amenities, Directions & Signs',
    sectionNumber: 2,
    sectionTitle: 'Directions and Signs',
    sessionType: 'Full Sequence',
    sessionName: 'Asking for & Giving Directions, Road Signs & Street Navigation',
    communicativeObjectives: [
      'Ask for and show the way to different amenities in city/hometown/village',
      'Understand and use road signs and street terms (traffic lights, bridge, corner, subway, pedestrian crossing, sidewalk, straight ahead, turn right/left)',
      'Use the imperative for giving clear directions: "Go straight ahead, take the first turn on the right, cross at the pedestrian crossing."',
      'Use modal "can" for polite requests: "Excuse me Sir/Madam, can you show me the way to the park, please?"',
      'Read short texts of about 35 words and write a short navigation message of about 15 words'
    ],
    vocabulary: [
      'road', 'street', 'the way', 'traffic lights', 'sign', 'bridge', 'the corner', 'subway', 'pedestrian crossing', 'sidewalk',
      'go straight ahead', 'go down/up the road', 'turn to the right/left', 'take the first/second turning', 'cross', 'opposite'
    ],
    grammar: [
      'The imperative for instructions: Go straight ahead! Turn left! Cross the road!',
      'Modal "can" for polite requests: "Excuse me, can you help me, please? Can you show me the way...?"',
      'Ordinal numbers: the first, the second, the third turning',
      'Prepositions: between, up/down the road, at the corner of',
      'Intonation in instructions and requests'
    ],
    phonics: 'Phonics consolidation and sound-spelling revision. Word stress on directional commands.',
    handwritingFamily: 'Writing step-by-step street directions with imperative verbs, commas, and street names in cursive script',
    suggestedSituation: 'Passer-by: Excuse me Madam, can you show the way to the post office, please? - Hiba: Yes, of course. Well, go up this road. Cross at the pedestrian crossing. It is at the corner of Hassiba Benbouali road and Ali Ammari. - Passer-by: Oh, that’s easy. Thank you!',
    values: ['Politeness and civic courtesy, helping strangers and visitors, road safety and pedestrian discipline'],
    crossCurricular: {
      intellectual: 'Interpret directional symbols, map legends, and street layouts.',
      methodological: 'Execute sequential navigation instructions.',
      communicative: 'Roleplay polite street inquiries and directions.',
      personalSocial: 'Demonstrate civic responsibility and kindness in public spaces.'
    }
  },
  {
    id: '5ps-seq3-sec1',
    year: '5PS',
    sequenceNumber: 3,
    sequenceTitle: 'Holidays and Travelling',
    sectionNumber: 1,
    sectionTitle: 'Holidays',
    sessionType: 'Full Sequence',
    sessionName: 'Holiday Destinations, Seasons, Weather & Vacation Activities',
    communicativeObjectives: [
      'Name common holiday destinations in Algeria (beach, mountain, seaside, camping, hotel, forest, park, El Kala, Oran, Djurdjura Mountains)',
      'Name the 4 seasons (winter, spring, summer, autumn) and associated weather (sunny, cold, snowy, windy)',
      'Ask and answer questions about holiday destinations and plans: "Where are you going for holidays? - We are going to the beach / El Kala."',
      'Use the present continuous for holiday activities: "We are staying in a nice hotel / I am spending my holidays in El Kala."',
      'Read a short text of about 40 words and transfer notes from a chart into a 20-word paragraph'
    ],
    vocabulary: [
      'holidays', 'beach', 'mountain', 'seaside', 'camping', 'hotel', 'forest', 'park',
      'winter', 'spring', 'summer', 'autumn', 'sunny', 'snowy', 'cold', 'windy',
      'swimming', 'diving', 'building sandcastles', 'playing with snow', 'flying kite', 'taking photos'
    ],
    grammar: [
      'The present continuous: am / is / are + stem+ing (We are going to Oran. I am spending my holidays...)',
      'Yes/no questions: "Are you/we going for holidays? - Yes, we are. / No, we aren’t."',
      'Wh-questions: "Where are you going for spring holidays?"',
      'Full and contracted forms: am, is, are / ’m, ’s, ’re + stem+ing',
      'Exclamations: "Cool! / Great! / Waaaaaw!"'
    ],
    phonics: 'Vowel and diphthong review in seasonal and weather vocabulary. Decoding 40-word narrative passages.',
    handwritingFamily: 'Constructing a holiday chart into a connected cursive paragraph (Season, Weather, Destination, Activity)',
    suggestedSituation: 'Sarah: Mom, dad! It’s summer! Where are we going for holidays? - Dad: We are going to the beach. - Amine: Waaaaaw! I love swimming and diving. - Sarah: Great! I enjoy building sandcastles.',
    values: ['National Identity: Love and pride in Algeria’s diverse geography and holiday resorts (El Kala, Djurdjura, coastal beaches)', 'Family bonding during vacations'],
    crossCurricular: {
      intellectual: 'Synthesize seasonal weather cycles with geographic holiday destinations.',
      methodological: 'Extract data from matrix charts and draft descriptive summaries.',
      communicative: 'Share personal holiday memories and future vacation plans.',
      personalSocial: 'Celebrate national tourism and environmental preservation.'
    }
  },
  {
    id: '5ps-seq3-sec2',
    year: '5PS',
    sequenceNumber: 3,
    sequenceTitle: 'Holidays and Travelling',
    sectionNumber: 2,
    sectionTitle: 'Travelling',
    sessionType: 'Full Sequence',
    sessionName: 'Means of Transportation, Travel Preferences & Traditional Markets',
    communicativeObjectives: [
      'Name and identify different means of transportation (car, plane, bike, boat, train, metro, bus)',
      'Ask and answer questions about favourite ways of travelling: "How do you like travelling? - I like travelling by train / car / plane."',
      'Describe travel experiences and sightseeing in Algerian cities (Ghardaia, countryside, visiting traditional markets, buying souvenirs)',
      'Read a short text of about 40 words and write a short message of about 20 words applying writing mechanics',
      'Review and integrate communicative competences in the final Sequence project: "My Booklet"'
    ],
    vocabulary: [
      'car', 'plane', 'bike', 'boat', 'train', 'metro', 'bus', 'on foot',
      'countryside', 'trip', 'travel agency', 'traditional market', 'souvenirs', 'Ghardaia', 'fine weather', 'fabulous', 'comfortable'
    ],
    grammar: [
      'Present simple with preference verbs: to like / to love / to enjoy / to prefer + travelling',
      'Yes/no questions: "Do you like travelling by car? - No, I don’t. I prefer travelling by train."',
      'Wh-questions: "How do you like travelling?"',
      'Prepositions of transport: by car, by train, by plane, by bus, by boat, on foot',
      'Exclamations: "Oh! Really! / Fabulous!"'
    ],
    phonics: 'Comprehensive phonics and sound-spelling revision across the primary cycle. Syllable division and prosodic rhythm.',
    handwritingFamily: 'Year 5 Capstone Project: "My Booklet" - Designing an illustrated travel booklet with cursive texts, drawings, and maps',
    suggestedSituation: 'Mary: John, do you like travelling by train? - John: It is fabulous! - Mary: I prefer travelling by plane. - John: Look, I am taking pictures. Smile!',
    values: ['Cultural heritage appreciation (traditional crafts, architecture of Ghardaia and Sahara)', 'Ecological and safe travel habits'],
    crossCurricular: {
      intellectual: 'Compare transport efficiency, speed, and comfort.',
      methodological: 'Synthesize the year’s learnings into the capstone "My Booklet" project.',
      communicative: 'Present travel experiences articulately to peers.',
      personalSocial: 'Exhibit intercultural appreciation and collaborative pride.'
    }
  }
];

// Helper to get presets by level (3PS, 4PS, 5PS Primary English)
export function getPresetsByLevel(level?: DidacticYear | string): DidacticPreset[] {
  if (level === '4PS' || level === 'Year 4 (Primary)') {
    return DIDACTIC_GUIDE_4PS_PRESETS;
  }
  if (level === '5PS' || level === 'Year 5 (Primary)') {
    return DIDACTIC_GUIDE_5PS_PRESETS;
  }
  return DIDACTIC_GUIDE_3PS_PRESETS;
}

// Extract distinct Sequences for level
export function getSequencesForLevel(level?: DidacticYear | string): { number: number; title: string }[] {
  const presets = getPresetsByLevel(level);
  const map = new Map<number, string>();
  presets.forEach(p => {
    if (!map.has(p.sequenceNumber)) {
      map.set(p.sequenceNumber, p.sequenceTitle);
    }
  });
  return Array.from(map.entries()).map(([number, title]) => ({ number, title }));
}

// Extract distinct Sections for a given sequence in level
export function getSectionsForSequence(level: DidacticYear | string, sequenceNumber: number): { number: number; title: string; preset: DidacticPreset }[] {
  const presets = getPresetsByLevel(level);
  return presets
    .filter(p => p.sequenceNumber === sequenceNumber)
    .map(p => ({
      number: p.sectionNumber,
      title: p.sectionTitle,
      preset: p
    }));
}

// Standard session sequence options for 3PS, 4PS, 5PS
export function getSessionOptionsForLevel(level?: DidacticYear | string): { id: string; label: string; duration: number }[] {
  if (level === '4PS' || level === 'Year 4 (Primary)') {
    return [
      { id: 'full', label: 'Full 5-Session Sequence Unit (Complete 4PS Unit)', duration: 45 },
      { id: 's1', label: 'Session 1: I Listen & Discover (Oral Input, Flashcards & Comprehension)', duration: 45 },
      { id: 's2', label: 'Session 2: I Read & Discover (Phonemic Awareness & Vowel Length)', duration: 45 },
      { id: 's3', label: 'Session 3: I Read & Write (Connected Cursive Handwriting & Forms)', duration: 45 },
      { id: 's4', label: 'Session 4: I Play Roles & Interact (Fluency Dialogues & Pair Work)', duration: 45 },
      { id: 's5', label: 'Session 5: Games & Story Time / Project Consolidation', duration: 45 },
      { id: 'assessment', label: 'Assessment Pause: Criterion-Referenced Evaluation Grid', duration: 45 }
    ];
  }

  if (level === '5PS' || level === 'Year 5 (Primary)') {
    return [
      { id: 'full', label: 'Full 8-Session Sequence (Key Stage 3 Didactic Sequence)', duration: 45 },
      { id: 's1', label: 'Session 1: Oral Interaction & Lexical Input (Listen & Repeat / Act Out)', duration: 45 },
      { id: 's2', label: 'Session 2: Oral Production & Grammar in Context', duration: 45 },
      { id: 's3', label: 'Session 3: Reading Comprehension & Text Decoding', duration: 45 },
      { id: 's4', label: 'Session 4: Phonics, Prosody & Syllable Division', duration: 45 },
      { id: 's5', label: 'Session 5: Written Production 1 (Guided Writing & Sentence Building)', duration: 45 },
      { id: 's6', label: 'Session 6: Written Production 2 (Paragraph Drafting & Cohesion)', duration: 45 },
      { id: 's7', label: 'Session 7: Project Workshop ("My Booklet" Integration)', duration: 45 },
      { id: 's8', label: 'Session 8: Self-Evaluation & Pedagogical Remediation Pause', duration: 45 }
    ];
  }

  return [
    { id: 'full', label: 'Full 4-Session Sequence Unit (Complete 3PS Unit)', duration: 45 },
    { id: 's1', label: 'Session 1: I Sing & Have Fun (10m) + I Listen & Repeat (35m)', duration: 45 },
    { id: 's2', label: 'Session 2: I Read & Discover (Phonics & Grapheme Decoding 45m)', duration: 45 },
    { id: 's3', label: 'Session 3: I Read & Write (Handwriting Families & Letter Formation 45m)', duration: 45 },
    { id: 's4', label: 'Session 4: I Play Roles (Dialogues & Puppet Roleplay 45m)', duration: 45 },
    { id: 'assessment', label: 'Assessment Pause: Problem Solving & Remediation Grid (45m)', duration: 45 }
  ];
}
