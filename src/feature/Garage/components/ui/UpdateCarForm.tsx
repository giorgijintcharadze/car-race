import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "../../../../store/useAppStore";
import { GarageSchema, type GarageFormValues } from "../../schema/garage.schema";
import { useUpdateCar } from "../../hooks/useUpdateCar";
import { DEFAULT_CAR_COLOR } from "../../../../utils/constants";

export const UpdateCarForm = () => {
  const { selectedCarId, updateCarName, updateCarColor, setUpdateCarName, setUpdateCarColor } =
    useAppStore();

  const updateMutation = useUpdateCar();
  const { register, handleSubmit, watch, reset } = useForm<GarageFormValues>({
    resolver: zodResolver(GarageSchema),
    defaultValues: { name: updateCarName, color: updateCarColor },
  });

  useEffect(() => {
    reset({ name: updateCarName, color: updateCarColor });
  }, [updateCarName, updateCarColor, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.name !== undefined) setUpdateCarName(value.name);
      if (value.color !== undefined) setUpdateCarColor(value.color);
    });
    return () => subscription.unsubscribe();
  }, [watch, setUpdateCarName, setUpdateCarColor]);

  const onSubmit = async (data: GarageFormValues) => {
    if (selectedCarId == null) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedCarId,
        data,
      });
      reset({
        name: "",
        color: "#000000",
      });
      setUpdateCarName("");
      setUpdateCarColor(DEFAULT_CAR_COLOR);
    } catch (error) {
      console.warn("Update failed", error);
    }
  };

  const isDisabled = !selectedCarId;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center mt-1.5">
      <input type="text" disabled={isDisabled} {...register("name")} />
      <input type="color" disabled={isDisabled} {...register("color")} />
      <button
        type="submit"
        disabled={isDisabled || updateMutation.isPending}
        className="cursor-pointer ml-1.5 bg-amber-400 rounded-sm "
      >
        {updateMutation.isPending ? "UPDATING..." : "UPDATE"}
      </button>
    </form>
  );
};
