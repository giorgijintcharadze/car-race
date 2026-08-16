import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar, deleteCar, getAllCarsWithoutPagination } from "../api/garage.api";
import type { GarageFormValues } from "../schema/garage.schema";

export type BulkOperationResult = {
  succeeded: number;
  failed: number;
};

const summarizeResults = (results: PromiseSettledResult<unknown>[]): BulkOperationResult => {
  const succeeded = results.filter((result) => result.status === "fulfilled").length;
  return { succeeded, failed: results.length - succeeded };
};

const createManyCars = async (cars: GarageFormValues[]): Promise<BulkOperationResult> => {
  const results = await Promise.allSettled(cars.map((car) => createCar(car)));
  return summarizeResults(results);
};

const deleteAllCars = async (): Promise<BulkOperationResult> => {
  const cars = await getAllCarsWithoutPagination();
  const results = await Promise.allSettled(cars.map((car) => deleteCar(car.id)));
  return summarizeResults(results);
};

export const useMutationGarage = () => {
  const queryClient = useQueryClient();
  const invalidateGarage = () => queryClient.invalidateQueries({ queryKey: ["garage"] });
  const invalidateGarageAndWinners = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["garage"] }),
      queryClient.invalidateQueries({ queryKey: ["winners"] }),
    ]);

  const createMutation = useMutation({ mutationFn: createCar, onSuccess: invalidateGarage });
  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSettled: invalidateGarageAndWinners,
  });
  const generateMutation = useMutation({
    mutationFn: createManyCars,
    onSettled: invalidateGarage,
  });
  const resetMutation = useMutation({
    mutationFn: deleteAllCars,
    onSettled: invalidateGarageAndWinners,
  });

  return { generateMutation, createMutation, deleteMutation, resetMutation };
};
