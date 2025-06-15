
"use client";

import { QuizProvider, useQuiz } from '@/context/QuizContext';
import SubjectSelector from '@/components/quiz/SubjectSelector';
import QuizRunner from '@/components/quiz/QuizRunner';
import QuizSummary from '@/components/quiz/QuizSummary';
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from 'react';

function QuizAppContent() {
  const { state } = useQuiz();

  useEffect(() => {
    // Scroll to top when quiz state changes, useful for transitions between views
    window.scrollTo(0, 0);
  }, [state.quizState, state.currentQuestionIndex, state.currentLevelIndex]);

  // Loading state can be more sophisticated, e.g. a spinner component
  if (state.quizState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg text-muted-foreground">Preparing Your Ascent...</p>
      </div>
    );
  }
  
  if (state.quizState === 'subject-selection') {
    return <SubjectSelector />;
  }
  // 'in-progress' and 'remedial-session' use QuizRunner. 'feedback' state is handled within QuizRunner.
  if (state.quizState === 'in-progress' || state.quizState === 'remedial-session' || state.quizState === 'feedback') {
    return <QuizRunner />;
  }
  if (state.quizState === 'level-complete' || state.quizState === 'quiz-complete') {
    return <QuizSummary />;
  }
  
  // Fallback for any unhandled state
  return <p className="text-center text-lg text-destructive">An unexpected error occurred. Please try refreshing.</p>;
}

export default function Home() {
  return (
    <QuizProvider>
      <main className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
        <div className="w-full max-w-3xl mt-8 mb-8"> {/* Increased max-width for better layout on larger screens */}
          <QuizAppContent />
        </div>
        <footer className="w-full text-center py-8 mt-auto">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Quiz Ascent. Ascend to new heights of knowledge.</p>
        </footer>
      </main>
      <Toaster />
    </QuizProvider>
  );
}
