
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Subject, Level, Question, UserAnswer, Option } from '@/types/quiz';
import { quizSubjects } from '@/data/quiz-data';
import { useToast } from '@/hooks/use-toast';
import { saveQuizResultAction } from '@/app/actions/saveQuizResultAction'; // Import the server action

type QuizState =
  | 'loading'
  | 'user-info-collection' 
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
  score: number; 
  totalQuizScore: number; 
  userName: string | null; 
  userClass: string | null; 
  levelEndReason?: LevelEndReason;
}

type Action =
  | { type: 'LOAD_SUBJECTS'; payload: Subject[] }
  | { type: 'SUBMIT_USER_INFO'; payload: { name: string; className: string } } 
  | { type: 'SELECT_SUBJECT'; payload: string } 
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; selectedOptionId: string } }
  | { type: 'RETRY_LEVEL' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FINISH_QUIZ_ATTEMPT' } 
  | { type: 'RESET_QUIZ' };

const initialState: AppState = {
  quizState: 'loading', 
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

const QuizContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action>, triggerSaveQuizResult: () => Promise<void> } | undefined>(undefined);

let notifyToast: ReturnType<typeof useToast>['toast'] | null = null;


function quizReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_SUBJECTS':
      return {
        ...initialState, 
        subjects: action.payload,
        quizState: 'user-info-collection', 
      };
    case 'SUBMIT_USER_INFO':
      return {
        ...state,
        userName: action.payload.name,
        userClass: action.payload.className,
        quizState: 'subject-selection', 
      };
    case 'SELECT_SUBJECT': {
      const subject = state.subjects.find(s => s.id === action.payload);
      return subject ? {
        ...initialState, 
        subjects: state.subjects, 
        userName: state.userName, 
        userClass: state.userClass, 
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
      let levelPassed = false;

      if (questionsInLevel >= EXTENDED_PHASE_TOTAL_QUESTIONS) {
        if (questionsAnsweredThisAttempt === INITIAL_PHASE_QUESTIONS) {
          if (newScore === 0) {
            newLevelEndReason = 'zero_score_failure';
          } else if (newScore === INITIAL_PHASE_QUESTIONS) {
            newLevelEndReason = 'passed_3_of_3';
            levelPassed = true;
          }
        } else if (questionsAnsweredThisAttempt === EXTENDED_PHASE_TOTAL_QUESTIONS) {
          if (newScore >= MIN_SCORE_TO_PASS_EXTENDED) {
            newLevelEndReason = 'passed_after_extended';
            levelPassed = true;
          } else {
            newLevelEndReason = 'failed_after_extended';
          }
        }
      }
      
      if (!newLevelEndReason && questionsAnsweredThisAttempt === questionsInLevel) {
         const passedByThreshold = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
         if (passedByThreshold) {
             newLevelEndReason = 'passed_by_threshold';
             levelPassed = true;
         } else {
             newLevelEndReason = 'failed_by_threshold';
         }
      }

      if (newLevelEndReason) { 
        if (levelPassed) {
          newTotalQuizScore += newScore; 
          if (state.currentLevelIndex < state.selectedSubject.levels.length - 1) {
            nextQuizState = 'level-complete'; 
          } else {
            nextQuizState = 'quiz-complete'; 
            newLevelEndReason = 'quiz_completed_successfully';
          }
        } else { 
          nextQuizState = 'level-complete';
        }
      } else if (nextQuestionIndex >= questionsInLevel) { 
          const passed = newScore >= Math.ceil(questionsInLevel * level.passingThreshold);
          if (passed) {
              newTotalQuizScore += newScore;
              levelPassed = true; 
              newLevelEndReason = 'passed_by_threshold';
              if (state.currentLevelIndex < state.selectedSubject.levels.length - 1) {
                  nextQuizState = 'level-complete';
              } else {
                  nextQuizState = 'quiz-complete';
                  newLevelEndReason = 'quiz_completed_successfully';
              }
          } else {
              newLevelEndReason = 'failed_by_threshold';
              nextQuizState = 'level-complete';
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
    case 'FINISH_QUIZ_ATTEMPT': 
        return { 
            ...state, 
            quizState: 'quiz-complete', 
            levelEndReason: state.levelEndReason || 'quiz_completed_successfully' 
        };
    case 'RESET_QUIZ':
      return {
        ...initialState, 
        subjects: state.subjects, 
        quizState: 'user-info-collection', 
      };
    default:
      return state;
  }
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { toast } = useToast();
  
  if (!notifyToast) {
    notifyToast = toast; 
  }


  useEffect(() => {
    if (state.subjects.length === 0) {
      dispatch({ type: 'LOAD_SUBJECTS', payload: quizSubjects });
    }
  }, [state.subjects.length]);

  const triggerSaveQuizResult = async () => {
    if (state.quizState === 'quiz-complete' && state.selectedSubject && state.userName) {
      notifyToast && notifyToast({
        title: "Saving Result...",
        description: "Please wait while we save your quiz score.",
      });
      try {
        const result = await saveQuizResultAction({
          userName: state.userName,
          userClass: state.userClass,
          subjectName: state.selectedSubject.name,
          totalQuizScore: state.totalQuizScore,
        });

        if (result.success) {
          notifyToast && notifyToast({
            title: 'Success!',
            description: result.message || 'Your quiz result has been saved to Firestore.',
            variant: 'default',
          });
        } else {
          notifyToast && notifyToast({
            title: 'Error Saving Result',
            description: result.error || 'Could not save your quiz result to Firestore.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Failed to trigger save quiz result:', error);
        notifyToast && notifyToast({
          title: 'Error',
          description: 'An unexpected error occurred while trying to save your result.',
          variant: 'destructive',
        });
      }
    }
  };

  useEffect(() => {
    if (state.quizState === 'quiz-complete') {
      triggerSaveQuizResult();
    }
  }, [state.quizState, state.totalQuizScore]);


  return (
    <QuizContext.Provider value={{ state, dispatch, triggerSaveQuizResult }}>
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
