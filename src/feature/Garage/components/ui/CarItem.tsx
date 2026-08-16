import { useRef } from "react";
import { useAppStore } from "../../../../store/useAppStore";
import { useEngine } from "../../hooks/useEngine";
import type { Car } from "../../types/car.types";
import CarIcon from "./CarIcon";

type CarItemProps = {
  car: Car;
  disabled: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => Promise<void>;
};

const CarItem = ({ car, disabled, isDeleting, onDelete }: CarItemProps) => {
  const { raceStatus, selectCar } = useAppStore();
  const carRef = useRef<HTMLDivElement>(null);
  const { isMoving, handleStart, handleStop } = useEngine(car.id, carRef);

  const handleSelect = () => {
    selectCar(car.id, car.name, car.color);
  };

  const handleDelete = () => {
    onDelete(car.id).catch(() => undefined);
  };

  return (
    <li className="py-3">
      <div className="flex flex-wrap items-center gap-2">
        <strong>{car.name}</strong>
        <button type="button" disabled={disabled || isDeleting} onClick={handleDelete}>
          Delete
        </button>
        <button type="button" disabled={disabled} onClick={handleSelect}>
          Select
        </button>
        <button type="button" disabled={disabled || isMoving} onClick={handleStart}>
          Start
        </button>
        <button type="button" disabled={!isMoving || raceStatus !== "idle"} onClick={handleStop}>
          Stop
        </button>
      </div>
      <div className="relative min-h-14 w-full overflow-hidden border-b border-dashed border-gray-500">
        <div ref={carRef} className="absolute bottom-0 left-0 w-fit" data-car-id={car.id}>
          <CarIcon color={car.color} name={car.name} />
        </div>
      </div>
    </li>
  );
};

export default CarItem;
