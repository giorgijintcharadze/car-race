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
    <label className="field-group" htmlFor={`${idPrefix}-name`}>
      <span>Car name</span>
      <input
        aria-label="Car name"
        id={`${idPrefix}-name`}
        type="text"
        disabled={disabled}
        placeholder="Enter model name"
        {...register("name")}
      />
    </label>
    <label className="field-group color-field" htmlFor={`${idPrefix}-color`}>
      <span>Car color</span>
      <input
        aria-label="Car color"
        id={`${idPrefix}-color`}
        type="color"
        disabled={disabled}
        {...register("color")}
      />
    </label>
    {errors.name && <p className="form-message form-message--error">{errors.name.message}</p>}
  </>
);

export default CarFormFields;
