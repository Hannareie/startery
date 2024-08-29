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

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const initialValues: FormItems = {
  personal: {
    name: "",
    email: "",
    phone: 0,
    location: "",
  },
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
  phone: z.number(),
  location: z.string(),
});

const UserInfoForm = ({ personal, updateForm }: StepProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.personal?.name,
      email: initialValues.personal?.name,
      phone: initialValues.personal?.phone,
      location: initialValues.personal?.location,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const update: FormItems = {
      personal: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        location: values.location,
      },
    };
    updateForm(update);
  }

  return (
    <FormWrapper title="Personal information">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 m-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First and last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (optional) </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your location" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  );
};

export default UserInfoForm;
