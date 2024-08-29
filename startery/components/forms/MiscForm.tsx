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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
  skills: z.string(),
  tools: z.string(),
  linkedIn: z.string().url().optional(),
  portfolio: z.string().url(),
  biography: z.string(),
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
    <FormWrapper title="Miscellaneous">
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
                  <Input placeholder="Select your skills" {...field} />
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
                  <Input placeholder="Select your tools" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter link" {...field} />
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
                  <Input placeholder="Enter link" {...field} />
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
                  <Textarea
                    placeholder="Enter here"
                    className="resize-none"
                    {...field}
                  />
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
