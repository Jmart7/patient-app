export interface Patient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
}

export type PatientFormData = Pick<
  Patient,
  "name" | "avatar" | "description" | "website"
>;
