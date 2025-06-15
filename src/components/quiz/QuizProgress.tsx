
"use client";

import { useQuiz } from '@/context/QuizContext';
import { Progress } from '@/components/ui/progress';

export default function QuizProgress() {
  const { state } = useQuiz();
  const { selectedSubject, currentLevelIndex, currentQuestionIndex, isRemedialRound } = state;

  if (!selectedSubject) return null;

  const level = selectedSubject.levels[currentLevelIndex];
  const questions = isRemedialRound ? (level.remedialQuestions || []) : level.questions;
  const totalQuestions = questions.length;
  
  if (totalQuestions === 0) return null;

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full mb-6">
      <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-accent" aria-label={`Question ${currentQuestionIndex + 1} of ${totalQuestions}`} />
      <p className="text-sm text-muted-foreground text-right mt-1">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
}
