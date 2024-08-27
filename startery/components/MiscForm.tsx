import { FormItems } from "@/app/types";
import FormWrapper from "./FormWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const initialValues: FormItems = {
  misc: {
    skills: "",
    tools: "",
    linkedIn: "",
    portfolio: "",
    biography: "",
  },
};

const formSchema = z.object({
  skills: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  tools: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  linkedIn: z.string().min(2, {
    message: "acheivement must be at least 2 characters.",
  }),
  portfolio: z.string().min(2, {
    message: "acheivement must be at least 2 characters.",
  }),
  biography: z.string().min(2, {
    message: "acheivement must be at least 2 characters.",
  }),
});

const MiscForm = ({ misc, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: initialValues.misc?.skills,
      tools: initialValues.misc?.tools,
      linkedIn: initialValues.misc?.linkedIn,
      portfolio: initialValues.misc?.portfolio,
      biography: initialValues.misc?.biography,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const update: FormItems = {
      misc: {
        skills: values.skills,
        tools: values.tools,
        linkedIn: values.linkedIn,
        portfolio: values.portfolio,
        biography: values.biography,
      },
    };
    updateForm(update);
  }

  return (
    <FormWrapper title="Education">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 m-5"
        >
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <Input placeholder="Ola Nordmann" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tools</FormLabel>
                <FormControl>
                  <Input placeholder="Tools" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="LinkedIn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="portfolio" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Input placeholder="biography" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  );
};

export default MiscForm;
