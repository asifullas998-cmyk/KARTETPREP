
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    topic: "cdp",
    text: "Which is a characteristic of Piaget's Concrete Operational stage?",
    options: ["Abstract reasoning", "Egocentrism", "Conservation", "Hypothetical thinking"],
    correctAnswer: "Conservation",
  },
  {
    id: 2,
    topic: "cdp",
    text: "According to Vygotsky, learning occurs in the:",
    options: ["Zone of Proximal Development", "Sensorimotor Stage", "Preoperational Stage", "Formal Operational Stage"],
    correctAnswer: "Zone of Proximal Development",
  },
  {
    id: 3,
    topic: "maths",
    text: "Which of the following is NOT a primary color?",
    options: ["Red", "Yellow", "Green", "Blue"],
    correctAnswer: "Green",
  },
  {
    id: 4,
    topic: "evs",
    text: "What is the capital of Karnataka?",
    options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"],
    correctAnswer: "Bengaluru",
  },
  {
    id: 5,
    topic: "lang1",
    text: "The 'Right to Education' Act in India was enacted in which year?",
    options: ["2005", "2009", "2012", "2015"],
    correctAnswer: "2009",
  },
];

const topics: Record<string, string> = {
    "cdp": "Child Development and Pedagogy",
    "lang1": "Language I",
    "lang2": "Language II",
    "maths": "Mathematics",
    "evs": "Environmental Studies",
};

export default function PracticePage() {
    const [language, setLanguage] = useState("en");
    const [topic, setTopic] = useState("cdp");
    const [currentQuestion, setCurrentQuestion] = useState(sampleQuestions[0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);


    const fetchNewQuestion = () => {
        setFeedback(null);
        setSelectedOption(null);
        // In a real app, you'd fetch based on language and topic.
        // For now, we'll pick a random one from the list.
        const filteredQuestions = sampleQuestions.filter(q => q.topic === topic);
        const nextQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
        setCurrentQuestion(nextQuestion);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        setFeedback({
            correct: isCorrect,
            message: isCorrect ? "Correct!" : `The correct answer is: ${currentQuestion.correctAnswer}`
        });
    };

    const handleTopicChange = (newTopic: string) => {
        setTopic(newTopic);
        setFeedback(null);
        setSelectedOption(null);
        const filteredQuestions = sampleQuestions.filter(q => q.topic === newTopic);
        setCurrentQuestion(filteredQuestions[0] || sampleQuestions[0]);
    }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Practice Questions</h1>
        <p className="text-muted-foreground mt-2">
          Select your preferences and start practicing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                  <SelectItem value="ur">اردو (Urdu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={handleTopicChange}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdp">Child Development and Pedagogy</SelectItem>
                  <SelectItem value="lang1">Language I</SelectItem>
                  <SelectItem value="lang2">Language II</SelectItem>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="evs">Environmental Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Question</CardTitle>
          <CardDescription>{topics[currentQuestion.topic]}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{currentQuestion.text}</p>
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} disabled={!!feedback}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
            {feedback && (
                <Alert variant={feedback.correct ? "default" : "destructive"} className="bg-opacity-20">
                     {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle>{feedback.correct ? "Correct!" : "Incorrect"}</AlertTitle>
                    <AlertDescription>
                        {feedback.message}
                    </AlertDescription>
                </Alert>
            )}
            <div className="flex justify-end gap-4">
                 {feedback ? (
                     <Button onClick={fetchNewQuestion}>Next Question</Button>
                 ) : (
                    <>
                        <Button variant="outline" onClick={fetchNewQuestion}>Skip</Button>
                        <Button onClick={handleCheckAnswer} disabled={!selectedOption}>Check Answer</Button>
                    </>
                 )}
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
