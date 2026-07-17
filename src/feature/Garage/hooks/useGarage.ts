import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCar, deleteCar, getAllCars, updateCar } from "../api/garage.api";
import type { GarageFormValues } from "../schema/garage.schema";

export const useGarage = (page: number) => {
  const queryClient = useQueryClient();

  const carsQuery = useQuery({ queryKey: ["garage", page], queryFn: () => getAllCars(page) });

  const createMutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["garage"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GarageFormValues }) => updateCar(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["garage"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["garage"] }),
  });

  return { carsQuery, createMutation, updateMutation, deleteMutation };
};
