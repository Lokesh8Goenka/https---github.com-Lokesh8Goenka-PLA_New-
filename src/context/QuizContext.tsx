
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Subject, Level, Question, UserAnswer, Option } from '@/types/quiz';
import { quizSubjects } from '@/data/quiz-data';
import { useToast } from '@/hooks/use-toast';

type QuizState = 
  | 'loading'
  | 'subject-selection'
  | 'in-progress'
  | 'remedial-session'
  // | 'feedback' // Removed: Feedback is now shown at level end via summary
  | 'level-complete'
  | 'quiz-complete';

interface AppState {
  quizState: QuizState;
  subjects: Subject[];
  selectedSubject: Subject | null;
  currentLevelIndex: number;
  currentQuestionIndex: number; // Index within the current level's questions or remedial questions
  userAnswers: UserAnswer[]; // Answers for the current attempt of a level
  score: number; // Correct answers in the current level attempt
  currentFeedback: { message: string; type: 'correct' | 'incorrect', explanation?: string } | null; // Kept for potential future use in summary, but not set per question.
  isRemedialRound: boolean; // True if currently in a remedial session for a failed level
}

type Action =
  | { type: 'LOAD_SUBJECTS'; payload: Subject[] }
  | { type: 'SELECT_SUBJECT'; payload: string } // subjectId
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; selectedOptionId: string } }
  // | { type: 'NEXT_QUESTION_OR_SUMMARY' } // Removed: Logic handled in ANSWER_QUESTION
  | { type: 'START_REMEDIAL_SESSION' }
  | { type: 'FINISH_REMEDIAL_SESSION' } 
  | { type: 'RETRY_LEVEL' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FINISH_QUIZ' } 
  | { type: 'RESET_QUIZ' }; 

const initialState: AppState = {
  quizState: 'loading',
  subjects: [],
  selectedSubject: null,
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  currentFeedback: null,
  isRemedialRound: false,
};

const QuizContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function quizReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_SUBJECTS':
      return { ...initialState, subjects: action.payload, quizState: 'subject-selection' };
    case 'SELECT_SUBJECT': {
      const subject = state.subjects.find(s => s.id === action.payload);
      return subject ? { 
        ...initialState, 
        subjects: state.subjects, 
        selectedSubject: subject, 
        quizState: 'in-progress',
        currentLevelIndex: 0,
        currentQuestionIndex: 0,
      } : state;
    }
    case 'ANSWER_QUESTION': {
      if (!state.selectedSubject) return state;
      const level = state.selectedSubject.levels[state.currentLevelIndex];
      const questions = state.isRemedialRound ? (level.remedialQuestions || []) : level.questions;
      const question = questions[state.currentQuestionIndex];
      if (!question) return state;

      const isCorrect = question.correctOptionId === action.payload.selectedOptionId;
      const newScore = isCorrect && !state.isRemedialRound ? state.score + 1 : state.score;
      
      const updatedUserAnswers = [...state.userAnswers, { questionId: action.payload.questionId, selectedOptionId: action.payload.selectedOptionId, isCorrect }];

      if (state.currentQuestionIndex < questions.length - 1) { // Not the last question
        return {
          ...state,
          userAnswers: updatedUserAnswers,
          score: newScore,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          quizState: state.isRemedialRound ? 'remedial-session' : 'in-progress',
          currentFeedback: null, 
        };
      } else { // Last question of the current set (main or remedial)
        const finalStateForLevel = {
          ...state,
          userAnswers: updatedUserAnswers,
          score: newScore,
          currentFeedback: null, 
        };

        if (state.isRemedialRound) {
          return { ...finalStateForLevel, quizState: 'level-complete' }; // Go to summary after remedial
        }
        
        const passingScore = Math.ceil(level.questions.length * level.passingThreshold);
        if (finalStateForLevel.score >= passingScore) { // Passed level
          if (state.currentLevelIndex < state.selectedSubject.levels.length - 1) {
            return { ...finalStateForLevel, quizState: 'level-complete' }; 
          } else {
            return { ...finalStateForLevel, quizState: 'quiz-complete' };
          }
        } else { // Failed level
            return { ...finalStateForLevel, quizState: 'level-complete' };
        }
      }
    }
    // NEXT_QUESTION_OR_SUMMARY case removed as its logic is integrated into ANSWER_QUESTION
    case 'START_REMEDIAL_SESSION': {
      if (!state.selectedSubject) return state;
      const level = state.selectedSubject.levels[state.currentLevelIndex];
      if (!level.remedialQuestions || level.remedialQuestions.length === 0) {
        return { ...state, quizState: 'level-complete' }; 
      }
      return {
        ...state,
        isRemedialRound: true,
        quizState: 'remedial-session',
        currentQuestionIndex: 0,
        userAnswers: [], 
        currentFeedback: null,
      };
    }
    case 'FINISH_REMEDIAL_SESSION': {
      // This action is called from QuizSummary when user finishes remedial and wants to retry main level.
      // However, the logic now transitions directly from ANSWER_QUESTION (last remedial) to 'level-complete'.
      // QuizSummary will then offer retry based on 'isRemedialRound' being true at that point.
      // Let's simplify and assume 'RETRY_LEVEL' covers this.
      // This case might become redundant or used if a different flow is introduced.
      // For now, it should lead to a state where user can retry.
      return {
        ...state,
        isRemedialRound: false, // Important to reset this
        quizState: 'level-complete', // Show summary, which should now offer "Retry Level"
        currentFeedback: null,
      };
    }
    case 'RETRY_LEVEL':
      return {
        ...state,
        quizState: 'in-progress',
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        currentFeedback: null,
        isRemedialRound: false,
      };
    case 'NEXT_LEVEL': {
      if (!state.selectedSubject || state.currentLevelIndex >= state.selectedSubject.levels.length - 1) return state; 
      return {
        ...state,
        currentLevelIndex: state.currentLevelIndex + 1,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        quizState: 'in-progress',
        currentFeedback: null,
        isRemedialRound: false,
      };
    }
    case 'FINISH_QUIZ': 
      return { ...state, quizState: 'quiz-complete', currentFeedback: null };
    case 'RESET_QUIZ':
      return { ...initialState, subjects: state.subjects, quizState: 'subject-selection' };
    default:
      return state;
  }
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    dispatch({ type: 'LOAD_SUBJECTS', payload: quizSubjects });
  }, []);

  useEffect(() => {
    if (state.quizState === 'loading' && state.subjects.length === 0) {
      // Potential timeout for loading error
    }
  }, [state.quizState, state.subjects, toast]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

