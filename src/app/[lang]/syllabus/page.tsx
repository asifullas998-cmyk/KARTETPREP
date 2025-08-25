import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/app/i18n";

export default async function SyllabusPage({ params: { lang } }: { params: { lang: string } }) {
  const { t } = await useTranslation(lang, 'syllabus');

  const paper1Syllabus = {
      [t('paper1.cdp.title')]: t('paper1.cdp.topics', { returnObjects: true }) as string[],
      [t('paper1.lang1.title')]: t('paper1.lang1.topics', { returnObjects: true }) as string[],
      [t('paper1.lang2.title')]: t('paper1.lang2.topics', { returnObjects: true }) as string[],
      [t('paper1.maths.title')]: t('paper1.maths.topics', { returnObjects: true }) as string[],
      [t('paper1.evs.title')]: t('paper1.evs.topics', { returnObjects: true }) as string[],
  };
  
  const paper2Syllabus = {
      [t('paper2.cdp.title')]: t('paper2.cdp.topics', { returnObjects: true }) as string[],
      [t('paper2.lang1.title')]: t('paper2.lang1.topics', { returnObjects: true }) as string[],
      [t('paper2.lang2.title')]: t('paper2.lang2.topics', { returnObjects: true }) as string[],
      [t('paper2.maths_science.title')]: t('paper2.maths_science.topics', { returnObjects: true }) as string[],
      [t('paper2.social.title')]: t('paper2.social.topics', { returnObjects: true }) as string[],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('description')}
        </p>
      </div>
      
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-headline bg-card p-4 rounded-t-lg">{t('paper1.accordionTitle')}</AccordionTrigger>
          <AccordionContent className="bg-card p-4 rounded-b-lg">
            <SyllabusCard syllabus={paper1Syllabus} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-headline bg-card p-4 rounded-t-lg mt-4">{t('paper2.accordionTitle')}</AccordionTrigger>
          <AccordionContent className="bg-card p-4 rounded-b-lg">
            <SyllabusCard syllabus={paper2Syllabus} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function SyllabusCard({ syllabus }: { syllabus: Record<string, string[]>}) {
    return (
        <Accordion type="multiple" className="w-full space-y-2">
            {Object.entries(syllabus).map(([subject, topics], index) => (
                <AccordionItem value={`subject-${index}`} key={subject} className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-4 text-left font-semibold hover:no-underline">
                            {subject}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {topics.map(topic => <li key={topic}>{topic}</li>)}
                            </ul>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
