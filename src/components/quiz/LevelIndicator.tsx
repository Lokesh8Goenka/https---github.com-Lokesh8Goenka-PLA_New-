
"use client";

import { useQuiz } from '@/context/QuizContext';

export default function LevelIndicator() {
  const { state } = useQuiz();
  const { selectedSubject, currentLevelIndex, isRemedialRound } = state;

  if (!selectedSubject) return null;

  const levelName = selectedSubject.levels[currentLevelIndex]?.name || 'Unknown Level';

  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl font-semibold text-primary">
        {selectedSubject.name} - {levelName}
        {isRemedialRound && <span className="text-accent ml-2">(Remedial)</span>}
      </h2>
    </div>
  );
}
