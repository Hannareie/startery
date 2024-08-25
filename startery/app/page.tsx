"use client";

import { FormItems } from "./types";
import { useState } from "react";
import { useMultiplestepForm } from "@/hooks/useMultiplestepForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInfoForm from "@/components/UserInfoForm";
import EducationForm from "@/components/EducationForm";
import SideBar from "@/components/SideBar";
import ExperienceForm from "@/components/ExperienceForm";
import InterestsForm from "@/components/InterestsForm";
import MiscForm from "@/components/MiscForm";

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
  } = useMultiplestepForm(4);

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

      <div className="w-full h-full">
        {currentStepIndex === 0 && (
          <UserInfoForm key="step1" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 1 && (
          <EducationForm key="step2" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 2 && (
          <ExperienceForm key="step3" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 3 && (
          <InterestsForm key="step4" {...formData} updateForm={updateForm} />
        )}
        {currentStepIndex === 4 && (
          <MiscForm key="step5" {...formData} updateForm={updateForm} />
        )}
      </div>
    </div>
  );
}
