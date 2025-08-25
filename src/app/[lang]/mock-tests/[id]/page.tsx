"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Clock, Flag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const sampleQuestions = [
  {
    id: 1,
    text: "Which is a characteristic of Piaget's Concrete Operational stage?",
    options: ["Abstract reasoning", "Egocentrism", "Conservation", "Hypothetical thinking"],
  },
  {
    id: 2,
    text: "According to Vygotsky, learning occurs in the:",
    options: ["Zone of Proximal Development", "Sensorimotor Stage", "Preoperational Stage", "Formal Operational Stage"],
  },
  {
    id: 3,
    text: "Which of the following is NOT a primary color?",
    options: ["Red", "Yellow", "Green", "Blue"],
  },
  {
    id: 4,
    text: "What is the capital of Karnataka?",
    options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"],
  },
  {
    id: 5,
    text: "The 'Right to Education' Act in India was enacted in which year?",
    options: ["2005", "2009", "2012", "2015"],
  },
];

export default function MockTestInterface({ params }: { params: { id: string, lang: string } }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150 * 60); // 150 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleOptionChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  // This page is not fully translated as it's a complex component.
  // The content of questions would need to come from a translated source.
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">Question {currentQuestion.id}</CardTitle>
            <Button variant="outline" size="sm"><Flag className="mr-2 h-4 w-4"/>Flag for Review</Button>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{currentQuestion.text}</p>
            <RadioGroup value={answers[currentQuestion.id]} onValueChange={handleOptionChange}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNext} disabled={currentQuestionIndex === sampleQuestions.length - 1}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="lg:w-72 flex-shrink-0 space-y-4">
         <Card>
           <CardHeader className="p-4">
             <div className="flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-bold font-mono text-xl">{formatTime(timeLeft)}</span>
             </div>
           </CardHeader>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle className="text-lg font-headline">Question Palette</CardTitle>
           </CardHeader>
           <CardContent className="grid grid-cols-5 gap-2">
             {sampleQuestions.map((q, index) => (
                <Button 
                  key={q.id} 
                  variant={index === currentQuestionIndex ? "default" : (answers[q.id] ? "secondary" : "outline")}
                  size="icon"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={index === currentQuestionIndex ? 'ring-2 ring-primary ring-offset-2' : ''}
                >
                  {q.id}
                </Button>
             ))}
           </CardContent>
         </Card>
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">Submit Test</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You will be taken to the results page after submission.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Submit</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
