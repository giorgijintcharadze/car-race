import { useState } from "react";
import { useGarage } from "../hooks/useGarage";
import CarList from "./ui/CarList";
import { GarageForm } from "./ui/GarageForm";

const Garage = () => {
  const [List, setList] = useState(false);
  const { carsQuery, createMutation, deleteMutation, updateMutation } = useGarage();

  const { data: cars, isLoading, error } = carsQuery;

  const showList = () => {
    setList(true);
  };

  if (isLoading) return <p>loading...</p>;
  if (error) return <p className="text-center">something went wrong</p>;

  return (
    <div className="text-center">
      <h1>Garage View</h1>
      <GarageForm />

      <button className="cursor-pointer bg-amber-200 mt-2.5 rounded-sm" onClick={showList}>
        Show Cars
      </button>

      {List && <CarList cars={cars ?? []} />}
    </div>
  );
};

export default Garage;
