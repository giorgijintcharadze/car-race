import { useQuery } from "@tanstack/react-query";
import { getWinners } from "../api/winners.api";
import { getCarById } from "../../Garage/api/garage.api";
import type { SortOrder, WinnerSort } from "../types/winner.types";
import { GARAGE_LIMIT_PAGE } from "../../../utils/constants";

const useQueryWinners = (page: number, sort: WinnerSort, order: SortOrder) => {
  return useQuery({
    queryKey: ["winners", page, sort, order],
    queryFn: async () => {
      const { winners, total } = await getWinners(page, sort, order, GARAGE_LIMIT_PAGE);

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
