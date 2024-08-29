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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import data from "@/lib/data.json";

export function ProfileCard() {
  const { name, cohort, location, mail } = data.profile;
  return (
    <Card className="w-[400px] h-[500px]">
      <CardContent className="flex flex-col items-center justify-center h-[500px]">
        <div className="pb-8">
          <Avatar className="w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="pb-4 font-bold">{name}</div>
        <div className="pb-2">{cohort} Cohort</div>
        <div className="pb-2 text-5xl">10</div>
        <div>Project completed</div>
      </CardContent>
    </Card>
  );
}
