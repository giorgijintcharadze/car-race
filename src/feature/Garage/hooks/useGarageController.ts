import { useState } from "react";
import { GARAGE_LIMIT_PAGE } from "../../../utils/constants";
import { useMutationGarage } from "./useMutationGarage";
import useQueryGarage from "./useQueryGarage";

export const useGarageController = () => {
  const [page, setPage] = useState(1);

  const carsQuery = useQueryGarage(page);
  const { deleteMutation } = useMutationGarage(page);

  const { data, isLoading, error } = carsQuery;

  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / GARAGE_LIMIT_PAGE);

  return {
    page,
    setPage,
    cars,
    total,
    totalPages,
    isLoading,
    error,
    deleteMutation,
  };
};
