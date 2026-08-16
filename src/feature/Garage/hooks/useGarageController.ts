import { useEffect } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { GARAGE_LIMIT_PAGE } from "../../../utils/constants";
import { useMutationGarage } from "./useMutationGarage";
import useQueryGarage from "./useQueryGarage";

export const getPageAfterDeletion = (page: number, carsOnPage: number): number =>
  carsOnPage === 1 && page > 1 ? page - 1 : page;

export const useGarageController = () => {
  const {
    garagePage: page,
    selectedCarId,
    clearSelectedCar,
    setGaragePage: setPage,
  } = useAppStore();
  const carsQuery = useQueryGarage(page);
  const { deleteMutation } = useMutationGarage();
  const cars = carsQuery.data?.cars ?? [];
  const total = carsQuery.data?.total ?? 0;
  const totalPages = Math.ceil(total / GARAGE_LIMIT_PAGE);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, setPage, totalPages]);

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
    if (selectedCarId === id) {
      clearSelectedCar();
    }
    const nextPage = getPageAfterDeletion(page, cars.length);
    if (nextPage !== page) {
      setPage(nextPage);
    }
  };

  return {
    page,
    setPage,
    cars,
    total,
    totalPages,
    isLoading: carsQuery.isLoading,
    error: carsQuery.error,
    isDeleting: deleteMutation.isPending,
    handleDelete,
  };
};
