
'use server';

/**
 * @fileOverview An AI-powered question paper generator for important questions.
 */

import {ai} from '@/ai/genkit';
import { GenerateQuestionPaperInputSchema, GenerateQuestionPaperOutputSchema, type GenerateQuestionPaperInput, type GenerateQuestionPaperOutput } from '../schemas';

export async function generateQuestionPaper(input: GenerateQuestionPaperInput): Promise<GenerateQuestionPaperOutput> {
  return generateQuestionPaperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionPaperPrompt',
  input: {schema: GenerateQuestionPaperInputSchema},
  output: {schema: GenerateQuestionPaperOutputSchema},
  prompt: `You are an expert KARTET exam tutor. Generate a question paper with at least 100 important and frequently repeated questions for the given subject. Provide 4 multiple choice options and the correct answer for each question. The entire response must be in the specified language.

Subject: {{{subject}}}
Language: {{{language}}}
`,
});

const generateQuestionPaperFlow = ai.defineFlow(
  {
    name: 'generateQuestionPaperFlow',
    inputSchema: GenerateQuestionPaperInputSchema,
    outputSchema: GenerateQuestionPaperOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
