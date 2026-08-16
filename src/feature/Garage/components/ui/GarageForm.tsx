import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useAppStore } from "../../../../store/useAppStore";
import { DEFAULT_CAR_COLOR } from "../../../../utils/constants";
import { useMutationGarage } from "../../hooks/useMutationGarage";
import { GarageSchema, type GarageFormValues } from "../../schema/garage.schema";
import CarFormFields from "./CarFormFields";

type GarageFormProps = { disabled: boolean };

const usePersistedCreateForm = (form: UseFormReturn<GarageFormValues>) => {
  const { setNewCarName, setNewCarColor } = useAppStore();
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name !== undefined) {
        setNewCarName(value.name);
      }
      if (value.color !== undefined) {
        setNewCarColor(value.color);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setNewCarColor, setNewCarName]);
};

export const GarageForm = ({ disabled }: GarageFormProps) => {
  const { newCarName, newCarColor, setNewCarName, setNewCarColor } = useAppStore();
  const { createMutation } = useMutationGarage();
  const form = useForm<GarageFormValues>({
    resolver: zodResolver(GarageSchema),
    defaultValues: { name: newCarName, color: newCarColor },
    mode: "onChange",
  });
  usePersistedCreateForm(form);

  const onSubmit = (data: GarageFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset({ name: "", color: DEFAULT_CAR_COLOR });
        setNewCarName("");
        setNewCarColor(DEFAULT_CAR_COLOR);
      },
    });
  };

  return (
    <form className="car-form" onSubmit={form.handleSubmit(onSubmit)}>
      <CarFormFields
        disabled={disabled}
        errors={form.formState.errors}
        idPrefix="new"
        register={form.register}
      />
      <button
        type="submit"
        className="primary-action"
        disabled={disabled || !form.formState.isValid || createMutation.isPending}
      >
        {createMutation.isPending ? "Creating..." : "Create"}
      </button>
      {createMutation.isError && (
        <p className="form-message form-message--error">Could not create the car.</p>
      )}
    </form>
  );
};
