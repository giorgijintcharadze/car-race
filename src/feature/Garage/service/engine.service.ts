import { QueryClient } from "@tanstack/react-query";
import { driveCar, toggleEngine } from "../api/garage.api";
import { saveWinnerResult } from "../../winners/api/winners.api";
import { ENGINE_STATUS } from "../../../utils/constants";

type StartEngineParams = {
  carId: number;
  onAnimate?: (duration: number) => void;
  onBroken?: () => void;
  onStart?: () => void;
};

export const startEngine = async (
  { carId, onAnimate, onBroken, onStart }: StartEngineParams,
  queryClient: QueryClient,
) => {
  try {
    onStart?.();

    const { velocity, distance } = await toggleEngine(carId, ENGINE_STATUS.STARTED);

    const timeMs = Math.round(distance / velocity);

    onAnimate?.(timeMs);

    await driveCar(carId);

    await saveWinnerResult(carId, timeMs / 1000);

    await queryClient.invalidateQueries({
      queryKey: ["winners"],
    });

    return true;
  } catch (error) {
    console.warn(error);

    onBroken?.();

    return false;
  }
};
