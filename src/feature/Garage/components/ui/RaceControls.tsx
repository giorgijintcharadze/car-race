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
    <div className="race-actions">
      <button
        type="button"
        className="primary-action primary-action--race"
        onClick={onRace}
        disabled={disabled || carCount === 0}
      >
        {raceStatus === "running" ? "Racing..." : "Race All"}
      </button>
      <button
        type="button"
        className="outline-action outline-action--danger"
        onClick={onReset}
        disabled={!canReset}
      >
        {raceStatus === "resetting" ? "Resetting..." : "Reset Race"}
      </button>
    </div>
  );
};

export default RaceControls;
