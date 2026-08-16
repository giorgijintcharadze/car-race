import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WinnersTable from "./WinnersTable";

describe("WinnersTable", () => {
  it("uses global numbering on later pages", () => {
    render(
      <WinnersTable
        winners={[{ id: 12, name: "Roadster", color: "#ff0000", wins: 3, time: 1.2 }]}
        page={2}
        sort="wins"
        order="DESC"
        disabled={false}
        onSort={vi.fn()}
      />,
    );

    expect(screen.getByRole("cell", { name: "11" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Roadster car" })).toHaveStyle({ color: "#ff0000" });
  });
});
