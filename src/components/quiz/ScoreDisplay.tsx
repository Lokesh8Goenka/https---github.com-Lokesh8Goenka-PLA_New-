
"use client";

import { useQuiz } from '@/context/QuizContext';

export default function ScoreDisplay() {
  const { state } = useQuiz();
  const { score, selectedSubject, currentLevelIndex, isRemedialRound } = state;

  if (!selectedSubject || isRemedialRound) return null; // Don't show score during remedial

  const totalQuestionsInLevel = selectedSubject.levels[currentLevelIndex]?.questions.length || 0;

  return (
    <div className="text-lg font-semibold text-accent mb-4 text-center">
      Score: {score} / {totalQuestionsInLevel}
    </div>
  );
}
