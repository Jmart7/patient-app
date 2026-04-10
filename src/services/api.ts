import type { Patient } from "@/types/patient";

const BASE_URL = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch patients: ${response.statusText}`);
  }

  return response.json();
}

export function createPatientLocally(
  data: Omit<Patient, "id" | "createdAt">,
): Patient {
  return {
    ...data,
    id: String(Date.now()).slice(-6),
    createdAt: new Date().toISOString(),
  };
}
