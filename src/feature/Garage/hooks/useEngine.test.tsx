import { createRef } from "react";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWinnerResult } from "../../winners/api/winners.api";
import { useAppStore } from "../../../store/useAppStore";
import { runEngine } from "../service/engine.service";
import { useEngine } from "./useEngine";

vi.mock("../service/engine.service", () => ({ runEngine: vi.fn() }));
vi.mock("../api/garage.api", () => ({ toggleEngine: vi.fn() }));
vi.mock("../../winners/api/winners.api", () => ({ saveWinnerResult: vi.fn() }));

describe("useEngine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState(useAppStore.getInitialState(), true);
  });

  it("runs an individual car without saving a winner", async () => {
    vi.mocked(runEngine).mockResolvedValue({ carId: 5, durationMs: 500, success: true });
    const carRef = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useEngine(5, carRef));

    await act(async () => result.current.handleStart());

    expect(runEngine).toHaveBeenCalledOnce();
    expect(saveWinnerResult).not.toHaveBeenCalled();
    expect(useAppStore.getState().movingCars[5]).toBe(true);
  });
});
