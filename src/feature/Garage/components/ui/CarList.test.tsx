import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CarList from "./CarList";

describe("CarList", () => {
  it("shows a friendly empty Garage message", () => {
    render(
      <CarList
        cars={[]}
        isLoading={false}
        error={null}
        disabled={false}
        isDeleting={false}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("No cars in the garage.")).toBeInTheDocument();
  });
});
