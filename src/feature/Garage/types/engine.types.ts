export type RaceStatus = "idle" | "running" | "finished" | "resetting";

export type EngineTelemetry = {
  velocity: number;
  distance: number;
};

export type EngineRunResult = {
  carId: number;
  durationMs: number;
  success: boolean;
};

export type RaceWinner = {
  carName: string;
  time: number;
};
