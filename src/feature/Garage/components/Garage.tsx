import { useState } from "react";
import CarList from "./ui/CarList";
import { GarageForm } from "./ui/GarageForm";
import Pagination from "./ui/Pagination";
import useQueryGarage from "../hooks/useQueryGarage";
import { GARAGE_LIMIT_PAGE } from "../../../utils/constants";
import GenerateRandomCars from "./ui/GenerateRandomCars";
import { useMutationGarage } from "../hooks/useMutationGarage";

const Garage = () => {
  const [List, setList] = useState(false);
  const [page, setPage] = useState(1);

  const carsQuery = useQueryGarage(page);

  const { data: cars, isLoading, error } = carsQuery;

  const { deleteMutation } = useMutationGarage(page);

  const Cars = cars?.cars ?? [];
  const total = cars?.total ?? 0;

  const totalPages = Math.ceil(total / GARAGE_LIMIT_PAGE);

  const showList = () => {
    setList(true);
  };

  if (isLoading) return <p className="text-center">loading...</p>;
  if (error) return <p className="text-center">something went wrong</p>;

  console.log(cars);

  return (
    <div className="text-center">
      <h1>Garage View</h1>
      <GarageForm page={page} />
      <button className="cursor-pointer bg-amber-200 mt-2.5 rounded-sm" onClick={showList}>
        Show Cars
      </button>
      <GenerateRandomCars page={page} />
      {List && <CarList cars={Cars} deleteMutation={deleteMutation} />}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
};

export default Garage;
