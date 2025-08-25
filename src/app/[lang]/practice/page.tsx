"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

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
      { id: 6, text: "Erikson's stage of 'Initiative vs. Guilt' corresponds to which age group?", options: ["Infancy", "Preschool", "School Age", "Adolescence"], correctAnswer: "Preschool" },
      { id: 7, text: "A key concept in constructivism is that learners:", options: ["Passively receive information", "Actively construct knowledge", "Are motivated by rewards", "Learn through imitation"], correctAnswer: "Actively construct knowledge"},
    ],
    maths: [
      { id: 3, text: "If the area of a square is 64 sq. cm, what is its perimeter?", options: ["16 cm", "32 cm", "24 cm", "64 cm"], correctAnswer: "32 cm" },
      { id: 8, text: "What is the value of 3/5 + 1/4?", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
      { id: 9, text: "Which of the following is a prime number?", options: ["15", "27", "31", "39"], correctAnswer: "31"},
    ],
    evs: [
        { id: 4, text: "What is the capital of Karnataka?", options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"], correctAnswer: "Bengaluru" },
        { id: 10, text: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correctAnswer: "Nitrogen"},
        { id: 11, text: "The 'Chipko Movement' is associated with:", options: ["Water conservation", "Forest conservation", "Soil conservation", "Air pollution"], correctAnswer: "Forest conservation"},
    ],
    lang1: [
        { id: 5, text: "The 'Right to Education' Act in India was enacted in which year?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "In the word 'unbelievable', what is the prefix?", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
    ]
  },
  kn: {
    cdp: [
      { id: 1, text: "ಪಿಯಾಗೆಟ್‌ನ ಕಾಂಕ್ರೀಟ್ ಆಪರೇಷನಲ್ ಹಂತದ ಗುಣಲಕ್ಷಣ ಯಾವುದು?", options: ["ಅಮೂರ್ತ ತಾರ್ಕಿಕತೆ", "ಅಹಂಕಾರ", "ಸಂರಕ್ಷಣೆ", "ಕಾಲ್ಪನಿಕ ಚಿಂತನೆ"], correctAnswer: "ಸಂರಕ್ಷಣೆ" },
      { id: 2, text: "ವೈಗೋಟ್ಸ್ಕಿಯ ಪ್ರಕಾರ, ಕಲಿಕೆ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ:", options: ["ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ", "ಸಂವೇದನಾಶೀಲ ಹಂತ", "ಕಾರ್ಯಾಚರಣೆಯ ಪೂರ್ವ ಹಂತ", "ಔಪಚಾರಿಕ ಕಾರ್ಯಾಚರಣೆಯ ಹಂತ"], correctAnswer: "ಸಮೀಪದ ಅಭಿವೃದ್ಧಿ ವಲಯ" },
      { id: 6, text: "ಎರಿಕ್ಸನ್ ಅವರ 'ಉಪಕ್ರಮ vs. ಅಪರಾಧ' ಹಂತವು ಯಾವ ವಯಸ್ಸಿನ ಗುಂಪಿಗೆ ಅನುರೂಪವಾಗಿದೆ?", options: ["ಶೈಶವಾವಸ್ಥೆ", "ಶಾಲಾಪೂರ್ವ", "ಶಾಲಾ ವಯಸ್ಸು", "ಹದಿಹರೆಯ"], correctAnswer: "ಶಾಲಾಪೂರ್ವ" },
      { id: 7, text: "ರಚನಾತ್ಮಕವಾದದ ಪ್ರಮುಖ ಪರಿಕಲ್ಪನೆಯೆಂದರೆ ಕಲಿಯುವವರು:", options: ["ನಿಷ್ಕ್ರಿಯವಾಗಿ ಮಾಹಿತಿಯನ್ನು ಸ್ವೀಕರಿಸುತ್ತಾರೆ", "ಸಕ್ರಿಯವಾಗಿ ಜ್ಞಾನವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ", "ಬಹುಮಾನಗಳಿಂದ ಪ್ರೇರೇಪಿಸಲ್ಪಡುತ್ತಾರೆ", "ಅನುಕರಣೆಯ ಮೂಲಕ ಕಲಿಯುತ್ತಾರೆ"], correctAnswer: "ಸಕ್ರಿಯವಾಗಿ ಜ್ಞಾನವನ್ನು ನಿರ್ಮಿಸುತ್ತಾರೆ"},
    ],
    maths: [
        { id: 3, text: "ಒಂದು ಚೌಕದ ವಿಸ್ತೀರ್ಣ 64 ಚ.ಸೆಂ.ಮೀ ಆದರೆ, ಅದರ ಪರಿಧಿ ಎಷ್ಟು?", options: ["16 ಸೆಂ.ಮೀ", "32 ಸೆಂ.ಮೀ", "24 ಸೆಂ.ಮೀ", "64 ಸೆಂ.ಮೀ"], correctAnswer: "32 ಸೆಂ.ಮೀ" },
        { id: 8, text: "3/5 + 1/4 ರ ಮೌಲ್ಯವೇನು?", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
        { id: 9, text: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಅವಿಭಾಜ್ಯ ಸಂಖ್ಯೆ?", options: ["15", "27", "31", "39"], correctAnswer: "31"},
    ],
    evs: [
        { id: 4, text: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?", options: ["ಮೈಸೂರು", "ಬೆಂಗಳೂರು", "ಮಂಗಳೂರು", "ಹುಬ್ಬಳ್ಳಿ"], correctAnswer: "ಬೆಂಗಳೂರು" },
        { id: 10, text: "ಭೂಮಿಯ ವಾತಾವರಣದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು ಇರುವ ಅನಿಲ ಯಾವುದು?", options: ["ಆಮ್ಲಜನಕ", "ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್", "ಸಾರಜನಕ", "ಆರ್ಗಾನ್"], correctAnswer: "ಸಾರಜನಕ"},
        { id: 11, text: "'ಚಿಪ್ಕೊ ಚಳುವಳಿ' ಯಾವುದಕ್ಕೆ ಸಂಬಂಧಿಸಿದೆ:", options: ["ಜಲ ಸಂರಕ್ಷಣೆ", "ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ", "ಮಣ್ಣು ಸಂರಕ್ಷಣೆ", "ವಾಯು ಮಾಲಿನ್ಯ"], correctAnswer: "ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ"},
    ],
    lang1: [
        { id: 5, text: "ಭಾರತದಲ್ಲಿ 'ಶಿಕ್ಷಣ ಹಕ್ಕು' ಕಾಯ್ದೆಯನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ಜಾರಿಗೊಳಿಸಲಾಯಿತು?", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "'unbelievable' ಪದದಲ್ಲಿ, ಪೂರ್ವಪ್ರತ್ಯಯ ಯಾವುದು?", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
    ]
  },
  ur: {
    cdp: [
      { id: 1, text: "پیاجے کے ٹھوس عملی مرحلے کی خصوصیت کیا ہے؟", options: ["خلاصہ استدلال", "خود پسندی", "تحفظ", "فرضی سوچ"], correctAnswer: "تحفظ" },
      { id: 2, text: "وائیگاٹسکی کے مطابق، سیکھنے کا عمل کہاں ہوتا ہے:", options: ["قریبی ترقی کا زون", "حسی حرکی مرحلہ", "پری آپریشنل مرحلہ", "رسمی آپریشنل مرحلہ"], correctAnswer: "قریبی ترقی کا زون" },
      { id: 6, text: "ایرکسن کا 'پہل بمقابلہ جرم' کا مرحلہ کس عمر کے گروپ سے مطابقت رکھتا ہے؟", options: ["بچپن", "پری اسکول", "اسکول کی عمر", "جوانی"], correctAnswer: "پری اسکول" },
      { id: 7, text: "تعمیر پسندی کا ایک کلیدی تصور یہ ہے کہ سیکھنے والے:", options: ["غیر فعال طور پر معلومات حاصل کرتے ہیں", "فعال طور پر علم کی تعمیر کرتے ہیں", "انعامات سے حوصلہ افزائی کرتے ہیں", "نقل کے ذریعے سیکھتے ہیں"], correctAnswer: "فعال طور پر علم کی تعمیر کرتے ہیں"},
    ],
    maths: [
        { id: 3, text: "اگر ایک مربع کا رقبہ 64 مربع سینٹی میٹر ہے، تو اس کا احاطہ کیا ہے؟", options: ["16 سینٹی میٹر", "32 سینٹی میٹر", "24 سینٹی میٹر", "64 سینٹی میٹر"], correctAnswer: "32 سینٹی میٹر" },
        { id: 8, text: "3/5 + 1/4 کی قیمت کیا ہے؟", options: ["4/9", "17/20", "3/20", "1"], correctAnswer: "17/20"},
        { id: 9, text: "مندرجہ ذیل میں سے کون سا عدد مفرد ہے؟", options: ["15", "27", "31", "39"], correctAnswer: "31"},
    ],
    evs: [
        { id: 4, text: "کرناٹک کا دارالحکومت کیا ہے؟", options: ["میسور", "بنگلورو", "منگلورو", "ہبلی"], correctAnswer: "بنگلورو" },
        { id: 10, text: "زمین کی فضا میں سب سے زیادہ کون سی گیس پائی جاتی ہے؟", options: ["آکسیجن", "کاربن ڈائی آکسائیڈ", "نائٹروجن", "آرگن"], correctAnswer: "نائٹروجن"},
        { id: 11, text: "'چپکو تحریک' کس سے وابستہ ہے:", options: ["پانی کا تحفظ", "جنگلات کا تحفظ", "مٹی کا تحفظ", "فضائی آلودگی"], correctAnswer: "جنگلات کا تحفظ"},
    ],
    lang1: [
        { id: 5, text: "ہندوستان میں 'تعلیم کا حق' ایکٹ کس سال نافذ کیا گیا؟", options: ["2005", "2009", "2012", "2015"], correctAnswer: "2009" },
        { id: 12, text: "لفظ 'unbelievable' میں، سابقہ کیا ہے؟", options: ["un", "believe", "able", "li"], correctAnswer: "un"},
    ]
  }
};

export default function PracticePage({ params: { lang } }: { params: { lang: string } }) {
    const { t } = useTranslation(lang, 'practice');
    const [language, setLanguage] = useState(lang);
    const [topic, setTopic] = useState("cdp");
    const [questions, setQuestions] = useState(allQuestions[language][topic] || []);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(questions[0]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{correct: boolean; message: string} | null>(null);

    const topics: Record<string, any> = {
      cdp: t('topics.cdp'),
      lang1: t('topics.lang1'),
      lang2: t('topics.lang2'),
      maths: t('topics.maths'),
      evs: t('topics.evs'),
    };

    useEffect(() => {
        const newQuestions = allQuestions[language]?.[topic] || [];
        setQuestions(newQuestions);
        if (newQuestions.length > 0) {
            setCurrentQuestion(newQuestions[Math.floor(Math.random() * newQuestions.length)]);
        } else {
            setCurrentQuestion(undefined);
        }
        setFeedback(null);
        setSelectedOption(null);
    }, [language, topic]);

    useEffect(() => {
      if (lang !== language) {
        setLanguage(lang);
      }
    }, [lang, language]);

    const fetchNewQuestion = () => {
        setFeedback(null);
        setSelectedOption(null);
        const nextQuestion = questions[Math.floor(Math.random() * questions.length)];
        setCurrentQuestion(nextQuestion);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption || !currentQuestion) return;
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        setFeedback({
            correct: isCorrect,
            message: isCorrect ? t('feedback.correct') : t('feedback.incorrect', { correctAnswer: currentQuestion.correctAnswer })
        });
    };
    
    const handleTopicChange = (newTopic: string) => {
        setTopic(newTopic);
    };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="topic">{t('topicLabel')}</Label>
              <Select value={topic} onValueChange={handleTopicChange}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder={t('selectTopicPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdp">{topics.cdp}</SelectItem>
                  <SelectItem value="lang1">{topics.lang1}</SelectItem>
                  <SelectItem value="lang2">{topics.lang2}</SelectItem>
                  <SelectItem value="maths">{topics.maths}</SelectItem>
                  <SelectItem value="evs">{topics.evs}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          {currentQuestion && <CardTitle className="font-headline text-xl">{t('questionTitle')}</CardTitle>}
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
                        <AlertTitle>{feedback.correct ? t('feedback.correctTitle') : t('feedback.incorrectTitle')}</AlertTitle>
                        <AlertDescription>
                            {feedback.message}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-end gap-4">
                    {feedback ? (
                        <Button onClick={fetchNewQuestion}>{t('nextQuestion')}</Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={fetchNewQuestion}>{t('skip')}</Button>
                            <Button onClick={handleCheckAnswer} disabled={!selectedOption}>{t('checkAnswer')}</Button>
                        </>
                    )}
                </div>
            </CardFooter>
        </>
        ) : (
            <CardContent>
                <p>{t('noQuestions')}</p>
            </CardContent>
        )}
      </Card>
    </div>
  );
}
