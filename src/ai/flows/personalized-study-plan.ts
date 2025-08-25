
'use server';

/**
 * @fileOverview An AI-powered study plan generator.
 *
 * - personalizedStudyPlan - A function that generates a personalized study plan.
 */

import {ai} from '@/ai/genkit';
import { PersonalizedStudyPlanInputSchema, PersonalizedStudyPlanOutputSchema, type PersonalizedStudyPlanInput, type PersonalizedStudyPlanOutput } from '../schemas';

export async function personalizedStudyPlan(input: PersonalizedStudyPlanInput): Promise<PersonalizedStudyPlanOutput> {
  return personalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStudyPlanPrompt',
  input: {schema: PersonalizedStudyPlanInputSchema},
  output: {schema: PersonalizedStudyPlanOutputSchema},
  prompt: `You are an expert KARTET exam tutor. You will generate a personalized study plan for the student based on their user history and the syllabus. The study plan should contain a list of topics to study and practice questions to answer. The entire response must be in the student's preferred language.

User History: {{{userHistory}}}
Syllabus: {{{syllabus}}}
Preferred Language: {{{preferredLanguage}}}

Study Plan:`,
});

const personalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'personalizedStudyPlanFlow',
    inputSchema: PersonalizedStudyPlanInputSchema,
    outputSchema: PersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

