"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock } from "lucide-react";

const notifications = [
    { icon: CheckCircle, title: "KARTET 2024 results announced.", time: "2 days ago", color: "text-green-500" },
    { icon: Bell, title: "New mock test for Paper II is available.", time: "5 days ago", color: "text-blue-500" },
    { icon: Clock, title: "Application deadline for KARTET 2025 extended.", time: "1 week ago", color: "text-orange-500" },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8 grid-cols-1">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Notifications</CardTitle>
            <CardDescription>Official updates and announcements.</CardDescription>
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
