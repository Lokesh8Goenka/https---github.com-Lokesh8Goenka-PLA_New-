
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
        passingThreshold: 0.6, // Corresponds to 3/5 if extended path is taken
        questions: [
          { id: 'h1q1', text: 'Which ancient civilization built the pyramids in Giza?', options: [{id: 'a', text: 'Roman'}, {id: 'b', text: 'Greek'}, {id: 'c', text: 'Egyptian'}], correctOptionId: 'c', explanation: 'The ancient Egyptians are famous for building the pyramids in Giza.' },
          { id: 'h1q2', text: 'Who was the first Roman Emperor?', options: [{id: 'a', text: 'Julius Caesar'}, {id: 'b', text: 'Augustus'}, {id: 'c', text: 'Nero'}], correctOptionId: 'b', explanation: 'Augustus (formerly Octavian) is considered the first Roman Emperor.' },
          { id: 'h1q3', text: 'What famous conqueror from Macedonia created a vast empire stretching from Greece to northwestern India?', options: [{id: 'a', text: 'Genghis Khan'}, {id: 'b', text: 'Alexander the Great'}, {id: 'c', text: 'Napoleon Bonaparte'}], correctOptionId: 'b', explanation: 'Alexander the Great of Macedon was one of history\'s most successful military commanders.' },
          { id: 'h1q4', text: 'The Renaissance began in which European country?', options: [{id: 'a', text: 'France'}, {id: 'b', text: 'Italy'}, {id: 'c', text: 'Spain'}], correctOptionId: 'b', explanation: 'The Renaissance is a period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries, characterized by an effort to revive and surpass ideas and achievements of classical antiquity. It started in Italy.' },
          { id: 'h1q5', text: 'World War I primarily took place in which decade?', options: [{id: 'a', text: '1900s'}, {id: 'b', text: '1910s'}, {id: 'c', text: '1920s'}], correctOptionId: 'b', explanation: 'World War I began in 1914 and ended in 1918.' },
        ],
        // remedialQuestions removed
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
        passingThreshold: 0.6,
        questions: [
          { id: 'g1q1', text: 'What is the capital of France?', options: [{id: 'a', text: 'London'}, {id: 'b', text: 'Berlin'}, {id: 'c', text: 'Paris'}], correctOptionId: 'c', explanation: 'Paris is the capital and largest city of France.' },
          { id: 'g1q2', text: 'What is the capital of Japan?', options: [{id: 'a', text: 'Beijing'}, {id: 'b', text: 'Seoul'}, {id: 'c', text: 'Tokyo'}], correctOptionId: 'c', explanation: 'Tokyo is the capital and largest city of Japan.' },
          { id: 'g1q3', text: 'Which is traditionally considered the longest river in the world?', options: [{id: 'a', text: 'Amazon River'}, {id: 'b', text: 'Nile River'}, {id: 'c', text: 'Yangtze River'}], correctOptionId: 'b', explanation: 'The Nile River in Africa is traditionally cited as the longest river in the world.' },
          { id: 'g1q4', text: 'Mount Everest, the world\'s highest peak, is located in which mountain range?', options: [{id: 'a', text: 'Andes'}, {id: 'b', text: 'Alps'}, {id: 'c', text: 'Himalayas'}], correctOptionId: 'c', explanation: 'Mount Everest is part of the Himalayas mountain range.' },
          { id: 'g1q5', text: 'Which desert is the largest hot desert in the world?', options: [{id: 'a', text: 'Gobi Desert'}, {id: 'b', text: 'Sahara Desert'}, {id: 'c', text: 'Arabian Desert'}], correctOptionId: 'b', explanation: 'The Sahara Desert in Africa is the largest hot desert in the world.' },
        ],
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
        passingThreshold: 0.6,
        questions: [
          { id: 'e1q1', text: 'What is the fundamental problem of economics?', options: [{id: 'a', text: 'Inflation'}, {id: 'b', text: 'Scarcity'}, {id: 'c', text: 'Unemployment'}], correctOptionId: 'b', explanation: 'Scarcity, the gap between limited resources and limitless wants, is the fundamental economic problem.' },
          { id: 'e1q2', text: 'What does GDP stand for?', options: [{id: 'a', text: 'General Domestic Product'}, {id: 'b', text: 'Gross Domestic Product'}, {id: 'c', text: 'Global Development Program'}], correctOptionId: 'b', explanation: 'GDP stands for Gross Domestic Product, the total value of goods and services produced in a country.' },
          { id: 'e1q3', text: 'Which of these is a primary type of economic system?', options: [{id: 'a', text: 'Monarchy'}, {id: 'b', text: 'Capitalism'}, {id: 'c', text: 'Oligarchy'}], correctOptionId: 'b', explanation: 'Capitalism is a major economic system. Monarchy and Oligarchy are forms of government.' },
          { id: 'e1q4', text: 'What is "inflation"?', options: [{id: 'a', text: 'A decrease in the general price level'}, {id: 'b', text: 'An increase in the general price level'}, {id: 'c', text: 'A period of high unemployment'}], correctOptionId: 'b', explanation: 'Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling.' },
          { id: 'e1q5', text: 'Supply and demand primarily determine what in a market economy?', options: [{id: 'a', text: 'Government regulations'}, {id: 'b', text: 'Prices and quantities'}, {id: 'c', text: 'Company profits only'}], correctOptionId: 'b', explanation: 'In a market economy, the interaction of supply and demand is the primary determinant of prices and quantities of goods and services.' },
        ],
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
        passingThreshold: 0.6,
        questions: [
          { id: 'ps1q1', text: 'In the USA, what are the three main branches of government?', options: [{id: 'a', text: 'Executive, Legislative, Judicial'}, {id: 'b', text: 'Federal, State, Local'}, {id: 'c', text: 'Presidential, Congressional, Senatorial'}], correctOptionId: 'a', explanation: 'The U.S. government is divided into the Executive, Legislative, and Judicial branches to ensure a separation of powers.' },
          { id: 'ps1q2', text: 'What is a key characteristic of a democracy?', options: [{id: 'a', text: 'Rule by a single, unelected leader'}, {id: 'b', text: 'Citizens have the power to elect their leaders'}, {id: 'c', text: 'State control of all media'}], correctOptionId: 'b', explanation: 'Democracy is a system of government where citizens exercise power by voting and electing representatives.' },
          { id: 'ps1q3', text: 'What is a constitution?', options: [{id: 'a', text: 'A list of current political leaders'}, {id: 'b', text: 'A set of fundamental principles or established precedents by which a state is governed.'}, {id: 'c', text: 'A temporary decree by a ruler'}], correctOptionId: 'b', explanation: 'A constitution outlines the fundamental principles, laws, and structure of a government.' },
          { id: 'ps1q4', text: 'What is a "veto"?', options: [{id: 'a', text: 'The power to pass a law'}, {id: 'b', text: 'The power to reject a decision or proposal'}, {id: 'c', text: 'The power to declare war'}], correctOptionId: 'b', explanation: 'A veto is the power, often held by an executive, to unilaterally stop an official action, especially the enactment of legislation.' },
          { id: 'ps1q5', text: 'A system where power is held by a single person, often through inheritance, is called a:', options: [{id: 'a', text: 'Republic'}, {id: 'b', text: 'Democracy'}, {id: 'c', text: 'Monarchy'}], correctOptionId: 'c', explanation: 'A monarchy is a form of government in which a single person, called a monarch (such as a king or queen), rules until they die or abdicate the throne.' },
        ],
      },
    ],
  }
];
