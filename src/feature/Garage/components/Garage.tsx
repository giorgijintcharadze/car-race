import CarList from "./ui/CarList";
import { GarageForm } from "./ui/GarageForm";
import Pagination from "./ui/Pagination";
import GenerateRandomCars from "./ui/GenerateRandomCars";
import { useGarageController } from "../hooks/useGarageController";

const Garage = () => {
  const { page, setPage, cars, totalPages, isLoading, error, deleteMutation } =
    useGarageController();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Something went wrong</p>;

  return (
    <div className="text-center">
      <h1>Garage View</h1>
      <GarageForm page={page} />
      <GenerateRandomCars page={page} setPage={setPage} />
      <CarList cars={cars} deleteMutation={deleteMutation} />
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
