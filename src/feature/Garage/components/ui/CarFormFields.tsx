import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { GarageFormValues } from "../../schema/garage.schema";

type CarFormFieldsProps = {
  disabled: boolean;
  errors: FieldErrors<GarageFormValues>;
  idPrefix: string;
  register: UseFormRegister<GarageFormValues>;
};

const CarFormFields = ({ disabled, errors, idPrefix, register }: CarFormFieldsProps) => (
  <>
    <span>Car color</span>
    <input
      aria-label="Car color"
      id={`${idPrefix}-color`}
      type="color"
      disabled={disabled}
      {...register("color")}
    />
    <span>Car name</span>
    <input
      aria-label="Car name"
      id={`${idPrefix}-name`}
      type="text"
      disabled={disabled}
      {...register("name")}
    />
    {errors.name && <p>{errors.name.message}</p>}
  </>
);

export default CarFormFields;
