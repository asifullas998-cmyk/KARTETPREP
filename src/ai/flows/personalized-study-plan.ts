'use server';

/**
 * @fileOverview An AI-powered study plan generator.
 *
 * - personalizedStudyPlan - A function that generates a personalized study plan.
 * - PersonalizedStudyPlanInput - The input type for the personalizedStudyPlan function.
 * - PersonalizedStudyPlanOutput - The return type for the personalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStudyPlanInputSchema = z.object({
  userHistory: z
    .string()
    .describe(
      'The user history, containing the questions that the user has answered, and whether the answers were correct or not. Must be in JSON format.'
    ),
  syllabus: z.string().describe('The syllabus for the KARTET exam.'),
  preferredLanguage: z
    .string()
    .describe('The preferred language of the user (en, kn, ur).'),
});
export type PersonalizedStudyPlanInput = z.infer<typeof PersonalizedStudyPlanInputSchema>;

const PersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The personalized study plan.'),
});
export type PersonalizedStudyPlanOutput = z.infer<typeof PersonalizedStudyPlanOutputSchema>;

export async function personalizedStudyPlan(input: PersonalizedStudyPlanInput): Promise<PersonalizedStudyPlanOutput> {
  return personalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStudyPlanPrompt',
  input: {schema: PersonalizedStudyPlanInputSchema},
  output: {schema: PersonalizedStudyPlanOutputSchema},
  prompt: `You are an expert KARTET exam tutor. You will generate a personalized study plan for the student based on their user history and the syllabus. The study plan should contain a list of topics to study and practice questions to answer.

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
