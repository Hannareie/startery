"use client";

import { FormItems } from "../types";
import { useState } from "react";
import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";
import UserInfoForm from "@/components/forms/UserInfoForm";
import EducationForm from "@/components/forms/EducationForm";
import SideBar from "@/components/forms/SideBar";
import ExperienceForm from "@/components/forms/ExperienceForm";
import InterestsForm from "@/components/forms/InterestsForm";
import MiscForm from "@/components/forms/MiscForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const initialValues: FormItems = {
  personal: {
    name: "",
    email: "",
    phone: 0,
    location: "",
  },
};

export default function Home() {
  const [formData, setFormData] = useState(initialValues);
  // const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(5);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="flex h-full">
      <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />

      <div className="flex flex-col justify-center h-screen w-full">
        {currentStepIndex === 0 && (
          <UserInfoForm key="step1" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 1 && (
          <EducationForm key="step2" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 2 && (
          <ExperienceForm
            key="step3"
            {...formData}
            experience={formData.experience}
            updateForm={updateForm}
          />
        )}
        {currentStepIndex === 3 && (
          <InterestsForm key="step4" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 4 && (
          <MiscForm key="step5" {...formData} updateForm={updateForm} />
        )}

        {isFirstStep ? (
          <div className="flex gap-6 pt-4 m-5">
            <Link href="/">
              <Button className="w-[130px]" variant="back" type="submit">
                Return to home
              </Button>
            </Link>
            <Button
              className="w-[130px]"
              variant="next"
              type="submit"
              onClick={() => nextStep()}
            >
              {isLastStep ? "Confirm" : "Next Step"}
            </Button>
          </div>
        ) : (
          <div className="flex gap-6 pt-4 m-5">
            <Button
              className="w-[130px]"
              variant="back"
              type="submit"
              onClick={() => previousStep()}
            >
              Previous Step
            </Button>

            <Button
              className="w-[130px]"
              variant="next"
              type="submit"
              onClick={() => nextStep()}
            >
              {isLastStep ? "Confirm" : "Next Step"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
