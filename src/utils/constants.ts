export const VIEWS = {
  GARAGE: "GARAGE",
  WINNERS: "WINNERS",
} as const;

export type ViewType = keyof typeof VIEWS;

export const CAR_VALIDATION = {
  NAME_REQUIRED: "Name is required",
  NAME_MAX_LENGTH: "Name is too long (max 30 chars)",
  COLOR_REQUIRED: "Color is required",
} as const;

export const DEFAULT_CAR_COLOR = "#000000";

export const GARAGE_LIMIT_PAGE = 2;

export const randomCars = 100;
