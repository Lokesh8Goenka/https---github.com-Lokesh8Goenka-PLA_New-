
"use client";

import { useQuiz } from '@/context/QuizContext';
import LevelIndicator from './LevelIndicator';
import QuizProgress from './QuizProgress';
import ScoreDisplay from './ScoreDisplay';
import QuestionDisplay from './QuestionDisplay';
// import AnswerFeedback from './AnswerFeedback'; // Removed as feedback is now at level end

export default function QuizRunner() {
  // const { state } = useQuiz(); // state is not directly used here anymore for conditional rendering

  return (
    <div className="w-full max-w-xl mx-auto p-4 md:p-6 space-y-6">
      <LevelIndicator />
      <QuizProgress />
      <ScoreDisplay />
      {/* Always show QuestionDisplay when in a running quiz state. 
          AnswerFeedback component is no longer rendered here. */}
      <QuestionDisplay />
    </div>
  );
}

