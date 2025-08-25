
'use server';

/**
 * @fileOverview Saves a study plan to a persistent store.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {v4 as uuidv4} from 'uuid';
import { ListStudyPlansOutputSchema, SaveStudyPlanInputSchema, SaveStudyPlanOutputSchema, type ListStudyPlansOutput, type SaveStudyPlanInput, type SaveStudyPlanOutput } from '../schemas';

// This is a mock in-memory store. In a real app, you'd use a database.
const studyPlanStore: Record<string, { id: string; content: string; createdAt: string; }> = {};


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

