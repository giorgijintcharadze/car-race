import { GarageForm } from "./ui/GarageForm";
import Pagination from "./ui/Pagination";
import GenerateRandomCars from "./ui/GenerateRandomCars";
import { useGarageController } from "../hooks/useGarageController";
import CarList from "./ui/CarList";

const Garage = () => {
  const { page, setPage, totalPages, cars, isLoading, error, deleteMutation } =
    useGarageController();

  return (
    <div className="text-center">
      <h1>Garage View</h1>
      <GarageForm page={page} />
      <GenerateRandomCars page={page} setPage={setPage} />
      <CarList cars={cars} isLoading={isLoading} error={error} deleteMutation={deleteMutation} />
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
