import type { ReactNode } from "react";
import { GarageForm } from "./GarageForm";
import GenerateRandomCars from "./GenerateRandomCars";
import RaceControls from "./RaceControls";
import { UpdateCarForm } from "./UpdateCarForm";
import type { RaceStatus } from "../../types/engine.types";

type GarageSidebarProps = {
  carCount: number;
  disabled: boolean;
  raceStatus: RaceStatus;
  onRace: () => void;
  onReset: () => void;
};

type ControlSectionProps = {
  title: string;
  icon: string;
  children: ReactNode;
};

const ControlSection = ({ title, icon, children }: ControlSectionProps) => (
  <section className="control-section">
    <h2>
      <span>{title}</span>
      <span aria-hidden="true">{icon}</span>
    </h2>
    {children}
  </section>
);

const GarageSidebar = ({ carCount, disabled, raceStatus, onRace, onReset }: GarageSidebarProps) => (
  <aside className="control-sidebar" aria-label="Garage controls">
    <ControlSection title="Create car" icon="▣">
      <GarageForm disabled={disabled} />
    </ControlSection>
    <ControlSection title="Update car" icon="▧">
      <UpdateCarForm disabled={disabled} />
    </ControlSection>
    <ControlSection title="Race controls" icon="⌁">
      <RaceControls
        carCount={carCount}
        disabled={disabled}
        raceStatus={raceStatus}
        onRace={onRace}
        onReset={onReset}
      />
      <GenerateRandomCars disabled={disabled} />
    </ControlSection>
  </aside>
);

export default GarageSidebar;
