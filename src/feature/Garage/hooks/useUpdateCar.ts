import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/garage.api";
import type { GarageFormValues } from "../schema/garage.schema";

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GarageFormValues }) => updateCar(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["garage"],
      });
    },
  });
};
