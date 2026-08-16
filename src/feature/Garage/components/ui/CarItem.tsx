import { useRef, type CSSProperties } from "react";
import { useAppStore } from "../../../../store/useAppStore";
import { useEngine } from "../../hooks/useEngine";
import type { Car } from "../../types/car.types";
import CarIcon from "./CarIcon";

type CarItemProps = {
  car: Car;
  disabled: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => Promise<void>;
};

type CarControlsProps = {
  disabled: boolean;
  isDeleting: boolean;
  isMoving: boolean;
  canStop: boolean;
  onDelete: () => void;
  onSelect: () => void;
  onStart: () => void;
  onStop: () => void;
};

const ControlButton = ({
  label,
  icon,
  kind,
  disabled,
  onClick,
}: {
  label: string;
  icon: string;
  kind: string;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={`car-action car-action--${kind}`}
    type="button"
    disabled={disabled}
    onClick={onClick}
  >
    <span aria-hidden="true">{icon}</span>
    <small>{label}</small>
  </button>
);

const CarControls = ({
  disabled,
  isDeleting,
  isMoving,
  canStop,
  onDelete,
  onSelect,
  onStart,
  onStop,
}: CarControlsProps) => (
  <div className="car-controls">
    <ControlButton
      label="Start"
      icon="▶"
      kind="start"
      disabled={disabled || isMoving}
      onClick={onStart}
    />
    <ControlButton label="Stop" icon="■" kind="stop" disabled={!canStop} onClick={onStop} />
    <ControlButton label="Select" icon="✓" kind="select" disabled={disabled} onClick={onSelect} />
    <ControlButton
      label="Delete"
      icon="×"
      kind="delete"
      disabled={disabled || isDeleting}
      onClick={onDelete}
    />
  </div>
);

const CarItem = ({ car, disabled, isDeleting, onDelete }: CarItemProps) => {
  const { raceStatus, selectCar } = useAppStore();
  const carRef = useRef<HTMLDivElement>(null);
  const { isMoving, handleStart, handleStop } = useEngine(car.id, carRef);

  const handleSelect = () => selectCar(car.id, car.name, car.color);
  const handleDelete = () => onDelete(car.id).catch(() => undefined);

  return (
    <li className="race-row" style={{ "--car-accent": car.color } as CSSProperties}>
      <div className="car-identity">
        <CarIcon color={car.color} name={car.name} className="car-preview" />
        <div>
          <small>Car name</small>
          <strong>{car.name}</strong>
        </div>
      </div>
      <div className="track-cell">
        <span>Track</span>
        <div className="track-lane">
          <div ref={carRef} className="track-car" data-car-id={car.id}>
            <CarIcon color={car.color} name={car.name} />
          </div>
          <span className="finish-line" aria-hidden="true" />
        </div>
      </div>
      <CarControls
        disabled={disabled}
        isDeleting={isDeleting}
        isMoving={isMoving}
        canStop={isMoving && raceStatus === "idle"}
        onDelete={handleDelete}
        onSelect={handleSelect}
        onStart={handleStart}
        onStop={handleStop}
      />
    </li>
  );
};

export default CarItem;
