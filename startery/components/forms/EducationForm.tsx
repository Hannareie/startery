import { FormItems } from "@/app/types";
import FormWrapper from "./FormWrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const initialValues: FormItems = {
  education: {
    university: "",
    graduationMonth: "",
    graduationYear: 1900,
    degree: "",
    major: [{ value: "" }],
    acheivements: "",
  },
};

const formSchema = z.object({
  university: z.string(),
  graduationMonth: z.string(),
  graduationYear: z.number(),
  degree: z.string(),
  major: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  acheivements: z.string(),
});

const EducationForm = ({ education, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university: initialValues.education?.university,
      graduationMonth: initialValues.education?.graduationMonth,
      graduationYear: initialValues.education?.graduationYear,
      degree: initialValues.education?.degree,
      major: initialValues.education?.major,
      acheivements: initialValues.education?.acheivements,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const update: FormItems = {
      education: {
        university: values.university,
        graduationMonth: values.graduationMonth,
        graduationYear: values.graduationYear,
        degree: values.degree,
        major: values.major,
        acheivements: values.acheivements,
      },
    };
    updateForm(update);
  }

  const { fields, append, remove } = useFieldArray({
    name: "major",
    control: form.control,
  });

  return (
    <FormWrapper title="Education">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 m-5"
        >
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Univetsity</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your university" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="graduationMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation date</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[200px]" id="month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="graduationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">-</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[200px]" id="year">
                        <SelectValue placeholder="Year " />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={`${new Date().getFullYear() + i}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Select your degree" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            {fields.map((field: any, index: number) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`major.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Major
                    </FormLabel>
                    <div className="flex gap-4 pb-3">
                      <FormControl>
                        <Input placeholder="Enter your major" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          if (index !== 0) remove(index);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: "" })}
              >
                Add major
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="acheivements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic acheivements</FormLabel>
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

export default EducationForm;
