"use client";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import data from "@/lib/data.json";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useSetting } from "@/hooks/useSetting";

export function SettingsCard() {
  const { name, cohort, location, mail } = data.profile;
  const { education, skills, tools, links } = data.aboutme;
  const { whatILove, goodAt, worldNeeds, paidFor } = data.ikigai;
  const { about } = data.bibliograhy;

  const [selected, setSetting] = useSetting();

  return (
    <Card className="w-full h-full">
      <CardContent className="grid gap-4"></CardContent>
      <CardTitle className="mt-2 pl-8 pb-6">Settings</CardTitle>
      <Accordion type="single" collapsible className="w-full pl-8 pr-8 pb-6">
        <AccordionItem value="item-1">
          <div className="flex items-center">
            <AccordionTrigger>
              <div className="pr-4">Personal information</div>
            </AccordionTrigger>
            <Button
              className="ml-auto mt-2"
              variant="nooutline"
              onClick={() =>
                setSetting({
                  selected: "personalinformation",
                })
              }
            >
              <PencilIcon className="w-[20px]" />
            </Button>
          </div>
          <AccordionContent>
            <div className="text-gray-400">Name</div>
            <div className="pb-2">{name}</div>
            <div className="text-gray-400">Cohort</div>
            <div className="pb-2">{cohort}</div>
            <div className="text-gray-400">Location</div>
            <div className="pb-2">{location}</div>
            <div className="text-gray-400">Mail</div>
            <div className="pb-2">{mail}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <div className="flex items-center">
            <AccordionTrigger>
              <div className="pr-4">About me</div>
            </AccordionTrigger>
            <Button
              className="ml-auto mt-2"
              variant="nooutline"
              onClick={() =>
                setSetting({
                  selected: "aboutme",
                })
              }
            >
              <PencilIcon className="w-[20px]" />
            </Button>
          </div>
          <AccordionContent>
            <div className="text-gray-400">Education</div>
            <div className="pb-2">
              {education.map((item, index) => (
                <div key={index} className="mb-2">
                  <div>
                    {item.university} ({item.startdate} - {item.enddate})
                  </div>
                  <div>{item.degree}</div>
                </div>
              ))}
            </div>
            <div className="text-gray-400">Skills</div>
            <div className="pb-2">{skills.join(", ")}</div>
            <div className="text-gray-400">Tools</div>
            <div className="pb-2">{tools.join(", ")}</div>
            <div className="text-gray-400">Links</div>
            <div className="pb-2">{links}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <div className="flex items-center">
            <AccordionTrigger>
              <div className="pr-4">Ikigai</div>
            </AccordionTrigger>
            <Button
              className="ml-auto mt-2"
              variant="nooutline"
              onClick={() =>
                setSetting({
                  selected: "ikigai",
                })
              }
            >
              <PencilIcon className="w-[20px]" />
            </Button>
          </div>
          <AccordionContent>
            <div className="text-gray-400">What I Love</div>
            <div className="pb-2">{whatILove}</div>
            <div className="text-gray-400">What I am Good At</div>
            <div className="pb-2">{goodAt}</div>
            <div className="text-gray-400">What the World Needs</div>
            <div className="pb-2">{worldNeeds}</div>
            <div className="text-gray-400">WHat I can Be Paid For</div>
            <div className="pb-2">{paidFor}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <div className="flex items-center">
            <AccordionTrigger>
              <div className="pr-4">Biography</div>
            </AccordionTrigger>
            <Button
              className="ml-auto mt-2"
              variant="nooutline"
              onClick={() =>
                setSetting({
                  selected: "biography",
                })
              }
            >
              <PencilIcon className="w-[20px]" />
            </Button>
          </div>
          <AccordionContent>
            <div className="text-gray-400">About</div>
            <div className="pb-2">{about}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
