import type { Car } from "../../types/car.types";
import CarItem from "./CarItem";

type CarListProps = {
  cars: Car[];
};

const CarList = ({ cars }: CarListProps) => {
  return (
    <div className="text-center mt-10 ">
      CarList
      <div>
        <ul className=" bg-yellow-50 w-[200px] mx-auto ">
          {cars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarList;
