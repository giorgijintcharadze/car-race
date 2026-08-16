import { useInteractionLocked } from "../../../store/useAppStore";
import { useGarageController } from "../hooks/useGarageController";
import { useRace } from "../hooks/useRaceAll";
import CarList from "./ui/CarList";
import { GarageForm } from "./ui/GarageForm";
import GenerateRandomCars from "./ui/GenerateRandomCars";
import Pagination from "./ui/Pagination";
import { UpdateCarForm } from "./ui/UpdateCarForm";
import RaceControls from "./ui/RaceControls";
import WinnerBanner from "./ui/WinnerBanner";

const Garage = () => {
  const controller = useGarageController();
  const { startRace, resetRace, winner, clearWinner, raceStatus } = useRace();
  const isInteractionLocked = useInteractionLocked();

  return (
    <div className="text-center">
      <h1>Garage</h1>
      <p>Cars in garage: {controller.total}</p>
      <GarageForm disabled={isInteractionLocked} />
      <UpdateCarForm disabled={isInteractionLocked} />
      <GenerateRandomCars disabled={isInteractionLocked} />
      <RaceControls
        carCount={controller.cars.length}
        disabled={isInteractionLocked}
        raceStatus={raceStatus}
        onRace={() => startRace(controller.cars).catch(() => undefined)}
        onReset={() => resetRace(controller.cars).catch(() => undefined)}
      />
      <WinnerBanner winner={winner} onClose={clearWinner} />
      <CarList
        cars={controller.cars}
        isLoading={controller.isLoading}
        error={controller.error}
        isDeleting={controller.isDeleting}
        disabled={isInteractionLocked}
        onDelete={controller.handleDelete}
      />
      <Pagination
        page={controller.page}
        totalPages={controller.totalPages}
        disabled={isInteractionLocked}
        onPrev={() => controller.setPage(controller.page - 1)}
        onNext={() => controller.setPage(controller.page + 1)}
      />
    </div>
  );
};

export default Garage;
