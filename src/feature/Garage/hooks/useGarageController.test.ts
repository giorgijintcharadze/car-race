import { describe, expect, it } from "vitest";
import { getPageAfterDeletion } from "./useGarageController";

describe("getPageAfterDeletion", () => {
  it("moves back after deleting the last car on a later page", () => {
    expect(getPageAfterDeletion(3, 1)).toBe(2);
  });

  it("keeps the current page when other cars remain", () => {
    expect(getPageAfterDeletion(3, 2)).toBe(3);
  });
});
