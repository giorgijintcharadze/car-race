import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GarageSchema, type GarageFormValues } from "../../schema/garage.schema";
import { useAppStore } from "../../../../store/useAppStore";
import { useEffect } from "react";
import { useGarageStore } from "../../store/garage.store";

export const GarageForm = () => {
  const { newCarName, newCarColor, setNewCarName, setNewCarColor } = useAppStore();

  const addCar = useGarageStore((state) => state.addCar);
  const cars = useGarageStore((state) => state.cars);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<GarageFormValues>({
    resolver: zodResolver(GarageSchema),
    defaultValues: { name: newCarName, color: newCarColor },
  });

  // ვაკვირდებით ინფუთებს და ვინახავთ Store-ში State-ის შესანარჩუნებლად
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.name !== undefined) setNewCarName(value.name);
      if (value.color !== undefined) setNewCarColor(value.color);
    });
    return () => subscription.unsubscribe();
  }, [watch, setNewCarName, setNewCarColor]);

  const onSubmit = (data: GarageFormValues) => {
    addCar(data);
    console.warn("მზად არის გასაგზავნად:", data);
    reset({
      name: "",
      color: newCarColor,
    });
    setNewCarName("");
    setNewCarColor("#000000");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="color" {...register("color")} className="cursor-pointer" />
        {errors.color && <p className="text-red-500">{errors.color.message}</p>}
      </div>
      <div>
        <input type="text" placeholder="Car name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <button
        type="submit"
        className="cursor-pointer w-[100px]  rounded-2xl mt-1 bg-amber-50"
        disabled={!isValid}
      >
        CREATE
      </button>
    </form>
  );
};
