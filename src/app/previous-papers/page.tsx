
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileClock } from "lucide-react";
import { QuestionPaperClient } from "./question-paper-client";

export default function PreviousPapersPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
            <FileClock className="w-8 h-8 text-primary" />
            Previous Year Papers (AI Enhanced)
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate a question paper of important questions for a subject.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Generate Question Paper</CardTitle>
            <CardDescription>Select a subject and language to generate a paper with AI-curated important questions.</CardDescription>
        </CardHeader>
        <CardContent>
            <QuestionPaperClient />
        </CardContent>
      </Card>
    </div>
  );
}
