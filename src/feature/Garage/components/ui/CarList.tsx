import type { UseMutationResult } from "@tanstack/react-query";
import type { Car } from "../../types/car.types";
import CarItem from "./CarItem";

type CarListProps = {
  cars: Car[];
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
};

const CarList = ({ cars, deleteMutation }: CarListProps) => {
  return (
    <div className="text-center mt-10 ">
      <h3 className="font-bold">CarList</h3>
      <div>
        <ul className="bg-yellow-50 w-75 mx-auto">
          {cars.map((car) => (
            <CarItem key={car.id} car={car} deleteMutation={deleteMutation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarList;
