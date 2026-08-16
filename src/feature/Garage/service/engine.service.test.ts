import { beforeEach, describe, expect, it, vi } from "vitest";
import { driveCar, toggleEngine } from "../api/garage.api";
import { calculateEngineDuration, calculateTravelDistance, runEngine } from "./engine.service";

vi.mock("../api/garage.api", () => ({
  driveCar: vi.fn(),
  toggleEngine: vi.fn(),
}));

const mockedDriveCar = vi.mocked(driveCar);
const mockedToggleEngine = vi.mocked(toggleEngine);

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
});
