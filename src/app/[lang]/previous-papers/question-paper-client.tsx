
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useToast } from "@/hooks/use-toast";
import { getQuestionPaper } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { type GenerateQuestionPaperOutput } from "@/ai/schemas";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/app/i18n/client";


const formSchema = z.object({
  subject: z.string({ required_error: "Please select a subject." }),
  language: z.string({ required_error: "Please select a language." }),
});

export function QuestionPaperClient({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'previous-papers');
  const [isLoading, setIsLoading] = useState(false);
  const [questionPaper, setQuestionPaper] = useState<GenerateQuestionPaperOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: lang,
    },
  });

  const topics: Record<string, string> = {
    "cdp": t('topics.cdp'),
    "lang1": t('topics.lang1'),
    "lang2": t('topics.lang2'),
    "maths": t('topics.maths'),
    "evs": t('topics.evs'),
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQuestionPaper(null);
    const result = await getQuestionPaper(values);
    setIsLoading(false);

    if (result.success) {
      setQuestionPaper(result.success);
      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description'),
      });
    } else {
      toast({
        variant: "destructive",
        title: t('toast.error.title'),
        description: result.failure,
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>{t('form.subject.label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder={t('form.subject.placeholder')} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {Object.entries(topics).map(([value, label]) => (
                            <SelectItem key={value} value={label}>{label}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>{t('form.language.label')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder={t('form.language.placeholder')} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="en">{t('languages.en')}</SelectItem>
                        <SelectItem value="kn">{t('languages.kn')}</SelectItem>
                        <SelectItem value="ur">{t('languages.ur')}</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>


          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('form.generateButton')}
          </Button>
        </form>
      </Form>

      {questionPaper && questionPaper.questions.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">{t('result.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {questionPaper.questions.map((q, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                    <p className="font-semibold">{index + 1}. {q.questionText}</p>
                    <ul className="space-y-2 pl-5">
                        {q.options.map((option, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="text-muted-foreground">{String.fromCharCode(97 + i)}.</span>
                                <span>{option}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-2">
                      <Badge variant="secondary">{t('result.correctAnswer')}: {q.correctAnswer}</Badge>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
