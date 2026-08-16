import { ENGINE_STATUS } from "../../../utils/constants";
import { driveCar, toggleEngine } from "../api/garage.api";
import type { EngineRunResult } from "../types/engine.types";

type RunEngineOptions = {
  carId: number;
  carElement: HTMLElement | null;
  isActive?: () => boolean;
  onAnimation?: (animation: Animation) => void;
};

export const calculateEngineDuration = (distance: number, velocity: number): number =>
  Math.round(distance / velocity);

export const calculateTravelDistance = (carElement: HTMLElement): number => {
  const trackElement = carElement.parentElement;

  if (!trackElement) {
    return 0;
  }

  const trackWidth = trackElement.getBoundingClientRect().width;
  const carWidth = carElement.getBoundingClientRect().width;
  return Math.max(0, trackWidth - carWidth);
};

export const animateCar = (
  carElement: HTMLElement | null,
  durationMs: number,
): Animation | null => {
  if (!carElement) {
    return null;
  }

  const travelDistance = calculateTravelDistance(carElement);
  return carElement.animate(
    [{ transform: "translateX(0px)" }, { transform: `translateX(${travelDistance}px)` }],
    { duration: durationMs, fill: "forwards", easing: "linear" },
  );
};

export const runEngine = async ({
  carId,
  carElement,
  isActive = () => true,
  onAnimation,
}: RunEngineOptions): Promise<EngineRunResult> => {
  let durationMs = 0;
  let animation: Animation | null = null;

  try {
    const { velocity, distance } = await toggleEngine(carId, ENGINE_STATUS.STARTED);
    durationMs = calculateEngineDuration(distance, velocity);
    if (!isActive()) {
      return { carId, durationMs, success: false };
    }
    animation = animateCar(carElement, durationMs);

    if (animation) {
      onAnimation?.(animation);
    }

    await driveCar(carId);
    if (!isActive()) {
      animation?.cancel();
      return { carId, durationMs, success: false };
    }
    animation?.finish();
    return { carId, durationMs, success: true };
  } catch {
    if (isActive()) {
      animation?.pause();
    } else {
      animation?.cancel();
    }
    return { carId, durationMs, success: false };
  }
};
