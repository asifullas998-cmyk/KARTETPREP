"use server";

import { personalizedStudyPlan, type PersonalizedStudyPlanInput } from "@/ai/flows/personalized-study-plan";
import { z } from "zod";

const ActionInputSchema = z.object({
  userHistory: z.string(),
  syllabus: z.string(),
  preferredLanguage: z.string(),
});

export async function generateStudyPlan(input: PersonalizedStudyPlanInput) {
  const validatedInput = ActionInputSchema.safeParse(input);

  if (!validatedInput.success) {
    return { failure: "Invalid input" };
  }
  
  try {
    const result = await personalizedStudyPlan(validatedInput.data);
    return { success: result };
  } catch (e) {
    console.error(e);
    return { failure: "Could not generate study plan." };
  }
}
