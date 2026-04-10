import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders initials when no src is provided", () => {
    render(<Avatar name="Martin P" />);
    expect(screen.getByText("MP")).toBeInTheDocument();
  });

  it("renders a single initial for a one word name", () => {
    render(<Avatar name="Ramiro" />);
    expect(screen.getByText("R")).toBeInTheDocument();
  });

  it("renders an image when a valid src is provided", () => {
    render(<Avatar name="Sophie" src="https://example.com/photo.jpg" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar name="Charlie G" src="https://broken-link.com/nope.jpg" />);
    const img = screen.getByRole("img");
    fireEvent.error(img);
    expect(screen.getByText("CG")).toBeInTheDocument();
  });

  it("shows initials when src is not a valid http url", () => {
    render(<Avatar name="Anna L" src="not-a-url" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    render(<Avatar name="Diego" size={64} />);
    const el = screen.getByText("D");
    expect(el).toHaveStyle("width: 64px");
    expect(el).toHaveStyle("height: 64px");
  });
});