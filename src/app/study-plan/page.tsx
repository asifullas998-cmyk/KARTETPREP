import { StudyPlanForm } from "./study-plan-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function StudyPlanPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            AI Personalized Study Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Let our AI analyze your performance and create a custom study plan to help you focus on your weak areas.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Generate Your Plan</CardTitle>
            <CardDescription>Provide some details about your study history and preferences to get started.</CardDescription>
        </CardHeader>
        <CardContent>
            <StudyPlanForm />
        </CardContent>
      </Card>
    </div>
  );
}
