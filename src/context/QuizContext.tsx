
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
  | 'feedback' // State to show feedback before moving to next question or summary
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
  currentFeedback: { message: string; type: 'correct' | 'incorrect', explanation?: string } | null;
  isRemedialRound: boolean; // True if currently in a remedial session for a failed level
}

type Action =
  | { type: 'LOAD_SUBJECTS'; payload: Subject[] }
  | { type: 'SELECT_SUBJECT'; payload: string } // subjectId
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; selectedOptionId: string } }
  | { type: 'NEXT_QUESTION_OR_SUMMARY' }
  | { type: 'START_REMEDIAL_SESSION' }
  | { type: 'FINISH_REMEDIAL_SESSION' } // After remedial, typically retry level
  | { type: 'RETRY_LEVEL' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FINISH_QUIZ' } // Quiz fully completed or user chose to end
  | { type: 'RESET_QUIZ' }; // Back to subject selection

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
      
      return {
        ...state,
        userAnswers: [...state.userAnswers, { questionId: action.payload.questionId, selectedOptionId: action.payload.selectedOptionId, isCorrect }],
        score: newScore,
        quizState: 'feedback',
        currentFeedback: {
          message: isCorrect ? 'Correct!' : 'Incorrect!',
          type: isCorrect ? 'correct' : 'incorrect',
          explanation: question.explanation,
        }
      };
    }
    case 'NEXT_QUESTION_OR_SUMMARY': {
      if (!state.selectedSubject) return state;
      const level = state.selectedSubject.levels[state.currentLevelIndex];
      const questions = state.isRemedialRound ? (level.remedialQuestions || []) : level.questions;
      
      if (state.currentQuestionIndex < questions.length - 1) {
        return { 
          ...state, 
          currentQuestionIndex: state.currentQuestionIndex + 1, 
          quizState: 'in-progress', // or 'remedial-session' if isRemedialRound
          currentFeedback: null 
        };
      } else { // Last question of the current set (main or remedial)
        if (state.isRemedialRound) {
          return { ...state, quizState: 'level-complete', currentFeedback: null }; // End of remedial, triggers FINISH_REMEDIAL_SESSION logic
        }
        // End of main level questions
        const passingScore = Math.ceil(level.questions.length * level.passingThreshold);
        if (state.score >= passingScore) { // Passed level
          if (state.currentLevelIndex < state.selectedSubject.levels.length - 1) {
            // More levels exist
            return { ...state, quizState: 'level-complete', currentFeedback: null }; // Triggers NEXT_LEVEL
          } else {
            // Last level passed, quiz complete
            return { ...state, quizState: 'quiz-complete', currentFeedback: null };
          }
        } else { // Failed level
            return { ...state, quizState: 'level-complete', currentFeedback: null }; // Triggers remedial or retry options
        }
      }
    }
    case 'START_REMEDIAL_SESSION': {
      if (!state.selectedSubject) return state;
      const level = state.selectedSubject.levels[state.currentLevelIndex];
      if (!level.remedialQuestions || level.remedialQuestions.length === 0) {
        // No remedial questions, effectively means fail state to retry or quit
        return { ...state, quizState: 'level-complete' }; // This will show summary for failed level
      }
      return {
        ...state,
        isRemedialRound: true,
        quizState: 'remedial-session',
        currentQuestionIndex: 0,
        userAnswers: [], // Reset answers for remedial round
        // score is not reset as remedial doesn't affect main score
        currentFeedback: null,
      };
    }
    case 'FINISH_REMEDIAL_SESSION': {
      // After remedial, always offer to retry the main level. Score/answers for main level are preserved.
      return {
        ...state,
        isRemedialRound: false,
        quizState: 'level-complete', // Go to summary to offer retry
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
      if (!state.selectedSubject || state.currentLevelIndex >= state.selectedSubject.levels.length - 1) return state; // Should not happen if logic is correct
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
    case 'FINISH_QUIZ': // User chose to end or quiz naturally ended
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
    // Simulate loading subjects, in a real app this might be an API call
    dispatch({ type: 'LOAD_SUBJECTS', payload: quizSubjects });
  }, []);

  // Error handling example (not fully utilized in this simple reducer)
  useEffect(() => {
    if (state.quizState === 'loading' && state.subjects.length === 0) {
      // Could add a timeout here to show error if loading takes too long
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
