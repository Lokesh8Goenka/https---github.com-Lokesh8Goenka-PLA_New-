
"use client";

import { useQuiz } from '@/context/QuizContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function SubjectSelector() {
  const { state, dispatch } = useQuiz();

  if (state.quizState === 'loading') {
    return <p className="text-center text-lg">Loading subjects...</p>;
  }

  return (
    <div className="space-y-8 animate-subtle-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary">Quiz Ascent</h1>
        <p className="text-xl text-muted-foreground">Choose a subject to begin your ascent!</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className="hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-card flex flex-col"
            onClick={() => dispatch({ type: 'SELECT_SUBJECT', payload: subject.id })}
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && dispatch({ type: 'SELECT_SUBJECT', payload: subject.id })}
            aria-label={`Select subject: ${subject.name}`}
          >
            <CardHeader className="flex-row items-center space-x-4 pb-2">
              <subject.Icon className="w-10 h-10 text-primary" aria-hidden="true" />
              <CardTitle className="text-2xl">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{subject.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
               <Button variant="ghost" className="w-full text-primary hover:text-primary-foreground hover:bg-primary/90">
                Start Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
