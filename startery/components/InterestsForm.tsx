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
  interests: {
    industryPreference: "",
    rolePreference: "",
    locationPreference: "In-person",
  },
};

const formSchema = z.object({
  industryPreference: z.string().min(2, {
    message: "Industry preference must be at least 2 characters.",
  }),
  rolePreference: z.string().min(2, {
    message: "Role preference must be at least 2 characters.",
  }),
  locationPreference: z.string().min(2, {
    message: "Location preference must be at least 2 characters.",
  }),
});

const InterestsForm = ({ education, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryPreference: initialValues.education?.university,
      //graduationDate: initialValues.education?.graduationDate,
      rolePreference: initialValues.education?.degree,
      locationPreference: initialValues.education?.acheivements,
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
            name="industryPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry preference</FormLabel>
                <FormControl>
                  <Input placeholder="Ola Nordmann" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rolePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role preference</FormLabel>
                <FormControl>
                  <Input placeholder="Ola.nordmann@gmail.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location preference</FormLabel>
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

export default InterestsForm;
