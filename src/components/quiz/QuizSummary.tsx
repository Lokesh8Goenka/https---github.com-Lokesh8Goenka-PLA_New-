
"use client";

import type { LevelEndReason } from '@/context/QuizContext';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RefreshCcw, Home, AlertTriangle, ThumbsUp, ThumbsDown, Zap, Trophy } from 'lucide-react';

export default function QuizSummary() {
  const { state, dispatch } = useQuiz();
  const { selectedSubject, currentLevelIndex, score, levelEndReason, userName, totalQuizScore } = state;

  if (!selectedSubject) {
    return <p className="text-center text-lg text-muted-foreground">Loading summary...</p>;
  }
  
  const level = selectedSubject.levels[currentLevelIndex];
  const questionsInLevel = level.questions.length;

  let title = "";
  let description = "";
  let icon = <Zap className="w-16 h-16 text-primary animate-pulse-accent" />;
  let showNextLevelButton = false;
  let showRetryButton = false;

  const isQuizComplete = state.quizState === 'quiz-complete' || levelEndReason === 'quiz_completed_successfully';
  const hasMoreLevels = state.currentLevelIndex < selectedSubject.levels.length - 1;

  let totalPossibleScoreInQuiz = 0;
  if (isQuizComplete) {
    totalPossibleScoreInQuiz = selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
  }

  if (isQuizComplete) {
    title = `Quiz Complete, ${userName || 'Champion'}!`;
    description = `Congratulations! You've completed all levels for ${selectedSubject.name}. Your final total score is ${totalQuizScore} / ${totalPossibleScoreInQuiz}.`;
    icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
  } else if (state.quizState === 'level-complete') {
    const studentName = userName ? `${userName}, ` : "";
    switch (levelEndReason) {
      case 'passed_3_of_3':
        title = `${studentName}Level ${level.name} Passed Early!`;
        description = `Excellent! You scored a perfect 3/3 on the initial questions. Your score for this level attempt was ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
        if (!hasMoreLevels) { 
             title = `Quiz Complete, ${userName || 'Star'}!`;
             description = `Flawless victory on the last level of ${selectedSubject.name}! Level score: ${score}/${questionsInLevel}. Final total score: ${totalQuizScore} / ${selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0)}.`;
             icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
        }
        break;
      case 'passed_after_extended':
        title = `${studentName}Level ${level.name} Passed!`;
        description = `Great effort! You passed after the extended questions. Your score for this level attempt was ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
         if (!hasMoreLevels) {
             title = `Quiz Complete, ${userName || 'Achiever'}!`;
             description = `Solid finish on the last level of ${selectedSubject.name}! Level score: ${score}/${questionsInLevel}. Final total score: ${totalQuizScore} / ${selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0)}.`;
             icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
        }
        break;
      case 'passed_by_threshold':
        title = `${studentName}Level ${level.name} Passed!`;
        description = `Well done! You scored ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = hasMoreLevels;
        if (!hasMoreLevels) {
             title = `Quiz Complete, ${userName || 'Prodigy'}!`;
             description = `You've conquered the last level of ${selectedSubject.name}! Level score: ${score}/${questionsInLevel}. Final total score: ${totalQuizScore} / ${selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0)}.`;
             icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
        }
        break;
      case 'zero_score_failure':
        title = `Level ${level.name} Not Passed, ${userName || 'Learner'}`;
        description = `Unfortunately, you scored 0 on the first 3 questions. Your score for this attempt was ${score}/${questionsInLevel}. Time to retry!`;
        icon = <ThumbsDown className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      case 'failed_after_extended':
        title = `Level ${level.name} Not Passed, ${userName || 'Challenger'}`;
        description = `Close one! You didn't quite make it after the extended questions. Your score for this attempt was ${score}/${questionsInLevel}. Keep trying!`;
        icon = <AlertTriangle className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      case 'failed_by_threshold':
        title = `Level ${level.name} Not Passed, ${userName || 'Explorer'}`;
        description = `You scored ${score}/${questionsInLevel}. The passing score for this level is ${Math.ceil(questionsInLevel * level.passingThreshold)}. Don't give up!`;
        icon = <AlertTriangle className="w-16 h-16 text-destructive" />;
        showRetryButton = true;
        break;
      default: // Fallback for unexpected levelEndReason
        title = `Level ${level.name} Complete, ${userName || 'Player'}`;
        description = `You scored ${score}/${questionsInLevel}.`;
        icon = <Zap className="w-16 h-16 text-primary" />;
        const passed = score >= Math.ceil(questionsInLevel * level.passingThreshold);
        if (passed) {
          showNextLevelButton = hasMoreLevels;
           if (!hasMoreLevels) {
             title = `Quiz Complete, ${userName || 'Finisher'}!`;
             description = `You've finished the last level of ${selectedSubject.name}! Level score: ${score}/${questionsInLevel}. Final total score: ${totalQuizScore} / ${selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0)}.`;
             icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
           }
        } else {
          showRetryButton = true;
        }
    }
  } else { 
      title = `Quiz Status, ${userName || 'Participant'}`;
      description = `Your current score for this level is ${score}/${questionsInLevel}.`;
  }


  return (
    <Card className="w-full text-center animate-subtle-fade-in shadow-xl bg-card">
      <CardHeader className="items-center">
        <div className="p-4 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <CardTitle className="text-3xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-lg mt-2 text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Additional content for future */}
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
         {isQuizComplete && ( 
            <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} className="bg-green-600 hover:bg-green-700 text-white">
             <Award className="mr-2 h-4 w-4" /> Finish & Try Another Subject
            </Button>
        )}
        {!isQuizComplete && ( 
            <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Home className="mr-2 h-4 w-4" /> Back to Subjects
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
