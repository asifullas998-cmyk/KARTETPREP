
"use server";

import { personalizedStudyPlan } from "@/ai/flows/personalized-study-plan";
import { saveStudyPlanToLibrary } from "@/ai/flows/save-study-plan-flow";
import { type PersonalizedStudyPlanInput, PersonalizedStudyPlanInputSchema, type SaveStudyPlanInput, SaveStudyPlanInputSchema } from "@/ai/schemas";

export async function generateStudyPlan(input: PersonalizedStudyPlanInput) {
  const validatedInput = PersonalizedStudyPlanInputSchema.safeParse(input);

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

export async function saveStudyPlan(input: SaveStudyPlanInput) {
    const validatedInput = SaveStudyPlanInputSchema.safeParse(input);

    if (!validatedInput.success) {
        return { failure: "Invalid input" };
    }

    try {
        const result = await saveStudyPlanToLibrary(validatedInput.data);
        return { success: result };
    } catch (e) {
        console.error(e);
        return { failure: "Could not save study plan." };
    }
}
