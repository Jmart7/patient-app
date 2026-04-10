import { useEffect, useReducer, useState } from "react";
import type { Patient, PatientFormData } from "@/types/patient";
import { fetchPatients, createPatientLocally } from "@/services/api";

type Action =
  | { type: "SET"; payload: Patient[] }
  | { type: "ADD"; payload: Patient }
  | { type: "UPDATE"; payload: Patient }
  | { type: "DELETE"; payload: string };

function patientsReducer(state: Patient[], action: Action): Patient[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((p) =>
        p.id === action.payload.id ? action.payload : p,
      );
    case "DELETE":
      return state.filter((p) => p.id !== action.payload);
    default:
      return state;
  }
}

export function usePatients() {
  const [patients, dispatch] = useReducer(patientsReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchPatients()
      .then((data) => {
        if (!cancelled) {
          dispatch({ type: "SET", payload: data });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const addPatient = (data: PatientFormData) => {
    const newPatient = createPatientLocally(data);
    dispatch({ type: "ADD", payload: newPatient });
    return newPatient;
  };

  const updatePatient = (id: string, data: PatientFormData) => {
    const existing = patients.find((p) => p.id === id);
    if (!existing) return;

    const updated: Patient = { ...existing, ...data };
    dispatch({ type: "UPDATE", payload: updated });
    return updated;
  };

  const deletePatient = (id: string) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
  };
}
