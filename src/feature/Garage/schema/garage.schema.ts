import { z } from "zod";

import { CAR_VALIDATION } from "../../../utils/constants";

export const GarageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, CAR_VALIDATION.NAME_REQUIRED)
    .max(30, CAR_VALIDATION.NAME_MAX_LENGTH),
  color: z.string().min(1, CAR_VALIDATION.COLOR_REQUIRED),
});

export type GarageFormValues = z.infer<typeof GarageSchema>;
