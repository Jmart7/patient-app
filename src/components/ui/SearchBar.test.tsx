import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Search patients...")).toBeInTheDocument();
  });

  it("displays the current value", () => {
    render(<SearchBar value="Green" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("Green")).toBeInTheDocument();
  });

  it("calls onChange as the user types", async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    await userEvent.type(screen.getByPlaceholderText("Search patients..."), "Mar");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("accepts a custom placeholder", () => {
    render(<SearchBar value="" onChange={vi.fn()} placeholder="Filter by name..." />);
    expect(screen.getByPlaceholderText("Filter by name...")).toBeInTheDocument();
  });
});