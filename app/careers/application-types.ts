export type ApplicationRecord = {
  id: string;
  submittedAt: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  experience: string;
  skills: string;
  jobAnswers?: Record<string, string>;
  availability: string;
  cvName: string;
  cvType: "pdf" | "docx";
  cvText: string;
  capabilityTags: string[];
  extractionStatus: "parsed" | "needs-review";
};
