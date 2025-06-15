
"use client";

import type { LevelEndReason } from '@/context/QuizContext';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RefreshCcw, Home, AlertTriangle, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';

export default function QuizSummary() {
  const { state, dispatch } = useQuiz();
  const { selectedSubject, currentLevelIndex, score, levelEndReason } = state;

  if (!selectedSubject) {
    return <p>Loading summary...</p>;
  }
  
  const level = selectedSubject.levels[currentLevelIndex];
  const questionsInLevel = level.questions.length;

  let title = "";
  let description = "";
  let icon = <Award className="w-16 h-16 text-accent animate-pulse-accent" />;
  let showNextLevelButton = false;
  let showRetryButton = false;
  // let showStartRemedialButton = false; // Remedial system removed

  const isQuizComplete = state.quizState === 'quiz-complete' || levelEndReason === 'quiz_completed_successfully';
  const hasMoreLevels = state.currentLevelIndex < selectedSubject.levels.length - 1;

  if (isQuizComplete) {
    title = "Quiz Complete!";
    description = `Congratulations! You've completed all levels for ${selectedSubject.name}. Your final score for the last level was ${score}/${questionsInLevel}.`;
    icon = <Award className="w-16 h-16 text-green-500" />;
  } else if (state.quizState === 'level-complete') {
    switch (levelEndReason) {
      case 'passed_3_of_3':
        title = `Level ${level.name} Passed Early!`;
        description = `Excellent! You scored a perfect 3/3 on the initial questions. You scored ${score}/${questionsInLevel} overall for this attempt.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
        if (!hasMoreLevels) { // If this was the last level and passed early
             title = "Quiz Complete!";
             description = `Flawless victory on the last level of ${selectedSubject.name}! Final score: ${score}/${questionsInLevel}.`;
             icon = <Award className="w-16 h-16 text-green-500" />;
        }
        break;
      case 'passed_after_extended':
        title = `Level ${level.name} Passed!`;
        description = `Great effort! You passed after the extended questions. You scored ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
         if (!hasMoreLevels) {
             title = "Quiz Complete!";
             description = `Solid finish on the last level of ${selectedSubject.name}! Final score: ${score}/${questionsInLevel}.`;
             icon = <Award className="w-16 h-16 text-green-500" />;
        }
        break;
      case 'passed_by_threshold': // For shorter levels or levels > 5 Qs using threshold
        title = `Level ${level.name} Passed!`;
        description = `Well done! You scored ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
        if (!hasMoreLevels) {
             title = "Quiz Complete!";
             description = `You've conquered the last level of ${selectedSubject.name}! Final score: ${score}/${questionsInLevel}.`;
             icon = <Award className="w-16 h-16 text-green-500" />;
        }
        break;
      case 'zero_score_failure':
        title = `Level ${level.name} Not Passed`;
        description = `Unfortunately, you scored 0 on the first 3 questions. You scored ${score}/${questionsInLevel} overall. Time to retry!`;
        icon = <ThumbsDown className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      case 'failed_after_extended':
        title = `Level ${level.name} Not Passed`;
        description = `Close one! You didn't quite make it after the extended questions. You scored ${score}/${questionsInLevel}. Keep trying!`;
        icon = <AlertTriangle className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      case 'failed_by_threshold':
        title = `Level ${level.name} Not Passed`;
        description = `You scored ${score}/${questionsInLevel}. The passing score for this level (using threshold) is ${Math.ceil(questionsInLevel * level.passingThreshold)}. Don't give up!`;
        icon = <AlertTriangle className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      default:
        title = `Level ${level.name} Complete`;
        description = `You scored ${score}/${questionsInLevel}.`;
        icon = <Zap className="w-16 h-16 text-primary" />;
        // Determine if retry or next level based on score vs threshold as a fallback.
        const passed = score >= Math.ceil(questionsInLevel * level.passingThreshold);
        if (passed) {
          showNextLevelButton = hasMoreLevels;
           if (!hasMoreLevels) {
             title = "Quiz Complete!";
             description = `You've finished the last level of ${selectedSubject.name}! Final score: ${score}/${questionsInLevel}.`;
             icon = <Award className="w-16 h-16 text-green-500" />;
           }
        } else {
          showRetryButton = true;
        }
    }
  } else { // Should not happen if logic is correct, but as a fallback
      title = "Quiz Status";
      description = `Your current score is ${score}/${questionsInLevel}.`;
  }


  return (
    <Card className="w-full text-center animate-subtle-fade-in shadow-xl bg-card">
      <CardHeader className="items-center">
        <div className="p-4 rounded-full bg-accent/10 mb-4">
          {icon}
        </div>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-lg mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Additional content if needed, e.g. showing specific wrong answers - future enhancement */}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
        {showNextLevelButton && (
          <Button onClick={() => dispatch({ type: 'NEXT_LEVEL' })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Next Level
          </Button>
        )}
        {showRetryButton && (
          <Button onClick={() => dispatch({ type: 'RETRY_LEVEL' })} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry Level
          </Button>
        )}
         {isQuizComplete && !hasMoreLevels && ( // Quiz is fully complete
            <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground">
             <Award className="mr-2 h-4 w-4" /> Finish & Back to Subjects
            </Button>
        )}
        {!isQuizComplete && ( // Always show back to subjects if quiz is not fully done
            <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} variant="outline">
                <Home className="mr-2 h-4 w-4" /> Back to Subjects
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
