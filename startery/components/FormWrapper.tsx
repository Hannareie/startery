import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <div className="text-xl font-semibold md:text-2xl mt-10 mb-10 ml-5">
        {title}
      </div>
      <div>{children}</div>
    </>
  );
};

export default FormWrapper;
