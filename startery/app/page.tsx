"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-sidebar2 to-sidebar1">
      <div className="gap-20 h-screen flex flex-col items-center justify-center">
        <div className="text-3xl text-white font-semi">
          Select your role to get started.
        </div>
        <div className="flex gap-10">
          <Link href="/student-form">
            <Button
              variant="outline"
              className="w-72 h-22 rounded-3xl text-xl text-sidebar1"
            >
              Student
            </Button>
          </Link>
          <Link href="/student-form">
            <Button
              variant="outline"
              className="w-72 h-22 rounded-3xl text-xl text-sidebar1"
            >
              Startup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
