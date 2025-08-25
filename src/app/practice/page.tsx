
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

type QuestionsByTopic = {
  [topic: string]: Question[];
};

type AllQuestions = {
  [language: string]: QuestionsByTopic;
};


const allQuestions: AllQuestions = {
  en: {
    cdp: [
      { id: 1, text: "Which is a characteristic of Piaget's Concrete Operational stage?", options: ["Abstract reasoning", "Egocentrism", "Conservation", "Hypothetical thinking"], correctAnswer: "Conservation" },
      { id: 2, text: "According to Vygotsky, learning occurs in the:", options: ["Zone of Proximal Development", "Sensorimotor Stage", "Preoperational Stage", "Formal Operational Stage"], correctAnswer: "Zone of Proximal Development" },
    ],
    maths: [
      { id: 3, text: "Which of the following is NOT a primary color?", options: ["Red", "Yellow", "Green", "Blue"], correctAnswer: "Green" },
    ],
    evs: [
        { id: 4, text: "What is the capital of Karnataka?", options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"], correctAnswer: "Bengaluru" },
    ],
    lang1: [
        { id: 5, text: "The 'Right to Education' Act in India was enacted in which year?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
    ]
  },
  kn: {
    cdp: [
      { id: 1, text: "ಪಿಯಾಗೆಟ್‌ನ ಕಾಂಕ್ರೀಟ್ ಆಪರೇಷನಲ್ ಹಂತದ ಗುಣಲಕ್ಷಣ ಯಾವುದು?", options: ["ಅಮೂರ್ತ ತಾರ್ಕಿಕತೆ", "ಅಹಂಕಾರ", "ಸಂರಕ್ಷಣೆ", "ಕಾಲ್ಪನಿಕ ಚಿಂತನೆ"], correctAnswer: "ಸಂರಕ್ಷಣೆ" },
      { id: 2, text: "ವೈಗೋಟ್ಸ್ಕಿಯ ಪ್ರಕಾರ, ಕಲಿಕೆ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ:", options: ["ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ", "ಸಂವೇದನಾಶೀಲ ಹಂತ", "ಕಾರ್ಯಾಚರಣೆಯ ಪೂರ್ವ ಹಂತ", "ಔಪಚಾರಿಕ ಕಾರ್ಯಾಚರಣೆಯ ಹಂತ"], correctAnswer: "ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ" },
    ],
    maths: [
        { id: 3, text: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಪ್ರಾಥಮಿಕ ಬಣ್ಣವಲ್ಲ?", options: ["ಕೆಂಪು", "ಹಳದಿ", "ಹಸಿರು", "ನೀಲಿ"], correctAnswer: "ಹಸಿರು" },
    ],
    evs: [
        { id: 4, text: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?", options: ["ಮೈಸೂರು", "ಬೆಂಗಳೂರು", "ಮಂಗಳೂರು", "ಹುಬ್ಬಳ್ಳಿ"], correctAnswer: "ಬೆಂಗಳೂರು" },
    ],
    lang1: [
        { id: 5, text: "ಭಾರತದಲ್ಲಿ 'ಶಿಕ್ಷಣ ಹಕ್ಕು' ಕಾಯ್ದೆಯನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ಜಾರಿಗೊಳಿಸಲಾಯಿತು?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
    ]
  },
  ur: {
    cdp: [
      { id: 1, text: "پیاجے کے ٹھوس عملی مرحلے کی خصوصیت کیا ہے؟", options: ["خلاصہ استدلال", "خود پسندی", "تحفظ", "فرضی سوچ"], correctAnswer: "تحفظ" },
      { id: 2, text: "وائیگاٹسکی کے مطابق، سیکھنے کا عمل کہاں ہوتا ہے:", options: ["قریبی ترقی کا زون", "حسی حرکی مرحلہ", "پری آپریشنل مرحلہ", "رسمی آپریشنل مرحلہ"], correctAnswer: "قریبی ترقی کا زون" },
    ],
    maths: [
        { id: 3, text: "مندرجہ ذیل میں سے کون سا بنیادی رنگ نہیں ہے؟", options: ["سرخ", "پیلا", "سبز", "نیلا"], correctAnswer: "سبز" },
    ],
    evs: [
        { id: 4, text: "کرناٹک کا دارالحکومت کیا ہے؟", options: ["میسور", "بنگلورو", "منگلورو", "ہبلی"], correctAnswer: "بنگلورو" },
    ],
    lang1: [
        { id: 5, text: "ہندوستان میں 'تعلیم کا حق' ایکٹ کس سال نافذ کیا گیا؟", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
    ]
  }
};


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
    const [questions, setQuestions] = useState(allQuestions[language][topic] || []);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);

    useEffect(() => {
        const newQuestions = allQuestions[language][topic] || [];
        setQuestions(newQuestions);
        setCurrentQuestion(newQuestions[0]);
        setFeedback(null);
        setSelectedOption(null);
    }, [language, topic]);


    const fetchNewQuestion = () => {
        setFeedback(null);
        setSelectedOption(null);
        const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
        setCurrentQuestion(nextQuestion);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption || !currentQuestion) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        const correctMessage = {
          en: "Correct!",
          kn: "ಸರಿಯಾಗಿದೆ!",
          ur: "صحیح!",
        };
        const incorrectMessage = {
            en: `The correct answer is: ${currentQuestion.correctAnswer}`,
            kn: `ಸರಿಯಾದ ಉತ್ತರ: ${currentQuestion.correctAnswer}`,
            ur: `صحیح جواب ہے: ${currentQuestion.correctAnswer}`,
        }
        setFeedback({
            correct: isCorrect,
            message: isCorrect ? correctMessage[language] : incorrectMessage[language]
        });
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };
    
    const handleTopicChange = (newTopic: string) => {
        setTopic(newTopic);
    };

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
              <Select value={language} onValueChange={handleLanguageChange}>
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
          {currentQuestion && <CardTitle className="font-headline text-xl">Question</CardTitle>}
          {currentQuestion && <CardDescription>{topics[topic]}</CardDescription>}
        </CardHeader>
        {currentQuestion ? (
        <>
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
        </>
        ) : (
            <CardContent>
                <p>No questions available for the selected language and topic.</p>
            </CardContent>
        )}
      </Card>
    </div>
  );
}

    