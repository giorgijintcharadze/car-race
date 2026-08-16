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

export const CAR_NAME_MAX_LENGTH = 30;

export const GARAGE_LIMIT_PAGE = 7;

export const WINNERS_LIMIT_PAGE = 10;

export const RANDOM_CARS_COUNT = 100;

export const MILLISECONDS_PER_SECOND = 1000;

export const WINNER_TIME_DECIMALS = 2;

export const WINNER_BANNER_DURATION_MS = 5000;

export const HTTP_STATUS = {
  NOT_FOUND: 404,
} as const;

export const ENGINE_STATUS = {
  STARTED: "started",
  STOPPED: "stopped",
  DRIVE: "drive",
} as const;
