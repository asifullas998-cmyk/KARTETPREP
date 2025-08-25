"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";

export default function DashboardPage({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation(lang, 'dashboard');

  const notifications = [
      { icon: CheckCircle, title: t('notifications.resultsAnnounced'), time: t('time.daysAgo', { count: 2 }), color: "text-green-500" },
      { icon: Bell, title: t('notifications.newMockTest'), time: t('time.daysAgo', { count: 5 }), color: "text-blue-500" },
      { icon: Clock, title: t('notifications.deadlineExtended'), time: t('time.weekAgo', { count: 1 }), color: "text-orange-500" },
  ];

  return (
    <div className="grid gap-8 grid-cols-1">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('notifications.title')}</CardTitle>
            <CardDescription>{t('notifications.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {notifications.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                   <div className="p-2 bg-muted rounded-full">
                     <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
