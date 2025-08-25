import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sampleQuestion = {
  id: 1,
  topic: "Child Development and Pedagogy",
  text: "Which is a characteristic of Piaget's Concrete Operational stage?",
  options: ["Abstract reasoning", "Egocentrism", "Conservation", "Hypothetical thinking"],
};

export default function PracticePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline">Practice Questions</h1>
        <p className="text-muted-foreground mt-2">
          Select your preferences and start practicing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                  <SelectItem value="ur">اردو (Urdu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="topic">Topic</Label>
              <Select defaultValue="cdp">
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cdp">Child Development and Pedagogy</SelectItem>
                  <SelectItem value="lang1">Language I</SelectItem>
                  <SelectItem value="lang2">Language II</SelectItem>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="evs">Environmental Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Question</CardTitle>
          <CardDescription>{sampleQuestion.topic}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{sampleQuestion.text}</p>
          <RadioGroup>
            {sampleQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
            <Button variant="outline">Skip</Button>
            <Button>Check Answer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
