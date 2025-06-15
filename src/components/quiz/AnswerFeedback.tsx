
"use client";

import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnswerFeedback() {
  const { state, dispatch } = useQuiz();
  const { currentFeedback } = state;

  useEffect(() => {
    if (currentFeedback) {
      const timer = setTimeout(() => {
        // Auto-proceed after a delay, but button allows faster progress
        // dispatch({ type: 'NEXT_QUESTION_OR_SUMMARY' });
      }, 50000); // Long delay, user primarily uses button
      return () => clearTimeout(timer);
    }
  }, [currentFeedback, dispatch]);

  if (!currentFeedback) return null;

  const Icon = currentFeedback.type === 'correct' ? CheckCircle2 : XCircle;
  const alertVariant = currentFeedback.type === 'correct' ? 'default' : 'destructive';
  // For 'default' variant in alert, we may want specific success colors.
  // Let's use primary for correct, destructive for incorrect.
  // This would require custom styling or a 'success' variant for Alert.
  // For now, default will be themed by card, destructive by destructive colors.

  return (
    <Alert 
        variant={alertVariant} 
        className={`my-6 animate-slide-in-up ${currentFeedback.type === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'}`}
        role="alert"
    >
      <Icon className={`h-5 w-5 ${currentFeedback.type === 'correct' ? 'text-green-600' : 'text-red-600'}`} />
      <AlertTitle className={`font-bold ${currentFeedback.type === 'correct' ? 'text-green-800' : 'text-red-800'}`}>{currentFeedback.message}</AlertTitle>
      {currentFeedback.explanation && (
        <AlertDescription className={`mt-2 ${currentFeedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 mt-1 text-blue-500" />
            <p>{currentFeedback.explanation}</p>
          </div>
        </AlertDescription>
      )}
      <Button 
        onClick={() => dispatch({ type: 'NEXT_QUESTION_OR_SUMMARY' })} 
        className="mt-4 w-full bg-primary hover:bg-primary/80 text-primary-foreground"
        aria-label="Next"
      >
        Next
      </Button>
    </Alert>
  );
}
