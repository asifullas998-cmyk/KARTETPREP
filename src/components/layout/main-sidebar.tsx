
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Pencil,
  FileText,
  Bot,
  LogOut,
  Library,
  FileClock,
} from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

export function MainSidebar({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'main-sidebar');
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1];

  const menuItems = [
    { href: `/${currentLang}/dashboard`, label: t('dashboard'), icon: LayoutDashboard },
    { href: `/${currentLang}/syllabus`, label: t('syllabus'), icon: BookOpen },
    { href: `/${currentLang}/practice`, label: t('practice'), icon: Pencil },
    { href: `/${currentLang}/mock-tests`, label: t('mockTests'), icon: FileText },
    { href: `/${currentLang}/previous-papers`, label: t('previousPapers'), icon: FileClock },
    { href: `/${currentLang}/study-plan`, label: t('studyPlan'), icon: Bot },
    { href: `/${currentLang}/my-library`, label: t('myLibrary'), icon: Library },
  ];

  return (
    <>
      <SidebarHeader>
        <Link
          href={`/${currentLang}`}
          className="flex items-center gap-2 font-bold text-lg font-headline text-primary"
        >
          <Icons.logo className="w-6 h-6" />
          <span>{t('appTitle')}</span>
        </Link>
      </SidebarHeader>

      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                as="a"
                isActive={pathname === item.href}
                tooltip={item.label}
                >
                <item.icon />
                <span>{item.label}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter>
        <Separator className="my-2" />
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </Button>
      </SidebarFooter>
    </>
  );
}
