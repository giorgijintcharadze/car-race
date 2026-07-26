import { GarageForm } from "./ui/GarageForm";
import Pagination from "./ui/Pagination";
import GenerateRandomCars from "./ui/GenerateRandomCars";
import { useGarageController } from "../hooks/useGarageController";
import CarList from "./ui/CarList";
import { UpdateCarForm } from "./ui/UpdateCarForm";
import { useRace } from "../hooks/useRaceAll";
import { useAppStore } from "../../../store/useAppStore";
import WinnerBanner from "./ui/WinnerBanner";

const Garage = () => {
  const { page, setPage, totalPages, cars, isLoading, error, deleteMutation } =
    useGarageController();
  const { movingCars } = useAppStore();

  const { startRace, resetRace, winner, clearWinner } = useRace();

  const isRacing = Object.values(movingCars).some((isMoving) => isMoving);

  const handleRaceAll = async () => {
    await startRace(cars);
  };

  const handleReset = async () => {
    await resetRace(cars);
  };

  return (
    <div className="text-center">
      <h1>Garage View</h1>
      <GarageForm page={page} />
      <GenerateRandomCars page={page} setPage={setPage} />
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={handleRaceAll}
          disabled={isRacing || cars.length === 0}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRacing ? "Racing..." : "Race All"}
        </button>
        <button
          onClick={handleReset}
          disabled={cars.length === 0}
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
      <WinnerBanner winner={winner} onClose={clearWinner} />
      <CarList cars={cars} isLoading={isLoading} error={error} deleteMutation={deleteMutation} />
      <UpdateCarForm />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
};

export default Garage;
