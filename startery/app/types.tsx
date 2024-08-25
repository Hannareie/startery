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
  major: string[];
  acheivements: string;
}

interface experienceInfo {
  title: string;
  company: string;
  type: string;
  startdate: Date;
  enddate: Date;
  acheivements: string;
}

interface personalInterests {
  industryPreference: string;
  rolePreference: string;
  locationPreference: "In-person" | "Remote" | "Hybrid";
}

interface miscInfo {
  skills: string;
  tools: string;
  linkedIn: string;
  portfolio: string;
  biography: string;
}
