import { useGarage } from "../../hooks/useGarage";
import type { Car } from "../../types/car.types";

type CarItemProps = {
  car: Car;
};

const CarItem = ({ car }: CarItemProps) => {
  const { deleteMutation } = useGarage(1);

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: car.color }} />

      <p>{car.name} </p>

      <button
        onClick={() => deleteMutation.mutate(car.id)}
        className="text-white bg-red-500 cursor-pointer rounded-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default CarItem;
