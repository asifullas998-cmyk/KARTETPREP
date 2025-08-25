
"use server";

import { generateQuestionPaper } from "@/ai/flows/generate-question-paper-flow";
import { type GenerateQuestionPaperInput, GenerateQuestionPaperInputSchema } from "@/ai/schemas";

export async function getQuestionPaper(input: GenerateQuestionPaperInput) {
  const validatedInput = GenerateQuestionPaperInputSchema.safeParse(input);

  if (!validatedInput.success) {
    return { failure: "Invalid input" };
  }
  
  try {
    const result = await generateQuestionPaper(validatedInput.data);
    return { success: result };
  } catch (e) {
    console.error(e);
    return { failure: "Could not generate question paper." };
  }
}
