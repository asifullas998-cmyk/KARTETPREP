import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const paper1Syllabus = {
    "Child Development and Pedagogy": ["Development of a Primary School Child", "Concept of Inclusive education", "Learning and Pedagogy"],
    "Language I": ["Language Comprehension", "Pedagogy of Language Development"],
    "Language II": ["Comprehension", "Pedagogy of Language Development"],
    "Mathematics": ["Content (Number System, Shapes, etc.)", "Pedagogical issues"],
    "Environmental Studies": ["Content (Family, Food, Water, etc.)", "Pedagogical Issues"],
};

const paper2Syllabus = {
    "Child Development and Pedagogy": ["Development of an Elementary School Child", "Concept of Inclusive education", "Learning and Pedagogy"],
    "Language I": ["Language Comprehension", "Pedagogy of Language Development"],
    "Language II": ["Comprehension", "Pedagogy of Language Development"],
    "Mathematics and Science": ["Mathematics (Number System, Algebra, Geometry)", "Science (Food, Materials, The World of the Living)"],
    "Social Studies/Social Sciences": ["History", "Geography", "Social and Political Life"],
};


export default function SyllabusPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">KARTET Syllabus</h1>
        <p className="text-muted-foreground mt-2">
          Official syllabus structure for Paper I and Paper II.
        </p>
      </div>
      
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-headline bg-card p-4 rounded-t-lg">Paper I (for classes I to V)</AccordionTrigger>
          <AccordionContent className="bg-card p-4 rounded-b-lg">
            <SyllabusCard syllabus={paper1Syllabus} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-headline bg-card p-4 rounded-t-lg mt-4">Paper II (for classes VI to VIII)</AccordionTrigger>
          <AccordionContent className="bg-card p-4 rounded-b-lg">
            <SyllabusCard syllabus={paper2Syllabus} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function SyllabusCard({ syllabus }: { syllabus: Record<string, string[]>}) {
    return (
        <Accordion type="multiple" className="w-full space-y-2">
            {Object.entries(syllabus).map(([subject, topics], index) => (
                <AccordionItem value={`subject-${index}`} key={subject} className="border-b-0">
                    <Card>
                        <AccordionTrigger className="p-4 text-left font-semibold hover:no-underline">
                            {subject}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {topics.map(topic => <li key={topic}>{topic}</li>)}
                            </ul>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
