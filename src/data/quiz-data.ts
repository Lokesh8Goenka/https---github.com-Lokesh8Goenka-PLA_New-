
import type { Subject } from '@/types/quiz';
import { ScrollText, Globe2, Landmark, Scale } from 'lucide-react';

export const quizSubjects: Subject[] = [
  {
    id: 'history',
    name: 'History',
    Icon: ScrollText,
    description: 'Journey through the events that shaped our world.',
    levels: [
      {
        id: 'hist-l1',
        name: 'Ancient Civilizations & Empires',
        passingThreshold: 0.7,
        questions: [
          { id: 'h1q1', text: 'Which ancient civilization built the pyramids in Giza?', options: [{id: 'a', text: 'Roman'}, {id: 'b', text: 'Greek'}, {id: 'c', text: 'Egyptian'}], correctOptionId: 'c', explanation: 'The ancient Egyptians are famous for building the pyramids in Giza.' },
          { id: 'h1q2', text: 'Who was the first Roman Emperor?', options: [{id: 'a', text: 'Julius Caesar'}, {id: 'b', text: 'Augustus'}, {id: 'c', text: 'Nero'}], correctOptionId: 'b', explanation: 'Augustus (formerly Octavian) is considered the first Roman Emperor.' },
          { id: 'h1q3', text: 'What famous conqueror from Macedonia created a vast empire stretching from Greece to northwestern India?', options: [{id: 'a', text: 'Genghis Khan'}, {id: 'b', text: 'Alexander the Great'}, {id: 'c', text: 'Napoleon Bonaparte'}], correctOptionId: 'b', explanation: 'Alexander the Great of Macedon was one of history\'s most successful military commanders, creating a vast empire.' },
        ],
        remedialQuestions: [
          { id: 'h1r1', text: 'The Great Wall is a famous landmark primarily associated with which country?', options: [{id: 'a', text: 'India'}, {id: 'b', text: 'China'}, {id: 'c', text: 'Egypt'}], correctOptionId: 'b', explanation: 'The Great Wall of China is a series of fortifications built to protect against invasions.' },
        ]
      },
    ],
  },
  {
    id: 'geography',
    name: 'Geography',
    Icon: Globe2,
    description: 'Discover the Earth, its features, and inhabitants.',
    levels: [
      {
        id: 'geo-l1',
        name: 'World Features & Capitals',
        passingThreshold: 0.7,
        questions: [
          { id: 'g1q1', text: 'What is the capital of France?', options: [{id: 'a', text: 'London'}, {id: 'b', text: 'Berlin'}, {id: 'c', text: 'Paris'}], correctOptionId: 'c', explanation: 'Paris is the capital and largest city of France.' },
          { id: 'g1q2', text: 'What is the capital of Japan?', options: [{id: 'a', text: 'Beijing'}, {id: 'b', text: 'Seoul'}, {id: 'c', text: 'Tokyo'}], correctOptionId: 'c', explanation: 'Tokyo is the capital and largest city of Japan.' },
          { id: 'g1q3', text: 'Which is traditionally considered the longest river in the world?', options: [{id: 'a', text: 'Amazon River'}, {id: 'b', text: 'Nile River'}, {id: 'c', text: 'Yangtze River'}], correctOptionId: 'b', explanation: 'The Nile River in Africa is traditionally cited as the longest river in the world.' },
        ],
        remedialQuestions: [
          { id: 'g1r1', text: 'Which continent is known as the "Land Down Under"?', options: [{id: 'a', text: 'Africa'}, {id: 'b', text: 'Australia'}, {id: 'c', text: 'South America'}], correctOptionId: 'b', explanation: 'Australia is often referred to as the "Land Down Under" due to its location in the Southern Hemisphere.' },
        ]
      },
    ],
  },
  {
    id: 'economics',
    name: 'Economics',
    Icon: Landmark,
    description: 'Understand principles of production, distribution, and consumption.',
    levels: [
      {
        id: 'econ-l1',
        name: 'Basic Economic Principles',
        passingThreshold: 0.7,
        questions: [
          { id: 'e1q1', text: 'What is the fundamental problem of economics?', options: [{id: 'a', text: 'Inflation'}, {id: 'b', text: 'Scarcity'}, {id: 'c', text: 'Unemployment'}], correctOptionId: 'b', explanation: 'Scarcity, the gap between limited resources and limitless wants, is the fundamental economic problem.' },
          { id: 'e1q2', text: 'What does GDP stand for?', options: [{id: 'a', text: 'General Domestic Product'}, {id: 'b', text: 'Gross Domestic Product'}, {id: 'c', text: 'Global Development Program'}], correctOptionId: 'b', explanation: 'GDP stands for Gross Domestic Product, the total value of goods and services produced in a country.' },
          { id: 'e1q3', text: 'Which of these is a primary type of economic system?', options: [{id: 'a', text: 'Monarchy'}, {id: 'b', text: 'Capitalism'}, {id: 'c', text: 'Oligarchy'}], correctOptionId: 'b', explanation: 'Capitalism is a major economic system. Monarchy and Oligarchy are forms of government.' },
        ],
        remedialQuestions: [
           { id: 'e1r1', text: 'If you have 1 toy but 2 friends want it, this situation represents?', options: [{id: 'a', text: 'Plenty'}, {id: 'b', text: 'Scarcity'}, {id: 'c', text: 'Trade'}], correctOptionId: 'b', explanation: 'Scarcity means there isn\'t enough of something for everyone who wants it.' },
        ]
      },
    ],
  },
  {
    id: 'pol-sci',
    name: 'Political Science',
    Icon: Scale,
    description: 'Study systems of governance, political activities, and political behavior.',
    levels: [
      {
        id: 'ps-l1',
        name: 'Fundamentals of Governance',
        passingThreshold: 0.7,
        questions: [
          { id: 'ps1q1', text: 'In the USA, what are the three main branches of government?', options: [{id: 'a', text: 'Executive, Legislative, Judicial'}, {id: 'b', text: 'Federal, State, Local'}, {id: 'c', text: 'Presidential, Congressional, Senatorial'}], correctOptionId: 'a', explanation: 'The U.S. government is divided into the Executive, Legislative, and Judicial branches to ensure a separation of powers.' },
          { id: 'ps1q2', text: 'What is a key characteristic of a democracy?', options: [{id: 'a', text: 'Rule by a single, unelected leader'}, {id: 'b', text: 'Citizens have the power to elect their leaders'}, {id: 'c', text: 'State control of all media'}], correctOptionId: 'b', explanation: 'Democracy is a system of government where citizens exercise power by voting and electing representatives.' },
          { id: 'ps1q3', text: 'What is a constitution?', options: [{id: 'a', text: 'A list of current political leaders'}, {id: 'b', text: 'A set of fundamental principles or established precedents by which a state is governed.'}, {id: 'c', text: 'A temporary decree by a ruler'}], correctOptionId: 'b', explanation: 'A constitution outlines the fundamental principles, laws, and structure of a government.' },
        ],
        remedialQuestions: [
          { id: 'ps1r1', text: 'In a democracy, how do citizens typically choose their leaders?', options: [{id: 'a', text: 'By birthright'}, {id: 'b', text: 'Through voting'}, {id: 'c', text: 'By appointment from the previous leader'}], correctOptionId: 'b', explanation: 'Voting is the primary mechanism for citizens to choose leaders in a democratic system.' },
        ]
      },
    ],
  }
];
