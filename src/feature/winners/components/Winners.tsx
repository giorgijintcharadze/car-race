import useQueryWinners from "../hooks/useQueryWinners";
import WinnersTable from "./WinnersTable";
import { useAppStore } from "../../../store/useAppStore";
import { WINNERS_LIMIT_PAGE } from "../../../utils/constants";
import Pagination from "../../Garage/components/ui/Pagination";
import type { WinnerSort } from "../types/winner.types";

const Winners = () => {
  const { winnersPage, setWinnersPage, winnerSort, winnerOrder, setWinnerSort, setWinnerOrder } =
    useAppStore();

  const { data, isLoading, error } = useQueryWinners(winnersPage, winnerSort, winnerOrder);

  const winners = data?.winners ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / WINNERS_LIMIT_PAGE);

  const handleSort = (field: WinnerSort) => {
    if (winnerSort === field) {
      setWinnerOrder(winnerOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setWinnerSort(field);
      setWinnerOrder("ASC");
    }
  };

  if (isLoading) return <p className="text-center">loading...</p>;

  if (error) return <p className="text-center">error</p>;

  console.log(winners);

  return (
    <div className="text-center">
      <WinnersTable winners={winners} sort={winnerSort} order={winnerOrder} onSort={handleSort} />
      <Pagination
        page={winnersPage}
        totalPages={totalPages}
        onPrev={() => setWinnersPage(winnersPage - 1)}
        onNext={() => setWinnersPage(winnersPage + 1)}
      />
    </div>
  );
};

export default Winners;
