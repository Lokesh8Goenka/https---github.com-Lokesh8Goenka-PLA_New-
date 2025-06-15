
"use client";

import { useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import type { Question, Option } from '@/types/quiz';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function QuestionDisplay() {
  const { state, dispatch } = useQuiz();
  const { selectedSubject, currentLevelIndex, currentQuestionIndex, isRemedialRound } = state;
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  if (!selectedSubject) return null;

  const level = selectedSubject.levels[currentLevelIndex];
  const questions = isRemedialRound ? (level.remedialQuestions || []) : level.questions;
  const question: Question | undefined = questions[currentQuestionIndex];

  if (!question) {
    return <p>Loading question or end of questions...</p>;
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (selectedOptionId) {
      dispatch({ type: 'ANSWER_QUESTION', payload: { questionId: question.id, selectedOptionId } });
      setSelectedOptionId(null); // Reset for next question
    }
  };

  return (
    <Card className="w-full animate-subtle-fade-in shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-foreground">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option: Option) => (
          <Button
            key={option.id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal border-2",
              selectedOptionId === option.id 
                ? "bg-primary/20 border-primary ring-2 ring-primary text-primary-foreground" 
                : "hover:bg-secondary/80 border-input",
              "focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            onClick={() => handleOptionSelect(option.id)}
            aria-pressed={selectedOptionId === option.id}
          >
            {option.text}
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedOptionId}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3"
          aria-label="Submit answer"
        >
          Submit Answer
        </Button>
      </CardFooter>
    </Card>
  );
}
