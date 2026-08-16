import { useAppStore } from "../../../../store/useAppStore";
import { RANDOM_CARS_COUNT } from "../../../../utils/constants";
import { generateCars } from "../../../../utils/generateCars";
import { useMutationGarage } from "../../hooks/useMutationGarage";

type GenerateRandomCarsProps = { disabled: boolean };

const getResultMessage = (succeeded: number, failed: number): string =>
  failed === 0 ? `${succeeded} cars created.` : `${succeeded} created, ${failed} failed.`;

const resetGarageUi = () => {
  const { clearSelectedCar, setGaragePage } = useAppStore.getState();
  clearSelectedCar();
  setGaragePage(1);
};

const GenerateRandomCars = ({ disabled }: GenerateRandomCarsProps) => {
  const { generateMutation, resetMutation } = useMutationGarage();
  const isPending = generateMutation.isPending || resetMutation.isPending;

  return (
    <div className="bulk-actions">
      <button
        type="button"
        className="outline-action outline-action--blue"
        disabled={disabled || isPending}
        onClick={() => generateMutation.mutate(generateCars(RANDOM_CARS_COUNT))}
      >
        {generateMutation.isPending ? "Creating cars..." : "Create 100 Cars"}
      </button>
      <button
        type="button"
        className="outline-action outline-action--danger"
        disabled={disabled || isPending}
        onClick={() => resetMutation.mutate(undefined, { onSuccess: resetGarageUi })}
      >
        {resetMutation.isPending ? "Deleting cars..." : "Delete All Cars"}
      </button>
      {generateMutation.data && (
        <p className="form-message">
          {getResultMessage(generateMutation.data.succeeded, generateMutation.data.failed)}
        </p>
      )}
      {resetMutation.data && (
        <p className="form-message">
          {`${resetMutation.data.succeeded} deleted, ${resetMutation.data.failed} failed.`}
        </p>
      )}
      {(generateMutation.isError || resetMutation.isError) && (
        <p className="form-message form-message--error">Bulk operation failed.</p>
      )}
    </div>
  );
};

export default GenerateRandomCars;
