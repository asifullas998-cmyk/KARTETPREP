import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { Noto_Nastaliq_Urdu, PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq-urdu',
});


export const metadata: Metadata = {
  title: 'KARTET Prep',
  description: 'Your comprehensive preparation tool for the KARTET exam.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          ptSans.variable,
          notoNastaliqUrdu.variable
        )}
      >
        <SidebarProvider>
          <Sidebar>
            <MainSidebar />
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-8 pt-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
