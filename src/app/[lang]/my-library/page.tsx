import { MyLibraryClient } from "./my-library-client";
import { listStudyPlans } from "@/ai/flows/save-study-plan-flow";
import { Library } from "lucide-react";
import { useTranslation } from "@/app/i18n";

export default async function MyLibraryPage({ params: { lang } }: { params: { lang: string } }) {
  const studyPlans = await listStudyPlans();
  const { t } = await useTranslation(lang, 'my-library');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
          <Library className="w-8 h-8 text-primary" />
          {t('title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
        </p>
      </div>
      <MyLibraryClient initialStudyPlans={studyPlans} lang={lang} />
    </div>
  );
}
