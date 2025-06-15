
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
  // | 'remedial-session' // Removed
  | 'level-complete'
  | 'quiz-complete';

export type LevelEndReason = 
  | 'zero_score_failure' 
  | 'passed_3_of_3' 
  | 'failed_after_extended' 
  | 'passed_after_extended' 
  | 'failed_by_threshold' 
  | 'passed_by_threshold' 
  | 'quiz_completed_successfully';

interface AppState {
  quizState: QuizState;
  subjects: Subject[];
  selectedSubject: Subject | null;
  currentLevelIndex: number;
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  score: number; 
  levelEndReason?: LevelEndReason;
  // currentFeedback: { message: string; type: 'correct' | 'incorrect', explanation?: string } | null; // Removed
  // isRemedialRound: boolean; // Removed
}

type Action =
  | { type: 'LOAD_SUBJECTS'; payload: Subject[] }
  | { type: 'SELECT_SUBJECT'; payload: string } // subjectId
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; selectedOptionId: string } }
  // | { type: 'START_REMEDIAL_SESSION' } // Removed
  // | { type: 'FINISH_REMEDIAL_SESSION' }  // Removed
  | { type: 'RETRY_LEVEL' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FINISH_QUIZ' } // Kept for explicit quiz completion, though ANSWER_QUESTION might trigger quiz-complete
  | { type: 'RESET_QUIZ' }; 

const initialState: AppState = {
  quizState: 'loading',
  subjects: [],
  selectedSubject: null,
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  levelEndReason: undefined,
  // currentFeedback: null, // Removed
  // isRemedialRound: false, // Removed
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
      const question = level.questions[state.currentQuestionIndex];
      if (!question) return state;

      const isCorrect = question.correctOptionId === action.payload.selectedOptionId;
      const newScore = isCorrect ? state.score + 1 : state.score;
      
      const updatedUserAnswers = [...state.userAnswers, { questionId: action.payload.questionId, selectedOptionId: action.payload.selectedOptionId, isCorrect }];
      
      const questionsInLevel = level.questions.length;
      const questionsAnsweredThisAttempt = updatedUserAnswers.length;

      const INITIAL_PHASE_QUESTIONS = 3;
      const EXTENDED_PHASE_TOTAL_QUESTIONS = 5;
      const MIN_SCORE_TO_PASS_EXTENDED = 3;

      let nextQuizState: QuizState = 'in-progress';
      let nextQuestionIndex = state.currentQuestionIndex + 1;
      let newLevelEndReason: LevelEndReason | undefined = undefined;

      // Special 3/5 question logic applies if level has enough questions
      if (questionsInLevel >= EXTENDED_PHASE_TOTAL_QUESTIONS) {
        if (questionsAnsweredThisAttempt === INITIAL_PHASE_QUESTIONS) { // After 3rd question
          if (newScore === 0) {
            nextQuizState = 'level-complete';
            newLevelEndReason = 'zero_score_failure';
          } else if (newScore === INITIAL_PHASE_QUESTIONS) { // 3/3 correct
            nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
            newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_3_of_3';
          } else { // Score 1 or 2 after 3 questions, continue to extended phase
            if (nextQuestionIndex < questionsInLevel) {
              // Continue to 4th question
            } else { // Should not happen if questionsInLevel >= EXTENDED_PHASE_TOTAL_QUESTIONS
              nextQuizState = 'level-complete'; // Fallback, ran out of Qs unexpectedly
              newLevelEndReason = 'failed_by_threshold'; // Or some error state
            }
          }
        } else if (questionsAnsweredThisAttempt > INITIAL_PHASE_QUESTIONS && questionsAnsweredThisAttempt === EXTENDED_PHASE_TOTAL_QUESTIONS) { // After 5th question
          if (newScore >= MIN_SCORE_TO_PASS_EXTENDED) {
            nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
            newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_after_extended';
          } else {
            nextQuizState = 'level-complete';
            newLevelEndReason = 'failed_after_extended';
          }
        } else if (questionsAnsweredThisAttempt < questionsInLevel) {
          // Continue to next question (e.g. 1st, 2nd, 4th, or beyond 5th if level is longer)
          // newQuizState remains 'in-progress'
        } else { // Last question of a level >= 5 questions
          // This path is hit if the level is exactly 5 questions long and we are at the 5th (handled above)
          // or if the level is longer than 5 questions and this is the last one.
          // If an outcome wasn't decided by special logic, use threshold.
           const passedByThreshold = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
           if (passedByThreshold) {
               nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
               newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_by_threshold';
           } else {
               nextQuizState = 'level-complete';
               newLevelEndReason = 'failed_by_threshold';
           }
        }
      } else { // Level has < 5 questions, use standard threshold logic
        if (questionsAnsweredThisAttempt < questionsInLevel) {
          // newQuizState remains 'in-progress'
        } else { // Last question of a short level
          const passed = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
          if (passed) {
            nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
            newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_by_threshold';
          } else {
            nextQuizState = 'level-complete';
            newLevelEndReason = 'failed_by_threshold';
          }
        }
      }
      
      return {
        ...state,
        userAnswers: updatedUserAnswers,
        score: newScore,
        currentQuestionIndex: nextQuizState === 'in-progress' ? nextQuestionIndex : state.currentQuestionIndex,
        quizState: nextQuizState,
        levelEndReason: newLevelEndReason || state.levelEndReason, // Persist if set earlier in multi-stage logic
      };
    }
    case 'RETRY_LEVEL':
      return {
        ...state,
        quizState: 'in-progress',
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        levelEndReason: undefined,
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
        levelEndReason: undefined,
      };
    }
    case 'FINISH_QUIZ': // This might be triggered by QuizSummary if it decides completion
      return { ...state, quizState: 'quiz-complete', levelEndReason: 'quiz_completed_successfully' };
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
