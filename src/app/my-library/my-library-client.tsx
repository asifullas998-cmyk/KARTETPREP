
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ListStudyPlansOutput } from "@/ai/flows/save-study-plan-flow";
import { Download, Loader2, Globe } from "lucide-react";
import { translateStudyPlan } from "./actions";

interface MyLibraryClientProps {
  initialStudyPlans: ListStudyPlansOutput;
}

export function MyLibraryClient({ initialStudyPlans }: MyLibraryClientProps) {
  const [studyPlans, setStudyPlans] = useState(initialStudyPlans);
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleDownloadPdf = async (content: string) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    // jsPDF doesn't handle Unicode characters well by default.
    // This is a basic implementation. For full language support,
    // a library like 'html2pdf' or custom fonts would be needed.
    doc.text(content, 10, 10);
    doc.save("study-plan.pdf");
  };

  const handleTranslate = async (planId: string, language: string) => {
    const originalPlan = studyPlans.find(p => p.id === planId);
    if (!originalPlan) return;

    setTranslatingId(planId);
    const result = await translateStudyPlan({
      studyPlan: originalPlan.content,
      targetLanguage: language,
    });
    setTranslatingId(null);

    if (result.success) {
      setStudyPlans(plans => plans.map(p => p.id === planId ? { ...p, content: result.success!.translatedPlan } : p));
    }
  };


  if (studyPlans.length === 0) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Your Library is Empty</CardTitle>
                <CardDescription>You haven't saved any study plans yet. Generate one from the Study Plan page!</CardDescription>
            </CardHeader>
        </Card>
    );
  }

  return (
    <div className="space-y-4">
      {studyPlans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Study Plan</CardTitle>
            <CardDescription>
              Created on: {new Date(plan.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-body text-sm bg-secondary p-4 rounded-md">
              {plan.content}
            </pre>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              variant="outline"
              onClick={() => handleDownloadPdf(plan.content)}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <Select onValueChange={(lang) => handleTranslate(plan.id, lang)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Translate..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                    <SelectItem value="ur">اردو (Urdu)</SelectItem>
                  </SelectContent>
                </Select>
                 {translatingId === plan.id && <Loader2 className="h-5 w-5 animate-spin" />}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

