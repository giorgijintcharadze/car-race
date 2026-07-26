import { useRef, type RefObject } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "../../../store/useAppStore";
import { ENGINE_STATUS } from "../../../utils/constants";
import { toggleEngine, driveCar } from "../api/garage.api";
import { saveWinnerResult } from "../../winners/api/winners.api";

export const useEngine = (carId: number, carRef: RefObject<HTMLDivElement | null>) => {
  const queryClient = useQueryClient();

  const { movingCars, setMovingCar } = useAppStore();

  //   const carRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const isMoving = movingCars[carId] ?? false;

  const handleStart = async () => {
    try {
      setMovingCar(carId, true);

      const { velocity, distance } = await toggleEngine(carId, ENGINE_STATUS.STARTED);

      const timeMs = Math.round(distance / velocity);

      if (carRef.current) {
        animationRef.current = carRef.current.animate(
          [
            { transform: "translateX(0px)" },
            {
              transform: "translateX(calc(100vw - 200px))",
            },
          ],
          {
            duration: timeMs,
            fill: "forwards",
          },
        );
      }

      await driveCar(carId);

      const timeSeconds = timeMs / 1000;

      await saveWinnerResult(carId, timeSeconds);

      await queryClient.invalidateQueries({
        queryKey: ["winners"],
      });
    } catch (error) {
      console.warn("Engine failed:", error);

      animationRef.current?.pause();

      setMovingCar(carId, false);
    }
  };

  const handleStop = async () => {
    try {
      await toggleEngine(carId, ENGINE_STATUS.STOPPED);

      animationRef.current?.cancel();

      setMovingCar(carId, false);
    } catch (error) {
      console.warn("Stop failed:", error);
    }
  };

  return {
    carRef,
    isMoving,
    handleStart,
    handleStop,
  };
};
