
'use server';

/**
 * @fileOverview Saves a study plan to a persistent store.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {v4 as uuidv4} from 'uuid';

// This is a mock in-memory store. In a real app, you'd use a database.
const studyPlanStore: Record<string, { id: string; content: string; createdAt: string; }> = {};


export const SaveStudyPlanInputSchema = z.object({
  content: z.string().describe('The study plan content to save.'),
});
export type SaveStudyPlanInput = z.infer<typeof SaveStudyPlanInputSchema>;

export const SaveStudyPlanOutputSchema = z.object({
  id: z.string().describe('The ID of the saved study plan.'),
});
export type SaveStudyPlanOutput = z.infer<typeof SaveStudyPlanOutputSchema>;

export async function saveStudyPlanToLibrary(input: SaveStudyPlanInput): Promise<SaveStudyPlanOutput> {
  return saveStudyPlanFlow(input);
}

const saveStudyPlanFlow = ai.defineFlow(
  {
    name: 'saveStudyPlanFlow',
    inputSchema: SaveStudyPlanInputSchema,
    outputSchema: SaveStudyPlanOutputSchema,
  },
  async ({content}) => {
    const id = uuidv4();
    studyPlanStore[id] = { id, content, createdAt: new Date().toISOString() };
    console.log("Saved study plan:", studyPlanStore[id]);
    return { id };
  }
);


export const ListStudyPlansOutputSchema = z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
}));
export type ListStudyPlansOutput = z.infer<typeof ListStudyPlansOutputSchema>;

export async function listStudyPlans(): Promise<ListStudyPlansOutput> {
    return listStudyPlansFlow();
}

const listStudyPlansFlow = ai.defineFlow(
    {
        name: 'listStudyPlansFlow',
        inputSchema: z.void(),
        outputSchema: ListStudyPlansOutputSchema,
    },
    async () => {
        return Object.values(studyPlanStore).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
);
