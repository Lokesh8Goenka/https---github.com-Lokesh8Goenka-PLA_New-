
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Subject, Level, Question, UserAnswer, Option } from '@/types/quiz';
import { quizSubjects } from '@/data/quiz-data';
import { useToast } from '@/hooks/use-toast';

type QuizState =
  | 'loading'
  | 'user-info-collection' // New state for collecting user's name and class
  | 'subject-selection'
  | 'in-progress'
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
  score: number; // Score for the current level attempt
  totalQuizScore: number; // Total score accumulated across passed levels for the current subject
  userName: string | null; // User's name
  userClass: string | null; // User's class
  levelEndReason?: LevelEndReason;
}

type Action =
  | { type: 'LOAD_SUBJECTS'; payload: Subject[] }
  | { type: 'SUBMIT_USER_INFO'; payload: { name: string; className: string } } // New action
  | { type: 'SELECT_SUBJECT'; payload: string } // subjectId
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; selectedOptionId: string } }
  | { type: 'RETRY_LEVEL' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' };

const initialState: AppState = {
  quizState: 'loading', // Start in loading state
  subjects: [],
  selectedSubject: null,
  currentLevelIndex: 0,
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  totalQuizScore: 0,
  userName: null,
  userClass: null,
  levelEndReason: undefined,
};

const QuizContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function quizReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_SUBJECTS':
      return {
        ...initialState, // Reset to initial defaults
        subjects: action.payload,
        quizState: 'user-info-collection', // Transition to user info collection
      };
    case 'SUBMIT_USER_INFO':
      return {
        ...state,
        userName: action.payload.name,
        userClass: action.payload.className,
        quizState: 'subject-selection', // Transition to subject selection
      };
    case 'SELECT_SUBJECT': {
      const subject = state.subjects.find(s => s.id === action.payload);
      return subject ? {
        ...initialState, // Resets score, totalQuizScore, level/question indices etc.
        subjects: state.subjects, // Keep loaded subjects
        userName: state.userName, // Persist user info
        userClass: state.userClass, // Persist user info
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
      let newTotalQuizScore = state.totalQuizScore;

      if (questionsInLevel >= EXTENDED_PHASE_TOTAL_QUESTIONS) {
        if (questionsAnsweredThisAttempt === INITIAL_PHASE_QUESTIONS) {
          if (newScore === 0) {
            nextQuizState = 'level-complete';
            newLevelEndReason = 'zero_score_failure';
          } else if (newScore === INITIAL_PHASE_QUESTIONS) {
            nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
            newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_3_of_3';
            if (newLevelEndReason === 'passed_3_of_3' || newLevelEndReason === 'quiz_completed_successfully') {
              newTotalQuizScore += newScore;
            }
          }
        } else if (questionsAnsweredThisAttempt > INITIAL_PHASE_QUESTIONS && questionsAnsweredThisAttempt === EXTENDED_PHASE_TOTAL_QUESTIONS) {
          if (newScore >= MIN_SCORE_TO_PASS_EXTENDED) {
            nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
            newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_after_extended';
            if (newLevelEndReason === 'passed_after_extended' || newLevelEndReason === 'quiz_completed_successfully') {
              newTotalQuizScore += newScore;
            }
          } else {
            nextQuizState = 'level-complete';
            newLevelEndReason = 'failed_after_extended';
          }
        }
      }
      
      // This block handles levels with < 5 Qs OR levels >= 5 Qs that didn't hit early exit/fail from 3/5 logic,
      // and it's the last question of the current attempt for the level.
      if (nextQuizState === 'in-progress' && questionsAnsweredThisAttempt === questionsInLevel) {
         const passedByThreshold = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
         if (passedByThreshold) {
             nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
             newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_by_threshold';
             if (newLevelEndReason === 'passed_by_threshold' || newLevelEndReason === 'quiz_completed_successfully') {
               newTotalQuizScore += newScore;
             }
         } else {
             nextQuizState = 'level-complete';
             newLevelEndReason = 'failed_by_threshold';
         }
      }


      // Fallback for any unhandled end-of-level conditions if state is still in-progress but no more questions
      if (nextQuizState === 'in-progress' && nextQuestionIndex >= questionsInLevel) {
        // This means all questions for the current configuration (initial, extended, or full short level) have been answered.
        // Re-evaluate based on score if an end reason wasn't set by specific 3/5 logic.
        // This primarily covers levels >=5 questions that went past 5Q and didn't hit an end reason yet.
        if (!newLevelEndReason && questionsInLevel >= EXTENDED_PHASE_TOTAL_QUESTIONS && questionsAnsweredThisAttempt >= EXTENDED_PHASE_TOTAL_QUESTIONS ) {
           const passedByThreshold = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
           if (passedByThreshold) {
               nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
               newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_by_threshold';
               newTotalQuizScore += newScore;
           } else {
               nextQuizState = 'level-complete';
               newLevelEndReason = 'failed_by_threshold';
           }
        } else if (!newLevelEndReason) { // For short levels or if logic above didn't set a reason
            const passed = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
            if (passed) {
                nextQuizState = state.currentLevelIndex < state.selectedSubject.levels.length - 1 ? 'level-complete' : 'quiz-complete';
                newLevelEndReason = nextQuizState === 'quiz-complete' ? 'quiz_completed_successfully' : 'passed_by_threshold';
                newTotalQuizScore += newScore;
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
        levelEndReason: newLevelEndReason || state.levelEndReason,
        totalQuizScore: newTotalQuizScore,
      };
    }
    case 'RETRY_LEVEL':
      return {
        ...state,
        quizState: 'in-progress',
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0, // Reset score for the retry attempt
        levelEndReason: undefined,
        // totalQuizScore remains, as the previous attempt's score (if failed) was not added
      };
    case 'NEXT_LEVEL': {
      if (!state.selectedSubject || state.currentLevelIndex >= state.selectedSubject.levels.length - 1) return state;
      return {
        ...state,
        currentLevelIndex: state.currentLevelIndex + 1,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0, // Reset score for the new level
        quizState: 'in-progress',
        levelEndReason: undefined,
        // totalQuizScore has already been updated with the passed level's score
      };
    }
    case 'FINISH_QUIZ':
      return { ...state, quizState: 'quiz-complete', levelEndReason: state.levelEndReason || 'quiz_completed_successfully' };
    case 'RESET_QUIZ':
      return {
        ...initialState, // Resets to loading, clears user name/class, scores
        subjects: state.subjects, // Keep loaded subjects
        quizState: 'user-info-collection', // Go back to user info form
      };
    default:
      return state;
  }
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    // Load subjects only once or if they are not present
    if (state.subjects.length === 0) {
      dispatch({ type: 'LOAD_SUBJECTS', payload: quizSubjects });
    }
  }, [state.subjects.length]);


  useEffect(() => {
    if (state.quizState === 'loading' && state.subjects.length > 0 && !state.userName) {
      // This ensures that if subjects are loaded, we move to user-info-collection
      // This might be redundant if LOAD_SUBJECTS action handles the transition properly.
      // Keeping it simple by having LOAD_SUBJECTS set the state to user-info-collection.
    } else if (state.quizState === 'loading' && state.subjects.length === 0) {
      // Potential timeout for loading error (currently not implemented)
    }
  }, [state.quizState, state.subjects, state.userName, toast]);

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
