import type { PatientFormData } from "@/types/patient";

export type ValidationErrors = Partial<Record<keyof PatientFormData, string>>;

const URL_PATTERN = /^https?:\/\/.+/i;
const LOOSE_URL_PATTERN = /^[a-z0-9][\w.-]+\.[a-z]{2,}/i;

export function validatePatientForm(data: PatientFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const description = data.description.trim();
  if (!description) {
    errors.description = "Description is required";
  } else if (description.length < 3) {
    errors.description = "Description must be at least 3 characters";
  }

  const website = data.website.trim();
  if (website && !URL_PATTERN.test(website) && !LOOSE_URL_PATTERN.test(website)) {
    errors.website = "Please enter a valid URL (e.g. https://example.com)";
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
