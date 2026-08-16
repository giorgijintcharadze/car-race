import type { Car } from "../../types/car.types";
import CarItem from "./CarItem";

type CarListProps = {
  cars: Car[];
  isLoading: boolean;
  error: unknown;
  disabled: boolean;
  isDeleting: boolean;
  onDelete: (id: number) => Promise<void>;
};

const CarList = ({ cars, isLoading, error, disabled, isDeleting, onDelete }: CarListProps) => {
  if (isLoading) {
    return <p className="empty-state">Loading cars...</p>;
  }
  if (error) {
    return <p className="empty-state empty-state--error">Could not load the garage.</p>;
  }
  if (cars.length === 0) {
    return <p className="empty-state">No cars in the garage.</p>;
  }

  return (
    <section aria-label="Garage cars" className="car-list">
      <ul className="race-grid">
        {cars.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            disabled={disabled}
            isDeleting={isDeleting}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default CarList;
