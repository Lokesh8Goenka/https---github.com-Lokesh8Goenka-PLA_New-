
"use client";

import { useQuiz } from '@/context/QuizContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, RefreshCcw, Home, AlertTriangle, Zap } from 'lucide-react';

export default function QuizSummary() {
  const { state, dispatch } = useQuiz();
  const { selectedSubject, currentLevelIndex, score, isRemedialRound } = state;

  if (!selectedSubject) {
    return <p>Loading summary...</p>;
  }
  
  const level = selectedSubject.levels[currentLevelIndex];
  const mainLevelQuestionsCount = level.questions.length;
  const passingScore = Math.ceil(mainLevelQuestionsCount * level.passingThreshold);
  const passedCurrentLevel = score >= passingScore;

  let title = "";
  let description = "";
  let icon = <Award className="w-16 h-16 text-accent animate-pulse-accent" />;

  if (state.quizState === 'quiz-complete') {
    title = "Quiz Complete!";
    description = `Congratulations! You've completed all levels for ${selectedSubject.name}. Your final score for the last level was ${score}/${mainLevelQuestionsCount}.`;
    icon = <Award className="w-16 h-16 text-green-500" />;
  } else if (state.quizState === 'level-complete') {
    if (isRemedialRound) { // Finished remedial session
      title = "Remedial Session Complete";
      description = "You've completed the remedial questions. Ready to try the level again?";
      icon = <Zap className="w-16 h-16 text-primary" />;
    } else if (passedCurrentLevel) { // Passed main level, more levels exist
      title = `Level ${level.name} Passed!`;
      description = `Great job! You scored ${score}/${mainLevelQuestionsCount}. Get ready for the next level!`;
      icon = <Award className="w-16 h-16 text-green-500" />;
    } else { // Failed main level
      title = `Level ${level.name} Not Passed`;
      description = `You scored ${score}/${mainLevelQuestionsCount}. Passing score is ${passingScore}. Don't give up!`;
      icon = <AlertTriangle className="w-16 h-16 text-destructive" />;
    }
  }

  const canDoRemedial = !passedCurrentLevel && !isRemedialRound && level.remedialQuestions && level.remedialQuestions.length > 0;

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
        {state.quizState !== 'quiz-complete' && !isRemedialRound && !passedCurrentLevel && (
          <p className="text-muted-foreground mb-4">
            You need {passingScore - score} more correct answer(s) to pass this level.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
        {state.quizState === 'level-complete' && passedCurrentLevel && state.currentLevelIndex < selectedSubject.levels.length - 1 && (
          <Button onClick={() => dispatch({ type: 'NEXT_LEVEL' })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Next Level
          </Button>
        )}
        {state.quizState === 'level-complete' && !passedCurrentLevel && canDoRemedial && (
           <Button onClick={() => dispatch({ type: 'START_REMEDIAL_SESSION' })} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Remedial Session
          </Button>
        )}
         {state.quizState === 'level-complete' && (isRemedialRound || (!passedCurrentLevel && !canDoRemedial)) && (
          <Button onClick={() => dispatch({ type: 'RETRY_LEVEL' })} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <RefreshCcw className="mr-2 h-4 w-4" /> Retry Level
          </Button>
        )}
        <Button onClick={() => dispatch({ type: 'RESET_QUIZ' })} variant="outline">
          <Home className="mr-2 h-4 w-4" /> Back to Subjects
        </Button>
      </CardFooter>
    </Card>
  );
}
