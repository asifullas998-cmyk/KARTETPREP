
'use server';

/**
 * @fileOverview A flow for translating text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const TranslateInputSchema = z.object({
  studyPlan: z.string().describe('The study plan to translate.'),
  targetLanguage: z.string().describe('The target language (e.g., en, kn, ur).'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export const TranslateOutputSchema = z.object({
  translatedPlan: z.string().describe('The translated study plan.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

export async function translate(input: TranslateInput): Promise<TranslateOutput> {
  return translateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: TranslateInputSchema},
  output: {schema: TranslateOutputSchema},
  prompt: `Translate the following study plan to the target language. Preserve the formatting.

Study Plan:
{{{studyPlan}}}

Target Language: {{{targetLanguage}}}
`,
});

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
