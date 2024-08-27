export type FormItems = {
  personal?: personalInfo;
  education?: educationInfo;
  experience?: experienceInfo;
  interests?: personalInterests;
  misc?: miscInfo;
};

interface personalInfo {
  name: string;
  email: string;
  phone: number;
  location: string;
}

interface educationInfo {
  university: string;
  graduationMonth: string;
  graduationYear: number;
  degree: string;
  major: any;
  acheivements: string;
}

export interface experienceInfo {
  title: string;
  company: string;
  type: string;
  month: string;
  year: number;
  acheivements: string;
}

interface personalInterests {
  industryPreference: string;
  rolePreference: string;
  locationPreference: string[]; //"in-person" | "remote" | "hybrid";
  careerGoals: string;
}

interface miscInfo {
  skills: string;
  tools: string;
  linkedIn: string;
  portfolio: string;
  biography: string;
}
