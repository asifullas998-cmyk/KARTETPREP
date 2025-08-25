import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Pencil } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/server";

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const { t } = await useTranslation(lang, 'home');
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
          {t('welcome')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {t('description')}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href={`/${lang}/dashboard`}>{t('goToDashboard')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={`/${lang}/syllabus`}>{t('viewSyllabus')}</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard
          href={`/${lang}/practice`}
          icon={<Pencil className="w-8 h-8 text-accent" />}
          title={t('practiceQuestions.title')}
          description={t('practiceQuestions.description')}
        />
        <FeatureCard
          href={`/${lang}/mock-tests`}
          icon={<FileText className="w-8 h-8 text-accent" />}
          title={t('mockTests.title')}
          description={t('mockTests.description')}
        />
        <FeatureCard
          href={`/${lang}/syllabus`}
          icon={<BookOpen className="w-8 h-8 text-accent" />}
          title={t('syllabus.title')}
          description={t('syllabus.description')}
        />
      </section>
    </div>
  );
}

function FeatureCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href} className="group">
      <Card className="h-full hover:border-primary transition-colors hover:shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="p-4 bg-accent/10 rounded-full">
            {icon}
          </div>
          <CardTitle className="mt-4 font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          {description}
        </CardContent>
      </Card>
    </Link>
  );
}
