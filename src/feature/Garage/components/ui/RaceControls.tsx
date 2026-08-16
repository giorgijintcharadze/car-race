import type { RaceStatus } from "../../types/engine.types";

type RaceControlsProps = {
  carCount: number;
  disabled: boolean;
  raceStatus: RaceStatus;
  onRace: () => void;
  onReset: () => void;
};

const RaceControls = ({ carCount, disabled, raceStatus, onRace, onReset }: RaceControlsProps) => {
  const canReset = raceStatus === "running" || raceStatus === "finished";
  return (
    <div className="mb-4 flex justify-center gap-2">
      <button type="button" onClick={onRace} disabled={disabled || carCount === 0}>
        {raceStatus === "running" ? "Racing..." : "Race All"}
      </button>
      <button type="button" onClick={onReset} disabled={!canReset}>
        {raceStatus === "resetting" ? "Resetting..." : "Reset Race"}
      </button>
    </div>
  );
};

export default RaceControls;
