import { FormItems } from "@/app/types";
import FormWrapper from "./FormWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const initialValues: FormItems = {
  interests: {
    industryPreference: "",
    rolePreference: "",
    locationPreference: [""],
    careerGoals: "",
  },
};

const formSchema = z.object({
  industryPreference: z.string().min(2, {
    message: "Industry preference must be at least 2 characters.",
  }),
  rolePreference: z.string().min(2, {
    message: "Role preference must be at least 2 characters.",
  }),
  locationPreference: z.any(),
  careerGoals: z.string().min(2, {
    message: "Career goal must be at least 2 characters.",
  }),
});

const items = [
  {
    id: "in-person",
    label: "In-person",
  },
  {
    id: "remote",
    label: "Remote",
  },
  {
    id: "hybrid",
    label: "Hybrid",
  },
] as const;

const InterestsForm = ({ education, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryPreference: initialValues.interests?.industryPreference,
      rolePreference: initialValues.interests?.rolePreference,
      locationPreference: initialValues.interests?.locationPreference,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const update: FormItems = {
      interests: {
        industryPreference: values.industryPreference,
        rolePreference: values.rolePreference,
        locationPreference: values.locationPreference,
        careerGoals: values.careerGoals,
      },
    };
    updateForm(update);
  }

  return (
    <FormWrapper title="Professional interests">
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
                  <Input placeholder="Select your industries" {...field} />
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
                  <Input placeholder="Select your roles" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locationPreference"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Location preferences
                  </FormLabel>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="locationPreference"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="careerGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Career goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  );
};

export default InterestsForm;
