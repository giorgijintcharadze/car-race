import { beforeEach, describe, expect, it, vi } from "vitest";
import { driveCar, toggleEngine } from "../api/garage.api";
import { calculateEngineDuration, calculateTravelDistance, runEngine } from "./engine.service";

vi.mock("../api/garage.api", () => ({
  driveCar: vi.fn(),
  toggleEngine: vi.fn(),
}));

const mockedDriveCar = vi.mocked(driveCar);
const mockedToggleEngine = vi.mocked(toggleEngine);

const deferred = <T>() => {
  let resolvePromise!: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });
  return { promise, resolve: resolvePromise };
};

const createAnimatedCar = () => {
  const track = document.createElement("div");
  const car = document.createElement("div");
  const animation = {
    cancel: vi.fn(),
    finish: vi.fn(),
    pause: vi.fn(),
  } as unknown as Animation;

  track.append(car);
  track.getBoundingClientRect = () => DOMRect.fromRect({ width: 500 });
  car.getBoundingClientRect = () => DOMRect.fromRect({ width: 100 });
  car.animate = vi.fn(() => animation);
  return { animation, car };
};

describe("engine service", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calculates duration and responsive travel distance", () => {
    const { car } = createAnimatedCar();
    expect(calculateEngineDuration(5000, 10)).toBe(500);
    expect(calculateTravelDistance(car)).toBe(400);
  });

  it("finishes an animation after a successful drive", async () => {
    const { animation, car } = createAnimatedCar();
    mockedToggleEngine.mockResolvedValue({ distance: 5000, velocity: 10 });
    mockedDriveCar.mockResolvedValue();

    const result = await runEngine({ carId: 7, carElement: car });

    expect(result).toEqual({ carId: 7, durationMs: 500, success: true });
    expect(animation.finish).toHaveBeenCalledOnce();
  });

  it("pauses an animation when drive mode fails", async () => {
    const { animation, car } = createAnimatedCar();
    mockedToggleEngine.mockResolvedValue({ distance: 5000, velocity: 10 });
    mockedDriveCar.mockRejectedValue(new Error("Engine broken"));

    const result = await runEngine({ carId: 9, carElement: car });

    expect(result.success).toBe(false);
    expect(animation.pause).toHaveBeenCalledOnce();
    expect(animation.finish).not.toHaveBeenCalled();
  });

  it("does not animate when a run is stopped before engine start resolves", async () => {
    const start = deferred<{ distance: number; velocity: number }>();
    const { car } = createAnimatedCar();
    let active = true;
    mockedToggleEngine.mockReturnValue(start.promise);

    const run = runEngine({ carId: 3, carElement: car, isActive: () => active });
    active = false;
    start.resolve({ distance: 5000, velocity: 10 });
    const result = await run;

    expect(result.success).toBe(false);
    expect(car.animate).not.toHaveBeenCalled();
    expect(mockedDriveCar).not.toHaveBeenCalled();
  });

  it("cancels instead of finishing after a reset invalidates the drive", async () => {
    const drive = deferred<void>();
    const { animation, car } = createAnimatedCar();
    let active = true;
    mockedToggleEngine.mockResolvedValue({ distance: 5000, velocity: 10 });
    mockedDriveCar.mockReturnValue(drive.promise);

    const run = runEngine({ carId: 4, carElement: car, isActive: () => active });
    await vi.waitFor(() => expect(mockedDriveCar).toHaveBeenCalledOnce());
    active = false;
    drive.resolve();
    const result = await run;

    expect(result.success).toBe(false);
    expect(animation.cancel).toHaveBeenCalledOnce();
    expect(animation.finish).not.toHaveBeenCalled();
  });
});
