"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from '@/app/i18n/client';

export default function MockTestsPage({ params: { lang } }: { params: { lang: string } }) {
    const { t } = useTranslation(lang, 'mock-tests');
    const [languages, setLanguages] = useState<Record<string, string>>({});

    const mockTests = [
      {
        id: "paper-1",
        title: t('paper1.title'),
        description: t('paper1.description'),
        questions: 150,
        duration: 150,
      },
      {
        id: "paper-2",
        title: t('paper2.title'),
        description: t('paper2.description'),
        questions: 150,
        duration: 150,
      },
    ];

    const handleLanguageChange = (testId: string, language: string) => {
        setLanguages(prev => ({...prev, [testId]: language}));
    }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
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
                  <span>{t('questions', { count: test.questions })}</span>
                  <span>&bull;</span>
                  <span>{t('minutes', { count: test.duration })}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-center gap-4">
                <Select onValueChange={(lang) => handleLanguageChange(test.id, lang)} defaultValue="en">
                    <SelectTrigger className="w-full sm:w-auto flex-grow">
                        <SelectValue placeholder={t('selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">{t('languages.en')}</SelectItem>
                        <SelectItem value="kn">{t('languages.kn')}</SelectItem>
                        <SelectItem value="ur">{t('languages.ur')}</SelectItem>
                    </SelectContent>
                </Select>
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/${lang}/mock-tests/${test.id}?lang=${languages[test.id] || 'en'}`}>
                  {t('startTest')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
