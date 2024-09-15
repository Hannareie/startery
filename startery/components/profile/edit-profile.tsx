"use client";

import { Card, CardContent } from "../ui/card";
import { useSetting } from "@/hooks/useSetting";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  skills: z.string(),
  tools: z.string(),
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url(),
  biography: z.string(),
});

export function EditProfileCard() {
  const [selected] = useSetting();

  const form = useForm<z.infer<typeof formSchema>>();

  function onSubmit() {
    console.log("Submitted");
  }
  return (
    <>
      {selected.selected !== "" ? (
        <Card className="w-full h-full">
          <CardContent className="flex flex-col mt-5 justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6 m-5"
              >
                {selected.selected === "personalinformation" ? (
                  <>
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <Input placeholder="Enter your name" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="cohort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cohort</FormLabel>
                          <Input placeholder="Enter your cohort" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Input placeholder="Enter your location" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Input placeholder="Enter your email" {...field} />
                        </FormItem>
                      )}
                    />
                    <Button variant="next">Submit</Button>
                  </>
                ) : selected.selected === "aboutme" ? (
                  <>
                    <FormField
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University</FormLabel>
                          <Input
                            placeholder="Enter your university"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Major</FormLabel>
                          <Input placeholder="Enter your major" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <Input placeholder="Enter your skills" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="tools"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tools</FormLabel>
                          <Input placeholder="Enter your tools" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="links"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Links</FormLabel>
                          <Input placeholder="Enter your links" {...field} />
                        </FormItem>
                      )}
                    />
                    <Button variant="next">Submit</Button>
                  </>
                ) : selected.selected === "ikigai" ? (
                  <>
                    <FormField
                      name="whatilove"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What I love</FormLabel>
                          <Input placeholder="Enter what you love" {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="goodat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What I am good at</FormLabel>
                          <Input
                            placeholder="Enter what you're good at"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="worldneeds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What the world needs</FormLabel>
                          <Input
                            placeholder="Enter what the world needs"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="paidfor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What I can be paid for</FormLabel>
                          <Input
                            placeholder="Enter what you can be paid for"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <Button variant="next">Submit</Button>
                  </>
                ) : selected.selected === "biography" ? (
                  <>
                    <FormField
                      name="oneliner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-Liner</FormLabel>
                          <Input
                            placeholder="Enter your one-liner"
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About</FormLabel>
                          <Input placeholder="Enter about you" {...field} />
                        </FormItem>
                      )}
                    />
                    <Button variant="next">Submit</Button>
                  </>
                ) : null}
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
