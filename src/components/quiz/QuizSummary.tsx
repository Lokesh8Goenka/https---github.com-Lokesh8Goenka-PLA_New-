
"use client";

import type { LevelEndReason } from '@/context/QuizContext';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RefreshCcw, Home, AlertTriangle, ThumbsUp, ThumbsDown, Zap, Trophy } from 'lucide-react';

export default function QuizSummary() {
  const { state, dispatch } = useQuiz(); // Removed triggerSaveQuizResult, it's handled in context
  const { selectedSubject, currentLevelIndex, score, levelEndReason, userName, totalQuizScore, quizState } = state;

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

  const isLastLevel = state.currentLevelIndex >= selectedSubject.levels.length - 1;
  const isQuizTrulyComplete = quizState === 'quiz-complete'; // This is the definitive check

  let totalPossibleScoreInQuiz = 0;
  if (isQuizTrulyComplete) {
    totalPossibleScoreInQuiz = selectedSubject.levels.reduce((acc, lvl) => acc + lvl.questions.length * (lvl.passingThreshold > 0.5 ? 1 : 0) , 0); // Simplified for example
     // A more accurate totalPossibleScoreInQuiz would consider the dynamic 3/5 logic per level for max possible points
     // For now, we sum up questions count.
     totalPossibleScoreInQuiz = selectedSubject.levels.reduce((acc, lvl) => {
        // For levels with 5 questions (dynamic logic)
        if (lvl.questions.length >= 5) {
            return acc + 5; // Max score achievable is 5 (e.g. perfect 3/3, or pass after 5)
        }
        // For shorter levels, max score is total questions
        return acc + lvl.questions.length;
    }, 0);
  }


  const studentName = userName ? `${userName}, ` : "";

  if (isQuizTrulyComplete) {
    title = `Quiz Complete, ${userName || 'Champion'}!`;
    description = `Congratulations! You've completed all levels for ${selectedSubject.name}. Your final total score is ${totalQuizScore} out of a possible ${totalPossibleScoreInQuiz}.`;
    icon = <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />;
  } else if (quizState === 'level-complete') { // This means a level ended, but not necessarily the whole quiz
    switch (levelEndReason) {
      case 'passed_3_of_3':
        title = `${studentName}Level ${level.name} Passed Early!`;
        description = `Excellent! You scored ${score}/${level.questions.slice(0,3).length} on the initial questions. Your score for this level: ${score}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = !isLastLevel;
        break;
      case 'passed_after_extended':
        title = `${studentName}Level ${level.name} Passed!`;
        description = `Great effort! You passed after the extended questions. Your score for this level: ${score}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = !isLastLevel;
        break;
      case 'passed_by_threshold':
        title = `${studentName}Level ${level.name} Passed!`;
        description = `Well done! You scored ${score}/${questionsInLevel}.`;
        icon = <ThumbsUp className="w-16 h-16 text-green-500" />;
        showNextLevelButton = !isLastLevel;
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
      default: 
        title = `Level ${level.name} Complete, ${userName || 'Player'}`;
        description = `You scored ${score}/${questionsInLevel}.`;
        icon = <Zap className="w-16 h-16 text-primary" />;
        const passed = score >= Math.ceil(questionsInLevel * level.passingThreshold) || levelEndReason?.startsWith('passed');
        if (passed) {
          showNextLevelButton = !isLastLevel;
        } else {
          showRetryButton = true;
        }
    }
    // If level passed and it was the last one, dispatch FINISH_QUIZ_ATTEMPT to trigger save and final summary
    if ((showNextLevelButton === false && !showRetryButton && isLastLevel && !isQuizTrulyComplete) || 
        (levelEndReason?.startsWith("passed") && isLastLevel && !isQuizTrulyComplete)) {
      // This ensures if a level is passed and it's the last, we transition to quiz complete state
      // which will then show the final score and trigger save
      dispatch({ type: 'FINISH_QUIZ_ATTEMPT' }); 
    }

  } else { 
      title = `Quiz Status, ${userName || 'Participant'}`;
      description = `Something unexpected happened. Current score for this level is ${score}/${questionsInLevel}.`;
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
        {isQuizTrulyComplete && (
          <p className="text-xl font-semibold text-accent">
            Total Quiz Score: {totalQuizScore} / {totalPossibleScoreInQuiz}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        {showNextLevelButton && !isQuizTrulyComplete && (
          <Button onClick={() => dispatch({ type: 'NEXT_LEVEL' })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Next Level
          </Button>
        )}
        {showRetryButton && !isQuizTrulyComplete && (
          <Button onClick={() => dispatch({ type: 'RETRY_LEVEL' })} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry Level
          </Button>
        )}
         {isQuizTrulyComplete && ( 
            <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} className="bg-green-600 hover:bg-green-700 text-white">
             <Award className="mr-2 h-4 w-4" /> Finish & Try Another Subject
            </Button>
        )}
        {/* Always show "Back to Subjects" if not truly complete, or if truly complete show it as primary action */}
        {(!isQuizTrulyComplete || (isQuizTrulyComplete && (!showNextLevelButton && !showRetryButton))) && (
            <Button 
                onClick={() => dispatch({ type: 'RESET_QUIZ' })} 
                variant={isQuizTrulyComplete ? "default" : "outline"} // Make it prominent if it's the only option after quiz completion
                className={isQuizTrulyComplete ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "border-primary text-primary hover:bg-primary/10"}
            >
                <Home className="mr-2 h-4 w-4" /> {isQuizTrulyComplete ? "Start New Quiz" : "Back to Subjects"}
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
