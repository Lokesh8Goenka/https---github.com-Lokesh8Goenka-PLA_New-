
"use client";

import { useQuiz } from '@/context/QuizContext';

export default function ScoreDisplay() {
  const { state } = useQuiz();
  // Score is shown at the end of the level in QuizSummary, not during questions.
  // This component might be removed or repurposed if no live score is desired.
  // For now, let's keep it simple and not display anything during the quiz.
  // If a live score for non-dynamic levels is desired, this could be re-enabled with conditions.
  
  // const { score, selectedSubject, currentLevelIndex } = state;
  // if (!selectedSubject) return null;
  // const totalQuestionsInLevel = selectedSubject.levels[currentLevelIndex]?.questions.length || 0;
  // return (
  //   <div className="text-lg font-semibold text-accent mb-4 text-center">
  //     Score: {score} / {totalQuestionsInLevel} 
  //   </div>
  // );

  return null; // No live score display during questions with the new logic.
}
