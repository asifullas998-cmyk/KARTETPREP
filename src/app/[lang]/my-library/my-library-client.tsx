
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ListStudyPlansOutput } from "@/ai/schemas";
import { Download, Loader2, Globe } from "lucide-react";
import { translateStudyPlan } from "./actions";
import { NotoNastaliqUrdu } from "@/lib/fonts";
import { useTranslation } from "@/app/i18n/client";

interface MyLibraryClientProps {
  initialStudyPlans: ListStudyPlansOutput;
  lang: string;
}

export function MyLibraryClient({ initialStudyPlans, lang }: MyLibraryClientProps) {
  const { t } = useTranslation(lang, 'my-library');
  const [studyPlans, setStudyPlans] = useState(initialStudyPlans);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleDownloadPdf = async (content: string) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    const isUrdu = /[\u0600-\u06FF]/.test(content);

    doc.addFileToVFS("NotoNastaliqUrdu-Regular.ttf", NotoNastaliqUrdu);
    doc.addFont("NotoNastaliqUrdu-Regular.ttf", "NotoNastaliqUrdu", "normal");
    
    if (isUrdu) {
      doc.setFont("NotoNastaliqUrdu");
    } else {
      doc.setFont("Helvetica");
    }
    
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, 10);
    doc.save("study-plan.pdf");
  };

  const handleTranslate = async (planId: string, language: string) => {
    const originalPlan = initialStudyPlans.find(p => p.id === planId);
    if (!originalPlan) return;

    setTranslatingId(planId);

     if (language === 'en') {
        setStudyPlans(plans => plans.map(p => p.id === planId ? { ...p, content: originalPlan.content } : p));
        setTranslatingId(null);
        return;
    }


    const result = await translateStudyPlan({
      studyPlan: originalPlan.content,
      targetLanguage: language,
    });
    

    if (result.success) {
      setStudyPlans(plans => plans.map(p => p.id === planId ? { ...p, content: result.success!.translatedPlan } : p));
    }
    setTranslatingId(null);
  };


  if (studyPlans.length === 0) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>{t('empty.title')}</CardTitle>
                <CardDescription>{t('empty.description')}</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  return (
    <div className="space-y-4">
      {studyPlans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle className="font-headline text-xl">{t('plan.title')}</CardTitle>
            <CardDescription>
              {t('plan.createdOn', { date: new Date(plan.createdAt).toLocaleDateString() })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-body text-sm bg-secondary p-4 rounded-md">
              {plan.content}
            </pre>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              variant="outline"
              onClick={() => handleDownloadPdf(plan.content)}
            >
              <Download className="mr-2 h-4 w-4" /> {t('plan.downloadPdf')}
            </Button>
            <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <Select onValueChange={(lang) => handleTranslate(plan.id, lang)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('plan.translatePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('languages.en')}</SelectItem>
                    <SelectItem value="kn">{t('languages.kn')}</SelectItem>
                    <SelectItem value="ur">{t('languages.ur')}</SelectItem>
                  </SelectContent>
                </Select>
                 {translatingId === plan.id && <Loader2 className="h-5 w-5 animate-spin" />}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
