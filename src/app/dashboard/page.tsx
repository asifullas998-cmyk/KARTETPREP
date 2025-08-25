import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const progressData = [
  { name: "CDP", correct: 25, total: 30 },
  { name: "Lang I", correct: 22, total: 30 },
  { name: "Lang II", correct: 18, total: 30 },
  { name: "Maths", correct: 28, total: 30 },
  { name: "EVS", correct: 20, total: 30 },
];

const notifications = [
    { icon: CheckCircle, title: "KARTET 2024 results announced.", time: "2 days ago", color: "text-green-500" },
    { icon: Bell, title: "New mock test for Paper II is available.", time: "5 days ago", color: "text-blue-500" },
    { icon: Clock, title: "Application deadline for KARTET 2025 extended.", time: "1 week ago", color: "text-orange-500" },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Progress</CardTitle>
            <CardDescription>Performance in recent practice sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Bar dataKey="correct" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Correct Answers"
                  label={{ position: "top", fill: "hsl(var(--foreground))", fontSize: 12, formatter: (value: number, props: any) => `${Math.round((value / props.payload.total) * 100)}%` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
                  <div className={`p-2 bg-muted rounded-full ${item.color}`}>
                     <item.icon className="w-5 h-5 text-white" style={{color: item.color}} />
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
