import type { Subject } from '@/types/quiz';
import { Calculator, FlaskConical, ScrollText, Globe2, Brain, Atom } from 'lucide-react';

export const quizSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    Icon: Calculator,
    description: 'Test your numerical and logical reasoning skills.',
    levels: [
      {
        id: 'math-l1',
        name: 'Beginner Arithmetic',
        passingThreshold: 0.7,
        questions: [
          { id: 'm1q1', text: 'What is 2 + 2?', options: [{id: 'a', text: '3'}, {id: 'b', text: '4'}, {id: 'c', text: '5'}], correctOptionId: 'b', explanation: '2 + 2 equals 4.' },
          { id: 'm1q2', text: 'What is 5 - 3?', options: [{id: 'a', text: '1'}, {id: 'b', text: '2'}, {id: 'c', text: '3'}], correctOptionId: 'b', explanation: '5 - 3 equals 2.' },
          { id: 'm1q3', text: 'What is 3 * 2?', options: [{id: 'a', text: '5'}, {id: 'b', text: '6'}, {id: 'c', text: '7'}], correctOptionId: 'b', explanation: '3 multiplied by 2 is 6.' },
        ],
        remedialQuestions: [
          { id: 'm1r1', text: 'Count the apples: 🍎 + 🍎 = ?', options: [{id: 'a', text: '1'}, {id: 'b', text: '2'}, {id: 'c', text: '3'}], correctOptionId: 'b', explanation: 'There are two apples.' },
        ]
      },
      {
        id: 'math-l2',
        name: 'Intermediate Algebra',
        passingThreshold: 0.7,
        questions: [
          { id: 'm2q1', text: 'Solve for x: x + 5 = 10', options: [{id: 'a', text: '3'}, {id: 'b', text: '5'}, {id: 'c', text: '15'}], correctOptionId: 'b', explanation: 'If x + 5 = 10, then x = 10 - 5, so x = 5.' },
          { id: 'm2q2', text: 'What is the square root of 9?', options: [{id: 'a', text: '2'}, {id: 'b', text: '3'}, {id: 'c', text: '4'}], correctOptionId: 'b', explanation: 'The square root of 9 is 3, because 3 * 3 = 9.' },
        ],
      }
    ],
  },
  {
    id: 'science',
    name: 'Science',
    Icon: FlaskConical,
    description: 'Explore the wonders of the natural world.',
    levels: [
      {
        id: 'sci-l1',
        name: 'Basic Biology',
        passingThreshold: 0.7,
        questions: [
          { id: 's1q1', text: 'What gas do plants absorb from the atmosphere?', options: [{id: 'a', text: 'Oxygen'}, {id: 'b', text: 'Nitrogen'}, {id: 'c', text: 'Carbon Dioxide'}], correctOptionId: 'c', explanation: 'Plants absorb Carbon Dioxide for photosynthesis.' },
          { id: 's1q2', text: 'How many legs does a spider have?', options: [{id: 'a', text: '6'}, {id: 'b', text: '8'}, {id: 'c', text: '10'}], correctOptionId: 'b', explanation: 'Spiders are arachnids and typically have 8 legs.' },
        ],
      },
    ],
  },
  {
    id: 'history',
    name: 'History',
    Icon: ScrollText,
    description: 'Journey through the events that shaped our world.',
    levels: [
      {
        id: 'hist-l1',
        name: 'Ancient Civilizations',
        passingThreshold: 0.6, // একটু সহজ
        questions: [
          { id: 'h1q1', text: 'Which ancient civilization built the pyramids?', options: [{id: 'a', text: 'Roman'}, {id: 'b', text: 'Greek'}, {id: 'c', text: 'Egyptian'}], correctOptionId: 'c', explanation: 'The ancient Egyptians are famous for building the pyramids.' },
          { id: 'h1q2', text: 'Who was the first Roman Emperor?', options: [{id: 'a', text: 'Julius Caesar'}, {id: 'b', text: 'Augustus'}, {id: 'c', text: 'Nero'}], correctOptionId: 'b', explanation: 'Augustus is considered the first Roman Emperor.' },
        ],
      },
    ],
  },
  {
    id: 'geography',
    name: 'Geography',
    Icon: Globe2,
    description: 'Discover the Earth and its features.',
    levels: [
      {
        id: 'geo-l1',
        name: 'World Capitals',
        passingThreshold: 0.7,
        questions: [
          { id: 'g1q1', text: 'What is the capital of France?', options: [{id: 'a', text: 'London'}, {id: 'b', text: 'Berlin'}, {id: 'c', text: 'Paris'}], correctOptionId: 'c', explanation: 'Paris is the capital of France.' },
          { id: 'g1q2', text: 'What is the capital of Japan?', options: [{id: 'a', text: 'Beijing'}, {id: 'b', text: 'Seoul'}, {id: 'c', text: 'Tokyo'}], correctOptionId: 'c', explanation: 'Tokyo is the capital of Japan.' },
        ],
      },
    ],
  },
   {
    id: 'general',
    name: 'General Knowledge',
    Icon: Brain,
    description: 'A mix of topics to challenge your mind.',
    levels: [
      {
        id: 'gk-l1',
        name: 'Trivia Fun',
        passingThreshold: 0.7,
        questions: [
          { id: 'gk1q1', text: 'How many colors are in a rainbow?', options: [{id: 'a', text: '5'}, {id: 'b', text: '7'}, {id: 'c', text: '9'}], correctOptionId: 'b', explanation: 'There are 7 colors in a rainbow: Red, Orange, Yellow, Green, Blue, Indigo, Violet.' },
          { id: 'gk1q2', text: 'What is the largest planet in our solar system?', options: [{id: 'a', text: 'Earth'}, {id: 'b', text: 'Mars'}, {id: 'c', text: 'Jupiter'}], correctOptionId: 'c', explanation: 'Jupiter is the largest planet in our solar system.' },
        ],
      },
    ],
  },
  {
    id: 'physics',
    name: 'Physics',
    Icon: Atom,
    description: 'Understand the fundamental laws of the universe.',
    levels: [
      {
        id: 'phy-l1',
        name: 'Basic Concepts',
        passingThreshold: 0.7,
        questions: [
          { id: 'ph1q1', text: 'What force keeps us on the ground?', options: [{id: 'a', text: 'Magnetism'}, {id: 'b', text: 'Gravity'}, {id: 'c', text: 'Friction'}], correctOptionId: 'b', explanation: 'Gravity is the force that attracts objects towards each other, keeping us on Earth.' },
          { id: 'ph1q2', text: 'What is the unit of energy?', options: [{id: 'a', text: 'Watt'}, {id: 'b', text: 'Newton'}, {id: 'c', text: 'Joule'}], correctOptionId: 'c', explanation: 'The Joule is the standard unit of energy in the International System of Units (SI).' },
        ],
      },
    ],
  }
];
