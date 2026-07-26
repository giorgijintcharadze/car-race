import { useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "../../../store/useAppStore";
import { useRef, useState } from "react";
import type { Car } from "../types/car.types";
import { startEngine } from "../service/engine.service";
import { toggleEngine } from "../api/garage.api";
import { ENGINE_STATUS } from "../../../utils/constants";

export const useRace = () => {
  const queryClient = useQueryClient();
  const { setMovingCar } = useAppStore();
  const animationsRef = useRef<Map<number, Animation>>(new Map());
  const winnerRef = useRef<{ carName: string; time: number } | null>(null);
  const [winner, setWinner] = useState<{ carName: string; time: number } | null>(null);

  const startRace = async (cars: Car[]) => {
    winnerRef.current = null;
    setWinner(null);

    const animationPromises = cars.map(async (car) => {
      try {
        setMovingCar(car.id, true);

        const carElement = document.querySelector(`[data-car-id="${car.id}"]`);

        if (carElement) {
          const velocity = Math.random() * 6 + 4;
          const distance = 5000;
          const timeMs = Math.round(distance / velocity);

          const trackWidth = carElement.parentElement?.clientWidth ?? 1000;

          const animation = carElement.animate(
            [{ transform: "translateX(0px)" }, { transform: `translateX(${trackWidth - 100}px)` }],
            {
              duration: timeMs,
              fill: "forwards",
            },
          );

          animationsRef.current.set(car.id, animation);

          await animation.finished;
        }

        await startEngine(
          {
            carId: car.id,
          },
          queryClient,
        );

        if (!winnerRef.current) {
          const timeMs = Math.round((Math.random() * 6 + 4) * 1000);
          const timeSeconds = timeMs / 1000;
          winnerRef.current = { carName: car.name, time: timeSeconds };
          setWinner({ carName: car.name, time: timeSeconds });
        }
      } catch (error) {
        console.warn(`Race failed for car ${car.id}:`, error);
      } finally {
        setMovingCar(car.id, false);
      }
    });

    await Promise.all(animationPromises);
  };

  const resetRace = async (cars: Car[]) => {
    try {
      animationsRef.current.forEach((animation) => {
        animation.cancel();
      });
      animationsRef.current.clear();

      cars.forEach((car) => {
        const carElement = document.querySelector(`[data-car-id="${car.id}"]`) as HTMLElement;
        if (carElement) {
          carElement.style.transform = "translateX(0px)";
        }
      });

      await Promise.all(
        cars.map((car) =>
          toggleEngine(car.id, ENGINE_STATUS.STOPPED).catch((error) => {
            console.warn(`Failed to stop car ${car.id}:`, error);
          }),
        ),
      );

      cars.forEach((car) => {
        setMovingCar(car.id, false);
      });

      winnerRef.current = null;
      setWinner(null);
    } catch (error) {
      console.warn("Reset race failed:", error);
    }
  };

  const clearWinner = () => {
    setWinner(null);
  };

  return {
    startRace,
    resetRace,
    winner,
    clearWinner,
  };
};
