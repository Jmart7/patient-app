import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientCard from "./PatientCard";
import type { Patient } from "@/types/patient";

const patient: Patient = {
  id: "101",
  createdAt: "2024-03-15T10:00:00.000Z",
  name: "Romina W",
  avatar: "",
  description: "Referred from another clinic for general evaluation",
  website: "https://romina.com",
};

describe("PatientCard", () => {
  it("renders name and id", () => {
    render(<PatientCard patient={patient} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Romina W")).toBeInTheDocument();
    expect(screen.getByText("ID: 101")).toBeInTheDocument();
  });

  it("truncates description by default", () => {
    render(<PatientCard patient={patient} onEdit={vi.fn()} onDelete={vi.fn()} />);
    const desc = screen.getByText(patient.description);
    expect(desc.className).toContain("line-clamp-2");
  });

  it("expands on view details click", () => {
    render(<PatientCard patient={patient} onEdit={vi.fn()} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByText("View details"));
    expect(screen.getByText("Show less")).toBeInTheDocument();
    expect(screen.getByText(patient.website)).toBeInTheDocument();
  });

  it("collapses back on show less click", () => {
    render(<PatientCard patient={patient} onEdit={vi.fn()} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByText("View details"));
    fireEvent.click(screen.getByText("Show less"));
    expect(screen.getByText("View details")).toBeInTheDocument();
  });

  it("calls onEdit with the patient", () => {
    const onEdit = vi.fn();
    render(<PatientCard patient={patient} onEdit={onEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(patient);
  });

  it("calls onDelete with the id", () => {
    const onDelete = vi.fn();
    render(<PatientCard patient={patient} onEdit={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith("101");
  });
});