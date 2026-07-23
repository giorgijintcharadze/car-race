import { useQuery } from "@tanstack/react-query";
import { getWinners } from "../api/winners.api";
import { getCarById } from "../../Garage/api/garage.api";

const useQueryWinners = (page: number) => {
  return useQuery({
    queryKey: ["winners", page],
    queryFn: async () => {
      const { winners, total } = await getWinners(page);

      const merged = await Promise.all(
        winners.map(async (winner) => {
          const car = await getCarById(winner.id);

          return {
            id: winner.id,
            name: car.name,
            color: car.color,
            wins: winner.wins,
            time: winner.time,
          };
        }),
      );

      return {
        winners: merged,
        total,
      };
    },
  });
};

export default useQueryWinners;
