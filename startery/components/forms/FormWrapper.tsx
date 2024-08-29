import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <div className="text-xl font-semibold md:text-2xl mt-10 mb-4 ml-5">
        {title}
      </div>
      <div className="overflow-y-auto">{children}</div>
    </>
  );
};

export default FormWrapper;
