import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "../api/garage.api";

const useQueryGarage = (page: number) => {
  const carsQuery = useQuery({ queryKey: ["garage", page], queryFn: () => getAllCars(page) });

  return carsQuery;
};

export default useQueryGarage;
