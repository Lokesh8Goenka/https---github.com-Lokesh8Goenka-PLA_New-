
"use client";

import { useQuiz } from '@/context/QuizContext';
import LevelIndicator from './LevelIndicator';
import QuizProgress from './QuizProgress';
import ScoreDisplay from './ScoreDisplay';
import QuestionDisplay from './QuestionDisplay';
import AnswerFeedback from './AnswerFeedback';

export default function QuizRunner() {
  const { state } = useQuiz();

  return (
    <div className="w-full max-w-xl mx-auto p-4 md:p-6 space-y-6">
      <LevelIndicator />
      <QuizProgress />
      <ScoreDisplay />
      {state.quizState === 'feedback' ? <AnswerFeedback /> : <QuestionDisplay />}
    </div>
  );
}
