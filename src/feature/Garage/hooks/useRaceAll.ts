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
    // Reset winner for new race
    winnerRef.current = null;
    setWinner(null);

    const animationPromises = cars.map(async (car) => {
      try {
        setMovingCar(car.id, true);

        // Get the car element by data-car-id attribute
        const carElement = document.querySelector(`[data-car-id="${car.id}"]`);

        if (carElement) {
          const velocity = Math.random() * 6 + 4;
          const distance = 5000;
          const timeMs = Math.round(distance / velocity);

          // Create animation for the car
          const animation = carElement.animate(
            [{ transform: "translateX(0px)" }, { transform: "translateX(calc(100vw - 200px))" }],
            {
              duration: timeMs,
              fill: "forwards",
            },
          );

          // Store animation reference
          animationsRef.current.set(car.id, animation);

          // Wait for animation to complete
          await animation.finished;
        }

        // Execute race logic
        await startEngine(
          {
            carId: car.id,
          },
          queryClient,
        );

        // Track first winner
        if (!winnerRef.current) {
          const timeMs = Math.round((Math.random() * 6 + 4) * 1000); // Calculate time
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
      // Cancel all ongoing animations
      animationsRef.current.forEach((animation) => {
        animation.cancel();
      });
      animationsRef.current.clear();

      // Reset car positions
      cars.forEach((car) => {
        const carElement = document.querySelector(`[data-car-id="${car.id}"]`) as HTMLElement;
        if (carElement) {
          carElement.style.transform = "translateX(0px)";
        }
      });

      // Stop all car engines
      await Promise.all(
        cars.map((car) =>
          toggleEngine(car.id, ENGINE_STATUS.STOPPED).catch((error) => {
            console.warn(`Failed to stop car ${car.id}:`, error);
          }),
        ),
      );

      // Reset moving state for all cars
      cars.forEach((car) => {
        setMovingCar(car.id, false);
      });

      // Clear winner
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
