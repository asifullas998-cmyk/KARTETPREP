
import { z } from "zod";

// Schemas for personalized-study-plan-flow.ts
export const PersonalizedStudyPlanInputSchema = z.object({
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

export const PersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('The personalized study plan.'),
});
export type PersonalizedStudyPlanOutput = z.infer<typeof PersonalizedStudyPlanOutputSchema>;

// Schemas for save-study-plan-flow.ts
export const SaveStudyPlanInputSchema = z.object({
  content: z.string().describe('The study plan content to save.'),
});
export type SaveStudyPlanInput = z.infer<typeof SaveStudyPlanInputSchema>;

export const SaveStudyPlanOutputSchema = z.object({
  id: z.string().describe('The ID of the saved study plan.'),
});
export type SaveStudyPlanOutput = z.infer<typeof SaveStudyPlanOutputSchema>;

export const ListStudyPlansOutputSchema = z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
}));
export type ListStudyPlansOutput = z.infer<typeof ListStudyPlansOutputSchema>;


// Schemas for translate-flow.ts
export const TranslateInputSchema = z.object({
  studyPlan: z.string().describe('The study plan to translate.'),
  targetLanguage: z.string().describe('The target language (e.g., en, kn, ur).'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export const TranslateOutputSchema = z.object({
  translatedPlan: z.string().describe('The translated study plan.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

