import { useRef } from "react";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Car } from "../../types/car.types";
import { useAppStore } from "../../../../store/useAppStore";
import { useEngine } from "../../hooks/useEngine";

type CarItemProps = {
  car: Car;
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
};

const CarItem = ({ car, deleteMutation }: CarItemProps) => {
  const { setSelectedCarId, setUpdateCarName, setUpdateCarColor } = useAppStore();

  const carRef = useRef<HTMLDivElement>(null);

  const { isMoving, handleStart, handleStop } = useEngine(car.id, carRef);

  const handleSelect = () => {
    setSelectedCarId(car.id);
    setUpdateCarName(car.name);
    setUpdateCarColor(car.color);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: car.color }} />

        <p>{car.name}</p>

        <button
          onClick={() => deleteMutation.mutate(car.id)}
          className="ml-10 cursor-pointer rounded-sm bg-red-500 text-white"
        >
          Delete
        </button>

        <button
          onClick={handleSelect}
          className="cursor-pointer rounded-sm bg-green-700 text-white"
        >
          SELECT
        </button>
      </div>

      <div className="track">
        <div className="controls space-x-1">
          <button onClick={handleStart} disabled={isMoving} className="cursor-pointer">
            START
          </button>

          <button onClick={handleStop} disabled={!isMoving} className="cursor-pointer">
            STOP
          </button>
        </div>

        <div className="car-wrapper">
          <div ref={carRef} className="car-icon" data-car-id={car.id}>
            🚗 {car.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarItem;
