import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useAppStore } from "../../../../store/useAppStore";
import { DEFAULT_CAR_COLOR } from "../../../../utils/constants";
import { useUpdateCar } from "../../hooks/useUpdateCar";
import { GarageSchema, type GarageFormValues } from "../../schema/garage.schema";
import CarFormFields from "./CarFormFields";

type UpdateCarFormProps = { disabled: boolean };

const usePersistedUpdateForm = (form: UseFormReturn<GarageFormValues>) => {
  const store = useAppStore();
  useEffect(() => {
    form.reset({ name: store.updateCarName, color: store.updateCarColor });
  }, [form, store.selectedCarRevision]);
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name !== undefined) {
        store.setUpdateCarName(value.name);
      }
      if (value.color !== undefined) {
        store.setUpdateCarColor(value.color);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, store]);
};

export const UpdateCarForm = ({ disabled }: UpdateCarFormProps) => {
  const store = useAppStore();
  const mutation = useUpdateCar();
  const form = useForm<GarageFormValues>({
    resolver: zodResolver(GarageSchema),
    defaultValues: { name: store.updateCarName, color: store.updateCarColor },
    mode: "onChange",
  });
  usePersistedUpdateForm(form);
  const clearForm = () => {
    store.clearSelectedCar();
    form.reset({ name: "", color: DEFAULT_CAR_COLOR });
  };

  const onSubmit = (data: GarageFormValues) => {
    if (store.selectedCarId === null) {
      return;
    }
    mutation.mutate({ id: store.selectedCarId, data }, { onSuccess: clearForm });
  };

  const isDisabled = disabled || store.selectedCarId === null;
  return (
    <form className="car-form" onSubmit={form.handleSubmit(onSubmit)}>
      <CarFormFields
        disabled={isDisabled}
        errors={form.formState.errors}
        idPrefix="update"
        register={form.register}
      />
      <button type="submit" className="primary-action" disabled={isDisabled || mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Update"}
      </button>
      {mutation.isError && (
        <p className="form-message form-message--error">Could not update the car.</p>
      )}
    </form>
  );
};
