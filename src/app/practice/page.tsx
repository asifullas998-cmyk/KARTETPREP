
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, RefreshCcw } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

type QuestionsByTopic = {
  [topic: string]: Question[];
};

type AllQuestions = {
  [language: string]: QuestionsByTopic;
};


const allQuestions: AllQuestions = {
  en: {
    cdp: [
      { id: 1, text: "Which is a characteristic of Piaget's Concrete Operational stage?", options: ["Abstract reasoning", "Egocentrism", "Conservation", "Hypothetical thinking"], correctAnswer: "Conservation" },
      { id: 2, text: "According to Vygotsky, learning occurs in the:", options: ["Zone of Proximal Development", "Sensorimotor Stage", "Preoperational Stage", "Formal Operational Stage"], correctAnswer: "Zone of Proximal Development" },
      { id: 6, text: "Erikson's stage of 'Initiative vs. Guilt' corresponds to which age group?", options: ["Infancy", "Preschool", "School Age", "Adolescence"], correctAnswer: "Preschool" },
      { id: 7, text: "A key concept in constructivism is that learners:", options: ["Passively receive information", "Actively construct knowledge", "Are motivated by rewards", "Learn through imitation"], correctAnswer: "Actively construct knowledge"},
      // ... 96 more questions for cdp in English
      { id: 101, text: "Who is known as the father of behaviorism?", options: ["Ivan Pavlov", "B.F. Skinner", "John B. Watson", "Edward Thorndike"], correctAnswer: "John B. Watson" },
      { id: 102, text: "Maslow's hierarchy of needs is a theory of:", options: ["Motivation", "Learning", "Development", "Personality"], correctAnswer: "Motivation" },
      { id: 103, text: "The concept of 'operant conditioning' is associated with:", options: ["B.F. Skinner", "Ivan Pavlov", "Albert Bandura", "Jean Piaget"], correctAnswer: "B.F. Skinner" },
      { id: 104, text: "Howard Gardner's theory deals with:", options: ["Multiple Intelligences", "Emotional Intelligence", "Moral Development", "Cognitive Development"], correctAnswer: "Multiple Intelligences" },
      { id: 105, text: "The term 'scaffolding' in education was introduced by:", options: ["Jerome Bruner", "Lev Vygotsky", "Jean Piaget", "John Dewey"], correctAnswer: "Jerome Bruner" },
      { id: 106, text: "Kohlberg's theory focuses on the development of:", options: ["Moral reasoning", "Language skills", "Social skills", "Emotional regulation"], correctAnswer: "Moral reasoning" },
      { id: 107, text: "What is the primary focus of inclusive education?", options: ["Catering to the needs of all students", "Separating students based on ability", "Focusing only on gifted students", "Standardized testing for all"], correctAnswer: "Catering to the needs of all students" },
      { id: 108, text: "The 'Bobo doll' experiment demonstrated the concept of:", options: ["Observational learning", "Classical conditioning", "Operant conditioning", "Cognitive dissonance"], correctAnswer: "Observational learning" },
      { id: 109, text: "In Pavlov's experiment, the bell was the:", options: ["Conditioned Stimulus", "Unconditioned Stimulus", "Conditioned Response", "Unconditioned Response"], correctAnswer: "Conditioned Stimulus" },
      { id: 110, text: "Which assessment is conducted at the end of an instructional unit?", options: ["Summative assessment", "Formative assessment", "Diagnostic assessment", "Peer assessment"], correctAnswer: "Summative assessment" },
      { id: 111, text: "A child's ability to understand that objects continue to exist even when they cannot be seen is called:", options: ["Object Permanence", "Symbolic Thought", "Conservation", "Egocentrism"], correctAnswer: "Object Permanence" },
      { id: 112, text: "Which stage in Piaget's theory is characterized by symbolic thinking and language development?", options: ["Preoperational Stage", "Sensorimotor Stage", "Concrete Operational Stage", "Formal Operational Stage"], correctAnswer: "Preoperational Stage" },
      { id: 113, text: "The 'nature vs. nurture' debate refers to the relative importance of:", options: ["Genetics and environment", "Teaching and learning", "Motivation and intelligence", "Culture and society"], correctAnswer: "Genetics and environment" },
      { id: 114, text: "According to Freud, the 'id' operates on the:", options: ["Pleasure principle", "Reality principle", "Morality principle", "Logic principle"], correctAnswer: "Pleasure principle" },
      { id: 115, text: "A learning disability that affects reading ability is known as:", options: ["Dyslexia", "Dyscalculia", "Dysgraphia", "Dyspraxia"], correctAnswer: "Dyslexia" },
      { id: 116, text: "Which part of the brain is primarily responsible for decision-making and problem-solving?", options: ["Frontal Lobe", "Parietal Lobe", "Temporal Lobe", "Occipital Lobe"], correctAnswer: "Frontal Lobe" },
      { id: 117, text: "The concept of 'g-factor' or general intelligence was proposed by:", options: ["Charles Spearman", "Howard Gardner", "Robert Sternberg", "Alfred Binet"], correctAnswer: "Charles Spearman" },
      { id: 118, text: "Which of the following is an example of an intrinsic motivator?", options: ["Curiosity", "Grades", "Praise", "Rewards"], correctAnswer: "Curiosity" },
      { id: 119, text: "A teacher uses a system of rewards to encourage good behavior. This is an application of:", options: ["Operant Conditioning", "Classical Conditioning", "Social Learning Theory", "Cognitive Theory"], correctAnswer: "Operant Conditioning" },
      { id: 120, text: "The ability to think about one's own thinking process is called:", options: ["Metacognition", "Cognition", "Introspection", "Self-regulation"], correctAnswer: "Metacognition" },
    ],
    maths: [
      { id: 3, text: "If the area of a square is 64 sq. cm, what is its perimeter?", options: ["16 cm", "32 cm", "24 cm", "64 cm"], correctAnswer: "32 cm" },
      { id: 8, text: "What is the value of 3/5 + 1/4?", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
      { id: 9, text: "Which of the following is a prime number?", options: ["15", "27", "31", "39"], correctAnswer: "31"},
      // ... 97 more questions for maths in English
      { id: 201, text: "What is the next number in the sequence: 2, 5, 10, 17, ...?", options: ["26", "25", "24", "27"], correctAnswer: "26" },
      { id: 202, text: "The sum of the angles in a triangle is:", options: ["180 degrees", "360 degrees", "90 degrees", "270 degrees"], correctAnswer: "180 degrees" },
      { id: 203, text: "If a car travels 150 km in 3 hours, what is its average speed?", options: ["50 km/h", "45 km/h", "60 km/h", "75 km/h"], correctAnswer: "50 km/h" },
      { id: 204, text: "What is 25% of 200?", options: ["50", "40", "25", "75"], correctAnswer: "50" },
      { id: 205, text: "A rectangle has a length of 12 cm and a width of 5 cm. What is its area?", options: ["60 sq. cm", "17 sq. cm", "34 sq. cm", "50 sq. cm"], correctAnswer: "60 sq. cm" },
      { id: 206, text: "What is the least common multiple (LCM) of 12 and 18?", options: ["36", "18", "72", "6"], correctAnswer: "36" },
      { id: 207, text: "Solve for x: 2x + 5 = 15", options: ["5", "10", "7.5", "2.5"], correctAnswer: "5" },
      { id: 208, text: "The value of Pi (π) is approximately:", options: ["3.14", "3.12", "3.16", "3.18"], correctAnswer: "3.14" },
      { id: 209, text: "A cube has a side length of 4 cm. What is its volume?", options: ["64 cubic cm", "16 cubic cm", "48 cubic cm", "12 cubic cm"], correctAnswer: "64 cubic cm" },
      { id: 210, text: "What is the probability of rolling a 3 on a standard six-sided die?", options: ["1/6", "1/3", "1/2", "3/6"], correctAnswer: "1/6" },
      { id: 211, text: "The greatest common divisor (GCD) of 48 and 72 is:", options: ["24", "12", "48", "6"], correctAnswer: "24" },
      { id: 212, text: "If a shirt costing $20 is sold at a 15% discount, what is the selling price?", options: ["$17", "$15", "$18", "$16"], correctAnswer: "$17" },
      { id: 213, text: "What is the formula for the area of a circle?", options: ["πr²", "2πr", "πd", "2πd"], correctAnswer: "πr²" },
      { id: 214, text: "Which of these is a Pythagorean triplet?", options: ["(6, 8, 10)", "(5, 10, 12)", "(3, 4, 6)", "(7, 9, 11)"], correctAnswer: "(6, 8, 10)" },
      { id: 215, text: "A number is divisible by 9 if:", options: ["The sum of its digits is divisible by 9", "It is an odd number", "Its last digit is 9", "It is an even number"], correctAnswer: "The sum of its digits is divisible by 9" },
    ],
    evs: [
        { id: 4, text: "What is the capital of Karnataka?", options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"], correctAnswer: "Bengaluru" },
        { id: 10, text: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correctAnswer: "Nitrogen"},
        { id: 11, text: "The 'Chipko Movement' is associated with:", options: ["Water conservation", "Forest conservation", "Soil conservation", "Air pollution"], correctAnswer: "Forest conservation"},
        // ... 97 more questions for evs in English
        { id: 301, text: "Which planet is known as the 'Red Planet'?", options: ["Mars", "Venus", "Jupiter", "Saturn"], correctAnswer: "Mars" },
        { id: 302, text: "The process by which plants make their own food is called:", options: ["Photosynthesis", "Respiration", "Transpiration", "Germination"], correctAnswer: "Photosynthesis" },
        { id: 303, text: "What is the main source of energy on Earth?", options: ["The Sun", "The Moon", "Fossil Fuels", "Wind"], correctAnswer: "The Sun" },
        { id: 304, text: "Which of the following is a renewable source of energy?", options: ["Solar Power", "Coal", "Natural Gas", "Petroleum"], correctAnswer: "Solar Power" },
        { id: 305, text: "The layer of air surrounding the Earth is called:", options: ["Atmosphere", "Hydrosphere", "Lithosphere", "Biosphere"], correctAnswer: "Atmosphere" },
        { id: 306, text: "Deficiency of Vitamin C causes which disease?", options: ["Scurvy", "Rickets", "Beriberi", "Night blindness"], correctAnswer: "Scurvy" },
        { id: 307, text: "What is the chemical formula for water?", options: ["H₂O", "CO₂", "O₂", "NaCl"], correctAnswer: "H₂O" },
        { id: 308, text: "The green pigment in plants is called:", options: ["Chlorophyll", "Hemoglobin", "Melanin", "Keratin"], correctAnswer: "Chlorophyll" },
        { id: 309, text: "Which gas do plants absorb from the atmosphere during photosynthesis?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
        { id: 310, text: "The study of earthquakes is called:", options: ["Seismology", "Geology", "Meteorology", "Ecology"], correctAnswer: "Seismology" },
        { id: 311, text: "Which of these is NOT a fossil fuel?", options: ["Wood", "Coal", "Petroleum", "Natural Gas"], correctAnswer: "Wood" },
        { id: 312, text: "The 'Three R's' for waste management stand for:", options: ["Reduce, Reuse, Recycle", "Read, Write, Remember", "Red, Round, Radiant", "Run, Rest, Repeat"], correctAnswer: "Reduce, Reuse, Recycle" },
        { id: 313, text: "The largest mammal on Earth is the:", options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"], correctAnswer: "Blue Whale" },
        { id: 314, text: "Which component of blood helps in clotting?", options: ["Platelets", "Red Blood Cells", "White Blood Cells", "Plasma"], correctAnswer: "Platelets" },
        { id: 315, text: "A food chain always starts with a:", options: ["Producer", "Consumer", "Decomposer", "Scavenger"], correctAnswer: "Producer" },
    ],
    lang1: [
        { id: 5, text: "The 'Right to Education' Act in India was enacted in which year?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "In the word 'unbelievable', what is the prefix?", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
        // ... 98 more questions for lang1 in English
        { id: 401, text: "Which of the following is a synonym for 'happy'?", options: ["Joyful", "Sad", "Angry", "Tired"], correctAnswer: "Joyful" },
        { id: 402, text: "Identify the noun in the sentence: 'The cat sat on the mat.'", options: ["cat, mat", "sat", "on", "the"], correctAnswer: "cat, mat" },
        { id: 403, text: "What is the past tense of the verb 'go'?", options: ["went", "gone", "goed", "going"], correctAnswer: "went" },
        { id: 404, text: "Choose the correct spelling:", options: ["Separate", "Seperate", "Saperate", "Separete"], correctAnswer: "Separate" },
        { id: 405, text: "An antonym for 'brave' is:", options: ["Cowardly", "Strong", "Bold", "Fearless"], correctAnswer: "Cowardly" },
        { id: 406, text: "What type of word is 'quickly'?", options: ["Adverb", "Adjective", "Verb", "Noun"], correctAnswer: "Adverb" },
        { id: 407, text: "Which sentence is grammatically correct?", options: ["She and I went to the store.", "Her and me went to the store.", "Me and her went to the store.", "She and me went to the store."], correctAnswer: "She and I went to the store." },
        { id: 408, text: "A group of lions is called a:", options: ["Pride", "Herd", "Flock", "Pack"], correctAnswer: "Pride" },
        { id: 409, text: "What does the idiom 'bite the bullet' mean?", options: ["Endure a difficult situation", "Eat something quickly", "Go to the dentist", "Fire a gun"], correctAnswer: "Endure a difficult situation" },
        { id: 410, text: "Which punctuation mark is used to show possession?", options: ["Apostrophe", "Comma", "Period", "Question mark"], correctAnswer: "Apostrophe" },
        { id: 411, text: "Identify the preposition in the sentence: 'The book is under the table.'", options: ["under", "book", "is", "table"], correctAnswer: "under" },
        { id: 412, text: "What is the plural form of 'child'?", options: ["children", "childs", "childes", "childrens"], correctAnswer: "children" },
        { id: 413, text: "A person who writes books is an:", options: ["Author", "Actor", "Artist", "Athlete"], correctAnswer: "Author" },
        { id: 414, text: "The main character in a story is called the:", options: ["Protagonist", "Antagonist", "Narrator", "Supporting character"], correctAnswer: "Protagonist" },
        { id: 415, text: "Choose the correct article: 'I saw __ eagle flying.'", options: ["an", "a", "the", "none"], correctAnswer: "an" },
    ]
  },
  kn: {
    cdp: [
      { id: 1, text: "ಪಿಯಾಗೆಟ್‌ನ ಕಾಂಕ್ರೀಟ್ ಆಪರೇಷನಲ್ ಹಂತದ ಗುಣಲಕ್ಷಣ ಯಾವುದು?", options: ["ಅಮೂರ್ತ ತಾರ್ಕಿಕತೆ", "ಅಹಂಕಾರ", "ಸಂರಕ್ಷಣೆ", "ಕಾಲ್ಪನಿಕ ಚಿಂತನೆ"], correctAnswer: "ಸಂರಕ್ಷಣೆ" },
      { id: 2, text: "ವೈಗೋಟ್ಸ್ಕಿಯ ಪ್ರಕಾರ, ಕಲಿಕೆ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ:", options: ["ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ", "ಸಂವೇದನಾಶೀಲ ಹಂತ", "ಕಾರ್ಯಾಚರಣೆಯ ಪೂರ್ವ ಹಂತ", "ಔಪಚಾರಿಕ ಕಾರ್ಯಾಚರಣೆಯ ಹಂತ"], correctAnswer: "ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ" },
      { id: 6, text: "ಎರಿಕ್ಸನ್ ಅವರ 'ಉಪಕ್ರಮ vs. ಅಪರಾಧ' ಹಂತವು ಯಾವ ವಯಸ್ಸಿನ ಗುಂಪಿಗೆ ಅನುರೂಪವಾಗಿದೆ?", options: ["ಶೈಶವಾವಸ್ಥೆ", "ಶಾಲಾಪೂರ್ವ", "ಶಾಲಾ ವಯಸ್ಸು", "ಹದಿಹರೆಯ"], correctAnswer: "ಶಾಲಾಪೂರ್ವ" },
      { id: 7, text: "ರಚನಾತ್ಮಕವಾದದ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಯೆಂದರೆ ಕಲಿಯುವವರು:", options: ["ನಿಷ್ಕ್ರಿಯವಾಗಿ ಮಾಹಿತಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತಾರೆ", "ಸಕ್ರಿಯವಾಗಿ ಜ್ಞಾನವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ", "ಬಹುಮಾನಗಳಿಂದ ಪ್ರೇರೇಪಿಸಲ್ಪಡುತ್ತಾರೆ", "ಅನುಕರಣೆಯ ಮೂಲಕ ಕಲಿಯುತ್ತಾರೆ"], correctAnswer: "ಸಕ್ರಿಯವಾಗಿ ಜ್ಞಾನವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ"},
      // ... 96 more questions for cdp in Kannada
      { id: 101, text: "ವರ್ತನೆವಾದದ ಪಿತಾಮಹ ಎಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?", options: ["ಇವಾನ್ ಪಾವ್ಲೋವ್", "ಬಿ.ಎಫ್. ಸ್ಕಿನ್ನರ್", "ಜಾನ್ ಬಿ. ವ್ಯಾಟ್ಸನ್", "ಎಡ್ವರ್ಡ್ ಥಾರ್ನ್ಡೈಕ್"], correctAnswer: "ಜಾನ್ ಬಿ. ವ್ಯಾಟ್ಸನ್" },
      { id: 102, text: "ಮಾಸ್ಲೋ ಅವರ ಅಗತ್ಯಗಳ ಶ್ರೇಣಿಯು ಯಾವುದರ ಸಿದ್ಧಾಂತವಾಗಿದೆ?", options: ["ಪ್ರೇರಣೆ", "ಕಲಿಕೆ", "ಅಭಿವೃದ್ಧಿ", "ವ್ಯಕ್ತಿತ್ವ"], correctAnswer: "ಪ್ರೇರಣೆ" },
      { id: 103, text: "'ಕಾರ್ಯಕಾರಿ ನಿಯಂತ್ರಣ' ಎಂಬ ಪರಿಕಲ್ಪನೆಯು ಯಾರೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ?", options: ["ಬಿ.ಎಫ್. ಸ್ಕಿನ್ನರ್", "ಇವಾನ್ ಪಾವ್ಲೋವ್", "ಆಲ್ಬರ್ಟ್ ಬಂಡೂರಾ", "ಜೀನ್ ಪಿಯಾಗೆಟ್"], correctAnswer: "ಬಿ.ಎಫ್. ಸ್ಕಿನ್ನರ್" },
      { id: 104, text: "ಹೋವರ್ಡ್ ಗಾರ್ಡ್ನರ್ ಅವರ ಸಿದ್ಧಾಂತವು ಯಾವುದರ ಬಗ್ಗೆ ವ್ಯವಹರಿಸುತ್ತದೆ?", options: ["ಬಹು ಬುದ್ಧಿಮತ್ತೆಗಳು", "ಭಾವನಾತ್ಮಕ ಬುದ್ಧಿಮತ್ತೆ", "ನೈತಿಕ ಅಭಿವೃದ್ಧಿ", "ಅರಿವಿನ ಅಭಿವೃದ್ಧಿ"], correctAnswer: "ಬಹು ಬುದ್ಧಿಮತ್ತೆಗಳು" },
    ],
    maths: [
        { id: 3, text: "ಒಂದು ಚೌಕದ ವಿಸ್ತೀರ್ಣ 64 ಚ.ಸೆಂ.ಮೀ ಆದರೆ, ಅದರ ಪರಿಧಿ ಎಷ್ಟು?", options: ["16 ಸೆಂ.ಮೀ", "32 ಸೆಂ.ಮೀ", "24 ಸೆಂ.ಮೀ", "64 ಸೆಂ.ಮೀ"], correctAnswer: "32 ಸೆಂ.ಮೀ" },
        { id: 8, text: "3/5 + 1/4 ರ ಮೌಲ್ಯವೇನು?", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
        { id: 9, text: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಅವಿಭಾಜ್ಯ ಸಂಖ್ಯೆ?", options: ["15", "27", "31", "39"], correctAnswer: "31"},
        // ... 97 more questions for maths in Kannada
        { id: 201, text: "ಸರಣಿಯ ಮುಂದಿನ ಸಂಖ್ಯೆ ಯಾವುದು: 2, 5, 10, 17, ...?", options: ["26", "25", "24", "27"], correctAnswer: "26" },
        { id: 202, text: "ಒಂದು ತ್ರಿಭುಜದ ಕೋನಗಳ ಮೊತ್ತ:", options: ["180 ಡಿಗ್ರಿ", "360 ಡಿಗ್ರಿ", "90 ಡಿಗ್ರಿ", "270 ಡಿಗ್ರಿ"], correctAnswer: "180 ಡಿಗ್ರಿ" },
        { id: 203, text: "ಒಂದು ಕಾರು 3 ಗಂಟೆಗಳಲ್ಲಿ 150 ಕಿ.ಮೀ ಪ್ರಯಾಣಿಸಿದರೆ, ಅದರ ಸರಾಸರಿ ವೇಗವೆಷ್ಟು?", options: ["50 ಕಿ.ಮೀ/ಗಂಟೆ", "45 ಕಿ.ಮೀ/ಗಂಟೆ", "60 ಕಿ.ಮೀ/ಗಂಟೆ", "75 ಕಿ.ಮೀ/ಗಂಟೆ"], correctAnswer: "50 ಕಿ.ಮೀ/ಗಂಟೆ" },
        { id: 204, text: "200 ರ 25% ಎಷ್ಟು?", options: ["50", "40", "25", "75"], correctAnswer: "50" },
    ],
    evs: [
        { id: 4, text: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?", options: ["ಮೈಸೂರು", "ಬೆಂಗಳೂರು", "ಮಂಗಳೂರು", "ಹುಬ್ಬಳ್ಳಿ"], correctAnswer: "ಬೆಂಗಳೂರು" },
        { id: 10, text: "ಭೂಮಿಯ ವಾತಾವರಣದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಇರುವ ಅನಿಲ ಯಾವುದು?", options: ["ಆಮ್ಲಜನಕ", "ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್", "ಸಾರಜನಕ", "ಆರ್ಗಾನ್"], correctAnswer: "ಸಾರಜನಕ"},
        { id: 11, text: "'ಚಿಪ್ಕೊ ಚಳುವಳಿ' ಯಾವುದಕ್ಕೆ ಸಂಬಂಧಿಸಿದೆ:", options: ["ಜಲ ಸಂರಕ್ಷಣೆ", "ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ", "ಮಣ್ಣು ಸಂರಕ್ಷಣೆ", "ವಾಯು ಮಾಲಿನ್ಯ"], correctAnswer: "ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ"},
        // ... 97 more questions for evs in Kannada
        { id: 301, text: "ಯಾವ ಗ್ರಹವನ್ನು 'ಕೆಂಪು ಗ್ರಹ' ಎಂದು ಕರೆಯುತ್ತಾರೆ?", options: ["ಮಂಗಳ", "ಶುಕ್ರ", "ಗುರು", "ಶನಿ"], correctAnswer: "ಮಂಗಳ" },
        { id: 302, text: "ಸಸ್ಯಗಳು ತಮ್ಮ ಆಹಾರವನ್ನು ತಾವೇ ತಯಾರಿಸುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಏನೆಂದು ಕರೆಯುತ್ತಾರೆ?", options: ["ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ", "ಉಸಿರಾಟ", "ಬಾಷ್ಪೀಕರಣ", "ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ"], correctAnswer: "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ" },
        { id: 303, text: "ಭೂಮಿಯ ಮೇಲಿನ ಶಕ್ತಿಯ ಮುಖ್ಯ ಮೂಲ ಯಾವುದು?", options: ["ಸೂರ್ಯ", "ಚಂದ್ರ", "ಪಳೆಯುಳಿಕೆ ಇಂಧನಗಳು", "ಗಾಳಿ"], correctAnswer: "ಸೂರ್ಯ" },
        { id: 304, text: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ ಮೂಲ?", options: ["ಸೌರಶಕ್ತಿ", "ಕಲ್ಲಿದ್ದಲು", "ನೈಸರ್ಗಿಕ ಅನಿಲ", "ಪೆಟ್ರೋಲಿಯಂ"], correctAnswer: "ಸೌರಶಕ್ತಿ" },
    ],
    lang1: [
        { id: 5, text: "ಭಾರತದಲ್ಲಿ 'ಶಿಕ್ಷಣ ಹಕ್ಕು' ಕಾಯ್ದೆಯನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ಜಾರಿಗೊಳಿಸಲಾಯಿತು?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "'unbelievable' ಪದದಲ್ಲಿ, ಪೂರ್ವಪ್ರತ್ಯಯ ಯಾವುದು?", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
        // ... 98 more questions for lang1 in Kannada
        { id: 401, text: "'ಸಂತೋಷ' ಪದಕ್ಕೆ ಸಮಾನಾರ್ಥಕ ಪದ ಯಾವುದು?", options: ["ಆನಂದ", "ದುಃಖ", "ಕೋಪ", "ಆಯಾಸ"], correctAnswer: "ಆನಂದ" },
        { id: 402, text: "ವಾಕ್ಯದಲ್ಲಿ ನಾಮಪದವನ್ನು ಗುರುತಿಸಿ: 'ಬೆಕ್ಕು ಚಾಪೆಯ ಮೇಲೆ ಕುಳಿತಿತ್ತು.'", options: ["ಬೆಕ್ಕು, ಚಾಪೆ", "ಕುಳಿತಿತ್ತು", "ಮೇಲೆ", "ಆ"], correctAnswer: "ಬೆಕ್ಕು, ಚಾಪೆ" },
        { id: 403, text: "'ಹೋಗು' ಕ್ರಿಯಾಪದದ ಭೂತಕಾಲದ ರೂಪ ಯಾವುದು?", options: ["ಹೋದನು", "ಹೋಗಿದ್ದಾನೆ", "ಹೋಗಿದ್ದ", "ಹೋಗುತ್ತಿದ್ದಾನೆ"], correctAnswer: "ಹೋದನು" },
        { id: 404, text: "ಸರಿಯಾದ ಕಾಗುಣಿತವನ್ನು ಆರಿಸಿ:", options: ["ಪ್ರತ್ಯೇಕ", "ಪ್ರತೆಯೇಕ", "ಪ್ರತ್ಯಕ", "ಪ್ರತೇಕ"], correctAnswer: "ಪ್ರತ್ಯೇಕ" },
    ]
  },
  ur: {
    cdp: [
      { id: 1, text: "پیاجے کے ٹھوس عملی مرحلے کی خصوصیت کیا ہے؟", options: ["خلاصہ استدلال", "خود پسندی", "تحفظ", "فرضی سوچ"], correctAnswer: "تحفظ" },
      { id: 2, text: "وائیگاٹسکی کے مطابق، سیکھنے کا عمل کہاں ہوتا ہے:", options: ["قریبی ترقی کا زون", "حسی حرکی مرحلہ", "پری آپریشنل مرحلہ", "رسمی آپریشنل مرحلہ"], correctAnswer: "قریبی ترقی کا زون" },
      { id: 6, text: "ایرکسن کا 'پہل بمقابلہ جرم' کا مرحلہ کس عمر کے گروپ سے مطابقت رکھتا ہے؟", options: ["بچپن", "پری اسکول", "اسکول کی عمر", "جوانی"], correctAnswer: "پری اسکول" },
      { id: 7, text: "تعمیر پسندی کا ایک کلیدی تصور یہ ہے کہ سیکھنے والے:", options: ["غیر فعال طور پر معلومات حاصل کرتے ہیں", "فعال طور پر علم کی تعمیر کرتے ہیں", "انعامات سے حوصلہ افزائی کرتے ہیں", "نقل کے ذریعے سیکھتے ہیں"], correctAnswer: "فعال طور پر علم کی تعمیر کرتے ہیں"},
      // ... 96 more questions for cdp in Urdu
      { id: 101, text: "کرداریت کا باپ کسے کہا جاتا ہے؟", options: ["ایوان پاولوف", "بی ایف سکنر", "جان بی واٹسن", "ایڈورڈ تھورنڈائیک"], correctAnswer: "جان بی واٹسن" },
      { id: 102, text: "ماسلو کی ضروریات کا درجہ بندی نظریہ کس چیز کا ہے؟", options: ["ترغیب", "سیکھنا", "ترقی", "شخصیت"], correctAnswer: "ترغیب" },
      { id: 103, text: "آپریٹنگ کنڈیشنگ کا تصور کس سے وابستہ ہے؟", options: ["بی ایف سکنر", "ایوان پاولوف", "البرٹ بنڈورا", "جین پیاجے"], correctAnswer: "بی ایف سکنر" },
      { id: 104, text: "ہاورڈ گارڈنر کا نظریہ کس چیز سے متعلق ہے؟", options: ["متعدد ذہانتیں", "جذباتی ذہانت", "اخلاقی ترقی", "علمی ترقی"], correctAnswer: "متعدد ذہانتیں" },
    ],
    maths: [
        { id: 3, text: "اگر ایک مربع کا رقبہ 64 مربع سینٹی میٹر ہے، تو اس کا احاطہ کیا ہے؟", options: ["16 سینٹی میٹر", "32 سینٹی میٹر", "24 سینٹی میٹر", "64 سینٹی میٹر"], correctAnswer: "32 سینٹی میٹر" },
        { id: 8, text: "3/5 + 1/4 کی قیمت کیا ہے؟", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
        { id: 9, text: "مندرجہ ذیل میں سے کون سا عدد مفرد ہے؟", options: ["15", "27", "31", "39"], correctAnswer: "31"},
        // ... 97 more questions for maths in Urdu
        { id: 201, text: "اس ترتیب میں اگلا نمبر کیا ہے: 2, 5, 10, 17, ...?", options: ["26", "25", "24", "27"], correctAnswer: "26" },
        { id: 202, text: "ایک مثلث کے زاویوں کا مجموعہ کیا ہوتا ہے؟", options: ["180 ڈگری", "360 ڈگری", "90 ڈگری", "270 ڈگری"], correctAnswer: "180 ڈگری" },
        { id: 203, text: "اگر ایک کار 3 گھنٹے میں 150 کلومیٹر کا سفر کرتی ہے، تو اس کی اوسط رفتار کیا ہے؟", options: ["50 کلومیٹر/گھنٹہ", "45 کلومیٹر/گھنٹہ", "60 کلومیٹر/گھنٹہ", "75 کلومیٹر/گھنٹہ"], correctAnswer: "50 کلومیٹر/گھنٹہ" },
        { id: 204, text: "200 کا 25% کیا ہے؟", options: ["50", "40", "25", "75"], correctAnswer: "50" },
    ],
    evs: [
        { id: 4, text: "کرناٹک کا دارالحکومت کیا ہے؟", options: ["میسور", "بنگلورو", "منگلورو", "ہبلی"], correctAnswer: "بنگلورو" },
        { id: 10, text: "زمین کی فضا میں سب سے زیادہ کون سی گیس پائی جاتی ہے؟", options: ["آکسیجن", "کاربن ڈائی آکسائیڈ", "نائٹروجن", "آرگن"], correctAnswer: "نائٹروجن"},
        { id: 11, text: "'چپکو تحریک' کس سے وابستہ ہے:", options: ["پانی کا تحفظ", "جنگلات کا تحفظ", "مٹی کا تحفظ", "فضائی آلودگی"], correctAnswer: "جنگلات کا تحفظ"},
        // ... 97 more questions for evs in Urdu
        { id: 301, text: "کس سیارے کو 'سرخ سیارہ' کہا جاتا ہے؟", options: ["مریخ", "زہرہ", "مشتری", "زحل"], correctAnswer: "مریخ" },
        { id: 302, text: "وہ عمل جس کے ذریعے پودے اپنی خوراک خود بناتے ہیں اسے کیا کہتے ہیں؟", options: ["ضیائی تالیف", "تنفس", "تبخیر", "اگنا"], correctAnswer: "ضیائی تالیف" },
        { id: 303, text: "زمین پر توانائی کا بنیادی ذریعہ کیا ہے؟", options: ["سورج", "چاند", "جیواشم ایندھن", "ہوا"], correctAnswer: "سورج" },
        { id: 304, text: "مندرجہ ذیل میں سے کون سا توانائی کا قابل تجدید ذریعہ ہے؟", options: ["شمسی توانائی", "کوئلہ", "قدرتی گیس", "پٹرولیم"], correctAnswer: "شمسی توانائی" },
    ],
    lang1: [
        { id: 5, text: "ہندوستان میں 'تعلیم کا حق' ایکٹ کس سال نافذ کیا گیا؟", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "لفظ 'unbelievable' میں، سابقہ کیا ہے؟", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
        // ... 98 more questions for lang1 in Urdu
        { id: 401, text: "خوش کا مترادف کیا ہے؟", options: ["مسرت بخش", "غمگین", "ناراض", "تھکا ہوا"], correctAnswer: "مسرت بخش" },
        { id: 402, text: "اس جملے میں اسم کی شناخت کریں: 'بلی چٹائی پر بیٹھی۔'", options: ["بلی، چٹائی", "بیٹھی", "پر", "وہ"], correctAnswer: "بلی، چٹائی" },
        { id: 403, text: "فعل 'go' کا ماضی کیا ہے؟", options: ["went", "gone", "goed", "going"], correctAnswer: "went" },
        { id: 404, text: "صحیح ہجے کا انتخاب کریں:", options: ["Separate", "Seperate", "Saperate", "Separete"], correctAnswer: "Separate" },
    ]
  }
};

export default function PracticePage() {
    const [language, setLanguage] = useState("en");
    const [topic, setTopic] = useState("cdp");
    const [questions, setQuestions] = useState(allQuestions[language][topic] || []);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(questions[0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);

    const topics: Record<string, any> = {
        en: {
            "cdp": "Child Development and Pedagogy",
            "lang1": "Language I",
            "lang2": "Language II",
            "maths": "Mathematics",
            "evs": "Environmental Studies",
        },
        kn: {
            "cdp": "ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಶಿಕ್ಷಣಶಾಸ್ತ್ರ",
            "lang1": "ಭಾಷೆ I",
            "lang2": "ಭಾಷೆ II",
            "maths": "ಗಣಿತ",
            "evs": "ಪರಿಸರ ಅಧ್ಯಯನ",
        },
        ur: {
            "cdp": "بچوں کی ترقی اور درس و تدریس",
            "lang1": "زبان اول",
            "lang2": "زبان دوم",
            "maths": "ریاضی",
            "evs": "ماحولیاتی مطالعہ",
        }
    };

    useEffect(() => {
        const newQuestions = allQuestions[language]?.[topic] || [];
        setQuestions(newQuestions);
        if (newQuestions.length > 0) {
            setCurrentQuestion(newQuestions[Math.floor(Math.random() * newQuestions.length)]);
        } else {
            setCurrentQuestion(undefined);
        }
        setFeedback(null);
        setSelectedOption(null);
    }, [language, topic]);

    const fetchNewQuestion = () => {
        setFeedback(null);
        setSelectedOption(null);
        if (questions.length > 0) {
            const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
            setCurrentQuestion(nextQuestion);
        }
    };

    const handleCheckAnswer = () => {
        if (!selectedOption || !currentQuestion) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        const correctMessage: Record<string, string> = {
          en: "Correct!",
          kn: "ಸರಿಯಾಗಿದೆ!",
          ur: "صحیح!",
        };
        const incorrectMessage: Record<string, string> = {
            en: `The correct answer is: ${currentQuestion.correctAnswer}`,
            kn: `ಸರಿಯಾದ ಉತ್ತರ: ${currentQuestion.correctAnswer}`,
            ur: `صحیح جواب ہے: ${currentQuestion.correctAnswer}`,
        }
        setFeedback({
            correct: isCorrect,
            message: isCorrect ? correctMessage[language] : incorrectMessage[language]
        });
    };
    
    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };

    const handleTopicChange = (newTopic: string) => {
        setTopic(newTopic);
    };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Practice Questions</h1>
        <p className="text-muted-foreground mt-2">
          Select your preferences and start practicing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                  <SelectItem value="ur">اردو (Urdu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={handleTopicChange}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdp">{topics[language]?.cdp ?? 'Child Development and Pedagogy'}</SelectItem>
                  <SelectItem value="lang1">{topics[language]?.lang1 ?? 'Language I'}</SelectItem>
                  <SelectItem value="lang2">{topics[language]?.lang2 ?? 'Language II'}</SelectItem>
                  <SelectItem value="maths">{topics[language]?.maths ?? 'Mathematics'}</SelectItem>
                  <SelectItem value="evs">{topics[language]?.evs ?? 'Environmental Studies'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          {currentQuestion && <CardTitle className="font-headline text-xl flex justify-between items-center">
            <span>Question</span>
            <Button variant="outline" size="sm" onClick={fetchNewQuestion}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Update New Question
            </Button>
            </CardTitle>}
          {currentQuestion && <CardDescription>{topics[language]?.[topic]}</CardDescription>}
        </CardHeader>
        {currentQuestion ? (
        <>
            <CardContent>
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} disabled={!!feedback}>
                {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
                ))}
            </RadioGroup>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-4">
                {feedback && (
                    <Alert variant={feedback.correct ? "default" : "destructive"} className="bg-opacity-20">
                        {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle>{feedback.correct ? "Correct!" : "Incorrect"}</AlertTitle>
                        <AlertDescription>
                            {feedback.message}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-end gap-4">
                    {feedback ? (
                        <Button onClick={fetchNewQuestion}>Next Question</Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={fetchNewQuestion}>Skip</Button>
                            <Button onClick={handleCheckAnswer} disabled={!selectedOption}>Check Answer</Button>
                        </>
                    )}
                </div>
            </CardFooter>
        </>
        ) : (
            <CardContent>
                <p>No questions available for the selected language and topic.</p>
            </CardContent>
        )}
      </Card>
    </div>
  );
}

    