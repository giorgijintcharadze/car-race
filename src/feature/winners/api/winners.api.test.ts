import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWinnerResult } from "./winners.api";

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

describe("saveWinnerResult", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("increments wins while preserving a better stored time", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ id: 4, wins: 2, time: 1.5 }))
      .mockResolvedValueOnce(jsonResponse({ id: 4, wins: 3, time: 1.5 }));

    await saveWinnerResult(4, 2.25);

    const updateRequest = fetchMock.mock.calls[1]?.[1];
    expect(JSON.parse(String(updateRequest?.body))).toEqual({ wins: 3, time: 1.5 });
  });

  it("creates a winner when the car has no result", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({}, 404))
      .mockResolvedValueOnce(jsonResponse({ id: 8, wins: 1, time: 1.23 }, 201));

    await saveWinnerResult(8, 1.234);

    const createRequest = fetchMock.mock.calls[1]?.[1];
    expect(JSON.parse(String(createRequest?.body))).toEqual({ id: 8, wins: 1, time: 1.23 });
  });
});
