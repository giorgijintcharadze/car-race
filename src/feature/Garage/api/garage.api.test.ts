import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteCar } from "./garage.api";

describe("deleteCar", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("deletes both the Garage car and its Winners record", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}"));

    await deleteCar(3);

    expect(fetchMock.mock.calls[0]?.[0]).toContain("/garage/3");
    expect(fetchMock.mock.calls[1]?.[0]).toContain("/winners/3");
  });
});
