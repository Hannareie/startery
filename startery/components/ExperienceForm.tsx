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
  experience: {
    title: "",
    company: "",
    type: "",
    startdate: new Date(),
    enddate: new Date(),
    acheivements: "",
  },
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  startdate: z.date(),
  enddate: z.date(),
  acheivements: z.string().min(2, {
    message: "Acheivement must be at least 2 characters.",
  }),
});

const ExperienceForm = ({ education, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.experience?.title,
      company: initialValues.experience?.company,
      type: initialValues.experience?.type,
      startdate: initialValues.experience?.startdate,
      enddate: initialValues.experience?.enddate,
      acheivements: initialValues.experience?.acheivements,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ola Nordmann" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Ola.nordmann@gmail.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Acheivements" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button variant="back" type="submit">
              Back
            </Button>
            <Button variant="next" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ExperienceForm;
