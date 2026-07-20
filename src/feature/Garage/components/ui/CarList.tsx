import type { UseMutationResult } from "@tanstack/react-query";
import type { Car } from "../../types/car.types";
import CarItem from "./CarItem";

type CarListProps = {
  cars: Car[];
  isLoading: boolean;
  error: unknown;
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
};

const CarList = ({ cars, isLoading, error, deleteMutation }: CarListProps) => {
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Something went wrong</p>;

  return (
    <div className="text-center mt-10 ">
      <h3 className="font-bold">CarList</h3>
      <div>
        <ul className="bg-yellow-50 w-90 mx-auto">
          {cars.map((car) => (
            <CarItem key={car.id} car={car} deleteMutation={deleteMutation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarList;
