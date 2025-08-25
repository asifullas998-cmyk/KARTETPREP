
'use server';

/**
 * @fileOverview A flow for translating text.
 */

import {ai} from '@/ai/genkit';
import { TranslateInputSchema, TranslateOutputSchema, type TranslateInput, type TranslateOutput } from '../schemas';

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

