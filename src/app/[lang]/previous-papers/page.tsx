
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileClock } from "lucide-react";
import { QuestionPaperClient } from "./question-paper-client";
import { useTranslation } from "@/app/i18n";

export default async function PreviousPapersPage({ params: { lang } }: { params: { lang: string } }) {
  const { t } = await useTranslation(lang, 'previous-papers');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
            <FileClock className="w-8 h-8 text-primary" />
            {t('title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t('form.title')}</CardTitle>
            <CardDescription>{t('form.description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <QuestionPaperClient lang={lang} />
        </CardContent>
      </Card>
    </div>
  );
}
