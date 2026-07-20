import type { UseMutationResult } from "@tanstack/react-query";
import type { Car } from "../../types/car.types";

type CarItemProps = {
  car: Car;
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
};

const CarItem = ({ car, deleteMutation }: CarItemProps) => {
  return (
    <div className="flex items-center gap-4 py-2 justify-between">
      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: car.color }} />

      <p>{car.name} </p>

      <button
        onClick={() => deleteMutation.mutate(car.id)}
        className="text-white bg-red-500 cursor-pointer rounded-sm ml-10"
      >
        Delete
      </button>
    </div>
  );
};

export default CarItem;
