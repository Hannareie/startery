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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const initialValues: FormItems = {
  education: {
    university: "",
    graduationMonth: "",
    graduationYear: 1900,
    degree: "",
    major: [],
    acheivements: "",
  },
};

const formSchema = z.object({
  university: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  graduationMonth: z.string(),
  graduationYear: z.number(),
  degree: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  acheivements: z.string().min(2, {
    message: "acheivement must be at least 2 characters.",
  }),
});

const EducationForm = ({ education, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university: initialValues.education?.university,
      graduationMonth: initialValues.education?.graduationMonth,
      graduationYear: initialValues.education?.graduationYear,
      degree: initialValues.education?.degree,
      acheivements: initialValues.education?.acheivements,
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
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Univetsity</FormLabel>
                <FormControl>
                  <Input placeholder="Ola Nordmann" {...field} />
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
                      <SelectTrigger className="w-[100px]" id="month">
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
                  <FormLabel>-</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[100px]" id="year">
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
                  <Input placeholder="Ola.nordmann@gmail.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acheivements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acheivements</FormLabel>
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

export default EducationForm;
