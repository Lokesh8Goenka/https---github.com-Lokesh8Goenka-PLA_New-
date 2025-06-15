
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, GraduationCap } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  className: z.string().min(1, { message: "Class/Grade is required." }).max(30),
});

export default function UserInfoForm() {
  const { dispatch } = useQuiz();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      className: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: 'SUBMIT_USER_INFO', payload: values });
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-subtle-fade-in shadow-lg bg-card">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <GraduationCap className="w-16 h-16 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Welcome to Quiz Ascent!</CardTitle>
        <CardDescription className="text-md text-muted-foreground">
          Please enter your details to begin your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 flex items-center">
                    <User className="mr-2 h-4 w-4" /> Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Ada Lovelace" {...field} className="bg-input border-border focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 flex items-center">
                     <GraduationCap className="mr-2 h-4 w-4" /> Class / Grade
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Grade 10 or Computer Science 101" {...field} className="bg-input border-border focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="p-0 pt-4">
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3">
                Start Quiz
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
