import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { saveWinnerResult } from "../../winners/api/winners.api";
import { useAppStore } from "../../../store/useAppStore";
import { ENGINE_STATUS, MILLISECONDS_PER_SECOND } from "../../../utils/constants";
import { toggleEngine } from "../api/garage.api";
import { runEngine } from "../service/engine.service";
import type { Car } from "../types/car.types";
import type { RaceWinner } from "../types/engine.types";

type RaceResources = {
  animations: MutableRefObject<Map<number, Animation>>;
  runId: MutableRefObject<number>;
  winner: MutableRefObject<RaceWinner | null>;
  setWinner: Dispatch<SetStateAction<RaceWinner | null>>;
};

const getCarElement = (carId: number): HTMLElement | null =>
  document.querySelector<HTMLElement>(`[data-car-id="${carId}"]`);

const restoreCarPosition = (carId: number): void => {
  const carElement = getCarElement(carId);
  if (carElement) {
    carElement.style.transform = "translateX(0px)";
  }
};

const useSaveFirstWinner = (resources: RaceResources) => {
  const queryClient = useQueryClient();
  const { runId: activeRunId, setWinner, winner: winnerRef } = resources;
  return useCallback(
    async (car: Car, durationMs: number, runId: number) => {
      if (runId !== activeRunId.current || winnerRef.current) {
        return;
      }
      const winner = { carName: car.name, time: durationMs / MILLISECONDS_PER_SECOND };
      winnerRef.current = winner;
      setWinner(winner);
      try {
        await saveWinnerResult(car.id, winner.time);
        await queryClient.invalidateQueries({ queryKey: ["winners"] });
      } catch {
        // A statistics failure must not leave the completed race locked in running state.
      }
    },
    [activeRunId, queryClient, setWinner, winnerRef],
  );
};

const useRunRaceCar = (resources: RaceResources) => {
  const setMovingCar = useAppStore((state) => state.setMovingCar);
  const saveFirstWinner = useSaveFirstWinner(resources);
  return useCallback(
    async (car: Car, runId: number) => {
      setMovingCar(car.id, true);
      const result = await runEngine({
        carId: car.id,
        carElement: getCarElement(car.id),
        onAnimation: (animation) => {
          if (runId !== resources.runId.current) {
            animation.cancel();
          } else {
            resources.animations.current.set(car.id, animation);
          }
        },
      });
      if (runId !== resources.runId.current) {
        return;
      }
      setMovingCar(car.id, false);
      if (result.success) {
        await saveFirstWinner(car, result.durationMs, runId);
      }
    },
    [resources, saveFirstWinner, setMovingCar],
  );
};

const useStartRace = (resources: RaceResources) => {
  const { raceStatus, setRaceStatus } = useAppStore();
  const { runId: activeRunId, setWinner, winner: winnerRef } = resources;
  const runRaceCar = useRunRaceCar(resources);
  return useCallback(
    async (cars: Car[]) => {
      if (useAppStore.getState().raceStatus !== "idle" || cars.length === 0) {
        return;
      }
      const runId = activeRunId.current + 1;
      activeRunId.current = runId;
      winnerRef.current = null;
      setWinner(null);
      setRaceStatus("running");
      await Promise.allSettled(cars.map((car) => runRaceCar(car, runId)));
      if (runId === activeRunId.current) {
        setRaceStatus("finished");
      }
    },
    [activeRunId, raceStatus, runRaceCar, setRaceStatus, setWinner, winnerRef],
  );
};

const useResetRace = (resources: RaceResources) => {
  const { setMovingCar, setRaceStatus } = useAppStore();
  const { animations, runId: activeRunId, setWinner, winner: winnerRef } = resources;
  return useCallback(
    async (cars: Car[]) => {
      setRaceStatus("resetting");
      activeRunId.current += 1;
      animations.current.forEach((animation) => animation.cancel());
      animations.current.clear();
      cars.forEach((car) => restoreCarPosition(car.id));
      await Promise.allSettled(cars.map((car) => toggleEngine(car.id, ENGINE_STATUS.STOPPED)));
      cars.forEach((car) => setMovingCar(car.id, false));
      winnerRef.current = null;
      setWinner(null);
      setRaceStatus("idle");
    },
    [activeRunId, animations, setMovingCar, setRaceStatus, setWinner, winnerRef],
  );
};

export const useRace = () => {
  const [winner, setWinner] = useState<RaceWinner | null>(null);
  const resources: RaceResources = {
    animations: useRef(new Map<number, Animation>()),
    runId: useRef(0),
    winner: useRef<RaceWinner | null>(null),
    setWinner,
  };
  const startRace = useStartRace(resources);
  const resetRace = useResetRace(resources);
  const raceStatus = useAppStore((state) => state.raceStatus);
  const clearWinner = useCallback(() => setWinner(null), []);
  return { startRace, resetRace, winner, clearWinner, raceStatus };
};
