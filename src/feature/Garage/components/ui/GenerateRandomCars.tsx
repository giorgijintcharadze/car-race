import { useAppStore } from "../../../../store/useAppStore";
import { RANDOM_CARS_COUNT } from "../../../../utils/constants";
import { generateCars } from "../../../../utils/generateCars";
import { useMutationGarage } from "../../hooks/useMutationGarage";

type GenerateRandomCarsProps = { disabled: boolean };

const getResultMessage = (succeeded: number, failed: number): string =>
  failed === 0 ? `${succeeded} cars created.` : `${succeeded} created, ${failed} failed.`;

const GenerateRandomCars = ({ disabled }: GenerateRandomCarsProps) => {
  const setGaragePage = useAppStore((state) => state.setGaragePage);
  const { generateMutation, resetMutation } = useMutationGarage();
  const isPending = generateMutation.isPending || resetMutation.isPending;

  return (
    <div>
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={() => generateMutation.mutate(generateCars(RANDOM_CARS_COUNT))}
      >
        {generateMutation.isPending ? "Creating cars..." : "Create 100 Cars"}
      </button>
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={() => resetMutation.mutate(undefined, { onSuccess: () => setGaragePage(1) })}
      >
        {resetMutation.isPending ? "Deleting cars..." : "Delete All Cars"}
      </button>
      {generateMutation.data && (
        <p>{getResultMessage(generateMutation.data.succeeded, generateMutation.data.failed)}</p>
      )}
      {resetMutation.data && (
        <p>{`${resetMutation.data.succeeded} deleted, ${resetMutation.data.failed} failed.`}</p>
      )}
      {(generateMutation.isError || resetMutation.isError) && <p>Bulk operation failed.</p>}
    </div>
  );
};

export default GenerateRandomCars;
