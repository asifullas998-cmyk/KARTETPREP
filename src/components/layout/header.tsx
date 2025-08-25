
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Globe, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";

export function Header({ lang }: { lang: string }) {
    const { t } = useTranslation(lang, 'header');
    const pathname = usePathname();
    const router = useRouter();

    const pageTitles: Record<string, string> = {
        "dashboard": t('pageTitles.dashboard'),
        "syllabus": t('pageTitles.syllabus'),
        "practice": t('pageTitles.practice'),
        "mock-tests": t('pageTitles.mocktests'),
        "previous-papers": t('pageTitles.previousPapers'),
        "study-plan": t('pageTitles.studyplan'),
        "my-library": t('pageTitles.mylibrary'),
        "login": t('login'),
        "register": t('register'),
    };

    const getPageTitle = (path: string) => {
        const pathSegments = path.split('/').filter(Boolean);
        const pageKey = pathSegments[1] || '';
        
        if (pageKey.startsWith('mock-tests') && pathSegments.length > 2) {
            return t('pageTitles.mocktests');
        }

        return pageTitles[pageKey] || t('home');
    };

    const handleLanguageChange = (newLang: string) => {
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
        router.push(newPath);
    };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="text-xl font-semibold tracking-tight font-headline">
        {getPageTitle(pathname)}
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t('switchLanguage')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('kn')}>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('ur')}>اردو (Urdu)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-6 w-6" />
              <span className="sr-only">{t('userMenu')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/login`}>{t('login')}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${lang}/register`}>{t('register')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
