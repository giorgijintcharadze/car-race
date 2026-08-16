import { useInteractionLocked } from "../../../store/useAppStore";
import { useGarageController } from "../hooks/useGarageController";
import { useRace } from "../hooks/useRaceAll";
import CarList from "./ui/CarList";
import GarageSidebar from "./ui/GarageSidebar";
import Pagination from "./ui/Pagination";
import WinnerBanner from "./ui/WinnerBanner";

type GarageMainProps = {
  controller: ReturnType<typeof useGarageController>;
  disabled: boolean;
};

const GarageMain = ({ controller, disabled }: GarageMainProps) => (
  <div className="garage-main">
    <header className="panel-heading">
      <h1>
        Garage: <strong>{controller.total} cars</strong>
        <span>Page {controller.totalPages === 0 ? 0 : controller.page}</span>
      </h1>
      <div className="telemetry" aria-hidden="true">
        <i /> <i /> <i /> <i /> <i /> <i />
      </div>
    </header>
    <div className="garage-columns" aria-hidden="true">
      <span>Car name</span>
      <span>Track</span>
      <span>Controls</span>
    </div>
    <CarList {...controller} disabled={disabled} onDelete={controller.handleDelete} />
    <Pagination
      page={controller.page}
      totalPages={controller.totalPages}
      disabled={disabled}
      onPrev={() => controller.setPage(controller.page - 1)}
      onNext={() => controller.setPage(controller.page + 1)}
    />
  </div>
);

const Garage = () => {
  const controller = useGarageController();
  const { startRace, resetRace, winner, clearWinner, raceStatus } = useRace();
  const isInteractionLocked = useInteractionLocked();
  const start = () => startRace(controller.cars).catch(() => undefined);
  const reset = () => resetRace(controller.cars).catch(() => undefined);

  return (
    <section className="screen-panel garage-screen">
      <GarageSidebar
        carCount={controller.cars.length}
        disabled={isInteractionLocked}
        raceStatus={raceStatus}
        onRace={start}
        onReset={reset}
      />
      <WinnerBanner winner={winner} onClose={clearWinner} />
      <GarageMain controller={controller} disabled={isInteractionLocked} />
    </section>
  );
};

export default Garage;
