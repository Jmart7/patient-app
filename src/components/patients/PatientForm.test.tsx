import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatientForm from "./PatientForm";
import type { Patient } from "@/types/patient";

const existing: Patient = {
  id: "55",
  createdAt: "2023-10-01T08:56:18.714Z",
  name: "Emmett B",
  avatar: "",
  description: "Monthly blood pressure check",
  website: "https://example.com",
};

describe("PatientForm", () => {
  it("renders empty fields for new patient", () => {
    render(<PatientForm onSave={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText("Full name *")).toHaveValue("");
    expect(screen.getByLabelText("Description *")).toHaveValue("");
    expect(screen.getByText("Add patient")).toBeInTheDocument();
  });

  it("pre-fills fields when editing", () => {
    render(<PatientForm patient={existing} onSave={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText("Full name *")).toHaveValue("Emmett B");
    expect(screen.getByLabelText("Description *")).toHaveValue("Monthly blood pressure check");
    expect(screen.getByText("Update patient")).toBeInTheDocument();
  });

  it("shows errors on empty submit", async () => {
    render(<PatientForm onSave={vi.fn()} onCancel={vi.fn()} />);
    await userEvent.click(screen.getByText("Add patient"));
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
  });

  it("calls onSave with valid data", async () => {
    const onSave = vi.fn();
    render(<PatientForm onSave={onSave} onCancel={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Full name *"), "Laura M");
    await userEvent.type(screen.getByLabelText("Description *"), "Annual checkup scheduled");
    await userEvent.click(screen.getByText("Add patient"));
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Laura M",
          description: "Annual checkup scheduled",
        }),
      );
    });
  });

  it("does not call onSave when invalid", async () => {
    const onSave = vi.fn();
    render(<PatientForm onSave={onSave} onCancel={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Full name *"), "A");
    await userEvent.click(screen.getByText("Add patient"));
    await waitFor(() => {
      expect(onSave).not.toHaveBeenCalled();
    });
  });

  it("calls onCancel", async () => {
    const onCancel = vi.fn();
    render(<PatientForm onSave={vi.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("shows error on blur", async () => {
    render(<PatientForm onSave={vi.fn()} onCancel={vi.fn()} />);
    const input = screen.getByLabelText("Full name *");
    fireEvent.focus(input);
    fireEvent.blur(input);
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("disables submit while saving", () => {
    render(<PatientForm onSave={vi.fn()} onCancel={vi.fn()} saving={true} />);
    expect(screen.getByText("Saving...")).toBeDisabled();
  });
});