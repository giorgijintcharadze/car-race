import { useCallback, useRef, type RefObject } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { ENGINE_STATUS } from "../../../utils/constants";
import { toggleEngine } from "../api/garage.api";
import { runEngine } from "../service/engine.service";

export const useEngine = (carId: number, carRef: RefObject<HTMLDivElement | null>) => {
  const { movingCars, setMovingCar } = useAppStore();
  const animationRef = useRef<Animation | null>(null);
  const operationIdRef = useRef(0);
  const isMoving = movingCars[carId] ?? false;

  const handleStart = useCallback(async () => {
    const state = useAppStore.getState();
    if (state.movingCars[carId] || state.raceStatus !== "idle") {
      return;
    }

    const operationId = operationIdRef.current + 1;
    operationIdRef.current = operationId;
    setMovingCar(carId, true);
    const result = await runEngine({
      carId,
      carElement: carRef.current,
      isActive: () => operationId === operationIdRef.current,
      onAnimation: (animation) => {
        animationRef.current = animation;
      },
    });

    if (operationId === operationIdRef.current && !result.success) {
      setMovingCar(carId, false);
    }
  }, [carId, carRef, setMovingCar]);

  const handleStop = useCallback(async () => {
    operationIdRef.current += 1;
    try {
      await toggleEngine(carId, ENGINE_STATUS.STOPPED);
      animationRef.current?.cancel();
      animationRef.current = null;
      setMovingCar(carId, false);
    } catch {
      // Keep the current state so the user can retry a failed stop request.
    }
  }, [carId, setMovingCar]);

  return { isMoving, handleStart, handleStop };
};
