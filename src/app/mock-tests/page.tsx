
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const mockTests = [
  {
    id: "paper-1",
    title: "Paper I Mock Test",
    description: "For classes I to V. Covers Child Development, Language I & II, Mathematics, and Environmental Studies.",
    questions: 150,
    duration: 150,
  },
  {
    id: "paper-2",
    title: "Paper II Mock Test",
    description: "For classes VI to VIII. Covers Child Development, Language I & II, and your choice of Mathematics & Science or Social Studies.",
    questions: 150,
    duration: 150,
  },
];

export default function MockTestsPage() {
    const [languages, setLanguages] = useState<Record<string, string>>({});

    const handleLanguageChange = (testId: string, language: string) => {
        setLanguages(prev => ({...prev, [testId]: language}));
    }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Mock Tests</h1>
        <p className="text-muted-foreground mt-2">
          Simulate the exam environment and test your preparation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {mockTests.map((test) => (
          <Card key={test.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-headline">{test.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{test.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{test.questions} Questions</span>
                  <span>&bull;</span>
                  <span>{test.duration} Minutes</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Select onValueChange={(lang) => handleLanguageChange(test.id, lang)} defaultValue="en">
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                        <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    </SelectContent>
                </Select>
              <Button asChild className="w-full">
                <Link href={`/mock-tests/${test.id}?lang=${languages[test.id] || 'en'}`}>
                  Start Test <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
