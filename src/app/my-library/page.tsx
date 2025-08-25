
import { MyLibraryClient } from "./my-library-client";
import { listStudyPlans } from "@/ai/flows/save-study-plan-flow";
import { Library } from "lucide-react";

export default async function MyLibraryPage() {
  const studyPlans = await listStudyPlans();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-2">
          <Library className="w-8 h-8 text-primary" />
          My Library
        </h1>
        <p className="text-muted-foreground mt-2">
          View your saved study plans.
        </p>
      </div>
      <MyLibraryClient initialStudyPlans={studyPlans} />
    </div>
  );
}

