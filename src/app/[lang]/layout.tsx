import type { Metadata } from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: 'KARTET Prep',
  description: 'Your comprehensive preparation tool for the KARTET exam.',
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <div lang={lang} dir={dir(lang)}>
      <div
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <SidebarProvider>
          <Sidebar>
            <MainSidebar lang={lang} />
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <Header lang={lang} />
            <main className="flex-1 p-4 md:p-8 pt-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </div>
    </div>
  );
}
