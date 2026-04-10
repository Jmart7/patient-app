import { describe, it, expect } from "vitest";
import { validatePatientForm, hasErrors } from "./validation";

describe("validatePatientForm", () => {
  it("passes when all fields are valid", () => {
    const errors = validatePatientForm({
      name: "Martin",
      avatar: "https://example.com/avatar.jpg",
      description: "Regular checkup patient",
      website: "https://example.com",
    });

    expect(hasErrors(errors)).toBe(false);
  });

  it("fails when name is empty", () => {
    const errors = validatePatientForm({
      name: "",
      avatar: "",
      description: "Some description here",
      website: "",
    });

    expect(errors.name).toBeDefined();
  });

  it("fails when name is too short", () => {
    const errors = validatePatientForm({
      name: "M",
      avatar: "",
      description: "Some description here",
      website: "",
    });

    expect(errors.name).toBeDefined();
  });

  it("fails when description is empty", () => {
    const errors = validatePatientForm({
      name: "Lucy",
      avatar: "",
      description: "",
      website: "",
    });

    expect(errors.description).toBeDefined();
  });

  it("fails when description is too short", () => {
    const errors = validatePatientForm({
      name: "Lucy",
      avatar: "",
      description: "AB",
      website: "",
    });

    expect(errors.description).toBeDefined();
  });

  it("allows website to be empty", () => {
    const errors = validatePatientForm({
      name: "Charlie",
      avatar: "",
      description: "Post surgery follow up",
      website: "",
    });

    expect(errors.website).toBeUndefined();
  });

  it("rejects a malformed website", () => {
    const errors = validatePatientForm({
      name: "Charlie",
      avatar: "",
      description: "Post surgery follow up",
      website: "not a real url",
    });

    expect(errors.website).toBeDefined();
  });

  it("accepts a website without protocol", () => {
    const errors = validatePatientForm({
      name: "Sophie",
      avatar: "",
      description: "First consultation",
      website: "some-clinic.com",
    });

    expect(errors.website).toBeUndefined();
  });
});

describe("hasErrors", () => {
  it("returns false when there are no errors", () => {
    expect(hasErrors({})).toBe(false);
  });

  it("returns true when at least one error exists", () => {
    expect(hasErrors({ name: "Name is required" })).toBe(true);
  });
});