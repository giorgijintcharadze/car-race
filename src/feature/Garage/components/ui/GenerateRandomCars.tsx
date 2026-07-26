import { randomCars } from "../../../../utils/constants";
import { generateCars } from "../../../../utils/generateCars";
import { useMutationGarage } from "../../hooks/useMutationGarage";

type GenerateRandomCarsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const GenerateRandomCars = ({ page, setPage }: GenerateRandomCarsProps) => {
  const { generateMutation, resetMutation } = useMutationGarage(page);
  return (
    <div>
      <button
        type="button"
        disabled={generateMutation.isPending}
        onClick={() => generateMutation.mutate(generateCars(randomCars))}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        {generateMutation.isPending ? "generating..." : "generateCars"}
      </button>
      <button
        type="button"
        onClick={() => {
          resetMutation.mutate(undefined, {
            onSuccess: () => {
              setPage(1);
            },
          });
        }}
        disabled={resetMutation.isPending}
        className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {resetMutation.isPending ? "DELETING..." : "DELETE"}
      </button>
    </div>
  );
};

export default GenerateRandomCars;
