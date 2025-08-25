
"use server";

import { translate, type TranslateInput } from "@/ai/flows/translate-flow";
import { z } from "zod";

const ActionInputSchema = z.object({
  studyPlan: z.string(),
  targetLanguage: z.string(),
});

export async function translateStudyPlan(input: TranslateInput) {
  const validatedInput = ActionInputSchema.safeParse(input);

  if (!validatedInput.success) {
    return { failure: "Invalid input" };
  }
  
  try {
    const result = await translate(validatedInput.data);
    return { success: result };
  } catch (e) {
    console.error(e);
    return { failure: "Could not translate study plan." };
  }
}
