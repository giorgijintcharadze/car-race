import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCar,
  createManyCars,
  deleteCar,
  getAllCarsWithoutPagination,
  updateCar,
} from "../api/garage.api";
import type { GarageFormValues } from "../schema/garage.schema";
import type { GarageResponse } from "../types/car.types";

export const useMutationGarage = (page: number) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCar,

    onMutate: async (newCar) => {
      await queryClient.cancelQueries({
        queryKey: ["garage", page],
      });

      const previousData = queryClient.getQueryData<GarageResponse>(["garage", page]);

      queryClient.setQueryData<GarageResponse>(["garage", page], (old) => {
        if (!old) return old;

        return {
          ...old,
          total: old.total + 1,
          cars: [
            {
              id: Date.now(),
              ...newCar,
            },
            ...old.cars,
          ],
        };
      });

      return { previousData };
    },

    onError: (_err, _newCar, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["garage", page], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["garage"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["garage"] }),
  });

  const generateMutation = useMutation({
    mutationFn: createManyCars,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["garage"],
      });
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => {
      const cars = await getAllCarsWithoutPagination();

      await Promise.all(cars.map((car) => deleteCar(car.id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["garage"] });
    },
  });
  return { generateMutation, createMutation, deleteMutation, resetMutation };
};
