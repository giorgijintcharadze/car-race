import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWinnerResult } from "../../winners/api/winners.api";
import { useAppStore } from "../../../store/useAppStore";
import { toggleEngine } from "../api/garage.api";
import { runEngine } from "../service/engine.service";
import type { EngineRunResult } from "../types/engine.types";
import { useRace } from "./useRaceAll";

vi.mock("../service/engine.service", () => ({ runEngine: vi.fn() }));
vi.mock("../api/garage.api", () => ({ toggleEngine: vi.fn() }));
vi.mock("../../winners/api/winners.api", () => ({ saveWinnerResult: vi.fn() }));

const mockedRunEngine = vi.mocked(runEngine);
const mockedSaveWinner = vi.mocked(saveWinnerResult);
const mockedToggleEngine = vi.mocked(toggleEngine);
const cars = [
  { id: 1, name: "First", color: "#111111" },
  { id: 2, name: "Second", color: "#222222" },
];

const deferred = <T,>() => {
  let resolvePromise!: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });
  return { promise, resolve: resolvePromise };
};

const createWrapper = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe("useRace", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState(useAppStore.getInitialState(), true);
    mockedToggleEngine.mockResolvedValue({ distance: 0, velocity: 0 });
  });

  it("saves only the first successful finisher", async () => {
    const first = deferred<EngineRunResult>();
    const second = deferred<EngineRunResult>();
    mockedRunEngine.mockImplementation(({ carId }) =>
      carId === 1 ? first.promise : second.promise,
    );
    const { result } = renderHook(useRace, { wrapper: createWrapper() });
    let racePromise!: Promise<void>;

    act(() => {
      racePromise = result.current.startRace(cars);
    });
    await act(async () => second.resolve({ carId: 2, durationMs: 800, success: true }));
    await act(async () => first.resolve({ carId: 1, durationMs: 600, success: true }));
    await act(async () => racePromise);

    expect(mockedSaveWinner).toHaveBeenCalledOnce();
    expect(mockedSaveWinner).toHaveBeenCalledWith(2, 0.8);
    expect(result.current.raceStatus).toBe("finished");
  });

  it("ignores stale results after reset", async () => {
    const pendingRun = deferred<EngineRunResult>();
    mockedRunEngine.mockReturnValue(pendingRun.promise);
    const { result } = renderHook(useRace, { wrapper: createWrapper() });
    let racePromise!: Promise<void>;

    act(() => {
      racePromise = result.current.startRace([cars[0]!]);
    });
    await act(async () => result.current.resetRace([cars[0]!]));
    await act(async () => pendingRun.resolve({ carId: 1, durationMs: 500, success: true }));
    await act(async () => racePromise);

    expect(mockedSaveWinner).not.toHaveBeenCalled();
    expect(result.current.raceStatus).toBe("idle");
  });

  it("finishes without a winner when every engine fails", async () => {
    mockedRunEngine.mockResolvedValue({ carId: 1, durationMs: 500, success: false });
    const { result } = renderHook(useRace, { wrapper: createWrapper() });

    await act(async () => result.current.startRace(cars));

    expect(mockedSaveWinner).not.toHaveBeenCalled();
    expect(result.current.winner).toBeNull();
    expect(result.current.raceStatus).toBe("finished");
  });
});
