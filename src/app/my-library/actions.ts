
"use server";

import { translate } from "@/ai/flows/translate-flow";
import { type TranslateInput, TranslateInputSchema } from "@/ai/schemas";

export async function translateStudyPlan(input: TranslateInput) {
  const validatedInput = TranslateInputSchema.safeParse(input);

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

