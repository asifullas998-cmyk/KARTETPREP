
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateStudyPlan, saveStudyPlan } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2, Save } from "lucide-react";
import { NotoNastaliqUrdu } from "@/lib/fonts";

const formSchema = z.object({
  userHistory: z.string().min(10, "Please provide some details about your study history."),
  syllabus: z.string().min(10, "Please provide the syllabus you are following."),
  preferredLanguage: z.string({ required_error: "Please select a language." }),
});

const defaultSyllabus = `Paper I (Classes I-V):
1. Child Development and Pedagogy (30 Questions)
2. Language I (30 Questions)
3. Language II (30 Questions)
4. Mathematics (30 Questions)
5. Environmental Studies (30 Questions)
`;

const defaultHistory = `[
  {"topic": "Child Development", "question": "Piaget's stages", "correct": false},
  {"topic": "Environmental Studies", "question": "Water cycle", "correct": true},
  {"topic": "Mathematics", "question": "Fractions", "correct": false}
]`;

export function StudyPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userHistory: defaultHistory,
      syllabus: defaultSyllabus,
      preferredLanguage: "en",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setStudyPlan(null);
    const result = await generateStudyPlan(values);
    setIsLoading(false);

    if (result.success) {
      setStudyPlan(result.success.studyPlan);
      toast({
        title: "Success!",
        description: "Your personalized study plan has been generated.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.failure,
      });
    }
  }

  const handleSaveToLibrary = async () => {
    if (!studyPlan) return;
    const result = await saveStudyPlan({ content: studyPlan });
    if (result.success) {
      toast({ title: "Saved!", description: "Study plan saved to your library." });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.failure });
    }
  };

  const handleDownloadPdf = async () => {
    if (!studyPlan) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    doc.addFileToVFS("NotoNastaliqUrdu-Regular.ttf", NotoNastaliqUrdu);
    doc.addFont("NotoNastaliqUrdu-Regular.ttf", "NotoNastaliqUrdu", "normal");
    
    doc.setFont("NotoNastaliqUrdu");
    
    const lines = doc.splitTextToSize(studyPlan, 180);
    doc.text(lines, 10, 10);
    doc.save("study-plan.pdf");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Study History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide your question history in JSON format."
                    className="h-32 font-code"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your past performance (correct/incorrect answers on topics).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="syllabus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Syllabus</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the exam syllabus."
                    className="h-32 font-code"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The syllabus for the KARTET exam.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                    <SelectItem value="ur">اردو (Urdu)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The language for your study plan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Plan
          </Button>
        </form>
      </Form>

      {studyPlan && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-body text-sm bg-secondary p-4 rounded-md">
                {studyPlan}
            </pre>
            <div className="mt-4 flex gap-2">
                <Button onClick={handleSaveToLibrary}><Save className="mr-2 h-4 w-4" /> Save to Library</Button>
                <Button onClick={handleDownloadPdf} variant="outline"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
