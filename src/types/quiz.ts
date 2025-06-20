
import type { LucideIcon } from 'lucide-react';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string; // Optional explanation for after answering
}

export interface Level {
  id: string;
  name: string;
  questions: Question[];
  passingThreshold: number; // e.g., 0.7 for 70%. Used for levels not following the 3/5 question dynamic logic.
  // remedialQuestions?: Question[]; // Removed
}

export interface Subject {
  id: string;
  name: string;
  Icon: LucideIcon; // Using LucideIcon type
  description: string;
  levels: Level[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}
